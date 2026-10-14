
const db = require('../config/database')

async function getRecursos(req, res) {
    const escuela = (req.query.escuela || '').trim()
    const grupoIdTexto = req.query.grupo_id

    // Escuelas permitidas
    const escuelasPermitidas = [
        'Ateneu Aula 502',
        'Biblioteca Joan Miró'
    ]

    if (!escuelasPermitidas.includes(escuela)) {
        return res.status(400).json({
            ok: false,
            mensaje: 'La escuela indicada no es válida.',
            datos: null
        })
    }

    let grupoId = null

    if (grupoIdTexto !== undefined) {
        grupoId = Number(grupoIdTexto)

        if (!Number.isInteger(grupoId) || grupoId <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El identificador del grupo no es válido.',
                datos: null
            })
        }
    }

    try {
        let sql = `
            SELECT
                r.id,
                r.titulo,
                r.descripcion,
                r.nombre_archivo,
                r.ruta_archivo,
                r.tipo,
                r.fecha_publicacion,
                e.nombre AS escuela,
                g.id AS grupo_id,
                g.nombre AS grupo,
                c.nombre AS curso,
                c.idioma,
                c.nivel,
                p.nombre AS profesor_nombre,
                p.apellidos AS profesor_apellidos
            FROM recursos r
            INNER JOIN escuelas e
                ON e.id = r.escuela_id
            INNER JOIN profesores p
                ON p.id = r.profesor_id
            LEFT JOIN grupos g
                ON g.id = r.grupo_id
            LEFT JOIN cursos c
                ON c.id = g.curso_id
            WHERE
                e.nombre = ?
                AND e.activa = 1
                AND r.publicado = 1
                AND p.activo = 1
                AND (
                    r.grupo_id IS NULL
                    OR g.activo = 1
                )
        `

        const parametros = [escuela]

        // Filtrar por grupo solo si se ha indicado.
        if (grupoId !== null) {
            sql += ' AND r.grupo_id = ?'
            parametros.push(grupoId)
        }

        sql += `
            ORDER BY r.fecha_publicacion DESC, r.id DESC
        `

        const [recursos] = await db.query(sql, parametros)

        return res.status(200).json({
            ok: true,
            mensaje: recursos.length > 0
                ? 'Recursos encontrados.'
                : 'Todavía no hay recursos publicados.',
            datos: recursos
        })

    } catch (error) {
        console.error(
            'Error al obtener los recursos:',
            error.message
        )

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudieron consultar los recursos.',
            datos: null
        })
    }
}

module.exports = { getRecursos }
