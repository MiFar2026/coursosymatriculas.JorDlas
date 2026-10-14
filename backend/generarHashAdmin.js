
const bcrypt = require('bcryptjs')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Escribe una contraseña nueva (mínimo 12 caracteres): ', async (contrasena) => {
    try {
        if (contrasena.length < 12) {
            console.log('ERROR: La contraseña debe tener al menos 12 caracteres.')
            return
        }

        const hash = await bcrypt.hash(contrasena, 12)

        console.log('\nHash generado correctamente:')
        console.log(hash)
        console.log('\nCopia el hash y guárdalo en ADMIN_PASSWORD_HASH dentro de .env.')
    } catch (error) {
        console.error('Error al generar el hash:', error.message)
    } finally {
        rl.close()
    }
})
