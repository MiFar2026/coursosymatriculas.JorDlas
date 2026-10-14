
const db = require('../config/database')

async function getHorarios(req, res) {
    const escuela = (req.query.escuela || '').trim()

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

    try {
        const [horarios] = await db.query(`
            SELECT
                h.id AS horario_id,
                h.dia_semana,
                h.hora_inicio,
                h.hora_fin,
                g.id AS grupo_id,
                g.nombre AS grupo,
                g.aula,
                c.nombre AS curso,
                c.idioma,
                c.nivel,
                e.nombre AS escuela,
                p.nombre AS profesor_nombre,
                p.apellidos AS profesor_apellidos
            FROM horarios h
            INNER JOIN grupos g
                ON g.id = h.grupo_id
            INNER JOIN cursos c
                ON c.id = g.curso_id
            INNER JOIN escuelas e
                ON e.id = g.escuela_id
            LEFT JOIN profesores p
                ON p.id = g.profesor_id
            WHERE
                e.nombre = ?
                AND e.activa = 1
                AND g.activo = 1
                AND c.activo = 1
                AND h.activo = 1
            ORDER BY
                FIELD(
                    h.dia_semana,
                    'Lunes',
                    'Martes',
                    'Miércoles',
                    'Jueves',
                    'Viernes',
                    'Sábado',
                    'Domingo'
                ),
                h.hora_inicio,
                c.nombre
        `, [escuela])

        return res.status(200).json({
            ok: true,
            mensaje: horarios.length > 0
                ? 'Horarios encontrados.'
                : 'Todavía no hay horarios publicados para esta escuela.',
            datos: horarios
        })

    } catch (error) {
        console.error(
            'Error al obtener los horarios:',
            error.message
        )

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudieron consultar los horarios.',
            datos: null
        })
    }
}

module.exports = { getHorarios }
