
const db = require('../config/database')

async function getCursos(req, res) {
    try {
        const [cursos] = await db.query(`
            SELECT
                id,
                nombre,
                idioma,
                nivel
            FROM cursos
            WHERE activo = TRUE
            ORDER BY idioma ASC, nivel ASC
        `)

        res.status(200).json({
            ok: true,
            mensaje: 'Cursos obtenidos correctamente.',
            datos: cursos
        })
    } catch (error) {
        console.error('Error al obtener los cursos:', error.message)

        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener los cursos.',
            datos: null
        })
    }
}

module.exports = { getCursos }
