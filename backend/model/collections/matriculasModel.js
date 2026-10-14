
const db = require('../../config/database')

// =====================================================
// OBTENER LAS MATRÍCULAS
// GET /api/matriculas
// =====================================================

const getMatriculas = async () => {
    const [rows] = await db.query(`
        SELECT
            m.id,
            m.alumno_id,
            m.grupo_id,
            m.fecha_matricula,
            m.estado,
            a.nombre AS alumno,
            a.apellidos,
            g.nombre AS grupo,
            c.nombre AS curso,
            e.nombre AS escuela
        FROM matriculas m
        INNER JOIN alumnos a
            ON m.alumno_id = a.id
        INNER JOIN grupos g
            ON m.grupo_id = g.id
        LEFT JOIN cursos c
            ON g.curso_id = c.id
        LEFT JOIN escuelas e
            ON g.escuela_id = e.id
        ORDER BY m.id DESC
    `)

    return rows
}

// =====================================================
// CREAR UNA MATRÍCULA DEFINITIVA
// POST /api/matriculas
// =====================================================

const createMatricula = async (matricula) => {
    const { alumno_id, grupo_id } = matricula

    const [result] = await db.query(
        `INSERT INTO matriculas
            (alumno_id, grupo_id, fecha_matricula)
         VALUES (?, ?, CURDATE())`,
        [alumno_id, grupo_id]
    )

    return result.insertId
}

// =====================================================
// ELIMINAR UNA MATRÍCULA
// DELETE /api/matriculas/:id
// =====================================================

const deleteMatricula = async (id) => {
    const [result] = await db.query(
        'DELETE FROM matriculas WHERE id = ?',
        [id]
    )

    return result.affectedRows
}

// =====================================================
// CREAR UNA SOLICITUD DE MATRÍCULA
// POST /api/matriculas/solicitudes
// =====================================================

const createSolicitud = async (datos) => {
    const connection = await db.getConnection()

    try {
        await connection.beginTransaction()

        const {
            nombre,
            apellidos,
            pais_origen,
            email,
            telefono,
            escuela_id,
            alumno_anterior,
            solicita_test,
        } = datos

        // Comprobar que la escuela existe y está activa.

        const [escuelas] = await connection.query(
            `SELECT id, nombre
             FROM escuelas
             WHERE id = ? AND activa = TRUE
             LIMIT 1`,
            [escuela_id]
        )

        if (escuelas.length === 0) {
            const error = new Error(
                'La escuela seleccionada no existe o no está activa.'
            )
            error.statusCode = 400
            throw error
        }

        const escuela = escuelas[0]

        // Preparar los niveles seleccionados.

        const niveles = Array.isArray(datos.niveles)
            ? datos.niveles
                .filter(nivel => typeof nivel === 'string')
                .map(nivel => nivel.trim())
                .filter(nivel => nivel !== '')
            : []

        const nivelSolicitado = niveles.length > 0
            ? niveles.join(', ')
            : null

        // Determinar el idioma solicitado.

        const idiomas = new Set()

        for (const nivel of niveles) {
            const normalizado = nivel
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()

            if (normalizado.startsWith('castellano')) {
                idiomas.add('ES')
            }

            if (normalizado.startsWith('catalan')) {
                idiomas.add('CA')
            }
        }

        const idiomaSolicitado = idiomas.size === 1
            ? [...idiomas][0]
            : null

        // Buscar si ya existe un alumno con ese correo.

        const [alumnos] = await connection.query(
            `SELECT id
             FROM alumnos
             WHERE email = ?
             LIMIT 1`,
            [email]
        )

        let alumnoId

        if (alumnos.length > 0) {
            // Actualizar el alumno existente.

            alumnoId = alumnos[0].id

            await connection.query(
                `UPDATE alumnos
                 SET nombre = ?,
                     apellidos = ?,
                     pais_origen = ?,
                     telefono = ?,
                     alumno_anterior = ?
                 WHERE id = ?`,
                [
                    nombre,
                    apellidos,
                    pais_origen || null,
                    telefono || null,
                    alumno_anterior ? 1 : 0,
                    alumnoId
                ]
            )
        } else {
            // Crear un alumno nuevo.

            const [resultadoAlumno] = await connection.query(
                `INSERT INTO alumnos (
                    nombre,
                    apellidos,
                    pais_origen,
                    email,
                    telefono,
                    alumno_anterior
                )
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    nombre,
                    apellidos,
                    pais_origen || null,
                    email,
                    telefono || null,
                    alumno_anterior ? 1 : 0
                ]
            )

            alumnoId = resultadoAlumno.insertId
        }

        // Crear la solicitud pendiente.

        const [resultadoSolicitud] = await connection.query(
            `INSERT INTO solicitudes_matricula (
                alumno_id,
                escuela_id,
                nivel_solicitado,
                idioma_solicitado,
                solicita_test_nivel,
                estado
            )
            VALUES (?, ?, ?, ?, ?, 'PENDIENTE')`,
            [
                alumnoId,
                escuela_id,
                nivelSolicitado,
                idiomaSolicitado,
                solicita_test ? 1 : 0
            ]
        )

        // Confirmar las operaciones juntas.

        await connection.commit()

        return {
            alumno_id: alumnoId,
            solicitud_id: resultadoSolicitud.insertId,
            escuela: escuela.nombre,
            nivel_solicitado: nivelSolicitado,
            idioma_solicitado: idiomaSolicitado
        }
    } catch (error) {
        await connection.rollback()
        throw error
    } finally {
        connection.release()
    }
}

module.exports = {
    getMatriculas,
    createMatricula,
    deleteMatricula,
    createSolicitud
}
