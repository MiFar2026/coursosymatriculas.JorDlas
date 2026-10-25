
<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">
    <main class="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">

      <!-- Cabecera -->
      <header class="mb-10">
        <span class="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          ExAequo · Área docente
        </span>

        <h1 class="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
          Guías y preparación de exámenes
        </h1>

        <p class="mt-4 max-w-3xl text-slate-600 leading-relaxed">
          Materiales gratuitos para preparar pruebas de alfabetización,
          castellano y catalán. Consulta modelos de examen, audios,
          lecturas, dictados y actividades para el aula.
        </p>
      </header>

      <!-- Aviso -->
      <div class="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
        <div class="flex gap-3 items-start">
          <span class="text-2xl" aria-hidden="true">📚</span>
          <div>
            <h2 class="font-bold text-indigo-950">
              Recursos para el profesorado
            </h2>
            <p class="mt-1 text-sm text-indigo-900 leading-relaxed">
              Los enlaces conducen a plataformas externas gratuitas.
              Algunos recursos pueden requerir registro. Comprueba que
              las actividades se ajusten al examen que realiza tu escuela.
            </p>
          </div>
        </div>
      </div>

      <!-- Buscador -->
      <section class="mb-8">
        <label
          for="buscar-recursos"
          class="block text-sm font-semibold text-slate-700 mb-2"
        >
          Buscar recursos
        </label>

        <input
          id="buscar-recursos"
          v-model="busqueda"
          type="search"
          placeholder="Ej. dictados, audios, lectura..."
          class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </section>

      <!-- Filtros -->
      <section class="mb-10">
        <h2 class="text-sm font-semibold text-slate-700 mb-3">
          Selecciona un nivel
        </h2>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="nivel in niveles"
            :key="nivel.id"
            type="button"
            @click="nivelSeleccionado = nivel.id"
            class="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
            :class="nivelSeleccionado === nivel.id
              ? 'bg-indigo-600 text-white'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-indigo-50'"
          >
            {{ nivel.nombre }}
          </button>
        </div>
      </section>

      <!-- Resumen del nivel -->
      <section class="mb-6">
        <h2 class="text-2xl font-bold text-slate-900">
          {{ tituloNivel }}
        </h2>
        <p class="mt-2 text-slate-600">
          {{ descripcionNivel }}
        </p>
        <p class="mt-2 text-sm text-slate-500">
          {{ recursosFiltrados.length }}
          recursos disponibles en esta selección
        </p>
      </section>

      <!-- Tarjetas -->
      <section
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        aria-label="Recursos de preparación de exámenes"
      >
        <article
          v-for="recurso in recursosFiltrados"
          :key="recurso.id"
          class="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between gap-3">
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
              :class="recurso.colorIcono"
              aria-hidden="true"
            >
              {{ recurso.icono }}
            </div>

            <span
              class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
            >
              {{ recurso.tipo }}
            </span>
          </div>

          <h3 class="mt-5 text-lg font-bold text-slate-900">
            {{ recurso.nombre }}
          </h3>

          <p class="mt-1 text-sm font-medium text-indigo-600">
            {{ recurso.proveedor }}
          </p>

          <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
            {{ recurso.descripcion }}
          </p>

          <!-- Destrezas -->
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="destreza in recurso.destrezas"
              :key="destreza"
              class="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700"
            >
              {{ destreza }}
            </span>
          </div>

          <a
            :href="recurso.url"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="recurso.colorBoton"
          >
            {{ recurso.textoBoton }}
            <span aria-hidden="true">↗</span>
          </a>
        </article>
      </section>

      <!-- Sin resultados -->
      <div
        v-if="recursosFiltrados.length === 0"
        class="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"
      >
        <p class="text-lg font-semibold text-slate-800">
          No se han encontrado recursos
        </p>
        <p class="mt-2 text-sm text-slate-500">
          Prueba con otro término o selecciona un nivel diferente.
        </p>

        <button
          type="button"
          @click="limpiarFiltros"
          class="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Mostrar todos los recursos
        </button>
      </div>

      <!-- Orientación docente -->
      <aside class="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 class="text-lg font-bold text-slate-900">
          Orientación para preparar una prueba
        </h2>

        <ul class="mt-4 space-y-3 text-sm text-slate-600">
          <li>
            <strong class="text-slate-800">1. Comprensión oral:</strong>
            escuchar un audio y responder preguntas.
          </li>
          <li>
            <strong class="text-slate-800">2. Comprensión lectora:</strong>
            leer textos breves y localizar información.
          </li>
          <li>
            <strong class="text-slate-800">3. Expresión escrita:</strong>
            completar formularios, escribir mensajes o redactar textos.
          </li>
          <li>
            <strong class="text-slate-800">4. Alfabetización:</strong>
            relacionar sonidos y letras, escribir palabras y realizar dictados.
          </li>
        </ul>

        <p class="mt-5 text-xs leading-relaxed text-slate-500">
          Esta orientación es una propuesta didáctica para el centro,
          no una reproducción de los criterios oficiales de evaluación.
        </p>
      </aside>

    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const nivelSeleccionado = ref('todos')
const busqueda = ref('')

const niveles = [
  { id: 'todos', nombre: 'Todos los niveles' },
  { id: 'alfabetizacion', nombre: 'Alfabetización' },
  { id: 'castellano-a1', nombre: 'Castellano A1' },
  { id: 'castellano-a2', nombre: 'Castellano A2' },
  { id: 'castellano-b1', nombre: 'Castellano B1' },
  { id: 'catalan-a1', nombre: 'Catalán A1' },
  { id: 'catalan-a2', nombre: 'Catalán A2' },
  { id: 'catalan-b1', nombre: 'Catalán B1' }
]

const descripciones = {
  todos: 'Consulta materiales para todos los cursos del centro.',
  alfabetizacion:
    'Lectoescritura inicial, reconocimiento de letras, sílabas, palabras y dictados.',
  'castellano-a1':
    'Preparación inicial de comprensión lectora, comprensión auditiva y expresión escrita.',
  'castellano-a2':
    'Modelos de examen y ejercicios de español elemental.',
  'castellano-b1':
    'Práctica de lectura, escucha, producción escrita y preparación de exámenes.',
  'catalan-a1':
    'Primer contacto con el catalán, vocabulario cotidiano y actividades básicas.',
  'catalan-a2':
    'Comprensión oral y escrita, gramática y preparación de pruebas de nivel básico.',
  'catalan-b1':
    'Preparación del nivel elemental con ejercicios y modelos de examen.'
}

const tituloNivel = computed(() => {
  const nivel = niveles.find(
    item => item.id === nivelSeleccionado.value
  )
  return nivel ? nivel.nombre : 'Todos los niveles'
})

const descripcionNivel = computed(() => {
  return descripciones[nivelSeleccionado.value] || ''
})

const recursos = ref([
  // ALFABETIZACIÓN
  {
    id: 1,
    niveles: ['alfabetizacion'],
    nombre: 'Materiales de lectoescritura',
    proveedor: 'EPALE · Recursos educativos',
    tipo: 'Fichas y actividades',
    descripcion:
      'Materiales gratuitos para trabajar grafomotricidad, discriminación auditiva y visual, sílabas, palabras, frases y dictados.',
    url: 'https://epale.ec.europa.eu/es/resource-centre/content/materiales-para-la-lectoescritura',
    icono: '✍️',
    colorIcono: 'bg-amber-50 text-amber-700',
    colorBoton: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
    textoBoton: 'Consultar materiales',
    destrezas: ['Lectura', 'Escritura', 'Dictados']
  },
  {
    id: 2,
    niveles: ['alfabetizacion'],
    nombre: 'Viure a Catalunya: vocabulario en imágenes',
    proveedor: 'Generalitat de Catalunya',
    tipo: 'Material visual',
    descripcion:
      'Láminas y vocabulario visual para relacionar imágenes con palabras y trabajar situaciones cotidianas.',
    url: 'https://llengua.gencat.cat/es/serveis/aprendre_catala/a-catalunya/vull-primer-contacte-amb-catala/',
    icono: '🖼️',
    colorIcono: 'bg-orange-50 text-orange-700',
    colorBoton: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500',
    textoBoton: 'Ver recursos visuales',
    destrezas: ['Vocabulario', 'Lectura', 'Oral']
  },
  {
    id: 3,
    niveles: ['alfabetizacion'],
    nombre: 'Dictados de español',
    proveedor: 'HearWriteSpanish',
    tipo: 'Práctica interactiva',
    descripcion:
      'Escucha frases en español, escribe lo que oyes y comprueba la respuesta. El servicio anuncia ejercicios gratuitos por niveles.',
    url: 'https://hearwritespanish.com/practice/',
    icono: '🎧',
    colorIcono: 'bg-sky-50 text-sky-700',
    colorBoton: 'bg-sky-600 hover:bg-sky-700 focus:ring-sky-500',
    textoBoton: 'Practicar dictados',
    destrezas: ['Escucha', 'Escritura', 'Corrección']
  },

  // CASTELLANO A1
  {
    id: 4,
    niveles: ['castellano-a1'],
    nombre: 'Modelo de examen DELE A1',
    proveedor: 'Instituto Cervantes',
    tipo: 'Modelo oficial',
    descripcion:
      'Consulta el modelo de examen, los audios y las especificaciones para conocer el formato de las pruebas.',
    url: 'https://examenes.cervantes.es/a1a2/profesionales/a1.htm',
    icono: '📋',
    colorIcono: 'bg-blue-50 text-blue-700',
    colorBoton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    textoBoton: 'Abrir modelo de examen',
    destrezas: ['Lectura', 'Escucha', 'Escritura', 'Oral']
  },
  {
    id: 5,
    niveles: ['castellano-a1'],
    nombre: 'Loecsen: español',
    proveedor: 'Loecsen',
    tipo: 'Práctica gratuita',
    descripcion:
      'Vocabulario, expresiones y grabaciones para practicar el idioma con apoyo auditivo y visual.',
    url: 'https://www.loecsen.com/',
    icono: '🔊',
    colorIcono: 'bg-cyan-50 text-cyan-700',
    colorBoton: 'bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500',
    textoBoton: 'Practicar español',
    destrezas: ['Vocabulario', 'Escucha', 'Lectura']
  },

  // CASTELLANO A2
  {
    id: 6,
    niveles: ['castellano-a2'],
    nombre: 'Modelo de examen DELE A2',
    proveedor: 'Instituto Cervantes',
    tipo: 'Modelo oficial',
    descripcion:
      'Modelos de examen, guías y materiales para familiarizarse con las tareas de comprensión y expresión.',
    url: 'https://examenes.cervantes.es/es/dele/preparar-el-examen-dele',
    icono: '📑',
    colorIcono: 'bg-indigo-50 text-indigo-700',
    colorBoton: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
    textoBoton: 'Ver exámenes DELE',
    destrezas: ['Lectura', 'Escucha', 'Escritura', 'Oral']
  },
  {
    id: 7,
    niveles: ['castellano-a2'],
    nombre: 'Ejemplos de examen A2',
    proveedor: 'Universidad de Sevilla',
    tipo: 'Modelo y soluciones',
    descripcion:
      'Ejemplos de tareas de examen, soluciones y enlaces a audios para preparar ejercicios de español A2.',
    url: 'https://institutodeidiomas.us.es/areas-idiomas/espanol/ejemplos-de-examenes',
    icono: '📝',
    colorIcono: 'bg-violet-50 text-violet-700',
    colorBoton: 'bg-violet-600 hover:bg-violet-700 focus:ring-violet-500',
    textoBoton: 'Consultar ejemplos',
    destrezas: ['Lectura', 'Escucha', 'Corrección']
  },

  // CASTELLANO B1
  {
    id: 8,
    niveles: ['castellano-b1'],
    nombre: 'Modelo de examen DELE B1',
    proveedor: 'Instituto Cervantes',
    tipo: 'Modelo oficial',
    descripcion:
      'Material para preparar comprensión lectora, comprensión auditiva, expresión escrita y expresión oral.',
    url: 'https://examenes.cervantes.es/es/dele/examenes/b1',
    icono: '📚',
    colorIcono: 'bg-blue-50 text-blue-700',
    colorBoton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    textoBoton: 'Preparar el DELE B1',
    destrezas: ['Lectura', 'Escucha', 'Escritura', 'Oral']
  },
  {
    id: 9,
    niveles: ['castellano-b1'],
    nombre: 'Práctica de dictados B1',
    proveedor: 'HearWriteSpanish',
    tipo: 'Práctica interactiva',
    descripcion:
      'Ejercicios de escucha y transcripción para mejorar la comprensión de frases y la ortografía.',
    url: 'https://hearwritespanish.com/practice/',
    icono: '🎧',
    colorIcono: 'bg-teal-50 text-teal-700',
    colorBoton: 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500',
    textoBoton: 'Practicar escucha',
    destrezas: ['Escucha', 'Escritura', 'Dictados']
  },

  // CATALÁN A1
  {
    id: 10,
    niveles: ['catalan-a1'],
    nombre: 'Model de prova de català A1',
    proveedor: 'Generalitat de Catalunya',
    tipo: 'Preparación oficial',
    descripcion:
      'Consulta la información oficial para encontrar el cuaderno de examen, audios, transcripciones y modelos de corrección del nivel inicial.',
    url: 'https://llengua.gencat.cat/ca/05_atencio_ciutadania/pmf-preguntes-mes-frequents/',
    icono: '📘',
    colorIcono: 'bg-rose-50 text-rose-700',
    colorBoton: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500',
    textoBoton: 'Consultar materiales',
    destrezas: ['Lectura', 'Escucha', 'Escritura', 'Oral']
  },
  {
    id: 11,
    niveles: ['catalan-a1'],
    nombre: 'Primer contacto con el catalán',
    proveedor: 'Generalitat de Catalunya',
    tipo: 'Material inicial',
    descripcion:
      'Vocabulario en imágenes, expresiones básicas y materiales para iniciar el aprendizaje del catalán.',
    url: 'https://llengua.gencat.cat/es/serveis/aprendre_catala/a-catalunya/vull-primer-contacte-amb-catala/',
    icono: '🖼️',
    colorIcono: 'bg-orange-50 text-orange-700',
    colorBoton: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500',
    textoBoton: 'Ver material A1',
    destrezas: ['Vocabulario', 'Lectura', 'Oral']
  },

  // CATALÁN A2
  {
    id: 12,
    niveles: ['catalan-a2'],
    nombre: 'Model d’examen de català A2',
    proveedor: 'CIFALC',
    tipo: 'Modelo de examen',
    descripcion:
      'Modelos de examen escrito y oral, criterios de corrección y ejemplos de audio para el nivel básico.',
    url: 'https://www.cifalc.cat/es/certificados-de-lengua-catalana/',
    icono: '📋',
    colorIcono: 'bg-red-50 text-red-700',
    colorBoton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    textoBoton: 'Consultar el modelo',
    destrezas: ['Lectura', 'Escucha', 'Escritura', 'Oral']
  },
  {
    id: 13,
    niveles: ['catalan-a2'],
    nombre: 'Parla.cat',
    proveedor: 'Generalitat de Catalunya',
    tipo: 'Curso gratuito',
    descripcion:
      'Curso libre de catalán con actividades multimedia, materiales didácticos y ejercicios para practicar el nivel básico A2.',
    url: 'https://parla.cat/login/home.php?id=0&lang=es',
    icono: '💻',
    colorIcono: 'bg-sky-50 text-sky-700',
    colorBoton: 'bg-sky-600 hover:bg-sky-700 focus:ring-sky-500',
    textoBoton: 'Entrar en Parla.cat',
    destrezas: ['Lectura', 'Escucha', 'Escritura', 'Gramática']
  },

  // CATALÁN B1
  {
    id: 14,
    niveles: ['catalan-b1'],
    nombre: 'Model d’examen de català B1',
    proveedor: 'CIFALC',
    tipo: 'Modelo de examen',
    descripcion:
      'Modelos de pruebas, criterios de corrección y ejemplos de audio para preparar el nivel elemental.',
    url: 'https://www.cifalc.cat/es/certificados-de-lengua-catalana/',
    icono: '📚',
    colorIcono: 'bg-red-50 text-red-700',
    colorBoton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    textoBoton: 'Consultar el modelo',
    destrezas: ['Lectura', 'Escucha', 'Escritura', 'Oral']
  },
  {
    id: 15,
    niveles: ['catalan-b1'],
    nombre: 'Parla.cat: nivel elemental',
    proveedor: 'Generalitat de Catalunya',
    tipo: 'Curso gratuito',
    descripcion:
      'Actividades multimedia para reforzar el catalán y practicar situaciones de comunicación cotidiana del nivel B1.',
    url: 'https://parla.cat/login/home.php?id=0&lang=es',
    icono: '💻',
    colorIcono: 'bg-sky-50 text-sky-700',
    colorBoton: 'bg-sky-600 hover:bg-sky-700 focus:ring-sky-500',
    textoBoton: 'Practicar catalán',
    destrezas: ['Lectura', 'Escucha', 'Escritura', 'Gramática']
  }
])

const recursosFiltrados = computed(() => {
  const texto = busqueda.value.trim().toLocaleLowerCase('es')

  return recursos.value.filter(recurso => {
    const coincideNivel =
      nivelSeleccionado.value === 'todos' ||
      recurso.niveles.includes(nivelSeleccionado.value)

    const contenido = [
      recurso.nombre,
      recurso.proveedor,
      recurso.tipo,
      recurso.descripcion,
      ...recurso.destrezas
    ].join(' ').toLocaleLowerCase('es')

    return coincideNivel && (!texto || contenido.includes(texto))
  })
})

function limpiarFiltros() {
  nivelSeleccionado.value = 'todos'
  busqueda.value = ''
}
</script>
