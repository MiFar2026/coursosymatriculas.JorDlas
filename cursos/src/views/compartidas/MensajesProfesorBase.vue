<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <component :is="navbarComponent" />

    <main class="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header class="mb-8">
        <p class="mb-2 text-sm font-bold uppercase tracking-widest text-blue-700">
          {{ escuela }}
        </p>

        <h1 class="mb-3 text-3xl font-bold">
          Mensajes con los alumnos
        </h1>

        <p class="text-gray-600">
          Selecciona un grupo y un alumno para consultar su conversación
          privada y responderle.
        </p>
      </header>

      <section class="rounded-2xl border bg-white p-6 shadow">
        <div class="grid gap-5 sm:grid-cols-2">
          <label class="block">
            <span class="mb-2 block font-semibold">Grupo</span>
            <select
              v-model="grupoSeleccionado"
              @change="cargarAlumnos"
              class="w-full rounded-lg border bg-white p-3"
            >
              <option value="">Selecciona un grupo</option>
              <option
                v-for="grupo in grupos"
                :key="grupo.id"
                :value="String(grupo.id)"
              >
                {{ grupo.nombre }}
              </option>
            </select>
          </label>

          <label class="block">
            <span class="mb-2 block font-semibold">Alumno</span>
            <select
              v-model="alumnoSeleccionado"
              @change="cargarConversacion"
              :disabled="!grupoSeleccionado || cargandoAlumnos"
              class="w-full rounded-lg border bg-white p-3 disabled:bg-gray-100"
            >
              <option value="">Selecciona un alumno</option>
              <option
                v-for="alumno in alumnos"
                :key="alumno.id"
                :value="String(alumno.id)"
              >
                {{ alumno.nombre }} {{ alumno.apellidos }}
              </option>
            </select>
          </label>
        </div>

        <p v-if="cargandoGrupos" class="mt-4 text-sm text-gray-500">
          Cargando tus grupos...
        </p>

        <p v-if="cargandoAlumnos" class="mt-4 text-sm text-gray-500">
          Cargando alumnos del grupo...
        </p>

        <p
          v-if="error"
          role="alert"
          class="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-800"
        >
          {{ error }}
        </p>

        <p
          v-if="estado"
          role="status"
          class="mt-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800"
        >
          {{ estado }}
        </p>
      </section>

      <section class="mt-8 rounded-2xl border bg-white p-6 shadow">
        <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 class="text-xl font-bold">Conversación privada</h2>
            <p class="mt-1 text-sm text-gray-500">
              <template v-if="alumnoActual">
                {{ alumnoActual.nombre }} {{ alumnoActual.apellidos }}
              </template>
              <template v-else>
                Selecciona un alumno para consultar los mensajes.
              </template>
            </p>
          </div>

          <button
            v-if="alumnoSeleccionado"
            type="button"
            @click="cargarConversacion"
            :disabled="cargandoMensajes"
            class="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 disabled:opacity-50"
          >
            Actualizar
          </button>
        </div>

        <p v-if="cargandoMensajes" class="py-6 text-center text-gray-500">
          Cargando conversación...
        </p>

        <div
          v-else-if="alumnoSeleccionado && mensajes.length === 0"
          class="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center"
        >
          <p class="font-semibold text-gray-700">
            Todavía no hay mensajes con este alumno.
          </p>
          <p class="mt-2 text-sm text-gray-500">
            Puedes escribir el primer mensaje abajo.
          </p>
        </div>

        <div
          v-else-if="mensajes.length"
          class="max-h-[480px] space-y-4 overflow-y-auto rounded-xl bg-gray-50 p-4"
        >
          <article
            v-for="mensaje in mensajes"
            :key="mensaje.id"
            class="flex"
            :class="esMensajePropio(mensaje) ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-[85%] rounded-2xl p-4 shadow-sm"
              :class="esMensajePropio(mensaje)
                ? 'bg-blue-700 text-white'
                : 'border border-gray-200 bg-white text-gray-800'"
            >
              <p class="mb-2 text-xs font-bold opacity-80">
                {{ esMensajePropio(mensaje) ? 'Tú' : 'Alumno' }}
              </p>

              <p class="whitespace-pre-wrap break-words text-sm leading-6">
                {{ mensaje.mensaje }}
              </p>

              <p class="mt-3 text-right text-xs opacity-70">
                {{ formatearFecha(mensaje.fecha_envio) }}
              </p>

              <button
                v-if="!esMensajePropio(mensaje)"
                type="button"
                @click="reportarMensaje(mensaje)"
                class="mt-2 text-xs font-semibold underline"
                :class="esMensajePropio(mensaje)
                  ? 'text-white'
                  : 'text-red-700'"
              >
                Reportar mensaje
              </button>
            </div>
          </article>
        </div>

        <form
          v-if="alumnoSeleccionado"
          class="mt-6 space-y-4 border-t pt-5"
          @submit.prevent="enviarMensaje"
        >
          <label class="block">
            <span class="mb-2 block font-semibold">Escribe tu mensaje</span>
            <textarea
              v-model.trim="textoMensaje"
              rows="4"
              maxlength="3000"
              required
              placeholder="Escribe tu mensaje..."
              class="w-full rounded-lg border p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            ></textarea>
            <span class="mt-1 block text-right text-xs text-gray-500">
              {{ textoMensaje.length }}/3000
            </span>
          </label>

          <button
            type="submit"
            :disabled="enviando || !textoMensaje.trim()"
            class="rounded-lg bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ enviando ? 'Enviando...' : 'Enviar mensaje' }}
          </button>
        </form>

        <p
          v-else
          class="mt-5 rounded-lg bg-gray-50 p-4 text-sm text-gray-500"
        >
          Primero selecciona un grupo y un alumno.
        </p>
      </section>

      <!-- Reportar mensaje -->
      <div
        v-if="mensajeAReportar"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      >
        <section class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
          <h2 class="text-xl font-bold">Reportar mensaje</h2>

          <p class="mt-2 text-sm text-gray-600">
            Indica el motivo por el que quieres reportar este mensaje.
          </p>

          <label class="mt-5 block">
            <span class="mb-2 block text-sm font-semibold">Motivo</span>
            <select
              v-model="motivoReporte"
              class="w-full rounded-lg border p-3"
            >
              <option value="">Selecciona un motivo</option>
              <option value="Contenido ofensivo">Contenido ofensivo</option>
              <option value="Acoso o intimidación">Acoso o intimidación</option>
              <option value="Contenido inapropiado">Contenido inapropiado</option>
              <option value="Otro">Otro motivo</option>
            </select>
          </label>

          <label class="mt-4 block">
            <span class="mb-2 block text-sm font-semibold">
              Comentario (opcional)
            </span>
            <textarea
              v-model.trim="comentarioReporte"
              rows="3"
              maxlength="1000"
              class="w-full rounded-lg border p-3"
            ></textarea>
          </label>

          <p v-if="errorReporte" class="mt-3 text-sm text-red-700">
            {{ errorReporte }}
          </p>

          <div class="mt-5 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              @click="cerrarReporte"
              class="rounded-lg border px-4 py-2 font-semibold"
            >
              Cancelar
            </button>

            <button
              type="button"
              @click="confirmarReporte"
              :disabled="enviandoReporte || !motivoReporte"
              class="rounded-lg bg-red-700 px-4 py-2 font-bold text-white disabled:opacity-50"
            >
              {{ enviandoReporte ? 'Enviando...' : 'Enviar reporte' }}
            </button>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  escuela: {
    type: String,
    required: true
  },
  navbarComponent: {
    type: [Object, Function],
    required: true
  }
})

const API_BASE = (
  import.meta.env.VITE_API_URL || 'http://localhost:5555'
).replace(/\/+$/, '')

const grupos = ref([])
const alumnos = ref([])
const mensajes = ref([])

const grupoSeleccionado = ref('')
const alumnoSeleccionado = ref('')
const textoMensaje = ref('')

const cargandoGrupos = ref(false)
const cargandoAlumnos = ref(false)
const cargandoMensajes = ref(false)
const enviando = ref(false)

const error = ref('')
const estado = ref('')

const mensajeAReportar = ref(null)
const motivoReporte = ref('')
const comentarioReporte = ref('')
const enviandoReporte = ref(false)
const errorReporte = ref('')

const alumnoActual = computed(() =>
  alumnos.value.find(
    alumno => String(alumno.id) === String(alumnoSeleccionado.value)
  ) || null
)

function extraerLista(resultado, posiblesClaves = []) {
  if (Array.isArray(resultado.datos)) return resultado.datos
  if (Array.isArray(resultado.grupos)) return resultado.grupos
  if (Array.isArray(resultado.alumnos)) return resultado.alumnos
  if (Array.isArray(resultado.mensajes)) return resultado.mensajes

  for (const clave of posiblesClaves) {
    if (Array.isArray(resultado[clave])) return resultado[clave]
  }

  return []
}

async function peticion(url, opciones = {}) {
  const respuesta = await fetch(`${API_BASE}${url}`, {
    credentials: 'include',
    ...opciones,
    headers: {
      Accept: 'application/json',
      ...(opciones.body ? { 'Content-Type': 'application/json' } : {}),
      ...(opciones.headers || {})
    }
  })

  const resultado = await respuesta.json().catch(() => ({}))

  if (!respuesta.ok || resultado.ok === false) {
    throw new Error(
      resultado.mensaje || 'No se ha podido completar la operación.'
    )
  }

  return resultado
}

async function cargarGrupos() {
  cargandoGrupos.value = true
  error.value = ''

  try {
    const resultado = await peticion('/api/mensajes/profesor/grupos')
grupos.value = extraerLista(resultado).map(grupo => ({
  ...grupo,
  id: grupo.grupo_id ?? grupo.id,
  nombre: grupo.grupo_nombre ?? grupo.nombre
}))
} catch (err) {
    error.value = err.message
  } finally {
    cargandoGrupos.value = false
  }
}

async function cargarAlumnos() {
  alumnos.value = []
  mensajes.value = []
  alumnoSeleccionado.value = ''
  estado.value = ''
  error.value = ''

  if (!grupoSeleccionado.value) return

  cargandoAlumnos.value = true

  try {
    const resultado = await peticion(
      `/api/mensajes/profesor/grupos/${grupoSeleccionado.value}/alumnos`
    )

alumnos.value = extraerLista(resultado).map(alumno => ({
  ...alumno,
  id: alumno.alumno_id ?? alumno.id
}))
  } catch (err) {
    error.value = err.message
  } finally {
    cargandoAlumnos.value = false
  }
}

async function cargarConversacion() {
  mensajes.value = []
  estado.value = ''
  error.value = ''

  if (!grupoSeleccionado.value || !alumnoSeleccionado.value) return

  cargandoMensajes.value = true

  try {
    const resultado = await peticion(
      `/api/mensajes/profesor/grupos/${grupoSeleccionado.value}/alumnos/${alumnoSeleccionado.value}/mensajes`
    )

    mensajes.value = extraerLista(resultado, ['mensajes'])
  } catch (err) {
    error.value = err.message
  } finally {
    cargandoMensajes.value = false
  }
}

function esMensajePropio(mensaje) {
  return mensaje.remitente_tipo === 'PROFESOR'
}

async function enviarMensaje() {
  if (enviando.value || !textoMensaje.value.trim()) return

  enviando.value = true
  error.value = ''
  estado.value = ''

  try {
    await peticion(
      `/api/mensajes/profesor/grupos/${grupoSeleccionado.value}/alumnos/${alumnoSeleccionado.value}/mensajes`,
      {
        method: 'POST',
        body: JSON.stringify({
          mensaje: textoMensaje.value.trim()
        })
      }
    )

    textoMensaje.value = ''
    estado.value = 'Mensaje enviado correctamente.'
    await cargarConversacion()
  } catch (err) {
    error.value = err.message
  } finally {
    enviando.value = false
  }
}

function formatearFecha(fecha) {
  if (!fecha) return ''

  const valor = new Date(fecha)

  if (Number.isNaN(valor.getTime())) return String(fecha)

  return valor.toLocaleString('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}

function reportarMensaje(mensaje) {
  mensajeAReportar.value = mensaje
  motivoReporte.value = ''
  comentarioReporte.value = ''
  errorReporte.value = ''
}

function cerrarReporte() {
  mensajeAReportar.value = null
  motivoReporte.value = ''
  comentarioReporte.value = ''
  errorReporte.value = ''
}

async function confirmarReporte() {
  if (!mensajeAReportar.value || !motivoReporte.value) return

  enviandoReporte.value = true
  errorReporte.value = ''

  try {
    await peticion(
      `/api/mensajes/profesor/mensajes/${mensajeAReportar.value.id}/reportar`,
      {
        method: 'POST',
        body: JSON.stringify({
          motivo: motivoReporte.value,
          comentario: comentarioReporte.value
        })
      }
    )

    cerrarReporte()
    estado.value = 'El mensaje se ha reportado correctamente.'
  } catch (err) {
    errorReporte.value = err.message
  } finally {
    enviandoReporte.value = false
  }
}

onMounted(cargarGrupos)
</script>