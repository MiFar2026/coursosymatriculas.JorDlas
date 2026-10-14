
<template>
    <div class="min-h-screen bg-gray-50 text-gray-800">

        <NavbarJoanmiro />

        <main class="max-w-5xl mx-auto px-4 sm:px-6 py-10">

            <header class="mb-8">

                <p class="text-sm font-bold uppercase tracking-widest
                          text-red-700 mb-2">
                    Escuela Joan Miro
                </p>

                <h1 class="text-3xl font-bold mb-3">
                    Resultados de los alumnos
                </h1>

                <p class="text-gray-600">
                    Registra las notas y los comentarios de cada alumno.
                </p>

            </header>

            <section class="bg-white rounded-2xl border shadow p-6">

                <form
                    @submit.prevent="guardarResultado"
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
                            Tipo de evaluación
                        </label>

                        <select
                            v-model="formulario.tipo"
                            required
                            class="w-full border rounded-lg p-3 bg-white"
                        >

                            <option value="EXAMEN">Examen</option>
                            <option value="TAREA">Tarea</option>
                            <option value="ACTIVIDAD">Actividad</option>
                            <option value="PARTICIPACION">Participación</option>
                            <option value="FINAL">Evaluación final</option>

                        </select>

                    </div>

                    <div>

                        <label class="block font-semibold mb-2">
                            Título
                        </label>

                        <input
                            v-model.trim="formulario.titulo"
                            required
                            maxlength="200"
                            class="w-full border rounded-lg p-3"
                            placeholder="Ej.: Examen de unidad 1"
                        >

                    </div>

                    <div>

                        <label class="block font-semibold mb-2">
                            Nota (de 0 a 10)
                        </label>

                        <input
                            v-model="formulario.nota"
                            type="number"
                            min="0"
                            max="10"
                            step="0.01"
                            class="w-full border rounded-lg p-3"
                            placeholder="Opcional"
                        >

                    </div>

                    <div>

                        <label class="block font-semibold mb-2">
                            Comentario para el alumno
                        </label>

                        <textarea
                            v-model.trim="formulario.comentario"
                            rows="4"
                            class="w-full border rounded-lg p-3"
                            placeholder="Escribe una valoración..."
                        ></textarea>

                    </div>

                    <div
                        v-if="estado"
                        role="status"
                        class="rounded-lg p-4"
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
                        :disabled="guardando"
                        class="bg-red-600 hover:bg-red-700
                               disabled:opacity-60 text-white
                               font-bold rounded-lg px-5 py-3"
                    >
                        {{ guardando ? 'Guardando...' : 'Guardar resultado' }}
                    </button>

                </form>

            </section>

        </main>

    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import NavbarJoanmiro from '../../../components/joanmiro/NavbarJoanmiro.vue'

const grupos = ref([])
const alumnos = ref([])

const guardando = ref(false)
const error = ref(false)
const estado = ref('')

const formulario = reactive({
    grupo_id: '',
    alumno_id: '',
    tipo: 'TAREA',
    titulo: '',
    nota: '',
    comentario: ''
})

async function guardarResultado() {
    estado.value = ''
    error.value = false

    if (
        !formulario.grupo_id ||
        !formulario.alumno_id ||
        !formulario.titulo.trim()
    ) {
        error.value = true
        estado.value =
            'Selecciona un grupo, un alumno y escribe el título.'
        return
    }

    if (
        formulario.nota !== '' &&
        (
            !Number.isFinite(Number(formulario.nota)) ||
            Number(formulario.nota) < 0 ||
            Number(formulario.nota) > 10
        )
    ) {
        error.value = true
        estado.value = 'La nota debe estar entre 0 y 10.'
        return
    }

    guardando.value = true

    try {
        /*
         * Próximo paso:
         * POST /api/resultados.php
         *
         * El servidor debe comprobar que el tutor tiene permiso
         * para registrar resultados de este grupo y alumno.
         */

        estado.value =
            'El formulario está preparado. Falta conectar el guardado con la API PHP.'

    } catch {
        error.value = true
        estado.value =
            'No se ha podido guardar el resultado.'
    } finally {
        guardando.value = false
    }
}
</script>
