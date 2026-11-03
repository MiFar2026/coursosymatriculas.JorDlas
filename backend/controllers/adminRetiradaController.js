
const db = require('../config/database')

// =====================================================
// EJECUTAR CAMBIOS CON TRANSACCIÓN
// Nunca elimina registros SQL ni archivos.
// Si una consulta falla, se deshacen todas.
// =====================================================

async function ejecutarCambios(res, consultas, mensaje) {
    let conexion

    try {
        conexion = await db.getConnection()
        await conexion.beginTransaction()

        let afectados = 0

        for (const consulta of consultas) {
            const [resultado] = await conexion.query(
                consulta.sql,
                consulta.valores || []
            )

            afectados += resultado.affectedRows
        }

        await conexion.commit()

        return res.json({
            ok: true,
            mensaje,
            afectados
        })

    } catch (error) {
        if (conexion) {
            try {
                await conexion.rollback()
            } catch (errorRollback) {
                console.error(
                    'Error al deshacer la operación:',
                    errorRollback
                )
            }
        }

        console.error('Error en retirada administrativa:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudo completar la operación.'
        })

    } finally {
        if (conexion) {
            conexion.release()
        }
    }
}

// =====================================================
// FOROS
// Publicaciones y respuestas de alumnos y profesores.
// =====================================================

async function retirarTodosLosForos(req, res) {
    return ejecutarCambios(res, [
        {
            sql: `
                UPDATE foro_mensajes
                SET oculto_admin = 1
                WHERE oculto_admin = 0
            `
        },
        {
            sql: `
                UPDATE foro_profesores
                SET oculto_admin = 1
                WHERE oculto_admin = 0
            `
        },
        {
            sql: `
                UPDATE foro_profesores_respuestas
                SET oculto_admin = 1
                WHERE oculto_admin = 0
            `
        }
    ], 'Todos los foros se han retirado de la aplicación.')
}

// =====================================================
// MENSAJES
// Mensajes privados y mensajes de la tabla general.
// =====================================================

async function retirarTodosLosMensajes(req, res) {
    return ejecutarCambios(res, [
        {
            sql: `
                UPDATE mensajes_privados
                SET oculto_admin = 1
                WHERE oculto_admin = 0
            `
        },
        {
            sql: `
                UPDATE mensajes
                SET oculto_admin = 1
                WHERE oculto_admin = 0
            `
        }
    ], 'Todos los mensajes se han retirado de la aplicación.')
}

// =====================================================
// VALIDAR IDENTIFICADOR DE ESCUELA
// Biblioteca Joan Miró = 1
// Ateneu Aula 502 = 2
// =====================================================

function obtenerEscuelaId(req, res) {
    const id = Number(req.params.id)

    if (!Number.isSafeInteger(id) || ![1, 2].includes(id)) {
        res.status(400).json({
            ok: false,
            mensaje: 'El identificador de escuela no es válido.'
        })

        return null
    }

    return id
}

// =====================================================
// RETIRAR UNA ESCUELA
// No modifica sus cursos, grupos ni horarios.
// =====================================================

async function retirarEscuela(req, res) {
    const id = obtenerEscuelaId(req, res)

    if (!id) return

    return ejecutarCambios(res, [
        {
            sql: `
                UPDATE escuelas
                SET oculto_admin = 1
                WHERE id = ? AND oculto_admin = 0
            `,
            valores: [id]
        }
    ], 'La escuela se ha retirado de la aplicación.')
}

// =====================================================
// CURSOS
// =====================================================

async function retirarTodosLosCursos(req, res) {
    return ejecutarCambios(res, [
        {
            sql: `
                UPDATE cursos
                SET oculto_admin = 1
                WHERE oculto_admin = 0
            `
        }
    ], 'Todos los cursos se han retirado de la aplicación.')
}

// =====================================================
// GRUPOS
// =====================================================

async function retirarTodosLosGrupos(req, res) {
    return ejecutarCambios(res, [
        {
            sql: `
                UPDATE grupos
                SET oculto_admin = 1
                WHERE oculto_admin = 0
            `
        }
    ], 'Todos los grupos se han retirado de la aplicación.')
}

// =====================================================
// HORARIOS
// =====================================================

async function retirarTodosLosHorarios(req, res) {
    return ejecutarCambios(res, [
        {
            sql: `
                UPDATE horarios
                SET oculto_admin = 1
                WHERE oculto_admin = 0
            `
        }
    ], 'Todos los horarios se han retirado de la aplicación.')
}

// =====================================================
// RECUPERAR ESCUELA
// =====================================================

async function recuperarEscuela(req, res) {
    const id = obtenerEscuelaId(req, res)

    if (!id) return

    return ejecutarCambios(res, [
        {
            sql: `
                UPDATE escuelas
                SET oculto_admin = 0
                WHERE id = ? AND oculto_admin = 1
            `,
            valores: [id]
        }
    ], 'La escuela se ha recuperado.')
}

// =====================================================
// RECUPERAR CURSOS
// =====================================================

async function recuperarTodosLosCursos(req, res) {
    return ejecutarCambios(res, [
        {
            sql: `
                UPDATE cursos
                SET oculto_admin = 0
                WHERE oculto_admin = 1
            `
        }
    ], 'Los cursos se han recuperado.')
}

// =====================================================
// RECUPERAR GRUPOS
// =====================================================

async function recuperarTodosLosGrupos(req, res) {
    return ejecutarCambios(res, [
        {
            sql: `
                UPDATE grupos
                SET oculto_admin = 0
                WHERE oculto_admin = 1
            `
        }
    ], 'Los grupos se han recuperado.')
}

// =====================================================
// RECUPERAR HORARIOS
// =====================================================

async function recuperarTodosLosHorarios(req, res) {
    return ejecutarCambios(res, [
        {
            sql: `
                UPDATE horarios
                SET oculto_admin = 0
                WHERE oculto_admin = 1
            `
        }
    ], 'Los horarios se han recuperado.')
}

// =====================================================
// RECUPERAR FOROS
// =====================================================

async function recuperarTodosLosForos(req, res) {
    return ejecutarCambios(res, [
        {
            sql: `
                UPDATE foro_mensajes
                SET oculto_admin = 0
                WHERE oculto_admin = 1
            `
        },
        {
            sql: `
                UPDATE foro_profesores
                SET oculto_admin = 0
                WHERE oculto_admin = 1
            `
        },
        {
            sql: `
                UPDATE foro_profesores_respuestas
                SET oculto_admin = 0
                WHERE oculto_admin = 1
            `
        }
    ], 'Los foros se han recuperado.')
}

// =====================================================
// RECUPERAR MENSAJES
// =====================================================

async function recuperarTodosLosMensajes(req, res) {
    return ejecutarCambios(res, [
        {
            sql: `
                UPDATE mensajes_privados
                SET oculto_admin = 0
                WHERE oculto_admin = 1
            `
        },
        {
            sql: `
                UPDATE mensajes
                SET oculto_admin = 0
                WHERE oculto_admin = 1
            `
        }
    ], 'Los mensajes se han recuperado.')
}

// =====================================================
// EXPORTAR CONTROLADORES
// =====================================================

module.exports = {
    retirarTodosLosForos,
    retirarTodosLosMensajes,
    retirarEscuela,
    retirarTodosLosCursos,
    retirarTodosLosGrupos,
    retirarTodosLosHorarios,

    recuperarEscuela,
    recuperarTodosLosCursos,
    recuperarTodosLosGrupos,
    recuperarTodosLosHorarios,
    recuperarTodosLosForos,
    recuperarTodosLosMensajes
}
