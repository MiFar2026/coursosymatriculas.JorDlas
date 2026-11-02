
const Aviso = require('../model/collections/avisosModel')

// =====================================================
// 1. CONSULTAR TODOS LOS AVISOS
// Incluye activos, ocultos y caducados.
// =====================================================

const listarAvisosAdmin = async (req, res) => {
    try {
        const avisos = await Aviso.getTodosAvisosAdmin()

        return res.json({
            ok: true,
            avisos
        })
    } catch (error) {
        console.error('Error al listar avisos administrativos:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se han podido obtener los avisos.'
        })
    }
}

// =====================================================
// 2. PUBLICAR AVISO COMO ADMINISTRADOR
// =====================================================

const publicarAvisoAdmin = async (req, res) => {
    try {
        const escuelaRecibida =
            req.body.escuela_id !== undefined
                ? req.body.escuela_id
                : req.body.escuelaId

        const grupoRecibido =
            req.body.grupo_id !== undefined
                ? req.body.grupo_id
                : req.body.grupoId

        const fechaRecibida =
            req.body.fecha_expiracion !== undefined
                ? req.body.fecha_expiracion
                : req.body.fechaExpiracion

        const todasEscuelas =
            escuelaRecibida === null ||
            escuelaRecibida === 'TODAS'

        const escuelaId = todasEscuelas
            ? null
            : Number(escuelaRecibida)

        const grupoId =
            grupoRecibido === null ||
            grupoRecibido === undefined ||
            grupoRecibido === ''
                ? null
                : Number(grupoRecibido)

        const titulo = typeof req.body.titulo === 'string'
            ? req.body.titulo.trim()
            : ''

        const mensaje = typeof req.body.mensaje === 'string'
            ? req.body.mensaje.trim()
            : ''

        if (!todasEscuelas && ![1, 2].includes(escuelaId)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Debes seleccionar una escuela válida.'
            })
        }

        if (
            grupoId !== null &&
            (!Number.isInteger(grupoId) || grupoId < 1)
        ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El grupo seleccionado no es válido.'
            })
        }

        if (todasEscuelas && grupoId !== null) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Para enviar a todas las escuelas debes dejar el grupo sin seleccionar.'
            })
        }

        if (!titulo || titulo.length > 200) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El título es obligatorio y no puede superar los 200 caracteres.'
            })
        }

        if (!mensaje || mensaje.length > 5000) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El mensaje es obligatorio y no puede superar los 5000 caracteres.'
            })
        }

        if (grupoId !== null) {
            const pertenece = await Aviso.grupoPerteneceAEscuela(
                grupoId,
                escuelaId
            )

            if (!pertenece) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El grupo no pertenece a la escuela seleccionada.'
                })
            }
        }

        let fechaExpiracion = null

        if (
            fechaRecibida !== null &&
            fechaRecibida !== undefined &&
            fechaRecibida !== ''
        ) {
            if (
                typeof fechaRecibida !== 'string' ||
                !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(fechaRecibida)
            ) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La fecha de caducidad no tiene un formato válido.'
                })
            }

            fechaExpiracion = fechaRecibida.replace('T', ' ')

            const futura = await Aviso.fechaExpiracionEsFutura(
                fechaExpiracion
            )

            if (!futura) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La fecha de caducidad debe ser posterior a la fecha y hora actuales.'
                })
            }
        }

        const avisoId = await Aviso.crearAvisoAdmin({
            escuelaId,
            grupoId,
            titulo,
            mensaje,
            fechaExpiracion
        })

        return res.status(201).json({
            ok: true,
            mensaje: 'Aviso publicado correctamente.',
            aviso: {
                id: avisoId,
                escuela_id: escuelaId,
                grupo_id: grupoId,
                escuela: todasEscuelas
                    ? 'Todas las escuelas'
                    : escuelaId === 1
                        ? 'Biblioteca Joan Miró'
                        : 'Ateneu Aula 502',
                titulo,
                mensaje,
                origen: 'ADMIN',
                fechaExpiracion
            }
        })

    } catch (error) {
        console.error('Error al publicar aviso administrativo:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido publicar el aviso.'
        })
    }
}

// =====================================================
// 3. OCULTAR O RESTAURAR AVISO
// =====================================================

const cambiarEstadoAvisoAdmin = async (req, res) => {
    try {
        const avisoId = Number(req.params.id)
        const activo = req.body.activo

        if (!Number.isInteger(avisoId) || avisoId < 1) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El aviso seleccionado no es válido.'
            })
        }

        if (typeof activo !== 'boolean') {
            return res.status(400).json({
                ok: false,
                mensaje: 'Debes indicar si el aviso debe estar activo o no.'
            })
        }

        const resultado = await Aviso.cambiarEstadoAviso(
            avisoId,
            activo
        )

        if (!resultado) {
            return res.status(404).json({
                ok: false,
                mensaje: 'El aviso no existe o ya tenía ese estado.'
            })
        }

        return res.json({
            ok: true,
            mensaje: activo
                ? 'Aviso restaurado correctamente.'
                : 'Aviso ocultado correctamente.'
        })

    } catch (error) {
        console.error('Error al cambiar el estado del aviso:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido cambiar el estado del aviso.'
        })
    }
}

// =====================================================
// 4. EDITAR CUALQUIER AVISO
// =====================================================

const editarAvisoAdmin = async (req, res) => {
    try {
        const avisoId = Number(req.params.id)

        if (!Number.isInteger(avisoId) || avisoId < 1) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El aviso seleccionado no es válido.'
            })
        }

        const escuelaRecibida = req.body.escuela_id
        const grupoRecibido = req.body.grupo_id

        const todasEscuelas =
            escuelaRecibida === null ||
            escuelaRecibida === 'TODAS'

        const escuelaId = todasEscuelas
            ? null
            : Number(escuelaRecibida)

        const grupoId =
            grupoRecibido === null ||
            grupoRecibido === undefined ||
            grupoRecibido === ''
                ? null
                : Number(grupoRecibido)

        const titulo = typeof req.body.titulo === 'string'
            ? req.body.titulo.trim()
            : ''

        const mensaje = typeof req.body.mensaje === 'string'
            ? req.body.mensaje.trim()
            : ''

        const fechaRecibida = req.body.fecha_expiracion

        if (!todasEscuelas && ![1, 2].includes(escuelaId)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Debes seleccionar una escuela válida.'
            })
        }

        if (
            grupoId !== null &&
            (!Number.isInteger(grupoId) || grupoId < 1)
        ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El grupo seleccionado no es válido.'
            })
        }

        if (todasEscuelas && grupoId !== null) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Para todas las escuelas debes dejar el grupo sin seleccionar.'
            })
        }

        if (grupoId !== null) {
            const pertenece = await Aviso.grupoPerteneceAEscuela(
                grupoId,
                escuelaId
            )

            if (!pertenece) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El grupo no pertenece a la escuela seleccionada.'
                })
            }
        }

        if (!titulo || titulo.length > 200) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El título es obligatorio y no puede superar los 200 caracteres.'
            })
        }

        if (!mensaje || mensaje.length > 5000) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El mensaje es obligatorio y no puede superar los 5000 caracteres.'
            })
        }

        let fechaExpiracion = null

        if (
            fechaRecibida !== null &&
            fechaRecibida !== undefined &&
            fechaRecibida !== ''
        ) {
            if (
                typeof fechaRecibida !== 'string' ||
                !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(fechaRecibida) ||
                Number.isNaN(Date.parse(fechaRecibida))
            ) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La fecha de caducidad no es válida.'
                })
            }

            fechaExpiracion = fechaRecibida.replace('T', ' ')
        }

        const resultado = await Aviso.editarAvisoAdmin({
            avisoId,
            escuelaId,
            grupoId,
            titulo,
            mensaje,
            fechaExpiracion
        })

        if (!resultado) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se ha encontrado el aviso.'
            })
        }

        return res.json({
            ok: true,
            mensaje: 'Aviso actualizado correctamente.'
        })

    } catch (error) {
        console.error('Error al editar el aviso:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido editar el aviso.'
        })
    }
}

// =====================================================
// 5. CAMBIAR FECHA DE EXPIRACIÓN
// =====================================================

const cambiarFechaExpiracionAdmin = async (req, res) => {
    try {
        const avisoId = Number(req.params.id)
        const fechaRecibida = req.body.fecha_expiracion

        if (!Number.isInteger(avisoId) || avisoId < 1) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El aviso seleccionado no es válido.'
            })
        }

        let fechaExpiracion = null

        if (
            fechaRecibida !== null &&
            fechaRecibida !== undefined &&
            fechaRecibida !== ''
        ) {
            if (
                typeof fechaRecibida !== 'string' ||
                !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(fechaRecibida) ||
                Number.isNaN(Date.parse(fechaRecibida))
            ) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La fecha de caducidad no es válida.'
                })
            }

            fechaExpiracion = fechaRecibida.replace('T', ' ')
        }

        const resultado = await Aviso.cambiarFechaExpiracionAdmin(
            avisoId,
            fechaExpiracion
        )

        if (!resultado) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se ha encontrado el aviso o no se han producido cambios.'
            })
        }

        return res.json({
            ok: true,
            mensaje: fechaExpiracion
                ? 'Fecha de expiración actualizada correctamente.'
                : 'El aviso ya no tiene fecha de expiración.'
        })

    } catch (error) {
        console.error('Error al cambiar la fecha del aviso:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido cambiar la fecha de expiración.'
        })
    }
}

// =====================================================
// 6. AMPLIAR UN MES UN AVISO DE PROFESOR
// =====================================================

const ampliarAvisoAdmin = async (req, res) => {
    try {
        const avisoId = Number(req.params.id)

        if (!Number.isInteger(avisoId) || avisoId < 1) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El aviso seleccionado no es válido.'
            })
        }

        const resultado = await Aviso.ampliarAvisoProfesor(avisoId)

        if (!resultado) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se ha encontrado un aviso de profesor para ampliar.'
            })
        }

        return res.json({
            ok: true,
            mensaje: 'La caducidad del aviso se ha ampliado un mes.'
        })

    } catch (error) {
        console.error('Error al ampliar el aviso:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido ampliar el aviso.'
        })
    }
}

// =====================================================
// 7. ELIMINAR DEFINITIVAMENTE CUALQUIER AVISO
// =====================================================

const eliminarAvisoAdmin = async (req, res) => {
    try {
        const avisoId = Number(req.params.id)

        if (!Number.isInteger(avisoId) || avisoId < 1) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El aviso seleccionado no es válido.'
            })
        }

        const resultado = await Aviso.eliminarAvisoAdmin(avisoId)

        if (!resultado) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se ha encontrado el aviso.'
            })
        }

        return res.json({
            ok: true,
            mensaje: 'Aviso eliminado definitivamente.'
        })

    } catch (error) {
        console.error('Error al eliminar el aviso:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido eliminar el aviso.'
        })
    }
}

// =====================================================
// EXPORTAR FUNCIONES
// =====================================================

module.exports = {
    listarAvisosAdmin,
    publicarAvisoAdmin,
    cambiarEstadoAvisoAdmin,
    editarAvisoAdmin,
    cambiarFechaExpiracionAdmin,
    ampliarAvisoAdmin,
    eliminarAvisoAdmin
}
