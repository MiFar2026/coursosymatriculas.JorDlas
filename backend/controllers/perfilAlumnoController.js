const db = require('../config/database');

async function getMiPerfilAlumno(req, res) {
    const alumnoId = Number(req.alumnoId);

    if (!Number.isInteger(alumnoId) || alumnoId < 1) {
        return res.status(401).json({
            ok: false,
            mensaje: 'La sesión del alumno no es válida.'
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
                a.pais_origen,
                a.telefono,
                a.email,
                a.fecha_nacimiento,
                m.id AS matricula_id,
                m.estado AS estado_matricula,
                g.id AS grupo_id,
                g.nombre AS grupo,
                g.turno,
                g.aula,
                c.id AS curso_id,
                c.nombre AS curso,
                c.idioma,
                c.nivel,
                e.id AS escuela_id,
                e.nombre AS escuela,
                p.id AS profesor_id,
                p.nombre AS profesor_nombre,
                p.apellidos AS profesor_apellidos
            FROM alumnos a
            LEFT JOIN (
                SELECT m1.*
                FROM matriculas m1
                INNER JOIN (
                    SELECT alumno_id, MAX(id) AS matricula_id
                    FROM matriculas
                    WHERE estado = 'ACTIVA'
                    GROUP BY alumno_id
                ) ultima
                    ON ultima.matricula_id = m1.id
            ) m ON m.alumno_id = a.id
            LEFT JOIN grupos g
                ON g.id = m.grupo_id
                AND g.activo = 1
            LEFT JOIN cursos c
                ON c.id = g.curso_id
                AND c.activo = 1
            LEFT JOIN escuelas e
                ON e.id = g.escuela_id
            LEFT JOIN profesores p
                ON p.id = g.profesor_id
                AND p.activo = 1
            WHERE a.id = ?
              AND a.activo = 1
            LIMIT 1`,
            [alumnoId]
        );

        if (alumnos.length === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se ha encontrado el perfil del alumno.'
            });
        }

        return res.status(200).json({
            ok: true,
            datos: alumnos[0]
        });
    } catch (error) {
        console.error('Error al obtener el perfil propio del alumno:', error);

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido cargar el perfil del alumno.'
        });
    }
}
async function actualizarMiPerfilAlumno(req, res) {
    const alumnoId = Number(req.alumnoId);
    const { email, telefono } = req.body;

    if (!Number.isInteger(alumnoId) || alumnoId < 1) {
        return res.status(401).json({
            ok: false,
            mensaje: 'La sesión del alumno no es válida.'
        });
    }

    if (typeof email !== 'string' || !email.trim()) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El correo electrónico es obligatorio.'
        });
    }

    const emailLimpio = email.trim();
    const telefonoLimpio =
        telefono == null ? '' :
        typeof telefono === 'string' ? telefono.trim() : null;

   if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio) ||
    emailLimpio.length > 150
) {
    return res.status(400).json({
        ok: false,
        mensaje: 'Introduce un correo electrónico válido.'
    })
}

    if (
        telefonoLimpio === null ||
        telefonoLimpio.length > 30
    ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El teléfono no es válido.'
        });
    }

    try {
        const [resultado] = await db.query(
            `UPDATE alumnos
             SET email = ?, telefono = ?
             WHERE id = ? AND activo = 1`,
            [emailLimpio, telefonoLimpio || null, alumnoId]
        );

        if (resultado.affectedRows === 0) {
            const [alumnos] = await db.query(
                'SELECT id FROM alumnos WHERE id = ? AND activo = 1 LIMIT 1',
                [alumnoId]
            );

            if (alumnos.length === 0) {
                return res.status(404).json({
                    ok: false,
                    mensaje: 'No se ha encontrado el perfil del alumno.'
                });
            }
        }

        const [alumnos] = await db.query(
            `SELECT id, nombre, apellidos, tipo_documento, documento,
                    pais_origen, telefono, email, fecha_nacimiento
             FROM alumnos
             WHERE id = ? AND activo = 1
             LIMIT 1`,
            [alumnoId]
        );

        return res.status(200).json({
            ok: true,
            mensaje: 'El perfil se ha actualizado correctamente.',
            datos: alumnos[0]
        });
    } catch (error) {
        console.error('Error al actualizar el perfil del alumno:', error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                ok: false,
                mensaje: 'Ese correo electrónico ya está registrado.'
            });
        }

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido actualizar el perfil del alumno.'
        });
    }
}

module.exports = {
    getMiPerfilAlumno,
    actualizarMiPerfilAlumno
};