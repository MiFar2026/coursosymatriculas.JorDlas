
const db = require('../../config/database')

// =====================================================
// 1. AVISOS VISIBLES DE UNA ESCUELA
// =====================================================

const getAvisosByEscuela = async (escuelaId) => {
    const [rows] = await db.query(
        `SELECT
            a.id,
            a.escuela_id,
            a.grupo_id,
            CASE
                WHEN a.escuela_id IS NULL THEN 'Todas las escuelas'
                WHEN a.grupo_id IS NULL THEN 'Toda la escuela'
                ELSE g.nombre
            END AS grupo,
            a.profesor_id,
            a.origen,
            a.titulo,
            a.mensaje,
            a.tipo,
            a.fecha_publicacion,
            a.fecha_expiracion
        FROM avisos a
        LEFT JOIN escuelas e
            ON e.id = a.escuela_id
        LEFT JOIN grupos g
            ON g.id = a.grupo_id
        WHERE (
            a.escuela_id = ?
            OR a.escuela_id IS NULL
        )
          AND (
              a.escuela_id IS NULL
              OR e.activa = 1
          )
          AND a.activo = 1
          AND (
              a.grupo_id IS NULL
              OR g.activo = 1
          )
          AND (
              a.fecha_expiracion IS NULL
              OR a.fecha_expiracion > NOW()
          )
        ORDER BY a.fecha_publicacion DESC`,
        [escuelaId]
    )

    return rows
}

// =====================================================
// AVISOS DE ADMINISTRACIÓN PARA EL PROFESOR
// =====================================================

const getAvisosAdminByEscuela = async (escuelaId) => {
    const [rows] = await db.query(
        `SELECT
            a.id,
            a.escuela_id,
            a.grupo_id,
            CASE
                WHEN a.escuela_id IS NULL THEN 'Todas las escuelas'
                WHEN a.grupo_id IS NULL THEN 'Toda la escuela'
                ELSE g.nombre
            END AS grupo,
            a.origen,
            a.titulo,
            a.mensaje,
            a.tipo,
            a.fecha_publicacion,
            a.fecha_expiracion
        FROM avisos a
        LEFT JOIN escuelas e
            ON e.id = a.escuela_id
        LEFT JOIN grupos g
            ON g.id = a.grupo_id
        WHERE a.origen = 'ADMIN'
          AND (
              a.escuela_id = ?
              OR a.escuela_id IS NULL
          )
          AND (
              a.escuela_id IS NULL
              OR e.activa = 1
          )
          AND a.activo = 1
          AND (
              a.grupo_id IS NULL
              OR g.activo = 1
          )
          AND (
              a.fecha_expiracion IS NULL
              OR a.fecha_expiracion > NOW()
          )
        ORDER BY a.fecha_publicacion DESC`,
        [escuelaId]
    )

    return rows
}

// =====================================================
// 2. AVISOS QUE PUEDE VER UN ALUMNO
// =====================================================

const getAvisosByAlumno = async (alumnoId) => {
    const [rows] = await db.query(
        `SELECT
            a.id,
            a.escuela_id,
            a.grupo_id,
            CASE
                WHEN a.escuela_id IS NULL THEN 'Todas las escuelas'
                WHEN a.grupo_id IS NULL THEN 'Toda la escuela'
                ELSE g.nombre
            END AS grupo,
            a.profesor_id,
            a.origen,
            a.titulo,
            a.mensaje,
            a.tipo,
            a.fecha_publicacion,
            a.fecha_expiracion,
            CASE
                WHEN a.escuela_id IS NULL THEN 'TODAS'
                WHEN a.grupo_id IS NULL THEN 'ESCUELA'
                ELSE 'GRUPO'
            END AS destinatario
        FROM avisos a
        LEFT JOIN escuelas e
            ON e.id = a.escuela_id
        LEFT JOIN grupos g
            ON g.id = a.grupo_id
        INNER JOIN alumnos al
            ON al.id = ?
           AND al.activo = 1
        WHERE (
            a.escuela_id IS NULL
            OR e.activa = 1
        )
          AND a.activo = 1
          AND (
              a.fecha_expiracion IS NULL
              OR a.fecha_expiracion > NOW()
          )
          AND (
              (
                  a.escuela_id IS NOT NULL
                  AND a.grupo_id IS NOT NULL
                  AND g.activo = 1
                  AND EXISTS (
                      SELECT 1
                      FROM matriculas m
                      WHERE m.alumno_id = al.id
                        AND m.grupo_id = a.grupo_id
                        AND m.estado = 'ACTIVA'
                  )
              )
              OR
              (
                  a.escuela_id IS NOT NULL
                  AND a.grupo_id IS NULL
                  AND EXISTS (
                      SELECT 1
                      FROM matriculas m
                      INNER JOIN grupos gm
                          ON gm.id = m.grupo_id
                      WHERE m.alumno_id = al.id
                        AND m.estado = 'ACTIVA'
                        AND gm.escuela_id = a.escuela_id
                        AND gm.activo = 1
                  )
              )
              OR
              (
                  a.escuela_id IS NULL
                  AND a.grupo_id IS NULL
                  AND EXISTS (
                      SELECT 1
                      FROM matriculas m
                      INNER JOIN grupos gm
                          ON gm.id = m.grupo_id
                      INNER JOIN escuelas em
                          ON em.id = gm.escuela_id
                      WHERE m.alumno_id = al.id
                        AND m.estado = 'ACTIVA'
                        AND gm.activo = 1
                        AND em.activa = 1
                  )
              )
          )
        ORDER BY a.fecha_publicacion DESC`,
        [alumnoId]
    )

    return rows
}

// =====================================================
// 3. COMPROBAR SI UN PROFESOR PUEDE PUBLICAR EN UN GRUPO
// =====================================================

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

// =====================================================
// 4. PUBLICAR AVISO DE PROFESOR
// Caduca automáticamente a las 72 horas.
// =====================================================

const crearAviso = async ({
    grupoId,
    escuelaId,
    profesorId,
    titulo,
    mensaje
}) => {
    const [resultado] = await db.query(
        `INSERT INTO avisos (
            escuela_id,
            grupo_id,
            profesor_id,
            origen,
            titulo,
            mensaje,
            tipo,
            fecha_expiracion,
            activo
        )
        VALUES (
            ?, ?, ?, 'PROFESOR', ?, ?,
            'DIARIO',
            DATE_ADD(NOW(), INTERVAL 72 HOUR),
            1
        )`,
        [
            escuelaId,
            grupoId,
            profesorId,
            titulo,
            mensaje
        ]
    )

    return resultado.insertId
}

// =====================================================
// 5. GRUPOS DEL PROFESOR AUTENTICADO
// =====================================================

const getGruposByProfesor = async (
    profesorId,
    escuelaId
) => {
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

// =====================================================
// 6. COMPROBAR QUE UN GRUPO PERTENECE A UNA ESCUELA
// =====================================================

const grupoPerteneceAEscuela = async (
    grupoId,
    escuelaId
) => {
    const [rows] = await db.query(
        `SELECT g.id
         FROM grupos g
         INNER JOIN escuelas e
             ON e.id = g.escuela_id
         WHERE g.id = ?
           AND g.escuela_id = ?
           AND g.activo = 1
           AND e.activa = 1
         LIMIT 1`,
        [grupoId, escuelaId]
    )

    return rows.length > 0
}

// =====================================================
// 7. CREAR AVISO DE ADMINISTRACIÓN
// =====================================================

const crearAvisoAdmin = async ({
    escuelaId,
    grupoId,
    titulo,
    mensaje,
    fechaExpiracion
}) => {
    const tipo = fechaExpiracion === null
        ? 'PERMANENTE'
        : 'DIARIO'

    const [resultado] = await db.query(
        `INSERT INTO avisos (
            escuela_id,
            grupo_id,
            profesor_id,
            origen,
            titulo,
            mensaje,
            tipo,
            fecha_expiracion,
            activo
        )
        VALUES (?, ?, NULL, 'ADMIN', ?, ?, ?, ?, 1)`,
        [
            escuelaId,
            grupoId,
            titulo,
            mensaje,
            tipo,
            fechaExpiracion
        ]
    )

    return resultado.insertId
}

// =====================================================
// 8. OBTENER TODOS LOS AVISOS PARA ADMINISTRACIÓN
// Incluye activos, ocultos y caducados.
// =====================================================

const getTodosAvisosAdmin = async () => {
    const [rows] = await db.query(
        `SELECT
            a.id,
            a.escuela_id,
            CASE
                WHEN a.escuela_id IS NULL THEN 'Todas las escuelas'
                ELSE e.nombre
            END AS escuela,
            a.grupo_id,
            CASE
                WHEN a.escuela_id IS NULL THEN 'Todas las escuelas'
                WHEN a.grupo_id IS NULL THEN 'Toda la escuela'
                ELSE g.nombre
            END AS grupo,
            a.profesor_id,
            a.origen,
            a.titulo,
            a.mensaje,
            a.tipo,
            a.fecha_publicacion,
            a.fecha_expiracion,
            a.activo
        FROM avisos a
        LEFT JOIN escuelas e
            ON e.id = a.escuela_id
        LEFT JOIN grupos g
            ON g.id = a.grupo_id
        ORDER BY a.fecha_publicacion DESC`
    )

    return rows
}

// =====================================================
// 9. OCULTAR O RESTAURAR UN AVISO
// =====================================================

const cambiarEstadoAviso = async (
    avisoId,
    activo
) => {
    const [resultado] = await db.query(
        `UPDATE avisos
         SET activo = ?
         WHERE id = ?`,
        [activo ? 1 : 0, avisoId]
    )

    return resultado.affectedRows
}

// =====================================================
// 10. EDITAR CUALQUIER AVISO DESDE ADMINISTRACIÓN
// Funciona para ADMIN y PROFESOR.
// =====================================================

const editarAvisoAdmin = async ({
    avisoId,
    escuelaId,
    grupoId,
    titulo,
    mensaje,
    fechaExpiracion
}) => {
    const tipo = fechaExpiracion === null
        ? 'PERMANENTE'
        : 'DIARIO'

    const [resultado] = await db.query(
        `UPDATE avisos
         SET escuela_id = ?,
             grupo_id = ?,
             titulo = ?,
             mensaje = ?,
             fecha_expiracion = ?,
             tipo = ?
         WHERE id = ?`,
        [
            escuelaId,
            grupoId,
            titulo,
            mensaje,
            fechaExpiracion,
            tipo,
            avisoId
        ]
    )

    return resultado.affectedRows
}

// =====================================================
// 11. CAMBIAR FECHA DE EXPIRACIÓN
// NULL = el aviso no caduca.
// =====================================================

const cambiarFechaExpiracionAdmin = async (
    avisoId,
    fechaExpiracion
) => {
    const tipo = fechaExpiracion === null
        ? 'PERMANENTE'
        : 'DIARIO'

    const [resultado] = await db.query(
        `UPDATE avisos
         SET fecha_expiracion = ?,
             tipo = ?
         WHERE id = ?`,
        [
            fechaExpiracion,
            tipo,
            avisoId
        ]
    )

    return resultado.affectedRows
}

// =====================================================
// 12. ELIMINAR DEFINITIVAMENTE CUALQUIER AVISO
// Funciona para ADMIN y PROFESOR.
// =====================================================

const eliminarAvisoAdmin = async (avisoId) => {
    const [resultado] = await db.query(
        `DELETE FROM avisos
         WHERE id = ?`,
        [avisoId]
    )

    return resultado.affectedRows
}

// =====================================================
// 13. AMPLIAR UN AVISO DE PROFESOR UN MES
// Se conserva por compatibilidad.
// =====================================================

const ampliarAvisoProfesor = async (avisoId) => {
    const [resultado] = await db.query(
        `UPDATE avisos
         SET fecha_expiracion = DATE_ADD(
             IF(
                 fecha_expiracion IS NOT NULL
                 AND fecha_expiracion > NOW(),
                 fecha_expiracion,
                 NOW()
             ),
             INTERVAL 1 MONTH
         ),
         tipo = 'DIARIO'
         WHERE id = ?
           AND origen = 'PROFESOR'`,
        [avisoId]
    )

    return resultado.affectedRows
}

// =====================================================
// 14. ELIMINAR DEFINITIVAMENTE UN AVISO DE PROFESOR
// Se conserva por compatibilidad.
// =====================================================

const eliminarAvisoProfesor = async (avisoId) => {
    const [resultado] = await db.query(
        `DELETE FROM avisos
         WHERE id = ?
           AND origen = 'PROFESOR'`,
        [avisoId]
    )

    return resultado.affectedRows
}

// =====================================================
// 15. COMPROBAR QUE UNA FECHA DE EXPIRACIÓN ES FUTURA
// =====================================================

const fechaExpiracionEsFutura = async (fecha) => {
    const [rows] = await db.query(
        `SELECT STR_TO_DATE(?, '%Y-%m-%d %H:%i') > NOW() AS futura`,
        [fecha]
    )

    return Number(rows[0]?.futura) === 1
}

// =====================================================
// EXPORTAR FUNCIONES
// =====================================================

module.exports = {
    getAvisosByEscuela,
    getAvisosAdminByEscuela,
    getAvisosByAlumno,
    profesorPuedePublicarEnGrupo,
    crearAviso,
    getGruposByProfesor,
    grupoPerteneceAEscuela,
    crearAvisoAdmin,
    getTodosAvisosAdmin,
    cambiarEstadoAviso,
    editarAvisoAdmin,
    cambiarFechaExpiracionAdmin,
    eliminarAvisoAdmin,
    ampliarAvisoProfesor,
    eliminarAvisoProfesor,
    fechaExpiracionEsFutura
}
