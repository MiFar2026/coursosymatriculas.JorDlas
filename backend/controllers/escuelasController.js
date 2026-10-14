
const db = require('../config/database')

// =====================================================
// OBTENER LAS ESCUELAS ACTIVAS
// GET /api/escuelas
// =====================================================

async function getEscuelas(req, res) {
    try {
        const [escuelas] = await db.query(`
            SELECT
                id,
                nombre
            FROM escuelas
            WHERE activa = TRUE
            ORDER BY nombre ASC
        `)

        res.status(200).json({
            ok: true,
            mensaje: 'Escuelas obtenidas correctamente.',
            datos: escuelas
        })

    } catch (error) {
        console.error(
            'Error al obtener las escuelas:',
            error.message
        )

        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener las escuelas.',
            datos: null
        })
    }
}

module.exports = {
    getEscuelas
}
