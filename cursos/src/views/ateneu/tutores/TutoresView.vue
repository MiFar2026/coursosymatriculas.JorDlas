
<template>
<div class="min-h-screen relative text-gray-800">

  <!-- FOTO DE FONDO CON TRANSPARENCIA -->

  <div
    class="fixed inset-0 pointer-events-none"
    aria-hidden="true"
    style="
      background-image: url('/fotos/prof/profe.1.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
      opacity: 0.50;
      z-index: 0;
    "
  ></div>

  <!-- CONTENIDO POR ENCIMA DE LA FOTO -->

  <div class="relative" style="z-index: 1;">

    <!-- NAVBAR -->

    <NavbarAteneu />

    <main>

      <!-- CABECERA -->

      <section
        class="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-stone-100"
      >

        <div
          class="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-amber-200/30"
        ></div>

        <div
          class="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-yellow-200/30"
        ></div>

        <div class="relative mx-auto max-w-6xl px-6 py-16 md:py-24">

          <div class="mx-auto max-w-3xl text-center">

            <p
              class="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-amber-800"
            >
              Ateneu Barcelonés Aula 502
            </p>

            <h1
              class="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl"
            >
              Espacio de tutores
            </h1>

            <p class="text-lg leading-relaxed text-gray-600 md:text-xl">
              Un espacio para organizar las clases, consultar recursos
              educativos y acompañar el aprendizaje de nuestros alumnos.
            </p>

          </div>

        </div>

      </section>

      <!-- NORMAS Y ORIENTACIÓN Y FORMACIÓN -->

      <section class="mx-auto max-w-6xl px-6 pt-10">

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">

          <!-- BOTÓN NORMAS -->

          <button
            type="button"
            @click="mostrarNormas = !mostrarNormas"
            :aria-expanded="mostrarNormas"
            class="flex items-center gap-4 rounded-2xl border border-amber-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >

            <span
              class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-100 text-2xl"
            >
              📘
            </span>

            <span class="flex-1">

              <span class="block text-lg font-bold">
                Normas
              </span>

              <span class="mt-1 block text-sm text-gray-500">
                Orientaciones para la convivencia y el trabajo en clase.
              </span>

            </span>

            <span class="text-xl text-amber-700">
              {{ mostrarNormas ? '−' : '+' }}
            </span>

          </button>

          <!-- BOTÓN ORIENTACIÓN Y FORMACIÓN -->

          <button
            type="button"
            @click="mostrarAvisos = !mostrarAvisos"
            :aria-expanded="mostrarAvisos"
            class="flex items-center gap-4 rounded-2xl border border-blue-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >

            <span
              class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl"
            >
              🤝
            </span>

            <span class="flex-1">

              <span class="block text-lg font-bold">
                Orientación y formación
              </span>

              <span class="mt-1 block text-sm text-gray-500">
                Recursos, voluntariado y formación gratuita en Barcelona.
              </span>

            </span>

            <span class="text-xl text-blue-700">
              {{ mostrarAvisos ? '−' : '+' }}
            </span>

          </button>

        </div>

        <!-- CONTENIDO DE NORMAS -->

        <div
          v-if="mostrarNormas"
          class="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-6"
        >

          <h2 class="mb-3 text-xl font-bold text-amber-900">
            Normas del profesorado
          </h2>

          <ul class="list-disc space-y-2 pl-5 leading-relaxed text-gray-700">

            <li>
              Tratar a todas las personas con respeto.
            </li>

            <li>
              Favorecer un ambiente de aprendizaje inclusivo.
            </li>

            <li>
              Respetar los horarios y la organización de las clases.
            </li>

            <li>
              Proteger la privacidad de los alumnos.
            </li>

            <li>
              Utilizar los recursos educativos de forma responsable.
            </li>

          </ul>

        </div>

        <!-- CONTENIDO DE ORIENTACIÓN Y FORMACIÓN -->

        <div
          v-if="mostrarAvisos"
          class="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-6"
        >

          <h2 class="mb-3 text-2xl font-bold text-blue-900">
            Orientación y formación para el voluntariado
          </h2>

          <p class="mb-6 leading-relaxed text-gray-700">
            En Barcelona existen diversos puntos de orientación,
            bolsas y escuelas de formación gratuita para personas
            interesadas en hacer voluntariado. Aquí encontrarás
            entidades y recursos para informarte, participar y
            formarte como voluntario o voluntaria.
          </p>

          <!-- SECCIÓN 1: ORIENTACIÓN Y BOLSAS DE VOLUNTARIADO -->

          <div class="mb-8">

            <h3 class="mb-4 border-b border-blue-200 pb-2 text-lg font-bold text-blue-900">
              🧭 Centros de orientación y bolsas de voluntariado
            </h3>

            <div class="space-y-4">

              <!-- TORRE JUSSANA -->

              <div class="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">

                <h4 class="mb-2 font-bold text-gray-900">
                  Torre Jussana
                </h4>

                <p class="mb-3 text-sm leading-relaxed text-gray-600">
                  Centro de referencia para las asociaciones y el
                  asociacionismo en Barcelona. Ofrece asesoramiento,
                  recursos y orientación para entidades y personas
                  interesadas en participar en proyectos asociativos.
                </p>

                <a
                  href="https://www.barcelona.cat/internationalwelcome/es/vive-e-instalate/que-necesitas/estilo-de-vida/voluntariado"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                >
                  Consultar información ↗
                </a>

              </div>

              <!-- FEDERACIÓ CATALANA DE VOLUNTARIAT SOCIAL -->

              <div class="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">

                <h4 class="mb-2 font-bold text-gray-900">
                  Federació Catalana de Voluntariat Social
                </h4>

                <p class="mb-3 text-sm leading-relaxed text-gray-600">
                  Gestiona recursos como Voluntariat en un clic y
                  Voluntaris.cat, donde puedes consultar ofertas de
                  voluntariado y recibir orientación para encontrar
                  proyectos en los que participar.
                </p>

                <a
                  href="https://voluntaris.cat"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                >
                  Consultar Voluntaris.cat ↗
                </a>

              </div>

              <!-- XARXANET -->

              <div class="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">

                <h4 class="mb-2 font-bold text-gray-900">
                  Xarxanet
                </h4>

                <p class="mb-3 text-sm leading-relaxed text-gray-600">
                  Portal impulsado por la Generalitat de Catalunya
                  con actualidad, recursos, noticias y guías sobre
                  el movimiento asociativo y el voluntariado.
                </p>

                <a
                  href="https://xarxanet.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                >
                  Visitar Xarxanet ↗
                </a>

              </div>

              <!-- AJUNTAMENT DE BARCELONA -->

              <div class="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">

                <h4 class="mb-2 font-bold text-gray-900">
                  Ajuntament de Barcelona
                </h4>

                <p class="mb-3 text-sm leading-relaxed text-gray-600">
                  Dispone de información municipal y recursos para
                  participar en proyectos sociales, culturales y
                  comunitarios de la ciudad.
                </p>

                <div class="flex flex-col gap-2">

                  <a
                    href="https://ajuntament.barcelona.cat/personesgrans/es/participacion/como-puedes-participar-en-la-ciudad/voluntariado"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    Información municipal sobre voluntariado ↗
                  </a>

                  <a
                    href="https://www.barcelona.cat/internationalwelcome/es/vive-e-instalate/que-necesitas/estilo-de-vida/voluntariado"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    Barcelona International Welcome ↗
                  </a>

                </div>

              </div>

            </div>

          </div>

          <!-- SECCIÓN 2: FORMACIÓN GRATUITA -->

          <div>

            <h3 class="mb-4 border-b border-blue-200 pb-2 text-lg font-bold text-blue-900">
              🎓 Formación gratuita para voluntarios
            </h3>

            <div class="space-y-4">

              <!-- CÁRITAS -->

              <div class="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">

                <h4 class="mb-2 font-bold text-gray-900">
                  Cáritas Barcelona – Escuela de Formación del Voluntariado
                </h4>

                <p class="mb-3 text-sm leading-relaxed text-gray-600">
                  Ofrece cursos iniciales, permanentes y específicos
                  para voluntarios. Su formación trabaja diferentes
                  dimensiones como la cognitiva, emocional y relacional,
                  proporcionando herramientas para desarrollar la
                  acción voluntaria.
                </p>

                <a
                  href="https://caritas.barcelona/es/escuela-de-formacion-de-voluntariado/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                >
                  Consultar la escuela de formación ↗
                </a>

              </div>

              <!-- FUNDESPLAI -->

              <div class="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">

                <h4 class="mb-2 font-bold text-gray-900">
                  Fundesplai
                </h4>

                <p class="mb-3 text-sm leading-relaxed text-gray-600">
                  Imparte formación adaptada a las necesidades de
                  los voluntarios, ofreciendo herramientas y recursos
                  para mejorar su participación en proyectos sociales
                  y educativos.
                </p>

                <a
                  href="https://formacio.fundesplai.org/es/cursos/voluntariado/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                >
                  Consultar cursos de voluntariado ↗
                </a>

              </div>

              <!-- BARCELONACTUA -->

              <div class="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">

                <h4 class="mb-2 font-bold text-gray-900">
                  Barcelonactua
                </h4>

                <p class="mb-3 text-sm leading-relaxed text-gray-600">
                  Ofrece sesiones de bienvenida, orientación y
                  programas de acompañamiento y mentoría, como
                  BACbenvinguda o U-BAC, para facilitar la incorporación
                  de nuevas personas voluntarias.
                </p>

                <a
                  href="https://www.barcelonactua.org/es/ser-voluntarios"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                >
                  Cómo ser voluntario en Barcelonactua ↗
                </a>

              </div>

              <!-- AFANOC -->

              <div class="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">

                <h4 class="mb-2 font-bold text-gray-900">
                  AFANOC
                </h4>

                <p class="mb-3 text-sm leading-relaxed text-gray-600">
                  Organiza talleres de iniciación y formación para
                  voluntarios en ámbitos como el apoyo emocional,
                  el acompañamiento y el duelo.
                </p>

                <a
                  href="https://afanoc.org/es/voluntariado/formacion-barcelona/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                >
                  Consultar formación de voluntariado ↗
                </a>

              </div>

            </div>

          </div>

          <!-- INFORMACIÓN FINAL -->

          <div class="mt-6 rounded-xl border border-blue-200 bg-white p-4">

            <h4 class="mb-2 font-bold text-blue-900">
              💡 Una oportunidad para participar
            </h4>

            <p class="text-sm leading-relaxed text-gray-700">
              El voluntariado permite colaborar con entidades
              sociales, culturales y educativas, adquirir nuevas
              competencias y contribuir al bienestar de otras
              personas. Antes de incorporarte a un proyecto,
              consulta las condiciones de participación y la
              formación necesaria de cada entidad.
            </p>

          </div>

        </div>

      </section>

      <!-- TARJETAS PRINCIPALES -->

      <section class="mx-auto max-w-6xl px-6 py-12 md:py-16">

        <div class="mb-10 text-center">

          <h2 class="mb-3 text-3xl font-bold text-gray-900">
            ¿Qué necesitas hacer?
          </h2>

          <p class="mx-auto max-w-2xl leading-relaxed text-gray-600">
            Accede a tu perfil o consulta las guías y los materiales
            preparados para el profesorado.
          </p>

        </div>

        <div class="grid grid-cols-1 gap-7 md:grid-cols-2">

          <!-- ACCESO AL PERFIL -->

          <RouterLink
            to="/ateneu/tutores/acceso"
            class="group flex flex-col rounded-3xl border-2 border-amber-200 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl"
          >

            <div
              class="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl"
            >
              👤
            </div>

            <h3 class="mb-3 text-2xl font-bold text-gray-900">
              Entrar en mi perfil
            </h3>

            <p class="mb-6 flex-1 leading-relaxed text-gray-600">
              Accede a tu espacio personal para consultar tus clases,
              comunicarte con los alumnos y utilizar las herramientas
              disponibles para los tutores.
            </p>

            <span
              class="inline-flex items-center gap-2 font-bold text-amber-800"
            >
              Acceder

              <span
                class="text-2xl transition-transform group-hover:translate-x-2"
              >
                →
              </span>

            </span>

          </RouterLink>

          <!-- GUÍAS -->

          <RouterLink
            to="/ateneu/tutores/guias"
            class="group flex flex-col rounded-3xl border-2 border-blue-200 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl"
          >

            <div
              class="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl"
            >
              📚
            </div>

            <h3 class="mb-3 text-2xl font-bold text-gray-900">
              Guías para el profesorado
            </h3>

            <p class="mb-6 flex-1 leading-relaxed text-gray-600">
              Consulta las guías, instrucciones, documentos y materiales
              educativos que se irán incorporando a esta sección.
            </p>

            <span
              class="inline-flex items-center gap-2 font-bold text-blue-800"
            >
              Consultar guías

              <span
                class="text-2xl transition-transform group-hover:translate-x-2"
              >
                →
              </span>

            </span>

          </RouterLink>

        </div>

      </section>

      <!-- VOLVER -->

      <section class="border-t border-gray-200 bg-white">

        <div class="mx-auto max-w-6xl px-6 py-8 text-center">

          <RouterLink
            to="/joanmiro"
            class="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >

            <span>←</span>
            Volver a la escuela

          </RouterLink>

        </div>

      </section>

    </main>

  </div>

</div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import NavbarAteneu from '../../../components/ateneu/NavbarAteneu.vue'

const mostrarNormas = ref(false)
const mostrarAvisos = ref(false)
</script>
