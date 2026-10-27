
<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
    <div class="mb-6">
      <h3 class="text-2xl font-bold text-slate-900">
        Gestión de horarios
      </h3>
      <p class="mt-2 text-sm text-slate-600">
        Selecciona un grupo para consultar y modificar sus días y horas de clase.
      </p>
    </div>

    <!-- Mensaje de éxito o error -->
    <div
      v-if="mensaje"
      role="status"
      aria-live="polite"
      class="mb-5 rounded-xl border p-4"
      :class="error
        ? 'border-red-200 bg-red-50 text-red-800'
        : 'border-green-200 bg-green-50 text-green-800'"
    >
      {{ mensaje }}
    </div>

    <!-- Selección de grupo -->
    <div class="mb-6">
      <label for="grupo-horario" class="mb-2 block font-semibold">
        Grupo
      </label>

      <select
        id="grupo-horario"
        v-model="grupoSeleccionado"
        @change="cargarHorario"
        :disabled="cargandoGrupos || guardando"
        class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
      >
        <option value="">
          Selecciona un grupo
        </option>

        <option
          v-for="grupo in grupos"
          :key="grupo.id"
          :value="String(grupo.id)"
        >
          {{ etiquetaGrupo(grupo) }}
        </option>
      </select>

      <p v-if="cargandoGrupos" class="mt-2 text-sm text-slate-500">
        Cargando grupos...
      </p>
    </div>

    <div v-if="cargandoHorario" class="py-8 text-center text-slate-500">
      Cargando horario...
    </div>

    <div v-else-if="dias.length" class="space-y-3">
      <!-- Días de la semana -->
      <article
        v-for="dia in dias"
        :key="dia.dia_semana"
        class="rounded-xl border border-slate-200 p-4"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h4 class="font-bold text-slate-800">
            {{ dia.dia_semana }}
          </h4>

          <label class="flex items-center gap-2 text-sm font-medium">
            <input
              v-model="dia.activo"
              type="checkbox"
              :disabled="guardando"
              class="h-4 w-4 rounded"
            />
            Hay clase
          </label>
        </div>

        <div
          v-if="dia.activo"
          class="mt-4 grid gap-4 sm:grid-cols-2"
        >
          <label class="block">
            <span class="mb-1 block text-sm text-slate-600">
              Hora de inicio
            </span>
            <input
              v-model="dia.hora_inicio"
              type="time"
              required
              :disabled="guardando"
              class="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>

          <label class="block">
            <span class="mb-1 block text-sm text-slate-600">
              Hora de fin
            </span>
            <input
              v-model="dia.hora_fin"
              type="time"
              required
              :disabled="guardando"
              class="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
        </div>

        <p v-else class="mt-3 text-sm text-slate-500">
          Día sin clase. El horario de ese día quedará inactivo.
        </p>
      </article>

      <!-- Botones -->
      <div class="flex flex-wrap gap-3 pt-3">
        <button
          type="button"
          @click="cargarHorario"
          :disabled="guardando || cargandoHorario"
          class="rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-50 disabled:opacity-50"
        >
          Descartar cambios
        </button>

        <button
          type="button"
          @click="guardarHorario"
          :disabled="guardando || cargandoHorario || !grupoSeleccionado"
          class="rounded-xl bg-indigo-700 px-5 py-3 font-semibold text-white hover:bg-indigo-800 disabled:opacity-50"
        >
          {{ guardando ? 'Guardando...' : 'Guardar horario' }}
        </button>
      </div>
    </div>

    <p
      v-else-if="grupoSeleccionado && !cargandoHorario"
      class="text-slate-500"
    >
      No hay días que mostrar para este grupo.
    </p>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { peticionAdmin } from '../services/adminApi'

const DIAS = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
]

const grupos = ref([])
const grupoSeleccionado = ref('')
const dias = ref([])
const cargandoGrupos = ref(false)
const cargandoHorario = ref(false)
const guardando = ref(false)
const mensaje = ref('')
const error = ref(false)

function etiquetaGrupo(grupo) {
  return [
    grupo.nombre_escuela,
    grupo.nombre_curso ?? grupo.nombre,
    grupo.turno
  ].filter(Boolean).join(' · ')
}

function prepararDias(datos) {
  return DIAS.map(nombreDia => {
    const encontrado = datos.find(
      dia => dia.dia_semana === nombreDia
    )

    return {
      id: encontrado?.id ?? null,
      grupo_id: Number(grupoSeleccionado.value),
      dia_semana: nombreDia,
      hora_inicio: String(
        encontrado?.hora_inicio ?? '09:00'
      ).slice(0, 5),
      hora_fin: String(
        encontrado?.hora_fin ?? '10:00'
      ).slice(0, 5),
      activo: Boolean(encontrado?.activo),
      configurado: Boolean(encontrado?.configurado)
    }
  })
}

async function cargarGrupos() {
  cargandoGrupos.value = true
  mensaje.value = ''
  error.value = false

  try {
const resultado = await peticionAdmin('/horarios/grupos')
    grupos.value = Array.isArray(resultado)
      ? resultado
      : Array.isArray(resultado?.datos)
        ? resultado.datos
        : []

    if (!grupos.value.length) {
      mensaje.value = 'No se han encontrado grupos disponibles.'
    }
  } catch (e) {
    error.value = true
    mensaje.value = e.message || 'No se pudieron cargar los grupos.'
  } finally {
    cargandoGrupos.value = false
  }
}

async function cargarHorario() {
  dias.value = []
  mensaje.value = ''
  error.value = false

  if (!grupoSeleccionado.value) return

  cargandoHorario.value = true

  try {
    const resultado = await peticionAdmin(
  `/horarios/?grupo_id=${encodeURIComponent(grupoSeleccionado.value)}`
)

    const lista = Array.isArray(resultado)
      ? resultado
      : Array.isArray(resultado?.datos)
        ? resultado.datos
        : null

    if (!lista) {
      throw new Error(
        'La API no devolvió una lista de horarios válida.'
      )
    }

    dias.value = prepararDias(lista)
  } catch (e) {
    error.value = true
    mensaje.value = e.message || 'No se pudo cargar el horario.'
  } finally {
    cargandoHorario.value = false
  }
}

async function guardarHorario() {
  if (!grupoSeleccionado.value || guardando.value) return

  // Validar las horas antes de enviar los datos.
  for (const dia of dias.value) {
    if (!dia.activo) continue

    if (!dia.hora_inicio || !dia.hora_fin) {
      error.value = true
      mensaje.value =
        `Indica las horas de inicio y fin del ${dia.dia_semana}.`
      return
    }

    if (dia.hora_inicio >= dia.hora_fin) {
      error.value = true
      mensaje.value =
        `La hora de fin debe ser posterior a la de inicio (${dia.dia_semana}).`
      return
    }
  }

  mensaje.value = ''
  error.value = false
  guardando.value = true

  try {
    const resultado = await peticionAdmin('/horarios/', {
  method: 'PUT',
  body: JSON.stringify({
    grupo_id: Number(grupoSeleccionado.value),
    horarios: dias.value.map(dia => ({
      dia_semana: dia.dia_semana,
      hora_inicio: dia.hora_inicio,
      hora_fin: dia.hora_fin,
      activo: dia.activo
    }))
  })
})

    // Volver a leer los datos guardados en el servidor.
    await cargarHorario()

    // Mostrar éxito solo si también se ha podido recargar.
    if (!error.value) {
      mensaje.value =
        resultado?.mensaje || '¡Horario guardado correctamente!'
      error.value = false
    }
  } catch (e) {
    error.value = true
    mensaje.value = e.message || 'No se pudo guardar el horario.'
  } finally {
    guardando.value = false
  }
}

onMounted(cargarGrupos)
</script>
