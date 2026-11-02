<template>
  <section class="space-y-6">
    <div>
      <p class="text-sm font-bold uppercase tracking-wider text-indigo-700">
        Comunicación privada
      </p>
      <h2 class="mt-1 text-2xl font-extrabold">
        Mis mensajes
      </h2>
      <p class="mt-2 text-sm leading-6 text-slate-600">
        Puedes conversar individualmente con tu profesor y con tus compañeros
        del mismo grupo.
      </p>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-5">
      <label class="block">
        <span class="mb-2 block text-sm font-bold">Mi grupo</span>
        <select
          v-model="grupoSeleccionado"
          @change="cambiarGrupo"
          class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
        >
          <option value="">Selecciona tu grupo</option>
          <option
            v-for="grupo in grupos"
            :key="grupo.id"
            :value="String(grupo.id)"
          >
            {{ grupo.nombre }}
          </option>
        </select>
      </label>

      <p v-if="cargandoGrupos" class="mt-3 text-sm text-slate-500">
        Cargando tus grupos...
      </p>

      <p v-if="error" role="alert" class="mt-4 rounded-xl bg-rose-50 p-4 text-sm text-rose-800">
        {{ error }}
      </p>
    </div>

    <div
      v-if="grupoSeleccionado"
      class="grid gap-6 lg:grid-cols-[280px_1fr]"
    >
      <!-- CONTACTOS -->
      <aside class="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 class="mb-4 font-extrabold">Mis contactos</h3>

        <button
          v-if="nombreProfesor"
          type="button"
          @click="seleccionarProfesor"
          class="mb-3 flex w-full items-center gap-3 rounded-xl border p-3 text-left transition"
          :class="contactoSeleccionado === 'PROFESOR'
            ? 'border-indigo-400 bg-indigo-50'
            : 'border-slate-200 hover:bg-slate-50'"
        >
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xl">
            👩‍🏫
          </span>
          <span class="min-w-0">
            <span class="block font-bold text-slate-800">
              {{ nombreProfesor }}
            </span>
            <span class="block text-xs text-slate-500">
              Mi profesor/a
            </span>
          </span>
        </button>

        <div class="mb-3 mt-5">
          <h4 class="text-sm font-bold text-slate-600">
            Compañeros de clase
          </h4>
        </div>

        <p v-if="cargandoCompaneros" class="text-sm text-slate-500">
          Cargando compañeros...
        </p>

        <p
          v-else-if="companeros.length === 0"
          class="rounded-xl bg-slate-50 p-3 text-sm text-slate-500"
        >
          No hay otros compañeros disponibles en este grupo.
        </p>

        <div v-else class="space-y-2">
          <button
            v-for="companero in companeros"
            :key="companero.id"
            type="button"
            @click="seleccionarCompanero(companero)"
            class="flex w-full items-center gap-3 rounded-xl border p-3 text-left transition"
            :class="contactoSeleccionado === `ALUMNO:${companero.id}`
              ? 'border-teal-400 bg-teal-50'
              : 'border-slate-200 hover:bg-slate-50'"
          >
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-800">
              {{ iniciales(companero) }}
            </span>

            <span class="min-w-0">
              <span class="block truncate font-bold text-slate-800">
                {{ companero.nombre }} {{ companero.apellidos }}
              </span>
              <span class="block text-xs text-slate-500">
                Compañero/a de grupo
              </span>
            </span>
          </button>
        </div>
      </aside>

      <!-- CONVERSACIÓN -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 class="text-lg font-extrabold">
              {{ nombreContacto || 'Selecciona un contacto' }}
            </h3>
            <p class="mt-1 text-sm text-slate-500">
              <template v-if="contactoSeleccionado === 'PROFESOR'">
                Conversación privada con tu profesor
              </template>
              <template v-else-if="contactoSeleccionado">
                Conversación privada con tu compañero/a
              </template>
              <template v-else>
                Elige una persona para abrir una conversación.
              </template>
            </p>
          </div>

          <button
            v-if="contactoSeleccionado"
            type="button"
            @click="cargarConversacion"
            :disabled="cargandoMensajes"
            class="rounded-lg border border-indigo-200 px-3 py-2 text-sm font-bold text-indigo-700 hover:bg-indigo-50 disabled:opacity-50"
          >
            Actualizar
          </button>
        </div>

        <p v-if="cargandoMensajes" class="py-8 text-center text-slate-500">
          Cargando conversación...
        </p>

        <div
          v-else-if="contactoSeleccionado && mensajes.length === 0"
          class="my-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center"
        >
          <p class="font-bold text-slate-700">
            Todavía no hay mensajes.
          </p>
          <p class="mt-2 text-sm text-slate-500">
            Puedes iniciar esta conversación escribiendo abajo.
          </p>
        </div>

        <div
          v-else-if="mensajes.length"
          class="my-5 max-h-[480px] space-y-4 overflow-y-auto rounded-xl bg-slate-50 p-4"
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
                ? 'bg-indigo-700 text-white'
                : 'border border-slate-200 bg-white text-slate-800'"
            >
              <p class="mb-2 text-xs font-bold opacity-80">
                {{ esMensajePropio(mensaje) ? 'Tú' : nombreContacto }}
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
                @click="abrirReporte(mensaje)"
                class="mt-2 text-xs font-bold underline"
                :class="esMensajePropio(mensaje) ? 'text-white' : 'text-red-700'"
              >
                Reportar mensaje
              </button>
            </div>
          </article>
        </div>

        <form
          v-if="contactoSeleccionado"
          class="mt-5 space-y-4 border-t border-slate-100 pt-5"
          @submit.prevent="enviarMensaje"
        >
          <label class="block">
            <span class="mb-2 block text-sm font-bold">
              Escribe tu mensaje
            </span>
            <textarea
              v-model.trim="textoMensaje"
              rows="4"
              maxlength="3000"
              required
              placeholder="Escribe aquí tu mensaje..."
              class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            ></textarea>
            <span class="mt-1 block text-right text-xs text-slate-500">
              {{ textoMensaje.length }}/3000
            </span>
          </label>

          <p
            v-if="estado"
            role="status"
            class="rounded-xl bg-teal-50 p-4 text-sm text-teal-900"
          >
            {{ estado }}
          </p>

          <p
            v-if="errorEnvio"
            role="alert"
            class="rounded-xl bg-rose-50 p-4 text-sm text-rose-800"
          >
            {{ errorEnvio }}
          </p>

          <button
            type="submit"
            :disabled="enviando || !textoMensaje.trim()"
            class="rounded-xl bg-indigo-700 px-6 py-3 font-bold text-white hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ enviando ? 'Enviando...' : 'Enviar mensaje' }}
          </button>
        </form>
      </div>
    </div>

    <!-- VENTANA PARA REPORTAR -->
    <div
      v-if="mensajeAReportar"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <section class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h3 class="text-xl font-extrabold">Reportar mensaje</h3>

        <p class="mt-2 text-sm text-slate-600">
          Selecciona el motivo del reporte.
        </p>

        <label class="mt-5 block">
          <span class="mb-2 block text-sm font-bold">Motivo</span>
          <select
            v-model="motivoReporte"
            class="w-full rounded-xl border border-slate-300 p-3"
          >
            <option value="">Selecciona un motivo</option>
            <option value="Contenido ofensivo">Contenido ofensivo</option>
            <option value="Acoso o intimidación">Acoso o intimidación</option>
            <option value="Contenido inapropiado">Contenido inapropiado</option>
            <option value="Otro">Otro motivo</option>
          </select>
        </label>

        <label class="mt-4 block">
          <span class="mb-2 block text-sm font-bold">
            Comentario (opcional)
          </span>
          <textarea
            v-model.trim="comentarioReporte"
            rows="3"
            maxlength="1000"
            class="w-full rounded-xl border border-slate-300 p-3"
          ></textarea>
        </label>

        <p v-if="errorReporte" class="mt-3 text-sm text-red-700">
          {{ errorReporte }}
        </p>

        <div class="mt-5 flex justify-end gap-3">
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
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const API_BASE = (
  import.meta.env.VITE_API_URL || 'http://localhost:5555'
).replace(/\/+$/, '')

const grupos = ref([])
const companeros = ref([])
const mensajes = ref([])

const grupoSeleccionado = ref('')
const contactoSeleccionado = ref('')
const contacto = ref(null)

const textoMensaje = ref('')
const estado = ref('')
const error = ref('')
const errorEnvio = ref('')

const cargandoGrupos = ref(false)
const cargandoCompaneros = ref(false)
const cargandoMensajes = ref(false)
const enviando = ref(false)

const mensajeAReportar = ref(null)
const motivoReporte = ref('')
const comentarioReporte = ref('')
const enviandoReporte = ref(false)
const errorReporte = ref('')

const grupoActual = computed(() =>
  grupos.value.find(
    grupo => String(grupo.id) === String(grupoSeleccionado.value)
  ) || null
)

function obtenerNombreProfesor(grupo) {
  if (!grupo) return ''

  const nombreCompleto = [
    grupo.profesor_nombre,
    grupo.profesor_apellidos
  ].filter(Boolean).join(' ').trim()

  return nombreCompleto || grupo.profesor || grupo.nombre_profesor || ''
}

const nombreProfesor = computed(() =>
  obtenerNombreProfesor(grupoActual.value)
)

const nombreContacto = computed(() => {
  if (contactoSeleccionado.value === 'PROFESOR') {
    return nombreProfesor.value || 'Profesor asignado'
  }

  if (contacto.value) {
    return `${contacto.value.nombre || ''} ${contacto.value.apellidos || ''}`.trim()
  }

  return ''
})

const props = defineProps({
  alumnoId: {
    type: [Number, String],
    required: true
  }
})

function extraerLista(resultado, claves = []) {
  if (Array.isArray(resultado.datos)) return resultado.datos
  if (Array.isArray(resultado.grupos)) return resultado.grupos
  if (Array.isArray(resultado.companeros)) return resultado.companeros
  if (Array.isArray(resultado.alumnos)) return resultado.alumnos
  if (Array.isArray(resultado.mensajes)) return resultado.mensajes

  for (const clave of claves) {
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
    const resultado = await peticion('/api/mensajes/alumno/grupos')
 grupos.value = extraerLista(resultado).map(grupo => ({
  ...grupo,
  id: grupo.grupo_id ?? grupo.id,
  nombre: grupo.grupo_nombre ?? grupo.nombre,
  profesor_nombre: grupo.profesor_nombre ?? grupo.profesor ?? ''
}))

    if (grupos.value.length === 1) {
      grupoSeleccionado.value = String(grupos.value[0].id)
      await cambiarGrupo()
    }
  } catch (err) {
    error.value = err.message
  } finally {
    cargandoGrupos.value = false
  }
}

async function cambiarGrupo() {
  companeros.value = []
  mensajes.value = []
  contacto.value = null
  contactoSeleccionado.value = ''
  textoMensaje.value = ''
  estado.value = ''
  error.value = ''
  errorEnvio.value = ''

  if (!grupoSeleccionado.value) return

  cargandoCompaneros.value = true

  try {
    const resultado = await peticion(
      `/api/mensajes/alumno/grupos/${grupoSeleccionado.value}/companeros`
    )

companeros.value = extraerLista(resultado, ['companeros', 'alumnos']).map(alumno => ({
  ...alumno,
  id: alumno.alumno_id ?? alumno.id
}))
  } catch (err) {
    error.value = err.message
  } finally {
    cargandoCompaneros.value = false
  }
}

async function seleccionarProfesor() {
  contacto.value = null
  contactoSeleccionado.value = 'PROFESOR'
  await cargarConversacion()
}

async function seleccionarCompanero(companero) {
  contacto.value = companero
  contactoSeleccionado.value = `ALUMNO:${companero.id}`
  await cargarConversacion()
}

async function cargarConversacion() {
  mensajes.value = []
  estado.value = ''
  errorEnvio.value = ''
  error.value = ''

  if (!grupoSeleccionado.value || !contactoSeleccionado.value) return

  cargandoMensajes.value = true

  try {
    let url = ''

    if (contactoSeleccionado.value === 'PROFESOR') {
      url = `/api/mensajes/alumno/grupos/${grupoSeleccionado.value}/mensajes`
    } else {
      const alumnoId = contactoSeleccionado.value.split(':')[1]

      url = `/api/mensajes/alumno/grupos/${grupoSeleccionado.value}/alumnos/${alumnoId}/mensajes`
    }

    const resultado = await peticion(url)
    mensajes.value = extraerLista(resultado, ['mensajes'])
  } catch (err) {
    error.value = err.message
  } finally {
    cargandoMensajes.value = false
  }
}

function esMensajePropio(mensaje) {
  return (
    mensaje.remitente_tipo === 'ALUMNO' &&
    Number(mensaje.remitente_id) === Number(miId.value)
  )
}

const miId = ref(null)

function cargarMiIdentidad() {
  miId.value = Number(props.alumnoId) || null
}

async function enviarMensaje() {
  if (enviando.value || !textoMensaje.value.trim()) return

  enviando.value = true
  errorEnvio.value = ''
  estado.value = ''

  try {
    let url = ''

    if (contactoSeleccionado.value === 'PROFESOR') {
      url = `/api/mensajes/alumno/grupos/${grupoSeleccionado.value}/mensajes`
    } else {
      const alumnoId = contactoSeleccionado.value.split(':')[1]

      url = `/api/mensajes/alumno/grupos/${grupoSeleccionado.value}/alumnos/${alumnoId}/mensajes`
    }

    await peticion(url, {
      method: 'POST',
      body: JSON.stringify({
        mensaje: textoMensaje.value.trim()
      })
    })

    textoMensaje.value = ''
    estado.value = 'Mensaje enviado correctamente.'
    await cargarConversacion()
  } catch (err) {
    errorEnvio.value = err.message
  } finally {
    enviando.value = false
  }
}

function iniciales(persona) {
  return `${(persona.nombre || '').charAt(0)}${(persona.apellidos || '').charAt(0)}`.toUpperCase()
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

function abrirReporte(mensaje) {
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
      `/api/mensajes/alumno/mensajes/${mensajeAReportar.value.id}/reportar`,
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

onMounted(async () => {
  await cargarMiIdentidad()
  await cargarGrupos()
})
</script>