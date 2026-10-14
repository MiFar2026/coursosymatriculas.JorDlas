
<template>
    <div class="min-h-screen bg-gray-50 text-gray-800">

        <!-- NAVBAR PRINCIPAL DE ATENEU -->
        <NavbarAteneu />

        <!-- CONTENIDO -->
        <main class="max-w-6xl mx-auto px-4 py-8 sm:px-6">

            <!-- CABECERA -->
            <header class="text-center mb-8">

                <p
                    class="text-sm font-bold uppercase tracking-widest
                           text-indigo-700 mb-2"
                >
                    Escuela Ateneu
                </p>

                <h1 class="text-3xl sm:text-4xl font-bold mb-3">
                    Mi espacio de alumno
                </h1>

                <p class="text-gray-600 max-w-2xl mx-auto">
                    Consulta tus clases, entrega tus trabajos,
                    recibe las correcciones y comunícate con tus profesores.
                </p>

            </header>

            <!-- BOTONES CIRCULARES: NORMAS Y AVISOS -->
            <section
                class="flex justify-center gap-8 sm:gap-12 mb-10"
                aria-label="Normas y avisos"
            >

                <button
                    type="button"
                    @click="abrirPanel('normas')"
                    class="flex flex-col items-center gap-2
                           focus:outline-none focus-visible:ring-4
                           focus-visible:ring-indigo-300 rounded-full"
                    :aria-expanded="panelSuperior === 'normas'"
                >

                    <span
                        class="w-20 h-20 sm:w-24 sm:h-24 rounded-full
                               bg-indigo-600 hover:bg-indigo-700
                               text-white shadow-lg flex items-center
                               justify-center text-3xl transition"
                    >
                        📘
                    </span>

                    <span class="font-bold text-indigo-800">
                        Normas
                    </span>

                </button>

                <button
                    type="button"
                    @click="abrirPanel('avisos')"
                    class="flex flex-col items-center gap-2
                           focus:outline-none focus-visible:ring-4
                           focus-visible:ring-amber-300 rounded-full"
                    :aria-expanded="panelSuperior === 'avisos'"
                >

                    <span
                        class="w-20 h-20 sm:w-24 sm:h-24 rounded-full
                               bg-amber-500 hover:bg-amber-600
                               text-white shadow-lg flex items-center
                               justify-center text-3xl transition"
                    >
                        📢
                    </span>

                    <span class="font-bold text-amber-800">
                        Avisos
                    </span>

                </button>

            </section>

            <!-- CONTENIDO DE NORMAS -->
            <section
                v-if="panelSuperior === 'normas'"
                class="bg-white border-l-4 border-indigo-500
                       rounded-xl shadow p-6 mb-8"
            >

                <div class="flex justify-between items-start gap-4">

                    <h2 class="text-xl font-bold mb-4">
                        Normas de clase
                    </h2>

                    <button
                        type="button"
                        @click="panelSuperior = null"
                        class="text-gray-500 hover:text-gray-900
                               text-xl"
                        aria-label="Cerrar normas"
                    >
                        ✕
                    </button>

                </div>

                <ul class="space-y-3 list-disc pl-5">

                    <li>
                        Pedir la palabra: levantar la mano y esperar el turno.
                    </li>

                    <li>
                        Escuchar con atención a los compañeros y al profesor.
                    </li>

                    <li>
                        Utilizar un lenguaje respetuoso.
                    </li>

                    <li>
                        Participar de forma constructiva.
                    </li>

                    <li>
                        Respetar la diversidad de opiniones y experiencias.
                    </li>

                    <li>
                        Llegar puntual y preparado para la clase.
                    </li>

                    <li>
                        Mantener una buena higiene personal y cuidar
                        los espacios compartidos.
                    </li>

                </ul>

            </section>

            <!-- CONTENIDO DE AVISOS -->
            <section
                v-if="panelSuperior === 'avisos'"
                class="bg-white border-l-4 border-amber-500
                       rounded-xl shadow p-6 mb-8"
            >

                <div class="flex justify-between items-start gap-4">

                    <h2 class="text-xl font-bold mb-4">
                        Avisos de la escuela
                    </h2>

                    <button
                        type="button"
                        @click="panelSuperior = null"
                        class="text-gray-500 hover:text-gray-900
                               text-xl"
                        aria-label="Cerrar avisos"
                    >
                        ✕
                    </button>

                </div>

                <p class="text-gray-600 mb-4">
                    Aquí aparecerán los avisos publicados por los profesores.
                </p>

                <div
                    v-if="avisos.length === 0"
                    class="bg-amber-50 rounded-lg p-4 text-gray-700"
                >
                    Todavía no hay avisos disponibles.
                </div>

                <article
                    v-for="aviso in avisos"
                    :key="aviso.id"
                    class="border rounded-lg p-4 mb-3"
                >

                    <div class="flex flex-wrap gap-2 items-center mb-2">

                        <span
                            class="text-xs font-bold px-3 py-1 rounded-full"
                            :class="
                                aviso.tipo === 'PERMANENTE'
                                    ? 'bg-indigo-100 text-indigo-800'
                                    : 'bg-amber-100 text-amber-800'
                            "
                        >
                            {{
                                aviso.tipo === 'PERMANENTE'
                                    ? 'AVISO PERMANENTE'
                                    : 'AVISO TEMPORAL'
                            }}
                        </span>

                    </div>

                    <h3 class="font-bold text-lg">
                        {{ aviso.titulo }}
                    </h3>

                    <p class="mt-2 whitespace-pre-line">
                        {{ aviso.mensaje }}
                    </p>

                    <p
                        v-if="aviso.fecha_publicacion"
                        class="text-sm text-gray-500 mt-3"
                    >
                        Publicado:
                        {{ aviso.fecha_publicacion }}
                    </p>

                </article>

                <p class="text-xs text-gray-500 mt-4">
                    Los avisos temporales estarán disponibles durante
                    un máximo de 72 horas. La fecha de expiración deberá
                    controlarse en el servidor.
                </p>

            </section>

            <!-- FORMULARIO DE IDENTIFICACIÓN -->
            <section
                v-if="!alumno"
                class="max-w-2xl mx-auto bg-white rounded-2xl
                       shadow-md border p-6 sm:p-8 mb-10"
            >

                <h2 class="text-2xl font-bold mb-2">
                    Entrar en mi perfil
                </h2>

                <p class="text-gray-600 mb-6">
                    Escribe los datos que facilitaste al matricularte.
                </p>

                <form
                    @submit.prevent="buscarAlumno"
                    class="space-y-5"
                >

                    <div>

                        <label
                            for="nombre"
                            class="block font-semibold mb-2"
                        >
                            Nombre
                        </label>

                        <input
                            id="nombre"
                            v-model.trim="formulario.nombre"
                            type="text"
                            autocomplete="given-name"
                            required
                            class="w-full border rounded-lg px-4 py-3
                                   focus:ring-2 focus:ring-indigo-500
                                   focus:outline-none"
                            placeholder="Tu nombre"
                        >

                    </div>

                    <div>

                        <label
                            for="apellidos"
                            class="block font-semibold mb-2"
                        >
                            Apellidos
                        </label>

                        <input
                            id="apellidos"
                            v-model.trim="formulario.apellidos"
                            type="text"
                            autocomplete="family-name"
                            required
                            class="w-full border rounded-lg px-4 py-3
                                   focus:ring-2 focus:ring-indigo-500
                                   focus:outline-none"
                            placeholder="Tus apellidos completos"
                        >

                    </div>

                    <div>

                        <label
                            for="email"
                            class="block font-semibold mb-2"
                        >
                            Correo electrónico
                        </label>

                        <input
                            id="email"
                            v-model.trim="formulario.email"
                            type="email"
                            autocomplete="email"
                            required
                            class="w-full border rounded-lg px-4 py-3
                                   focus:ring-2 focus:ring-indigo-500
                                   focus:outline-none"
                            placeholder="tu@correo.com"
                        >

                    </div>

                    <div
                        v-if="mensaje"
                        role="status"
                        class="rounded-lg p-4"
                        :class="
                            error
                                ? 'bg-red-50 text-red-800'
                                : 'bg-blue-50 text-blue-800'
                        "
                    >
                        {{ mensaje }}
                    </div>

                    <button
                        type="submit"
                        :disabled="cargando"
                        class="w-full bg-indigo-600 hover:bg-indigo-700
                               disabled:opacity-60 text-white font-bold
                               rounded-lg px-5 py-3 transition"
                    >
                        {{ cargando ? 'Comprobando...' : 'Entrar en mi perfil' }}
                    </button>

                </form>

                <p class="text-xs text-gray-500 mt-5">
                    La comprobación real se conectará con la base de datos
                    de la escuela. No introduzcas aquí la contraseña
                    de tu correo electrónico.
                </p>

            </section>

            <!-- PERFIL DEL ALUMNO -->
            <template v-if="alumno">

                <!-- INFORMACIÓN DEL ALUMNO -->
                <section
                    class="bg-white rounded-2xl shadow-md border
                           p-6 mb-8"
                >

                    <div
                        class="flex flex-col sm:flex-row sm:items-center
                               sm:justify-between gap-4 mb-5"
                    >

                        <div>

                            <p
                                class="text-sm uppercase tracking-widest
                                       font-bold text-green-700"
                            >
                                Perfil identificado
                            </p>

                            <h2 class="text-2xl font-bold mt-1">
                                {{ alumno.nombre }}
                                {{ alumno.apellidos }}
                            </h2>

                            <p class="text-gray-600">
                                {{ alumno.email }}
                            </p>

                        </div>

                        <button
                            type="button"
                            @click="cerrarPerfil"
                            class="border rounded-lg px-4 py-2
                                   hover:bg-gray-100"
                        >
                            Salir del perfil
                        </button>

                    </div>

                </section>

                <!-- TARJETAS DE CLASES -->
                <section class="mb-10">

                    <h2 class="text-2xl font-bold mb-5">
                        Mi clase
                    </h2>

                    <div
                        v-if="clases.length === 0"
                        class="bg-white rounded-xl border p-6"
                    >
                        <p class="font-semibold">
                            Todavía no tienes un grupo activo asignado.
                        </p>

                        <p class="text-gray-600 mt-2">
                            Contacta con la escuela para comprobar
                            tu matrícula.
                        </p>
                    </div>

                    <article
                        v-for="clase in clases"
                        :key="clase.matricula_id"
                        class="bg-white rounded-2xl shadow-md border
                               overflow-hidden mb-5"
                    >

                        <div class="bg-indigo-700 text-white p-5">

                            <h3 class="text-xl font-bold">
                                MI CLASE
                            </h3>

                            <p class="mt-1 text-indigo-100">
                                {{ clase.curso || 'Curso pendiente' }}
                            </p>

                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2
                                    gap-5 p-6">

                            <div>
                                <p class="text-sm text-gray-500">
                                    Curso
                                </p>
                                <p class="font-semibold">
                                    {{ clase.curso || 'Pendiente' }}
                                </p>
                            </div>

                            <div>
                                <p class="text-sm text-gray-500">
                                    Profesor
                                </p>
                                <p class="font-semibold">
                                    {{ clase.profesor || 'Pendiente de asignación' }}
                                </p>
                            </div>

                            <div>
                                <p class="text-sm text-gray-500">
                                    Escuela
                                </p>
                                <p class="font-semibold">
                                    {{ clase.escuela || 'Pendiente' }}
                                </p>
                            </div>

                            <div>
                                <p class="text-sm text-gray-500">
                                    Aula
                                </p>
                                <p class="font-semibold">
                                    {{ clase.aula || 'Pendiente' }}
                                </p>
                            </div>

                            <div>
                                <p class="text-sm text-gray-500">
                                    Día
                                </p>
                                <p class="font-semibold">
                                    {{ clase.dias || 'Pendiente' }}
                                </p>
                            </div>

                            <div>
                                <p class="text-sm text-gray-500">
                                    Horario
                                </p>
                                <p class="font-semibold">
                                    {{ clase.horario || 'Pendiente' }}
                                </p>
                            </div>

                        </div>

                        <div class="border-t bg-gray-50 p-4">

                            <label
                                :for="`profesor-${clase.matricula_id}`"
                                class="block font-semibold mb-2"
                            >
                                Profesor para mis trabajos y mensajes
                            </label>

                            <select
                                :id="`profesor-${clase.matricula_id}`"
                                v-model="profesorSeleccionado[clase.matricula_id]"
                                class="w-full border rounded-lg px-4 py-3
                                       bg-white"
                            >

                                <option value="">
                                    Selecciona un profesor
                                </option>

                                <option
                                    v-for="profesor in profesoresDeClase(clase)"
                                    :key="profesor.id"
                                    :value="String(profesor.id)"
                                >
                                    {{ profesor.nombre }}
                                </option>

                            </select>

                            <p class="text-xs text-gray-500 mt-2">
                                Selecciona el profesor correspondiente
                                a esta clase antes de enviar un trabajo
                                o escribir un mensaje.
                            </p>

                        </div>

                    </article>

                </section>

                <!-- TRES OPCIONES -->
                <section class="mb-10">

                    <h2 class="text-2xl font-bold mb-5">
                        Mi espacio de aprendizaje
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-3
                                gap-4 mb-5">

                        <button
                            type="button"
                            @click="alternarSeccion('entrega')"
                            :aria-expanded="seccionAbierta === 'entrega'"
                            class="rounded-xl p-5 text-left text-white
                                   bg-green-600 hover:bg-green-700
                                   shadow transition"
                        >

                            <span class="text-3xl">📤</span>

                            <span class="block text-lg font-bold mt-3">
                                Entregar mi trabajo
                            </span>

                            <span class="block text-sm mt-1 text-green-50">
                                Enviar tareas al profesor correspondiente.
                            </span>

                        </button>

                        <button
                            type="button"
                            @click="alternarSeccion('descarga')"
                            :aria-expanded="seccionAbierta === 'descarga'"
                            class="rounded-xl p-5 text-left text-white
                                   bg-blue-600 hover:bg-blue-700
                                   shadow transition"
                        >

                            <span class="text-3xl">📥</span>

                            <span class="block text-lg font-bold mt-3">
                                Descargar mi trabajo corregido
                            </span>

                            <span class="block text-sm mt-1 text-blue-50">
                                Consultar los documentos devueltos
                                por el profesor.
                            </span>

                        </button>

                        <button
                            type="button"
                            @click="alternarSeccion('resultados')"
                            :aria-expanded="seccionAbierta === 'resultados'"
                            class="rounded-xl p-5 text-left text-white
                                   bg-red-600 hover:bg-red-700
                                   shadow transition"
                        >

                            <span class="text-3xl">📝</span>

                            <span class="block text-lg font-bold mt-3">
                                Mis resultados
                            </span>

                            <span class="block text-sm mt-1 text-red-50">
                                Consultar notas y comentarios.
                            </span>

                        </button>

                    </div>

                    <!-- ENTREGA -->
                    <div
                        v-if="seccionAbierta === 'entrega'"
                        class="bg-white border rounded-xl shadow-sm p-6"
                    >

                        <h3 class="text-xl font-bold mb-3">
                            Entregar mi trabajo
                        </h3>

                        <p class="text-gray-600 mb-4">
                            Elige la clase y el profesor en el selector
                            que aparece en la tarjeta de tu grupo.
                        </p>

                        <RouterLink
                            :to="rutaEntrega"
                            class="inline-flex bg-green-600 hover:bg-green-700
                                   text-white font-bold rounded-lg
                                   px-5 py-3"
                        >
                            Abrir entrega de trabajos
                        </RouterLink>

                    </div>

                    <!-- DESCARGAS -->
                    <div
                        v-if="seccionAbierta === 'descarga'"
                        class="bg-white border rounded-xl shadow-sm p-6"
                    >

                        <h3 class="text-xl font-bold mb-3">
                            Mis trabajos corregidos
                        </h3>

                        <p class="text-gray-600 mb-4">
                            Aquí aparecerán los trabajos que tus profesores
                            hayan corregido y puesto a tu disposición.
                        </p>

                        <p class="text-sm text-amber-800 bg-amber-50
                                  rounded-lg p-4 mb-4">
                            La descarga se habilitará cuando conectemos
                            esta sección con los archivos almacenados
                            en el servidor.
                        </p>

                        <RouterLink
                            :to="rutaResultados"
                            class="inline-flex bg-blue-600 hover:bg-blue-700
                                   text-white font-bold rounded-lg
                                   px-5 py-3"
                        >
                            Consultar trabajos y resultados
                        </RouterLink>

                    </div>

                    <!-- RESULTADOS -->
                    <div
                        v-if="seccionAbierta === 'resultados'"
                        class="bg-white border rounded-xl shadow-sm p-6"
                    >

                        <h3 class="text-xl font-bold mb-3">
                            Mis resultados
                        </h3>

                        <p class="text-gray-600 mb-4">
                            En esta sección se mostrarán únicamente
                            las notas y los comentarios de tus profesores.
                        </p>

                        <RouterLink
                            :to="rutaResultados"
                            class="inline-flex bg-red-600 hover:bg-red-700
                                   text-white font-bold rounded-lg
                                   px-5 py-3"
                        >
                            Ver mis resultados
                        </RouterLink>

                    </div>

                </section>

                <!-- MENSAJES -->
                <section
                    class="bg-white rounded-2xl shadow-md border
                           p-6 mb-8"
                >

                    <h2 class="text-2xl font-bold mb-3">
                        Mensajes con mis profesores
                    </h2>

                    <p class="text-gray-600 mb-5">
                        Selecciona el profesor de la clase correspondiente
                        en el desplegable de su tarjeta «Mi clase».
                    </p>

                    <RouterLink
                        :to="rutaMensajes"
                        class="inline-flex bg-indigo-600 hover:bg-indigo-700
                               text-white font-bold rounded-lg
                               px-5 py-3"
                    >
                        Abrir mensajes
                    </RouterLink>

                </section>

                <!-- FORO -->
                <section
                    class="bg-purple-50 border border-purple-200
                           rounded-2xl p-6 sm:p-8"
                >

                    <h2 class="text-2xl font-bold mb-3">
                        Foro de estudiantes
                    </h2>

                    <p class="text-gray-700 mb-5">
                        Comparte preguntas, ideas y recursos con los demás
                        alumnos. Podrás entrar en el foro de tu curso
                        o en el foro general de tu escuela.
                    </p>

                    <RouterLink
                        :to="rutaForo"
                        class="inline-flex bg-purple-700 hover:bg-purple-800
                               text-white font-bold rounded-lg
                               px-5 py-3"
                    >
                        Ir al foro
                    </RouterLink>

                </section>

            </template>

        </main>

        <!-- PIE -->
        <footer class="border-t bg-white mt-12 py-6">

            <p class="text-center text-sm text-gray-500">
                ExAequo · Escuela Ateneu · Espacio del alumnado
            </p>

        </footer>

    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import NavbarAteneu from '../../../components/ateneu/NavbarAteneu.vue'

/*
|--------------------------------------------------------------------------
| ESTADO DE LA PÁGINA
|--------------------------------------------------------------------------
|
| La conexión real con la API PHP se añadirá después de comprobar
| las rutas y el formato de respuesta de tu servidor.
|
*/

const formulario = reactive({
    nombre: '',
    apellidos: '',
    email: ''
})

const alumno = ref(null)
const clases = ref([])
const avisos = ref([])

const mensaje = ref('')
const error = ref(false)
const cargando = ref(false)

const panelSuperior = ref(null)
const seccionAbierta = ref(null)

const profesorSeleccionado = reactive({})

/*
|--------------------------------------------------------------------------
| ESCUELA ACTUAL
|--------------------------------------------------------------------------
|
| Esta vista corresponde a Ateneu.
| La versión de Joan Miró deberá usar su propia escuela y sus rutas.
|
*/

const escuelaActual = 'Ateneu Aula 502'

/*
|--------------------------------------------------------------------------
| RUTAS
|--------------------------------------------------------------------------
|
| Si los nombres de tus rutas en router/index.js son distintos,
| tendremos que adaptarlos.
|
*/

const rutaEntrega = computed(() => ({
    path: '/ateneu/alumnos/entregar-tarea'
}))

const rutaResultados = computed(() => ({
    path: '/ateneu/tutores/resultados-alumno'
}))

const rutaMensajes = computed(() => ({
    path: '/ateneu/tutores/mensaje-profesor'
}))

const rutaForo = computed(() => ({
    path: '/ateneu/alumnos/foro'
}))

/*
|--------------------------------------------------------------------------
| NORMAS Y AVISOS
|--------------------------------------------------------------------------
*/

function abrirPanel(nombre) {
    panelSuperior.value =
        panelSuperior.value === nombre ? null : nombre
}

/*
|--------------------------------------------------------------------------
| ACORDEÓN: SOLO UNA SECCIÓN ABIERTA
|--------------------------------------------------------------------------
*/

function alternarSeccion(nombre) {
    seccionAbierta.value =
        seccionAbierta.value === nombre ? null : nombre
}

/*
|--------------------------------------------------------------------------
| PROFESORES DISPONIBLES PARA CADA CLASE
|--------------------------------------------------------------------------
|
| Cuando recibamos los datos de MySQL, cada clase incluirá su lista
| de profesores vinculados.
|
*/

function profesoresDeClase(clase) {
    if (Array.isArray(clase.profesores)) {
        return clase.profesores
    }

    if (clase.profesor_id && clase.profesor) {
        return [{
            id: clase.profesor_id,
            nombre: clase.profesor
        }]
    }

    return []
}

/*
|--------------------------------------------------------------------------
| IDENTIFICACIÓN DEL ALUMNO
|--------------------------------------------------------------------------
|
| IMPORTANTE:
| Esta función no finge consultar la base de datos.
| Hasta conectar la API, muestra un mensaje explicativo.
|
*/

async function buscarAlumno() {
    mensaje.value = ''
    error.value = false

    const nombre = formulario.nombre.trim()
    const apellidos = formulario.apellidos.trim()
    const email = formulario.email.trim()

    if (!nombre || !apellidos || !email) {
        error.value = true
        mensaje.value = 'Completa los tres campos para continuar.'
        return
    }

    cargando.value = true

    try {
        /*
         * Próximo paso:
         *
         * Enviar nombre, apellidos y correo a un endpoint PHP.
         * El servidor comprobará los datos en la tabla alumnos
         * y devolverá las clases activas del alumno.
         *
         * No se debe consultar la base de datos directamente
         * desde Vue.
         */

        mensaje.value =
            'El formulario está preparado. Falta conectarlo con la API PHP para comprobar tus datos.'

        error.value = false

    } catch (e) {
        error.value = true
        mensaje.value =
            'No se ha podido comprobar tu perfil. Inténtalo de nuevo.'

    } finally {
        cargando.value = false
    }
}

/*
|--------------------------------------------------------------------------
| CERRAR PERFIL
|--------------------------------------------------------------------------
*/

function cerrarPerfil() {
    alumno.value = null
    clases.value = []

    formulario.nombre = ''
    formulario.apellidos = ''
    formulario.email = ''

    mensaje.value = ''
    error.value = false

    panelSuperior.value = null
    seccionAbierta.value = null

    Object.keys(profesorSeleccionado).forEach((id) => {
        delete profesorSeleccionado[id]
    })
}
</script>