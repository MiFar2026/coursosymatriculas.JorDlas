
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
      oculto_admin,
      fecha_creacion,
      fecha_actualizacion
    FROM alumnos
    ORDER BY apellidos, nombre`
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
      oculto_admin,
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

// Retirar alumno de la aplicación sin borrar su registro SQL.
const deleteAlumno = async (id) => {
  const [result] = await db.query(
    `UPDATE alumnos
     SET oculto_admin = 1
     WHERE id = ?
       AND oculto_admin = 0`,
    [id]
  )

  return result.affectedRows
}

// Recuperar alumno retirado por administración.
const restaurarAlumno = async (id) => {
  const [result] = await db.query(
    `UPDATE alumnos
     SET oculto_admin = 0
     WHERE id = ?
       AND oculto_admin = 1`,
    [id]
  )

  return result.affectedRows
}

// El alumno solo puede iniciar sesión si está activo
// y no ha sido retirado por administración.
const buscarAlumnoPorDocumentoYEmail = async (documento, email) => {
  const [rows] = await db.query(
    `SELECT
      id,
      tipo_documento,
      documento,
      nombre,
      apellidos,
      email,
      activo,
      oculto_admin
    FROM alumnos
    WHERE documento = ?
      AND LOWER(TRIM(email)) = LOWER(TRIM(?))
      AND activo = 1
      AND oculto_admin = 0
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
  restaurarAlumno,
  buscarAlumnoPorDocumentoYEmail
}
