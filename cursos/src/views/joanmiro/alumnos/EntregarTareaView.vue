
<template>
    <div class="min-h-screen bg-gray-50 text-gray-800">

        <NavbarJoanmiro />

        <main class="max-w-4xl mx-auto px-4 sm:px-6 py-10">

            <header class="mb-8">

                <p class="text-sm font-bold uppercase tracking-widest
                          text-green-700 mb-2">
                    Escuela Joan Miro
                </p>

                <h1 class="text-3xl font-bold mb-3">
                    Entregar mi trabajo
                </h1>

                <p class="text-gray-600">
                    Selecciona tu clase y el profesor al que deseas
                    enviar el trabajo.
                </p>

            </header>

            <section class="bg-white rounded-2xl shadow border p-6">

                <form
                    class="space-y-6"
                    @submit.prevent="enviarTrabajo"
                >

                    <div>

                        <label
                            for="grupo"
                            class="block font-semibold mb-2"
                        >
                            Mi clase
                        </label>

                        <select
                            id="grupo"
                            v-model="formulario.grupo_id"
                            required
                            class="w-full border rounded-lg p-3 bg-white"
                        >

                            <option value="">
                                Selecciona tu clase
                            </option>

                            <option
                                v-for="grupo in grupos"
                                :key="grupo.id"
                                :value="String(grupo.id)"
                            >
                                {{ grupo.curso }} — {{ grupo.nombre }}
                            </option>

                        </select>

                    </div>

                    <div>

                        <label
                            for="profesor"
                            class="block font-semibold mb-2"
                        >
                            Profesor destinatario
                        </label>

                        <select
                            id="profesor"
                            v-model="formulario.profesor_id"
                            required
                            class="w-full border rounded-lg p-3 bg-white"
                        >

                            <option value="">
                                Selecciona al profesor
                            </option>

                            <option
                                v-for="profesor in profesoresDisponibles"
                                :key="profesor.id"
                                :value="String(profesor.id)"
                            >
                                {{ profesor.nombre }}
                            </option>

                        </select>

                    </div>

                    <div>

                        <label
                            for="titulo"
                            class="block font-semibold mb-2"
                        >
                            Título del trabajo
                        </label>

                        <input
                            id="titulo"
                            v-model.trim="formulario.titulo"
                            required
                            maxlength="200"
                            class="w-full border rounded-lg p-3"
                            placeholder="Ej.: Ejercicio de escritura"
                        >

                    </div>

                    <div>

                        <label
                            for="comentario"
                            class="block font-semibold mb-2"
                        >
                            Comentario para el profesor
                        </label>

                        <textarea
                            id="comentario"
                            v-model="formulario.comentario"
                            rows="4"
                            class="w-full border rounded-lg p-3"
                            placeholder="Puedes explicar algo sobre tu trabajo."
                        ></textarea>

                    </div>

                    <div>

                        <label
                            for="archivo"
                            class="block font-semibold mb-2"
                        >
                            Documento
                        </label>

                        <input
                            id="archivo"
                            ref="archivoInput"
                            type="file"
                            accept=".pdf,.doc,.docx,.odt"
                            required
                            class="w-full border rounded-lg p-3"
                            @change="seleccionarArchivo"
                        >

                        <p class="text-sm text-gray-500 mt-2">
                            Formatos admitidos: PDF, DOC, DOCX y ODT.
                            El servidor también deberá comprobar el tamaño
                            y el tipo real del archivo.
                        </p>

                    </div>

                    <div
                        v-if="mensaje"
                        role="status"
                        class="rounded-lg p-4"
                        :class="
                            error
                                ? 'bg-red-50 text-red-800'
                                : 'bg-green-50 text-green-800'
                        "
                    >
                        {{ mensaje }}
                    </div>

                    <button
                        type="submit"
                        :disabled="enviando"
                        class="w-full bg-green-600 hover:bg-green-700
                               disabled:opacity-60 text-white font-bold
                               rounded-lg px-5 py-3"
                    >
                        {{ enviando ? 'Enviando...' : 'Enviar mi trabajo' }}
                    </button>

                </form>

            </section>

            <div class="mt-6">

                <RouterLink
                    to="/joanmiro/alumnos/perfil"
                    class="text-indigo-700 font-semibold hover:underline"
                >
                    ← Volver a mi perfil
                </RouterLink>

            </div>

        </main>

    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import NavbarJoanmiro from '../../../components/joanmiro/NavbarJoanmiro.vue'

const API_BASE = '/api'

const grupos = ref([])
const profesores = ref([])

const archivoInput = ref(null)
const archivoSeleccionado = ref(null)

const enviando = ref(false)
const error = ref(false)
const mensaje = ref('')

const formulario = reactive({
    grupo_id: '',
    profesor_id: '',
    titulo: '',
    comentario: ''
})

const profesoresDisponibles = computed(() => {
    if (!formulario.grupo_id) {
        return []
    }

    return profesores.value.filter(profesor =>
        profesor.grupo_ids?.includes(Number(formulario.grupo_id))
    )
})

watch(
    () => formulario.grupo_id,
    () => {
        formulario.profesor_id = ''
    }
)

function seleccionarArchivo(evento) {
    archivoSeleccionado.value = evento.target.files?.[0] || null
}

onMounted(async () => {
    /*
     * Los endpoints deberán devolver los grupos y profesores
     * del alumno autenticado en joan miró.
     *
     * No se deben cargar listas globales de las dos escuelas.
     */

    // La carga real se conectará cuando definamos las respuestas
    // de los endpoints PHP.
})

async function enviarTrabajo() {
    mensaje.value = ''
    error.value = false

    if (
        !formulario.grupo_id ||
        !formulario.profesor_id ||
        !formulario.titulo.trim() ||
        !archivoSeleccionado.value
    ) {
        error.value = true
        mensaje.value =
            'Completa la clase, el profesor, el título y el archivo.'
        return
    }

    enviando.value = true

    try {
        const datos = new FormData()

        datos.append('grupo_id', formulario.grupo_id)
        datos.append('profesor_id', formulario.profesor_id)
        datos.append('titulo', formulario.titulo.trim())
        datos.append('comentario', formulario.comentario)
        datos.append('archivo', archivoSeleccionado.value)

        /*
         * Cuando exista el endpoint:
         *
         * const respuesta = await fetch(`${API_BASE}/tareas.php`, {
         *     method: 'POST',
         *     body: datos
         * })
         *
         * El servidor debe verificar que el alumno pertenece
         * a joan Miró y está matriculado en el grupo seleccionado.
         */

        mensaje.value =
            'El formulario está preparado. Falta conectar la API PHP para guardar y enviar el archivo.'

    } catch {
        error.value = true
        mensaje.value =
            'No se ha podido enviar el trabajo. Inténtalo de nuevo.'
    } finally {
        enviando.value = false
    }
}
</script>