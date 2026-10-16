
<template>
  <section class="mt-8 space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h3 class="text-2xl font-bold text-gray-900">
          Gestión de voluntariado
        </h3>
        <p class="mt-1 text-sm text-gray-600">
          Consulta y gestiona las solicitudes recibidas por EXAEQUO.
        </p>
      </div>

      <button
        type="button"
        @click="cargarVoluntarios"
        :disabled="cargando"
        class="rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
      >
        {{ cargando ? 'Actualizando...' : 'Actualizar solicitudes' }}
      </button>
    </div>

    <p
      v-if="mensaje"
      role="status"
      aria-live="polite"
      class="rounded-lg border bg-gray-50 p-4 text-sm text-gray-700"
    >
      {{ mensaje }}
    </p>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div class="rounded-xl border p-4">
        <p class="text-sm text-gray-500">Total de solicitudes</p>
        <p class="mt-1 text-2xl font-bold">
          {{ voluntarios.length }}
        </p>
      </div>

      <div class="rounded-xl border p-4">
        <p class="text-sm text-gray-500">Pendientes</p>
        <p class="mt-1 text-2xl font-bold">
          {{ contarEstado('pendiente') }}
        </p>
      </div>

      <div class="rounded-xl border p-4">
        <p class="text-sm text-gray-500">Aceptadas</p>
        <p class="mt-1 text-2xl font-bold">
          {{ contarEstado('aceptada') }}
        </p>
      </div>
    </div>

    <div
      v-if="!cargando && voluntarios.length === 0 && !mensaje"
      class="rounded-xl border border-dashed p-8 text-center text-gray-500"
    >
      Todavía no hay solicitudes de voluntariado.
    </div>

    <div v-if="voluntarios.length" class="space-y-4">
      <article
        v-for="item in voluntarios"
        :key="item.id"
        class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <div class="flex flex-col justify-between gap-3 sm:flex-row">
          <div>
            <h4 class="text-lg font-bold text-gray-900">
              {{ item.nombre }} {{ item.apellidos }}
            </h4>

            <p class="mt-1 text-sm text-gray-500">
              Solicitud #{{ item.id }}
              · {{ formatearFecha(item.fecha_solicitud) }}
            </p>
          </div>

          <span
            class="h-fit rounded-full px-3 py-1 text-sm font-semibold"
            :class="claseEstado(item.estado)"
          >
            {{ etiquetaEstado(item.estado) }}
          </span>
        </div>

        <div class="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <p>
            <strong>Email:</strong>
            <a
              :href="'mailto:' + item.email"
              class="break-all text-blue-700 underline"
            >
              {{ item.email }}
            </a>
          </p>

          <p>
            <strong>Teléfono:</strong>
            {{ item.telefono }}
          </p>

          <p>
            <strong>Año de nacimiento:</strong>
            {{ item.anyo_nacimiento }}
          </p>

          <p>
            <strong>Residencia:</strong>
            {{ item.lugar_residencia }}
          </p>

          <p>
            <strong>Documento de identidad:</strong>
            {{ item.documento_identidad }}
          </p>

          <p>
            <strong>Tarea solicitada:</strong>
            {{ etiquetaTarea(item.tarea) }}
          </p>
        </div>

        <div class="mt-4 rounded-lg bg-gray-50 p-4">
          <p class="text-sm font-semibold text-gray-800">
            Mensaje de la solicitud
          </p>

          <p class="mt-2 whitespace-pre-wrap break-words text-sm text-gray-700">{{ item.mensaje }}</p>
        </div>

        <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label
            :for="'estado-' + item.id"
            class="text-sm font-medium"
          >
            Estado de la solicitud
          </label>

          <select
            :id="'estado-' + item.id"
            :value="item.estado"
            :disabled="procesandoId === item.id"
            @change="actualizarEstado(item, $event.target.value)"
            class="rounded-lg border border-gray-300 px-3 py-2 disabled:opacity-50"
          >
            <option value="pendiente">Pendiente</option>
            <option value="aceptada">Aceptada</option>
            <option value="no_aceptada">No aceptada</option>
          </select>

          <span
            v-if="procesandoId === item.id"
            class="text-sm text-gray-500"
          >
            Guardando...
          </span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { peticionAdmin } from '../services/adminApi'

const voluntarios = ref([])
const cargando = ref(false)
const procesandoId = ref(null)
const mensaje = ref('')

const estadosPermitidos = [
  'pendiente',
  'aceptada',
  'no_aceptada'
]

async function cargarVoluntarios() {
  cargando.value = true
  mensaje.value = ''

  try {
    const respuesta = await peticionAdmin('/admin/voluntarios')

    voluntarios.value = Array.isArray(respuesta?.datos)
      ? respuesta.datos
      : []

  } catch (error) {
    mensaje.value =
      error.message || 'No se pudieron cargar las solicitudes.'
  } finally {
    cargando.value = false
  }
}

async function actualizarEstado(item, nuevoEstado) {
  if (!estadosPermitidos.includes(nuevoEstado)) {
    mensaje.value = 'El estado seleccionado no es válido.'
    return
  }

  if (nuevoEstado === item.estado) {
    return
  }

  if (procesandoId.value !== null) {
    return
  }

  mensaje.value = ''
  procesandoId.value = item.id

  try {
    const respuesta = await peticionAdmin(
      `/admin/voluntarios/${item.id}/estado`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          estado: nuevoEstado
        })
      }
    )

    // Actualizar la interfaz solo después de una respuesta correcta.
    item.estado = nuevoEstado

    mensaje.value =
      respuesta?.mensaje || 'Estado actualizado correctamente.'

  } catch (error) {
    mensaje.value =
      error.message || 'No se pudo actualizar el estado.'

    // Volver a cargar los datos para reflejar el estado real del servidor.
    await cargarVoluntarios()
  } finally {
    procesandoId.value = null
  }
}

function contarEstado(estado) {
  return voluntarios.value.filter(
    item => item.estado === estado
  ).length
}

function etiquetaEstado(estado) {
  const etiquetas = {
    pendiente: 'Pendiente',
    aceptada: 'Aceptada',
    no_aceptada: 'No aceptada'
  }

  return etiquetas[estado] || estado
}

function claseEstado(estado) {
  const clases = {
    pendiente: 'bg-amber-100 text-amber-800',
    aceptada: 'bg-emerald-100 text-emerald-800',
    no_aceptada: 'bg-red-100 text-red-800'
  }

  return clases[estado] || 'bg-gray-100 text-gray-700'
}

function etiquetaTarea(tarea) {
  const etiquetas = {
    profesor: 'Profesor/a',
    acompanante: 'Acompañante',
    comida: 'Comida',
    mantenimiento: 'Mantenimiento',
    administrativo: 'Administración',
    esponsor_financiero: 'Patrocinio financiero'
  }

  return etiquetas[tarea] || tarea
}

function formatearFecha(valor) {
  if (!valor) {
    return 'Fecha no disponible'
  }

  const fecha = new Date(valor)

  if (Number.isNaN(fecha.getTime())) {
    return String(valor)
  }

  return fecha.toLocaleString('es-ES')
}

onMounted(cargarVoluntarios)
</script>
