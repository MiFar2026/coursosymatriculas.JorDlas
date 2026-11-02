
<template>
  <section class="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-xl font-bold mb-2">
          📢 Avisos de {{ nombreEscuela }}
        </h2>

        <p class="text-gray-700">
          Los avisos se publican para todo el grupo.
          Expirarán automáticamente a las 72 horas.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          @click="alternarAvisosAdmin"
          class="bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-lg px-5 py-3"
        >
          {{ mostrarAvisosAdmin ? 'Cerrar avisos' : 'Avisos de administración' }}
        </button>

        <button
          type="button"
          @click="mostrarFormulario = !mostrarFormulario"
          class="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg px-5 py-3"
        >
          {{ mostrarFormulario ? 'Cerrar formulario' : 'Crear aviso' }}
        </button>
      </div>
    </div>

    <!-- AVISOS PUBLICADOS POR ADMINISTRACIÓN -->
    <div
      v-if="mostrarAvisosAdmin"
      class="mt-6 bg-white rounded-xl border border-indigo-200 p-5"
    >
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 class="text-lg font-bold text-indigo-900">
          Avisos de administración
        </h3>

        <button
          type="button"
          @click="cargarAvisosAdmin"
          :disabled="cargandoAvisosAdmin"
          class="text-sm font-semibold text-indigo-700 hover:text-indigo-900 disabled:text-gray-400"
        >
          {{ cargandoAvisosAdmin ? 'Actualizando...' : 'Actualizar avisos' }}
        </button>
      </div>

      <p
        v-if="cargandoAvisosAdmin"
        class="text-gray-500 text-sm"
      >
        Cargando avisos...
      </p>

      <p
        v-else-if="errorAvisosAdmin"
        class="rounded-lg bg-red-50 text-red-800 p-3 text-sm"
        role="alert"
      >
        {{ errorAvisosAdmin }}
      </p>

      <p
        v-else-if="avisosAdmin.length === 0"
        class="rounded-lg bg-gray-50 text-gray-600 p-4 text-sm"
      >
        No hay avisos administrativos activos para tu escuela.
      </p>

      <div v-else class="space-y-4">
        <article
          v-for="item in avisosAdmin"
          :key="item.id"
          class="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4"
        >
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h4 class="font-bold text-gray-900">
              {{ item.titulo }}
            </h4>

            <span class="text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800 px-3 py-1">
              {{ item.grupo || 'Aviso de administración' }}
            </span>
          </div>

          <p class="text-gray-700 whitespace-pre-line">
            {{ item.mensaje }}
          </p>

          <p
            v-if="item.fecha_publicacion"
            class="mt-3 text-xs text-gray-500"
          >
            Publicado:
            {{ formatearFecha(item.fecha_publicacion) }}
          </p>

          <p
            v-if="item.fecha_expiracion"
            class="mt-1 text-xs text-gray-500"
          >
            Caduca:
            {{ formatearFecha(item.fecha_expiracion) }}
          </p>

          <p
            v-else
            class="mt-1 text-xs font-semibold text-green-700"
          >
            Aviso permanente
          </p>
        </article>
      </div>
    </div>

    <!-- FORMULARIO EXISTENTE DEL PROFESOR -->
    <form
      v-if="mostrarFormulario"
      @submit.prevent="publicarAviso"
      class="mt-6 bg-white rounded-xl border border-amber-200 p-5 space-y-5"
    >
      <div>
        <label for="grupo-aviso-tutor" class="block font-semibold mb-2">
          Grupo destinatario
        </label>

        <select
          id="grupo-aviso-tutor"
          v-model="aviso.grupoId"
          required
          :disabled="cargandoGrupos || publicando || grupos.length === 0"
          class="w-full border rounded-lg p-3 bg-white disabled:bg-gray-100"
        >
          <option value="" disabled>Selecciona un grupo</option>

          <option
            v-for="grupo in grupos"
            :key="grupo.id"
            :value="String(grupo.id)"
          >
            {{ grupo.nombre }}
          </option>
        </select>

        <p v-if="cargandoGrupos" class="mt-2 text-sm text-gray-500">
          Cargando tus grupos...
        </p>

        <p
          v-else-if="grupos.length === 0"
          class="mt-2 text-sm text-amber-800"
        >
          No se han encontrado grupos asignados a tu cuenta.
        </p>
      </div>

      <div>
        <label for="titulo-aviso-tutor" class="block font-semibold mb-2">
          Título del aviso
        </label>

        <input
          id="titulo-aviso-tutor"
          v-model.trim="aviso.titulo"
          type="text"
          required
          maxlength="200"
          class="w-full border rounded-lg p-3"
          placeholder="Ej.: Cambio de horario"
          :disabled="publicando"
        />
      </div>

      <div>
        <label for="mensaje-aviso-tutor" class="block font-semibold mb-2">
          Contenido
        </label>

        <textarea
          id="mensaje-aviso-tutor"
          v-model.trim="aviso.mensaje"
          required
          maxlength="5000"
          rows="4"
          class="w-full border rounded-lg p-3"
          placeholder="Escribe el aviso..."
          :disabled="publicando"
        ></textarea>

        <p class="mt-1 text-xs text-gray-500 text-right">
          {{ aviso.mensaje.length }}/5000 caracteres
        </p>
      </div>

      <button
        type="submit"
        :disabled="
          publicando ||
          cargandoGrupos ||
          !aviso.grupoId ||
          grupos.length === 0 ||
          !aviso.titulo.trim() ||
          !aviso.mensaje.trim()
        "
        class="bg-teal-700 hover:bg-teal-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-lg px-5 py-3"
      >
        {{ publicando ? 'Publicando...' : 'Publicar aviso' }}
      </button>

      <p class="text-sm text-gray-500">
        El servidor configura automáticamente la caducidad a las 72 horas.
      </p>
    </form>

    <p
      v-if="mensaje"
      role="status"
      aria-live="polite"
      class="mt-4 rounded-lg p-3 text-sm font-semibold"
      :class="error
        ? 'bg-red-100 text-red-800'
        : 'bg-green-100 text-green-800'"
    >
      {{ mensaje }}
    </p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  nombreEscuela: {
    type: String,
    required: true
  },
  rutaAcceso: {
    type: String,
    required: true
  }
})

const router = useRouter()

// Dirección del backend
const baseAPI = (
  import.meta.env.VITE_API_URL || 'http://localhost:5555'
).replace(/\/+$/, '')

// Estado del formulario
const mostrarFormulario = ref(false)

// Grupos del profesor autenticado
const grupos = ref([])
const cargandoGrupos = ref(false)

// Estado de publicación
const publicando = ref(false)

// Avisos administrativos
const mostrarAvisosAdmin = ref(false)
const avisosAdmin = ref([])
const cargandoAvisosAdmin = ref(false)
const errorAvisosAdmin = ref('')

// Mensajes del formulario
const mensaje = ref('')
const error = ref(false)

// Datos del aviso
const aviso = ref({
  grupoId: '',
  titulo: '',
  mensaje: ''
})

// Mostrar error
function mostrarError(texto) {
  error.value = true
  mensaje.value = texto
}

// Mostrar éxito
function mostrarExito(texto) {
  error.value = false
  mensaje.value = texto
}

// Leer respuesta del servidor
async function leerRespuesta(respuesta) {
  const resultado = await respuesta.json().catch(() => ({}))

  if (respuesta.status === 401 || respuesta.status === 403) {
    await router.replace(props.rutaAcceso)
    throw new Error('La sesión del profesor ha caducado.')
  }

  if (!respuesta.ok || resultado.ok === false) {
    throw new Error(
      resultado.mensaje || 'No se ha podido completar la operación.'
    )
  }

  return resultado
}

// Cargar grupos del profesor
async function cargarGrupos() {
  cargandoGrupos.value = true
  grupos.value = []

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
    }
  } catch (e) {
    mostrarError(e.message || 'No se han podido cargar tus grupos.')
  } finally {
    cargandoGrupos.value = false
  }
}

// Mostrar u ocultar los avisos administrativos
async function alternarAvisosAdmin() {
  mostrarAvisosAdmin.value = !mostrarAvisosAdmin.value

  if (mostrarAvisosAdmin.value) {
    await cargarAvisosAdmin()
  }
}

// Consultar avisos publicados por administración
async function cargarAvisosAdmin() {
  cargandoAvisosAdmin.value = true
  errorAvisosAdmin.value = ''

  try {
    const respuesta = await fetch(
      `${baseAPI}/api/avisos/admin/mis-avisos`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json'
        }
      }
    )

    const resultado = await leerRespuesta(respuesta)

    avisosAdmin.value = Array.isArray(resultado.avisos)
      ? resultado.avisos
      : []
  } catch (e) {
    errorAvisosAdmin.value =
      e.message || 'No se han podido cargar los avisos administrativos.'
  } finally {
    cargandoAvisosAdmin.value = false
  }
}

// Formatear fecha
function formatearFecha(fecha) {
  const valor = new Date(fecha)

  if (Number.isNaN(valor.getTime())) {
    return fecha
  }

  return valor.toLocaleString('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}

// Publicar aviso (función existente)
async function publicarAviso() {
  mensaje.value = ''
  error.value = false

  if (!aviso.value.grupoId) {
    mostrarError('Selecciona un grupo antes de publicar el aviso.')
    return
  }

  if (!aviso.value.titulo.trim() || !aviso.value.mensaje.trim()) {
    mostrarError('Escribe un título y el contenido del aviso.')
    return
  }

  if (
    aviso.value.titulo.length > 200 ||
    aviso.value.mensaje.length > 5000
  ) {
    mostrarError('El título o el contenido superan el límite permitido.')
    return
  }

  publicando.value = true

  try {
    const respuesta = await fetch(
      `${baseAPI}/api/avisos`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          grupoId: Number(aviso.value.grupoId),
          titulo: aviso.value.titulo.trim(),
          mensaje: aviso.value.mensaje.trim()
        })
      }
    )

    const resultado = await leerRespuesta(respuesta)

    mostrarExito(
      resultado.mensaje ||
      'El aviso se ha publicado correctamente.'
    )

    aviso.value.titulo = ''
    aviso.value.mensaje = ''

  } catch (e) {
    mostrarError(e.message || 'No se ha podido publicar el aviso.')
  } finally {
    publicando.value = false
  }
}

// Cargar los grupos al entrar en el perfil
onMounted(cargarGrupos)
</script>
