
<script setup>

import { ref } from 'vue'

const menuAbierto = ref(false)

const abrirMenu = () => {
  menuAbierto.value = !menuAbierto.value
}

</script>


<template>

  <main class="premio-page">

    <!-- IMAGEN PRINCIPAL -->
    <img
      :src="'/fotos/premio/Biblioteca de sueños junto al mar.png'"
      alt="Biblioteca de sueños junto al mar"
      class="imagen-fondo"
    />


    <!-- MENÚ SOBRE LA FRANJA BLANCA -->
    <div class="menu-premio">

      <!-- BOTÓN PRINCIPAL -->
      <button
        @click="abrirMenu"
        class="boton-premio"
        :aria-expanded="menuAbierto"
        aria-label="Abrir menú del premio literario"
      >

        <span>
          Premio literario
        </span>

        <span
          class="flecha"
          :class="{ abierto: menuAbierto }"
          aria-hidden="true"
        >
          ▾
        </span>

      </button>


      <!-- MENÚ DESPLEGABLE -->
      <div
        v-if="menuAbierto"
        class="desplegable"
      >

        <!-- 1 -->
        <RouterLink
          to="/"
          class="opcion"
          @click="menuAbierto = false"
        >
          <span>1.</span>
          <span>ExAequo</span>
        </RouterLink>


        <!-- 2 -->
        <RouterLink
          to="/premio/participar"
          class="opcion"
          @click="menuAbierto = false"
        >
          <span>2.</span>
          <span>Participar en el concurso</span>
        </RouterLink>


        <!-- 3 -->
        <RouterLink
          to="/premio/requisitos"
          class="opcion"
          @click="menuAbierto = false"
        >
          <span>3.</span>
          <span>Requisitos del concurso</span>
        </RouterLink>


        <!-- 4 -->
        <RouterLink
          to="/premio/ganadores"
          class="opcion"
          @click="menuAbierto = false"
        >
          <span>4.</span>
          <span>Ganadores anteriores y sus obras</span>
        </RouterLink>


        <!-- 5 -->
        <RouterLink
          to="/premio/tesoro-literario"
          class="opcion"
          @click="menuAbierto = false"
        >
          <span>5.</span>
          <span>Inspírate: Tesoro Literario del Mundo</span>
        </RouterLink>

      </div>

    </div>

  </main>

</template>


<style scoped>

.premio-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: #1c130d;
}


/* ================================
   IMAGEN PRINCIPAL
================================ */

.imagen-fondo {
  display: block;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: center;
}


/* ================================
   CONTENEDOR DEL MENÚ
================================ */

.menu-premio {
  position: absolute;

  left: 50%;

  top: calc(83% + 0.1cm);

  transform: translate(-50%, -50%);

  width: calc(47% + 0.3cm);
  max-width: 780px;

  z-index: 10;
}


/* ================================
   BOTÓN PRINCIPAL
================================ */

.boton-premio {
  width: 100%;
  height: 68px;

  border: none;
  border-radius: 30px;

background: transparent;
  color: #60421f;

  font-family: Georgia, 'Times New Roman', serif;

  font-size: 25px;
  font-weight: bold;

  letter-spacing: 0.5px;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 18px;

  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.25);

  transition:
    transform 0.2s ease,
    background 0.2s ease;
}


.boton-premio:hover {
  background: #fffdf5;

  transform: scale(1.02);
}


/* ================================
   FLECHA
================================ */

.flecha {
  display: inline-block;

  font-size: 25px;

  transition:
    transform 0.25s ease;
}


.flecha.abierto {
  transform: rotate(180deg);
}


/* ================================
   MENÚ DESPLEGABLE
   SE ABRE HACIA ARRIBA
================================ */

.desplegable {

  position: absolute;

  /* Hace que el menú aparezca encima del botón */
  bottom: calc(100% + 10px);

  left: 0;

  width: 100%;

  background: rgba(255, 250, 235, 0.98);

  border-radius: 30px; 

  overflow: hidden;

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.35);

  border: 1px solid rgba(120, 80, 30, 0.25);
}


/* ================================
   OPCIONES
================================ */

.opcion {

  display: flex;

  align-items: center;

  gap: 15px;

  padding: 18px 25px;

  color: #4d351d;

  text-decoration: none;

  font-family: Georgia, 'Times New Roman', serif;

  font-size: 19px;

  border-bottom:
    1px solid rgba(120, 80, 30, 0.18);

  transition:
    background 0.2s ease,
    padding-left 0.2s ease;
}


.opcion:last-child {
  border-bottom: none;
}


.opcion:hover {

  background: rgba(225, 204, 165, 0.45);

  padding-left: 32px;
}


.opcion span:first-child {

  font-weight: bold;

  color: #96703b;

  min-width: 25px;
}


/* ================================
   TABLET
================================ */

@media (max-width: 900px) {

  .menu-premio {

    width: 60%;

    top: calc(77% + 0.5cm);
  }

  .boton-premio {
    font-size: 21px;
  }

  .opcion {
    font-size: 17px;
  }

}


/* ================================
   MÓVIL
================================ */

@media (max-width: 600px) {

  .imagen-fondo {
    object-position: center;
  }

  .menu-premio {

    width: 85%;

    top: calc(77% + 0.5cm);
  }

  .boton-premio {

    height: 40px;

    font-size: 18px;
  }

  .opcion {

    padding: 15px 18px;

    font-size: 15px;

    gap: 10px;
  }

}

</style>