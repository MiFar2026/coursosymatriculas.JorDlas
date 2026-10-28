
const db = require('../config/database')

// =====================================================
// LISTAR ALUMNOS CON SU MATRÍCULA, GRUPO Y ESCUELA
// GET /api/admin/alumnos
// GET /api/admin/alumnos?escuelaId=1
// GET /api/admin/alumnos?escuelaId=2
// =====================================================

const listarAlumnos = async (req, res) => {
  try {
    const { escuelaId } = req.query

    if (
      escuelaId !== undefined &&
      !['1', '2'].includes(String(escuelaId))
    ) {
      return res.status(400).json({
        ok: false,
        mensaje: 'La escuela seleccionada no es válida.'
      })
    }

    const parametros = []
    let filtroEscuela = ''

    if (escuelaId !== undefined) {
      filtroEscuela = 'WHERE e.id = ?'
      parametros.push(Number(escuelaId))
    }

    const [alumnos] = await db.query(
      `SELECT
        a.id,
        a.tipo_documento,
        a.documento,
        a.nombre,
        a.apellidos,
        a.telefono,
        a.email,
        a.fecha_nacimiento,
        a.alumno_anterior,
        a.activo,
        m.id AS matricula_id,
        m.estado AS estado_matricula,
        g.id AS grupo_id,
        g.nombre AS clase_asignada,
        g.turno AS horario_asignado,
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
        SELECT matriculas.*
        FROM matriculas
        INNER JOIN (
          SELECT alumno_id, MAX(id) AS ultima_id
          FROM matriculas
          WHERE estado = 'ACTIVA'
          GROUP BY alumno_id
        ) ultima ON ultima.ultima_id = matriculas.id
      ) m ON m.alumno_id = a.id
      LEFT JOIN grupos g ON g.id = m.grupo_id
      LEFT JOIN cursos c ON c.id = g.curso_id
      LEFT JOIN escuelas e ON e.id = g.escuela_id
      LEFT JOIN profesores p ON p.id = g.profesor_id
      ${filtroEscuela}
      ORDER BY a.apellidos ASC, a.nombre ASC`,
      parametros
    )

    res.json({
      ok: true,
      datos: alumnos
    })
  } catch (error) {
    console.error('Error al listar alumnos para administración:', error)

    res.status(500).json({
      ok: false,
      mensaje: 'No se pudo cargar el listado de alumnos.'
    })
  }
}

// =====================================================
// CONSULTAR UN ALUMNO
// GET /api/admin/alumnos/:id
// =====================================================

const obtenerAlumno = async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El identificador del alumno no es válido.'
      })
    }

    const [alumnos] = await db.query(
      `SELECT
        a.id,
        a.tipo_documento,
        a.documento,
        a.nombre,
        a.apellidos,
        a.telefono,
        a.email,
        a.fecha_nacimiento,
        a.alumno_anterior,
        a.activo
      FROM alumnos a
      WHERE a.id = ?
      LIMIT 1`,
      [id]
    )

    if (alumnos.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Alumno no encontrado.'
      })
    }

    res.json({
      ok: true,
      datos: alumnos[0]
    })
  } catch (error) {
    console.error('Error al consultar alumno:', error)

    res.status(500).json({
      ok: false,
      mensaje: 'No se pudo consultar el alumno.'
    })
  }
}

// =====================================================
// MODIFICAR LOS DATOS PERSONALES DESDE ADMINISTRACIÓN
// PUT /api/admin/alumnos/:id
// =====================================================

const actualizarAlumno = async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El identificador del alumno no es válido.'
      })
    }

    const {
      tipo_documento,
      documento,
      nombre,
      apellidos,
      telefono,
      email,
      fecha_nacimiento
    } = req.body

    const nombreLimpio = String(nombre ?? '').trim()
    const apellidosLimpios = String(apellidos ?? '').trim()
    const documentoLimpio = String(documento ?? '').trim()

    if (!nombreLimpio || !apellidosLimpios) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El nombre y los apellidos son obligatorios.'
      })
    }

    const tiposDocumento = ['DNI', 'NIE', 'PASAPORTE']

    if (
      tipo_documento != null &&
      tipo_documento !== '' &&
      !tiposDocumento.includes(tipo_documento)
    ) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El tipo de documento no es válido.'
      })
    }

    const emailLimpio = String(email ?? '').trim() || null
    const telefonoLimpio = String(telefono ?? '').trim() || null

    if (
      emailLimpio &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio)
    ) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El correo electrónico no tiene un formato válido.'
      })
    }

    const fechaLimpia = fecha_nacimiento || null

    if (
      fechaLimpia !== null &&
      (
        typeof fechaLimpia !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(fechaLimpia)
      )
    ) {
      return res.status(400).json({
        ok: false,
        mensaje: 'La fecha de nacimiento no es válida.'
      })
    }

    const [existente] = await db.query(
      'SELECT id FROM alumnos WHERE id = ? LIMIT 1',
      [id]
    )

    if (existente.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Alumno no encontrado.'
      })
    }

    await db.query(
      `UPDATE alumnos
       SET tipo_documento = ?,
           documento = ?,
           nombre = ?,
           apellidos = ?,
           telefono = ?,
           email = ?,
           fecha_nacimiento = ?
       WHERE id = ?`,
      [
        tipo_documento || null,
        documentoLimpio || null,
        nombreLimpio,
        apellidosLimpios,
        telefonoLimpio,
        emailLimpio,
        fechaLimpia,
        id
      ]
    )

    const [actualizados] = await db.query(
      `SELECT
        id, tipo_documento, documento, nombre, apellidos,
        telefono, email, fecha_nacimiento, alumno_anterior, activo
       FROM alumnos
       WHERE id = ?`,
      [id]
    )

    res.json({
      ok: true,
      mensaje: 'Alumno actualizado correctamente.',
      datos: actualizados[0]
    })
  } catch (error) {
    console.error('Error al actualizar alumno:', error)

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        ok: false,
        mensaje: 'Ese documento ya está registrado para otro alumno.'
      })
    }

    res.status(500).json({
      ok: false,
      mensaje: 'No se pudo actualizar el alumno.'
    })
  }
}

// =====================================================
// DAR DE BAJA LÓGICA O REACTIVAR
// PATCH /api/admin/alumnos/:id/estado
// =====================================================

const cambiarEstadoAlumno = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const activo = req.body.activo

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El identificador del alumno no es válido.'
      })
    }

    if (![0, 1, true, false].includes(activo)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El estado indicado no es válido.'
      })
    }

    const [resultado] = await db.query(
      'UPDATE alumnos SET activo = ? WHERE id = ?',
      [activo ? 1 : 0, id]
    )

    if (resultado.affectedRows === 0) {
      const [existente] = await db.query(
        'SELECT id FROM alumnos WHERE id = ? LIMIT 1',
        [id]
      )

      if (existente.length === 0) {
        return res.status(404).json({
          ok: false,
          mensaje: 'Alumno no encontrado.'
        })
      }
    }

    res.json({
      ok: true,
      mensaje: activo
        ? 'Alumno reactivado correctamente.'
        : 'Alumno desactivado correctamente.'
    })
  } catch (error) {
    console.error('Error al cambiar estado del alumno:', error)

    res.status(500).json({
      ok: false,
      mensaje: 'No se pudo cambiar el estado del alumno.'
    })
  }
}
// POST /api/admin/alumnos
// Crea una ficha de alumno y la matricula en un grupo activo.
const crearAlumno = async (req, res) => {
  const cuerpo = req.body || {}

  const tipoDocumento = String(cuerpo.tipo_documento || '').trim() || null
  const documento = String(cuerpo.documento || '').trim() || null
  const nombre = String(cuerpo.nombre || '').trim()
  const apellidos = String(cuerpo.apellidos || '').trim()
  const email = String(cuerpo.email || '').trim()
  const telefono = String(cuerpo.telefono || '').trim() || null
  const fechaNacimiento = cuerpo.fecha_nacimiento || null
  const grupoId = Number(cuerpo.grupo_id)

  if (!nombre || !apellidos || !email) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Nombre, apellidos y correo electrónico son obligatorios.'
    })
  }

  if (
    nombre.length > 100 ||
    apellidos.length > 100 ||
    email.length > 150 ||
    documento && documento.length > 30 ||
    telefono && telefono.length > 30
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Uno de los campos supera la longitud permitida.'
    })
  }

  if (
    tipoDocumento &&
    !['DNI', 'NIE', 'PASAPORTE'].includes(tipoDocumento)
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El tipo de documento no es válido.'
    })
  }

  if (tipoDocumento && !documento) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Debes indicar el documento si seleccionas su tipo.'
    })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El correo electrónico no tiene un formato válido.'
    })
  }

  if (
    fechaNacimiento &&
    (
      typeof fechaNacimiento !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(fechaNacimiento)
    )
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'La fecha de nacimiento no es válida.'
    })
  }

  if (!Number.isSafeInteger(grupoId) || grupoId <= 0) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Debes seleccionar un grupo válido para la matrícula.'
    })
  }

  let conexion
  let transaccionIniciada = false

  try {
    conexion = await db.getConnection()
    await conexion.beginTransaction()
    transaccionIniciada = true

    const [grupos] = await conexion.query(
      `SELECT g.id
       FROM grupos g
       INNER JOIN escuelas e ON e.id = g.escuela_id
       WHERE g.id = ?
         AND g.activo = 1
         AND e.activa = 1
       LIMIT 1`,
      [grupoId]
    )

    if (grupos.length === 0) {
      await conexion.rollback()
      transaccionIniciada = false

      return res.status(400).json({
        ok: false,
        mensaje: 'El grupo no existe, está inactivo o su escuela no está activa.'
      })
    }

    const [resultadoAlumno] = await conexion.query(
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
        tipoDocumento,
        documento,
        nombre,
        apellidos,
        telefono,
        email,
        fechaNacimiento
      ]
    )

    const alumnoId = resultadoAlumno.insertId

    await conexion.query(
      `INSERT INTO matriculas (
        alumno_id,
        grupo_id,
        fecha_matricula,
        estado
      ) VALUES (?, ?, CURDATE(), 'ACTIVA')`,
      [alumnoId, grupoId]
    )

    await conexion.commit()
    transaccionIniciada = false

    return res.status(201).json({
      ok: true,
      mensaje: 'Alumno creado y matriculado correctamente.',
      id: alumnoId,
      grupo_id: grupoId
    })
  } catch (error) {
    if (conexion && transaccionIniciada) {
      await conexion.rollback()
    }

    console.error('Error al crear alumno:', error)

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        ok: false,
        mensaje: 'Ese documento ya está registrado para otro alumno.'
      })
    }

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo crear el alumno y su matrícula.'
    })
  } finally {
    if (conexion) {
      conexion.release()
    }
  }
}

module.exports = {
  listarAlumnos,
  obtenerAlumno,
  actualizarAlumno,
  cambiarEstadoAlumno,
  crearAlumno
}
