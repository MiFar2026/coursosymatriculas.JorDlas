
<template>
    <div
        v-if="comprobandoSesion"
        class="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700"
    >
        <p role="status">
            Comprobando la sesión del profesorado...
        </p>
    </div>

    <div
        v-else-if="profesor"
        class="min-h-screen bg-gray-50 text-gray-800"
    >
        <NavbarAteneu />

        <main class="max-w-7xl mx-auto px-4 sm:px-6 py-10">

            <header class="mb-10">
                <p
                    class="text-sm uppercase tracking-widest font-bold text-teal-700 mb-2"
                >
                    Escuela Ateneu Aula 502
                </p>

                <h1 class="text-3xl sm:text-4xl font-bold mb-3">
                    Espacio de tutores
                </h1>

                <p class="text-gray-600 max-w-3xl">
                    Gestiona los alumnos, revisa las tareas, comparte
                    recursos educativos, publica avisos y comunícate
                    con tus estudiantes.
                </p>

                <div class="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <p v-if="profesor" class="text-sm text-gray-600">
                        Sesión de {{ profesor.nombre }} {{ profesor.apellidos }}
                    </p>

                    <button
                        type="button"
                        @click="cerrarSesion"
                        class="rounded-lg bg-red-700 px-5 py-3 font-bold text-white hover:bg-red-800"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </header>

            <!-- AVISOS -->
            <section
                class="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10"
            >
                <div
                    class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                    <div>
                        <h2 class="text-xl font-bold mb-2">
                            📢 Avisos de Escuela Ateneu Aula 502
                        </h2>

                        <p class="text-gray-700">
                            Los avisos pueden ser permanentes o temporales.
                            Los temporales expirarán a las 72 horas.
                        </p>
                    </div>

                    <button
                        type="button"
                        @click="mostrarFormularioAviso = !mostrarFormularioAviso"
                        class="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg px-5 py-3"
                    >
                        {{
                            mostrarFormularioAviso
                                ? 'Cerrar formulario'
                                : 'Crear aviso'
                        }}
                    </button>
                </div>

                <form
                    v-if="mostrarFormularioAviso"
                    @submit.prevent="publicarAviso"
                    class="mt-6 bg-white rounded-xl border border-amber-200 p-5 space-y-5"
                >
                    <!-- SELECCIÓN DEL GRUPO -->
                    <div>
                        <label
                            for="grupo-aviso"
                            class="block font-semibold mb-2"
                        >
                            Grupo destinatario
                        </label>

                        <select
                            id="grupo-aviso"
                            v-model="aviso.grupoId"
                            @change="cambiarGrupo"
                            required
                            :disabled="cargandoGrupos || publicandoAviso || grupos.length === 0"
                            class="w-full border rounded-lg p-3 bg-white disabled:bg-gray-100"
                        >
                            <option value="" disabled>
                                Selecciona un grupo
                            </option>

                            <option
                                v-for="grupo in grupos"
                                :key="grupo.id"
                                :value="String(grupo.id)"
                            >
                                {{ grupo.nombre }}
                            </option>
                        </select>

                        <p
                            v-if="cargandoGrupos"
                            class="mt-2 text-sm text-gray-500"
                        >
                            Cargando tus grupos...
                        </p>

                        <p
                            v-else-if="!cargandoGrupos && grupos.length === 0"
                            class="mt-2 text-sm text-amber-800"
                        >
                            No se han encontrado grupos asignados a tu cuenta.
                        </p>
                    </div>

                    <!-- DESTINATARIO -->
                    <div>
                        <label
                            for="destinatario-aviso"
                            class="block font-semibold mb-2"
                        >
                            ¿A quién va dirigido el aviso?
                        </label>

                        <select
                            id="destinatario-aviso"
                            v-model="aviso.destinatario"
                            @change="cambiarDestinatario"
                            class="w-full border rounded-lg p-3 bg-white"
                            :disabled="publicandoAviso"
                        >
                            <option value="GRUPO">
                                A todo el grupo
                            </option>

                            <option value="INDIVIDUAL">
                                A un alumno concreto
                            </option>
                        </select>
                    </div>

                    <!-- SELECCIÓN DEL ALUMNO -->
                    <div v-if="aviso.destinatario === 'INDIVIDUAL'">
                        <label
                            for="alumno-aviso"
                            class="block font-semibold mb-2"
                        >
                            Alumno destinatario
                        </label>

                        <select
                            id="alumno-aviso"
                            v-model="aviso.alumnoId"
                            required
                            :disabled="cargandoAlumnos || alumnosGrupo.length === 0 || publicandoAviso"
                            class="w-full border rounded-lg p-3 bg-white disabled:bg-gray-100"
                        >
                            <option value="" disabled>
                                Selecciona un alumno
                            </option>

                            <option
                                v-for="alumno in alumnosGrupo"
                                :key="alumno.id"
                                :value="String(alumno.id)"
                            >
                                {{ alumno.nombre }} {{ alumno.apellidos }}
                            </option>
                        </select>

                        <p
                            v-if="cargandoAlumnos"
                            class="mt-2 text-sm text-gray-500"
                        >
                            Cargando alumnos del grupo...
                        </p>

                        <p
                            v-else-if="!cargandoAlumnos && alumnosGrupo.length === 0"
                            class="mt-2 text-sm text-amber-800"
                        >
                            No hay alumnos con matrícula activa en este grupo.
                        </p>
                    </div>

                    <!-- TÍTULO -->
                    <div>
                        <label
                            for="titulo-aviso"
                            class="block font-semibold mb-2"
                        >
                            Título del aviso
                        </label>

                        <input
                            id="titulo-aviso"
                            v-model.trim="aviso.titulo"
                            required
                            maxlength="200"
                            class="w-full border rounded-lg p-3"
                            placeholder="Ej.: Cambio de horario"
                            :disabled="publicandoAviso"
                        />
                    </div>

                    <!-- MENSAJE -->
                    <div>
                        <label
                            for="mensaje-aviso"
                            class="block font-semibold mb-2"
                        >
                            Contenido
                        </label>

                        <textarea
                            id="mensaje-aviso"
                            v-model.trim="aviso.mensaje"
                            required
                            rows="4"
                            class="w-full border rounded-lg p-3"
                            placeholder="Escribe el aviso..."
                            :disabled="publicandoAviso"
                        ></textarea>
                    </div>

                    <!-- DURACIÓN -->
                    <div>
                        <label
                            for="tipo-aviso"
                            class="block font-semibold mb-2"
                        >
                            Duración
                        </label>

                        <select
                            id="tipo-aviso"
                            v-model="aviso.tipo"
                            class="w-full border rounded-lg p-3 bg-white"
                            :disabled="publicandoAviso"
                        >
                            <option value="PERMANENTE">
                                Permanente
                            </option>

                            <option value="DIARIO">
                                Temporal: máximo 72 horas
                            </option>
                        </select>
                    </div>

                    <!-- BOTÓN DE PUBLICACIÓN -->
                    <button
                        type="submit"
                        :disabled="
                            publicandoAviso ||
                            cargandoGrupos ||
                            !aviso.grupoId ||
                            grupos.length === 0 ||
                            (aviso.destinatario === 'INDIVIDUAL' &&
                             (!aviso.alumnoId || alumnosGrupo.length === 0))
                        "
                        class="bg-teal-700 hover:bg-teal-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-lg px-5 py-3"
                    >
                        {{
                            publicandoAviso
                                ? 'Publicando...'
                                : 'Publicar aviso'
                        }}
                    </button>

                    <p class="text-sm text-gray-500">
                        Los avisos permanentes no tienen fecha de expiración.
                        Los temporales se configuran en el servidor para
                        expirar a las 72 horas.
                    </p>
                </form>

                <!-- RESULTADO DE LA OPERACIÓN -->
                <p
                    v-if="mensajeAviso"
                    role="status"
                    aria-live="polite"
                    class="mt-4 rounded-lg p-3 text-sm font-semibold"
                    :class="errorAviso
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'"
                >
                    {{ mensajeAviso }}
                </p>
            </section>

            <!-- GESTIÓN EDUCATIVA -->
            <section>
                <h2 class="text-2xl font-bold mb-6">
                    Gestión educativa
                </h2>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                    <RouterLink
                        to="/ateneu/alumnos"
                        class="tarjeta border-t-4 border-teal-600"
                    >
                        <span class="text-3xl">👩‍🎓</span>

                        <h3 class="titulo-tarjeta">
                            Alumnos
                        </h3>

                        <p class="texto-tarjeta">
                            Acceder al espacio del alumnado de Escuela Ateneu Aula 502.
                        </p>
                    </RouterLink>

                    <RouterLink
                        to="/ateneu/tutores/resultados-alumno"
                        class="tarjeta border-t-4 border-red-500"
                    >
                        <span class="text-3xl">📝</span>

                        <h3 class="titulo-tarjeta">
                            Tareas y resultados
                        </h3>

                        <p class="texto-tarjeta">
                            Revisar trabajos, registrar notas y comentarios,
                            y devolver documentos corregidos.
                        </p>
                    </RouterLink>

                    <RouterLink
                        to="/ateneu/tutores/mensaje-profesor"
                        class="tarjeta border-t-4 border-blue-500"
                    >
                        <span class="text-3xl">💬</span>

                        <h3 class="titulo-tarjeta">
                            Mensajes
                        </h3>

                        <p class="texto-tarjeta">
                            Enviar y recibir mensajes de los alumnos
                            de esta escuela.
                        </p>
                    </RouterLink>

                    <RouterLink
                        to="/ateneu/recursos"
                        class="tarjeta border-t-4 border-green-600"
                    >
                        <span class="text-3xl">📚</span>

                        <h3 class="titulo-tarjeta">
                            Recursos educativos
                        </h3>

                        <p class="texto-tarjeta">
                            Acceder al espacio de recursos de Escuela Ateneu Aula 502.
                        </p>
                    </RouterLink>

                    <RouterLink
                        to="/ateneu/alumnos/foro"
                        class="tarjeta border-t-4 border-purple-600"
                    >
                        <span class="text-3xl">🌍</span>

                        <h3 class="titulo-tarjeta">
                            Foro de estudiantes
                        </h3>

                        <p class="texto-tarjeta">
                            Participar en los foros de los cursos
                            y el foro general de Escuela Ateneu Aula 502
                        </p>
                    </RouterLink>

                    <button
                        type="button"
                        @click="mostrarForoProfesores = !mostrarForoProfesores"
                        class="tarjeta text-left border-t-4 border-gray-700"
                    >
                        <span class="text-3xl">🔒</span>

                        <h3 class="titulo-tarjeta">
                            Foro del profesorado
                        </h3>

                        <p class="texto-tarjeta">
                            Espacio reservado al equipo docente de Escuela Ateneu Aula 502
                        </p>
                    </button>

                </div>

                <div
                    v-if="mostrarForoProfesores"
                    class="mt-6 bg-white border rounded-xl p-6"
                >
                    <h3 class="text-xl font-bold mb-2">
                        Foro privado del profesorado
                    </h3>

                    <p class="text-gray-600 mb-4">
                        Esta escuela tendrá su propio foro interno,
                        separado del foro de la biblioteca de Joan Miró.
                    </p>

                    <p class="text-sm text-amber-800 bg-amber-50 p-4 rounded-lg">
                        El control de acceso real debe realizarse
                        en el servidor antes de habilitar el foro.
                    </p>
                </div>
            </section>
        </main>

        <footer class="border-t bg-white py-6 mt-12">
            <p class="text-center text-sm text-gray-500">
                ExAequo · Escuela Ateneu Aula 502 · Espacio del profesorado
            </p>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import NavbarAteneu from '../../../components/ateneu/NavbarAteneu.vue'

const router = useRouter()


const comprobandoSesion = ref(true)
const profesor = ref(null)
const errorSesion = ref('')

const mostrarFormularioAviso = ref(false)
const mostrarForoProfesores = ref(false)

const mensajeAviso = ref('')
const errorAviso = ref(false)

const grupos = ref([])
const alumnosGrupo = ref([])

const cargandoGrupos = ref(false)
const cargandoAlumnos = ref(false)
const publicandoAviso = ref(false)

const aviso = ref({
    grupoId: '',
    destinatario: 'GRUPO',
    alumnoId: '',
    titulo: '',
    mensaje: '',
    tipo: 'DIARIO'
})

const baseAPI = (
    import.meta.env.VITE_API_URL || 'http://localhost:5555'
).replace(/\/+$/, '')

function mostrarError(mensaje) {
    errorAviso.value = true
    mensajeAviso.value = mensaje
}

function mostrarExito(mensaje) {
    errorAviso.value = false
    mensajeAviso.value = mensaje
}

async function leerRespuesta(respuesta) {
    const resultado = await respuesta.json().catch(() => ({}))

    if (!respuesta.ok || resultado.ok === false) {
        throw new Error(
            resultado.mensaje || 'No se ha podido completar la operación.'
        )
    }

    return resultado
}

// Cargar solamente los grupos asignados al profesor de la sesión.
async function cargarGrupos() {
    cargandoGrupos.value = true
    grupos.value = []
    alumnosGrupo.value = []

    try {
        const respuesta = await fetch(
            `${baseAPI}/api/avisos/mis-grupos`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: 'application/json'
                }
            }
        )

        const resultado = await leerRespuesta(respuesta)

        grupos.value = Array.isArray(resultado.grupos)
            ? resultado.grupos
            : []

        if (grupos.value.length > 0) {
            aviso.value.grupoId = String(grupos.value[0].id)
            await cargarAlumnosDelGrupo()
        } else {
            aviso.value.grupoId = ''
            aviso.value.alumnoId = ''
            alumnosGrupo.value = []
        }
    } catch (error) {
        mostrarError(
            error.message || 'No se han podido cargar los grupos del profesor.'
        )
    } finally {
        cargandoGrupos.value = false
    }
}

// Cargar los alumnos activos y matriculados en el grupo seleccionado.
async function cargarAlumnosDelGrupo() {
    alumnosGrupo.value = []
    aviso.value.alumnoId = ''

    const grupoId = aviso.value.grupoId

    if (!grupoId) {
        return
    }

    cargandoAlumnos.value = true

    try {
        const respuesta = await fetch(
            `${baseAPI}/api/avisos/mis-grupos/${encodeURIComponent(grupoId)}/alumnos`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: 'application/json'
                }
            }
        )

        const resultado = await leerRespuesta(respuesta)

        alumnosGrupo.value = Array.isArray(resultado.alumnos)
            ? resultado.alumnos
            : []

        if (
            aviso.value.destinatario === 'INDIVIDUAL' &&
            alumnosGrupo.value.length > 0
        ) {
            aviso.value.alumnoId = String(alumnosGrupo.value[0].id)
        }
    } catch (error) {
        mostrarError(
            error.message || 'No se han podido cargar los alumnos del grupo.'
        )
    } finally {
        cargandoAlumnos.value = false
    }
}

async function cambiarGrupo() {
    mensajeAviso.value = ''
    errorAviso.value = false

    await cargarAlumnosDelGrupo()
}

function cambiarDestinatario() {
    mensajeAviso.value = ''
    errorAviso.value = false
    aviso.value.alumnoId = ''

    if (
        aviso.value.destinatario === 'INDIVIDUAL' &&
        alumnosGrupo.value.length > 0
    ) {
        aviso.value.alumnoId = String(alumnosGrupo.value[0].id)
    }
}

// Publicar el aviso mediante la API protegida del profesorado.
async function publicarAviso() {
    mensajeAviso.value = ''
    errorAviso.value = false

    if (!aviso.value.grupoId) {
        mostrarError('Selecciona un grupo antes de publicar el aviso.')
        return
    }

    if (
        aviso.value.destinatario === 'INDIVIDUAL' &&
        !aviso.value.alumnoId
    ) {
        mostrarError('Selecciona el alumno que recibirá el aviso.')
        return
    }

    publicandoAviso.value = true

    try {
        const datosAviso = {
            grupoId: Number(aviso.value.grupoId),
            alumnoId: aviso.value.destinatario === 'INDIVIDUAL'
                ? Number(aviso.value.alumnoId)
                : null,
            titulo: aviso.value.titulo,
            mensaje: aviso.value.mensaje,
            tipo: aviso.value.tipo
        }

        const respuesta = await fetch(
            `${baseAPI}/api/avisos`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(datosAviso)
            }
        )

        const resultado = await leerRespuesta(respuesta)

        mostrarExito(
            resultado.mensaje || 'El aviso se ha publicado correctamente.'
        )

        aviso.value.titulo = ''
        aviso.value.mensaje = ''
    } catch (error) {
        mostrarError(
            error.message || 'No se ha podido publicar el aviso.'
        )
    } finally {
        publicandoAviso.value = false
    }
}

onMounted(async () => {
    try {
        const respuesta = await fetch(
            `${baseAPI}/api/acceso-profesor/session`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: 'application/json'
                }
            }
        )

        const resultado = await leerRespuesta(respuesta)

        if (!resultado.profesor) {
            throw new Error('No se ha encontrado el profesor de la sesión.')
        }

        // Escuela Ateneu Aula 502 corresponde a la escuela ID 2.
        if (Number(resultado.profesor.escuelaId) !== 2) {
            await fetch(`${baseAPI}/api/acceso-profesor/logout`, {
                method: 'POST',
                credentials: 'include'
            })

            throw new Error('La sesión no pertenece a Escuela Ateneu Aula 502.')
        }

        profesor.value = resultado.profesor

        // La carga de los grupos tiene su propio manejo de errores.
        await cargarGrupos()
    } catch (error) {
        errorSesion.value = error.message
        console.error('Error al comprobar la sesión:', error.message)
        await router.replace('/ateneu/tutores/acceso')
    } finally {
        comprobandoSesion.value = false
    }
})

async function cerrarSesion() {
    try {
        await fetch(`${baseAPI}/api/acceso-profesor/logout`, {
            method: 'POST',
            credentials: 'include'
        })
    } catch (error) {
        console.error(
            'No se pudo contactar con el servidor para cerrar sesión.'
        )
    }

    profesor.value = null
    await router.replace('/ateneu/tutores/acceso')
}
</script>

<style scoped>
.tarjeta {
    display: block;
    width: 100%;
    padding: 1.5rem;
    background: white;
    border-radius: 1rem;
    border-right: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
    border-left: 1px solid #e5e7eb;
    box-shadow: 0 2px 8px rgb(0 0 0 / 5%);
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
}

.tarjeta:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 18px rgb(0 0 0 / 10%);
}

.titulo-tarjeta {
    font-size: 1.2rem;
    font-weight: 700;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
}

.texto-tarjeta {
    color: #4b5563;
    line-height: 1.6;
}
</style>
