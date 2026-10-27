
<template>
    <div class="min-h-screen bg-gray-50 text-gray-800">
        <NavbarJoanmiro />

        <main class="max-w-5xl mx-auto px-4 sm:px-6 py-10">
            <header class="mb-8">
                <p class="text-sm font-bold uppercase tracking-widest text-blue-700 mb-2">
                    Biblioteca Joan Miró
                </p>

                <h1 class="text-3xl font-bold mb-3">
                    Resultados de los alumnos
                </h1>

                <p class="text-gray-600">
                    Registra las notas, los comentarios y los archivos corregidos.
                </p>
            </header>

            <section class="bg-white rounded-2xl border shadow p-6">
                <form @submit.prevent="guardarResultado" class="space-y-5">
                    <div>
                        <label for="grupo" class="block font-semibold mb-2">
                            Grupo
                        </label>

                        <select
                            id="grupo"
                            v-model="formulario.grupo_id"
                            required
                            :disabled="cargandoGrupos"
                            class="w-full border rounded-lg p-3 bg-white disabled:bg-gray-100"
                        >
                            <option value="">
                                {{ cargandoGrupos ? 'Cargando grupos...' : 'Selecciona un grupo' }}
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
                        <label for="alumno" class="block font-semibold mb-2">
                            Alumno
                        </label>

                        <select
                            id="alumno"
                            v-model="formulario.alumno_id"
                            required
                            :disabled="!formulario.grupo_id || cargandoAlumnos"
                            class="w-full border rounded-lg p-3 bg-white disabled:bg-gray-100"
                        >
                            <option value="">
                                {{
                                    cargandoAlumnos
                                        ? 'Cargando alumnos...'
                                        : 'Selecciona un alumno'
                                }}
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
                        <label for="tipo" class="block font-semibold mb-2">
                            Tipo de evaluación
                        </label>

                        <select
                            id="tipo"
                            v-model="formulario.tipo"
                            required
                            class="w-full border rounded-lg p-3 bg-white"
                        >
                            <option value="EXAMEN">Examen</option>
                            <option value="TAREA">Tarea</option>
                            <option value="ACTIVIDAD">Actividad</option>
                            <option value="PARTICIPACION">Participación</option>
                            <option value="FINAL">Examen final (40 %)</option>
                        </select>

                        <p class="text-sm text-gray-500 mt-2">
                            El examen final representa el 40 % de la nota
                            ponderada. La media de las demás evaluaciones
                            representa el 60 %.
                        </p>
                    </div>

                    <div>
                        <label for="titulo" class="block font-semibold mb-2">
                            Título
                        </label>

                        <input
                            id="titulo"
                            v-model.trim="formulario.titulo"
                            required
                            maxlength="200"
                            class="w-full border rounded-lg p-3"
                            placeholder="Ej.: Examen de unidad 1"
                        />
                    </div>

                    <div>
                        <label for="nota" class="block font-semibold mb-2">
                            Nota (de 0 a 10)
                        </label>

                        <input
                            id="nota"
                            v-model="formulario.nota"
                            type="number"
                            min="0"
                            max="10"
                            step="0.01"
                            required
                            class="w-full border rounded-lg p-3"
                            placeholder="Introduce una nota"
                        />
                    </div>

                    <!-- Decisión de aptitud: solo para notas finales de 5 a menos de 6 -->
                    <div
                        v-if="
                            formulario.tipo === 'FINAL' &&
                            formulario.nota !== '' &&
                            Number(formulario.nota) >= 5 &&
                            Number(formulario.nota) < 6
                        "
                    >
                        <label
                            for="decision_apto"
                            class="block font-semibold mb-2"
                        >
                            Decisión de aptitud
                        </label>

                        <select
                            id="decision_apto"
                            v-model="formulario.decision_apto"
                            required
                            class="w-full border rounded-lg p-3 bg-white"
                        >
                            <option value="">
                                Selecciona una decisión
                            </option>

                            <option value="APTO">
                                APTO
                            </option>

                            <option value="NO_APTO">
                                NO APTO
                            </option>
                        </select>

                        <p class="text-sm text-amber-700 mt-2">
                            La nota final está entre 5 y menos de 6.
                            La profesora debe decidir si el alumno es apto.
                        </p>
                    </div>

                    <div>
                        <label for="comentario" class="block font-semibold mb-2">
                            Comentario para el alumno
                        </label>

                        <textarea
                            id="comentario"
                            v-model.trim="formulario.comentario"
                            rows="4"
                            maxlength="2000"
                            class="w-full border rounded-lg p-3"
                            placeholder="Escribe una valoración..."
                        ></textarea>
                    </div>

                    <div>
                        <label for="archivo" class="block font-semibold mb-2">
                            Archivo corregido (opcional)
                        </label>

                        <input
                            id="archivo"
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.mp3,.mp4"
                            @change="seleccionarArchivo"
                            class="w-full border rounded-lg p-3"
                        />

                        <p class="text-sm text-gray-500 mt-2">
                            Formatos permitidos: JPG, PNG, PDF, DOC, DOCX,
                            MP3 y MP4. Tamaño máximo: 25 MB.
                        </p>

                        <p
                            v-if="archivoSeleccionado"
                            class="text-sm text-gray-600 mt-2"
                        >
                            Archivo seleccionado: {{ archivoSeleccionado.name }}
                        </p>
                    </div>

                    <div
                        v-if="estado"
                        role="status"
                        aria-live="polite"
                        class="rounded-lg p-4"
                        :class="
                            error
                                ? 'bg-red-50 text-red-800'
                                : 'bg-blue-50 text-blue-800'
                        "
                    >
                        {{ estado }}
                    </div>

                    <div
                        v-if="resultadoGuardado"
                        class="rounded-xl border p-5 space-y-3"
                        :class="claseNota(resultadoGuardado.notaPonderada)"
                    >
                        <h2 class="font-bold text-lg">
                            Resultado ponderado
                        </h2>

                        <p>
                            Media de las demás evaluaciones:
                            <strong>
                                {{ mostrarNota(resultadoGuardado.mediaActividades) }}
                            </strong>
                        </p>

                        <p>
                            Nota del examen final:
                            <strong>
                                {{ mostrarNota(resultadoGuardado.notaExamenFinal) }}
                            </strong>
                        </p>

                        <p class="text-xl font-bold">
                            Nota final:
                            {{ mostrarNota(resultadoGuardado.notaPonderada) }}
                            / 10
                        </p>

                        <p class="text-sm">
                            {{ descripcionNota(resultadoGuardado.notaPonderada) }}
                        </p>
                    </div>

                    <button
                        type="submit"
                        :disabled="guardando || cargandoGrupos || cargandoAlumnos"
                        class="bg-blue-600 hover:bg-blue-700 disabled:opacity-60
                               text-white font-bold rounded-lg px-5 py-3"
                    >
                        {{ guardando ? 'Guardando...' : 'Guardar resultado' }}
                    </button>
                </form>
            </section>
        </main>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import NavbarJoanmiro from '../../../components/joanmiro/NavbarJoanmiro.vue'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5555')
    .replace(/\/+$/, '')

const grupos = ref([])
const alumnos = ref([])

const guardando = ref(false)
const cargandoGrupos = ref(false)
const cargandoAlumnos = ref(false)
const error = ref(false)
const estado = ref('')

const archivoSeleccionado = ref(null)
const resultadoGuardado = ref(null)

const formulario = reactive({
    grupo_id: '',
    alumno_id: '',
    tipo: 'TAREA',
    titulo: '',
    nota: '',
    comentario: '',
    decision_apto: ''
})

function seleccionarArchivo(evento) {
    archivoSeleccionado.value = evento.target.files?.[0] || null
}

async function respuestaApi(respuesta) {
    const datos = await respuesta.json().catch(() => ({}))

    if (!respuesta.ok || datos.ok === false) {
        throw new Error(
            datos.mensaje || `Error del servidor (${respuesta.status}).`
        )
    }

    return datos
}

async function cargarGrupos() {
    cargandoGrupos.value = true
    error.value = false
    estado.value = ''

    try {
        const respuesta = await fetch(
            `${API_URL}/api/resultados/profesor/grupos`,
            { credentials: 'include' }
        )

        const datos = await respuestaApi(respuesta)
        grupos.value = datos.datos || []

        if (grupos.value.length === 0) {
            estado.value = 'No tienes grupos activos asignados.'
        }
    } catch (err) {
        error.value = true
        estado.value = err.message ||
            'No se pudieron cargar los grupos. Comprueba tu sesión.'
    } finally {
        cargandoGrupos.value = false
    }
}

async function cargarAlumnos(grupoId) {
    alumnos.value = []
    formulario.alumno_id = ''
    resultadoGuardado.value = null

    if (!grupoId) return

    cargandoAlumnos.value = true
    error.value = false
    estado.value = ''

    try {
        const respuesta = await fetch(
            `${API_URL}/api/resultados/profesor/grupos/${encodeURIComponent(grupoId)}/alumnos`,
            { credentials: 'include' }
        )

        const datos = await respuestaApi(respuesta)
        alumnos.value = datos.datos || []

        if (alumnos.value.length === 0) {
            estado.value = 'Este grupo no tiene alumnos activos matriculados.'
        }
    } catch (err) {
        error.value = true
        estado.value = err.message ||
            'No se pudieron cargar los alumnos del grupo.'
    } finally {
        cargandoAlumnos.value = false
    }
}

watch(
    () => formulario.grupo_id,
    (grupoId) => cargarAlumnos(grupoId)
)

async function guardarResultado() {
    estado.value = ''
    error.value = false
    resultadoGuardado.value = null

    if (
        !formulario.grupo_id ||
        !formulario.alumno_id ||
        !formulario.titulo.trim()
    ) {
        error.value = true
        estado.value = 'Selecciona un grupo, un alumno y escribe el título.'
        return
    }

    if (
        formulario.nota === '' ||
        !Number.isFinite(Number(formulario.nota)) ||
        Number(formulario.nota) < 0 ||
        Number(formulario.nota) > 10
    ) {
        error.value = true
        estado.value = 'Introduce una nota válida entre 0 y 10.'
        return
    }

    if (
        archivoSeleccionado.value &&
        archivoSeleccionado.value.size > 25 * 1024 * 1024
    ) {
        error.value = true
        estado.value = 'El archivo no puede superar los 25 MB.'
        return
    }

    if (
        formulario.tipo === 'FINAL' &&
        Number(formulario.nota) >= 5 &&
        Number(formulario.nota) < 6 &&
        !['APTO', 'NO_APTO'].includes(formulario.decision_apto)
    ) {
        error.value = true
        estado.value =
            'Para una nota final entre 5 y menos de 6, selecciona APTO o NO APTO.'
        return
    }

    guardando.value = true

    try {
        const datosFormulario = new FormData()

        datosFormulario.append('grupo_id', formulario.grupo_id)
        datosFormulario.append('alumno_id', formulario.alumno_id)
        datosFormulario.append('tipo', formulario.tipo)
        datosFormulario.append('titulo', formulario.titulo.trim())
        datosFormulario.append('nota', String(formulario.nota))
        datosFormulario.append('decision_apto', formulario.decision_apto)
        datosFormulario.append('comentario', formulario.comentario.trim())

        if (archivoSeleccionado.value) {
            datosFormulario.append(
                'archivo_corregido',
                archivoSeleccionado.value
            )
        }

        const respuesta = await fetch(
            `${API_URL}/api/resultados/profesor`,
            {
                method: 'POST',
                credentials: 'include',
                body: datosFormulario
            }
        )

        const datos = await respuestaApi(respuesta)

        resultadoGuardado.value = {
            mediaActividades: datos.mediaActividades ?? null,
            notaExamenFinal: datos.notaExamenFinal ?? null,
            notaPonderada: datos.notaPonderada ?? null
        }

        estado.value = datos.mensaje || 'Resultado guardado correctamente.'

        formulario.titulo = ''
        formulario.nota = ''
        formulario.comentario = ''
        formulario.decision_apto = ''
        archivoSeleccionado.value = null

        const entradaArchivo = document.getElementById('archivo')
        if (entradaArchivo) entradaArchivo.value = ''
    } catch (err) {
        error.value = true
        estado.value = err.message ||
            'No se ha podido guardar el resultado. Comprueba tu sesión y la conexión con el servidor.'
    } finally {
        guardando.value = false
    }
}

function mostrarNota(nota) {
    if (nota === null || nota === undefined || nota === '') {
        return 'Pendiente'
    }

    return Number(nota).toFixed(2)
}

function claseNota(nota) {
    if (nota === null || nota === undefined) {
        return 'bg-gray-50 border-gray-200'
    }

    const valor = Number(nota)

    if (valor < 5) return 'bg-red-50 border-red-200 text-red-900'
    if (valor < 6) return 'bg-yellow-50 border-yellow-300 text-yellow-900'

    return 'bg-green-50 border-green-200 text-green-900'
}

function descripcionNota(nota) {
    if (nota === null || nota === undefined) {
        return 'La nota ponderada estará disponible cuando existan notas de las demás evaluaciones y del examen final.'
    }

    const valor = Number(nota)

    if (valor < 5) return 'Nota inferior a 5.'
    if (valor < 6) {
        return 'La nota está entre 5 y menos de 6. El profesor debe decidir si el alumno es APTO o NO APTO.'
    }

    return 'Nota de 6 o superior.'
}

onMounted(cargarGrupos)
</script>
