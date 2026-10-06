
<template>
  <main class="escritura-page">

    <!-- NAVBAR -->
    <NavbarCursos />

    <!-- CABECERA -->
    <section class="intro">
      <div class="intro-icon">✍️</div>

      <h1>Practicar escritura</h1>

      <p>
        Elige un recurso para practicar y mejorar tu escritura en español.
      </p>
    </section>

    <!-- RECURSOS -->
    <section class="recursos-section">

      <div class="recursos">

        <!-- CENTRO -->
        <div class="centro">
          <span class="centro-icono">✍️</span>
          <span class="centro-texto">Practica<br />tu español</span>
        </div>

        <!-- ALFABETIZACIÓN -->
        <RouterLink
          to="/alfabetizacion/escritura"
          class="recurso recurso-1"
        >
          <span class="recurso-icono">🔤</span>
          <span class="recurso-titulo">Alfabetización</span>
          <span class="recurso-descripcion">
            Aprende a escribir
          </span>
        </RouterLink>

        <!-- PALABRAS -->
        <RouterLink
          to="/alfabetizacion/palabras"
          class="recurso recurso-2"
        >
          <span class="recurso-icono">📝</span>
          <span class="recurso-titulo">Palabras</span>
          <span class="recurso-descripcion">
            Practica vocabulario
          </span>
        </RouterLink>

        <!-- A1 -->
        <RouterLink
          to="/alfabetizacion/a1"
          class="recurso recurso-3"
        >
          <span class="recurso-icono">🌱</span>
          <span class="recurso-titulo">Nivel A1</span>
          <span class="recurso-descripcion">
            Empieza a practicar
          </span>
        </RouterLink>

        <!-- GRAMÁTICA -->
        <RouterLink
          to="/alfabetizacion/practicar-escritura/gramatica"
          class="recurso recurso-4"
        >
          <span class="recurso-icono">📚</span>
          <span class="recurso-titulo">Gramática básica</span>
          <span class="recurso-descripcion">
            Reglas y ejercicios
          </span>
        </RouterLink>

        <!-- NIVELES AVANZADOS -->
        <RouterLink
          to="/alfabetizacion/practicar-escritura/avanzados"
          class="recurso recurso-5"
        >
          <span class="recurso-icono">🚀</span>
          <span class="recurso-titulo">Niveles avanzados</span>
          <span class="recurso-descripcion">
            Practica más
          </span>
        </RouterLink>

        <!-- MATERIALES -->
        <div class="materiales-wrap">

          <button
            type="button"
            class="recurso recurso-6"
            @click="mostrarMateriales = !mostrarMateriales"
          >
            <span class="recurso-icono">📦</span>
            <span class="recurso-titulo">Materiales</span>
            <span class="recurso-descripcion">
              Recursos descargables
            </span>
          </button>

          <!-- DOS CÍRCULOS LATERALES -->
          <div
            v-if="mostrarMateriales"
            class="materiales-opciones"
          >

            <a
              href="https://refuerzoeducativo.es/espanol-para-extranjeros/"
              target="_blank"
              rel="noopener noreferrer"
              class="material-circle material-circle-1"
              aria-label="Material de español para extranjeros"
              title="Español para extranjeros"
            >
              📖
            </a>

            <a
              href="https://fedele.org/material-descargable/"
              target="_blank"
              rel="noopener noreferrer"
              class="material-circle material-circle-2"
              aria-label="Material descargable FEDELE"
              title="Material descargable FEDELE"
            >
              📥
            </a>

          </div>

        </div>

      </div>
    </section>

    <!-- PIE -->
    <section class="final-text">
      <p>
        🌟 Elige una opción y comienza a practicar.
      </p>
    </section>

  </main>
</template>

<script setup>
import { ref } from 'vue'
import NavbarCursos from '../../../../components/cursosymatricula/NavbarCursos.vue'
const mostrarMateriales = ref(false)
</script>

<style scoped>

/* =====================================================
   PÁGINA
===================================================== */

.escritura-page {
  min-height: 100vh;
  padding-bottom: 60px;
  background:
    radial-gradient(
      circle at top left,
      rgba(255, 221, 230, 0.8),
      transparent 35%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(211, 234, 255, 0.8),
      transparent 35%
    ),
    #fffaf4;
  color: #333;
}


/* =====================================================
   INTRO
===================================================== */

.intro {
  text-align: center;
  padding: 110px 20px 35px;
}

.intro-icon {
  font-size: 4rem;
  margin-bottom: 10px;
  animation: flotar 3s ease-in-out infinite;
}

.intro h1 {
  margin: 0;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  color: #573c8f;
  font-weight: 800;
}

.intro p {
  max-width: 650px;
  margin: 15px auto 0;
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
}


/* =====================================================
   ZONA DE RECURSOS
===================================================== */

.recursos-section {
  display: flex;
  justify-content: center;
  padding: 25px 20px 50px;
}

.recursos {
  position: relative;
  width: 700px;
  height: 700px;
}


/* =====================================================
   CÍRCULO CENTRAL
===================================================== */

.centro {
  position: absolute;
  top: 50%;
  left: 50%;

  width: 210px;
  height: 210px;

  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: linear-gradient(
    135deg,
    #ffffff,
    #f3eaff
  );

  border: 8px solid rgba(255, 255, 255, 0.9);

  box-shadow:
    0 15px 35px rgba(80, 60, 100, 0.18),
    inset 0 0 20px rgba(150, 120, 200, 0.08);

  z-index: 2;
}

.centro-icono {
  font-size: 3.5rem;
  margin-bottom: 5px;
}

.centro-texto {
  text-align: center;
  color: #573c8f;
  font-size: 1.15rem;
  line-height: 1.3;
  font-weight: 800;
}


/* =====================================================
   RECURSOS
===================================================== */

.recurso {
  position: absolute;

  width: 175px;
  height: 175px;

  border-radius: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 20px;

  box-sizing: border-box;

  border: 6px solid rgba(255, 255, 255, 0.9);

  text-align: center;

  text-decoration: none;

  cursor: pointer;

  color: #333;

  box-shadow:
    0 12px 28px rgba(70, 50, 80, 0.16);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.recurso:hover {
  transform: scale(1.08);
  box-shadow:
    0 18px 35px rgba(70, 50, 80, 0.23);
  z-index: 10;
}

.recurso-icono {
  font-size: 2.5rem;
  margin-bottom: 5px;
}

.recurso-titulo {
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.2;
}

.recurso-descripcion {
  margin-top: 6px;
  font-size: 0.78rem;
  line-height: 1.2;
  opacity: 0.75;
}


/* =====================================================
   COLORES
===================================================== */

/* Alfabetización */
.recurso-1 {
  top: 25px;
  left: 262px;

  background: linear-gradient(
    135deg,
    #ffd1dc,
    #ffb3c6
  );
}

/* Palabras */
.recurso-2 {
  top: 150px;
  right: 35px;

  background: linear-gradient(
    135deg,
    #c9f7d5,
    #91e6aa
  );
}

/* A1 */
.recurso-3 {
  bottom: 120px;
  right: 40px;

  background: linear-gradient(
    135deg,
    #c7e7ff,
    #91cfff
  );
}

/* Gramática */
.recurso-4 {
  bottom: 25px;
  left: 262px;

  background: linear-gradient(
    135deg,
    #ffe9a8,
    #ffd56a
  );
}

/* Avanzados */
.recurso-5 {
  bottom: 120px;
  left: 40px;

  background: linear-gradient(
    135deg,
    #dfc7ff,
    #c29aff
  );
}

/* Materiales */
.recurso-6 {
  top: 150px;
  left: 35px;

  background: linear-gradient(
    135deg,
    #ffd3a5,
    #ffb56b
  );

  font-family: inherit;
}


/* =====================================================
   MATERIALES
===================================================== */

.materiales-wrap {
  position: absolute;

  top: 150px;
  left: 35px;

  width: 175px;
  height: 175px;

  z-index: 4;
}

.materiales-wrap .recurso-6 {
  position: absolute;
  top: 0;
  left: 0;
}


/* Contenedor de los dos círculos */

.materiales-opciones {
  position: absolute;

  top: 45px;
  left: -105px;

  display: flex;
  flex-direction: column;

  gap: 12px;

  z-index: 20;

  animation: aparecer 0.25s ease;
}


/* Círculos pequeños */

.material-circle {
  width: 58px;
  height: 58px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;

  font-size: 1.5rem;

  background: white;

  border: 4px solid white;

  box-shadow:
    0 8px 20px rgba(60, 45, 70, 0.18);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.material-circle:hover {
  transform: scale(1.15);
  box-shadow:
    0 12px 25px rgba(60, 45, 70, 0.25);
}

.material-circle-1 {
  background: #fff0b8;
}

.material-circle-2 {
  background: #bde8ff;
}


/* =====================================================
   TEXTO FINAL
===================================================== */

.final-text {
  text-align: center;
  padding: 0 20px;
}

.final-text p {
  display: inline-block;

  margin: 0;

  padding: 12px 22px;

  border-radius: 30px;

  background: white;

  color: #6b5a78;

  box-shadow:
    0 6px 18px rgba(80, 60, 90, 0.08);

  font-weight: 600;
}


/* =====================================================
   ANIMACIONES
===================================================== */

@keyframes flotar {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateX(10px) scale(0.8);
  }

  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 800px) {

  .recursos-section {
    padding: 20px 10px 40px;
  }

  .recursos {
    width: 560px;
    height: 560px;
    transform: scale(0.9);
    transform-origin: top center;
    margin-bottom: -60px;
  }

  .centro {
    width: 180px;
    height: 180px;
  }

  .recurso {
    width: 145px;
    height: 145px;
  }

  .materiales-wrap {
    width: 145px;
    height: 145px;
  }

  .materiales-wrap .recurso-6 {
    width: 145px;
    height: 145px;
  }

  .recurso-icono {
    font-size: 2rem;
  }

  .recurso-titulo {
    font-size: 0.9rem;
  }

  .recurso-descripcion {
    font-size: 0.7rem;
  }

  .recurso-1 {
    left: 207px;
  }

  .recurso-2 {
    right: 20px;
  }

  .recurso-3 {
    right: 20px;
  }

  .recurso-4 {
    left: 207px;
  }

  .recurso-5 {
    left: 20px;
  }

  .materiales-wrap {
    left: 20px;
  }

  .materiales-opciones {
    left: -75px;
  }
}


@media (max-width: 600px) {

  .intro {
    padding-top: 100px;
  }

  .intro h1 {
    font-size: 2.2rem;
  }

  .intro p {
    font-size: 1rem;
  }

  .recursos {
    width: 430px;
    height: 430px;
    transform: scale(0.78);
    margin-bottom: -90px;
  }

  .centro {
    width: 160px;
    height: 160px;
  }

  .centro-icono {
    font-size: 2.7rem;
  }

  .centro-texto {
    font-size: 1rem;
  }

  .recurso {
    width: 130px;
    height: 130px;
  }

  .materiales-wrap {
    width: 130px;
    height: 130px;
  }

  .materiales-wrap .recurso-6 {
    width: 130px;
    height: 130px;
  }

  .recurso-1 {
    left: 150px;
  }

  .recurso-2 {
    right: 0;
  }

  .recurso-3 {
    right: 0;
  }

  .recurso-4 {
    left: 150px;
  }

  .recurso-5 {
    left: 0;
  }

  .materiales-wrap {
    left: 0;
  }

  .materiales-opciones {
    left: -65px;
  }

  .material-circle {
    width: 52px;
    height: 52px;
    font-size: 1.3rem;
  }
}


@media (max-width: 450px) {

  .recursos {
    width: 360px;
    height: 360px;
    transform: scale(0.68);
    margin-bottom: -115px;
  }

  .recurso-1 {
    left: 115px;
  }

  .recurso-4 {
    left: 115px;
  }

}

</style>