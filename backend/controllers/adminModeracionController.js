
const db = require('../config/database')
const bcrypt = require('bcryptjs')
const fs = require('fs/promises')
const path = require('path')
require('dotenv').config()

// =====================================================
// VALIDAR IDENTIFICADORES
// =====================================================

function obtenerIdValido(valor) {
    const id = Number(valor)

    if (!Number.isSafeInteger(id) || id <= 0) {
        return null
    }

    return id
}

// =====================================================
// LOCALIZAR ARCHIVOS DE RECURSOS DE FORMA SEGURA
// =====================================================

function obtenerRutaArchivoRecurso(rutaArchivo) {
    if (
        typeof rutaArchivo !== 'string' ||
        !rutaArchivo.startsWith('/uploads/recursos/')
    ) {
        return null
    }

    const carpetaRecursos = path.resolve(
        __dirname,
        '..',
        'uploads',
        'recursos'
    )

    const rutaRelativa = rutaArchivo.slice(
        '/uploads/recursos/'.length
    )

    const rutaCompleta = path.resolve(
        carpetaRecursos,
        rutaRelativa
    )

    if (
        !rutaCompleta.startsWith(carpetaRecursos + path.sep)
    ) {
        return null
    }

    return rutaCompleta
}

// =====================================================
// MODERACIÓN COMÚN A LOS DOS FOROS
// =====================================================

async function moderarMensaje(req, res, tabla, accion) {
    const id = obtenerIdValido(req.params.id)
    const { motivo, contrasena } = req.body || {}

    const tablasPermitidas = {
        estudiantes: 'foro_mensajes_alumnos',
        profesores: 'foro_profesores'
    }

    const tablaReal = tablasPermitidas[tabla]

    if (!id || !tablaReal) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El identificador o el foro no son válidos.'
        })
    }

    if (
        typeof motivo !== 'string' ||
        motivo.trim().length < 5 ||
        motivo.trim().length > 500
    ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Indica un motivo de entre 5 y 500 caracteres.'
        })
    }

    // Para la retirada excepcional, comprobar de nuevo la contraseña.
    if (accion === 'ELIMINAR') {
        const hashAdmin = process.env.ADMIN_PASSWORD_HASH

        if (
            typeof contrasena !== 'string' ||
            !contrasena ||
            !hashAdmin
        ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Debes introducir la contraseña del administrador.'
            })
        }

        try {
            const contraseñaCorrecta = await bcrypt.compare(
                contrasena,
                hashAdmin
            )

            if (!contraseñaCorrecta) {
    return res.status(400).json({
        ok: false,
        mensaje: 'La contraseña del administrador es incorrecta.'
    })
}
        } catch (error) {
            console.error('Error al verificar la contraseña:', error)

            return res.status(500).json({
                ok: false,
                mensaje: 'No se pudo verificar la contraseña.'
            })
        }
    }

    let conexion

    try {
        conexion = await db.getConnection()
        await conexion.beginTransaction()

        // Bloquea la publicación mientras se procesa la acción.
        const [filas] = await conexion.query(
            `SELECT * FROM ${tablaReal} WHERE id = ? FOR UPDATE`,
            [id]
        )

        if (!filas.length) {
            await conexion.rollback()

            return res.status(404).json({
                ok: false,
                mensaje: 'La publicación no existe.'
            })
        }

        const original = filas[0]

        // Consultar la última acción registrada para este mensaje.
        const [auditoriaAnterior] = await conexion.query(
            `SELECT accion
             FROM foro_moderacion_auditoria
             WHERE tabla_origen = ? AND mensaje_id = ?
             ORDER BY id DESC
             LIMIT 1`,
            [tablaReal, id]
        )

        const ultimaAccion = auditoriaAnterior[0]?.accion || null

        // Una retirada excepcional no se puede restaurar desde este panel.
        if (ultimaAccion === 'ELIMINAR') {
            await conexion.rollback()

            return res.status(409).json({
                ok: false,
                mensaje:
                    'Esta publicación fue retirada excepcionalmente y no puede modificarse desde el panel habitual.'
            })
        }

        if (accion === 'OCULTAR' && Number(original.activo) === 0) {
            await conexion.rollback()

            return res.status(409).json({
                ok: false,
                mensaje: 'La publicación ya está oculta.'
            })
        }

        if (accion === 'MOSTRAR' && Number(original.activo) === 1) {
            await conexion.rollback()

            return res.status(409).json({
                ok: false,
                mensaje: 'La publicación ya está visible.'
            })
        }

        if (!['OCULTAR', 'MOSTRAR', 'ELIMINAR'].includes(accion)) {
            await conexion.rollback()

            return res.status(400).json({
                ok: false,
                mensaje: 'La acción de moderación no es válida.'
            })
        }

        // Retirada lógica: nunca se ejecuta DELETE sobre el mensaje.
        const nuevoActivo = accion === 'MOSTRAR' ? 1 : 0

        await conexion.query(
            `UPDATE ${tablaReal} SET activo = ? WHERE id = ?`,
            [nuevoActivo, id]
        )

        // Guardar una copia del contenido original para auditoría.
        await conexion.query(
            `INSERT INTO foro_moderacion_auditoria
                (
                    tabla_origen,
                    mensaje_id,
                    accion,
                    administrador,
                    motivo,
                    contenido_original
                )
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                tablaReal,
                id,
                accion,
                req.admin?.usuario || 'administrador',
                motivo.trim(),
                JSON.stringify(original)
            ]
        )

        await conexion.commit()

        const mensajesRespuesta = {
            OCULTAR: 'Publicación ocultada y acción registrada.',
            MOSTRAR: 'Publicación restaurada y acción registrada.',
            ELIMINAR:
                'Publicación retirada de la vista pública y acción registrada.'
        }

        return res.status(200).json({
            ok: true,
            mensaje: mensajesRespuesta[accion]
        })
    } catch (error) {
        if (conexion) {
            try {
                await conexion.rollback()
            } catch (errorRollback) {
                console.error('Error al deshacer la moderación:', errorRollback)
            }
        }

        console.error('Error al moderar la publicación:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudo completar la operación de moderación.'
        })
    } finally {
        if (conexion) {
            conexion.release()
        }
    }
}

// =====================================================
// FORO DE ESTUDIANTES
// =====================================================

async function getForoEstudiantes(req, res) {
    try {
        const [mensajes] = await db.query(`
            SELECT
                fm.id,
                fm.grupo_id,
                fm.alumno_id,
                fm.profesor_id,
                fm.respuesta_a_id,
                fm.titulo,
                fm.categoria,
                fm.mensaje,
                fm.fecha_creacion,
                fm.activo,
                e.nombre AS escuela,
                g.nombre AS grupo,
                COALESCE(
                    NULLIF(CONCAT(a.nombre, ' ', a.apellidos), ' '),
                    NULLIF(CONCAT(p.nombre, ' ', p.apellidos), ' '),
                    'Usuario no disponible'
                ) AS autor,
                (
                    SELECT ma.accion
                    FROM foro_moderacion_auditoria ma
                    WHERE ma.tabla_origen = 'foro_mensajes_alumnos'
                      AND ma.mensaje_id = fm.id
                    ORDER BY ma.id DESC
                    LIMIT 1
                ) AS ultima_accion
            FROM foro_mensajes_alumnos fm
            INNER JOIN grupos g ON g.id = fm.grupo_id
            INNER JOIN escuelas e ON e.id = g.escuela_id
            LEFT JOIN alumnos a ON a.id = fm.alumno_id
            LEFT JOIN profesores p ON p.id = fm.profesor_id
            ORDER BY fm.fecha_creacion DESC, fm.id DESC
        `)

        return res.status(200).json({
            ok: true,
            mensaje: 'Mensajes del foro de estudiantes consultados correctamente.',
            datos: mensajes
        })
    } catch (error) {
        console.error('Error al consultar el foro de estudiantes:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudo consultar el foro de estudiantes.'
        })
    }
}

function ocultarMensajeEstudiante(req, res) {
    return moderarMensaje(req, res, 'estudiantes', 'OCULTAR')
}

function mostrarMensajeEstudiante(req, res) {
    return moderarMensaje(req, res, 'estudiantes', 'MOSTRAR')
}

function eliminarMensajeEstudiante(req, res) {
    return moderarMensaje(req, res, 'estudiantes', 'ELIMINAR')
}

// =====================================================
// FORO DE PROFESORES
// =====================================================

async function getForoProfesores(req, res) {
    try {
        const [mensajes] = await db.query(`
            SELECT
                fp.id,
                fp.escuela_id,
                fp.profesor_id,
                fp.titulo,
                fp.mensaje,
                fp.fecha_creacion,
                fp.activo,
                e.nombre AS escuela,
                CONCAT(p.nombre, ' ', p.apellidos) AS autor,
                (
                    SELECT ma.accion
                    FROM foro_moderacion_auditoria ma
                    WHERE ma.tabla_origen = 'foro_profesores'
                      AND ma.mensaje_id = fp.id
                    ORDER BY ma.id DESC
                    LIMIT 1
                ) AS ultima_accion
            FROM foro_profesores fp
            INNER JOIN escuelas e ON e.id = fp.escuela_id
            INNER JOIN profesores p ON p.id = fp.profesor_id
            ORDER BY fp.fecha_creacion DESC, fp.id DESC
        `)

        return res.status(200).json({
            ok: true,
            mensaje: 'Mensajes del foro de profesores consultados correctamente.',
            datos: mensajes
        })
    } catch (error) {
        console.error('Error al consultar el foro de profesores:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudo consultar el foro de profesores.'
        })
    }
}

function ocultarMensajeProfesor(req, res) {
    return moderarMensaje(req, res, 'profesores', 'OCULTAR')
}

function mostrarMensajeProfesor(req, res) {
    return moderarMensaje(req, res, 'profesores', 'MOSTRAR')
}

function eliminarMensajeProfesor(req, res) {
    return moderarMensaje(req, res, 'profesores', 'ELIMINAR')
}

// =====================================================
// MATERIALES PUBLICADOS
// =====================================================


async function getRecursosAdmin(req, res) {
    try {
        const [recursos] = await db.query(`
            SELECT
                r.id,
                r.escuela_id,
                r.grupo_id,
                r.profesor_id,
                r.titulo,
                r.descripcion,
                r.nombre_archivo,
                r.ruta_archivo,
                r.url,
                r.tipo,
                r.publicado,
                r.eliminado_profesor,
                r.fecha_publicacion,
                e.nombre AS escuela,
                g.nombre AS grupo,
                c.nombre AS curso,
                c.idioma,
                c.nivel,
                CONCAT(p.nombre, ' ', p.apellidos) AS profesor
            FROM recursos r
            INNER JOIN escuelas e ON e.id = r.escuela_id
            INNER JOIN profesores p ON p.id = r.profesor_id
            LEFT JOIN grupos g ON g.id = r.grupo_id
            LEFT JOIN cursos c ON c.id = g.curso_id
            ORDER BY r.fecha_publicacion DESC, r.id DESC
        `)

        return res.status(200).json({
            ok: true,
            mensaje: 'Materiales consultados correctamente.',
            datos: recursos
        })
    } catch (error) {
        console.error('Error al consultar los materiales:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudieron consultar los materiales.'
        })
    }
}


async function retirarRecurso(req, res) {
    const id = obtenerIdValido(req.params.id)

    if (!id) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El identificador del material no es válido.'
        })
    }

    try {
        const [result] = await db.query(
            `UPDATE recursos
             SET publicado = 0
             WHERE id = ? AND publicado = 1`,
            [id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'El material no existe o ya está retirado.'
            })
        }

        return res.status(200).json({
            ok: true,
            mensaje: 'Material retirado de la publicación correctamente.'
        })
    } catch (error) {
        console.error('Error al retirar un material:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudo retirar el material.'
        })
    }
}

// =====================================================
// DESCARGAR MATERIAL COMO ADMINISTRADOR
// =====================================================

async function descargarRecursoAdmin(req, res) {
    const id = obtenerIdValido(req.params.id)

    if (!id) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El identificador del material no es válido.'
        })
    }

    try {
        const [recursos] = await db.query(
            `SELECT nombre_archivo, ruta_archivo
             FROM recursos
             WHERE id = ?
             LIMIT 1`,
            [id]
        )

        if (!recursos.length) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se encontró el material.'
            })
        }

        const recurso = recursos[0]

        if (!recurso.ruta_archivo) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Este material no tiene un archivo adjunto. Puede contener un enlace externo.'
            })
        }

        const rutaCompleta = obtenerRutaArchivoRecurso(
            recurso.ruta_archivo
        )

        if (!rutaCompleta) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La ruta del archivo no es válida.'
            })
        }

        return res.download(
            rutaCompleta,
            recurso.nombre_archivo || path.basename(rutaCompleta),
            error => {
                if (error) {
                    console.error(
                        'Error al descargar material:',
                        error.message
                    )

                    if (!res.headersSent) {
                        res.status(
                            error.code === 'ENOENT' ? 404 : 500
                        ).json({
                            ok: false,
                            mensaje: 'No se pudo descargar el archivo.'
                        })
                    }
                }
            }
        )

    } catch (error) {
        console.error('Error en la descarga administrativa:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudo descargar el material.'
        })
    }
}

// =====================================================
// ELIMINAR DEFINITIVAMENTE UN MATERIAL COMO ADMIN
// =====================================================

async function eliminarRecursoAdmin(req, res) {
    const id = obtenerIdValido(req.params.id)

    if (!id) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El identificador del material no es válido.'
        })
    }

    try {
        const [recursos] = await db.query(
            `SELECT id, ruta_archivo
             FROM recursos
             WHERE id = ?
             LIMIT 1`,
            [id]
        )

        if (!recursos.length) {
            return res.status(404).json({
                ok: false,
                mensaje: 'El material no existe o ya fue eliminado.'
            })
        }

        const recurso = recursos[0]

        let rutaCompleta = null

        if (recurso.ruta_archivo) {
            rutaCompleta = obtenerRutaArchivoRecurso(
                recurso.ruta_archivo
            )

            if (!rutaCompleta) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La ruta del archivo no es válida. No se ha eliminado el registro.'
                })
            }
        }

        // Primero eliminamos el registro de la base de datos.
        const [resultado] = await db.query(
            `DELETE FROM recursos
             WHERE id = ?`,
            [id]
        )

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'El material ya no existe.'
            })
        }

        // Después intentamos eliminar el archivo físico.
        if (rutaCompleta) {
            try {
                await fs.unlink(rutaCompleta)
            } catch (errorArchivo) {
                if (errorArchivo.code !== 'ENOENT') {
                    console.error(
                        'El registro fue eliminado, pero no se pudo borrar el archivo:',
                        errorArchivo.message
                    )

                    return res.status(200).json({
                        ok: true,
                        mensaje: 'El registro se eliminó, pero no se pudo borrar el archivo físico. Será necesario revisar el almacenamiento.'
                    })
                }
            }
        }

        return res.status(200).json({
            ok: true,
            mensaje: 'Material y archivo eliminados definitivamente.'
        })

    } catch (error) {
        console.error('Error al eliminar definitivamente el material:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudo eliminar definitivamente el material.'
        })
    }
}

module.exports = {
    getForoEstudiantes,
    ocultarMensajeEstudiante,
    mostrarMensajeEstudiante,
    eliminarMensajeEstudiante,
    getForoProfesores,
    ocultarMensajeProfesor,
    mostrarMensajeProfesor,
    eliminarMensajeProfesor,
    getRecursosAdmin,
    retirarRecurso,
    descargarRecursoAdmin,
    eliminarRecursoAdmin
}