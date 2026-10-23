
const db = require('../../config/database')

// Obtener las publicaciones de ambas escuelas con foto y respuestas.
const getMensajes = async () => {
    const [mensajes] = await db.query(
        `SELECT
            fp.id,
            fp.escuela_id AS escuelaId,
            e.nombre AS escuela,
            fp.profesor_id AS profesorId,
            p.nombre AS nombreProfesor,
            p.apellidos AS apellidosProfesor,
            p.foto AS foto,
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
         ORDER BY fp.fecha_creacion DESC, fp.id DESC`
    )

    if (!mensajes.length) return []

    const ids = mensajes.map((mensaje) => mensaje.id)
    const placeholders = ids.map(() => '?').join(', ')

    const [respuestas] = await db.query(
        `SELECT
            r.id,
            r.mensaje_id AS mensajeId,
            r.escuela_id AS escuelaId,
            e.nombre AS escuela,
            r.profesor_id AS profesorId,
            p.nombre AS nombreProfesor,
            p.apellidos AS apellidosProfesor,
            p.foto AS foto,
            r.respuesta,
            r.fecha_creacion AS fechaCreacion
         FROM foro_profesores_respuestas r
         INNER JOIN profesores p
            ON p.id = r.profesor_id
         INNER JOIN escuelas e
            ON e.id = r.escuela_id
         WHERE r.mensaje_id IN (${placeholders})
           AND r.activo = 1
           AND p.activo = 1
           AND e.activa = 1
         ORDER BY r.fecha_creacion ASC, r.id ASC`,
        ids
    )

    const respuestasPorMensaje = new Map()

    for (const respuesta of respuestas) {
        if (!respuestasPorMensaje.has(respuesta.mensajeId)) {
            respuestasPorMensaje.set(respuesta.mensajeId, [])
        }

        respuestasPorMensaje.get(respuesta.mensajeId).push(respuesta)
    }

    return mensajes.map((mensaje) => ({
        ...mensaje,
        respuestas: respuestasPorMensaje.get(mensaje.id) || []
    }))
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

// Crear una publicación con el profesor de la sesión.
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

// Comprobar que la publicación existe y sigue activa.
const mensajeExiste = async (mensajeId) => {
    const [rows] = await db.query(
        `SELECT id
         FROM foro_profesores
         WHERE id = ? AND activo = 1
         LIMIT 1`,
        [mensajeId]
    )

    return rows.length > 0
}

// Crear una respuesta con la identidad y escuela de la sesión.
const crearRespuesta = async ({
    mensajeId,
    profesorId,
    escuelaId,
    respuesta
}) => {
    const [resultado] = await db.query(
        `INSERT INTO foro_profesores_respuestas (
            mensaje_id,
            profesor_id,
            escuela_id,
            respuesta,
            activo
         )
         VALUES (?, ?, ?, ?, 1)`,
        [mensajeId, profesorId, escuelaId, respuesta]
    )

    return resultado.insertId
}

module.exports = {
    getMensajes,
    profesorAutorizado,
    crearMensaje,
    mensajeExiste,
    crearRespuesta
}
