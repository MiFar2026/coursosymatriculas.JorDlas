<script setup>

import { ref } from 'vue'
import NavbarPremio from '../../../components/premio/NavbarPremio.vue'

/*
|--------------------------------------------------------------------------
| ACORDEÓN
|--------------------------------------------------------------------------
| Solo una sección puede estar abierta al mismo tiempo.
*/

const seccionAbierta = ref(null)

function toggleSeccion(seccion) {
  if (seccionAbierta.value === seccion) {
    seccionAbierta.value = null
  } else {
    seccionAbierta.value = seccion
  }
}

</script>


<template>

  <main class="tesoro-page">

    <!-- =====================================================
         NAVBAR
    ====================================================== -->

    <NavbarPremio />


    <!-- =====================================================
         CABECERA
    ====================================================== -->

    <section class="hero">

      <div class="hero-content">

        <h1>
          Inspírate leyendo el Tesoro Literario del Mundo
        </h1>

        <p class="subtitulo">
          Literatura, cultura y aprendizaje de idiomas
        </p>

        <p>
          La literatura universal es un inmenso mapa de tesoros
          donde cada libro es una joya que expande nuestra mente
          y alimenta nuestra imaginación.
          La literatura nos permite conocer otras épocas, culturas,
          ideas y formas de pensar. Leer también ayuda a ampliar el
          vocabulario, mejorar la comprensión y aprender un idioma
          dentro de su contexto cultural.
        </p>

        <p>
          En esta biblioteca encontrarás obras gratuitas en línea
          organizadas por idioma. Haz clic sobre cualquier título
          para acceder directamente al libro.
        </p>

      </div>

    </section>



    <!-- =====================================================
         CONTENEDOR PRINCIPAL DE LAS 5 SECCIONES
    ====================================================== -->

    <div class="acordeon-container">


      <!-- ===================================================
           1. DÓNDE ENCONTRAR LIBROS GRATUITOS
      ==================================================== -->

      <section class="acordeon-seccion">

        <button
          class="acordeon-header"
          :class="{ activo: seccionAbierta === 'recursos' }"
          @click="toggleSeccion('recursos')"
          type="button"
        >

          <img
  :src="'/fotos/premio/tesoro/dondeEncontrar.png'"
  alt="Dónde encontrar libros gratuitos"
  class="foto-acordeon"
/>

          <div class="titulo-foto">

            <h2>
              Dónde encontrar libros gratuitos
            </h2>

            <span class="flecha">
              {{ seccionAbierta === 'recursos' ? '▲' : '▼' }}
            </span>

          </div>

        </button>


        <div
          class="acordeon-contenido"
          :class="{ abierto: seccionAbierta === 'recursos' }"
        >

          <div class="contenido-interior">

            <p class="recursos-intro">

              Estas bibliotecas digitales ofrecen libros y recursos
              gratuitos que pueden ser útiles para leer, aprender idiomas
              y conocer diferentes culturas.

            </p>


            <div class="recursos-grid">


              <a
                href="https://www.gutenberg.org/"
                target="_blank"
                rel="noopener noreferrer"
                class="recurso"
              >

                <h3>
                  Project Gutenberg
                </h3>

                <p>
                  Biblioteca digital con miles de libros gratuitos,
                  especialmente obras de dominio público.
                </p>

              </a>


              <a
                href="https://www.cervantesvirtual.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="recurso"
              >

                <h3>
                  Biblioteca Virtual Miguel de Cervantes
                </h3>

                <p>
                  Biblioteca especializada en literatura y cultura
                  hispánica.
                </p>

              </a>


              <a
                href="https://atenas.cervantes.es/es/cursos_espanol/recursos_didacticos_en_linea_gratuitos.htm"
                target="_blank"
                rel="noopener noreferrer"
                class="recurso"
              >

                <h3>
                  Instituto Cervantes
                </h3>

                <p>
                  Recursos gratuitos para aprender español y conocer
                  la cultura en español.
                </p>

              </a>


              <a
                href="https://babel.hathitrust.org/cgi/ls?a=srchls;c=1959461780;q1=*;facet=language008_full:%22Spanish%22"
                target="_blank"
                rel="noopener noreferrer"
                class="recurso"
              >

                <h3>
                  HathiTrust
                </h3>

                <p>
                  Colecciones digitales de libros y documentos,
                  con recursos en español.
                </p>

              </a>


              <a
                href="https://archive.org/"
                target="_blank"
                rel="noopener noreferrer"
                class="recurso"
              >

                <h3>
                  Internet Archive
                </h3>

                <p>
                  Gran biblioteca digital donde se pueden consultar
                  libros, documentos y otros materiales.
                </p>

              </a>


            </div>

          </div>

        </div>

      </section>



      <!-- ===================================================
           2. LECTURAS PARA APRENDER ESPAÑOL
      ==================================================== -->

      <section class="acordeon-seccion">

        <button
          class="acordeon-header"
          :class="{ activo: seccionAbierta === 'lecturas' }"
          @click="toggleSeccion('lecturas')"
          type="button"
        >

          <img
  :src="'/fotos/premio/tesoro/lecturaEspañol.png'"
  alt="Lecturas para aprender español"
  class="foto-acordeon"
/>

          <div class="titulo-foto">

            <h2>
              Lecturas para aprender español
            </h2>

            <span class="flecha">
              {{ seccionAbierta === 'lecturas' ? '▲' : '▼' }}
            </span>

          </div>

        </button>


        <div
          class="acordeon-contenido"
          :class="{ abierto: seccionAbierta === 'lecturas' }"
        >

          <div class="contenido-interior">

            <p class="lecturas-intro">

              Algunas obras pueden ser especialmente útiles para practicar
              la lectura en español, desde textos sencillos hasta clásicos
              más avanzados.

            </p>


            <div class="niveles">


              <!-- PRINCIPIANTE - INTERMEDIO -->

              <div class="nivel">

                <h3>
                  🌱 Principiante – Intermedio
                </h3>


                <div class="lectura">

                  <h4>
                    Las fábulas de Esopo — Esopo
                  </h4>

                  <p>
                    Historias breves protagonizadas por animales que permiten
                    trabajar la comprensión lectora, el vocabulario y la
                    expresión oral a través de relatos sencillos.
                  </p>

                  <a
                    href="https://campuseducativo.santafe.edu.ar/wp-content/uploads/adjuntos/recursos/20180419/campus_20180320150123phpFtNzv8.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Leer en Campus Educativo →
                  </a>

                </div>


                <div class="lectura">

                  <h4>
                    Leyendas — Gustavo Adolfo Bécquer
                  </h4>

                  <p>
                    Historias independientes de misterio, romance
                    y elementos sobrenaturales que pueden leerse
                    poco a poco.
                  </p>

                  <a
                    href="https://www.cervantesvirtual.com/buscador/?q=Leyendas+%E2%80%94+Gustavo+Adolfo+B%C3%A9cquer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Leer en Biblioteca Virtual Miguel de Cervantes →
                  </a>

                </div>


                <div class="lectura">

                  <h4>
                    Spanish Tales for Beginners
                  </h4>

                  <p>
                    Colección de relatos seleccionados para estudiantes
                    de español y pensada para facilitar la lectura.
                  </p>

                  <a
                    href="https://www.gutenberg.org/ebooks/36805"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Leer en Project Gutenberg →
                  </a>

                </div>

              </div>



              <!-- INTERMEDIO -->

              <div class="nivel">

                <h3>
                  🌿 Intermedio
                </h3>


                <div class="lectura">

                  <h4>
                    El sombrero de tres picos — Pedro Antonio de Alarcón
                  </h4>

                  <p>
                    Novela breve y de argumento ágil que permite acercarse
                    progresivamente a la literatura española clásica.
                  </p>

                  <a
                    href="https://www.gutenberg.org/ebooks/29506"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Leer en Project Gutenberg →
                  </a>

                </div>


                <div class="lectura">

                  <h4>
                    La casa de Bernarda Alba — Federico García Lorca
                  </h4>

                  <p>
                    Obra teatral formada principalmente por diálogos,
                    útil para trabajar expresiones y conversaciones.
                  </p>

                  <a
                    href="https://www.cervantesvirtual.com/buscador/?q=La+casa+de+Bernarda+Alba"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Consultar en Biblioteca Virtual Miguel de Cervantes →
                  </a>

                </div>

              </div>



              <!-- AVANZADO -->

              <div class="nivel">

                <h3>
                  🌳 Avanzado
                </h3>


                <div class="lectura">

                  <h4>
                    El Lazarillo de Tormes
                  </h4>

                  <p>
                    Obra fundamental de la literatura española.
                    Su lenguaje pertenece a otra época, por lo que
                    resulta adecuada para lectores avanzados.
                  </p>

                  <a
                    href="https://www.gutenberg.org/ebooks/320"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Leer en Project Gutenberg →
                  </a>

                </div>


                <div class="lectura">

                  <h4>
                    Vidas de los filósofos más ilustres — Diógenes Laercio
                  </h4>

                  <p>
                    Relatos sobre la vida, las ideas y las enseñanzas
                    de los principales filósofos de la Antigüedad.
                    Un recurso para practicar la lectura, ampliar el
                    vocabulario y acercarse a la historia de la filosofía.
                  </p>

                  <a
                    href="https://www.cristoraul.org/SPANISH/sala-de-lectura/BIBLIOTECATERCERMILENIO/CLASICOS/ROMANOS/DiogenesLaercio-VidadelosFilosofosMasIlustres.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Leer en Cristoraul.org →
                  </a>

                </div>

              </div>


            </div>

          </div>

        </div>

      </section>



      <!-- ===================================================
           3. BIBLIOTECA LITERARIA
      ==================================================== -->

      <section class="acordeon-seccion">

        <button
          class="acordeon-header"
          :class="{ activo: seccionAbierta === 'biblioteca' }"
          @click="toggleSeccion('biblioteca')"
          type="button"
        >

          <img
  :src="'/fotos/premio/tesoro/bibliotecaLi.png'"
  alt="Biblioteca literaria"
  class="foto-acordeon"
/>

          <div class="titulo-foto">

            <h2>
              Biblioteca literaria
            </h2>

            <span class="flecha">
              {{ seccionAbierta === 'biblioteca' ? '▲' : '▼' }}
            </span>

          </div>

        </button>


        <div
          class="acordeon-contenido"
          :class="{ abierto: seccionAbierta === 'biblioteca' }"
        >

          <div class="contenido-interior biblioteca-presentacion">

            <p>
              Selección de obras disponibles para leer gratuitamente
              en línea.
            </p>

            <div class="biblioteca-info">

              <h3>
                📚 Explora nuestra biblioteca
              </h3>

              <p>
                Puedes consultar las obras organizadas por idioma.
                Utiliza las secciones de literatura en castellano
                y literatura en catalán para acceder directamente
                a los libros.
              </p>

            </div>

          </div>

        </div>

      </section>



      <!-- ===================================================
           4. LITERATURA EN CASTELLANO
      ==================================================== -->

      <section class="acordeon-seccion">

        <button
          class="acordeon-header"
          :class="{ activo: seccionAbierta === 'castellano' }"
          @click="toggleSeccion('castellano')"
          type="button"
        >

          <img
  :src="'/fotos/premio/tesoro/Licastellano.png'"
  alt="Literatura en castellano"
  class="foto-acordeon"
/>

          <div class="titulo-foto">

            <h2>
              Literatura en castellano
            </h2>

            <span class="flecha">
              {{ seccionAbierta === 'castellano' ? '▲' : '▼' }}
            </span>

          </div>

        </button>


        <div
          class="acordeon-contenido"
          :class="{ abierto: seccionAbierta === 'castellano' }"
        >

          <div class="contenido-interior">

            <p class="idioma-descripcion">
              Obras para practicar el español y conocer diferentes
              autores, épocas y tradiciones literarias.
            </p>


            <div class="libros">


              <a
                href="https://www.gutenberg.org/cache/epub/15353/pg15353-images.html"
                target="_blank"
                rel="noopener noreferrer"
                class="libro"
              >

                <h3>
                  A First Spanish Reader
                </h3>

                <p>
                  Lecturas para estudiantes de español.
                </p>

              </a>


              <a
                href="https://www.gutenberg.org/cache/epub/36805/pg36805-images.html"
                target="_blank"
                rel="noopener noreferrer"
                class="libro"
              >

                <h3>
                  Spanish Tales for Beginners
                </h3>

                <p>
                  Relatos para comenzar a leer en español.
                </p>

              </a>


              <a
                href="https://www.gutenberg.org/cache/epub/2000/pg2000-images.html"
                target="_blank"
                rel="noopener noreferrer"
                class="libro"
              >

                <h3>
                  Don Quijote de la Mancha
                </h3>

                <p>
                  Miguel de Cervantes.
                </p>

              </a>


              <a
                href="https://www.gutenberg.org/cache/epub/57303/pg57303-images.html"
                target="_blank"
                rel="noopener noreferrer"
                class="libro"
              >

                <h3>
                  La Divina Comedia
                </h3>

                <p>
                  Dante Alighieri.
                </p>

              </a>


              <a
                href="https://www.gutenberg.org/cache/epub/61851/pg61851-images.html"
                target="_blank"
                rel="noopener noreferrer"
                class="libro"
              >

                <h3>
                  El crimen y el castigo
                </h3>

                <p>
                  Fiódor Dostoyevski.
                </p>

              </a>


              <a
                href="https://www.gutenberg.org/cache/epub/75739/pg75739-images.html"
                target="_blank"
                rel="noopener noreferrer"
                class="libro"
              >

                <h3>
                  Los miserables — Tomo 1
                </h3>

                <p>
                  Victor Hugo.
                </p>

              </a>


              <a
                href="https://www.gutenberg.org/cache/epub/78068/pg78068-images.html"
                target="_blank"
                rel="noopener noreferrer"
                class="libro"
              >

                <h3>
                  Los miserables — Tomo 2
                </h3>

                <p>
                  Victor Hugo.
                </p>

              </a>


              <a
                href="https://www.gutenberg.org/cache/epub/58221/pg58221-images.html"
                target="_blank"
                rel="noopener noreferrer"
                class="libro"
              >

                <h3>
                  La Odisea
                </h3>

                <p>
                  Homero.
                </p>

              </a>


            </div>

          </div>

        </div>

      </section>



      <!-- ===================================================
           5. LITERATURA EN CATALÁN
      ==================================================== -->

      <section class="acordeon-seccion">

        <button
          class="acordeon-header"
          :class="{ activo: seccionAbierta === 'catalan' }"
          @click="toggleSeccion('catalan')"
          type="button"
        >

          <img
  :src="'/fotos/premio/tesoro/Licatalan.png'"
  alt="Literatura en catalán"
  class="foto-acordeon"
/>

          <div class="titulo-foto">

            <h2>
              Literatura en catalán
            </h2>

            <span class="flecha">
              {{ seccionAbierta === 'catalan' ? '▲' : '▼' }}
            </span>

          </div>

        </button>


        <div
          class="acordeon-contenido"
          :class="{ abierto: seccionAbierta === 'catalan' }"
        >

          <div class="contenido-interior">

            <p class="idioma-descripcion">
              Obras en catalán para practicar la lengua y conocer
              la cultura y la tradición literaria catalana.
            </p>


            <div class="libros">


              <a
                href="https://www.gutenberg.org/cache/epub/30890/pg30890-images.html"
                target="_blank"
                rel="noopener noreferrer"
                class="libro"
              >

                <h3>
                  Les aventures de Tom Sawyer
                </h3>

                <p>
                  Mark Twain.
                </p>

              </a>


              <a
                href="https://www.gutenberg.org/cache/epub/17219/pg17219-images.html"
                target="_blank"
                rel="noopener noreferrer"
                class="libro"
              >

                <h3>
                  La creació d'Eva i altres contes
                </h3>

                <p>
                  Josep Carner.
                </p>

              </a>


              <a
                href="https://www.gutenberg.org/cache/epub/35817/pg35817-images.html"
                target="_blank"
                rel="noopener noreferrer"
                class="libro"
              >

                <h3>
                  Tradicions religioses de Catalunya
                </h3>

                <p>
                  Literatura i tradicions de Catalunya.
                </p>

              </a>


            </div>

          </div>

        </div>

      </section>


    </div>



    <!-- =====================================================
         NOTA LEGAL
    ====================================================== -->

    <section class="nota-legal">

      <strong>
        📌 Nota sobre las obras gratuitas
      </strong>

      <p>
        Los libros indicados están disponibles gratuitamente en
        las bibliotecas digitales enlazadas. Muchos son
        <strong>libros de dominio público</strong>, es decir,
        obras cuyos derechos de autor han expirado.
      </p>

    </section>



    <!-- =====================================================
         FOOTER
    ====================================================== -->

    <footer class="footer">

      <p>
        El Tesoro Literario del Mundo
      </p>

      <p>
        Literatura · Cultura · Idiomas · Aprendizaje
      </p>

    </footer>


  </main>

</template>



<style scoped>

/* =========================================================
   GENERAL
========================================================= */

* {
  box-sizing: border-box;
}

.tesoro-page {
  min-height: 100vh;
  color: #3f3932;
  font-family: Arial, Helvetica, sans-serif;
  overflow-x: hidden;

  background-image:
    linear-gradient(
      rgba(246, 241, 232, 0.86),
      rgba(246, 241, 232, 0.86)
    ),
    url("'/fotos/premio/tesoro/lectura.gratis.png'");

  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}


/* =========================================================
   HERO
========================================================= */

.hero {
  padding: 75px 25px 65px;

  background:
    linear-gradient(
      135deg,
      #e8dccb 0%,
      #f8f4ec 50%,
      #eadfce 100%
    );

  border-bottom: 1px solid #d8c8b2;
  position: relative;
}

.hero::before {
  content: "✦";
  position: absolute;
  top: 25px;
  left: 8%;
  font-size: 2rem;
  color: #b28a5a;
  opacity: 0.5;
}

.hero::after {
  content: "✦";
  position: absolute;
  bottom: 25px;
  right: 8%;
  font-size: 1.6rem;
  color: #b28a5a;
  opacity: 0.5;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

.hero h1 {
  margin: 0 0 18px;
  font-size: 2.8rem;
  line-height: 1.2;
  color: #55402b;
  letter-spacing: 0.5px;
}

.subtitulo {
  font-size: 1.3rem;
  color: #9a7045;
  margin: 0 0 28px;
  font-weight: bold;
}

.hero p:not(.subtitulo) {
  max-width: 820px;
  margin: 18px auto;
  line-height: 1.8;
  font-size: 1.05rem;
  color: #5f5952;
}


/* =========================================================
   CONTENEDOR DEL ACORDEÓN
========================================================= */

.acordeon-container {
  width: 90%;
  max-width: 1150px;
  margin: 65px auto;
}


/* =========================================================
   CADA SECCIÓN
========================================================= */

.acordeon-seccion {
  margin-bottom: 28px;
  background: #fffdf9;
  border-radius: 20px;
  overflow: hidden;

  border: 1px solid #dfd1bd;

  box-shadow:
    0 7px 25px rgba(92, 67, 40, 0.09);

  transition: box-shadow 0.3s ease;
}

.acordeon-seccion:hover {
  box-shadow:
    0 10px 30px rgba(92, 67, 40, 0.14);
}


/* =========================================================
   FOTO QUE SE PULSA
========================================================= */

.acordeon-header {
  width: 100%;
  padding: 0;
  border: none;
  cursor: pointer;

  background: #fffdf9;

  display: block;
  position: relative;

  text-align: left;

  transition:
    transform 0.2s ease,
    filter 0.2s ease;
}

.acordeon-header:hover {
  filter: brightness(1.03);
}

.acordeon-header:focus-visible {
  outline: 4px solid rgba(178, 138, 90, 0.35);
  outline-offset: -4px;
}


/* =========================================================
   IMAGEN
========================================================= */

.foto-acordeon {
  width: 100%;
  height: 260px;

  display: block;

  object-fit: cover;

  transition:
    height 0.4s ease,
    filter 0.3s ease;
}


/*
   Cuando la sección está abierta,
   la fotografía queda un poco más pequeña.
*/

.acordeon-header.activo .foto-acordeon {
  height: 210px;
}


/* =========================================================
   TITULO ENCIMA DE LA FOTO
========================================================= */

.titulo-foto {
  position: absolute;

  left: 0;
  right: 0;
  bottom: 0;

  padding: 35px 30px 22px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  background:
    linear-gradient(
      to top,
      rgba(35, 25, 15, 0.82),
      rgba(35, 25, 15, 0.35),
      transparent
    );

  color: white;
}

.titulo-foto h2 {
  margin: 0;

  font-size: 2rem;
  line-height: 1.2;

  text-shadow:
    0 2px 5px rgba(0, 0, 0, 0.5);
}

.flecha {
  flex-shrink: 0;

  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.92);

  color: #59432d;

  font-size: 0.95rem;

  box-shadow:
    0 3px 10px rgba(0, 0, 0, 0.2);
}


/* =========================================================
   CONTENIDO DESPLEGABLE
========================================================= */

.acordeon-contenido {
  display: grid;
  grid-template-rows: 0fr;

  opacity: 0;

  transition:
    grid-template-rows 0.45s ease,
    opacity 0.35s ease;
}

.acordeon-contenido.abierto {
  grid-template-rows: 1fr;
  opacity: 1;
}

.contenido-interior {
  min-height: 0;
  overflow: hidden;

  padding: 0 35px;
  transition: padding 0.4s ease;
}

.acordeon-contenido.abierto .contenido-interior {
  padding-top: 35px;
  padding-bottom: 35px;
}


/* =========================================================
   RECURSOS
========================================================= */

.recursos-intro,
.lecturas-intro,
.idioma-descripcion {
  max-width: 800px;

  margin: 0 auto 35px;

  text-align: center;

  line-height: 1.7;

  color: #70685f;
}


/* =========================================================
   TARJETAS DE RECURSOS
========================================================= */

.recursos-grid {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 25px;
}

.recurso {
  padding: 28px;

  background: #fffdf9;

  border: 1px solid #e1d4c2;

  border-radius: 16px;

  text-decoration: none;

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.recurso:hover {
  transform: translateY(-6px);

  border-color: #c8a77c;

  box-shadow:
    0 10px 25px rgba(92, 67, 40, 0.12);

  background: #ffffff;
}

.recurso h3 {
  margin: 0 0 12px;

  color: #694d30;

  font-size: 1.15rem;
}

.recurso p {
  margin: 0;

  line-height: 1.6;

  color: #6d665e;
}


/* =========================================================
   NIVELES DE LECTURA
========================================================= */

.niveles {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 25px;
}

.nivel {
  background: #fffdf9;

  padding: 28px;

  border-radius: 16px;

  border: 1px solid #dfd3c2;

  box-shadow:
    0 4px 12px rgba(92, 67, 40, 0.06);
}

.nivel > h3 {
  color: #694d30;

  margin-top: 0;

  padding-bottom: 12px;

  border-bottom: 2px solid #e5d9c8;
}


/* =========================================================
   LECTURAS
========================================================= */

.lectura {
  padding: 18px 0;

  border-bottom: 1px solid #e6ddd0;
}

.lectura:last-child {
  border-bottom: none;
}

.lectura h4 {
  margin: 0 0 8px;

  color: #59452d;

  line-height: 1.4;

  font-size: 1.05rem;
}

.lectura p {
  color: #706a63;

  line-height: 1.6;

  margin: 0 0 10px;
}

.lectura a {
  display: inline-block;

  margin-top: 8px;

  color: #9a7045;

  text-decoration: none;

  font-weight: bold;
}

.lectura a:hover {
  text-decoration: underline;

  color: #6f4d2d;
}


/* =========================================================
   BIBLIOTECA
========================================================= */

.biblioteca-presentacion {
  text-align: center;
}

.biblioteca-presentacion > p {
  color: #70685f;

  font-size: 1.1rem;

  line-height: 1.7;
}

.biblioteca-info {
  max-width: 750px;

  margin: 30px auto 0;

  padding: 25px;

  background: #eee5d6;

  border-radius: 16px;

  border: 1px solid #dfd0bc;
}

.biblioteca-info h3 {
  margin-top: 0;

  color: #59432d;
}

.biblioteca-info p {
  margin-bottom: 0;

  line-height: 1.7;

  color: #70685f;
}


/* =========================================================
   LIBROS
========================================================= */

.libros {
  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 22px;
}

.libro {
  display: block;

  padding: 25px;

  background: #faf7f1;

  border: 1px solid #e3d8c8;

  border-radius: 14px;

  text-decoration: none;

  transition:
    transform 0.3s ease,
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.libro:hover {
  transform: translateY(-5px);

  background: #f1e8db;

  border-color: #c8a77c;

  box-shadow:
    0 8px 20px rgba(92, 67, 40, 0.1);
}

.libro h3 {
  margin: 0 0 10px;

  color: #684d30;

  font-size: 1.15rem;
}

.libro p {
  margin: 0;

  color: #777067;

  line-height: 1.6;
}


/* =========================================================
   NOTA LEGAL
========================================================= */

.nota-legal {
  width: 90%;
  max-width: 1050px;

  margin: 30px auto 60px;

  padding: 22px 28px;

  background: #eee5d6;

  border-left: 5px solid #a57b4d;

  border-radius: 10px;

  box-shadow:
    0 3px 10px rgba(92, 67, 40, 0.05);
}

.nota-legal strong {
  color: #59452d;
}

.nota-legal p {
  margin: 8px 0 0;

  color: #6e675f;

  line-height: 1.7;
}


/* =========================================================
   FOOTER
========================================================= */

.footer {
  margin-top: 70px;

  padding: 40px 20px;

  text-align: center;

  background: #59452d;

  color: #ffffff;

  border-top: 5px solid #b28a5a;
}

.footer p {
  margin: 7px 0;

  line-height: 1.5;
}


/* =========================================================
   TABLET
========================================================= */

@media (max-width: 900px) {

  .recursos-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .niveles {
    grid-template-columns: 1fr;
  }

}


/* =========================================================
   MÓVIL
========================================================= */

@media (max-width: 768px) {

  .hero {
    padding: 55px 20px;
  }

  .hero h1 {
    font-size: 2.1rem;
  }

  .subtitulo {
    font-size: 1.1rem;
  }

  .acordeon-container {
    width: 94%;
  }

  .foto-acordeon {
    height: 190px;
  }

  .acordeon-header.activo .foto-acordeon {
    height: 160px;
  }

  .titulo-foto {
    padding: 30px 20px 18px;
  }

  .titulo-foto h2 {
    font-size: 1.45rem;
  }

  .flecha {
    width: 36px;
    height: 36px;
  }

  .contenido-interior {
    padding-left: 20px;
    padding-right: 20px;
  }

  .recursos-grid {
    grid-template-columns: 1fr;
  }

  .libros {
    grid-template-columns: 1fr;
  }

}


/* =========================================================
   MÓVIL PEQUEÑO
========================================================= */

@media (max-width: 480px) {

  .hero h1 {
    font-size: 1.8rem;
  }

  .hero p:not(.subtitulo) {
    font-size: 0.98rem;
  }

  .foto-acordeon {
    height: 155px;
  }

  .acordeon-header.activo .foto-acordeon {
    height: 135px;
  }

  .titulo-foto {
    padding: 25px 15px 15px;

    gap: 10px;
  }

  .titulo-foto h2 {
    font-size: 1.2rem;
  }

  .flecha {
    width: 32px;
    height: 32px;

    font-size: 0.75rem;
  }

}


/* =========================================================
   IMPRESIÓN
========================================================= */

@media print {

  /*
   * Al imprimir:
   * - se muestran TODAS las secciones
   * - no importa cuál estaba abierta
   * - desaparece la animación
   * - se imprime todo el contenido
   */

  .tesoro-page {
    background: white !important;
  }

  .hero {
    background: white !important;
    padding: 30px 20px;
  }

  .acordeon-container {
    width: 100%;
    max-width: none;
    margin: 20px 0;
  }

  .acordeon-seccion {
    box-shadow: none !important;
    border: 1px solid #ccc;

    margin-bottom: 25px;

    break-inside: auto;
    page-break-inside: auto;
  }

  /*
   * Todas las secciones aparecen abiertas
   * aunque el usuario no las haya abierto.
   */

  .acordeon-contenido,
  .acordeon-contenido.abierto {
    display: block !important;

    grid-template-rows: 1fr !important;

    opacity: 1 !important;

    overflow: visible !important;
  }

  .contenido-interior,
  .acordeon-contenido.abierto .contenido-interior {
    padding: 25px !important;
    overflow: visible !important;
  }

  /*
   * Las fotos siguen apareciendo al imprimir.
   */

  .foto-acordeon,
  .acordeon-header.activo .foto-acordeon {
    height: 180px !important;
  }

  .acordeon-header {
    cursor: default;
  }

  .flecha {
    display: none;
  }

  .titulo-foto {
    position: absolute;
  }

  .recursos-grid,
  .niveles,
  .libros {
    break-inside: auto;
  }

  .recurso,
  .nivel,
  .libro,
  .lectura {
    break-inside: avoid;
  }

  .footer {
    margin-top: 30px;
  }

}
</style>