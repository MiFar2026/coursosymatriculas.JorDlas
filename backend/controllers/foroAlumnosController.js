
const ForoAlumnos = require('../model/collections/foroAlumnosModel')

const categoriasPermitidas = [
  'Castellano A1',
  'Castellano A2',
  'Castellano B1',
  'Catalán A1',
  'Catalán A2',
  'Catalán B1',
  'Alfabetización',
  'General'
]

// Identificar al usuario autenticado.
const obtenerUsuario = (req) => {
  if (Number.isInteger(req.alumnoId) && req.alumnoId > 0) {
    return {
      tipoUsuario: 'alumno',
      usuarioId: req.alumnoId,
      escuelaId: null
    }
  }

  if (
    req.profesor &&
    Number.isInteger(req.profesor.id) &&
    req.profesor.id > 0
  ) {
    return {
      tipoUsuario: 'profesor',
      usuarioId: req.profesor.id,
      escuelaId: req.profesor.escuelaId
    }
  }

  return null
}

// Listar los grupos autorizados para el usuario.
const getGrupos = async (req, res) => {
  try {
    const usuario = obtenerUsuario(req)

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Inicia sesión para consultar los grupos.'
      })
    }

    const grupos = usuario.tipoUsuario === 'alumno'
      ? await ForoAlumnos.getGruposAlumno(usuario.usuarioId)
      : await ForoAlumnos.getGruposProfesor(
          usuario.usuarioId,
          usuario.escuelaId
        )

    return res.json({
      ok: true,
      grupos
    })
  } catch (error) {
    console.error('Error al consultar los grupos del foro:', error)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se han podido cargar los grupos.'
    })
  }
}

// Consultar las publicaciones de un grupo autorizado.
const getMensajes = async (req, res) => {
  try {
    const usuario = obtenerUsuario(req)
    const grupoId = Number(req.query.grupoId)

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Inicia sesión para consultar el foro.'
      })
    }

    if (!Number.isInteger(grupoId) || grupoId < 1) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Selecciona un grupo válido.'
      })
    }

    const autorizado = await ForoAlumnos.usuarioPerteneceAlGrupo({
      ...usuario,
      grupoId
    })

    if (!autorizado) {
      return res.status(403).json({
        ok: false,
        mensaje: 'No tienes acceso al foro de este grupo.'
      })
    }

    const mensajes = await ForoAlumnos.getMensajes(grupoId)

    return res.json({
      ok: true,
      mensajes
    })
  } catch (error) {
    console.error('Error al consultar el foro del alumnado:', error)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se han podido cargar los mensajes.'
    })
  }
}

// Crear una consulta nueva o una respuesta.
const publicarMensaje = async (req, res) => {
  try {
    const usuario = obtenerUsuario(req)

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Inicia sesión para publicar en el foro.'
      })
    }

    const grupoId = Number(req.body.grupoId)

    const respuestaAId =
      req.body.respuestaAId == null ||
      req.body.respuestaAId === ''
        ? null
        : Number(req.body.respuestaAId)

    const mensaje =
      typeof req.body.mensaje === 'string'
        ? req.body.mensaje.trim()
        : ''

    const esRespuesta = respuestaAId !== null

    const titulo =
      typeof req.body.titulo === 'string'
        ? req.body.titulo.trim()
        : ''

    const categoria =
      typeof req.body.categoria === 'string'
        ? req.body.categoria.trim()
        : 'General'

    // Validar el grupo.
    if (!Number.isInteger(grupoId) || grupoId < 1) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Selecciona un grupo válido.'
      })
    }

    // Permitir mensajes cortos, incluso de dos caracteres.
    // Solo se rechazan los mensajes vacíos o de más de 5000 caracteres.
    if (!mensaje || mensaje.length > 5000) {
      return res.status(400).json({
        ok: false,
        mensaje:
          'El mensaje es obligatorio y no puede superar los 5000 caracteres.'
      })
    }

    // Las publicaciones nuevas necesitan título y categoría.
    // Las respuestas no necesitan título ni categoría propia.
    if (!esRespuesta) {
      if (!titulo || titulo.length > 200) {
        return res.status(400).json({
          ok: false,
          mensaje:
            'El título es obligatorio y no puede superar los 200 caracteres.'
        })
      }

      if (!categoriasPermitidas.includes(categoria)) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Selecciona una categoría válida.'
        })
      }
    }

    // Validar el identificador de la publicación a responder.
    if (
      esRespuesta &&
      (!Number.isInteger(respuestaAId) || respuestaAId < 1)
    ) {
      return res.status(400).json({
        ok: false,
        mensaje: 'La consulta a la que respondes no es válida.'
      })
    }

    // Comprobar que el usuario tiene acceso al grupo.
    const autorizado = await ForoAlumnos.usuarioPerteneceAlGrupo({
      ...usuario,
      grupoId
    })

    if (!autorizado) {
      return res.status(403).json({
        ok: false,
        mensaje: 'No puedes publicar en el foro de este grupo.'
      })
    }

    // Las respuestas solo pueden dirigirse a una publicación
    // principal del mismo grupo, nunca a otra respuesta.
    if (esRespuesta) {
      const mensajes = await ForoAlumnos.getMensajes(grupoId)

      const consulta = mensajes.find(
        item => Number(item.id) === respuestaAId
      )

      if (!consulta || consulta.respuestaAId != null) {
        return res.status(400).json({
          ok: false,
          mensaje:
            'Solo puedes responder a una consulta del mismo grupo.'
        })
      }
    }

    // Guardar la publicación o la respuesta.
    const id = await ForoAlumnos.crearMensaje({
      ...usuario,
      grupoId,
      respuestaAId,
      titulo: esRespuesta ? null : titulo,
      categoria: esRespuesta ? 'General' : categoria,
      mensaje
    })

    return res.status(201).json({
      ok: true,
      mensaje: esRespuesta
        ? 'Respuesta publicada correctamente.'
        : 'Consulta publicada correctamente.',
      id
    })
  
    } catch (error) {
    console.error(
      'Error al publicar en el foro del alumnado:',
      error
    )
    console.error('Detalle:', error.message)
    console.error('Código SQL:', error.code)
    console.error('Mensaje SQL:', error.sqlMessage)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se ha podido publicar el mensaje.'
    })
  }
}


module.exports = {
  getGrupos,
  getMensajes,
  publicarMensaje
}
