const fs = require('fs')
const path = require('path')
const multer = require('multer')

const pool = require('../database/premioDB')


// =====================================================
// CARPETA DONDE SE GUARDARÁN LOS MANUSCRITOS
// =====================================================

const carpetaParticipaciones = path.join(
  __dirname,
  '..',
  'uploads',
  'participaciones',
  '2026'
)


// =====================================================
// CREAR CARPETA SI NO EXISTE
// =====================================================

if (!fs.existsSync(carpetaParticipaciones)) {

  fs.mkdirSync(
    carpetaParticipaciones,
    { recursive: true }
  )

}


// =====================================================
// CONFIGURACIÓN DE MULTER
// =====================================================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, carpetaParticipaciones)

  },

  filename: (req, file, cb) => {

    const extension = path.extname(file.originalname)

    const nombreSeguro = path
      .basename(file.originalname, extension)
      .replace(/[^a-zA-Z0-9_-]/g, '_')

    const nombreFinal =
      `${Date.now()}_${nombreSeguro}${extension}`

    cb(null, nombreFinal)

  }

})


// =====================================================
// TIPOS DE ARCHIVO PERMITIDOS
// =====================================================

const tiposPermitidos = [

  'application/pdf',

  'application/msword',

  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

]


// =====================================================
// CONFIGURACIÓN DE MULTER
// =====================================================

const upload = multer({

  storage,

  limits: {

    fileSize: 10 * 1024 * 1024

  },

  fileFilter: (req, file, cb) => {

    if (tiposPermitidos.includes(file.mimetype)) {

      cb(null, true)

    } else {

      cb(
        new Error(
          'Solo se permiten archivos PDF, DOC o DOCX.'
        )
      )

    }

  }

}).single('archivo')


// =====================================================
// GENERAR CÓDIGO DE REGISTRO
// =====================================================

function generarCodigoRegistro() {

  const caracteres =
    'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

  let codigo = ''

  for (let i = 0; i < 4; i++) {

    const posicion =
      Math.floor(
        Math.random() * caracteres.length
      )

    codigo += caracteres[posicion]

  }

  return codigo

}


// =====================================================
// CREAR PARTICIPACIÓN
// =====================================================

const crearParticipacion = (req, res) => {

  upload(req, res, async (error) => {

    // =================================================
    // ERROR DE MULTER
    // =================================================

    if (error) {

      console.error('ERROR DE ARCHIVO:', error)

      return res.status(400).json({

        ok: false,

        mensaje:
          error.message ||
          'No se ha podido subir el archivo.'

      })

    }


    // =================================================
    // COMPROBAR QUE EXISTE EL ARCHIVO
    // =================================================

    if (!req.file) {

      return res.status(400).json({

        ok: false,

        mensaje:
          'Debes adjuntar tu manuscrito.'

      })

    }


    const archivoGuardado =
      req.file.path


    try {

      // ================================================
      // DATOS DEL PARTICIPANTE
      // ================================================

      const {

        nombre,
        apellidos,
        email,
        telefono,
        pais,
        nombreArtistico

      } = req.body


      // ================================================
      // DATOS DE LA OBRA
      // ================================================

      const {

        tituloObra,
        tipoObra,
        genero,
        idioma,
        numeroPalabras,
        sinopsis,
        comentarios

      } = req.body


      const aceptaBases =
        req.body.aceptaBases === 'true' ||
        req.body.aceptaBases === true


      const declaraAutoria =
        req.body.declaraAutoria === 'true' ||
        req.body.declaraAutoria === true


      // ================================================
      // VALIDACIONES
      // ================================================

      if (!nombre || !apellidos || !email) {

        throw new Error(
          'Faltan datos obligatorios del participante.'
        )

      }


      if (!tituloObra || !tipoObra || !idioma) {

        throw new Error(
          'Faltan datos obligatorios de la obra.'
        )

      }


      if (!aceptaBases) {

        throw new Error(
          'Debes aceptar las bases del concurso.'
        )

      }


      if (!declaraAutoria) {

        throw new Error(
          'Debes declarar que eres el/la autor/a de la obra.'
        )

      }


      // ================================================
      // CREAR CONEXIÓN
      // ================================================

      const connection =
        await pool.getConnection()


      try {

        // ============================================
        // INICIAR TRANSACCIÓN
        // ============================================

        await connection.beginTransaction()


        // ============================================
        // BUSCAR PARTICIPANTE POR EMAIL
        // ============================================

        const [participantes] =
          await connection.execute(

            `
            SELECT id
            FROM participantes
            WHERE email = ?
            LIMIT 1
            `,

            [email]

          )


        let participanteId


        // ============================================
        // SI EXISTE
        // ============================================

        if (participantes.length > 0) {

          participanteId =
            participantes[0].id


          await connection.execute(

            `
            UPDATE participantes
            SET
              nombre = ?,
              apellidos = ?,
              telefono = ?,
              pais = ?,
              nombre_artistico = ?
            WHERE id = ?
            `,

            [

              nombre,

              apellidos,

              telefono || null,

              pais || null,

              nombreArtistico || null,

              participanteId

            ]

          )

        }


        // ============================================
        // SI NO EXISTE
        // ============================================

        else {

          const [resultado] =
            await connection.execute(

              `
              INSERT INTO participantes
              (
                nombre,
                apellidos,
                email,
                telefono,
                pais,
                nombre_artistico
              )
              VALUES (?, ?, ?, ?, ?, ?)
              `,

              [

                nombre,

                apellidos,

                email,

                telefono || null,

                pais || null,

                nombreArtistico || null

              ]

            )


          participanteId =
            resultado.insertId

        }


        // ============================================
        // GENERAR CÓDIGO
        // ============================================

        let codigoRegistro

        let codigoExiste = true


        while (codigoExiste) {

          codigoRegistro =
            generarCodigoRegistro()


          const [resultadoCodigo] =
            await connection.execute(

              `
              SELECT id
              FROM participaciones
              WHERE codigo_registro = ?
              LIMIT 1
              `,

              [codigoRegistro]

            )


          codigoExiste =
            resultadoCodigo.length > 0

        }


        // ============================================
        // GUARDAR PARTICIPACIÓN
        // ============================================

        await connection.execute(

          `
          INSERT INTO participaciones
          (
            participante_id,
            codigo_registro,
            titulo_obra,
            tipo_obra,
            genero,
            idioma,
            numero_palabras,
            sinopsis,
            comentarios,
            nombre_archivo,
            ruta_archivo,
            tipo_archivo,
            tamano_archivo,
            acepta_bases,
            declara_autoria
          )
          VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `,

          [

            participanteId,

            codigoRegistro,

            tituloObra,

            tipoObra,

            genero || null,

            idioma,

            numeroPalabras
              ? Number(numeroPalabras)
              : null,

            sinopsis || null,

            comentarios || null,

            req.file.originalname,

            path.relative(
              path.join(__dirname, '..'),
              archivoGuardado
            ),

            req.file.mimetype,

            req.file.size,

            aceptaBases,

            declaraAutoria

          ]

        )


        // ============================================
        // CONFIRMAR TRANSACCIÓN
        // ============================================

        await connection.commit()


        // ============================================
        // LIBERAR CONEXIÓN
        // ============================================

        connection.release()


        // ============================================
        // RESPUESTA AL VUE
        // ============================================

        return res.status(201).json({

          ok: true,

          mensaje:
            'La participación se ha registrado correctamente.',

          codigoRegistro,

          nombre:
            `${nombre} ${apellidos}`

        })


      } catch (errorInterno) {

        // ============================================
        // DESHACER TRANSACCIÓN
        // ============================================

        await connection.rollback()

        connection.release()

        throw errorInterno

      }


    } catch (error) {

      console.error(
        'ERROR AL REGISTRAR PARTICIPACIÓN:',
        error
      )


      // =================================================
      // SI MYSQL FALLA, BORRAR EL ARCHIVO QUE YA SE SUBIÓ
      // =================================================

      if (
        archivoGuardado &&
        fs.existsSync(archivoGuardado)
      ) {

        try {

          fs.unlinkSync(
            archivoGuardado
          )

          console.log(
            'Archivo eliminado porque el registro falló.'
          )

        } catch (errorArchivo) {

          console.error(
            'No se pudo eliminar el archivo:',
            errorArchivo
          )

        }

      }


      return res.status(500).json({

        ok: false,

        mensaje:
          'La participación no ha podido registrarse. No se ha confirmado el registro.'

      })

    }

  })

}


module.exports = {

  crearParticipacion

}