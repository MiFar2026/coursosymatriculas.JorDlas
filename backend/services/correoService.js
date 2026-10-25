
const nodemailer = require('nodemailer')

const destinatario = 'exaequo1995@gmail.com'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: Number(process.env.SMTP_PORT || 465) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_APP_PASSWORD
  }
})

async function enviarAvisoRecurso({
  titulo,
  descripcion,
  escuela,
  grupo,
  url,
  tipo,
  archivoAdjunto
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_APP_PASSWORD) {
    throw new Error('Falta configurar las credenciales SMTP.')
  }

  const mensaje = {
    from: `"ExAequo" <${process.env.SMTP_USER}>`,
    to: destinatario,
    subject: `Nuevo recurso publicado: ${titulo}`,
    text: [
      'Se ha publicado un nuevo recurso en ExAequo.',
      '',
      `Título: ${titulo}`,
      `Escuela: ${escuela}`,
      `Grupo: ${grupo || 'Toda la escuela'}`,
      `Tipo: ${tipo}`,
      `Descripción: ${descripcion || 'Sin descripción'}`,
      `Enlace: ${url || 'El archivo se adjunta a este correo.'}`,
      '',
      'Este mensaje es una notificación automática.'
    ].join('\n')
  }

  if (archivoAdjunto) {
    mensaje.attachments = [
      {
        filename: archivoAdjunto.filename,
        path: archivoAdjunto.path
      }
    ]
  }

  return transporter.sendMail(mensaje)
}

module.exports = {
  enviarAvisoRecurso
}
