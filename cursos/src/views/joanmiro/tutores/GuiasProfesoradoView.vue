
<template>
  <div class="min-h-screen bg-stone-50 text-gray-800">
    <!-- NAVBAR -->
    <NavbarJoanmiro />

    <!-- CABECERA -->
    <header
      class="border-b border-amber-200 bg-gradient-to-br from-amber-50 via-white to-stone-100"
    >
      <div class="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <p
          class="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-amber-800"
        >
          Biblioteca Joan Miró
        </p>

        <h1 class="mb-5 text-4xl font-bold text-gray-900 md:text-5xl">
          Guías para el profesorado
        </h1>

        <p class="max-w-3xl text-lg leading-relaxed text-gray-600">
          Un espacio para reunir instrucciones, documentos, materiales
          didácticos y recursos de apoyo para preparar y desarrollar las
          clases.
        </p>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <!-- PRESENTACIÓN -->
      <section
        class="mb-10 rounded-3xl border border-amber-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div class="flex items-start gap-4">
          <div
            class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-3xl"
          >
            📚
          </div>

          <div>
            <h2 class="mb-3 text-2xl font-bold text-gray-900">
              Materiales y orientaciones
            </h2>

            <p class="leading-relaxed text-gray-600">
              Aquí se organizarán las guías del profesorado para que puedas
              encontrar fácilmente los documentos y recursos que necesites.
              Esta página está preparada para incorporar nuevos contenidos
              más adelante.
            </p>
          </div>
        </div>
      </section>

      <!-- ESPACIO PARA LAS FUTURAS GUÍAS -->
      <section>
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900">
            Biblioteca de guías
          </h2>

          <p class="mt-2 text-gray-600">
            Los materiales se podrán organizar por categorías cuando empieces
            a incorporarlos.
          </p>
        </div>

        <div
          class="rounded-3xl border-2 border-dashed border-gray-300 bg-white px-6 py-14 text-center md:px-12"
        >
          <div
            class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-4xl"
          >
            📂
          </div>

          <h3 class="mb-3 text-xl font-bold text-gray-800">
            Próximamente, nuevas guías
          </h3>

          <p class="mx-auto max-w-xl leading-relaxed text-gray-500">
            Todavía no se han añadido documentos. Aquí podrás incorporar
            guías, archivos PDF, instrucciones para las clases, materiales
            didácticos y otros recursos para el profesorado.
          </p>
        </div>
      </section>

      <!-- NAVEGACIÓN -->
      <section class="mt-10 flex flex-wrap gap-3">
        <RouterLink
          to="/joanmiro/tutores"
          class="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          <span>←</span>
          Volver al espacio de tutores
        </RouterLink>

        <RouterLink
          to="/joanmiro/tutores/acceso"
          class="inline-flex items-center gap-2 rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white transition hover:bg-amber-800"
        >
          Entrar en mi perfil
          <span>→</span>
        </RouterLink>
      </section>
    </main>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import NavbarJoanmiro from '../../../components/joanmiro/NavbarJoanmiro.vue'
</script>
