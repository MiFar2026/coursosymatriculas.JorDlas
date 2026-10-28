
const db = require('../config/database')

// Campos que el administrador puede consultar y modificar.
const CAMPOS_EDITABLES = [
    'tipo_documento',
    'documento',
    'nombre',
    'apellidos',
    'anio_nacimiento',
    'telefono',
    'email',
    'especialidad',
    'activo',
    'foto'
]

// GET /api/admin/profesores
// Lista los profesores.
async function listarProfesores(req, res) {
    try {
        const [profesores] = await db.query(`
            SELECT
                id,
                tipo_documento,
                documento,
                nombre,
                apellidos,
                anio_nacimiento,
                telefono,
                email,
                especialidad,
                activo,
                fecha_creacion,
                foto
            FROM profesores
            ORDER BY apellidos, nombre
        `)

        res.json({ ok: true, profesores })
    } catch (error) {
        console.error('Error al listar profesores:', error)
        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener los profesores'
        })
    }
}

// GET /api/admin/profesores/:id/historial
// Devuelve las versiones anteriores y nuevas del perfil.
async function obtenerHistorialProfesor(req, res) {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'ID de profesor no válido'
        })
    }

    try {
        const [profesores] = await db.query(
            'SELECT id FROM profesores WHERE id = ?',
            [id]
        )

        // Permitimos consultar el historial aunque el profesor
        // ya no exista, porque puede haber sido eliminado.
        const [historial] = await db.query(
            `SELECT *
             FROM profesores_historial
             WHERE profesor_id = ?
             ORDER BY fecha_cambio DESC, historial_id DESC`,
            [id]
        )

        const [cambiosPerfil] = await db.query(
            `SELECT *
             FROM historial_perfil_profesores
             WHERE profesor_id = ?
             ORDER BY id DESC`,
            [id]
        )

        res.json({
            ok: true,
            profesorExiste: profesores.length > 0,
            historial,
            cambiosPerfil
        })
    } catch (error) {
        console.error('Error al obtener historial:', error)
        res.status(500).json({
            ok: false,
            mensaje: 'Error al consultar el historial'
        })
    }
}

// PUT /api/admin/profesores/:id
// Actualiza el perfil. Los triggers existentes deben registrar
// los cambios en las tablas de historial.
async function actualizarProfesor(req, res) {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'ID de profesor no válido'
        })
    }

    const campos = Object.keys(req.body || {})
        .filter(campo => CAMPOS_EDITABLES.includes(campo))

    if (campos.length === 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se han enviado campos válidos para actualizar'
        })
    }

    try {
        const [existentes] = await db.query(
            'SELECT id FROM profesores WHERE id = ?',
            [id]
        )

        if (existentes.length === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Profesor no encontrado'
            })
        }

        const valores = campos.map(campo => req.body[campo])

        // Los nombres de columnas proceden exclusivamente
        // de la lista blanca CAMPOS_EDITABLES.
        const asignaciones = campos
            .map(campo => `\`${campo}\` = ?`)
            .join(', ')

        await db.query(
            `UPDATE profesores
             SET ${asignaciones}
             WHERE id = ?`,
            [...valores, id]
        )

        const [actualizado] = await db.query(
            `SELECT
                id, tipo_documento, documento, nombre, apellidos,
                anio_nacimiento, telefono, email, especialidad,
                activo, fecha_creacion, foto
             FROM profesores
             WHERE id = ?`,
            [id]
        )

        res.json({
            ok: true,
            mensaje: 'Profesor actualizado correctamente',
            profesor: actualizado[0]
        })
    } catch (error) {
        console.error('Error al actualizar profesor:', error)

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                ok: false,
                mensaje: 'El documento o el correo ya pertenece a otro profesor'
            })
        }

        res.status(500).json({
            ok: false,
            mensaje: 'Error al actualizar el profesor'
        })
    }
}

// CREACION DE PROFESORES
// POST /api/admin/profesores
// Crea una ficha nueva de profesor.
async function crearProfesor(req, res) {
  const cuerpo = req.body || {}

  const tipoDocumento = String(cuerpo.tipo_documento || '').trim()
  const documento = String(cuerpo.documento || '').trim()
  const nombre = String(cuerpo.nombre || '').trim()
  const apellidos = String(cuerpo.apellidos || '').trim()
  const email = String(cuerpo.email || '').trim() || null
  const telefono = String(cuerpo.telefono || '').trim() || null
  const especialidad = String(cuerpo.especialidad || '').trim() || null
  const foto = String(cuerpo.foto || '').trim() || null
  const anioTexto = cuerpo.anio_nacimiento
  const anio = anioTexto === '' || anioTexto == null
    ? null
    : Number(anioTexto)

  if (!['DNI', 'NIE', 'PASAPORTE'].includes(tipoDocumento)) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Selecciona un tipo de documento válido.'
    })
  }

  if (!documento || !nombre || !apellidos) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Documento, nombre y apellidos son obligatorios.'
    })
  }

  if (
    nombre.length > 100 ||
    apellidos.length > 100 ||
    documento.length > 30
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Revisa la longitud del nombre, los apellidos o el documento.'
    })
  }

  if (
    email &&
    (
      email.length > 150 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    )
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El correo electrónico no tiene un formato válido.'
    })
  }

  if (
    telefono && telefono.length > 30 ||
    especialidad && especialidad.length > 100 ||
    foto && foto.length > 255
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Uno de los campos supera la longitud permitida.'
    })
  }

  if (
    anio !== null &&
    (
      !Number.isInteger(anio) ||
      anio < 1900 ||
      anio > new Date().getFullYear()
    )
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El año de nacimiento no es válido.'
    })
  }

  try {
    const [resultado] = await db.query(
      `INSERT INTO profesores (
        tipo_documento,
        documento,
        nombre,
        apellidos,
        anio_nacimiento,
        telefono,
        email,
        especialidad,
        foto
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        tipoDocumento,
        documento,
        nombre,
        apellidos,
        anio,
        telefono,
        email,
        especialidad,
        foto
      ]
    )

    const [profesores] = await db.query(
      `SELECT
        id, tipo_documento, documento, nombre, apellidos,
        anio_nacimiento, telefono, email, especialidad,
        activo, fecha_creacion, foto
       FROM profesores
       WHERE id = ?`,
      [resultado.insertId]
    )

    return res.status(201).json({
      ok: true,
      mensaje: 'Profesor creado correctamente.',
      profesor: profesores[0]
    })
  } catch (error) {
    console.error('Error al crear profesor:', error)

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        ok: false,
        mensaje: 'El documento o el correo ya pertenece a otro profesor.'
      })
    }

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo crear el profesor.'
    })
  }
}


/**
 * GET /api/admin/grupos
 * Lista los grupos con su escuela, curso y profesor asignado.
 * Se puede filtrar por escuela mediante ?escuelaId=1 o ?escuelaId=2.
 */
async function listarGruposAdmin(req, res) {
    const escuelaId = req.query.escuelaId === undefined
        ? null
        : Number(req.query.escuelaId)

    if (
        escuelaId !== null &&
        (!Number.isInteger(escuelaId) || ![1, 2].includes(escuelaId))
    ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El identificador de la escuela no es válido.'
        })
    }

    try {
        let sql = `
            SELECT
                g.id AS grupo_id,
                g.nombre AS grupo,
                g.turno,
                g.aula,
                g.activo AS grupo_activo,

                e.id AS escuela_id,
                e.nombre AS escuela,

                c.id AS curso_id,
                c.nombre AS curso,
                c.idioma,
                c.nivel,

                p.id AS profesor_id,
                p.nombre AS profesor_nombre,
                p.apellidos AS profesor_apellidos,
                p.activo AS profesor_activo

            FROM grupos g
            INNER JOIN escuelas e ON e.id = g.escuela_id
            INNER JOIN cursos c ON c.id = g.curso_id
            LEFT JOIN profesores p ON p.id = g.profesor_id
        `

        const parametros = []

        if (escuelaId !== null) {
            sql += ' WHERE g.escuela_id = ?'
            parametros.push(escuelaId)
        }

        sql += `
            ORDER BY
                e.nombre,
                c.nombre,
                g.turno,
                g.nombre
        `

        const [grupos] = await db.query(sql, parametros)

        return res.json({
            ok: true,
            grupos
        })
    } catch (error) {
        console.error('Error al listar grupos para administración:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se han podido obtener los grupos.'
        })
    }
}

/**
 * PATCH /api/admin/grupos/:id/profesor
 * Asigna un profesor a un grupo o lo desasigna.
 *
 * Body para asignar:
 * { "profesor_id": 4 }
 *
 * Body para desasignar:
 * { "profesor_id": null }
 */
async function asignarProfesorGrupo(req, res) {
    const grupoId = Number(req.params.id)
    const cuerpo = req.body || {}

    if (!Number.isInteger(grupoId) || grupoId <= 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El identificador del grupo no es válido.'
        })
    }

    if (
        !Object.prototype.hasOwnProperty.call(cuerpo, 'profesor_id')
    ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Debes indicar el profesor que quieres asignar.'
        })
    }

    const profesorId = cuerpo.profesor_id

    if (
        profesorId !== null &&
        (!Number.isInteger(profesorId) || profesorId <= 0)
    ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El identificador del profesor no es válido.'
        })
    }

    try {
        const [grupos] = await db.query(
            `SELECT id, escuela_id, activo
             FROM grupos
             WHERE id = ?
             LIMIT 1`,
            [grupoId]
        )

        if (grupos.length === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se ha encontrado el grupo.'
            })
        }

        if (Number(grupos[0].activo) !== 1) {
            return res.status(409).json({
                ok: false,
                mensaje: 'No puedes asignar un profesor a un grupo inactivo.'
            })
        }

        if (profesorId !== null) {
            const [profesores] = await db.query(
                `SELECT id, activo
                 FROM profesores
                 WHERE id = ?
                 LIMIT 1`,
                [profesorId]
            )

            if (profesores.length === 0) {
                return res.status(404).json({
                    ok: false,
                    mensaje: 'No se ha encontrado el profesor.'
                })
            }

            if (Number(profesores[0].activo) !== 1) {
                return res.status(409).json({
                    ok: false,
                    mensaje: 'No puedes asignar un profesor inactivo.'
                })
            }
        }

        await db.query(
            `UPDATE grupos
             SET profesor_id = ?
             WHERE id = ?`,
            [profesorId, grupoId]
        )

        const [resultado] = await db.query(
            `SELECT
                g.id AS grupo_id,
                g.nombre AS grupo,
                g.turno,
                g.aula,
                e.id AS escuela_id,
                e.nombre AS escuela,
                c.nombre AS curso,
                c.idioma,
                c.nivel,
                p.id AS profesor_id,
                p.nombre AS profesor_nombre,
                p.apellidos AS profesor_apellidos
             FROM grupos g
             INNER JOIN escuelas e ON e.id = g.escuela_id
             INNER JOIN cursos c ON c.id = g.curso_id
             LEFT JOIN profesores p ON p.id = g.profesor_id
             WHERE g.id = ?
             LIMIT 1`,
            [grupoId]
        )

        return res.json({
            ok: true,
            mensaje: profesorId === null
                ? 'Se ha retirado el profesor del grupo.'
                : 'Se ha asignado el profesor al grupo correctamente.',
            grupo: resultado[0]
        })
    } catch (error) {
        console.error('Error al asignar profesor al grupo:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido modificar la asignación del profesor.'
        })
    }
}



module.exports = {
  listarProfesores,
  crearProfesor,
  obtenerHistorialProfesor,
  actualizarProfesor,
  listarGruposAdmin,
  asignarProfesorGrupo
}

