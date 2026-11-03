
const db = require('../../config/database')

// =====================================================
// OBTENER LAS MATRÍCULAS
// GET /api/matriculas
// Se incluyen las retiradas para que administración
// pueda recuperarlas.
// =====================================================

const getMatriculas = async () => {
    const [rows] = await db.query(`
        SELECT
            m.id,
            m.alumno_id,
            m.grupo_id,
            m.fecha_matricula,
            m.estado,
            m.oculto_admin,
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

    // Comprobar que el alumno existe y está activo.
    const [alumnos] = await db.query(
        `SELECT id
         FROM alumnos
         WHERE id = ? AND activo = 1
         LIMIT 1`,
        [alumno_id]
    )

    if (alumnos.length === 0) {
        const error = new Error(
            'El alumno no existe o no está activo.'
        )
        error.statusCode = 400
        throw error
    }

    // Comprobar que el grupo, curso y escuela
    // están activos y no han sido retirados.
    const [grupos] = await db.query(
        `SELECT g.id
         FROM grupos g
         INNER JOIN cursos c ON c.id = g.curso_id
         INNER JOIN escuelas e ON e.id = g.escuela_id
         WHERE g.id = ?
           AND g.activo = 1
           AND g.oculto_admin = 0
           AND c.activo = 1
           AND c.oculto_admin = 0
           AND e.activa = 1
           AND e.oculto_admin = 0
         LIMIT 1`,
        [grupo_id]
    )

    if (grupos.length === 0) {
        const error = new Error(
            'El grupo, curso o escuela no está disponible para nuevas matrículas.'
        )
        error.statusCode = 400
        throw error
    }

    const [result] = await db.query(
        `INSERT INTO matriculas
            (alumno_id, grupo_id, fecha_matricula)
         VALUES (?, ?, CURDATE())`,
        [alumno_id, grupo_id]
    )

    return result.insertId
}

// =====================================================
// RETIRAR UNA MATRÍCULA
// DELETE /api/matriculas/:id
// No elimina el registro de SQL.
// =====================================================

const deleteMatricula = async (id) => {
    const [result] = await db.query(
        `UPDATE matriculas
         SET oculto_admin = 1
         WHERE id = ?
           AND oculto_admin = 0`,
        [id]
    )

    return result.affectedRows
}

// =====================================================
// RECUPERAR UNA MATRÍCULA
// PATCH /api/matriculas/:id/recuperar
// Conserva el estado original de la matrícula.
// =====================================================

const restaurarMatricula = async (id) => {
    const [result] = await db.query(
        `UPDATE matriculas
         SET oculto_admin = 0
         WHERE id = ?
           AND oculto_admin = 1`,
        [id]
    )

    return result.affectedRows
}

// =====================================================
// CREAR UNA SOLICITUD DEL FORMULARIO
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
            turno_preferido,
            alumno_anterior,
            solicita_test
        } = datos

        // Validar el turno preferido.

        if (
            turno_preferido != null &&
            !['Mañana', 'Tarde'].includes(turno_preferido)
        ) {
            const error = new Error(
                'El turno preferido debe ser Mañana o Tarde.'
            )
            error.statusCode = 400
            throw error
        }

        // Comprobar que la escuela existe, está activa
        // y no ha sido retirada por administración.

        const [escuelas] = await connection.query(
            `SELECT id, nombre
             FROM escuelas
             WHERE id = ?
               AND activa = TRUE
               AND oculto_admin = 0
             LIMIT 1`,
            [escuela_id]
        )

        if (escuelas.length === 0) {
            const error = new Error(
                'La escuela seleccionada no existe o no está disponible.'
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
            // El alumno ya existe.
            // No duplicar ni modificar sus datos personales.

            alumnoId = alumnos[0].id

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
                turno_preferido,
                nivel_solicitado,
                idioma_solicitado,
                solicita_test_nivel,
                estado
            )
            VALUES (?, ?, ?, ?, ?, ?, 'PENDIENTE')`,
            [
                alumnoId,
                escuela_id,
                turno_preferido || null,
                nivelSolicitado,
                idiomaSolicitado,
                solicita_test ? 1 : 0
            ]
        )

        await connection.commit()

        return {
            alumno_id: alumnoId,
            solicitud_id: resultadoSolicitud.insertId,
            escuela: escuela.nombre,
            turno_preferido: turno_preferido || null,
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
    restaurarMatricula,
    createSolicitud
}
