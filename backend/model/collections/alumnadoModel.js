
const db = require('../../config/database')

const getAlumnado = async () => {
  const [rows] = await db.query(
    `SELECT
      id,
      tipo_documento,
      documento,
      nombre,
      apellidos,
      telefono,
      email,
      fecha_nacimiento,
      alumno_anterior,
      activo,
      fecha_creacion,
      fecha_actualizacion
    FROM alumnos`
  )

  return rows
}

const getAlumnoById = async (id) => {
  const [rows] = await db.query(
    `SELECT
      id,
      tipo_documento,
      documento,
      nombre,
      apellidos,
      telefono,
      email,
      fecha_nacimiento,
      alumno_anterior,
      activo,
      fecha_creacion,
      fecha_actualizacion
    FROM alumnos
    WHERE id = ?`,
    [id]
  )

  return rows[0] || null
}

const createAlumno = async (alumno) => {
  const {
    tipo_documento,
    documento,
    nombre,
    apellidos,
    telefono,
    email,
    fecha_nacimiento
  } = alumno

  const [result] = await db.query(
    `INSERT INTO alumnos (
      tipo_documento,
      documento,
      nombre,
      apellidos,
      telefono,
      email,
      fecha_nacimiento
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      tipo_documento || null,
      documento || null,
      nombre,
      apellidos,
      telefono || null,
      email || null,
      fecha_nacimiento || null
    ]
  )

  return result.insertId
}

const deleteAlumno = async (id) => {
  const [result] = await db.query(
    'DELETE FROM alumnos WHERE id = ?',
    [id]
  )

  return result.affectedRows
}


const buscarAlumnoPorDocumentoYEmail = async (documento, email) => {
  const [rows] = await db.query(
    `SELECT
      id,
      tipo_documento,
      documento,
      nombre,
      apellidos,
      email,
      activo
    FROM alumnos
    WHERE documento = ?
      AND LOWER(TRIM(email)) = LOWER(TRIM(?))
      AND activo = 1
    LIMIT 1`,
    [documento, email]
  )

  return rows[0] || null
}


module.exports = {
  getAlumnado,
  getAlumnoById,
  createAlumno,
  deleteAlumno,
  buscarAlumnoPorDocumentoYEmail
}
