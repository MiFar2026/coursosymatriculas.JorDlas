
<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <NavbarAteneu />

    <main class="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <header class="mb-8">
        <p class="text-sm font-bold uppercase tracking-widest text-purple-700 mb-2">
          Escuela Ateneu
        </p>
        <h1 class="text-3xl font-bold mb-3">Foro del alumnado</h1>
        <p class="text-gray-600">
          Comparte dudas, ideas y recursos con tus compañeros y profesores.
        </p>
      </header>

      <section class="bg-white rounded-2xl border shadow-sm p-5 mb-8">
        <label for="grupo" class="block font-semibold mb-2">
          Selecciona tu grupo
        </label>

        <p v-if="cargandoGrupos" class="text-gray-600">
          Cargando grupos...
        </p>

        <p v-else-if="errorGrupos" class="text-red-700" role="alert">
          {{ errorGrupos }}
        </p>

        <template v-else-if="grupos.length">
          <select
            id="grupo"
            v-model="grupoSeleccionadoId"
            @change="cargarMensajes"
            class="w-full border rounded-lg p-3"
          >
            <option value="" disabled>Selecciona un grupo</option>
            <option
              v-for="grupo in grupos"
              :key="grupo.id"
              :value="String(grupo.id)"
            >
              {{ grupo.nombre }}{{ grupo.turno ? ` - ${grupo.turno}` : '' }}
            </option>
          </select>
        </template>

        <p v-else class="text-gray-600">
          No tienes grupos autorizados de Ateneu para mostrar en este foro.
        </p>
      </section>

      <section
        v-if="grupos.length && grupoSeleccionadoId"
        class="bg-white rounded-2xl border shadow-sm p-6 mb-8"
      >
        <h2 class="text-xl font-bold mb-2">Abrir una conversación</h2>
        <p class="text-gray-600 mb-5">
          Publica una consulta con título y categoría. Después podrás recibir
          respuestas de alumnos y profesores autorizados de tu grupo.
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <button
            v-for="categoria in categorias"
            :key="categoria"
            type="button"
            @click="seleccionarCategoria(categoria)"
            class="rounded-lg border p-3 text-sm font-semibold transition"
            :class="categoriaSeleccionada === categoria
              ? 'bg-purple-700 text-white border-purple-700'
              : 'bg-white hover:bg-purple-50'"
          >
            {{ categoria }}
          </button>
        </div>

        <form @submit.prevent="publicarMensaje" class="space-y-4">
          <div>
            <label for="titulo" class="block font-semibold mb-2">Título</label>
            <input
              id="titulo"
              v-model.trim="formulario.titulo"
              type="text"
              maxlength="200"
              required
              class="w-full border rounded-lg p-3"
              placeholder="¿Sobre qué quieres hablar?"
            />
          </div>

          <div>
            <label for="mensaje" class="block font-semibold mb-2">Consulta</label>
            <textarea
              id="mensaje"
              v-model.trim="formulario.mensaje"
              maxlength="5000"
              rows="5"
              required
              class="w-full border rounded-lg p-3"
              placeholder="Escribe tu consulta..."
            ></textarea>
          </div>

          <p v-if="estado" role="status" aria-live="polite"
            class="rounded-lg p-3"
            :class="error ? 'bg-red-50 text-red-800' : 'bg-blue-50 text-blue-800'">
            {{ estado }}
          </p>

          <button
            type="submit"
            :disabled="publicando"
            class="bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white font-bold rounded-lg px-5 py-3"
          >
            {{ publicando ? 'Publicando...' : 'Publicar consulta' }}
          </button>
        </form>
      </section>

      <section class="bg-white rounded-2xl border shadow-sm p-6">
        <h2 class="text-xl font-bold mb-5">Conversaciones del grupo</h2>

        <p v-if="cargandoMensajes" class="text-gray-600">
          Cargando conversaciones...
        </p>

        <p v-else-if="errorMensajes" class="text-red-700" role="alert">
          {{ errorMensajes }}
        </p>

        <p v-else-if="!grupoSeleccionadoId" class="text-gray-600">
          Selecciona un grupo para consultar sus conversaciones.
        </p>

        <p v-else-if="publicaciones.length === 0" class="text-gray-600">
          Todavía no hay consultas en este grupo. ¡Puedes abrir la primera!
        </p>

        <div v-else class="space-y-6">
          <article
            v-for="publicacion in publicaciones"
            :key="publicacion.id"
            class="border rounded-xl p-5"
          >
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="text-xs font-bold uppercase rounded-full bg-purple-100 text-purple-800 px-3 py-1">
                {{ publicacion.categoria }}
              </span>
              <span class="text-sm text-gray-500">
                {{ formatearFecha(publicacion.fechaCreacion) }}
              </span>
            </div>

            <h3 class="text-lg font-bold mb-2">
              {{ publicacion.titulo || 'Consulta' }}
            </h3>

            <p class="text-sm text-gray-600 mb-3">
              Publicado por {{ publicacion.autor || 'Usuario' }}
              <span v-if="publicacion.tipoAutor">
                · {{ publicacion.tipoAutor }}
              </span>
            </p>

            <p class="whitespace-pre-wrap break-words">{{ publicacion.mensaje }}</p>

            <div class="mt-5 ml-2 sm:ml-6 border-l-2 border-purple-100 pl-4 space-y-4">
              <h4 class="font-bold text-sm">
                Respuestas ({{ respuestasDe(publicacion.id).length }})
              </h4>

              <article
                v-for="respuesta in respuestasDe(publicacion.id)"
                :key="respuesta.id"
                class="bg-gray-50 rounded-lg p-4"
              >
                <p class="text-sm text-gray-600 mb-2">
                  {{ respuesta.autor || 'Usuario' }}
                  <span v-if="respuesta.tipoAutor">· {{ respuesta.tipoAutor }}</span>
                  · {{ formatearFecha(respuesta.fechaCreacion) }}
                </p>
                <p class="whitespace-pre-wrap break-words">{{ respuesta.mensaje }}</p>
              </article>

              <form
                @submit.prevent="publicarRespuesta(publicacion)"
                class="space-y-3"
              >
                <label :for="`respuesta-${publicacion.id}`" class="block font-semibold text-sm">
                  Escribe una respuesta
                </label>
                <textarea
                  :id="`respuesta-${publicacion.id}`"
                  v-model.trim="respuestas[publicacion.id]"
                  maxlength="5000"
                  rows="3"
                  required
                  class="w-full border rounded-lg p-3"
                  placeholder="Responde a esta consulta..."
                ></textarea>
                <button
                  type="submit"
                  :disabled="publicandoRespuestaId === publicacion.id"
                  class="border border-purple-700 text-purple-800 hover:bg-purple-50 disabled:opacity-50 rounded-lg px-4 py-2 font-semibold"
                >
                  {{ publicandoRespuestaId === publicacion.id ? 'Enviando...' : 'Responder' }}
                </button>
              </form>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import NavbarAteneu from '../../../components/ateneu/NavbarAteneu.vue'

const API_BASE = (
  import.meta.env.VITE_API_URL || 'http://localhost:5555'
).replace(/\/+$/, '')

const ESCUELA_ID = 2

const categorias = [
  'Castellano A1',
  'Castellano A2',
  'Castellano B1',
  'Catalán A1',
  'Catalán A2',
  'Catalán B1',
  'Alfabetización',
  'General'
]

const grupos = ref([])
const grupoSeleccionadoId = ref('')
const mensajes = ref([])
const categoriaSeleccionada = ref('General')
const formulario = reactive({ titulo: '', mensaje: '' })
const respuestas = reactive({})
const estado = ref('')
const error = ref(false)
const publicando = ref(false)
const publicandoRespuestaId = ref(null)
const cargandoGrupos = ref(false)
const cargandoMensajes = ref(false)
const errorGrupos = ref('')
const errorMensajes = ref('')

const publicaciones = computed(() =>
  mensajes.value.filter(m => m.respuestaAId == null)
)

function respuestasDe(publicacionId) {
  return mensajes.value.filter(
    m => Number(m.respuestaAId) === Number(publicacionId)
  )
}

function seleccionarCategoria(categoria) {
  categoriaSeleccionada.value = categoria
  estado.value = ''
  error.value = false
}

function formatearFecha(fecha) {
  if (!fecha) return 'Fecha no disponible'

  const fechaNormalizada = String(fecha).includes('T')
    ? String(fecha)
    : String(fecha).replace(' ', 'T')

  const date = new Date(fechaNormalizada)

  if (Number.isNaN(date.getTime())) return String(fecha)

  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)
}

async function leerRespuesta(respuesta) {
  let resultado

  try {
    resultado = await respuesta.json()
  } catch {
    throw new Error('El servidor no ha devuelto JSON válido.')
  }

  if (!respuesta.ok || resultado?.ok === false) {
    throw new Error(
      resultado?.mensaje || `Error del servidor (${respuesta.status}).`
    )
  }

  return resultado
}

async function cargarGrupos() {
  cargandoGrupos.value = true
  errorGrupos.value = ''

  try {
    const respuesta = await fetch(`${API_BASE}/api/foro-alumnos/grupos`, {
      credentials: 'include',
      headers: { Accept: 'application/json' }
    })

    const resultado = await leerRespuesta(respuesta)

    grupos.value = (Array.isArray(resultado.grupos) ? resultado.grupos : [])
      .filter(g => Number(g.escuelaId) === ESCUELA_ID)

    if (grupos.value.length) {
      grupoSeleccionadoId.value = String(grupos.value[0].id)
      await cargarMensajes()
    } else {
      grupoSeleccionadoId.value = ''
      mensajes.value = []
    }
  } catch (err) {
    console.error('Error al cargar grupos del foro:', err)
    errorGrupos.value = err.message || 'No se pudieron cargar los grupos.'
  } finally {
    cargandoGrupos.value = false
  }
}

async function cargarMensajes() {
  if (!grupoSeleccionadoId.value) {
    mensajes.value = []
    return
  }

  cargandoMensajes.value = true
  errorMensajes.value = ''

  try {
    const respuesta = await fetch(
      `${API_BASE}/api/foro-alumnos?grupoId=${encodeURIComponent(grupoSeleccionadoId.value)}`,
      {
        credentials: 'include',
        headers: { Accept: 'application/json' }
      }
    )

    const resultado = await leerRespuesta(respuesta)
    mensajes.value = Array.isArray(resultado.mensajes) ? resultado.mensajes : []
  } catch (err) {
    console.error('Error al cargar conversaciones:', err)
    errorMensajes.value = err.message || 'No se pudieron cargar las conversaciones.'
    mensajes.value = []
  } finally {
    cargandoMensajes.value = false
  }
}

async function publicarMensaje() {
  if (publicando.value) return

  const titulo = formulario.titulo.trim()
  const mensaje = formulario.mensaje.trim()

  if (!grupoSeleccionadoId.value || !titulo || !mensaje) {
    error.value = true
    estado.value = 'Selecciona un grupo y completa el título y la consulta.'
    return
  }

  publicando.value = true
  estado.value = ''
  error.value = false

  try {
    const respuesta = await fetch(`${API_BASE}/api/foro-alumnos`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        grupoId: Number(grupoSeleccionadoId.value),
        titulo,
        categoria: categoriaSeleccionada.value,
        mensaje
      })
    })

    const resultado = await leerRespuesta(respuesta)

    formulario.titulo = ''
    formulario.mensaje = ''
    estado.value = resultado.mensaje || 'Consulta publicada correctamente.'

    await cargarMensajes()
  } catch (err) {
    console.error('Error al publicar consulta:', err)
    error.value = true
    estado.value = err.message || 'No se pudo publicar la consulta.'
  } finally {
    publicando.value = false
  }
}

async function publicarRespuesta(publicacion) {
  const mensaje = String(respuestas[publicacion.id] || '').trim()

  if (!mensaje || publicandoRespuestaId.value !== null) return

  publicandoRespuestaId.value = publicacion.id

  try {
    console.log('DEBUG respuesta foro:', {
  grupoSeleccionadoId: grupoSeleccionadoId.value,
  grupoIdEnviado: Number(grupoSeleccionadoId.value),
  publicacionId: publicacion.id,
  respuestaAId: Number(publicacion.id)
})
    const respuesta = await fetch(`${API_BASE}/api/foro-alumnos`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        grupoId: Number(grupoSeleccionadoId.value),
        respuestaAId: Number(publicacion.id),
        mensaje
      })
    })

    const resultado = await leerRespuesta(respuesta)

    respuestas[publicacion.id] = ''
    estado.value = resultado.mensaje || 'Respuesta publicada correctamente.'
    error.value = false

    await cargarMensajes()
  } catch (err) {
    console.error('Error al publicar respuesta:', err)
    estado.value = err.message || 'No se pudo publicar la respuesta.'
    error.value = true
  } finally {
    publicandoRespuestaId.value = null
  }
}

onMounted(cargarGrupos)
</script>
