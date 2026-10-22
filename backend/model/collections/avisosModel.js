
const db = require('../../config/database')

// Avisos generales de una escuela.
// Los avisos individuales nunca se muestran en esta consulta.
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
        INNER JOIN grupos g ON g.id = a.grupo_id
        INNER JOIN escuelas e ON e.id = g.escuela_id
        WHERE e.id = ?
          AND e.activa = 1
          AND g.activo = 1
          AND a.activo = 1
          AND a.alumno_id IS NULL
          AND (
              a.tipo = 'PERMANENTE'
              OR (
                  a.tipo = 'DIARIO'
                  AND a.fecha_expiracion > NOW()
              )
          )
        ORDER BY a.fecha_publicacion DESC`,
        [escuelaId]
    )

    return rows
}

// Avisos que corresponden al alumno autenticado.
// Incluye avisos de sus grupos y avisos dirigidos solo a él.
const getAvisosByAlumno = async (alumnoId) => {
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
            a.fecha_expiracion,
            CASE
                WHEN a.alumno_id IS NULL THEN 'GRUPO'
                ELSE 'INDIVIDUAL'
            END AS destinatario
        FROM avisos a
        INNER JOIN grupos g
            ON g.id = a.grupo_id
        INNER JOIN escuelas e
            ON e.id = g.escuela_id
        INNER JOIN matriculas m
            ON m.grupo_id = a.grupo_id
           AND m.alumno_id = ?
           AND m.estado = 'ACTIVA'
        INNER JOIN alumnos al
            ON al.id = m.alumno_id
           AND al.activo = 1
        WHERE g.activo = 1
          AND e.activa = 1
          AND a.activo = 1
          AND (
              a.alumno_id IS NULL
              OR a.alumno_id = ?
          )
          AND (
              a.tipo = 'PERMANENTE'
              OR (
                  a.tipo = 'DIARIO'
                  AND a.fecha_expiracion IS NOT NULL
                  AND a.fecha_expiracion > NOW()
              )
          )
        ORDER BY a.fecha_publicacion DESC`,
        [alumnoId, alumnoId]
    )

    return rows
}

// Comprueba que el grupo pertenece al profesor autenticado
// y a su escuela, y que ambos siguen activos.
const profesorPuedePublicarEnGrupo = async (
    profesorId,
    escuelaId,
    grupoId
) => {
    const [rows] = await db.query(
        `SELECT g.id
         FROM grupos g
         INNER JOIN escuelas e
             ON e.id = g.escuela_id
         INNER JOIN profesores p
             ON p.id = g.profesor_id
         WHERE g.id = ?
           AND g.profesor_id = ?
           AND g.escuela_id = ?
           AND g.activo = 1
           AND e.activa = 1
           AND p.activo = 1
         LIMIT 1`,
        [grupoId, profesorId, escuelaId]
    )

    return rows.length > 0
}

// Comprueba que el alumno está activo y matriculado
// actualmente en el grupo elegido.
const alumnoPerteneceAlGrupo = async (alumnoId, grupoId) => {
    const [rows] = await db.query(
        `SELECT m.id
         FROM matriculas m
         INNER JOIN alumnos al
             ON al.id = m.alumno_id
         INNER JOIN grupos g
             ON g.id = m.grupo_id
         WHERE m.alumno_id = ?
           AND m.grupo_id = ?
           AND m.estado = 'ACTIVA'
           AND al.activo = 1
           AND g.activo = 1
         LIMIT 1`,
        [alumnoId, grupoId]
    )

    return rows.length > 0
}

// Guarda avisos de grupo o individuales.
// Los temporales caducan en 72 horas.
const crearAviso = async ({
    grupoId,
    profesorId,
    alumnoId,
    titulo,
    mensaje,
    tipo
}) => {
    let resultado

    if (tipo === 'DIARIO') {
        ;[resultado] = await db.query(
            `INSERT INTO avisos (
                grupo_id,
                alumno_id,
                profesor_id,
                titulo,
                mensaje,
                tipo,
                fecha_expiracion,
                activo
            )
            VALUES (
                ?, ?, ?, ?, ?, 'DIARIO',
                DATE_ADD(NOW(), INTERVAL 72 HOUR),
                1
            )`,
            [
                grupoId,
                alumnoId,
                profesorId,
                titulo,
                mensaje
            ]
        )
    } else {
        ;[resultado] = await db.query(
            `INSERT INTO avisos (
                grupo_id,
                alumno_id,
                profesor_id,
                titulo,
                mensaje,
                tipo,
                fecha_expiracion,
                activo
            )
            VALUES (?, ?, ?, ?, ?, 'PERMANENTE', NULL, 1)`,
            [
                grupoId,
                alumnoId,
                profesorId,
                titulo,
                mensaje
            ]
        )
    }

    return resultado.insertId
}

// Devuelve únicamente los grupos activos del profesor autenticado
// y pertenecientes a su escuela.
const getGruposByProfesor = async (profesorId, escuelaId) => {
    const [rows] = await db.query(
        `SELECT
            g.id,
            g.nombre,
            g.escuela_id
         FROM grupos g
         INNER JOIN escuelas e
             ON e.id = g.escuela_id
         INNER JOIN profesores p
             ON p.id = g.profesor_id
         WHERE g.profesor_id = ?
           AND g.escuela_id = ?
           AND g.activo = 1
           AND e.activa = 1
           AND p.activo = 1
         ORDER BY g.nombre`,
        [profesorId, escuelaId]
    )

    return rows
}

// Devuelve los alumnos activos con matrícula activa
// en un grupo autorizado del profesor.
const getAlumnosByGrupo = async (
    profesorId,
    escuelaId,
    grupoId
) => {
    const [rows] = await db.query(
        `SELECT DISTINCT
            al.id,
            al.nombre,
            al.apellidos
         FROM grupos g
         INNER JOIN escuelas e
             ON e.id = g.escuela_id
         INNER JOIN profesores p
             ON p.id = g.profesor_id
         INNER JOIN matriculas m
             ON m.grupo_id = g.id
         INNER JOIN alumnos al
             ON al.id = m.alumno_id
         WHERE g.id = ?
           AND g.profesor_id = ?
           AND g.escuela_id = ?
           AND g.activo = 1
           AND e.activa = 1
           AND p.activo = 1
           AND m.estado = 'ACTIVA'
           AND al.activo = 1
         ORDER BY al.apellidos, al.nombre`,
        [grupoId, profesorId, escuelaId]
    )

    return rows
}

module.exports = {
    getAvisosByEscuela,
    getAvisosByAlumno,
    profesorPuedePublicarEnGrupo,
    alumnoPerteneceAlGrupo,
    crearAviso,
    getGruposByProfesor,
    getAlumnosByGrupo
}