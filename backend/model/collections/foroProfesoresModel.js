
const db = require('../../config/database')

// Obtener mensajes de las dos escuelas en un mismo foro.
const getMensajes = async () => {
    const [rows] = await db.query(
        `SELECT
            fp.id,
            fp.escuela_id AS escuelaId,
            e.nombre AS escuela,
            fp.profesor_id AS profesorId,
            p.nombre AS nombreProfesor,
            p.apellidos AS apellidosProfesor,
            fp.titulo,
            fp.mensaje,
            fp.fecha_creacion AS fechaCreacion
         FROM foro_profesores fp
         INNER JOIN profesores p
            ON p.id = fp.profesor_id
         INNER JOIN escuelas e
            ON e.id = fp.escuela_id
         WHERE fp.activo = 1
           AND p.activo = 1
           AND e.activa = 1
         ORDER BY fp.fecha_creacion ASC, fp.id ASC`
    )

    return rows
}

// Verificar que el profesor está activo y autorizado
// en la escuela de su sesión.
const profesorAutorizado = async (profesorId, escuelaId) => {
    const [rows] = await db.query(
        `SELECT p.id
         FROM profesores p
         INNER JOIN grupos g
            ON g.profesor_id = p.id
         INNER JOIN escuelas e
            ON e.id = g.escuela_id
         WHERE p.id = ?
           AND p.activo = 1
           AND g.escuela_id = ?
           AND g.activo = 1
           AND e.activa = 1
         LIMIT 1`,
        [profesorId, escuelaId]
    )

    return rows.length > 0
}

// Publicar un mensaje en nombre del profesor autenticado.
const crearMensaje = async ({
    profesorId,
    escuelaId,
    titulo,
    mensaje
}) => {
    const [resultado] = await db.query(
        `INSERT INTO foro_profesores (
            escuela_id,
            profesor_id,
            titulo,
            mensaje,
            activo
         )
         VALUES (?, ?, ?, ?, 1)`,
        [escuelaId, profesorId, titulo, mensaje]
    )

    return resultado.insertId
}

module.exports = {
    getMensajes,
    profesorAutorizado,
    crearMensaje
}
