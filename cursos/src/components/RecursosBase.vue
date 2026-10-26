
<template>
  <div class="relative min-h-screen text-gray-800">
    <!-- Fondo compartido -->
    <div
      class="fixed inset-0 bg-cover bg-center blur-sm scale-105"
      :style="{ backgroundImage: `url('${fondo}')` }"
    ></div>
    <div class="fixed inset-0 bg-white/40 backdrop-blur-sm"></div>

    <div class="relative z-10">
      <!-- Cada vista proporciona su propio navbar -->
      <component :is="navbarComponent" />

      <main>
        <header
          class="bg-gradient-to-br from-red-950 via-red-900 to-red-800 text-white px-6 py-16"
        >
          <div class="max-w-5xl mx-auto text-center">
            <p class="text-sm font-bold uppercase tracking-widest text-amber-200 mb-3">
              {{ nombreEscuela }}
            </p>
            <h1 class="text-4xl md:text-5xl font-bold mb-5">
              Recursos educativos
            </h1>
            <p class="text-lg text-red-100 max-w-2xl mx-auto">
              Materiales para aprender, practicar y continuar estudiando
              dentro y fuera del aula.
            </p>
          </div>
        </header>

        <!-- Navegación -->
        <nav
          class="relative z-10 mx-auto mt-8 mb-8 grid max-w-5xl grid-cols-2 gap-3 px-4 sm:grid-cols-4"
          aria-label="Navegación del profesorado"
        >
          <button
            v-for="item in secciones"
            :key="item.id"
            type="button"
            @click="
  seccionActiva = item.id;
  if (item.id === 'tareas') cargarTareas()
"
            :class="seccionActiva === item.id
              ? 'border-purple-300 bg-slate-950 text-white'
              : 'border-gray-200 bg-white text-gray-800 hover:border-purple-200'"
            class="flex flex-col items-center gap-2 rounded-2xl border p-5 text-center transition"
          >
            <span class="text-2xl" aria-hidden="true">{{ item.icono }}</span>
            <span class="font-semibold">{{ item.nombre }}</span>
          </button>
        </nav>

        <!-- Inicio -->
        <section
          v-if="seccionActiva === 'inicio'"
          class="mx-auto max-w-5xl px-6 py-8"
        >
          <div class="rounded-2xl border bg-white/95 p-8 shadow-sm">
            <h2 class="text-2xl font-bold mb-3">Espacio del profesorado</h2>
            <p class="text-gray-600 mb-6">
              Bienvenido/a al espacio educativo de {{ nombreEscuela }}.
              Aquí puedes publicar y consultar materiales para tus grupos.
            </p>
            <button
              @click="seccionActiva = 'recursos'"
              class="rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Consultar recursos
            </button>
          </div>
        </section>

        <!-- Publicar recursos -->
        <section
          v-if="seccionActiva === 'recursos' && sesionComprobada && profesor"
          class="max-w-6xl mx-auto px-6 pt-8"
        >
          <div class="bg-white/95 rounded-2xl shadow-lg border p-6 md:p-8">
            <h2 class="text-2xl font-bold mb-2">
              Publicar un recurso educativo
            </h2>
            <p class="text-gray-600 mb-6">
              Comparte documentos, vídeos, audios y enlaces con el alumnado.
            </p>

            <form class="space-y-5" @submit.prevent="publicarRecurso">
              <div>
                <label for="recurso-titulo" class="block font-semibold mb-2">
                  Título *
                </label>
                <input
                  id="recurso-titulo"
                  v-model="nuevoRecurso.titulo"
                  required
                  maxlength="200"
                  class="w-full rounded-lg border px-4 py-3"
                  placeholder="Ej.: Ejercicios de castellano A1"
                />
              </div>

              <div>
                <label for="recurso-descripcion" class="block font-semibold mb-2">
                  Descripción
                </label>
                <textarea
                  id="recurso-descripcion"
                  v-model="nuevoRecurso.descripcion"
                  rows="3"
                  class="w-full rounded-lg border px-4 py-3"
                  placeholder="Explica para qué sirve este recurso."
                ></textarea>
              </div>

              <div>
                <label for="recurso-tipo" class="block font-semibold mb-2">
                  Tipo de recurso *
                </label>
                <select
                  id="recurso-tipo"
                  v-model="nuevoRecurso.tipo"
                  required
                  class="w-full rounded-lg border bg-white px-4 py-3"
                >
                  <option value="DOCUMENTO">Documento</option>
                  <option value="PDF">PDF</option>
                  <option value="IMAGEN">Imagen</option>
                  <option value="AUDIO">Audio</option>
                  <option value="VIDEO">Vídeo</option>
                  <option value="OTRO">Otro</option>
                </select>
              </div>

              <div>
                <label for="recurso-url" class="block font-semibold mb-2">
                  Enlace del recurso
                </label>
                <input
                  id="recurso-url"
                  v-model="nuevoRecurso.url"
                  type="url"
                  class="w-full rounded-lg border px-4 py-3"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label for="recurso-archivo" class="block font-semibold mb-2">
                  Archivo educativo (máximo 20 MB)
                </label>
                <input
                  id="recurso-archivo"
                  ref="inputArchivo"
                  type="file"
                  accept=".pdf,.doc,.docx,.odt,.txt,.jpg,.jpeg,.png,.webp,.mp3,.wav,.ogg,.mp4,.webm,.ppt,.pptx,.xls,.xlsx,.zip"
                  @change="seleccionarArchivo"
                  class="w-full rounded-lg border bg-white px-4 py-3"
                />
                <p class="mt-2 text-sm text-gray-500">
                  Puedes adjuntar un archivo o publicar un enlace.
                </p>
                <p v-if="archivoSeleccionado" class="mt-2 text-sm">
                  Archivo: {{ archivoSeleccionado.name }}
                </p>
              </div>

              <div>
                <label for="recurso-grupo" class="block font-semibold mb-2">
                  Destinatarios
                </label>
                <select
                  id="recurso-grupo"
                  v-model="nuevoRecurso.grupo_id"
                  class="w-full rounded-lg border bg-white px-4 py-3"
                >
                  <option value="">Toda la escuela</option>
                  <option
                    v-for="grupo in misGrupos"
                    :key="grupo.id"
                    :value="String(grupo.id)"
                  >
                    {{ grupo.nombre || grupo.nombre_grupo || grupo.curso_nombre || `Grupo ${grupo.id}` }}
                  </option>
                </select>
              </div>

              <p
                v-if="mensajePublicacion"
                role="status"
                class="rounded-lg border p-4"
                :class="errorPublicacion
                  ? 'border-red-200 bg-red-50 text-red-700'
                  : 'border-green-200 bg-green-50 text-green-700'"
              >
                {{ mensajePublicacion }}
              </p>

              <button
                type="submit"
                :disabled="publicando"
                class="rounded-lg bg-red-900 px-6 py-3 font-semibold text-white hover:bg-red-800 disabled:opacity-60"
              >
                {{ publicando ? 'Publicando...' : 'Publicar recurso' }}
              </button>
            </form>
          </div>
        </section>

        <!-- Editar recurso -->
        <section
          v-if="seccionActiva === 'recursos' && recursoEditando && esMiRecurso(recursoEditando)"
          class="max-w-6xl mx-auto px-6 pt-6"
        >
          <div class="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 class="text-xl font-bold mb-4">Editar recurso</h2>
            <form @submit.prevent="guardarEdicionRecurso">
              <label for="editar-titulo" class="block font-semibold mb-2">
                Título
              </label>
              <input
                id="editar-titulo"
                v-model="recursoEditando.titulo"
                required
                maxlength="200"
                class="w-full rounded-lg border p-3 mb-4"
              />

              <label for="editar-descripcion" class="block font-semibold mb-2">
                Descripción
              </label>
              <textarea
                id="editar-descripcion"
                v-model="recursoEditando.descripcion"
                rows="4"
                class="w-full rounded-lg border p-3 mb-4"
              ></textarea>

              <div class="flex flex-wrap gap-3">
                <button
                  type="submit"
                  :disabled="guardandoEdicion"
                  class="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800 disabled:opacity-50"
                >
                  {{ guardandoEdicion ? 'Guardando...' : 'Guardar cambios' }}
                </button>
                <button
                  type="button"
                  @click="recursoEditando = null"
                  class="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </section>

        <!-- Recursos publicados -->
        <section
          v-if="seccionActiva === 'recursos'"
          class="max-w-6xl mx-auto px-6 py-12"
        >
          <div class="mb-6">
            <h2 class="text-2xl font-bold mb-2">Recursos del profesorado</h2>
            <p class="text-gray-600">
              Materiales publicados para {{ nombreEscuela }}.
            </p>
          </div>

          <div v-if="cargando" class="rounded-2xl border bg-white p-8 text-center">
            Cargando recursos...
          </div>

          <div
            v-else-if="error"
            class="rounded-2xl border bg-white p-8 text-center"
          >
            <p class="font-semibold mb-4">No se han podido cargar los recursos.</p>
            <button
              @click="cargarRecursos"
              class="rounded-lg bg-red-900 px-5 py-2 text-white hover:bg-red-800"
            >
              Volver a intentar
            </button>
          </div>

          <div
            v-else-if="recursos.length === 0"
            class="rounded-2xl border bg-white p-8 text-center"
          >
            <div class="text-4xl mb-3">📚</div>
            <h3 class="text-xl font-bold mb-2">Todavía no hay recursos publicados</h3>
            <p class="text-gray-600">
              Cuando se publiquen materiales, aparecerán aquí.
            </p>
          </div>

          <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="(recurso, indice) in recursos"
              :key="recurso.id || recurso.id_recurso || indice"
              class="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <p class="mb-2 text-sm font-semibold text-red-800">
                {{ recurso.nivel || recurso.tipo || 'Material educativo' }}
              </p>
              <h3 class="mb-3 text-xl font-bold">
                {{ recurso.titulo || recurso.nombre || 'Recurso educativo' }}
              </h3>
              <p class="mb-4 text-gray-600">
                {{ recurso.descripcion || 'Material publicado por el profesorado.' }}
              </p>
              <p
                v-if="recurso.nombre_profesor || recurso.profesor"
                class="mb-4 text-sm text-gray-500"
              >
                Profesor/a: {{ recurso.nombre_profesor || recurso.profesor }}
              </p>

              <a
                v-if="obtenerUrl(recurso)"
                :href="obtenerUrl(recurso)"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block rounded-lg bg-red-900 px-4 py-2 text-white hover:bg-red-800"
              >
                Abrir recurso ↗
              </a>

              <div v-if="esMiRecurso(recurso)" class="mt-4 flex flex-wrap gap-3">
                <button
                  @click="editarRecurso(recurso)"
                  class="rounded-lg bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
                >
                  Editar
                </button>
                <button
                  @click="eliminarRecurso(recurso)"
                  class="rounded-lg bg-red-700 px-4 py-2 text-white hover:bg-red-800"
                >
                  Eliminar
                </button>
              </div>
            </article>
          </div>
        </section>

        <!-- Recursos externos -->
        <section
          v-if="seccionActiva === 'recursos'"
          class="max-w-6xl mx-auto px-6 pb-12"
        >
          <h2 class="text-2xl font-bold mb-2">Recursos de consulta</h2>
          <p class="text-gray-600 mb-6">
            Enlaces externos para practicar y ampliar conocimientos.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article class="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 class="text-xl font-bold mb-3">Cursos generales</h3>
              <p class="text-gray-600 mb-5">
                Consulta materiales de castellano, catalán y alfabetización.
              </p>
              <RouterLink
                to="/cursos-generales"
                class="inline-block rounded-lg bg-red-900 px-4 py-2 text-white hover:bg-red-800"
              >
                Ver cursos
              </RouterLink>
            </article>

            <article class="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 class="text-xl font-bold mb-3">Biblioteca y materiales</h3>
              <p class="text-gray-600 mb-5">
                Descubre materiales para leer, estudiar y practicar.
              </p>
              <RouterLink
                to="/castellano"
                class="inline-block rounded-lg bg-red-900 px-4 py-2 text-white hover:bg-red-800"
              >
                Explorar materiales
              </RouterLink>
            </article>
          </div>
        </section>

        
      <!-- Tareas entregadas por el alumnado -->
      <section
        v-if="seccionActiva === 'tareas'"
        class="max-w-5xl mx-auto px-6 py-10"
      >
        <div class="rounded-2xl border bg-white/95 p-6 md:p-8">
          <h2 class="text-2xl font-bold mb-3">
            Tareas entregadas por el alumnado
          </h2>

          <p class="text-gray-600 mb-6">
            Consulta y descarga los archivos enviados por los alumnos
            de {{ nombreEscuela }}.
          </p>

          <div v-if="cargandoTareas" class="rounded-xl bg-gray-50 p-5">
            Cargando tareas entregadas...
          </div>

          <div
            v-else-if="errorTareas"
            class="rounded-xl border border-red-200 bg-red-50 p-5"
          >
            <p class="text-red-800 mb-4">{{ errorTareas }}</p>

            <button
              type="button"
              @click="cargarTareas"
              class="rounded-lg bg-red-900 px-4 py-2 text-white hover:bg-red-800"
            >
              Volver a intentar
            </button>
          </div>

          <div
            v-else-if="tareas.length === 0"
            class="rounded-xl bg-gray-50 p-6 text-center"
          >
            <p class="text-3xl mb-3">📂</p>
            <h3 class="font-bold text-lg mb-2">
              Todavía no hay tareas entregadas
            </h3>
            <p class="text-gray-600">
              Cuando el alumnado envíe sus trabajos, aparecerán aquí.
            </p>
          </div>

          <div v-else class="space-y-4">
            <article
              v-for="tarea in tareas"
              :key="tarea.id"
              class="rounded-xl border border-gray-200 p-5"
            >
              <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div class="min-w-0">
                  <h3 class="text-lg font-bold">
                    {{ tarea.titulo || 'Tarea sin título' }}
                  </h3>

                  <p class="mt-1 text-sm text-gray-600">
                    Alumno/a:
                    {{ tarea.nombre_alumno || tarea.alumno || 'No disponible' }}
                  </p>

                  <p class="mt-1 text-sm text-gray-600">
                    Archivo:
                    {{ tarea.nombre_archivo || 'Archivo adjunto' }}
                  </p>

                  <p v-if="tarea.fecha_envio" class="mt-1 text-sm text-gray-500">
                    Entregada:
                    {{ new Date(tarea.fecha_envio).toLocaleString('es-ES') }}
                  </p>

                  <p
                    v-if="tarea.comentario"
                    class="mt-3 whitespace-pre-wrap text-gray-700"
                  >
                    {{ tarea.comentario }}
                  </p>

                  <p class="mt-3 text-sm font-semibold">
                    Estado: {{ tarea.estado || 'ENVIADA' }}
                  </p>
                </div>

                <button
                  type="button"
                  @click="descargarTarea(tarea)"
                  :disabled="descargandoId === tarea.id"
                  class="shrink-0 rounded-lg bg-red-900 px-4 py-2 font-semibold text-white hover:bg-red-800 disabled:opacity-60"
                >
                  {{
                    descargandoId === tarea.id
                      ? 'Descargando...'
                      : 'Descargar archivo'
                  }}
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>


        <!-- Resultados -->
        <section
          v-if="seccionActiva === 'resultados'"
          class="max-w-5xl mx-auto px-6 py-10"
        >
          <div class="rounded-2xl border bg-white/95 p-8">
            <h2 class="text-2xl font-bold mb-3">Resultados del alumnado</h2>
            <p class="text-gray-600 mb-6">
              Consulta y registra las evaluaciones del alumnado.
            </p>
            <RouterLink
              to="/ateneu/tutores/resultados-alumno"
              class="inline-block rounded-xl bg-slate-950 px-5 py-3 text-white hover:bg-slate-800"
            >
              Ir a resultados
            </RouterLink>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  navbarComponent: {
    type: [Object, Function],
    required: true
  },
  nombreEscuela: {
    type: String,
    required: true
  },
  escuelaApi: {
    type: String,
    required: true
  },
  escuelaId: {
    type: Number,
    required: true
  },
  fondo: {
    type: String,
    default: '/fotos/ateneu/recursos/recursos.jpg'
  }
})

const API_URL = 'http://localhost:5555/api/escuelas/recursos'
const SESSION_URL = 'http://localhost:5555/api/acceso-profesor/session'

const seccionActiva = ref('recursos')
const secciones = [
  { id: 'inicio', nombre: 'Inicio', icono: '⌂' },
  { id: 'recursos', nombre: 'Recursos', icono: '▤' },
  { id: 'tareas', nombre: 'Tareas', icono: '☷' },
  { id: 'resultados', nombre: 'Resultados', icono: '▥' }
]

const recursos = ref([])
const cargando = ref(false)
const error = ref(false)
const tareas = ref([])
const cargandoTareas = ref(false)
const errorTareas = ref('')
const descargandoId = ref(null)

const profesor = ref(null)
const sesionComprobada = ref(false)
const recursoEditando = ref(null)
const guardandoEdicion = ref(false)
const misGrupos = ref([])

const publicando = ref(false)
const mensajePublicacion = ref('')
const errorPublicacion = ref(false)

const inputArchivo = ref(null)
const archivoSeleccionado = ref(null)
const LIMITE_ARCHIVO = 20 * 1024 * 1024

const nuevoRecurso = ref({
  titulo: '',
  descripcion: '',
  tipo: 'DOCUMENTO',
  url: '',
  grupo_id: ''
})

function idRecurso(recurso) {
  return recurso.id ?? recurso.id_recurso
}

function esMiRecurso(recurso) {
  const idProfesor = profesor.value?.id ?? profesor.value?.profesor_id
  const propietario = recurso?.profesor_id

  return Boolean(
    idProfesor &&
    propietario &&
    Number(idProfesor) === Number(propietario)
  )
}

function obtenerUrl(recurso) {
  const ruta =
    recurso.url ||
    recurso.archivo_url ||
    recurso.ruta_archivo ||
    recurso.archivo ||
    recurso.ruta

  if (!ruta || typeof ruta !== 'string') return ''

  if (/^https?:\/\//i.test(ruta)) {
    return ruta
  }

  const rutaLimpia = ruta.replace(/^\/+/, '')
  return `http://localhost:5555/${rutaLimpia}`
}

function seleccionarArchivo(evento) {
  const archivo = evento.target.files?.[0] || null

  mensajePublicacion.value = ''
  errorPublicacion.value = false

  if (!archivo) {
    archivoSeleccionado.value = null
    return
  }

  if (archivo.size > LIMITE_ARCHIVO) {
    archivoSeleccionado.value = null
    evento.target.value = ''
    mensajePublicacion.value = 'El archivo no puede superar los 20 MB.'
    errorPublicacion.value = true
    return
  }

  archivoSeleccionado.value = archivo
}

async function comprobarSesionProfesor() {
  try {
    const respuesta = await fetch(SESSION_URL, {
      method: 'GET',
      credentials: 'include'
    })

    const resultado = await respuesta.json()

    if (!respuesta.ok || resultado.ok !== true) {
      profesor.value = null
      return
    }

    const datos =
      resultado.datos ||
      resultado.profesor ||
      resultado

    const idEscuelaProfesor =
      datos.escuelaId ??
      datos.escuela_id ??
      datos.id_escuela

    // No se autoriza la publicación si la sesión no identifica
    // de forma verificable la escuela del profesor.
    if (
      idEscuelaProfesor == null ||
      Number(idEscuelaProfesor) !== Number(props.escuelaId)
    ) {
      profesor.value = null
      return
    }

    profesor.value = datos
    await cargarMisGrupos()
  } catch (err) {
    console.error('Error al comprobar la sesión:', err)
    profesor.value = null
  } finally {
    sesionComprobada.value = true
  }
}

async function cargarMisGrupos() {
  try {
    const respuesta = await fetch(`${API_URL}/mis-grupos`, {
      method: 'GET',
      credentials: 'include'
    })

    const resultado = await respuesta.json()

    if (!respuesta.ok || resultado.ok !== true) {
      throw new Error(resultado.mensaje || 'No se pudieron cargar los grupos.')
    }

    misGrupos.value = Array.isArray(resultado.datos)
      ? resultado.datos
      : []
  } catch (err) {
    console.error('Error al cargar los grupos:', err)
    misGrupos.value = []
  }
}

async function cargarRecursos() {
  cargando.value = true
  error.value = false

  try {
    const url = `${API_URL}?escuela=${encodeURIComponent(props.escuelaApi)}`

    const respuesta = await fetch(url, {
      credentials: 'include'
    })

    const resultado = await respuesta.json()

    if (!respuesta.ok || resultado.ok === false) {
      throw new Error(resultado.mensaje || 'No se pudieron cargar los recursos.')
    }

    recursos.value = Array.isArray(resultado.datos)
      ? resultado.datos
      : []
  } catch (err) {
    console.error(`Error al cargar recursos de ${props.nombreEscuela}:`, err)
    error.value = true
  } finally {
    cargando.value = false
  }
}

function editarRecurso(recurso) {
  if (!esMiRecurso(recurso)) return
  recursoEditando.value = { ...recurso }
}

async function guardarEdicionRecurso() {
  const recurso = recursoEditando.value

  if (!recurso || !esMiRecurso(recurso)) return

  guardandoEdicion.value = true

  try {
    const respuesta = await fetch(
      `${API_URL}/${idRecurso(recurso)}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: recurso.titulo,
          descripcion: recurso.descripcion
        })
      }
    )

    const resultado = await respuesta.json()

    if (!respuesta.ok || resultado.ok !== true) {
      throw new Error(resultado.mensaje || 'No se pudo actualizar el recurso.')
    }

    recursoEditando.value = null
    await cargarRecursos()
    alert('Recurso actualizado correctamente.')
  } catch (err) {
    console.error('Error al actualizar:', err)
    alert(err.message || 'No se pudo actualizar el recurso.')
  } finally {
    guardandoEdicion.value = false
  }
}

async function eliminarRecurso(recurso) {
  if (!esMiRecurso(recurso)) return

  const confirmar = window.confirm(
    `¿Seguro que quieres eliminar el recurso "${recurso.titulo}"?`
  )

  if (!confirmar) return

  try {
    const respuesta = await fetch(
      `${API_URL}/${idRecurso(recurso)}`,
      {
        method: 'DELETE',
        credentials: 'include'
      }
    )

    const resultado = await respuesta.json()

    if (!respuesta.ok || resultado.ok !== true) {
      throw new Error(resultado.mensaje || 'No se pudo eliminar el recurso.')
    }

    if (
      recursoEditando.value &&
      idRecurso(recursoEditando.value) === idRecurso(recurso)
    ) {
      recursoEditando.value = null
    }

    await cargarRecursos()
    alert('Recurso eliminado correctamente.')
  } catch (err) {
    console.error('Error al eliminar:', err)
    alert(err.message || 'No se pudo eliminar el recurso.')
  }
}

async function publicarRecurso() {
  mensajePublicacion.value = ''
  errorPublicacion.value = false

  if (!profesor.value) {
    mensajePublicacion.value = 'Debes iniciar sesión en esta escuela.'
    errorPublicacion.value = true
    return
  }

  const titulo = nuevoRecurso.value.titulo.trim()
  const descripcion = nuevoRecurso.value.descripcion.trim()
  const url = nuevoRecurso.value.url.trim()
  const archivo = archivoSeleccionado.value

  if (!titulo) {
    mensajePublicacion.value = 'El título es obligatorio.'
    errorPublicacion.value = true
    return
  }

  if (!archivo && !url) {
    mensajePublicacion.value = 'Selecciona un archivo o introduce una URL.'
    errorPublicacion.value = true
    return
  }

  if (archivo && archivo.size > LIMITE_ARCHIVO) {
    mensajePublicacion.value = 'El archivo no puede superar los 20 MB.'
    errorPublicacion.value = true
    return
  }

  if (url) {
    try {
      const validada = new URL(url)

      if (!['http:', 'https:'].includes(validada.protocol)) {
        throw new Error('URL no válida')
      }
    } catch {
      mensajePublicacion.value =
        'Introduce una URL válida que comience por https:// o http://.'
      errorPublicacion.value = true
      return
    }
  }

  const formulario = new FormData()
  formulario.append('titulo', titulo)
  formulario.append('descripcion', descripcion)
  formulario.append('tipo', nuevoRecurso.value.tipo)
  formulario.append('url', url)
  formulario.append('grupo_id', nuevoRecurso.value.grupo_id)

  if (archivo) {
    formulario.append('archivo', archivo)
  }

  publicando.value = true

  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-Escuela-Id': String(props.escuelaId)
      },
      body: formulario
    })

    const resultado = await respuesta.json()

    if (!respuesta.ok || resultado.ok !== true) {
      throw new Error(resultado.mensaje || 'No se pudo publicar el recurso.')
    }

    mensajePublicacion.value =
      resultado.mensaje || 'Recurso publicado correctamente.'

    nuevoRecurso.value = {
      titulo: '',
      descripcion: '',
      tipo: 'DOCUMENTO',
      url: '',
      grupo_id: ''
    }

    archivoSeleccionado.value = null

    if (inputArchivo.value) {
      inputArchivo.value.value = ''
    }

    await cargarRecursos()
  } catch (err) {
    console.error('Error al publicar:', err)
    mensajePublicacion.value =
      err.message || 'Ha ocurrido un error al publicar.'
    errorPublicacion.value = true
  } finally {
    publicando.value = false
  }
}


async function cargarTareas() {
  cargandoTareas.value = true
  errorTareas.value = ''

  try {
    const respuesta = await fetch(
      'http://localhost:5555/api/tareas-profesor',
      {
        method: 'GET',
        credentials: 'include'
      }
    )

    const resultado = await respuesta.json()

    if (!respuesta.ok || resultado.ok === false) {
      throw new Error(
        resultado.mensaje || 'No se pudieron cargar las tareas.'
      )
    }

    tareas.value = Array.isArray(resultado.datos)
      ? resultado.datos
      : Array.isArray(resultado.tareas)
        ? resultado.tareas
        : []
  } catch (err) {
    console.error('Error al cargar las tareas:', err)
    errorTareas.value =
      err.message || 'No se pudieron cargar las tareas entregadas.'
  } finally {
    cargandoTareas.value = false
  }
}

async function descargarTarea(tarea) {
  if (!tarea?.id) return

  descargandoId.value = tarea.id

  try {
    const respuesta = await fetch(
      `http://localhost:5555/api/tareas-profesor/${encodeURIComponent(tarea.id)}/descargar`,
      {
        method: 'GET',
        credentials: 'include'
      }
    )

    if (!respuesta.ok) {
      let mensaje = 'No se pudo descargar el archivo.'

      try {
        const resultado = await respuesta.json()
        mensaje = resultado.mensaje || mensaje
      } catch {
        // La respuesta no contiene JSON.
      }

      throw new Error(mensaje)
    }

    const archivo = await respuesta.blob()
    const urlTemporal = URL.createObjectURL(archivo)
    const enlace = document.createElement('a')

    enlace.href = urlTemporal
    enlace.download = tarea.nombre_archivo || `tarea-${tarea.id}`
    document.body.appendChild(enlace)
    enlace.click()
    enlace.remove()

    URL.revokeObjectURL(urlTemporal)
  } catch (err) {
    console.error('Error al descargar la tarea:', err)
    alert(err.message || 'No se pudo descargar el archivo.')
  } finally {
    descargandoId.value = null
  }
}


onMounted(async () => {
  await Promise.all([
    cargarRecursos(),
    comprobarSesionProfesor()
  ])
})
</script>
