<script setup>
import NavbarCursos from '../../../components/cursosymatricula/NavbarCursos.vue'
</script>

<template>

  <main class="min-h-screen bg-gray-100">

    <!-- ========================================= -->
    <!-- NAVBAR -->
    <!-- ========================================= -->

    <NavbarCursos />


    <!-- ========================================= -->
    <!-- BANNER -->
    <!-- ========================================= -->

    <section class="max-w-6xl mx-auto px-2 sm:px-4 pt-8">

      <img
        src="/fotos/cursos/Banner educativo de alfabetización.png"
        alt="Banner educativo de alfabetización"
        class="w-full h-auto rounded-2xl shadow-xl"
      />

    </section>


    <!-- ========================================= -->
    <!-- XILÓFONO -->
    <!-- ========================================= -->

    <section class="max-w-6xl mx-auto px-2 sm:px-4 pb-12">

      <div class="xilofono-grid">


        <!-- ===================================== -->
        <!-- 1. ALFABETO -->
        <!-- ===================================== -->

        <div class="xilofono-item">

          <div class="cuerda"></div>

          <RouterLink
            to="/alfabetizacion/alfabeto"
            class="tecla bg-red-500"
          >

            <div class="icono">
              🔤
            </div>

            <div class="texto">
              <h2>
                El alfabeto
              </h2>

              <p>
                Aprende las letras del alfabeto y escucha palabras.
              </p>
            </div>

          </RouterLink>

        </div>


        <!-- ===================================== -->
        <!-- 2. ESCRIBIR LETRAS -->
        <!-- ===================================== -->

        <div class="xilofono-item">

          <div class="cuerda"></div>

          <RouterLink
            to="/alfabetizacion/escribir-letras"
            class="tecla bg-orange-500"
          >

            <div class="icono">
              ✍️
            </div>

            <div class="texto">
              <h2>
                Escribir letras
              </h2>

              <p>
                Aprende cómo se escriben las letras.
              </p>
            </div>

          </RouterLink>

        </div>


        <!-- ===================================== -->
        <!-- 3. PRACTICAR ESCRITURA -->
        <!-- ===================================== -->

        <div class="xilofono-item">

          <div class="cuerda"></div>

          <RouterLink
            to="/alfabetizacion/practicar-escritura"
            class="tecla bg-yellow-400"
          >

            <div class="icono">
              📝
            </div>

            <div class="texto">
              <h2>
                Practicar escritura
              </h2>

              <p>
                Practica la escritura de las letras.
              </p>
            </div>

          </RouterLink>

        </div>


        <!-- ===================================== -->
        <!-- 4. LEER PALABRAS -->
        <!-- ===================================== -->

        <div class="xilofono-item">

          <div class="cuerda"></div>

          <RouterLink
            to="/alfabetizacion/leer-palabras"
            class="tecla bg-green-500"
          >

            <div class="icono">
              📖
            </div>

            <div class="texto">
              <h2>
                Leer palabras
              </h2>

              <p>
                Aprende a leer palabras sencillas.
              </p>
            </div>

          </RouterLink>

        </div>


        <!-- ===================================== -->
        <!-- 5. PALABRAS DEL DÍA A DÍA -->
        <!-- ===================================== -->

        <div class="xilofono-item">

          <div class="cuerda"></div>

          <RouterLink
            to="/alfabetizacion/palabras-diarias"
            class="tecla bg-blue-500"
          >

            <div class="icono">
              🔊
            </div>

            <div class="texto">
              <h2>
                Palabras del día a día
              </h2>

              <p>
                Escucha y aprende palabras importantes.
              </p>
            </div>

          </RouterLink>

        </div>


        <!-- ===================================== -->
        <!-- 6. RELATOS -->
        <!-- ===================================== -->

        <div class="xilofono-item">

          <div class="cuerda"></div>

          <RouterLink
            to="/alfabetizacion/relatos"
            class="tecla bg-purple-500"
          >

            <div class="icono">
              📚
            </div>

            <div class="texto">
              <h2>
                Leer y escuchar relatos
              </h2>

              <p>
                Lee y escucha relatos sencillos.
              </p>
            </div>

          </RouterLink>

        </div>


      </div>

    </section>

  </main>

</template>


<style scoped>

/* ================================================= */
/* XILÓFONO                                          */
/* ================================================= */

.xilofono-grid {

  display: grid;

  grid-template-columns: repeat(6, minmax(0, 1fr));

  gap: 12px;

  align-items: start;

}


/* ================================================= */
/* CADA TECLA + SU CUERDA                            */
/* ================================================= */

.xilofono-item {

  min-width: 0;

  display: flex;

  flex-direction: column;

  align-items: center;

}


/* ================================================= */
/* CUERDA                                            */
/* ================================================= */

.cuerda {

  width: 3px;

  height: 45px;

  background: #4b5563;

  flex-shrink: 0;

}


/* ================================================= */
/* TECLA                                              */
/* ================================================= */

.tecla {

  width: 100%;

  min-height: 230px;

  padding: 20px 10px;

  border-radius: 0 0 25px 25px;

  color: white;

  text-align: center;

  text-decoration: none;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: flex-start;

  box-shadow:
    0 10px 15px rgba(0, 0, 0, 0.20),
    inset 0 3px 0 rgba(255, 255, 255, 0.25);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

}


/* ================================================= */
/* ICONO                                              */
/* ================================================= */

.icono {

  font-size: 3rem;

  line-height: 1;

  margin-bottom: 15px;

}


/* ================================================= */
/* TITULO                                             */
/* ================================================= */

.tecla h2 {

  font-size: 1.2rem;

  font-weight: 700;

  line-height: 1.2;

  margin-bottom: 10px;

}


/* ================================================= */
/* DESCRIPCIÓN                                        */
/* ================================================= */

.tecla p {

  font-size: 0.9rem;

  line-height: 1.4;

}


/* ================================================= */
/* EFECTO                                              */
/* ================================================= */

.tecla:hover {

  transform: translateY(8px);

  box-shadow:
    0 5px 10px rgba(0, 0, 0, 0.25),
    inset 0 3px 0 rgba(255, 255, 255, 0.3);

}


/* ================================================= */
/* MÓVIL                                              */
/* ================================================= */

@media (max-width: 639px) {

  /*
   * MUY IMPORTANTE:
   * seguimos teniendo 6 columnas.
   * Nunca pasa a una columna.
   */

  .xilofono-grid {

    grid-template-columns: repeat(6, minmax(0, 1fr));

    gap: 3px;

  }


  /* CUERDA */

  .cuerda {

    width: 2px;

    height: 25px;

  }


  /* TECLA */

  .tecla {

    min-height: 70px;

    padding: 10px 2px;

    border-radius: 0 0 10px 10px;

  }


  /* ICONO */

  .icono {

    font-size: 1.7rem;

    margin: 0;

  }


  /*
   * EN MÓVIL NO MOSTRAMOS
   * TÍTULO NI DESCRIPCIÓN
   */

  .texto {

    display: none;

  }


  /* EFECTO MÓVIL */

  .tecla:hover {

    transform: translateY(3px);

  }

}

</style>