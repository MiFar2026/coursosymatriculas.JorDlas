
const db = require('../config/database')

const IDIOMAS = ['Castellano', 'Catalán', 'Alfabetización']
const TURNOS = ['Mañana', 'Tarde']

// =====================================================
// CREAR UN CURSO
// =====================================================

async function crearCursoAdmin(req, res) {
  const nombre = String(req.body?.nombre || '').trim()
  const idioma = req.body?.idioma
  const nivel = String(req.body?.nivel || '').trim()

  if (
    !nombre ||
    nombre.length > 100 ||
    !IDIOMAS.includes(idioma) ||
    !nivel ||
    nivel.length > 20
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Revisa el nombre, idioma y nivel del curso.'
    })
  }

  try {
    // No duplicar cursos: la tabla tiene nombre único.
    const [existentes] = await db.execute(
      'SELECT id, nombre, idioma, nivel, activo FROM cursos WHERE nombre = ?',
      [nombre]
    )

    if (existentes.length > 0) {
      const curso = existentes[0]

      if (
        curso.idioma !== idioma ||
        curso.nivel !== nivel
      ) {
        return res.status(409).json({
          ok: false,
          mensaje: 'Ya existe un curso con ese nombre y con otro idioma o nivel.'
        })
      }

      if (Number(curso.activo) !== 1) {
        return res.status(409).json({
          ok: false,
          mensaje: 'Ese curso existe, pero está inactivo.'
        })
      }

      return res.status(200).json({
        ok: true,
        existente: true,
        mensaje: 'Se utilizará el curso que ya existe.',
        curso
      })
    }

    const [resultado] = await db.execute(
      `INSERT INTO cursos (nombre, idioma, nivel)
       VALUES (?, ?, ?)`,
      [nombre, idioma, nivel]
    )

    return res.status(201).json({
      ok: true,
      existente: false,
      mensaje: 'Curso creado correctamente.',
      curso: {
        id: resultado.insertId,
        nombre,
        idioma,
        nivel,
        activo: 1
      }
    })
  } catch (error) {
    console.error('Error al crear curso:', error)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo crear el curso.'
    })
  }
}

// =====================================================
// CREAR UN GRUPO
// =====================================================

async function crearGrupoAdmin(req, res) {
  const escuelaId = Number(req.body?.escuela_id)
  const cursoId = Number(req.body?.curso_id)
  const nombre = String(req.body?.nombre || '').trim()
  const turno = req.body?.turno
  const aula = String(req.body?.aula || '').trim() || null

  const profesorId =
    req.body?.profesor_id === '' ||
    req.body?.profesor_id == null
      ? null
      : Number(req.body.profesor_id)

  if (![1, 2].includes(escuelaId)) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Selecciona una de las dos escuelas existentes.'
    })
  }

  if (
    !Number.isInteger(cursoId) ||
    cursoId < 1 ||
    !nombre ||
    nombre.length > 100 ||
    !TURNOS.includes(turno) ||
    (aula && aula.length > 50) ||
    (
      profesorId !== null &&
      (!Number.isInteger(profesorId) || profesorId < 1)
    )
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Revisa el curso, grupo, turno, aula y profesor.'
    })
  }

  let conexion

  try {
    conexion = await db.getConnection()
    await conexion.beginTransaction()

    const [escuelas] = await conexion.execute(
      'SELECT id FROM escuelas WHERE id = ? AND activa = 1',
      [escuelaId]
    )

    if (!escuelas.length) {
      await conexion.rollback()
      return res.status(400).json({
        ok: false,
        mensaje: 'La escuela no existe o está inactiva.'
      })
    }

    const [cursos] = await conexion.execute(
      'SELECT id FROM cursos WHERE id = ? AND activo = 1',
      [cursoId]
    )

    if (!cursos.length) {
      await conexion.rollback()
      return res.status(400).json({
        ok: false,
        mensaje: 'El curso no existe o está inactivo.'
      })
    }

    if (profesorId !== null) {
      const [profesores] = await conexion.execute(
        'SELECT id FROM profesores WHERE id = ? AND activo = 1',
        [profesorId]
      )

      if (!profesores.length) {
        await conexion.rollback()
        return res.status(400).json({
          ok: false,
          mensaje: 'El profesor no existe o está inactivo.'
        })
      }
    }

    // Evitar crear dos veces el mismo grupo en la misma escuela.
    const [duplicados] = await conexion.execute(
      `SELECT id
       FROM grupos
       WHERE escuela_id = ?
         AND curso_id = ?
         AND nombre = ?
         AND turno = ?
         AND activo = 1
       LIMIT 1`,
      [escuelaId, cursoId, nombre, turno]
    )

    if (duplicados.length) {
      await conexion.rollback()
      return res.status(409).json({
        ok: false,
        mensaje: 'Ya existe un grupo activo con ese curso, nombre, escuela y turno.'
      })
    }

    const [resultado] = await conexion.execute(
      `INSERT INTO grupos
        (curso_id, escuela_id, profesor_id, nombre, turno, aula, activo)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [cursoId, escuelaId, profesorId, nombre, turno, aula]
    )

    await conexion.commit()

    return res.status(201).json({
      ok: true,
      mensaje: 'Grupo creado correctamente.',
      grupo_id: resultado.insertId
    })
  } catch (error) {
    if (conexion) await conexion.rollback()

    console.error('Error al crear grupo:', error)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo crear el grupo.'
    })
  } finally {
    if (conexion) conexion.release()
  }
}

module.exports = {
  crearCursoAdmin,
  crearGrupoAdmin
}
