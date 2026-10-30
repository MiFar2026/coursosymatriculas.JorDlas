const API_BASE = 'http://localhost:5555/api'

const TOKEN_KEY = 'exaequo_admin_token'

/**
 * Guarda el token JWT después de un login correcto.
 */
export function guardarTokenAdmin(token) {
    if (typeof token !== 'string' || !token.trim()) {
        throw new Error('El token de administrador no es válido.')
    }

    sessionStorage.setItem(TOKEN_KEY, token)
}

/**
 * Recupera el token de la sesión actual.
 */
export function obtenerTokenAdmin() {
    return sessionStorage.getItem(TOKEN_KEY)
}

/**
 * Comprueba si existe un token guardado.
 *
 * Esto no demuestra que el token siga siendo válido.
 * El backend debe verificarlo en cada operación protegida.
 */
export function haySesionAdmin() {
    return Boolean(obtenerTokenAdmin())
}

/**
 * Elimina el token al cerrar sesión.
 */
export function cerrarSesionAdmin() {
    sessionStorage.removeItem(TOKEN_KEY)
}

/**
 * Realiza peticiones autenticadas a la API.
 *
 * IMPORTANTE:
 * La ruta recibida debe existir realmente en el backend.
 */
export async function peticionAdmin(ruta, opciones = {}) {
    const token = obtenerTokenAdmin()

    if (!token) {
        throw new Error(
            'No hay una sesión de administrador. Inicia sesión.'
        )
    }

    if (
        typeof ruta !== 'string' ||
        !ruta.startsWith('/') ||
        ruta.startsWith('//')
    ) {
        throw new Error('La ruta de la API no es válida.')
    }

    const cabeceras = new Headers(opciones.headers || {})

    cabeceras.set('Authorization', `Bearer ${token}`)

    const esFormData =
        typeof FormData !== 'undefined' &&
        opciones.body instanceof FormData

    if (opciones.body != null && !esFormData) {
        cabeceras.set('Content-Type', 'application/json')
    }

    const respuesta = await fetch(`${API_BASE}${ruta}`, {
        ...opciones,
        headers: cabeceras
    })

    if (respuesta.status === 401 || respuesta.status === 403) {
        cerrarSesionAdmin()

        throw new Error(
            respuesta.status === 401
                ? 'La sesión ha caducado. Inicia sesión de nuevo.'
                : 'No tienes autorización para realizar esta operación.'
        )
    }

    const texto = await respuesta.text()

    let datos = null

    if (texto) {
        try {
            datos = JSON.parse(texto)
        } catch {
            datos = texto
        }
    }

    if (!respuesta.ok) {
        const mensaje =
            datos &&
            typeof datos === 'object' &&
            datos.mensaje
                ? datos.mensaje
                : `Error de la API: ${respuesta.status}`

        throw new Error(mensaje)
    }

    return datos
}


/**
 * Descarga un archivo mediante una petición autenticada.
 */
export async function descargarArchivoAdmin(
    ruta,
    nombreArchivo = 'material'
) {
    const token = obtenerTokenAdmin()

    if (!token) {
        throw new Error(
            'No hay una sesión de administrador. Inicia sesión.'
        )
    }

    if (
        typeof ruta !== 'string' ||
        !ruta.startsWith('/') ||
        ruta.startsWith('//')
    ) {
        throw new Error('La ruta de descarga no es válida.')
    }

    const respuesta = await fetch(`${API_BASE}${ruta}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (respuesta.status === 401 || respuesta.status === 403) {
        cerrarSesionAdmin()

        throw new Error(
            respuesta.status === 401
                ? 'La sesión ha caducado. Inicia sesión de nuevo.'
                : 'No tienes autorización para descargar este archivo.'
        )
    }

    if (!respuesta.ok) {
        let mensajeError = 'No se pudo descargar el archivo.'

        try {
            const datos = await respuesta.json()
            mensajeError = datos?.mensaje || mensajeError
        } catch {
            // Se conserva el mensaje predeterminado.
        }

        throw new Error(mensajeError)
    }

    const archivo = await respuesta.blob()
    const urlTemporal = URL.createObjectURL(archivo)

    const enlace = document.createElement('a')
    enlace.href = urlTemporal
    enlace.download = nombreArchivo
    document.body.appendChild(enlace)
    enlace.click()
    enlace.remove()

    setTimeout(() => {
        URL.revokeObjectURL(urlTemporal)
    }, 1000)
}
