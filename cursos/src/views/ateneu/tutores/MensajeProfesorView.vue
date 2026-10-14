
<template>
    <div class="min-h-screen bg-gray-50 text-gray-800">

        <NavbarAteneu />

        <main class="max-w-5xl mx-auto px-4 sm:px-6 py-10">

            <header class="mb-8">

                <p class="text-sm font-bold uppercase tracking-widest
                          text-blue-700 mb-2">
                    Escuela Ateneu
                </p>

                <h1 class="text-3xl font-bold mb-3">
                    Mensajes con los alumnos
                </h1>

                <p class="text-gray-600">
                    Selecciona un grupo y un alumno para consultar
                    la conversación y responderle.
                </p>

            </header>

            <section class="bg-white rounded-2xl border shadow p-6">

                <form
                    @submit.prevent="enviarMensaje"
                    class="space-y-5"
                >

                    <div>

                        <label class="block font-semibold mb-2">
                            Grupo
                        </label>

                        <select
                            v-model="formulario.grupo_id"
                            required
                            class="w-full border rounded-lg p-3 bg-white"
                        >

                            <option value="">
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

                    </div>

                    <div>

                        <label class="block font-semibold mb-2">
                            Alumno
                        </label>

                        <select
                            v-model="formulario.alumno_id"
                            required
                            class="w-full border rounded-lg p-3 bg-white"
                        >

                            <option value="">
                                Selecciona un alumno
                            </option>

                            <option
                                v-for="alumno in alumnos"
                                :key="alumno.id"
                                :value="String(alumno.id)"
                            >
                                {{ alumno.nombre }} {{ alumno.apellidos }}
                            </option>

                        </select>

                    </div>

                    <div>

                        <label class="block font-semibold mb-2">
                            Asunto
                        </label>

                        <input
                            v-model.trim="formulario.asunto"
                            required
                            maxlength="200"
                            class="w-full border rounded-lg p-3"
                            placeholder="Asunto del mensaje"
                        >

                    </div>

                    <div>

                        <label class="block font-semibold mb-2">
                            Mensaje
                        </label>

                        <textarea
                            v-model.trim="formulario.mensaje"
                            required
                            rows="5"
                            class="w-full border rounded-lg p-3"
                            placeholder="Escribe tu mensaje..."
                        ></textarea>

                    </div>

                    <div
                        v-if="estado"
                        role="status"
                        class="p-4 rounded-lg"
                        :class="
                            error
                                ? 'bg-red-50 text-red-800'
                                : 'bg-blue-50 text-blue-800'
                        "
                    >
                        {{ estado }}
                    </div>

                    <button
                        type="submit"
                        :disabled="enviando"
                        class="bg-blue-600 hover:bg-blue-700
                               disabled:opacity-60 text-white
                               font-bold rounded-lg px-5 py-3"
                    >
                        {{ enviando ? 'Enviando...' : 'Enviar mensaje' }}
                    </button>

                </form>

            </section>

            <section class="mt-8 bg-white rounded-2xl border shadow p-6">

                <h2 class="text-xl font-bold mb-4">
                    Conversación
                </h2>

                <p class="text-gray-600">
                    Aquí se mostrarán los mensajes anteriores del alumno
                    seleccionado cuando conectemos la consulta con la API.
                </p>

            </section>

        </main>

    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import NavbarAteneu from '../../../components/ateneu/NavbarAteneu.vue'

const grupos = ref([])
const alumnos = ref([])

const enviando = ref(false)
const error = ref(false)
const estado = ref('')

const formulario = reactive({
    grupo_id: '',
    alumno_id: '',
    asunto: '',
    mensaje: ''
})

async function enviarMensaje() {
    estado.value = ''
    error.value = false

    if (
        !formulario.grupo_id ||
        !formulario.alumno_id ||
        !formulario.asunto.trim() ||
        !formulario.mensaje.trim()
    ) {
        error.value = true
        estado.value = 'Completa todos los campos.'
        return
    }

    enviando.value = true

    try {
        /*
         * Próximo paso:
         * POST /api/mensajes.php
         *
         * El servidor obtendrá la identidad del profesor
         * de su sesión y verificará que puede contactar
         * con el alumno seleccionado.
         */

        estado.value =
            'El formulario está preparado. Falta conectar el envío con la API PHP.'

    } catch {
        error.value = true
        estado.value =
            'No se ha podido enviar el mensaje. Inténtalo de nuevo.'
    } finally {
        enviando.value = false
    }
}
</script>
