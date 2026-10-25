
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
            <NavbarJoanmiro />
        </div>
    </div>


        <main class="relative">

<!-- PUBLICAR RECURSOS: SOLO PROFESORADO DE Joan Miró -->
<section
  v-if="sesionComprobada && profesor"
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
          Enlace del recurso *
        </label>
        <input
          id="recurso-url"
          v-model="nuevoRecurso.url"
          type="url"
          required
          class="w-full rounded-lg border border-gray-300 px-4 py-3"
          placeholder="https://..."
        />
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
<option value="">Toda la escuela Biblioteca Joan Miró</option>          <option
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

            <!-- CABECERA -->
            <section
                class="bg-gradient-to-br from-red-950 via-red-900 to-red-800
                       text-white px-6 py-16"
            >
                <div class="max-w-5xl mx-auto text-center">

                    <p
                        class="text-sm font-bold uppercase tracking-widest
                               text-amber-200 mb-3"
                    >
                        Escuela Biblioteca Joan Miró
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

            <div class="max-w-6xl mx-auto px-6 py-12 space-y-12">

                <!-- RECURSOS DEL PROFESORADO -->
                <section>

                    <div class="mb-6">
                        <h2 class="text-2xl font-bold mb-2">
                            Recursos del profesorado
                        </h2>

                        <p class="text-gray-600">
                            Aquí encontrarás los materiales publicados
                            por los profesores de la Escuela Biblioteca
                            Joan Miró.
                        </p>
                    </div>

                    <!-- CARGANDO -->
                    <div
                        v-if="cargando"
                        class="bg-white border rounded-2xl p-8 text-center"
                    >
                        Cargando recursos...
                    </div>

                    <!-- ERROR -->
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

                    <!-- SIN RECURSOS -->
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

                    <!-- LISTA DE RECURSOS -->
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
                        </article>
                    </div>

                </section>

                <!-- RECURSOS DE CONSULTA -->
                <section>

                    <div class="mb-6">
                        <h2 class="text-2xl font-bold mb-2">
                            Recursos de consulta
                        </h2>

                        <p class="text-gray-600">
                            Enlaces y materiales para practicar y ampliar
                            los conocimientos de forma autónoma.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <!-- CURSOS GENERALES -->
                        <article
                            class="bg-white border border-gray-200
                                   rounded-2xl p-6 shadow-sm"
                        >
                            <h3 class="text-xl font-bold mb-3">
                                Cursos generales
                            </h3>

                            <p class="text-gray-600 mb-5">
                                Consulta los cursos de castellano, catalán
                                y alfabetización de ExAequo.
                            </p>

                            <RouterLink
                                to="/cursos-generales"
                                class="inline-block bg-red-900 text-white
                                       rounded-lg px-4 py-2 hover:bg-red-800"
                            >
                                Ver cursos
                            </RouterLink>
                        </article>

                        <!-- CASTELLANO -->
                        <article
                            class="bg-white border border-gray-200
                                   rounded-2xl p-6 shadow-sm"
                        >
                            <h3 class="text-xl font-bold mb-3">
                                Materiales de castellano
                            </h3>

                            <p class="text-gray-600 mb-5">
                                Accede a ejercicios, lecturas y materiales
                                para practicar español.
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

            </div>
        </main>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import NavbarJoanmiro
    from '../../../components/joanmiro/NavbarJoanmiro.vue'

const API_URL = 'http://localhost:5555/api/escuelas/recursos'
const escuela = 'Biblioteca Joan Miró'

const recursos = ref([])
const cargando = ref(true)
const error = ref(false)


// Sesión del profesor
const profesor = ref(null)
const sesionComprobada = ref(false)

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


async function cargarRecursos() {
    cargando.value = true
    error.value = false

    try {
        const respuesta = await fetch(
            `${API_URL}?escuela=${encodeURIComponent(escuela)}`
        )

        if (!respuesta.ok) {
            throw new Error('No se pudieron cargar los recursos')
        }

        const resultado = await respuesta.json()

        if (resultado.ok === false) {
            throw new Error(
                resultado.mensaje || 'Error al cargar recursos'
            )
        }

        recursos.value = Array.isArray(resultado.datos)
            ? resultado.datos
            : []

    } catch (err) {
        console.error(
            'Error al cargar los recursos de Joan Miró:',
            err
        )

        error.value = true

    } finally {
        cargando.value = false
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

    return `http://localhost:5555/${ruta.replace(/^\/+/, '')}`
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

    // Esta página solo permite publicar en la Biblioteca Joan Miró.
    if (Number(datosProfesor.escuelaId) !== 1) {
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

  if (!titulo || !url) {
    mensajePublicacion.value = 'El título y la URL son obligatorios.'
    errorPublicacion.value = true
    return
  }

  try {
    const urlValidar = new URL(url)

    if (!['http:', 'https:'].includes(urlValidar.protocol)) {
      throw new Error('La URL debe comenzar por http:// o https://')
    }
  } catch {
    mensajePublicacion.value =
      'Introduce una URL válida que comience por https:// o http://.'
    errorPublicacion.value = true
    return
  }

  publicando.value = true

  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titulo,
        descripcion,
        tipo,
        url,
        grupo_id: grupoId === '' ? null : Number(grupoId)
      })
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
