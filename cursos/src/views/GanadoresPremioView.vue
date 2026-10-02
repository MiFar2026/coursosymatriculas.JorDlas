
<script setup>
import NavbarPremio from '../components/NavbarPremio.vue'
</script>

<template>

  <main class="ganadores-page">

    <!-- NAVBAR DEL PREMIO -->
    <NavbarPremio />

    <!-- IMAGEN -->
    <div class="imagen-ganadores">

      <img
        src="/fotos/premio/ganadores/Página en actualización.png"
        alt="Página en actualización"
      >

    </div>

  </main>

</template>


<style scoped>

.ganadores-page {
  width: 100%;
  min-height: 100vh;
}

.imagen-ganadores {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.imagen-ganadores img {
  max-width: 100%;
  height: auto;
  display: block;
}

</style>