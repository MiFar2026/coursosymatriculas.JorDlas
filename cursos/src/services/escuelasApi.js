
const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:5555/api/escuelas'


async function solicitar(endpoint, opciones = {}) {
    let respuesta

    try {
        respuesta = await fetch(`${API_BASE_URL}/${endpoint}`, {
            ...opciones,
            headers: {
                Accept: 'application/json',
                ...(opciones.body instanceof FormData
                    ? {}
                    : { 'Content-Type': 'application/json' }),
                ...opciones.headers
            }
        })
    } catch {
        throw new Error(
'No se pudo conectar con el servidor Express. Comprueba que esté funcionando en el puerto 5555.'    }

    let resultado

    try {
        resultado = await respuesta.json()
    } catch {
        throw new Error(
'El servidor no ha devuelto una respuesta JSON válida.'        )
    }

    if (!respuesta.ok || resultado.ok === false) {
        throw new Error(
            resultado.mensaje || 'Se ha producido un error en el servidor.'
        )
    }

    return resultado.datos
}


export function obtenerHorarios(escuela) {
    return solicitar(
        `horarios?escuela=${encodeURIComponent(escuela)}`
    )
}



export function obtenerRecursos(escuela, grupoId = '') {
    const parametros = new URLSearchParams({ escuela })

    if (grupoId) {
        parametros.set('grupo_id', grupoId)
    }

    return solicitar(`recursos?${parametros.toString()}`)
}


export function buscarPerfilAlumno(datos) {
    return solicitar('perfil-alumno.php', {
        method: 'POST',
        body: JSON.stringify(datos)
    })
}

export function obtenerForoProfesores(escuela) {
    return solicitar(
        `foro-profesores.php?escuela=${encodeURIComponent(escuela)}`
    )
}

export function publicarMensajeForo(datos) {
    return solicitar('foro-profesores.php', {
        method: 'POST',
        body: JSON.stringify(datos)
    })
}