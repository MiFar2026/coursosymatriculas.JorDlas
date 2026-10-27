
<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <!-- Cada escuela conserva su propio navbar -->
    <NavbarJoanmiro v-if="esJoanmiro" />
    <NavbarAteneu v-else />

    <!-- CABECERA -->
    <header
      :class="esJoanmiro
        ? 'bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800'
        : 'bg-gradient-to-br from-red-950 via-red-900 to-red-800'"
      class="text-white"
    >
      <div class="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <p class="mb-3 text-sm font-bold uppercase tracking-widest text-amber-200">
          ExAequo · Información para la comunidad
        </p>

        <h1 class="mb-4 text-3xl font-bold sm:text-5xl">
          Información útil
        </h1>

        <p class="max-w-3xl text-base leading-7 text-gray-100 sm:text-lg">
          Encuentra enlaces oficiales para acreditar tus conocimientos de
          castellano y catalán, y para consultar información sobre trámites
          de extranjería y residencia en España.
        </p>
      </div>
    </header>

    <!-- CONTENIDO -->
    <main class="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-6 sm:py-12">

      <!-- TARJETA 1: EXÁMENES OFICIALES -->
      <section class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-gray-50 sm:p-6"
          :aria-expanded="mostrarIdiomas"
          aria-controls="contenido-idiomas"
          @click="mostrarIdiomas = !mostrarIdiomas"
        >
          <div class="flex items-start gap-4">
            <span
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-2xl"
              aria-hidden="true"
            >
              📚
            </span>

            <div>
              <h2 class="text-xl font-bold text-gray-900 sm:text-2xl">
                Exámenes oficiales de castellano y catalán
              </h2>

              <p class="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                Consulta certificados, niveles, convocatorias, inscripción
                y recursos para preparar los exámenes.
              </p>

              <span class="mt-3 inline-block text-sm font-semibold text-blue-800">
                {{ mostrarIdiomas ? 'Ocultar información' : 'Consultar información' }}
              </span>
            </div>
          </div>

          <svg
            class="h-6 w-6 shrink-0 transition-transform duration-200"
            :class="{ 'rotate-180': mostrarIdiomas }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <div
          v-if="mostrarIdiomas"
          id="contenido-idiomas"
          class="space-y-5 border-t border-gray-100 p-5 sm:p-6"
        >
          <!-- CASTELLANO -->
          <article class="rounded-xl border border-blue-100 bg-blue-50/60 p-4 sm:p-5">
            <h3 class="mb-2 text-lg font-bold text-gray-900">
              Castellano
            </h3>

            <p class="mb-4 text-sm leading-6 text-gray-700 sm:text-base">
              El Instituto Cervantes ofrece información sobre los diplomas
              DELE, sus niveles, fechas de examen y centros examinadores.
            </p>

            <a
              href="https://examenes.cervantes.es/es/dele/que-es"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-lg bg-blue-800 px-4 py-3 font-semibold text-white transition hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              Información oficial sobre los exámenes DELE
              <span aria-hidden="true">↗</span>
            </a>
          </article>

          <!-- CATALÁN -->
          <article class="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 sm:p-5">
            <h3 class="mb-2 text-lg font-bold text-gray-900">
              Catalán
            </h3>

            <p class="mb-4 text-sm leading-6 text-gray-700 sm:text-base">
              La Generalitat de Catalunya publica información sobre los
              certificados oficiales, los niveles A1, A2, B1, B2, C1 y C2,
              las convocatorias y los procedimientos de inscripción.
            </p>

            <a
              href="https://llengua.gencat.cat/ca/serveis/acreditacio_coneixements/certificats_de_catala"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-4 py-3 font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-200"
            >
              Certificados oficiales de catalán
              <span aria-hidden="true">↗</span>
            </a>
          </article>

          <p class="text-sm leading-6 text-gray-600">
            Antes de inscribirte, comprueba en la web oficial los requisitos,
            las fechas, las tasas y el certificado que necesitas.
          </p>
        </div>
      </section>

      <!-- TARJETA 2: EXTRANJERÍA -->
      <section class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-gray-50 sm:p-6"
          :aria-expanded="mostrarExtranjeria"
          aria-controls="contenido-extranjeria"
          @click="mostrarExtranjeria = !mostrarExtranjeria"
        >
          <div class="flex items-start gap-4">
            <span
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-2xl"
              aria-hidden="true"
            >
              🏛️
            </span>

            <div>
              <h2 class="text-xl font-bold text-gray-900 sm:text-2xl">
                Extranjería, residencia y arraigo
              </h2>

              <p class="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                Consulta información oficial sobre autorizaciones de
                residencia, documentación y distintas modalidades de arraigo.
              </p>

              <span class="mt-3 inline-block text-sm font-semibold text-amber-800">
                {{ mostrarExtranjeria ? 'Ocultar información' : 'Consultar información' }}
              </span>
            </div>
          </div>

          <svg
            class="h-6 w-6 shrink-0 transition-transform duration-200"
            :class="{ 'rotate-180': mostrarExtranjeria }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <div
          v-if="mostrarExtranjeria"
          id="contenido-extranjeria"
          class="space-y-5 border-t border-gray-100 p-5 sm:p-6"
        >
          <p class="leading-7 text-gray-700">
            El Ministerio de Inclusión, Seguridad Social y Migraciones
            publica información sobre los trámites de extranjería y los
            requisitos de las diferentes autorizaciones. Cada situación
            personal puede tener requisitos distintos.
          </p>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href="https://bibliovirtual.inclusion.gob.es/web/migraciones/situacion-excepcional-o-de-irregularidad"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-xl border border-amber-200 bg-amber-50 p-4 transition hover:bg-amber-100 focus:outline-none focus:ring-4 focus:ring-amber-200"
            >
              <h3 class="mb-2 font-bold text-gray-900">
                Información general sobre arraigo
              </h3>
              <p class="text-sm leading-6 text-gray-700">
                Consulta las fichas oficiales de las distintas autorizaciones
                por circunstancias excepcionales.
              </p>
              <span class="mt-3 inline-block font-semibold text-amber-900">
                Consultar en el Ministerio ↗
              </span>
            </a>

            <a
              href="https://www.inclusion.gob.es/es/web/migraciones/w/autorizacion-residencia-temporal-por-circunstancias-excepcionales.-arraigo-social"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
            >
              <h3 class="mb-2 font-bold text-gray-900">
                Arraigo social
              </h3>
              <p class="text-sm leading-6 text-gray-700">
                Revisa la información oficial sobre esta autorización,
                sus requisitos y la documentación exigible.
              </p>
              <span class="mt-3 inline-block font-semibold text-gray-800">
                Consultar requisitos ↗
              </span>
            </a>

            <a
              href="https://bibliovirtual.inclusion.gob.es/web/migraciones/w/29.-autorizacion-residencia-temporal-por-circunstancias-excepcionales.-arraigo-sociolaboral."
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
            >
              <h3 class="mb-2 font-bold text-gray-900">
                Arraigo sociolaboral
              </h3>
              <p class="text-sm leading-6 text-gray-700">
                Consulta la ficha oficial sobre esta modalidad y las
                condiciones relacionadas con el trabajo.
              </p>
              <span class="mt-3 inline-block font-semibold text-gray-800">
                Consultar requisitos ↗
              </span>
            </a>

            <a
              href="https://www.inclusion.gob.es/es/web/migraciones/w/30.-autorizacion-residencia-temporal-por-circunstancias-excepcionales.-arraigo-socioformativo"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
            >
              <h3 class="mb-2 font-bold text-gray-900">
                Arraigo socioformativo
              </h3>
              <p class="text-sm leading-6 text-gray-700">
                Consulta las condiciones oficiales relacionadas con la
                formación y esta autorización de residencia.
              </p>
              <span class="mt-3 inline-block font-semibold text-gray-800">
                Consultar requisitos ↗
              </span>
            </a>
          </div>

          <p class="text-sm leading-6 text-gray-600">
            Las fichas oficiales son orientativas y la normativa puede cambiar.
            Comprueba siempre la versión vigente y los requisitos aplicables
            a tu situación.
          </p>
        </div>
      </section>

      <!-- NOTA INFORMATIVA -->
      <aside
        class="rounded-xl border border-amber-300 bg-amber-50 p-5 sm:p-6"
        role="note"
      >
        <h2 class="mb-2 font-bold text-amber-950">
          Nota importante
        </h2>

        <p class="text-sm leading-6 text-amber-950 sm:text-base">
          La información de esta página es orientativa y puede cambiar.
          Los enlaces dirigen a fuentes oficiales, pero ExAequo no ofrece
          asesoramiento jurídico individualizado mediante esta página.
          Para conocer los requisitos aplicables a tu caso, consulta la
          información oficial vigente o solicita asesoramiento especializado.
        </p>
      </aside>

    </main>

    <!-- PIE DE PÁGINA -->
    <footer class="border-t border-gray-200 bg-white px-4 py-6">
      <p class="text-center text-sm text-gray-500">
        ExAequo · Información útil para la comunidad
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import NavbarAteneu from '../../components/ateneu/NavbarAteneu.vue'
import NavbarJoanmiro from '../../components/joanmiro/NavbarJoanmiro.vue'

const route = useRoute()

// La misma página conserva el navbar correspondiente a cada escuela.
const esJoanmiro = route.path.startsWith('/joanmiro')

const mostrarIdiomas = ref(false)
const mostrarExtranjeria = ref(false)
</script>

