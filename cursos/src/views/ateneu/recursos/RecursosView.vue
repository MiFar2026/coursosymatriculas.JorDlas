
<template>
<div class="relative min-h-screen text-gray-800">
    <!-- Fondo con imagen -->
    <div
        class="fixed inset-0 bg-cover bg-center bg-fixed blur-sm scale-105"
        style="background-image: url('/fotos/ateneu/recursos/recursos.jpg');"
    ></div>

    <!-- Capa transparente -->
    <div class="fixed inset-0 bg-white/40 backdrop-blur-sm"></div>

    <!-- Contenido de la página -->
    <div class="relative z-10">
        <div class="relative z-[100] w-full">
            <NavbarAteneu />

        </div>
    </div>

        <main class="relative">

<!-- PUBLICAR RECURSOS: SOLO EN LA SECCIÓN RECURSOS -->


            <!-- CABECERA -->
            <section
                class="bg-gradient-to-br from-red-950 via-red-900 to-red-800
                       text-white px-6 py-16"
            >
                <div class="max-w-5xl mx-auto text-center">
                    <p class="text-sm font-bold uppercase tracking-widest
                              text-amber-200 mb-3">
                        Escuela Ateneu Aula 502
                    </p>

                    <h1 class="text-4xl md:text-5xl font-bold mb-5">
                        Recursos educativos
                    </h1>

                    <p class="text-lg text-red-100 max-w-2xl mx-auto">
                        Materiales para aprender, practicar y continuar
                        estudiando dentro y fuera del aula.
                    </p>
                </div>
            </section>
<br />
<!-- Navegación del espacio del profesorado -->
<section>
  
<nav
  class="relative z-10 mx-auto mb-8 grid w-full max-w-5xl
         grid-cols-2 gap-3 px-4 sm:grid-cols-4"
  aria-label="Navegación del profesorado"
>
  <button
    type="button"
    @click="seccionActiva = 'inicio'"
    :class="seccionActiva === 'inicio'
      ? 'border-purple-300 bg-slate-950 shadow-sm'
      : 'border-gray-200 bg-white hover:border-purple-200 hover:bg-gray-50'"
    class="flex flex-col items-center gap-2 rounded-2xl border
           p-5 text-center transition duration-200"
  >
    <span name="house" size="xl" color="#745487">⌂ </span>
    <span
      :class="seccionActiva === 'inicio'
        ? 'text-white'
        : 'text-gray-800'"
      class="font-semibold"
    >
      Inicio
    </span>
  </button>

  <button
    type="button"
    @click="seccionActiva = 'recursos'"
    :class="seccionActiva === 'recursos'
      ? 'border-purple-300 bg-slate-950 shadow-sm'
      : 'border-gray-200 bg-white hover:border-purple-200 hover:bg-gray-50'"
    class="flex flex-col items-center gap-2 rounded-2xl border
           p-5 text-center transition duration-200"
  >
  <span name="book-open" size="xl" color="#745487">▤</span>
    <span
      :class="seccionActiva === 'recursos'
        ? 'text-white'
        : 'text-gray-800'"
      class="font-semibold"
    >
      Recursos
    </span>
  </button>

  <button
    type="button"
    @click="seccionActiva = 'tareas'"
    :class="seccionActiva === 'tareas'
      ? 'border-purple-300 bg-slate-950 shadow-sm'
      : 'border-gray-200 bg-white hover:border-purple-200 hover:bg-gray-50'"
    class="flex flex-col items-center gap-2 rounded-2xl border
           p-5 text-center transition duration-200"
  >
    <span name="clipboard-list" size="xl" color="#745487">☷</span>
    <span
      :class="seccionActiva === 'tareas'
        ? 'text-white'
        : 'text-gray-800'"
      class="font-semibold"
    >
      Tareas
    </span>
  </button>

  <button
    type="button"
    @click="seccionActiva = 'resultados'"
    :class="seccionActiva === 'resultados'
      ? 'border-purple-300 bg-slate-950 shadow-sm'
      : 'border-gray-200 bg-white hover:border-purple-200 hover:bg-gray-50'"
    class="flex flex-col items-center gap-2 rounded-2xl border
           p-5 text-center transition duration-200"
  >
    <span name="chart-no-axes-column" size="xl" color="#745487">▥</span>
    <span
      :class="seccionActiva === 'resultados'
        ? 'text-white'
        : 'text-gray-800'"
      class="font-semibold"
    >
      Resultados
    </span>
  </button>
</nav>

</section>
<section
  v-if="seccionActiva === 'recursos' && sesionComprobada && profesor"
  class="max-w-6xl mx-auto px-6 pt-8"
>
  <div class="bg-white/95 rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-2">
      Publicar un recurso educativo
    </h2>

    <p class="text-gray-600 mb-6">
      Comparte documentos, vídeos, audios y enlaces educativos con el alumnado.
    </p>

    <form class="space-y-5" @submit.prevent="publicarRecurso">
      <div>
        <label for="recurso-titulo" class="block font-semibold mb-2">
          Título *
        </label>
        <input
          id="recurso-titulo"
          v-model="nuevoRecurso.titulo"
          type="text"
          maxlength="200"
          required
          class="w-full rounded-lg border border-gray-300 px-4 py-3"
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
          class="w-full rounded-lg border border-gray-300 px-4 py-3"
          placeholder="Explica brevemente para qué sirve este recurso."
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
          class="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white"
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
  Enlace del recurso (opcional)
        </label>
        <input
          id="recurso-url"
          v-model="nuevoRecurso.url"
          type="url"
          class="w-full rounded-lg border border-gray-300 px-4 py-3"
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
    class="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white"
  />

  <p class="text-sm text-gray-500 mt-2">
    Puedes seleccionar un archivo o utilizar el enlace de arriba.
    Si seleccionas un archivo, se enviará como adjunto al correo de ExAequo.
  </p>

  <p v-if="archivoSeleccionado" class="text-sm text-gray-700 mt-2">
    Archivo seleccionado: {{ archivoSeleccionado.name }}
  </p>
</div>


      <div>
        <label for="recurso-grupo" class="block font-semibold mb-2">
          Destinatarios
        </label>
        <select
          id="recurso-grupo"
          v-model="nuevoRecurso.grupo_id"
          class="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white"
        >
          <option value="">Toda la escuela Ateneu</option>
          <option
            v-for="grupo in misGrupos"
            :key="grupo.id"
            :value="String(grupo.id)"
          >
            {{ grupo.nombre || grupo.nombre_grupo || grupo.curso_nombre || `Grupo ${grupo.id}` }}
          </option>
        </select>
        <p class="text-sm text-gray-500 mt-2">
          Puedes compartirlo con toda la escuela o elegir uno de tus grupos.
        </p>
      </div>

      <div
        v-if="mensajePublicacion"
        class="rounded-lg p-4"
        :class="errorPublicacion
          ? 'bg-red-50 text-red-700 border border-red-200'
          : 'bg-green-50 text-green-700 border border-green-200'"
        role="status"
      >
        {{ mensajePublicacion }}
      </div>

      <button
        type="submit"
        :disabled="publicando"
        class="rounded-lg bg-red-700 hover:bg-red-800 disabled:opacity-60 text-white font-semibold px-6 py-3 transition"
      >
        {{ publicando ? 'Publicando...' : 'Publicar recurso' }}
      </button>
    </form>
  </div>
</section>
            <div class="max-w-6xl mx-auto px-6 py-12 space-y-12">

<!-- FORMULARIO PARA EDITAR UN RECURSO -->
<section
    v-if="recursoEditando"
    class="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6"
>
    <h2 class="text-xl font-bold mb-4">
        Editar recurso
    </h2>

    <form @submit.prevent="guardarEdicionRecurso">
        <label class="block font-semibold mb-2" for="tituloRecurso">
            Título
        </label>

        <input
            id="tituloRecurso"
            v-model="recursoEditando.titulo"
            type="text"
            required
            maxlength="200"
            class="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />

        <label class="block font-semibold mb-2" for="descripcionRecurso">
            Descripción
        </label>

        <textarea
            id="descripcionRecurso"
            v-model="recursoEditando.descripcion"
            rows="4"
            class="w-full border border-gray-300 rounded-lg p-3 mb-4"
        ></textarea>

        <div class="flex flex-wrap gap-3">
            <button
                type="submit"
                :disabled="guardandoEdicion"
                class="bg-green-700 text-white rounded-lg px-4 py-2
                       hover:bg-green-800 disabled:opacity-50"
            >
                {{ guardandoEdicion ? 'Guardando...' : 'Guardar cambios' }}
            </button>

            <button
                type="button"
                @click="recursoEditando = null"
                class="bg-gray-200 text-gray-800 rounded-lg px-4 py-2
                       hover:bg-gray-300"
            >
                Cancelar
            </button>
        </div>
    </form>
</section>

                <!-- RECURSOS DEL PROFESORADO -->
                <section v-if="seccionActiva === 'recursos'" class="recursos">
                    <div class="mb-6">
                        <h2 class="text-2xl font-bold mb-2">
                            Recursos del profesorado
                        </h2>

                        <p class="text-gray-600">
                            Aquí encontrarás los materiales publicados
                            por los profesores de Ateneu Aula 502.
                        </p>
                    </div>

                    <div
                        v-if="cargando"
                        class="bg-white border rounded-2xl p-8 text-center"
                    >
                        Cargando recursos...
                    </div>

                    <div
                        v-else-if="error"
                        class="bg-white border border-amber-200 rounded-2xl
                               p-6 text-center"
                    >
                        <p class="font-semibold mb-2">
                            No se han podido cargar los recursos.
                        </p>
                        <p class="text-gray-600 mb-4">
                            Puedes intentarlo de nuevo más tarde.
                        </p>
                        <button
                            @click="cargarRecursos"
                            class="bg-red-900 text-white rounded-lg px-5 py-2
                                   hover:bg-red-800"
                        >
                            Volver a intentar
                        </button>
                    </div>

                    <div
                        v-else-if="recursos.length === 0"
                        class="bg-white border border-gray-200 rounded-2xl
                               p-8 text-center"
                    >
                        <div class="text-4xl mb-3">📚</div>

                        <h3 class="text-xl font-bold mb-2">
                            Todavía no hay recursos publicados
                        </h3>

                        <p class="text-gray-600 max-w-xl mx-auto">
                            Cuando los profesores publiquen actividades,
                            documentos o materiales educativos, aparecerán
                            aquí automáticamente.
                        </p>
                    </div>

                    <div
                        v-else
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                               gap-6"
                    >
                        <article
                            v-for="(recurso, indice) in recursos"
                            :key="recurso.id || recurso.id_recurso || indice"
                            class="bg-white border border-gray-200 rounded-2xl
                                   p-6 shadow-sm"
                        >
                            <p class="text-sm text-red-800 font-semibold mb-2">
                                {{ recurso.nivel || 'Material educativo' }}
                            </p>

                            <h3 class="text-xl font-bold mb-3">
                                {{ recurso.titulo || recurso.nombre || 'Recurso educativo' }}
                            </h3>

                            <p class="text-gray-600 mb-4">
                                {{ recurso.descripcion || 'Material publicado por el profesorado.' }}
                            </p>

                            <p
                                v-if="recurso.nombre_profesor || recurso.profesor"
                                class="text-sm text-gray-500 mb-4"
                            >
                                Profesor/a:
                                {{ recurso.nombre_profesor || recurso.profesor }}
                            </p>

                            <a
                                v-if="obtenerUrl(recurso)"
                                :href="obtenerUrl(recurso)"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-block bg-red-900 text-white
                                       rounded-lg px-4 py-2 hover:bg-red-800"
                            >
                                Abrir recurso ↗
                            </a>
                            <div
    v-if="esMiRecurso(recurso)"
    class="flex flex-wrap gap-3 mt-4"
>
    <button
        type="button"
        class="bg-amber-600 text-white rounded-lg px-4 py-2
               hover:bg-amber-700"
        @click="editarRecurso(recurso)"
    >
        Editar
    </button>

    <button
        type="button"
        class="bg-red-700 text-white rounded-lg px-4 py-2
               hover:bg-red-800"
        @click="eliminarRecurso(recurso)"
    >
        Eliminar
    </button>
</div>
                        </article>
                    </div>
                </section>

                <!-- RECURSOS EXTERNOS -->
                <section v-if="seccionActiva === 'recursos'" class="recursos">
                    <div class="mb-6">
                        <h2 class="text-2xl font-bold mb-2">
                            Recursos de consulta
                        </h2>

                        <p class="text-gray-600">
                            Enlaces externos para practicar y ampliar
                            los conocimientos de forma autónoma.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <article
                            class="bg-white border border-gray-200
                                   rounded-2xl p-6 shadow-sm"
                        >
                            <h3 class="text-xl font-bold mb-3">
                                Cursos generales
                            </h3>

                            <p class="text-gray-600 mb-5">
                                Consulta las páginas de castellano,
                                catalán y alfabetización.
                            </p>

                            <RouterLink
                                to="/cursos-generales"
                                class="inline-block bg-red-900 text-white
                                       rounded-lg px-4 py-2 hover:bg-red-800"
                            >
                                Ver cursos
                            </RouterLink>
                        </article>

                        <article
                            class="bg-white border border-gray-200
                                   rounded-2xl p-6 shadow-sm"
                        >
                            <h3 class="text-xl font-bold mb-3">
                                Biblioteca y materiales
                            </h3>

                            <p class="text-gray-600 mb-5">
                                Descubre materiales para leer, estudiar
                                y practicar a tu ritmo.
                            </p>

                            <RouterLink
                                to="/castellano"
                                class="inline-block bg-red-900 text-white
                                       rounded-lg px-4 py-2 hover:bg-red-800"
                            >
                                Explorar materiales
                            </RouterLink>
                        </article>

                    </div>
                </section>

                
<!-- SECCIÓN INICIO -->
<section
  v-if="seccionActiva === 'inicio'"
  class="mx-auto max-w-5xl px-6 py-10"
>
  <div class="rounded-2xl border border-gray-200 bg-white/95 p-8 shadow-sm">
    <h1 class="mb-3 text-2xl font-bold text-gray-800">
      Espacio del profesorado
    </h1>

    <p class="mb-6 leading-relaxed text-gray-600">
      Bienvenido/a al espacio educativo de la Escuela Ateneu Aula 502.
      Desde aquí puedes consultar tus recursos, gestionar las tareas
      y acceder a los resultados del alumnado.
    </p>

    <button
      type="button"
      @click="seccionActiva = 'recursos'"
      class="rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white
             transition hover:bg-slate-800"
    >
      Consultar recursos
    </button>
  </div>
</section>

<!-- SECCIÓN TAREAS -->
<section
  v-else-if="seccionActiva === 'tareas'"
  class="mx-auto max-w-5xl px-6 py-10"
>
  <div class="rounded-2xl border border-gray-200 bg-white/95 p-8 shadow-sm">
    <h2 class="mb-3 text-2xl font-bold text-gray-800">
      Gestión de tareas
    </h2>

    <p class="leading-relaxed text-gray-600">
      Este espacio estará destinado a crear tareas, consultar las entregas
      del alumnado y gestionar las correcciones. La página de gestión
      del profesorado todavía está pendiente de implementar.
    </p>
  </div>
</section>

<!-- SECCIÓN RESULTADOS -->
<section
  v-else-if="seccionActiva === 'resultados'"
  class="mx-auto max-w-5xl px-6 py-10"
>
  <div class="rounded-2xl border border-gray-200 bg-white/95 p-8 shadow-sm">
    <h2 class="mb-3 text-2xl font-bold text-gray-800">
      Resultados del alumnado
    </h2>

    <p class="mb-6 leading-relaxed text-gray-600">
      Accede al formulario de resultados para consultar y registrar
      las evaluaciones del alumnado.
    </p>

    <RouterLink
      to="/ateneu/tutores/resultados-alumno"
      class="inline-block rounded-xl bg-slate-950 px-5 py-3
             font-semibold text-white transition hover:bg-slate-800"
    >
      Ir a resultados
    </RouterLink>
  </div>
</section>

            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const seccionActiva = ref('recursos')
import { RouterLink } from 'vue-router'
import NavbarAteneu from '../../../components/ateneu/NavbarAteneu.vue'

const API_URL = 'http://localhost:5555/api/escuelas/recursos'
const escuela = 'Ateneu'

const recursos = ref([])
const cargando = ref(true)
const error = ref(false)


// Sesión del profesor
const profesor = ref(null)
const sesionComprobada = ref(false)
const recursoEditando = ref(null)
const guardandoEdicion = ref(false)

// Grupos en los que puede publicar el profesor
const misGrupos = ref([])

// Formulario para publicar recursos
const nuevoRecurso = ref({
  titulo: '',
  descripcion: '',
  tipo: 'DOCUMENTO',
  url: '',
  grupo_id: ''
})

// Estado del formulario
const publicando = ref(false)
const mensajePublicacion = ref('')
const errorPublicacion = ref(false)

const inputArchivo = ref(null)
const archivoSeleccionado = ref(null)

const LIMITE_ARCHIVO = 20 * 1024 * 1024

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

    mensajePublicacion.value =
      'El archivo no puede superar los 20 MB.'

    errorPublicacion.value = true
    return
  }

  archivoSeleccionado.value = archivo
}

async function cargarRecursos() {
    cargando.value = true
    error.value = false

    try {
        const respuesta = await fetch(
            `${API_URL}?escuela=${encodeURIComponent('Ateneu Aula 502')}`
        )

        if (!respuesta.ok) {
            throw new Error('No se pudieron cargar los recursos')
        }

        const resultado = await respuesta.json()

        if (resultado.ok === false) {
            throw new Error(resultado.mensaje || 'Error al cargar recursos')
        }

        recursos.value = Array.isArray(resultado.datos)
            ? resultado.datos
            : []
          
    } catch (err) {
        console.error('Error al cargar los recursos de Ateneu:', err)
        error.value = true
    } finally {
        cargando.value = false
    }
}

function esMiRecurso(recurso) {
    return (
        profesor.value &&
        Number(recurso.profesor_id) === Number(profesor.value.id)
    )
}

function editarRecurso(recurso) {
    if (!esMiRecurso(recurso)) {
        return
    }

    recursoEditando.value = { ...recurso }
}


async function guardarEdicionRecurso() {
    if (!recursoEditando.value || !esMiRecurso(recursoEditando.value)) {
        return
    }

    guardandoEdicion.value = true

    try {
        const respuesta = await fetch(
            `${API_URL}/${recursoEditando.value.id}`,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titulo: recursoEditando.value.titulo,
                    descripcion: recursoEditando.value.descripcion
                })
            }
        )

        const resultado = await respuesta.json()

        if (!respuesta.ok || resultado.ok !== true) {
            throw new Error(
                resultado.mensaje || 'No se pudo actualizar el recurso.'
            )
        }

        await cargarRecursos()
        recursoEditando.value = null

        alert('Recurso actualizado correctamente.')
    } catch (err) {
        console.error('Error al actualizar el recurso:', err)
        alert(err.message || 'No se pudo actualizar el recurso.')
    } finally {
        guardandoEdicion.value = false
    }
}


async function eliminarRecurso(recurso) {
    if (!esMiRecurso(recurso)) {
        return
    }

    const confirmar = window.confirm(
        `¿Seguro que quieres eliminar el recurso "${recurso.titulo}"? Esta acción no se puede deshacer.`
    )

    if (!confirmar) {
        return
    }

    try {
        const respuesta = await fetch(
            `${API_URL}/${recurso.id}`,
            {
                method: 'DELETE',
                credentials: 'include'
            }
        )

        const resultado = await respuesta.json()

        if (!respuesta.ok || resultado.ok !== true) {
            throw new Error(
                resultado.mensaje || 'No se pudo eliminar el recurso.'
            )
        }

        if (recursoEditando.value?.id === recurso.id) {
            recursoEditando.value = null
        }

        await cargarRecursos()

        alert('Recurso eliminado correctamente.')
    } catch (err) {
        console.error('Error al eliminar el recurso:', err)
        alert(err.message || 'No se pudo eliminar el recurso.')
    }
}

function obtenerUrl(recurso) {
  const ruta =
    recurso.url ||
    recurso.archivo_url ||
    recurso.ruta_archivo ||
    recurso.archivo ||
    recurso.ruta

  if (!ruta) return ''

  if (/^https?:\/\//i.test(ruta)) {
    return ruta
  }

  const rutaLimpia = ruta.replace(/^\/+/, '')

  return `http://localhost:5555/${rutaLimpia}`
}

// Comprobar la sesión del profesor
async function comprobarSesionProfesor() {
  try {
    const respuesta = await fetch(
      'http://localhost:5555/api/acceso-profesor/session',
      {
        method: 'GET',
        credentials: 'include'
      }
    )

    const resultado = await respuesta.json()

    if (!respuesta.ok || resultado.ok !== true) {
      profesor.value = null
      return
    }

    const datosProfesor = resultado.datos || resultado.profesor || resultado

    // Esta página solo permite publicar en Ateneu Aula 502.
    if (Number(datosProfesor.escuelaId) !== 2) {
      profesor.value = null
      return
    }

    profesor.value = datosProfesor

    await cargarMisGrupos()
  } catch (err) {
    console.error('Error al comprobar la sesión del profesor:', err)
    profesor.value = null
  } finally {
    sesionComprobada.value = true
  }
}

// Cargar únicamente los grupos asignados al profesor
async function cargarMisGrupos() {
  try {
    const respuesta = await fetch(
      `${API_URL}/mis-grupos`,
      {
        method: 'GET',
        credentials: 'include'
      }
    )

    const resultado = await respuesta.json()

    if (!respuesta.ok || resultado.ok !== true) {
      throw new Error(
        resultado.mensaje || 'No se pudieron cargar los grupos.'
      )
    }

    misGrupos.value = Array.isArray(resultado.datos)
      ? resultado.datos
      : []
  } catch (err) {
    console.error('Error al cargar los grupos:', err)
    misGrupos.value = []
  }
}



async function publicarRecurso() {
  mensajePublicacion.value = ''
  errorPublicacion.value = false

  const titulo = nuevoRecurso.value.titulo.trim()
  const descripcion = nuevoRecurso.value.descripcion.trim()
  const url = nuevoRecurso.value.url.trim()
  const tipo = nuevoRecurso.value.tipo
  const grupoId = nuevoRecurso.value.grupo_id
  const archivo = archivoSeleccionado.value

  if (!titulo) {
    mensajePublicacion.value = 'El título es obligatorio.'
    errorPublicacion.value = true
    return
  }

  if (!archivo && !url) {
    mensajePublicacion.value =
      'Selecciona un archivo o introduce una URL.'
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
      const urlValidar = new URL(url)

      if (!['http:', 'https:'].includes(urlValidar.protocol)) {
        throw new Error('Protocolo no permitido')
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
  formulario.append('tipo', tipo)
  formulario.append('url', url)
  formulario.append('grupo_id', grupoId)

  if (archivo) {
    formulario.append('archivo', archivo)
  }

  publicando.value = true

  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      credentials: 'include',
      body: formulario
    })

    const resultado = await respuesta.json()

    if (!respuesta.ok || resultado.ok !== true) {
      throw new Error(
        resultado.mensaje || 'No se pudo publicar el recurso.'
      )
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
    console.error('Error al publicar el recurso:', err)
    mensajePublicacion.value =
      err.message || 'Ha ocurrido un error al publicar el recurso.'
    errorPublicacion.value = true
  } finally {
    publicando.value = false
  }
}


onMounted(() => {
  cargarRecursos()
  comprobarSesionProfesor()
})
</script>
