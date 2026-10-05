<template>

  <main class="escritura-page">

    <!-- =====================================
         NAVBAR
    ====================================== -->

    <NavbarCursos />


    <!-- =====================================
         CABECERA
    ====================================== -->

    <section class="intro">

      <span class="etiqueta">
        PRACTICA A TU RITMO
      </span>

      <h1>
        Practicar escritura
      </h1>

      <p>
        Aprende, escribe y practica paso a paso.
        Hemos preparado diferentes recursos para que puedas
        empezar desde las letras y avanzar poco a poco
        hacia palabras, gramática y niveles más avanzados.
      </p>

    </section>


    <!-- =====================================
         CÍRCULO DE RECURSOS
    ====================================== -->

    <section class="recursos">

      <div class="circulo-central">

        <div class="centro">

          <span>✎</span>

          <strong>
            ESCRITURA
          </strong>

          <small>
            Practica y aprende
          </small>

        </div>


        <!-- ALFABETIZACIÓN -->

        <RouterLink
          to="/practicar-escritura/alfabetizacion"
          class="recurso recurso-1"
        >

          <div class="icono">
            Aa
          </div>

          <strong>
            Alfabetización
          </strong>

          <small>
            Letras y trazos
          </small>

        </RouterLink>


        <!-- PALABRAS -->

        <RouterLink
          to="/practicar-escritura/palabras"
          class="recurso recurso-2"
        >

          <div class="icono">
            ABC
          </div>

          <strong>
            Palabras básicas
          </strong>

          <small>
            Escribe tus primeras palabras
          </small>

        </RouterLink>


        <!-- A1 -->

        <RouterLink
          to="/practicar-escritura/a1"
          class="recurso recurso-3"
        >

          <div class="icono">
            A1
          </div>

          <strong>
            Nivel A1
          </strong>

          <small>
            Un paso más
          </small>

        </RouterLink>


        <!-- GRAMÁTICA -->

        <a
          href="https://pigquiz.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="recurso recurso-4"
        >

          <div class="icono">
            ✓
          </div>

          <strong>
            Gramática básica
          </strong>

          <small>
            Practica online
          </small>

        </a>


        <!-- NIVELES AVANZADOS -->

        <a
          href="https://aprenderespanol.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="recurso recurso-5"
        >

          <div class="icono">
            ★
          </div>

          <strong>
            Niveles avanzados
          </strong>

          <small>
            Practica online
          </small>

        </a>


        <!-- MATERIALES -->

        <div
          class="recurso recurso-6"
          @click="mostrarMateriales = !mostrarMateriales"
        >

          <div class="icono">
            ↓
          </div>

          <strong>
            Materiales
          </strong>

          <small>
            Recursos educativos
          </small>

        </div>

      </div>

    </section>


    <!-- =====================================
         MATERIAL EXTERNO
    ====================================== -->

    <section
      v-if="mostrarMateriales"
      class="materiales"
    >

      <div class="materiales-cabecera">

        <span class="etiqueta">
          RECURSOS GRATUITOS
        </span>

        <h2>
          Más materiales para aprender
        </h2>

        <p>
          También puedes encontrar materiales educativos
          preparados por otras organizaciones.
        </p>

      </div>


      <div class="materiales-grid">

        <a
          href="https://refuerzoeducativo.es/espanol-para-extranjeros/"
          target="_blank"
          rel="noopener noreferrer"
          class="material-card"
        >

          <span class="material-icon">
            📚
          </span>

          <h3>
            Refuerzo Educativo
          </h3>

          <p>
            Materiales de español para personas extranjeras.
          </p>

          <span class="ir">
            Ver materiales →
          </span>

        </a>


        <a
          href="https://fedele.org/material-descargable/"
          target="_blank"
          rel="noopener noreferrer"
          class="material-card"
        >

          <span class="material-icon">
            📖
          </span>

          <h3>
            FEDELE
          </h3>

          <p>
            Material educativo descargable para aprender español.
          </p>

          <span class="ir">
            Ver materiales →
          </span>

        </a>

      </div>

    </section>


    <!-- =====================================
         MENSAJE FINAL
    ====================================== -->

    <section class="final">

      <span class="etiqueta">
        PASO A PASO
      </span>

      <h2>
        No importa desde dónde empiezas
      </h2>

      <p>
        Empieza por las letras, continúa con palabras
        y avanza a tu propio ritmo.
        Lo importante es practicar.
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

/* =========================================
   PÁGINA
========================================= */

.escritura-page {

  min-height: 100vh;

  background:
    radial-gradient(
      circle at top,
      #fffaf3 0%,
      #f5eee3 45%,
      #eee4d6 100%
    );

  color: #40372f;

}


/* =========================================
   INTRO
========================================= */

.intro {

  text-align: center;

  max-width: 800px;

  margin: 0 auto;

  padding: 80px 25px 20px;

}


.etiqueta {

  display: inline-block;

  margin-bottom: 14px;

  font-size: 0.75rem;

  font-weight: 700;

  letter-spacing: 3px;

  color: #a05f3d;

}


.intro h1 {

  margin: 0;

  font-family: Georgia, serif;

  font-size: clamp(2.5rem, 6vw, 4.5rem);

  font-weight: 500;

  color: #40342c;

}


.intro p {

  max-width: 650px;

  margin: 25px auto 0;

  font-size: 1.08rem;

  line-height: 1.8;

  color: #71665c;

}


/* =========================================
   CÍRCULO
========================================= */

.recursos {

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 60px 20px 100px;

}


.circulo-central {

  position: relative;

  width: 680px;

  height: 680px;

}


/* =========================================
   CENTRO
========================================= */

.centro {

  position: absolute;

  left: 50%;

  top: 50%;

  transform: translate(-50%, -50%);

  width: 210px;

  height: 210px;

  border-radius: 50%;

  background: #fffaf3;

  border: 2px solid #d6c4ae;

  box-shadow:
    0 15px 40px rgba(70, 50, 35, 0.12),
    inset 0 0 0 12px rgba(216, 194, 169, 0.18);

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  text-align: center;

}


.centro span {

  font-size: 2.4rem;

  margin-bottom: 8px;

}


.centro strong {

  font-family: Georgia, serif;

  font-size: 1.35rem;

  letter-spacing: 2px;

}


.centro small {

  margin-top: 8px;

  color: #897b6d;

}


/* =========================================
   RECURSOS CIRCULARES
========================================= */

.recurso {

  position: absolute;

  width: 170px;

  height: 170px;

  border-radius: 50%;

  background: rgba(255, 250, 243, 0.92);

  border: 1px solid #d9c7b2;

  box-shadow: 0 10px 30px rgba(70, 50, 35, 0.09);

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  text-align: center;

  text-decoration: none;

  color: #493d35;

  padding: 20px;

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;

}


.recurso:hover {

  transform: scale(1.08);

  background: #fffdf9;

  box-shadow: 0 18px 40px rgba(70, 50, 35, 0.17);

}


.recurso .icono {

  font-family: Georgia, serif;

  font-size: 1.5rem;

  font-weight: bold;

  margin-bottom: 9px;

  color: #a05f3d;

}


.recurso strong {

  font-family: Georgia, serif;

  font-size: 1rem;

  line-height: 1.2;

}


.recurso small {

  margin-top: 7px;

  font-size: 0.75rem;

  line-height: 1.3;

  color: #897b6d;

}


/* =========================================
   POSICIONES
========================================= */

.recurso-1 {

  top: 0;

  left: 50%;

  transform: translateX(-50%);

}


.recurso-1:hover {

  transform: translateX(-50%) scale(1.08);

}


.recurso-2 {

  top: 18%;

  right: 2%;

}


.recurso-3 {

  bottom: 18%;

  right: 2%;

}


.recurso-4 {

  bottom: 0;

  left: 50%;

  transform: translateX(-50%);

}


.recurso-4:hover {

  transform: translateX(-50%) scale(1.08);

}


.recurso-5 {

  bottom: 18%;

  left: 2%;

}


.recurso-6 {

  top: 18%;

  left: 2%;

  cursor: pointer;

}


/* =========================================
   MATERIALES
========================================= */

.materiales {

  max-width: 1000px;

  margin: 0 auto;

  padding: 20px 25px 100px;

}


.materiales-cabecera {

  text-align: center;

  margin-bottom: 40px;

}


.materiales-cabecera h2 {

  margin: 5px 0 15px;

  font-family: Georgia, serif;

  font-size: 2.2rem;

  font-weight: 500;

}


.materiales-cabecera p {

  color: #71665c;

}


/* =========================================
   CARDS
========================================= */

.materiales-grid {

  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 25px;

}


.material-card {

  display: block;

  padding: 35px;

  background: rgba(255, 250, 243, 0.9);

  border: 1px solid #ddcdbb;

  border-radius: 22px;

  text-decoration: none;

  color: #493d35;

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

}


.material-card:hover {

  transform: translateY(-6px);

  box-shadow: 0 15px 35px rgba(70, 50, 35, 0.12);

}


.material-icon {

  font-size: 2rem;

}


.material-card h3 {

  margin: 15px 0 10px;

  font-family: Georgia, serif;

  font-size: 1.4rem;

}


.material-card p {

  line-height: 1.7;

  color: #71665c;

}


.ir {

  display: inline-block;

  margin-top: 15px;

  font-weight: 700;

  color: #a05f3d;

}


/* =========================================
   FINAL
========================================= */

.final {

  max-width: 750px;

  margin: 0 auto;

  padding: 50px 25px 120px;

  text-align: center;

}


.final h2 {

  font-family: Georgia, serif;

  font-size: 2.3rem;

  font-weight: 500;

  margin: 5px 0 20px;

}


.final p {

  color: #71665c;

  line-height: 1.8;

}


/* =========================================
   MÓVIL
========================================= */

@media (max-width: 750px) {

  .intro {

    padding-top: 55px;

  }


  .recursos {

    padding-top: 40px;

  }


  .circulo-central {

    width: 360px;

    height: 720px;

  }


  .centro {

    width: 160px;

    height: 160px;

  }


  .recurso {

    width: 125px;

    height: 125px;

    padding: 12px;

  }


  .recurso strong {

    font-size: 0.85rem;

  }


  .recurso small {

    font-size: 0.68rem;

  }


  .recurso-1 {

    top: 0;

  }


  .recurso-2 {

    top: 18%;

    right: 0;

  }


  .recurso-3 {

    bottom: 18%;

    right: 0;

  }


  .recurso-4 {

    bottom: 0;

  }


  .recurso-5 {

    bottom: 18%;

    left: 0;

  }


  .recurso-6 {

    top: 18%;

    left: 0;

  }


  .materiales-grid {

    grid-template-columns: 1fr;

  }

}

</style>
