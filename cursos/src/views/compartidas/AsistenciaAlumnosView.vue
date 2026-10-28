
<template>
  <main
  class="min-h-screen bg-amber-800 px-4 py-8 sm:px-6"
  style="
    background-image: url('/fotos/EXAEQUO/presencia.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  "
>
  <section class="mx-auto max-w-6xl space-y-6">
    <!-- CABECERA -->
    <header class="rounded-2xl bg-gray-50 p-6 shadow-sm">
      <p class="text-sm font-semibold uppercase tracking-wide text-indigo-700">
        Espacio de tutores
      </p>

        <h1 class="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          Asistencia del alumnado
        </h1>

        <p class="mt-2 text-gray-600">
          Consulta los grupos asignados y registra la asistencia de cada clase.
        </p>
      </header>

      <!-- MENSAJES -->
      <div
        v-if="mensaje"
        role="status"
        class="rounded-xl border border-green-200 bg-green-50 p-4 text-green-800"
      >
        {{ mensaje }}
      </div>

      <div
        v-if="error"
        role="alert"
        class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"
      >
        {{ error }}
      </div>

      <!-- SELECCIÓN DEL GRUPO Y LA FECHA -->
      <section class="rounded-2xl bg-white p-6 shadow-sm">
        <h2 class="text-lg font-bold text-gray-900">
          Seleccionar clase
        </h2>

        <div class="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              for="grupo"
              class="mb-2 block text-sm font-semibold text-gray-700"
            >
              Grupo asignado
            </label>

            <select
              id="grupo"
              v-model="grupoId"
              :disabled="cargandoGrupos || grupos.length === 0"
              class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:bg-gray-100"
            >
              <option value="">
                Selecciona un grupo
              </option>

              <option
                v-for="grupo in grupos"
                :key="grupo.grupo_id"
                :value="String(grupo.grupo_id)"
              >
                {{ grupo.nombre_escuela }} · {{ grupo.nombre_grupo }}
              </option>
            </select>

            <p
              v-if="!cargandoGrupos && grupos.length === 0"
              class="mt-2 text-sm text-gray-500"
            >
              No tienes grupos asignados o activos.
            </p>
          </div>

          <div>
            <label
              for="fecha"
              class="mb-2 block text-sm font-semibold text-gray-700"
            >
              Fecha de la clase
            </label>

            <input
              id="fecha"
              v-model="fecha"
              type="date"
              class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>

        <div
          v-if="grupoSeleccionado"
          class="mt-5 rounded-xl bg-indigo-50 p-4 text-sm text-indigo-950"
        >
          <p>
            <strong>Escuela:</strong>
            {{ grupoSeleccionado.nombre_escuela }}
          </p>
          <p class="mt-1">
            <strong>Grupo:</strong>
            {{ grupoSeleccionado.nombre_grupo }}
          </p>
          <p class="mt-1">
            <strong>Alumnos activos:</strong>
            {{ alumnos.length }}
          </p>
        </div>

        <p
          v-if="cargandoAsistencia"
          class="mt-4 text-sm text-gray-500"
        >
          Cargando los datos de la clase...
        </p>
      </section>

      <!-- REGISTRO DE ASISTENCIA -->
      <section
        v-if="grupoId && !cargandoAsistencia"
        class="rounded-2xl bg-white p-6 shadow-sm"
      >
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-lg font-bold text-gray-900">
              Registro de asistencia
            </h2>
            <p class="mt-1 text-sm text-gray-600">
              Introduce el horario real de la sesión antes de guardar.
            </p>
          </div>

          <span
            v-if="sesion"
            class="inline-flex w-fit rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800"
          >
            Sesión registrada
          </span>

          <span
            v-else
            class="inline-flex w-fit rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800"
          >
            Sesión sin registrar
          </span>
        </div>

        <div class="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              for="horaInicio"
              class="mb-2 block text-sm font-semibold text-gray-700"
            >
              Hora de inicio
            </label>

            <input
              id="horaInicio"
              v-model="horaInicio"
              type="time"
              class="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label
              for="horaFin"
              class="mb-2 block text-sm font-semibold text-gray-700"
            >
              Hora de finalización
            </label>

            <input
              id="horaFin"
              v-model="horaFin"
              type="time"
              class="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>

        <p
          v-if="duracionMinutos > 0"
          class="mt-3 text-sm text-gray-600"
        >
          Duración de la sesión:
          <strong>{{ duracionMinutos }} minutos</strong>
        </p>

        <div
          v-if="alumnos.length === 0"
          class="mt-6 rounded-xl border border-gray-200 p-5 text-gray-600"
        >
          Este grupo no tiene alumnos matriculados activamente.
        </div>

        <div
          v-else
          class="mt-6 overflow-x-auto"
        >
          <table class="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr class="border-b border-gray-200 bg-gray-50">
                <th class="px-4 py-3 text-sm font-semibold text-gray-700">
                  Alumno/a
                </th>
                <th class="px-4 py-3 text-sm font-semibold text-gray-700">
                  Asistencia
                </th>
                <th class="px-4 py-3 text-sm font-semibold text-gray-700">
                  Minutos asistidos
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="alumno in alumnos"
                :key="alumno.alumno_id"
                class="border-b border-gray-100 last:border-0"
              >
                <td class="px-4 py-4">
                  <p class="font-medium text-gray-900">
                    {{ alumno.nombre }} {{ alumno.apellidos }}
                  </p>
                </td>

                <td class="px-4 py-4">
                  <select
                    v-model="alumno.estado_asistencia"
                    class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-indigo-500 focus:outline-none"
                    @change="cambiarEstado(alumno)"
                  >
                    <option :value="null" disabled>
                      Selecciona
                    </option>
                    <option value="PRESENTE">
                      Presente
                    </option>
                    <option value="AUSENTE">
                      Ausente
                    </option>
                    <option value="PARCIAL">
                      Parcial
                    </option>
                  </select>
                </td>

                <td class="px-4 py-4">
                  <div class="flex items-center gap-2">
                    <input
                      v-model.number="alumno.minutos_asistidos"
                      type="number"
                      min="0"
                      :max="duracionMinutos || undefined"
                      :disabled="
                        alumno.estado_asistencia !== 'PARCIAL' ||
                        duracionMinutos <= 0
                      "
                      class="w-28 rounded-lg border border-gray-300 px-3 py-2 disabled:bg-gray-100 disabled:text-gray-500"
                    />
                    <span class="text-sm text-gray-500">min</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            :disabled="guardando || cargandoAsistencia || !grupoId"
            class="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            @click="cargarAsistencia"
          >
            Recargar datos
          </button>

          <button
            type="button"
            :disabled="guardando || cargandoAsistencia || alumnos.length === 0"
            class="rounded-xl bg-indigo-700 px-5 py-3 font-semibold text-white hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50"
            @click="guardarAsistencia"
          >
            {{ guardando ? 'Guardando...' : 'Guardar asistencia' }}
          </button>
        </div>

        <p class="mt-4 text-sm text-gray-500">
          Presente: se asignan todos los minutos de la sesión. Ausente: 0 minutos.
          Parcial: debes indicar los minutos realmente asistidos.
        </p>
      </section>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'

const API_BASE = 'http://localhost:5555/api/asistencia'

const grupos = ref([])
const grupoId = ref('')
const fecha = ref(fechaLocalActual())

const alumnos = ref([])
const sesion = ref(null)

const horaInicio = ref('')
const horaFin = ref('')

const cargandoGrupos = ref(false)
const cargandoAsistencia = ref(false)
const guardando = ref(false)

const mensaje = ref('')
const error = ref('')

let peticionActual = 0

function fechaLocalActual() {
  const ahora = new Date()
  const anio = ahora.getFullYear()
  const mes = String(ahora.getMonth() + 1).padStart(2, '0')
  const dia = String(ahora.getDate()).padStart(2, '0')

  return `${anio}-${mes}-${dia}`
}

const grupoSeleccionado = computed(() =>
  grupos.value.find(grupo => String(grupo.grupo_id) === String(grupoId.value))
)

const duracionMinutos = computed(() => {
  if (!horaInicio.value || !horaFin.value) return 0

  const [horaI, minutoI] = horaInicio.value.split(':').map(Number)
  const [horaF, minutoF] = horaFin.value.split(':').map(Number)

  const inicio = horaI * 60 + minutoI
  const fin = horaF * 60 + minutoF

  if (fin <= inicio) return 0

  return fin - inicio
})

async function leerRespuesta(respuesta) {
  let datos

  try {
    datos = await respuesta.json()
  } catch {
    throw new Error('El servidor ha devuelto una respuesta no válida.')
  }

  if (!respuesta.ok || datos.ok === false) {
    throw new Error(
      datos.mensaje || `Error del servidor (${respuesta.status}).`
    )
  }

  return datos
}

async function cargarGrupos() {
  cargandoGrupos.value = true
  error.value = ''

  try {
    const respuesta = await fetch(`${API_BASE}/mis-grupos`, {
      method: 'GET',
      credentials: 'include'
    })

    const resultado = await leerRespuesta(respuesta)

    grupos.value = resultado.datos || []

    if (grupos.value.length > 0 && !grupoId.value) {
      grupoId.value = String(grupos.value[0].grupo_id)
    }
  } catch (err) {
    error.value = err.message || 'No se pudieron cargar los grupos.'
  } finally {
    cargandoGrupos.value = false
  }
}

async function cargarAsistencia() {
  if (!grupoId.value || !fecha.value) {
    alumnos.value = []
    sesion.value = null
    return
  }

  const numeroPeticion = ++peticionActual

  cargandoAsistencia.value = true
  error.value = ''
  mensaje.value = ''

  try {
    const url =
      `${API_BASE}/grupos/${encodeURIComponent(grupoId.value)}` +
      `/fecha/${encodeURIComponent(fecha.value)}`

    const respuesta = await fetch(url, {
      method: 'GET',
      credentials: 'include'
    })

    const resultado = await leerRespuesta(respuesta)

    // Ignora respuestas antiguas si el usuario ha cambiado de grupo o fecha.
    if (numeroPeticion !== peticionActual) return

    sesion.value = resultado.sesion || null

    horaInicio.value = resultado.sesion?.hora_inicio
      ? String(resultado.sesion.hora_inicio).slice(0, 5)
      : ''

    horaFin.value = resultado.sesion?.hora_fin
      ? String(resultado.sesion.hora_fin).slice(0, 5)
      : ''

    alumnos.value = (resultado.datos || []).map(alumno => ({
      ...alumno,
      estado_asistencia: alumno.estado_asistencia || null,
      minutos_asistidos: Number(alumno.minutos_asistidos || 0)
    }))
  } catch (err) {
    if (numeroPeticion === peticionActual) {
      error.value = err.message || 'No se pudo cargar la asistencia.'
      alumnos.value = []
      sesion.value = null
    }
  } finally {
    if (numeroPeticion === peticionActual) {
      cargandoAsistencia.value = false
    }
  }
}

function cambiarEstado(alumno) {
  if (alumno.estado_asistencia === 'PRESENTE') {
    alumno.minutos_asistidos = duracionMinutos.value
  } else if (alumno.estado_asistencia === 'AUSENTE') {
    alumno.minutos_asistidos = 0
  } else if (alumno.estado_asistencia === 'PARCIAL') {
    if (
      !alumno.minutos_asistidos ||
      alumno.minutos_asistidos >= duracionMinutos.value
    ) {
      alumno.minutos_asistidos = duracionMinutos.value > 1
        ? Math.floor(duracionMinutos.value / 2)
        : 0
    }
  }
}

async function guardarAsistencia() {
  error.value = ''
  mensaje.value = ''

  if (!grupoId.value || !fecha.value) {
    error.value = 'Selecciona un grupo y una fecha.'
    return
  }

  if (!horaInicio.value || !horaFin.value || duracionMinutos.value <= 0) {
    error.value = 'Introduce una hora de inicio y otra de finalización válidas.'
    return
  }

  if (alumnos.value.some(alumno => !alumno.estado_asistencia)) {
    error.value = 'Selecciona el estado de asistencia de todos los alumnos.'
    return
  }

  for (const alumno of alumnos.value) {
    const minutos = Number(alumno.minutos_asistidos)

    if (
      alumno.estado_asistencia === 'PRESENTE' &&
      minutos !== duracionMinutos.value
    ) {
      error.value =
        `La asistencia de ${alumno.nombre} ${alumno.apellidos} debe equivaler a ` +
        `${duracionMinutos.value} minutos.`
      return
    }

    if (alumno.estado_asistencia === 'AUSENTE' && minutos !== 0) {
      error.value =
        `La asistencia de ${alumno.nombre} ${alumno.apellidos} debe tener 0 minutos si está ausente.`
      return
    }

    if (
      alumno.estado_asistencia === 'PARCIAL' &&
      (
        !Number.isInteger(minutos) ||
        minutos < 1 ||
        minutos >= duracionMinutos.value
      )
    ) {
      error.value =
        `Los minutos parciales de ${alumno.nombre} ${alumno.apellidos} deben ser un número entero entre 1 y ${duracionMinutos.value - 1}.`
      return
    }
  }

  guardando.value = true

  try {
    const url =
      `${API_BASE}/grupos/${encodeURIComponent(grupoId.value)}` +
      `/fecha/${encodeURIComponent(fecha.value)}`

    const respuesta = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        hora_inicio: horaInicio.value,
        hora_fin: horaFin.value,
        registros: alumnos.value.map(alumno => ({
          alumno_id: alumno.alumno_id,
          estado: alumno.estado_asistencia,
          minutos_asistidos: Number(alumno.minutos_asistidos)
        }))
      })
    })

    const resultado = await leerRespuesta(respuesta)

    mensaje.value = resultado.mensaje || 'Asistencia guardada correctamente.'

    // Vuelve a leer la base de datos para mostrar los valores confirmados.
    await cargarAsistencia()
  } catch (err) {
    error.value = err.message || 'No se pudo guardar la asistencia.'
  } finally {
    guardando.value = false
  }
}

watch([grupoId, fecha], () => {
  if (grupoId.value && fecha.value) {
    cargarAsistencia()
  }
})

onMounted(cargarGrupos)
</script>