<template>

  <nav class="navbar-premio">

    <!-- =========================
         NOMBRE DEL PREMIO
    ========================== -->

    <div class="navbar-logo">
      <router-link to="/premio">
        Premio
      </router-link>
    </div>


    <!-- =========================
         BOTÓN MÓVIL
    ========================== -->

    <button
      class="menu-button"
      @click="menuAbierto = !menuAbierto"
    >
      ☰
    </button>


    <!-- =========================
         MENÚ
    ========================== -->

    <div
      class="navbar-links"
      :class="{ abierto: menuAbierto }"
    >

      <!-- VOLVER A EXAEQUO -->

      <router-link to="/">
        ExAequo
      </router-link>


      <!-- HOME DEL PREMIO -->

      <router-link to="/premio">
        HOME
      </router-link>


      <!-- PARTICIPAR -->

      <router-link to="/premio/participar">
        Participar en el concurso
      </router-link>


      <!-- REQUISITOS -->

      <router-link to="/premio/requisitos">
        Requisitos del concurso
      </router-link>


      <!-- GANADORES -->

      <router-link to="/premio/ganadores">
        Ganadores anteriores
      </router-link>


      <!-- TESORO LITERARIO -->

      <router-link to="/premio/tesoro-literario">
        Inspírate: Tesoro Literario del Mundo
      </router-link>

    </div>

  </nav>

</template>


<script setup>

import { ref } from 'vue'

const menuAbierto = ref(false)

</script>


<style scoped>

/* =========================
   NAVBAR PRINCIPAL
========================= */

.navbar-premio {

  width: 100%;

  min-height: 70px;

  padding: 0 7%;

  display: flex;

  align-items: center;

  justify-content: space-between;

  background-color: black;

  border-bottom: 1px solid #ddd;

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  position: relative;

  z-index: 100;

}


/* =========================
   LOGO / PREMIO
========================= */

.navbar-logo a {

  text-decoration: none;

  color: white;

  font-size: 1.2rem;

  font-weight: bold;

}


/* =========================
   ENLACES
========================= */

.navbar-links {

  display: flex;

  align-items: center;

  gap: 25px;

}


.navbar-links a {

  text-decoration: none;

  color: white;

  font-size: 0.95rem;

  transition: 0.3s;

}


.navbar-links a:hover {

  color: #d8b27c;

}


/* =========================
   BOTÓN MÓVIL
========================= */

.menu-button {

  display: none;

  border: none;

  background: transparent;

  color: white;

  font-size: 1.7rem;

  cursor: pointer;

}


/* =========================
   MÓVIL
========================= */

@media (max-width: 900px) {

  .menu-button {

    display: block;

  }


  .navbar-links {

    display: none;

    position: absolute;

    top: 70px;

    left: 0;

    width: 100%;

    padding: 20px;

    background-color: black;

    flex-direction: column;

    gap: 18px;

    border-bottom: 1px solid #ddd;

    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  }


  .navbar-links.abierto {

    display: flex;

  }

}

</style>