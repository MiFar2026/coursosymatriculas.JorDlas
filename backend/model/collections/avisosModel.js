
const db = require('../../config/database')

const getAvisosByEscuela = async (escuelaId) => {
    const [rows] = await db.query(
        `SELECT
            a.id,
            a.grupo_id,
            g.nombre AS grupo,
            a.profesor_id,
            a.titulo,
            a.mensaje,
            a.tipo,
            a.fecha_publicacion,
            a.fecha_expiracion
        FROM avisos a
        INNER JOIN grupos g
            ON g.id = a.grupo_id
        INNER JOIN escuelas e
            ON e.id = g.escuela_id
        WHERE e.id = ?
            AND e.activa = 1
            AND g.activo = 1
            AND a.activo = 1
            AND (
                a.tipo = 'PERMANENTE'
                OR (
                    a.tipo = 'DIARIO'
                    AND a.fecha_expiracion IS NOT NULL
                    AND a.fecha_expiracion > NOW()
                )
            )
        ORDER BY a.fecha_publicacion DESC`,
        [escuelaId]
    )

    return rows
}

module.exports = {
    getAvisosByEscuela
}
