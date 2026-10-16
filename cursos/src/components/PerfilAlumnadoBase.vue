<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">
    <component :is="navbarComponent" />

    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
     <div
  v-if="cargandoPerfil"
  role="status"
  class="mb-4 rounded-xl bg-teal-50 p-4 text-teal-900"
>
  Cargando los datos del alumno...
</div>

<div
  v-else-if="errorPerfil"
  role="alert"
  class="mb-4 rounded-xl bg-rose-50 p-4 text-rose-900"
>
  {{ errorPerfil }}
  <button
    type="button"
    @click="cargarPerfil"
    class="ml-2 font-bold underline"
  >
    Volver a intentar
  </button>
</div>
      
<!-- Cabecera -->
<section
  class="relative overflow-hidden rounded-3xl bg-gradient-to-br
         from-teal-800 via-teal-700 to-indigo-800 p-6 text-white
         shadow-xl sm:p-10"
>
  <div
    class="absolute -right-12 -top-16 h-56 w-56 rounded-full
           bg-white/10 blur-2xl"
  ></div>

  <div
    class="relative flex flex-col gap-6 sm:flex-row
           sm:items-center sm:justify-between"
  >
    <div>
      <p
        class="text-sm font-bold uppercase tracking-[0.2em]
               text-teal-100"
      >
        {{ escuela }}
      </p>

      <h1 class="mt-3 text-3xl font-extrabold sm:text-4xl">
        Mi espacio de alumno
      </h1>

      <p
        class="mt-3 max-w-xl text-sm leading-6 text-teal-50 sm:text-base"
      >
        Tus clases, trabajos, resultados, avisos y conversaciones
        con tu profesor, en un solo lugar.
      </p>
    </div>

    <div
      class="flex items-center gap-4 rounded-2xl border
             border-white/20 bg-white/10 p-4 backdrop-blur"
    >
      <div
        class="flex h-16 w-16 shrink-0 items-center justify-center
               overflow-hidden rounded-full bg-white text-2xl
               font-extrabold text-teal-800"
      >
        <img
          v-if="fotoPerfil"
          :src="fotoPerfil"
          alt="Foto de perfil del alumno"
          class="h-full w-full object-cover"
        />
        <span v-else>{{ iniciales }}</span>
      </div>

      <div>
        <p class="text-lg font-bold">
          {{ alumno.nombre }} {{ alumno.apellidos }}
        </p>

        <p class="mt-1 text-sm text-teal-100">
          Espacio personal
        </p>

      
<div class="mt-2 flex flex-wrap gap-2">
  <label
    class="inline-block cursor-pointer rounded-lg
           bg-white px-3 py-2 text-sm font-semibold
           text-teal-800 hover:bg-teal-50"
  >
    Cambiar foto
    <input
      type="file"
      accept="image/png,image/jpeg,image/webp"
      class="hidden"
      @change="seleccionarFoto"
    />
  </label>

  <button
    v-if="fotoPerfil"
    type="button"
    class="rounded-lg border border-white/40 px-3 py-2
           text-sm font-semibold text-white hover:bg-white/10"
    @click="fotoPerfil = ''"
  >
    Quitar foto
  </button>
</div>


        <div>
          <span
            class="mt-2 inline-flex rounded-full bg-white/15
                   px-3 py-1 text-xs font-semibold"
          >
            Alumno
          </span>
        </div>
      </div>
    </div>
  </div>
</section>

<label class="mt-2 inline-block cursor-pointer rounded-lg
              bg-white px-3 py-2 text-sm font-semibold text-teal-800
              hover:bg-teal-50">
  Cambiar foto
  <input
    type="file"
    accept="image/png,image/jpeg,image/webp"
    class="hidden"
    @change="seleccionarFoto"
  />
</label>

      <!-- Navegación -->
      <nav class="mt-7 flex gap-2 overflow-x-auto pb-2" aria-label="Secciones del perfil">
        <button
          v-for="item in secciones"
          :key="item.id"
          type="button"
          @click="seccion = item.id"
          :aria-current="seccion === item.id ? 'page' : undefined"
          :class="[
            'shrink-0 rounded-xl px-4 py-3 text-sm font-bold transition',
            seccion === item.id
              ? 'bg-teal-700 text-white shadow-md'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-teal-50'
          ]"
        >
          <span class="mr-2">{{ item.icono }}</span>{{ item.nombre }}
        </button>
      </nav>

      <!-- Resumen -->
      <section v-if="seccion === 'inicio'" class="mt-7 space-y-6">
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-slate-500">Mi clase</p>
            <p class="mt-3 text-xl font-extrabold text-teal-800">
              {{ alumno.clase }}
            </p>
            <p class="mt-2 text-sm text-slate-500">Grupo asignado</p>
          </article>

          <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-slate-500">Mi profesor</p>
            <p class="mt-3 text-xl font-extrabold text-indigo-800">
              {{ alumno.profesor }}
            </p>
            <p class="mt-2 text-sm text-slate-500">Profesor asignado</p>
          </article>

          <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-slate-500">Trabajos</p>
            <p class="mt-3 text-xl font-extrabold text-amber-700">
              {{ trabajos.length }}
            </p>
            <p class="mt-2 text-sm text-slate-500">En esta vista de demostración</p>
          </article>

          <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-slate-500">Avisos privados</p>
            <p class="mt-3 text-xl font-extrabold text-rose-700">
              {{ avisos.length }}
            </p>
            <p class="mt-2 text-sm text-slate-500">Datos de ejemplo</p>
          </article>
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
          <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-sm font-bold uppercase tracking-wider text-teal-700">
                  Mi aprendizaje
                </p>
                <h2 class="mt-1 text-2xl font-extrabold">Bienvenido a tu perfil</h2>
              </div>
              <span class="text-3xl">📚</span>
            </div>

            <p class="mt-4 leading-7 text-slate-600">
              Aquí podrás consultar la información de tu curso, enviar tus
              actividades, revisar las correcciones y comunicarte con tu profesor.
            </p>

            <div class="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                @click="seccion = 'trabajos'"
                class="rounded-xl bg-teal-50 p-4 text-left hover:bg-teal-100"
              >
                <span class="text-2xl">📤</span>
                <p class="mt-2 font-bold text-teal-900">Entregar un trabajo</p>
                <p class="mt-1 text-sm text-slate-600">Preparar una nueva entrega</p>
              </button>

              <button
                type="button"
                @click="seccion = 'mensajes'"
                class="rounded-xl bg-indigo-50 p-4 text-left hover:bg-indigo-100"
              >
                <span class="text-2xl">💬</span>
                <p class="mt-2 font-bold text-indigo-900">Hablar con mi profesor</p>
                <p class="mt-1 text-sm text-slate-600">Consultar la mensajería</p>
              </button>
            </div>
          </article>

          <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p class="text-sm font-bold uppercase tracking-wider text-amber-700">
              Mi profesor
            </p>
            <div class="mt-5 flex h-14 w-14 items-center justify-center
                        rounded-2xl bg-amber-100 text-2xl">
              👩‍🏫
            </div>
            <h2 class="mt-3 text-lg font-extrabold">{{ alumno.profesor }}</h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Este será el espacio para consultar la información del profesor
              asignado a tu grupo.
            </p>
            <button
              type="button"
              @click="seccion = 'mensajes'"
              class="mt-5 font-bold text-teal-800 hover:underline"
            >
              Ir a mensajes →
            </button>
          </article>
        </div>
      </section>

      <!-- Mi perfil -->
      <section v-else-if="seccion === 'perfil'"
               class="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <p class="text-sm font-bold uppercase tracking-wider text-teal-700">
            Datos personales
          </p>
          <h2 class="mt-1 text-2xl font-extrabold">Mi perfil</h2>
          <p class="mt-2 text-sm text-slate-500">
            Puedes modificar tu correo electrónico y teléfono. Los demás datos
            son de solo lectura.
          </p>
        </div>

        <form class="mt-7 grid gap-5 sm:grid-cols-2" @submit.prevent="guardarPerfil">
          <label class="block">
            <span class="mb-2 block text-sm font-bold">Nombre</span>
            <input :value="alumno.nombre" readonly
                   class="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-600" />
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-bold">Apellidos</span>
            <input :value="alumno.apellidos" readonly
                   class="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-600" />
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-bold">Documento de identidad</span>
            <input :value="alumno.documento" readonly
                   class="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-600" />
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-bold">Clase asignada</span>
            <input :value="alumno.clase" readonly
                   class="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-600" />
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-bold">Correo electrónico</span>
            <input v-model.trim="formPerfil.email" type="email" required
                   autocomplete="email"
                   class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100" />
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-bold">Teléfono</span>
            <input v-model.trim="formPerfil.telefono" type="tel"
                   autocomplete="tel"
                   class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100" />
          </label>

          <div class="sm:col-span-2">
            <p v-if="mensajePerfil" class="mb-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
              {{ mensajePerfil }}
            </p>
            <button type="submit"
                    class="rounded-xl bg-teal-700 px-6 py-3 font-bold text-white hover:bg-teal-800">
              Guardar cambios
            </button>
          </div>
        </form>
      </section>

      <!-- Clase -->
      <section v-else-if="seccion === 'clase'"
               class="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p class="text-sm font-bold uppercase tracking-wider text-indigo-700">Mi formación</p>
        <h2 class="mt-1 text-2xl font-extrabold">Mi clase y mi profesor</h2>

        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl bg-indigo-50 p-5">
            <p class="text-sm text-indigo-700">Curso asignado</p>
            <p class="mt-2 text-xl font-extrabold">{{ alumno.clase }}</p>
          </div>
          <div class="rounded-2xl bg-teal-50 p-5">
            <p class="text-sm text-teal-700">Profesor asignado</p>
            <p class="mt-2 text-xl font-extrabold">{{ alumno.profesor }}</p>
          </div>
        </div>

        <div class="mt-6 rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold">Horario del curso</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            El horario se mostrará aquí cuando esté conectado con los datos
            reales del grupo. El alumnado no podrá modificarlo.
          </p>
        </div>
      </section>

      <!-- Trabajos -->
      <section v-else-if="seccion === 'trabajos'" class="mt-7 space-y-6">
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-bold uppercase tracking-wider text-teal-700">Actividades</p>
          <h2 class="mt-1 text-2xl font-extrabold">Entregar un trabajo</h2>
          <p class="mt-2 leading-6 text-slate-600">
            Selecciona los archivos que quieras entregar. Puedes preparar documentos,
            imágenes, audio o vídeo.
          </p>

          <form class="mt-6 space-y-5" @submit.prevent="prepararEntrega">
            <label class="block">
              <span class="mb-2 block text-sm font-bold">Título del trabajo</span>
              <input v-model.trim="formEntrega.titulo" required maxlength="150"
                     placeholder="Ej.: Actividad de la unidad 2"
                     class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100" />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-bold">Comentario para el profesor (opcional)</span>
              <textarea v-model.trim="formEntrega.comentario" rows="3" maxlength="2000"
                        placeholder="Puedes explicar algo sobre tu entrega..."
                        class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"></textarea>
            </label>

            <label class="flex cursor-pointer flex-col items-center rounded-2xl
                          border-2 border-dashed border-teal-300 bg-teal-50
                          px-5 py-8 text-center hover:bg-teal-100">
              <span class="text-4xl">📎</span>
              <span class="mt-3 font-bold text-teal-900">Seleccionar archivos</span>
              <span class="mt-2 text-sm text-slate-600">
                JPG, PNG, PDF, DOC, DOCX, MP3 o MP4
              </span>
              <input ref="inputArchivos" type="file" multiple
                     accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.mp3,.mp4"
                     class="sr-only" @change="seleccionarArchivos" />
            </label>

            <ul v-if="archivos.length" class="space-y-2">
              <li v-for="(archivo, index) in archivos" :key="archivo.nombre + index"
                  class="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
                <span class="min-w-0 break-all text-sm">{{ archivo.nombre }}</span>
                <button type="button" @click="quitarArchivo(index)"
                        class="shrink-0 text-sm font-bold text-rose-700 hover:underline">
                  Quitar
                </button>
              </li>
            </ul>

            <p v-if="mensajeEntrega" role="status"
               class="rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              {{ mensajeEntrega }}
            </p>

            <button type="submit"
                    class="rounded-xl bg-teal-700 px-6 py-3 font-bold text-white hover:bg-teal-800">
              Preparar entrega
            </button>
          </form>

          <p class="mt-5 text-xs leading-5 text-slate-500">
            Esta es una vista previa: los archivos todavía no se envían ni se guardan.
            Conectaremos este formulario al servidor en el siguiente paso.
          </p>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="text-xl font-extrabold">Mis entregas</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            Aquí aparecerán tus trabajos enviados, su fecha de entrega,
            las correcciones y los comentarios del profesor cuando conectemos la API.
          </p>
        </div>
      </section>

      <!-- Resultados -->
      <section v-else-if="seccion === 'resultados'"
               class="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p class="text-sm font-bold uppercase tracking-wider text-indigo-700">Evaluación</p>
        <h2 class="mt-1 text-2xl font-extrabold">Mis resultados</h2>
        <div class="mt-6 rounded-xl bg-indigo-50 p-5">
          <p class="font-bold text-indigo-900">Todavía no hay resultados para mostrar</p>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            Cuando el profesor publique las notas de tus actividades o exámenes,
            podrás consultarlas aquí.
          </p>
        </div>
      </section>

      <!-- Avisos -->
      <section v-else-if="seccion === 'avisos'"
               class="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p class="text-sm font-bold uppercase tracking-wider text-amber-700">Información personal</p>
        <h2 class="mt-1 text-2xl font-extrabold">Mis avisos</h2>

        <div v-if="avisos.length" class="mt-6 space-y-3">
          <article v-for="aviso in avisos" :key="aviso.id"
                   class="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h3 class="font-bold">{{ aviso.titulo }}</h3>
            <p class="mt-2 text-sm leading-6">{{ aviso.texto }}</p>
          </article>
        </div>
        <p v-else class="mt-6 rounded-xl bg-slate-50 p-5 text-slate-600">
          No tienes avisos nuevos.
        </p>

        <p class="mt-4 text-xs leading-5 text-slate-500">
          Los avisos reales y privados se cargarán desde el servidor para el alumno autenticado.
        </p>
      </section>

      <!-- Mensajes -->
      <section v-else-if="seccion === 'mensajes'"
               class="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p class="text-sm font-bold uppercase tracking-wider text-indigo-700">Comunicación</p>
        <h2 class="mt-1 text-2xl font-extrabold">Mensajes de mi profesor</h2>

        <div class="mt-6 rounded-2xl bg-slate-50 p-5">
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-xl">
              👩‍🏫
            </div>
            <div>
              <p class="font-bold">{{ alumno.profesor }}</p>
              <p class="text-sm text-slate-500">Profesor asignado</p>
            </div>
          </div>

          <p class="mt-5 text-sm leading-6 text-slate-600">
            Aquí se mostrarán las conversaciones y los mensajes privados.
            En esta primera versión el envío de mensajes aún no está conectado.
          </p>
        </div>

        <form class="mt-5 space-y-3" @submit.prevent="prepararMensaje">
          <label class="block">
            <span class="mb-2 block text-sm font-bold">Escribe tu mensaje</span>
            <textarea v-model.trim="textoMensaje" rows="4" maxlength="3000"
                      placeholder="Escribe aquí tu consulta..."
                      class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"></textarea>
          </label>

          <p v-if="mensajeChat" role="status"
             class="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
            {{ mensajeChat }}
          </p>

          <button type="submit"
                  class="rounded-xl bg-indigo-700 px-6 py-3 font-bold text-white hover:bg-indigo-800">
            Preparar mensaje
          </button>
        </form>
      </section>

      <footer class="py-8 text-center text-xs text-slate-500">
        {{ escuela }} · Espacio del alumnado
      </footer>
    </main>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch, onMounted } from 'vue'

const fotoPerfil = ref('')

function seleccionarFoto(evento) {
  const archivo = evento.target.files?.[0]

  if (!archivo) return

  const tiposPermitidos = [
    'image/jpeg',
    'image/png',
    'image/webp'
  ]

  if (!tiposPermitidos.includes(archivo.type)) {
    alert('Selecciona una imagen JPG, PNG o WebP.')
    evento.target.value = ''
    return
  }

  if (archivo.size > 5 * 1024 * 1024) {
    alert('La foto no puede superar los 5 MB.')
    evento.target.value = ''
    return
  }

  const lector = new FileReader()

  lector.onload = () => {
    if (typeof lector.result === 'string') {
      fotoPerfil.value = lector.result
    }
  }

  lector.onerror = () => {
    alert('No se ha podido leer la imagen.')
  }

  lector.readAsDataURL(archivo)
}


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

const seccion = ref('inicio')


const secciones = [
  { id: 'inicio', nombre: 'Inicio', icono: '🏠' },
  { id: 'perfil', nombre: 'Mi perfil', icono: '👤' },
  { id: 'clase', nombre: 'Mi clase', icono: '📚' },
  { id: 'trabajos', nombre: 'Trabajos', icono: '📤' },
  { id: 'resultados', nombre: 'Resultados', icono: '📊' },
  { id: 'avisos', nombre: 'Avisos', icono: '🔔' },
  { id: 'mensajes', nombre: 'Mensajes', icono: '💬' }
]

// Datos temporales para diseñar la vista.
// Después se sustituirán por datos de la API.

const alumno = reactive({
  id: null,
  nombre: 'Cargando...',
  apellidos: '',
  documento: '',
  email: '',
  telefono: '',
  clase: 'Cargando...',
  grupo: '',
  aula: '',
  escuelaReal: '',
  profesor: 'Cargando...',
  estadoMatricula: ''
})

const cargandoPerfil = ref(true)
const errorPerfil = ref('')

const formPerfil = reactive({
  email: '',
  telefono: ''
})

async function cargarPerfil() {
  cargandoPerfil.value = true
  errorPerfil.value = ''

  try {
    const base = (
      import.meta.env.VITE_API_URL || 'http://localhost:5555'
    ).replace(/\/+$/, '')

    const respuesta = await fetch(`${base}/api/perfil-alumno/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json'
      }
    })

    const resultado = await respuesta.json()

    if (!respuesta.ok || !resultado.ok) {
      throw new Error(
        resultado.mensaje || 'No se pudo cargar el perfil.'
      )
    }

    const datos = resultado.datos

    alumno.id = datos.id
    alumno.nombre = datos.nombre || ''
    alumno.apellidos = datos.apellidos || ''
    alumno.documento = datos.documento || ''
    alumno.email = datos.email || ''
    alumno.telefono = datos.telefono || ''
    alumno.clase = datos.curso || 'Sin curso asignado'
    alumno.grupo = datos.grupo || ''
    alumno.aula = datos.aula || ''
    alumno.escuelaReal = datos.escuela || ''
    alumno.profesor = [datos.profesor_nombre, datos.profesor_apellidos]
      .filter(Boolean)
      .join(' ') || 'Sin profesor asignado'
    alumno.estadoMatricula = datos.estado_matricula || ''

    formPerfil.email = alumno.email
    formPerfil.telefono = alumno.telefono
  } catch (error) {
    console.error('Error al cargar el perfil:', error)
    errorPerfil.value = error.message || 'No se pudo cargar el perfil.'
  } finally {
    cargandoPerfil.value = false
  }
}

onMounted(cargarPerfil)


const mensajePerfil = ref('')

function guardarPerfil() {
  // Solo actualiza la vista local. Aún no guarda en la base de datos.
  alumno.email = formPerfil.email
  alumno.telefono = formPerfil.telefono
  mensajePerfil.value =
    'Vista previa: los cambios solo están en esta pantalla y todavía no se han guardado en el servidor.'
}

const formEntrega = reactive({
  titulo: '',
  comentario: ''
})

const iniciales = computed(() => {
  const nombre = alumno.nombre || ''
  const apellidos = alumno.apellidos || ''

  return `${nombre.charAt(0)}${apellidos.charAt(0)}`.toUpperCase()
})

const inputArchivos = ref(null)
const archivos = ref([])
const mensajeEntrega = ref('')
const extensionesPermitidas = [
  'jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'mp3', 'mp4'
]

function seleccionarArchivos(evento) {
  const seleccionados = Array.from(evento.target.files || [])
  const validos = []
  const rechazados = []

  for (const archivo of seleccionados) {
    const extension = archivo.name.split('.').pop().toLowerCase()

    if (!extensionesPermitidas.includes(extension)) {
      rechazados.push(archivo.name)
      continue
    }

    if (archivo.size > 25 * 1024 * 1024) {
      rechazados.push(`${archivo.name} (supera 25 MB)`)
      continue
    }

    validos.push({
      nombre: archivo.name,
      archivo
    })
  }

  archivos.value = [...archivos.value, ...validos]
  mensajeEntrega.value = rechazados.length
    ? `No se han añadido estos archivos: ${rechazados.join(', ')}.`
    : ''

  // Permite volver a seleccionar el mismo archivo.
  if (inputArchivos.value) inputArchivos.value.value = ''
}

function quitarArchivo(indice) {
  archivos.value.splice(indice, 1)
}

function prepararEntrega() {
  if (!formEntrega.titulo.trim()) {
    mensajeEntrega.value = 'Escribe el título del trabajo.'
    return
  }

  if (!archivos.value.length) {
    mensajeEntrega.value = 'Selecciona al menos un archivo para preparar la entrega.'
    return
  }

  mensajeEntrega.value =
    'Los archivos están seleccionados, pero todavía no se han enviado. En el siguiente paso conectaremos la entrega con el servidor.'
}

const trabajos = ref([])
const avisos = ref([])
const textoMensaje = ref('')
const mensajeChat = ref('')

function prepararMensaje() {
  if (!textoMensaje.value.trim()) {
    mensajeChat.value = 'Escribe un mensaje antes de continuar.'
    return
  }

  mensajeChat.value =
    'Tu mensaje está preparado, pero todavía no se ha enviado. Conectaremos la mensajería al servidor en el siguiente paso.'
}

watch(seccion, () => {
  mensajePerfil.value = ''
  mensajeEntrega.value = ''
  mensajeChat.value = ''
})
</script>