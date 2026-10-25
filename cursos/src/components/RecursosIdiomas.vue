
<template>
  <div class="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">
    <main class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

      <!-- Encabezado -->
      <header class="text-center mb-16">
        <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Aprender Idiomas
        </h1>
        <p class="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          Recursos gratuitos con voz, imágenes y vídeos sencillos.
        </p>
      </header>

      <!-- Tarjetas de recursos -->
      <section
        class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Recursos para aprender idiomas"
      >
        <article
          v-for="recurso in recursos"
          :key="recurso.id"
          class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 flex flex-col justify-between border border-gray-100"
        >
          <div>
            <!-- Icono -->
            <div
              class="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-5"
              :class="recurso.colorIcono"
              aria-hidden="true"
            >
              <span>{{ recurso.icono }}</span>
            </div>

            <h2 class="text-xl font-bold text-gray-900 mb-1">
              {{ recurso.nombre }}
            </h2>

            <span class="inline-block text-xs font-medium text-gray-400 mb-3">
              {{ recurso.categoria }}
            </span>

            <p class="text-gray-600 text-sm leading-relaxed">
              {{ recurso.descripcion }}
            </p>
          </div>

          <!-- Enlace externo -->
          <div class="mt-6">
            <a
              :href="recurso.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full inline-flex items-center justify-center px-4 py-3.5 border border-transparent text-base font-medium rounded-full text-white shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2"
              :class="recurso.colorBoton"
            >
              <span class="mr-2" aria-hidden="true">
                {{ recurso.iconoBoton }}
              </span>
              {{ recurso.textoBoton }}
              <span class="sr-only">
                (se abre en una pestaña nueva)
              </span>
            </a>
          </div>
        </article>
      </section>

      <!-- Consejo para educadores -->
      <aside
        class="mt-16 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm max-w-3xl mx-auto flex items-start gap-4"
      >
        <div
          class="shrink-0 text-blue-500 text-xl mt-0.5"
          aria-hidden="true"
        >
          ℹ️
        </div>

        <p class="text-sm text-gray-600 leading-relaxed">
          <strong class="text-gray-900">
            Consejo para el aula social:
          </strong>
          Estos recursos incluyen elementos visuales y actividades de audio
          que ayudan al alumnado a practicar escuchando, repitiendo palabras
          y relacionando sonidos con imágenes. Algunas funciones pueden
          requerir conexión a Internet o una cuenta.
        </p>
      </aside>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const recursos = ref([
  {
    id: 1,
    nombre: 'Little Language Lesson',
    categoria: 'Google Labs · Inteligencia artificial',
    descripcion:
      'Herramienta experimental de inteligencia artificial para explorar palabras y practicar expresiones de la vida diaria.',
    url: 'https://labs.google/',
    icono: '🤖',
    iconoBoton: '💬',
    textoBoton: 'Practicar hablando',
    colorIcono: 'bg-green-50 text-green-600',
    colorBoton:
      'bg-green-600 hover:bg-green-700 focus:ring-green-500'
  },
  {
    id: 2,
    nombre: 'Loecsen',
    categoria: 'Aprendizaje gratuito',
    descripcion:
      'Método visual y auditivo para aprender palabras y expresiones útiles paso a paso, con grabaciones de voz.',
    url: 'https://www.loecsen.com/',
    icono: '🔊',
    iconoBoton: '👂',
    textoBoton: 'Escuchar y ver',
    colorIcono: 'bg-blue-50 text-blue-600',
    colorBoton:
      'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
  },
  {
    id: 3,
    nombre: 'Duolingo',
    categoria: 'Aplicación de aprendizaje',
    descripcion:
      'Actividades interactivas para practicar vocabulario, pronunciación y comprensión mediante ejercicios breves.',
    url: 'https://www.duolingo.com/',
    icono: '📱',
    iconoBoton: '▶️',
    textoBoton: 'Abrir actividades',
    colorIcono: 'bg-emerald-50 text-emerald-600',
    colorBoton:
      'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500'
  },
  {
    id: 4,
    nombre: 'Audio cuentos',
    categoria: 'Pódcast y recursos de audio',
    descripcion:
      'Historias y grabaciones para familiarizarse con los sonidos, la pronunciación y el ritmo de un idioma.',
    url: 'https://open.spotify.com/',
    icono: '🎧',
    iconoBoton: '🔉',
    textoBoton: 'Escuchar audio',
    colorIcono: 'bg-purple-50 text-purple-600',
    colorBoton:
      'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
  }
])
</script>
