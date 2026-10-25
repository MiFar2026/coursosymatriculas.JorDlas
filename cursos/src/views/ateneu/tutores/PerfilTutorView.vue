

<template>
  <!-- Mientras se comprueba la sesión -->
  <div
    v-if="comprobandoSesion"
    class="min-h-screen flex items-center justify-center bg-gray-50/50 text-black"
  >
    <p role="status">
      Comprobando la sesión del profesorado...
    </p>
  </div>

  <!-- Página del profesor -->
  <div
    v-else-if="profesor"
    class="min-h-screen text-gray-800 relative"
  >
    <!-- Foto de fondo con transparencia -->
    <div
      class="fixed inset-0 pointer-events-none"
      aria-hidden="true"
      style="
        background-image: url('/fotos/prof/prof.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        opacity: 0.20;
        z-index: 0;
      "
    ></div>

    <!-- Contenido por encima de la foto -->
    <div class="relative" style="z-index: 1;">
      <NavbarAteneu />

      <main class="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <!-- ENCABEZADO -->
        <header class="mb-10">
          <p class="text-sm uppercase tracking-widest font-bold text-teal-700 mb-2">
            Ateneu Barcelonés Aula 502
          </p>

          <h1 class="text-3xl sm:text-4xl font-bold mb-3">
            Espacio de tutores
          </h1>

          <p class="text-gray-600 max-w-3xl">
            Gestiona los alumnos, revisa las tareas, comparte recursos educativos,
            publica avisos y comunícate con tus estudiantes.
          </p>

          <div class="mt-5 flex flex-wrap items-center justify-between gap-4">
            <p class="text-sm text-gray-600">
              Sesión de {{ profesor.nombre }} {{ profesor.apellidos }}
            </p>

            <button
              type="button"
              @click="cerrarSesion"
              class="rounded-lg bg-red-700 px-5 py-3 font-bold text-white hover:bg-red-800"
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <!-- PERFIL DEL PROFESOR -->
        <section class="bg-white border rounded-2xl shadow-sm p-6 sm:p-8 mb-10">
          
<div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
  <div class="flex-shrink-0">
    <img
      v-if="profesor.foto && !errorFoto"
      :key="profesor.foto"
      :src="urlFoto"
      :alt="`Foto de ${profesor.nombre} ${profesor.apellidos}`"
      class="w-32 h-32 rounded-full object-cover border-4 border-teal-100 shadow-sm"
      @error="errorFoto = true"
    />

    <div
      v-else
      class="w-32 h-32 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-3xl font-bold border-4 border-teal-200"
      aria-label="Avatar del profesor"
    >
      {{ inicialesProfesor }}
    </div>
  </div>

  <div class="flex-1 min-w-0 text-center sm:text-left">
    <h2 class="text-2xl font-bold">
      {{ profesor.nombre }} {{ profesor.apellidos }}
    </h2>

    <p class="text-gray-600 mt-1">
      {{ profesor.especialidad || 'Profesor/a' }}
    </p>

    <div class="mt-4 space-y-2 text-sm text-gray-700">
      <p>
        <strong>Correo electrónico:</strong>
        {{ profesor.email || 'No indicado' }}
      </p>

      <p>
        <strong>Teléfono:</strong>
        {{ profesor.telefono || 'No indicado' }}
      </p>
    </div>
  </div>

  <div class="flex flex-col items-center sm:items-end gap-3 sm:ml-4 sm:pt-2">
    <button
      type="button"
      @click="abrirSelectorFoto"
      :disabled="subiendoFoto"
      class="rounded-lg bg-teal-700 hover:bg-teal-800 disabled:bg-gray-400 text-white font-bold px-5 py-3"
    >
      {{ subiendoFoto ? 'Subiendo foto...' : 'Cambiar foto' }}
    </button>

    <input
      ref="selectorFoto"
      type="file"
      accept="image/jpeg,image/png,image/webp"
      class="hidden"
      @change="subirFoto"
    />

    <p class="text-xs text-gray-500 mt-1 text-right">
      Formatos permitidos: JPG, PNG y WEBP. Tamaño máximo: 5 MB.
    </p>
  </div>
</div>


          <p
            v-if="mensajePerfil"
            role="status"
            aria-live="polite"
            class="mt-5 rounded-lg p-3 text-sm"
            :class="errorPerfil
              ? 'bg-red-100 text-red-800'
              : 'bg-green-100 text-green-800'"
          >
            {{ mensajePerfil }}
          </p>

          <!-- EDITAR DATOS -->
          <div class="mt-6 border-t pt-6">
            <h3 class="text-lg font-bold mb-4">
              Editar mis datos
            </h3>

            <form
              @submit.prevent="guardarPerfil"
              class="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div>
                <label for="perfil-nombre" class="block font-semibold mb-2">
                  Nombre
                </label>

                <input
                  id="perfil-nombre"
                  v-model.trim="formPerfil.nombre"
                  type="text"
                  maxlength="100"
                  required
                  autocomplete="given-name"
                  class="w-full border rounded-lg p-3"
                  :disabled="guardandoPerfil"
                />
              </div>

              <div>
                <label for="perfil-apellidos" class="block font-semibold mb-2">
                  Apellidos
                </label>

                <input
                  id="perfil-apellidos"
                  v-model.trim="formPerfil.apellidos"
                  type="text"
                  maxlength="150"
                  required
                  autocomplete="family-name"
                  class="w-full border rounded-lg p-3"
                  :disabled="guardandoPerfil"
                />
              </div>

              <div>
                <label for="perfil-email" class="block font-semibold mb-2">
                  Correo electrónico
                </label>

                <input
                  id="perfil-email"
                  v-model.trim="formPerfil.email"
                  type="email"
                  maxlength="254"
                  required
                  autocomplete="email"
                  class="w-full border rounded-lg p-3"
                  :disabled="guardandoPerfil"
                />
              </div>

              <div>
                <label for="perfil-telefono" class="block font-semibold mb-2">
                  Teléfono
                </label>

                <input
                  id="perfil-telefono"
                  v-model.trim="formPerfil.telefono"
                  type="tel"
                  maxlength="30"
                  autocomplete="tel"
                  class="w-full border rounded-lg p-3"
                  :disabled="guardandoPerfil"
                />
              </div>

              <div>
                <label for="perfil-especialidad" class="block font-semibold mb-2">
                  Especialidad
                </label>

                <input
                  id="perfil-especialidad"
                  v-model.trim="formPerfil.especialidad"
                  type="text"
                  maxlength="150"
                  class="w-full border rounded-lg p-3"
                  :disabled="guardandoPerfil"
                />
              </div>

              <!-- BOTÓN GUARDAR CAMBIOS -->
              <div class="sm:col-span-2">
                <button
                  type="submit"
                  :disabled="guardandoPerfil"
                  class="rounded-lg bg-teal-700 hover:bg-teal-800 disabled:bg-gray-400 text-white font-bold px-5 py-3"
                >
                  {{ guardandoPerfil ? 'Guardando...' : 'Guardar cambios' }}
                </button>
              </div>
            </form>
          </div>
        </section>

        <!-- MIS CURSOS Y HORARIOS ASIGNADOS -->
        <section class="mb-8 rounded-2xl border border-indigo-900 bg-white shadow-sm">

          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 rounded-2xl p-5 text-left transition hover:bg-blue-50"
            :aria-expanded="mostrarCursosAsignados"
            @click="mostrarCursosAsignados = !mostrarCursosAsignados"
          >
            <div>
              <h2 class="text-xl font-bold text-gray-800">
                Mis cursos y horarios asignados
              </h2>

              <p class="mt-1 text-sm text-gray-600">
                Consulta tus cursos, grupos y horarios de Ateneu Aula 502.
              </p>

              <p class="mt-2 text-xs text-gray-500">
                {{ (profesor.asignaciones || []).length }} asignaciones de horario
              </p>
            </div>

            <icon
              name="chevron-down"
              size="22"
              class="shrink-0 transition-transform duration-200"
              :class="{ 'rotate-180': mostrarCursosAsignados }"
            />
          </button>

          <div
            v-if="mostrarCursosAsignados"
            class="space-y-4 border-t border-blue-100 p-5"
          >
            <div
              v-if="(profesor.asignaciones || []).length === 0"
              class="rounded-xl bg-gray-50 p-4 text-sm text-gray-600"
            >
              No tienes cursos o grupos asignados actualmente.
            </div>

            <article
              v-for="asignacion in profesor.asignaciones"
              :key="`${asignacion.grupoId}-${asignacion.horarioId || 'sin-horario'}`"
              class="rounded-xl border border-gray-200 p-4"
            >
              <h3 class="font-semibold text-gray-800">
                {{ asignacion.curso || 'Curso sin nombre' }}
              </h3>

              <p class="mt-1 text-sm text-gray-600">
                <strong>Grupo:</strong> {{ asignacion.grupo || 'No especificado' }}
              </p>

              <p class="text-sm text-gray-600">
                <strong>Turno:</strong> {{ asignacion.turno || 'No especificado' }}
              </p>

              <p class="text-sm text-gray-600">
                <strong>Aula:</strong> {{ asignacion.aula || 'No especificada' }}
              </p>

              <p class="text-sm text-gray-600">
                <strong>Escuela:</strong> {{ asignacion.escuela || 'No especificada' }}
              </p>

              <div class="mt-3 border-t border-gray-100 pt-3">
                <p class="mb-2 text-sm font-semibold text-gray-700">
                  Horario
                </p>

                <p
                  v-if="asignacion.horarioId"
                  class="text-sm text-gray-600"
                >
                  {{ asignacion.diaSemana }}:
                  {{ String(asignacion.horaInicio).slice(0, 5) }}
                  – {{ String(asignacion.horaFin).slice(0, 5) }}
                </p>

                <p v-else class="text-sm text-amber-700">
                  Este grupo todavía no tiene un horario asignado.
                </p>
              </div>
            </article>
          </div>
        </section>

        <!-- AVISOS -->
        <section class="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 class="text-xl font-bold mb-2">
                📢 Avisos de Ateneu Barcelonès
              </h2>

              <p class="text-gray-700">
                Los avisos pueden ser permanentes o temporales.
                Los temporales expirarán a las 72 horas.
              </p>
            </div>

            <button
              type="button"
              @click="mostrarFormularioAviso = !mostrarFormularioAviso"
              class="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg px-5 py-3"
            >
              {{ mostrarFormularioAviso ? 'Cerrar formulario' : 'Crear aviso' }}
            </button>
          </div>

          <form
            v-if="mostrarFormularioAviso"
            @submit.prevent="publicarAviso"
            class="mt-6 bg-white rounded-xl border border-amber-200 p-5 space-y-5"
          >
            <div>
              <label for="grupo-aviso" class="block font-semibold mb-2">
                Grupo destinatario
              </label>

              <select
                id="grupo-aviso"
                v-model="aviso.grupoId"
                @change="cambiarGrupo"
                required
                :disabled="cargandoGrupos || publicandoAviso || grupos.length === 0"
                class="w-full border rounded-lg p-3 bg-white disabled:bg-gray-100"
              >
                <option value="" disabled>
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
              <label for="destinatario-aviso" class="block font-semibold mb-2">
                ¿A quién va dirigido el aviso?
              </label>

              <select
                id="destinatario-aviso"
                v-model="aviso.destinatario"
                @change="cambiarDestinatario"
                :disabled="publicandoAviso"
                class="w-full border rounded-lg p-3 bg-white"
              >
                <option value="GRUPO">A todo el grupo</option>
                <option value="INDIVIDUAL">A un alumno concreto</option>
              </select>
            </div>

            <div v-if="aviso.destinatario === 'INDIVIDUAL'">
              <label for="alumno-aviso" class="block font-semibold mb-2">
                Alumno destinatario
              </label>

              <select
                id="alumno-aviso"
                v-model="aviso.alumnoId"
                required
                :disabled="cargandoAlumnos || alumnosGrupo.length === 0 || publicandoAviso"
                class="w-full border rounded-lg p-3 bg-white disabled:bg-gray-100"
              >
                <option value="" disabled>
                  Selecciona un alumno
                </option>

                <option
                  v-for="alumno in alumnosGrupo"
                  :key="alumno.id"
                  :value="String(alumno.id)"
                >
                  {{ alumno.nombre }} {{ alumno.apellidos }}
                </option>
              </select>

              <p v-if="cargandoAlumnos" class="mt-2 text-sm text-gray-500">
                Cargando alumnos del grupo...
              </p>

              <p
                v-else-if="alumnosGrupo.length === 0"
                class="mt-2 text-sm text-amber-800"
              >
                No hay alumnos con matrícula activa en este grupo.
              </p>
            </div>

            <div>
              <label for="titulo-aviso" class="block font-semibold mb-2">
                Título del aviso
              </label>

              <input
                id="titulo-aviso"
                v-model.trim="aviso.titulo"
                required
                maxlength="200"
                class="w-full border rounded-lg p-3"
                placeholder="Ej.: Cambio de horario"
                :disabled="publicandoAviso"
              />
            </div>

            <div>
              <label for="mensaje-aviso" class="block font-semibold mb-2">
                Contenido
              </label>

              <textarea
                id="mensaje-aviso"
                v-model.trim="aviso.mensaje"
                required
                rows="4"
                class="w-full border rounded-lg p-3"
                placeholder="Escribe el aviso..."
                :disabled="publicandoAviso"
              ></textarea>
            </div>

            <div>
              <label for="tipo-aviso" class="block font-semibold mb-2">
                Duración
              </label>

              <select
                id="tipo-aviso"
                v-model="aviso.tipo"
                class="w-full border rounded-lg p-3 bg-white"
                :disabled="publicandoAviso"
              >
                <option value="PERMANENTE">Permanente</option>
                <option value="DIARIO">Temporal: máximo 72 horas</option>
              </select>
            </div>

            <button
              type="submit"
              :disabled="
                publicandoAviso ||
                cargandoGrupos ||
                !aviso.grupoId ||
                grupos.length === 0 ||
                (aviso.destinatario === 'INDIVIDUAL' &&
                  (!aviso.alumnoId || alumnosGrupo.length === 0))
              "
              class="bg-teal-700 hover:bg-teal-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-lg px-5 py-3"
            >
              {{ publicandoAviso ? 'Publicando...' : 'Publicar aviso' }}
            </button>

            <p class="text-sm text-gray-500">
              Los avisos permanentes no tienen fecha de expiración.
              Los temporales se configuran en el servidor para expirar a las 72 horas.
            </p>
          </form>

          <p
            v-if="mensajeAviso"
            role="status"
            aria-live="polite"
            class="mt-4 rounded-lg p-3 text-sm font-semibold"
            :class="errorAviso
              ? 'bg-red-100 text-red-800'
              : 'bg-green-100 text-green-800'"
          >
            {{ mensajeAviso }}
          </p>
        </section>

        <!-- GESTIÓN EDUCATIVA -->
        <section>
          <h2 class="text-2xl font-bold mb-6">
            Gestión educativa
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <RouterLink
              to="/ateneu/alumnos"
              class="tarjeta border-t-4 border-teal-600"
            >
              <span class="text-3xl">👩‍🎓</span>
              <h3 class="titulo-tarjeta">Alumnos</h3>
              <p class="texto-tarjeta">
                Acceder al espacio del alumnado de Ateneu Aula 502.
              </p>
            </RouterLink>

        
<RouterLink
  to="/ateneu/recursos"
  class="tarjeta border-t-4 border-green-600"
>
  <span class="text-3xl">📚</span>

  <h3 class="titulo-tarjeta">
    Recursos, tareas y resultados
  </h3>

  <p class="texto-tarjeta">
    Publicar materiales y actividades, consultar las tareas
    enviadas por los alumnos, registrar notas y comentarios
    y devolver documentos corregidos.
  </p>
</RouterLink>

            <RouterLink
              to="/ateneu/tutores/mensaje-profesor"
              class="tarjeta border-t-4 border-red-500"
            >
              <span class="text-3xl">💬</span>
              <h3 class="titulo-tarjeta">Mensajes</h3>
              <p class="texto-tarjeta">
                Enviar y recibir mensajes de los alumnos de esta escuela.
              </p>
            </RouterLink>

            <RouterLink
              to="/ateneu/alumnos/foro"
              class="tarjeta border-t-4 border-purple-600"
            >
              <span class="text-3xl">🌍</span>
              <h3 class="titulo-tarjeta">Foro de estudiantes</h3>
              <p class="texto-tarjeta">
                Participar en los foros de los cursos y el foro general del Ateneu.
              </p>
            </RouterLink>

            <RouterLink
              to="/ateneu/tutores/foro-profesores"
              class="tarjeta border-t-4 border-gray-700"
            >
              <span class="text-3xl">🔒</span>
              <h3 class="titulo-tarjeta">Foro del profesorado</h3>
              <p class="texto-tarjeta">
                Acceder al foro común del equipo docente de Ateneu Barcelonès y de la Biblioteca Joan Miró.
              </p>

              <span class="inline-block mt-4 font-bold text-teal-700">
                Entrar al foro →
              </span>
            </RouterLink>
          </div>
        </section>
      </main>

      <!-- PIE DE PÁGINA -->
      <footer class="border-t bg-white py-6 mt-12">
        <p class="text-center text-sm text-gray-500">
          ExAequo · Escuela Ateneu Aula 502 · Espacio del profesorado
        </p>
      </footer>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import NavbarAteneu from '../../../components/ateneu/NavbarAteneu.vue'

const router = useRouter()

const baseAPI = (
  import.meta.env.VITE_API_URL || 'http://localhost:5555'
).replace(/\/+$/, '')

const comprobandoSesion = ref(true)
const profesor = ref({
  nombre: '',
  apellidos: '',
  asignaciones: []
})
const mostrarCursosAsignados = ref(false)
const selectorFoto = ref(null)
const subiendoFoto = ref(false)
const errorFoto = ref(false)
const mensajePerfil = ref('')
const errorPerfil = ref(false)

const mostrarFormularioAviso = ref(false)
const mensajeAviso = ref('')
const errorAviso = ref(false)

const grupos = ref([])
const alumnosGrupo = ref([])

const cargandoGrupos = ref(false)
const cargandoAlumnos = ref(false)
const publicandoAviso = ref(false)

const aviso = ref({
  grupoId: '',
  destinatario: 'GRUPO',
  alumnoId: '',
  titulo: '',
  mensaje: '',
  tipo: 'DIARIO'
})

const urlFoto = computed(() => {
  if (!profesor.value?.foto) return ''

  const foto = profesor.value.foto

  if (/^https?:\/\//i.test(foto)) {
    return foto
  }

  return `${baseAPI}/${foto.replace(/^\/+/, '')}`
})

const inicialesProfesor = computed(() => {
  const nombre = profesor.value?.nombre?.trim()?.charAt(0) || ''
  const apellidos = profesor.value?.apellidos?.trim()?.charAt(0) || ''

  return `${nombre}${apellidos}`.toUpperCase() || 'P'
})

function mostrarError(mensaje) {
  errorAviso.value = true
  mensajeAviso.value = mensaje
}

function mostrarExito(mensaje) {
  errorAviso.value = false
  mensajeAviso.value = mensaje
}

async function leerRespuesta(respuesta) {
  const resultado = await respuesta.json().catch(() => ({}))

  if (!respuesta.ok || resultado.ok === false) {
    throw new Error(
      resultado.mensaje || 'No se ha podido completar la operación.'
    )
  }

  return resultado
}

function mostrarMensajePerfil(mensaje, esError = false) {
  errorPerfil.value = esError
  mensajePerfil.value = mensaje
}

async function cargarPerfil() {
  const respuesta = await fetch(`${baseAPI}/api/perfil-profesor/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json'
    }
  })

  const resultado = await leerRespuesta(respuesta)

  if (!resultado.datos) {
    throw new Error('El servidor no ha devuelto los datos del perfil.')
  }

  profesor.value = {
    ...profesor.value,
    ...resultado.datos
  }

  errorFoto.value = false
sincronizarFormularioPerfil(profesor.value)
}

function abrirSelectorFoto() {
  selectorFoto.value?.click()
}

async function subirFoto(evento) {
  const archivo = evento.target.files?.[0]

  // Permite seleccionar el mismo archivo de nuevo si fuera necesario.
  evento.target.value = ''

  if (!archivo) return

  mostrarMensajePerfil('')

  const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp']

  if (!tiposPermitidos.includes(archivo.type)) {
    mostrarMensajePerfil('La foto debe ser JPG, PNG o WEBP.', true)
    return
  }

  if (archivo.size > 5 * 1024 * 1024) {
    mostrarMensajePerfil('La imagen no puede superar los 5 MB.', true)
    return
  }

  const formulario = new FormData()
  formulario.append('foto', archivo)

  subiendoFoto.value = true

  try {
    const respuesta = await fetch(`${baseAPI}/api/perfil-profesor/foto`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json'
      },
      body: formulario
    })

    const resultado = await leerRespuesta(respuesta)

    if (resultado.foto) {
      profesor.value = {
        ...profesor.value,
        foto: resultado.foto
      }

      errorFoto.value = false
    } else {
      await cargarPerfil()
    }

    mostrarMensajePerfil(
      resultado.mensaje || 'La foto de perfil se ha actualizado correctamente.'
    )
  } catch (error) {
    mostrarMensajePerfil(
      error.message || 'No se ha podido subir la foto.',
      true
    )
  } finally {
    subiendoFoto.value = false
  }
}

// Cargar los grupos asignados al profesor de la sesión.
async function cargarGrupos() {
  cargandoGrupos.value = true
  grupos.value = []
  alumnosGrupo.value = []

  try {
    const respuesta = await fetch(`${baseAPI}/api/avisos/mis-grupos`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json'
      }
    })

    const resultado = await leerRespuesta(respuesta)

    grupos.value = Array.isArray(resultado.grupos)
      ? resultado.grupos
      : []

    if (grupos.value.length > 0) {
      aviso.value.grupoId = String(grupos.value[0].id)
      await cargarAlumnosDelGrupo()
    } else {
      aviso.value.grupoId = ''
      aviso.value.alumnoId = ''
      alumnosGrupo.value = []
    }
  } catch (error) {
    mostrarError(
      error.message || 'No se han podido cargar los grupos del profesor.'
    )
  } finally {
    cargandoGrupos.value = false
  }
}

// Cargar los alumnos del grupo seleccionado.
async function cargarAlumnosDelGrupo() {
  alumnosGrupo.value = []
  aviso.value.alumnoId = ''

  const grupoId = aviso.value.grupoId

  if (!grupoId) return

  cargandoAlumnos.value = true

  try {
    const respuesta = await fetch(
      `${baseAPI}/api/avisos/mis-grupos/${encodeURIComponent(grupoId)}/alumnos`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json'
        }
      }
    )

    const resultado = await leerRespuesta(respuesta)

    alumnosGrupo.value = Array.isArray(resultado.alumnos)
      ? resultado.alumnos
      : []

    if (
      aviso.value.destinatario === 'INDIVIDUAL' &&
      alumnosGrupo.value.length > 0
    ) {
      aviso.value.alumnoId = String(alumnosGrupo.value[0].id)
    }
  } catch (error) {
    mostrarError(
      error.message || 'No se han podido cargar los alumnos del grupo.'
    )
  } finally {
    cargandoAlumnos.value = false
  }
}

async function cambiarGrupo() {
  mensajeAviso.value = ''
  errorAviso.value = false

  await cargarAlumnosDelGrupo()
}

function cambiarDestinatario() {
  mensajeAviso.value = ''
  errorAviso.value = false
  aviso.value.alumnoId = ''

  if (
    aviso.value.destinatario === 'INDIVIDUAL' &&
    alumnosGrupo.value.length > 0
  ) {
    aviso.value.alumnoId = String(alumnosGrupo.value[0].id)
  }
}

// Publicar avisos.
async function publicarAviso() {
  mensajeAviso.value = ''
  errorAviso.value = false

  if (!aviso.value.grupoId) {
    mostrarError('Selecciona un grupo antes de publicar el aviso.')
    return
  }

  if (
    aviso.value.destinatario === 'INDIVIDUAL' &&
    !aviso.value.alumnoId
  ) {
    mostrarError('Selecciona el alumno que recibirá el aviso.')
    return
  }

  publicandoAviso.value = true

  try {
    const datosAviso = {
      grupoId: Number(aviso.value.grupoId),
      alumnoId: aviso.value.destinatario === 'INDIVIDUAL'
        ? Number(aviso.value.alumnoId)
        : null,
      titulo: aviso.value.titulo,
      mensaje: aviso.value.mensaje,
      tipo: aviso.value.tipo
    }

    const respuesta = await fetch(`${baseAPI}/api/avisos`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(datosAviso)
    })

    const resultado = await leerRespuesta(respuesta)

    mostrarExito(
      resultado.mensaje || 'El aviso se ha publicado correctamente.'
    )

    aviso.value.titulo = ''
    aviso.value.mensaje = ''
  } catch (error) {
    mostrarError(
      error.message || 'No se ha podido publicar el aviso.'
    )
  } finally {
    publicandoAviso.value = false
  }
}

onMounted(async () => {
  try {
    const respuesta = await fetch(
      `${baseAPI}/api/acceso-profesor/session`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json'
        }
      }
    )

    const resultado = await leerRespuesta(respuesta)

    if (!resultado.profesor) {
      throw new Error('No se ha encontrado el profesor de la sesión.')
    }

    // Ateneu corresponde a la escuela ID 2.
    if (Number(resultado.profesor.escuelaId) !== 2) {
      await router.replace('/ateneu/tutores/acceso')
      return
    }

    profesor.value = resultado.profesor

    // Si falla la carga del perfil, no ocultamos el resto de la página.
    try {
      await cargarPerfil()
    } catch (error) {
      console.error('Error al cargar los datos del perfil:', error)
      mostrarMensajePerfil(
        error.message || 'No se han podido cargar los datos del perfil.',
        true
      )
    }

    await cargarGrupos()
  } catch (error) {
    console.error('Error al comprobar la sesión:', error.message)
    await router.replace('/ateneu/tutores/acceso')
  } finally {
    comprobandoSesion.value = false
  }
})

async function cerrarSesion() {
  try {
    await fetch(`${baseAPI}/api/acceso-profesor/logout`, {
      method: 'POST',
      credentials: 'include'
    })
  } catch (error) {
    console.error('No se pudo contactar con el servidor para cerrar sesión.')
  }

  profesor.value = null
  await router.replace('/ateneu/tutores/acceso')
}
const guardandoPerfil = ref(false)

const formPerfil = ref({
  nombre: '',
  apellidos: '',
  email: '',
  telefono: '',
  especialidad: ''
})

function sincronizarFormularioPerfil(datos) {
  formPerfil.value = {
    nombre: datos.nombre || '',
    apellidos: datos.apellidos || '',
    email: datos.email || '',
    telefono: datos.telefono || '',
    especialidad: datos.especialidad || ''
  }
}

async function guardarPerfil() {
  mensajePerfil.value = ''

  const datos = {
    nombre: formPerfil.value.nombre.trim(),
    apellidos: formPerfil.value.apellidos.trim(),
    email: formPerfil.value.email.trim(),
    telefono: formPerfil.value.telefono.trim(),
    especialidad: formPerfil.value.especialidad.trim()
  }

  if (!datos.nombre || !datos.apellidos || !datos.email) {
    mostrarMensajePerfil(
      'Nombre, apellidos y correo electrónico son obligatorios.',
      true
    )
    return
  }

  guardandoPerfil.value = true

  try {
    const respuesta = await fetch(`${baseAPI}/api/perfil-profesor/me`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(datos)
    })

    const resultado = await leerRespuesta(respuesta)

    // El controlador puede devolver los datos actualizados.
    if (resultado.datos) {
      profesor.value = {
        ...profesor.value,
        ...resultado.datos
      }
      sincronizarFormularioPerfil(resultado.datos)
    } else {
      // Si no los devuelve, vuelve a leerlos desde el servidor.
      await cargarPerfil()
    }

    mostrarMensajePerfil(
      resultado.mensaje || 'Tus datos se han actualizado correctamente.'
    )
  } catch (error) {
    mostrarMensajePerfil(
      error.message || 'No se han podido guardar los cambios.',
      true
    )
  } finally {
    guardandoPerfil.value = false
  }
}
</script>

<style scoped>
.tarjeta {
  display: block;
  width: 100%;
  padding: 1.5rem;
  background: white;
  border-radius: 1rem;
  border-right: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  border-left: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgb(0 0 0 / 5%);
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.tarjeta:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgb(0 0 0 / 10%);
}

.titulo-tarjeta {
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.texto-tarjeta {
  color: #4b5563;
  line-height: 1.6;
}
</style>
