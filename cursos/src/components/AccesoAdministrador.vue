
<template>
  <section class="mx-auto my-10 w-full max-w-6xl px-4">
    <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-8">

      <!-- ACCESO -->
      <button
        v-if="!mostrarFormulario && !sesionIniciada"
        type="button"
        @click="mostrarFormulario = true"
        class="w-full rounded-lg bg-gray-800 px-5 py-3 font-semibold text-white hover:bg-gray-700"
      >
        Acceso administrador
      </button>

      <!-- FORMULARIO DE LOGIN -->
      <div v-if="mostrarFormulario && !sesionIniciada">
        <h2 class="mb-2 text-center text-2xl font-bold text-gray-800">
          Administración ExAequo
        </h2>

        <p class="mb-6 text-center text-gray-600">
          Introduce tus credenciales para acceder al panel.
        </p>

        <form
          @submit.prevent="iniciarSesion"
          class="mx-auto max-w-md space-y-4"
        >
          <div>
            <label for="usuario-admin" class="mb-1 block font-medium">
              Usuario
            </label>

            <input
              id="usuario-admin"
              v-model.trim="usuario"
              type="text"
              autocomplete="username"
              required
              class="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Usuario administrador"
            />
          </div>

          <div>
            <label for="contrasena-admin" class="mb-1 block font-medium">
              Contraseña
            </label>

            <input
              id="contrasena-admin"
              v-model="contrasena"
              type="password"
              autocomplete="current-password"
              required
              class="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Tu contraseña"
            />
          </div>

          <p
            v-if="mensaje"
            role="status"
            class="rounded-lg bg-gray-100 p-3 text-sm text-gray-700"
          >
            {{ mensaje }}
          </p>

          <button
            type="submit"
            :disabled="cargando"
            class="w-full rounded-lg bg-blue-800 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {{ cargando ? 'Comprobando...' : 'Iniciar sesión' }}
          </button>

          <button
            type="button"
            @click="cancelarLogin"
            class="w-full rounded-lg border border-gray-300 px-5 py-2"
          >
            Cancelar
          </button>
        </form>
      </div>

      <!-- PANEL ADMINISTRADOR -->
      <div v-if="sesionIniciada">
        <header
          class="mb-8 flex flex-col justify-between gap-4 border-b pb-6 md:flex-row md:items-center"
        >
          <div>
            <p class="mb-1 text-sm font-bold uppercase tracking-widest text-red-700">
              ExAequo
            </p>

            <h2 class="text-3xl font-bold text-gray-900">
              Panel de administración
            </h2>

            <p class="mt-2 text-gray-600">
              Gestión administrativa y protección de la comunidad educativa.
            </p>
          </div>

          <button
            type="button"
            @click="cerrarSesion"
            class="rounded-lg bg-gray-800 px-5 py-3 font-semibold text-white hover:bg-gray-700"
          >
            Cerrar sesión
          </button>
        </header>

        <p
          v-if="mensaje"
          role="status"
          aria-live="polite"
          class="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-700"
        >
          {{ mensaje }}
        </p>

        <!-- MÓDULOS -->
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <button
            type="button"
            @click="seleccionarModulo('horarios')"
            class="rounded-xl border p-6 text-left transition hover:bg-blue-50"
          >
            <span class="mb-3 block text-3xl">🗓️</span>
            <h3 class="text-xl font-bold">Gestión de horarios</h3>
            <p class="mt-2 text-sm text-gray-600">
              Acceso reservado para conectar la gestión de horarios.
            </p>
          </button>

          <button
            type="button"
            @click="seleccionarModulo('escuelas')"
            class="rounded-xl border p-6 text-left transition hover:bg-blue-50"
          >
            <span class="mb-3 block text-3xl">🏫</span>
            <h3 class="text-xl font-bold">Escuelas y cursos</h3>
            <p class="mt-2 text-sm text-gray-600">
              Gestión futura de Ateneu y Biblioteca Joan Miró.
            </p>
          </button>

          <button
            type="button"
            @click="seleccionarModulo('foros')"
            class="rounded-xl border border-red-200 bg-red-50 p-6 text-left transition hover:bg-red-100"
          >
            <span class="mb-3 block text-3xl">🛡️</span>
            <h3 class="text-xl font-bold">Moderación y convivencia</h3>
            <p class="mt-2 text-sm text-gray-700">
              Consultar y ocultar mensajes de los foros.
            </p>
          </button>

          <button
            type="button"
            @click="seleccionarModulo('archivos')"
            class="rounded-xl border border-blue-200 bg-blue-50 p-6 text-left transition hover:bg-blue-100"
          >
            <span class="mb-3 block text-3xl">📁</span>
            <h3 class="text-xl font-bold">Archivos y materiales</h3>
            <p class="mt-2 text-sm text-gray-700">
              Consultar y retirar materiales publicados.
            </p>
          </button>

          <!-- GESTIÓN DE VOLUNTARIADO -->
          <button
            type="button"
            @click="seleccionarModulo('voluntarios')"
            class="rounded-xl border border-teal-200 bg-teal-50 p-6 text-left transition hover:bg-teal-100"
          >
            <span class="mb-3 block text-3xl">🤝</span>

            <h3 class="text-xl font-bold text-gray-900">
              Gestión de voluntariado
            </h3>

            <p class="mt-2 text-sm text-gray-700">
              Consultar solicitudes, revisar los datos y gestionar su estado.
            </p>
          </button>
        </div>



<!-- GESTIÓN DE HORARIOS -->
<section
  v-if="moduloSeleccionado === 'horarios'"
  class="mt-8"
>
  <HorariosView />
</section>



        <!-- MODERACIÓN DE FOROS -->
        <section
          v-if="moduloSeleccionado === 'foros'"
          class="mt-8 space-y-6"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h3 class="text-2xl font-bold text-gray-900">
              Moderación de foros
            </h3>

            <button
              type="button"
              @click="cargarForos"
              :disabled="cargandoDatos"
              class="rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
            >
              {{ cargandoDatos ? 'Actualizando...' : 'Actualizar' }}
            </button>
          </div>

          <p class="text-sm text-gray-600">
            Puedes consultar los mensajes y ocultar publicaciones sin
            eliminarlas físicamente de la base de datos.
          </p>

          <!-- BOTONES PARA ABRIR CADA FORO -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              @click="foroAbierto = 'estudiantes'"
              :aria-pressed="foroAbierto === 'estudiantes'"
              class="rounded-xl border p-5 text-left transition hover:bg-blue-50"
              :class="foroAbierto === 'estudiantes'
                ? 'border-blue-700 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-200 bg-white'"
            >
              <span class="mb-2 block text-3xl">👩‍🎓</span>

              <span class="block text-lg font-bold text-gray-900">
                Foro de estudiantes
              </span>

              <span class="mt-1 block text-sm text-gray-600">
                {{ mensajesEstudiantes.length }} mensajes cargados
              </span>
            </button>

            <button
              type="button"
              @click="foroAbierto = 'profesores'"
              :aria-pressed="foroAbierto === 'profesores'"
              class="rounded-xl border p-5 text-left transition hover:bg-emerald-50"
              :class="foroAbierto === 'profesores'
                ? 'border-emerald-700 bg-emerald-50 ring-2 ring-emerald-200'
                : 'border-gray-200 bg-white'"
            >
              <span class="mb-2 block text-3xl">👩‍🏫</span>

              <span class="block text-lg font-bold text-gray-900">
                Foro de profesores
              </span>

              <span class="mt-1 block text-sm text-gray-600">
                {{ mensajesProfesores.length }} publicaciones cargadas
              </span>
            </button>
          </div>

          <!-- FORO DE ESTUDIANTES -->
          <div
            v-if="foroAbierto === 'estudiantes'"
            class="rounded-xl border border-gray-200 bg-white p-5"
          >
            <h4 class="mb-4 text-xl font-bold text-gray-900">
              Foro de estudiantes
            </h4>

            <p
              v-if="!cargandoDatos && mensajesEstudiantes.length === 0"
              class="rounded-lg bg-gray-50 p-4 text-gray-600"
            >
              No hay mensajes de estudiantes para mostrar.
            </p>

            <article
              v-for="item in mensajesEstudiantes"
              :key="item.id"
              class="mb-4 rounded-lg border p-4 last:mb-0"
            >
              <div class="flex flex-wrap justify-between gap-2">
                <p class="font-semibold">
                  {{ item.autor || 'Autor no disponible' }}
                </p>

                <span class="text-xs text-gray-500">
                  {{ formatearFecha(item.fecha_creacion) }}
                </span>
              </div>

              <p class="mt-1 text-sm text-gray-500">
                {{ item.escuela || 'Escuela no indicada' }}

                <span v-if="item.grupo">
                  · {{ item.grupo }}
                </span>
              </p>

              <p class="mt-3 whitespace-pre-wrap break-words">
                {{ item.mensaje || 'Sin texto' }}
              </p>

              <div class="mt-4">
                <span
                  v-if="!estaActivo(item.activo)"
                  class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                >
                  Mensaje oculto
                </span>

                <button
                  v-else
                  type="button"
                  @click="ocultarMensaje('estudiantes', item)"
                  :disabled="procesandoId !== null"
                  class="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-50"
                >
                  Ocultar mensaje
                </button>
              </div>
            </article>
          </div>

          <!-- FORO DE PROFESORES -->
          <div
            v-if="foroAbierto === 'profesores'"
            class="rounded-xl border border-gray-200 bg-white p-5"
          >
            <h4 class="mb-4 text-xl font-bold text-gray-900">
              Foro de profesores
            </h4>

            <p
              v-if="!cargandoDatos && mensajesProfesores.length === 0"
              class="rounded-lg bg-gray-50 p-4 text-gray-600"
            >
              No hay mensajes de profesores para mostrar.
            </p>

            <article
              v-for="item in mensajesProfesores"
              :key="item.id"
              class="mb-4 rounded-lg border p-4 last:mb-0"
            >
              <div class="flex flex-wrap justify-between gap-2">
                <p class="font-semibold">
                  {{ item.titulo || item.autor || 'Publicación del profesor' }}
                </p>

                <span class="text-xs text-gray-500">
                  {{ formatearFecha(item.fecha_creacion) }}
                </span>
              </div>

              <p class="mt-1 text-sm text-gray-500">
                {{ item.escuela || 'Escuela no indicada' }}

                <span v-if="item.autor">
                  · {{ item.autor }}
                </span>
              </p>

              <p class="mt-3 whitespace-pre-wrap break-words">
                {{ item.mensaje || 'Sin texto' }}
              </p>

              <div class="mt-4">
                <span
                  v-if="!estaActivo(item.activo)"
                  class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                >
                  Publicación oculta
                </span>

                <button
                  v-else
                  type="button"
                  @click="ocultarMensaje('profesores', item)"
                  :disabled="procesandoId !== null"
                  class="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-50"
                >
                  Ocultar publicación
                </button>
              </div>
            </article>
          </div>
        </section>

        <!-- MATERIALES -->
        <section
          v-if="moduloSeleccionado === 'archivos'"
          class="mt-8"
        >
          <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 class="text-2xl font-bold text-gray-900">
              Archivos y materiales
            </h3>

            <button
              type="button"
              @click="cargarRecursos"
              :disabled="cargandoDatos"
              class="rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
            >
              Actualizar
            </button>
          </div>

          <p class="mb-5 text-sm text-gray-600">
            Retirar un material lo despublica en la base de datos. La protección
            de sus archivos frente al acceso mediante enlaces directos debe
            comprobarse también en el servidor.
          </p>

          <p
            v-if="!cargandoDatos && recursos.length === 0"
            class="rounded-xl border border-dashed p-6 text-center text-gray-500"
          >
            Todavía no hay materiales registrados. Cuando los profesores publiquen
            recursos, aparecerán aquí.
          </p>

          <article
            v-for="item in recursos"
            :key="item.id"
            class="mb-4 rounded-xl border p-5"
          >
            <div class="flex flex-col justify-between gap-3 sm:flex-row">
              <div>
                <h4 class="text-lg font-bold">
                  {{ item.titulo || item.nombre_archivo || 'Material sin título' }}
                </h4>

                <p class="mt-1 text-sm text-gray-600">
                  Escuela: {{ item.escuela || 'No indicada' }}
                </p>

                <p class="text-sm text-gray-600">
                  Profesor: {{ item.profesor || 'No indicado' }}
                </p>

                <p class="mt-3 whitespace-pre-wrap break-words">
                  {{ item.descripcion || 'Sin descripción' }}
                </p>

                <p class="mt-2 text-xs text-gray-500">
                  {{ item.nombre_archivo || 'Nombre de archivo no disponible' }}
                </p>
              </div>

              <div class="shrink-0">
                <span
                  v-if="!estaPublicado(item.publicado)"
                  class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                >
                  Retirado
                </span>

                <button
                  v-else
                  type="button"
                  @click="retirarMaterial(item)"
                  :disabled="procesandoId !== null"
                  class="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-50"
                >
                  Retirar material
                </button>
              </div>
            </div>
          </article>
        </section>

        <!-- GESTIÓN DE VOLUNTARIADO -->
        <section
          v-if="moduloSeleccionado === 'voluntarios'"
          class="mt-8"
        >
          <GestionVoluntarios />
        </section>

        <!-- MENSAJE DE CARGA Y ERRORES -->
        <p
          v-if="cargandoDatos"
          role="status"
          class="mt-5 text-center text-gray-500"
        >
          Cargando información...
        </p>

        <!-- VOLVER -->
        <button
          v-if="moduloSeleccionado"
          type="button"
          @click="volverAlPanel"
          class="mt-8 rounded-lg border border-gray-300 px-5 py-3 font-medium hover:bg-gray-50"
        >
          Volver al panel
        </button>

        <!-- AVISO DE SEGURIDAD -->
        <div class="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h3 class="font-bold text-amber-900">
            Seguridad y protección de la comunidad
          </h3>

          <p class="mt-2 text-sm leading-relaxed text-amber-900">
            Las operaciones están diseñadas para usar rutas protegidas por el
            backend. Antes de utilizar el sistema con datos reales, comprueba
            también la protección de los archivos publicados y registra las
            acciones de moderación.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

import GestionVoluntarios from '../components/GestionVoluntarios.vue'
import HorariosView from '../views/ateneu/horarios/HorariosView.vue'

import {
  guardarTokenAdmin,
  obtenerTokenAdmin,
  cerrarSesionAdmin,
  peticionAdmin
} from '../services/adminApi'

// Estado del acceso
const mostrarFormulario = ref(false)
const usuario = ref('')
const contrasena = ref('')
const mensaje = ref('')
const cargando = ref(false)
const sesionIniciada = ref(Boolean(obtenerTokenAdmin()))

// Estado del panel
const moduloSeleccionado = ref('')
const cargandoDatos = ref(false)
const procesandoId = ref(null)

const mensajesEstudiantes = ref([])
const mensajesProfesores = ref([])
const recursos = ref([])
const foroAbierto = ref('estudiantes')

function seleccionarModulo(modulo) {
  moduloSeleccionado.value = modulo
  mensaje.value = ''

  if (modulo === 'foros') {
    cargarForos()
  } else if (modulo === 'archivos') {
    cargarRecursos()
  }
}

async function iniciarSesion() {
  if (cargando.value) return

  cargando.value = true
  mensaje.value = ''

  try {
    const respuesta = await fetch(
  'http://localhost:5555/api/admin/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario: usuario.value,
          contrasena: contrasena.value
        })
      }
    )

    const datos = await respuesta.json()

    // Si el servidor rechaza las credenciales, no iniciar sesión.
    if (!respuesta.ok || !datos.token) {
      mensaje.value =
        datos.mensaje || 'No se pudo iniciar sesión. Comprueba tus credenciales.'
      return
    }

    // Guardar el token mediante el sistema que ya usa el proyecto.
    guardarTokenAdmin(datos.token)

    // También lo necesita HorariosView.vue si lee la clave "token".
    localStorage.setItem('token', datos.token)

    sesionIniciada.value = true
    mostrarFormulario.value = false
    moduloSeleccionado.value = ''
    mensaje.value = 'Acceso verificado correctamente.'

    contrasena.value = ''
  } catch (error) {
    console.error('Error en el inicio de sesión:', error)
    mensaje.value =
      'No se puede conectar con el servidor. Comprueba que el backend esté funcionando.'
  } finally {
    cargando.value = false
  }
}

async function cargarForos() {
  cargandoDatos.value = true
  mensaje.value = ''

  try {
    const [estudiantes, profesores] = await Promise.all([
      peticionAdmin('/admin/moderacion/foro-estudiantes'),
      peticionAdmin('/admin/moderacion/foro-profesores')
    ])

    mensajesEstudiantes.value = Array.isArray(estudiantes?.datos)
      ? estudiantes.datos
      : []

    mensajesProfesores.value = Array.isArray(profesores?.datos)
      ? profesores.datos
      : []
  } catch (error) {
    mensaje.value = error.message || 'No se pudieron cargar los foros.'
  } finally {
    cargandoDatos.value = false
  }
}

async function ocultarMensaje(tipo, item) {
  if (!Number.isInteger(Number(item.id)) || Number(item.id) <= 0) {
    mensaje.value = 'El mensaje no tiene un identificador válido.'
    return
  }

  if (!window.confirm(
    '¿Quieres ocultar este mensaje? Dejará de aparecer como activo.'
  )) return

  procesandoId.value = `${tipo}-${item.id}`
  mensaje.value = ''

  try {
    const ruta =
      tipo === 'estudiantes'
        ? `/admin/moderacion/foro-estudiantes/${item.id}/ocultar`
        : `/admin/moderacion/foro-profesores/${item.id}/ocultar`

    const resultado = await peticionAdmin(ruta, { method: 'PATCH' })

    mensaje.value = resultado?.mensaje || 'Operación completada.'
    await cargarForos()
  } catch (error) {
    mensaje.value = error.message || 'No se pudo ocultar el mensaje.'
  } finally {
    procesandoId.value = null
  }
}

async function cargarRecursos() {
  cargandoDatos.value = true
  mensaje.value = ''

  try {
    const resultado = await peticionAdmin('/admin/moderacion/recursos')

    recursos.value = Array.isArray(resultado?.datos)
      ? resultado.datos
      : []
  } catch (error) {
    mensaje.value = error.message || 'No se pudieron cargar los materiales.'
  } finally {
    cargandoDatos.value = false
  }
}

async function retirarMaterial(item) {
  if (!Number.isInteger(Number(item.id)) || Number(item.id) <= 0) {
    mensaje.value = 'El material no tiene un identificador válido.'
    return
  }

  if (!window.confirm(
    '¿Quieres retirar este material de la publicación?'
  )) return

  procesandoId.value = `recurso-${item.id}`
  mensaje.value = ''

  try {
    const resultado = await peticionAdmin(
      `/admin/moderacion/recursos/${item.id}/retirar`,
      { method: 'PATCH' }
    )

    mensaje.value = resultado?.mensaje || 'Material retirado.'
    await cargarRecursos()
  } catch (error) {
    mensaje.value = error.message || 'No se pudo retirar el material.'
  } finally {
    procesandoId.value = null
  }
}

function estaActivo(valor) {
  return valor === true || valor === 1 || valor === '1'
}

function estaPublicado(valor) {
  return estaActivo(valor)
}

function formatearFecha(valor) {
  if (!valor) return 'Fecha no disponible'

  const fecha = new Date(valor)

  if (Number.isNaN(fecha.getTime())) {
    return String(valor)
  }

  return fecha.toLocaleString('es-ES')
}

function volverAlPanel() {
  moduloSeleccionado.value = ''
  mensaje.value = ''
}

function cerrarSesion() {
  cerrarSesionAdmin()
  localStorage.removeItem('token')

  sesionIniciada.value = false
  mostrarFormulario.value = false
  moduloSeleccionado.value = ''

  mensajesEstudiantes.value = []
  mensajesProfesores.value = []
  recursos.value = []

  usuario.value = ''
  contrasena.value = ''
  mensaje.value = ''
}

function cancelarLogin() {
  mostrarFormulario.value = false
  usuario.value = ''
  contrasena.value = ''
  mensaje.value = ''
}
</script>
