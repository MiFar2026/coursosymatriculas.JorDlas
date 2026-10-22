
const db = require('../../config/database')

// Obtener los grupos activos de un alumno matriculado.
const getGruposAlumno = async (alumnoId) => {
  const [rows] = await db.query(
    `SELECT DISTINCT
      g.id,
      g.nombre,
      g.turno,
      g.escuela_id AS escuelaId
    FROM matriculas m
    INNER JOIN grupos g ON g.id = m.grupo_id
    INNER JOIN alumnos a ON a.id = m.alumno_id
    WHERE m.alumno_id = ?
      AND m.estado = 'ACTIVA'
      AND g.activo = 1
      AND a.activo = 1
    ORDER BY g.nombre ASC`,
    [alumnoId]
  )

  return rows
}

// Obtener los grupos activos asignados a un profesor.
const getGruposProfesor = async (profesorId, escuelaId) => {
  const [rows] = await db.query(
    `SELECT
      g.id,
      g.nombre,
      g.turno,
      g.escuela_id AS escuelaId
    FROM grupos g
    INNER JOIN escuelas e ON e.id = g.escuela_id
    INNER JOIN profesores p ON p.id = g.profesor_id
    WHERE g.profesor_id = ?
      AND g.escuela_id = ?
      AND g.activo = 1
      AND e.activa = 1
      AND p.activo = 1
    ORDER BY g.nombre ASC`,
    [profesorId, escuelaId]
  )

  return rows
}

// Comprobar si el usuario está autorizado para el grupo.
const usuarioPerteneceAlGrupo = async ({
  tipoUsuario,
  usuarioId,
  escuelaId,
  grupoId
}) => {
  if (tipoUsuario === 'alumno') {
    const [rows] = await db.query(
      `SELECT g.id
      FROM matriculas m
      INNER JOIN grupos g ON g.id = m.grupo_id
      INNER JOIN alumnos a ON a.id = m.alumno_id
      WHERE m.alumno_id = ?
        AND m.grupo_id = ?
        AND m.estado = 'ACTIVA'
        AND g.activo = 1
        AND a.activo = 1
      LIMIT 1`,
      [usuarioId, grupoId]
    )

    return rows.length > 0
  }

  if (tipoUsuario === 'profesor') {
    const [rows] = await db.query(
      `SELECT g.id
      FROM grupos g
      INNER JOIN profesores p ON p.id = g.profesor_id
      INNER JOIN escuelas e ON e.id = g.escuela_id
      WHERE g.id = ?
        AND g.profesor_id = ?
        AND g.escuela_id = ?
        AND g.activo = 1
        AND p.activo = 1
        AND e.activa = 1
      LIMIT 1`,
      [grupoId, usuarioId, escuelaId]
    )

    return rows.length > 0
  }

  return false
}

// Consultar las publicaciones de un grupo autorizado.
// Las respuestas también se devuelven y se identifican mediante respuesta_a_id.
const getMensajes = async (grupoId) => {
  const [rows] = await db.query(
    `SELECT
      fm.id,
      fm.grupo_id AS grupoId,
      fm.alumno_id AS alumnoId,
      fm.profesor_id AS profesorId,
      fm.respuesta_a_id AS respuestaAId,
      fm.titulo,
      fm.categoria,
      fm.mensaje,
      fm.fecha_creacion AS fechaCreacion,
      CASE
        WHEN fm.alumno_id IS NOT NULL
          THEN CONCAT_WS(' ', a.nombre, a.apellidos)
        WHEN fm.profesor_id IS NOT NULL
          THEN CONCAT_WS(' ', p.nombre, p.apellidos)
        ELSE 'Usuario'
      END AS autor,
      CASE
        WHEN fm.alumno_id IS NOT NULL THEN 'alumno'
        WHEN fm.profesor_id IS NOT NULL THEN 'profesor'
        ELSE 'desconocido'
      END AS tipoAutor
    FROM foro_mensajes_alumnos fm
    LEFT JOIN alumnos a ON a.id = fm.alumno_id
    LEFT JOIN profesores p ON p.id = fm.profesor_id
    WHERE fm.grupo_id = ?
      AND fm.activo = 1
    ORDER BY fm.fecha_creacion ASC, fm.id ASC`,
    [grupoId]
  )

  return rows
}

// Crear una consulta o una respuesta.
// Las respuestas deben llevar respuestaAId.
const crearMensaje = async ({
  tipoUsuario,
  usuarioId,
  grupoId,
  respuestaAId = null,
  titulo = null,
  categoria = 'General',
  mensaje
}) => {
  const alumnoId = tipoUsuario === 'alumno' ? usuarioId : null
  const profesorId = tipoUsuario === 'profesor' ? usuarioId : null


  console.log('Datos para guardar en el foro:', {
  tipoUsuario,
  usuarioId,
  grupoId,
  respuestaAId,
  titulo,
  categoria,
  mensaje
})

  const [resultado] = await db.query(
    `INSERT INTO foro_mensajes_alumnos (
      grupo_id,
      alumno_id,
      profesor_id,
      respuesta_a_id,
      titulo,
      categoria,
      mensaje,
      activo
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
    [
      grupoId,
      alumnoId,
      profesorId,
      respuestaAId,
      titulo,
      categoria,
      mensaje
    ]
  )

  return resultado.insertId
}

module.exports = {
  getGruposAlumno,
  getGruposProfesor,
  usuarioPerteneceAlGrupo,
  getMensajes,
  crearMensaje
}
