
const db = require('../config/database');

async function getPerfilAlumno(req, res) {
    const alumnoId = Number(req.params.id);

    if (!Number.isInteger(alumnoId) || alumnoId < 1) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El identificador del alumno no es válido.'
        });
    }

    try {
        const [alumnos] = await db.query(
            `SELECT
                a.id,
                a.nombre,
                a.apellidos,
                a.tipo_documento,
                a.documento,
                a.telefono,
                a.email,
                a.fecha_nacimiento,
                m.id AS matricula_id,
                m.estado AS estado_matricula,
                g.id AS grupo_id,
                g.nombre AS grupo,
                g.aula,
                c.nombre AS curso,
                c.idioma,
                c.nivel,
                e.id AS escuela_id,
                e.nombre AS escuela,
                p.id AS profesor_id,
                p.nombre AS profesor_nombre,
                p.apellidos AS profesor_apellidos
            FROM alumnos a
            LEFT JOIN matriculas m
                ON m.alumno_id = a.id
                AND m.estado = 'ACTIVA'
            LEFT JOIN grupos g
                ON g.id = m.grupo_id
                AND g.activo = 1
            LEFT JOIN cursos c
                ON c.id = g.curso_id
            LEFT JOIN escuelas e
                ON e.id = g.escuela_id
            LEFT JOIN profesores p
                ON p.id = g.profesor_id
            WHERE a.id = ?
            LIMIT 1`,
            [alumnoId]
        );

        if (alumnos.length === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se ha encontrado el alumno.'
            });
        }

        return res.json({
            ok: true,
            datos: alumnos[0]
        });
    } catch (error) {
        console.error('Error al obtener el perfil del alumno:', error);

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido cargar el perfil del alumno.'
        });
    }
}


async function getMiPerfilAlumno(req, res) {
    const alumnoId = req.alumnoId

    try {
        const db = require('../config/database')

        const [alumnos] = await db.query(
            `SELECT
                a.id,
                a.nombre,
                a.apellidos,
                a.tipo_documento,
                a.documento,
                a.telefono,
                a.email,
                a.fecha_nacimiento,
                m.id AS matricula_id,
                m.estado AS estado_matricula,
                g.id AS grupo_id,
                g.nombre AS grupo,
                g.aula,
                c.nombre AS curso,
                c.idioma,
                c.nivel,
                e.id AS escuela_id,
                e.nombre AS escuela,
                p.id AS profesor_id,
                p.nombre AS profesor_nombre,
                p.apellidos AS profesor_apellidos
            FROM alumnos a
            LEFT JOIN matriculas m
                ON m.alumno_id = a.id
                AND m.estado = 'ACTIVA'
            LEFT JOIN grupos g
                ON g.id = m.grupo_id
                AND g.activo = 1
            LEFT JOIN cursos c
                ON c.id = g.curso_id
            LEFT JOIN escuelas e
                ON e.id = g.escuela_id
            LEFT JOIN profesores p
                ON p.id = g.profesor_id
            WHERE a.id = ?
              AND a.activo = 1
            LIMIT 1`,
            [alumnoId]
        )

        if (alumnos.length === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se ha encontrado el perfil del alumno.'
            })
        }

        return res.json({
            ok: true,
            datos: alumnos[0]
        })
    } catch (error) {
        console.error('Error al obtener el perfil propio:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido cargar el perfil.'
        })
    }
}


module.exports = {
    getPerfilAlumno,
    getMiPerfilAlumno
};

