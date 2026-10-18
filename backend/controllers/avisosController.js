
const Aviso = require('../model/collections/avisosModel')

const getAvisosByEscuela = async (req, res) => {
    try {
        const escuelaId = Number(req.query.escuelaId)

        // IDs confirmados de las dos escuelas del proyecto.
        if (![1, 2].includes(escuelaId)) {
            return res.status(400).json({
                ok: false,
                error: 'Debes indicar una escuela válida: 1 o 2.'
            })
        }

        const avisos = await Aviso.getAvisosByEscuela(escuelaId)

        return res.json({
            ok: true,
            escuelaId,
            avisos
        })
    } catch (error) {
        console.error('Error al obtener avisos:', error)

        return res.status(500).json({
            ok: false,
            error: 'Error al obtener los avisos.'
        })
    }
}

// La publicación permanecerá deshabilitada hasta implementar
// autenticación y autorización de profesores en el servidor.
const publicarAvisoNoDisponible = (req, res) => {
    return res.status(403).json({
        ok: false,
        error: 'La publicación requiere acceso verificado de profesor.'
    })
}

module.exports = {
    getAvisosByEscuela,
    publicarAvisoNoDisponible
}
