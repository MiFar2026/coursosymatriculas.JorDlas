
<script setup>
import NavbarCursos from '../components/NavbarCursos.vue'
</script>

<template>

  <main class="min-h-screen bg-gray-100">

    <!-- NAVBAR DE CURSOS -->
    <NavbarCursos />

    <!-- CONTENIDO -->
    <div class="max-w-6xl mx-auto px-4 py-10">

      <!-- TÍTULO -->
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-10">
        Alfabetización
      </h1>

      <!-- TARJETAS -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <!-- 1. ALFABETO -->
        <RouterLink
          to="/alfabetizacion/alfabeto"
          class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >

          <div class="text-6xl text-center mb-4">
            🔤
          </div>

          <h2 class="text-2xl font-bold text-center text-gray-800">
            El alfabeto
          </h2>

          <p class="text-center text-gray-600 mt-3">
            Aprende las letras del alfabeto y escucha palabras.
          </p>

        </RouterLink>


        <!-- 2. ESCRIBIR LETRAS -->
        <RouterLink
          to="/alfabetizacion/escribir-letras"
          class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >

          <div class="text-6xl text-center mb-4">
            ✍️
          </div>

          <h2 class="text-2xl font-bold text-center text-gray-800">
            Escribir letras
          </h2>

          <p class="text-center text-gray-600 mt-3">
            Aprende cómo se escriben las letras.
          </p>

        </RouterLink>


        <!-- 3. PRACTICAR ESCRITURA -->
        <RouterLink
          to="/alfabetizacion/practicar-escritura"
          class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >

          <div class="text-6xl text-center mb-4">
            📝
          </div>

          <h2 class="text-2xl font-bold text-center text-gray-800">
            Practicar escritura
          </h2>

          <p class="text-center text-gray-600 mt-3">
            Practica la escritura de las letras.
          </p>

        </RouterLink>


        <!-- 4. LEER PALABRAS -->
        <RouterLink
          to="/alfabetizacion/leer-palabras"
          class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >

          <div class="text-6xl text-center mb-4">
            📖
          </div>

          <h2 class="text-2xl font-bold text-center text-gray-800">
            Leer palabras sencillas
          </h2>

          <p class="text-center text-gray-600 mt-3">
            Aprende a leer palabras sencillas.
          </p>

        </RouterLink>


        <!-- 5. PALABRAS DEL DÍA A DÍA -->
        <RouterLink
          to="/alfabetizacion/palabras-diarias"
          class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >

          <div class="text-6xl text-center mb-4">
            🔊
          </div>

          <h2 class="text-2xl font-bold text-center text-gray-800">
            Palabras del día a día
          </h2>

          <p class="text-center text-gray-600 mt-3">
            Escucha y aprende palabras importantes.
          </p>

        </RouterLink>

      </div>

    </div>

  </main>

</template>