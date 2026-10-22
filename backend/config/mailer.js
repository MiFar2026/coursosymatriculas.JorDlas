
const nodemailer = require('nodemailer')

const usuario = process.env.SMTP_USER
const contrasena = process.env.SMTP_APP_PASSWORD

let transporter = null

if (usuario && contrasena) {
    transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT || 465),
        secure: true,
        auth: {
            user: usuario,
            pass: contrasena
        }
    })
}

async function enviarCodigoVerificacion(destinatario, codigo) {
    if (!transporter) {
        throw new Error('El servicio de correo no está configurado.')
    }

    return transporter.sendMail({
        from: `"ExAequo" <${usuario}>`,
        to: destinatario,
        subject: 'Código de acceso al perfil del profesorado',
        text: [
            'Has solicitado acceder al perfil del profesorado de ExAequo.',
            '',
            `Tu código de verificación es: ${codigo}`,
            '',
            'Si no has solicitado este acceso, ignora este mensaje.'
        ].join('\n')
    })
}

module.exports = {
    enviarCodigoVerificacion
}
