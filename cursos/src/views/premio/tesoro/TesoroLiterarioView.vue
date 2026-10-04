<script setup>

import NavbarPremio from '../../../components/premio/NavbarPremio.vue'

</script>


<template>

  <main class="tesoro-page">

    <!-- =========================
         NAVBAR PREMIO
    ========================== -->

    <NavbarPremio />


    <!-- =========================
         CABECERA
    ========================== -->

    <section class="hero">

      <div class="hero-content">

        <h1>El Tesoro Literario del Mundo</h1>

        <p class="subtitulo">
          Literatura, cultura y aprendizaje de idiomas
        </p>

        <p>
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


    <!-- =========================
         LUGARES PARA LEER GRATIS
    ========================== -->

    <section class="recursos">

      <h2>📚 Dónde encontrar libros gratuitos</h2>

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
          <h3>Project Gutenberg</h3>

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
          <h3>Biblioteca Virtual Miguel de Cervantes</h3>

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
          <h3>Instituto Cervantes</h3>

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
          <h3>HathiTrust</h3>

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
          <h3>Internet Archive</h3>

          <p>
            Gran biblioteca digital donde se pueden consultar
            libros, documentos y otros materiales.
          </p>
        </a>

      </div>

    </section>


    <!-- =========================
         LECTURAS PARA APRENDER ESPAÑOL
    ========================== -->

    <section class="lecturas">

      <h2>📖 Lecturas para aprender español</h2>

      <p class="lecturas-intro">
        Algunas obras pueden ser especialmente útiles para practicar
        la lectura en español, desde textos sencillos hasta clásicos
        más avanzados.
      </p>


      <div class="niveles">


        <!-- PRINCIPIANTE - INTERMEDIO -->

        <div class="nivel">

          <h3>🌱 Principiante – Intermedio</h3>


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

          <h3>🌿 Intermedio</h3>


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

          <h3>🌳 Avanzado</h3>


          <!-- EL LAZARILLO -->

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


          <!-- VIDAS DE LOS FILÓSOFOS -->

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

    </section>


    <!-- =========================
         BIBLIOTECA LITERARIA
    ========================== -->

    <section class="literatura-container">

      <h2>📚 Biblioteca literaria</h2>

      <p class="introduccion">
        Selección de obras disponibles para leer gratuitamente
        en línea.
      </p>


      <!-- CASTELLANO -->

      <section class="idioma-section castellano-section">

        <div class="idioma-header">

          <span class="icono">📘</span>

          <div>

            <h2>Literatura en castellano</h2>

            <p>
              Obras para practicar el español y conocer diferentes
              autores, épocas y tradiciones literarias.
            </p>

          </div>

        </div>


        <div class="libros">


          <a
            href="https://www.gutenberg.org/cache/epub/15353/pg15353-images.html"
            target="_blank"
            rel="noopener noreferrer"
            class="libro"
          >
            <h3>A First Spanish Reader</h3>

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
            <h3>Spanish Tales for Beginners</h3>

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
            <h3>Don Quijote de la Mancha</h3>

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
            <h3>La Divina Comedia</h3>

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
            <h3>El crimen y el castigo</h3>

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
            <h3>Los miserables — Tomo 1</h3>

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
            <h3>Los miserables — Tomo 2</h3>

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
            <h3>La Odisea</h3>

            <p>
              Homero.
            </p>
          </a>

        </div>

      </section>


      <!-- CATALÁN -->

      <section class="idioma-section catalan-section">

        <div class="idioma-header">

          <span class="icono">📗</span>

          <div>

            <h2>Literatura en catalán</h2>

            <p>
              Obras en catalán para practicar la lengua y conocer
              la cultura y la tradición literaria catalana.
            </p>

          </div>

        </div>


        <div class="libros">


          <a
            href="https://www.gutenberg.org/cache/epub/30890/pg30890-images.html"
            target="_blank"
            rel="noopener noreferrer"
            class="libro"
          >
            <h3>Les aventures de Tom Sawyer</h3>

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
            <h3>La creació d'Eva i altres contes</h3>

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
            <h3>Tradicions religioses de Catalunya</h3>

            <p>
              Literatura i tradicions de Catalunya.
            </p>
          </a>

        </div>

      </section>

    </section>


    <!-- =========================
         NOTA SOBRE DOMINIO PÚBLICO
    ========================== -->

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


    <!-- =========================
         FOOTER
    ========================== -->

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

* {
  box-sizing: border-box;
}


/* =========================
   PÁGINA GENERAL
========================== */

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
    url("/fotos/premio/tesoro/lectura.gratis.png");

  background-size: cover;

  background-position: center;

  background-attachment: fixed;

  background-repeat: no-repeat;
}


/* =========================
   HERO
========================== */

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


/* Detalle decorativo */

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


/* =========================
   RECURSOS
========================== */

.recursos {
  width: 90%;

  max-width: 1150px;

  margin: 65px auto;

  padding: 0 10px;
}


.recursos h2 {
  text-align: center;

  color: #59432d;

  font-size: 2rem;

  margin-bottom: 15px;
}


.recursos-intro {
  max-width: 800px;

  margin: 0 auto 40px;

  text-align: center;

  line-height: 1.7;

  color: #70685f;
}


/* Línea decorativa */

.recursos h2::after,
.lecturas > h2::after,
.literatura-container > h2::after {
  content: "";

  display: block;

  width: 70px;

  height: 3px;

  margin: 15px auto 0;

  background: #b28a5a;

  border-radius: 10px;
}


.recursos-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 25px;
}


.recurso {
  padding: 28px;

  background: #fffdf9;

  border: 1px solid #e1d4c2;

  border-radius: 16px;

  text-decoration: none;

  transition: all 0.3s ease;

  box-shadow: 0 4px 12px rgba(92, 67, 40, 0.05);
}


.recurso:hover {
  transform: translateY(-6px);

  border-color: #c8a77c;

  box-shadow: 0 10px 25px rgba(92, 67, 40, 0.12);

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


/* =========================
   LECTURAS
========================== */

.lecturas {
  width: 90%;

  max-width: 1150px;

  margin: 75px auto;

  padding: 45px 35px;

  background: #eee5d6;

  border: 1px solid #dfd0bc;

  border-radius: 22px;
}


.lecturas > h2 {
  text-align: center;

  color: #59432d;

  font-size: 2rem;

  margin-top: 0;
}


.lecturas-intro {
  max-width: 750px;

  margin: 15px auto 40px;

  text-align: center;

  color: #70685f;

  line-height: 1.7;
}


.niveles {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 25px;
}


.nivel {
  background: #fffdf9;

  padding: 28px;

  border-radius: 16px;

  border: 1px solid #dfd3c2;

  box-shadow: 0 4px 12px rgba(92, 67, 40, 0.06);
}


.nivel > h3 {
  color: #694d30;

  margin-top: 0;

  padding-bottom: 12px;

  border-bottom: 2px solid #e5d9c8;
}


/* =========================
   RECOMENDACIONES
========================== */

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


.lectura .enlace-secundario {
  color: #777067;

  font-size: 0.92rem;

  font-weight: normal;
}


/* =========================
   BIBLIOTECA
========================== */

.literatura-container {
  width: 90%;

  max-width: 1150px;

  margin: 75px auto;
}


.literatura-container > h2 {
  text-align: center;

  color: #59432d;

  font-size: 2rem;

  margin-bottom: 15px;
}


.introduccion {
  max-width: 800px;

  margin: 0 auto 45px;

  text-align: center;

  color: #70685f;

  line-height: 1.7;
}


/* =========================
   IDIOMAS
========================== */

.idioma-section {
  margin-bottom: 45px;

  padding: 35px;

  background: #fffdf9;

  border: 1px solid #e1d5c4;

  border-radius: 20px;

  box-shadow: 0 6px 20px rgba(92, 67, 40, 0.07);
}


.idioma-header {
  display: flex;

  align-items: center;

  gap: 20px;

  margin-bottom: 30px;

  padding-bottom: 20px;

  border-bottom: 1px solid #e6ddd0;
}


.icono {
  font-size: 2.7rem;

  width: 65px;

  height: 65px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #eee3d2;

  border-radius: 50%;
}


.idioma-header h2 {
  margin: 0 0 8px;

  color: #59452d;
}


.idioma-header p {
  margin: 0;

  color: #706a63;

  line-height: 1.6;
}


/* =========================
   LIBROS
========================== */

.libros {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 22px;
}


.libro {
  display: block;

  padding: 25px;

  background: #faf7f1;

  border: 1px solid #e3d8c8;

  border-radius: 14px;

  text-decoration: none;

  transition: all 0.3s ease;
}


.libro:hover {
  transform: translateY(-5px);

  background: #f1e8db;

  border-color: #c8a77c;

  box-shadow: 0 8px 20px rgba(92, 67, 40, 0.1);
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


/* =========================
   NOTA LEGAL
========================== */

.nota-legal {
  width: 90%;

  max-width: 1050px;

  margin: 30px auto 60px;

  padding: 22px 28px;

  background: #eee5d6;

  border-left: 5px solid #a57b4d;

  border-radius: 10px;

  box-shadow: 0 3px 10px rgba(92, 67, 40, 0.05);
}


.nota-legal strong {
  color: #59452d;
}


.nota-legal p {
  margin: 8px 0 0;

  color: #6e675f;

  line-height: 1.7;
}


/* =========================
   FOOTER
========================== */

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


/* =========================
   TABLET
========================== */

@media (max-width: 900px) {

  .recursos-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .niveles {
    grid-template-columns: 1fr;
  }

}


/* =========================
   MÓVIL
========================== */

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

  .recursos,
  .lecturas,
  .literatura-container {
    width: 94%;
  }

  .lecturas {
    padding: 35px 20px;
  }

  .recursos-grid {
    grid-template-columns: 1fr;
  }

  .idioma-section {
    padding: 25px 18px;
  }

  .idioma-header {
    align-items: flex-start;
  }

  .libros {
    grid-template-columns: 1fr;
  }

}


/* =========================
   MÓVIL PEQUEÑO
========================== */

@media (max-width: 480px) {

  .hero h1 {
    font-size: 1.8rem;
  }

  .hero p:not(.subtitulo) {
    font-size: 0.98rem;
  }

  .recursos h2,
  .lecturas > h2,
  .literatura-container > h2 {
    font-size: 1.65rem;
  }

  .idioma-header {
    flex-direction: column;
  }

  .icono {
    width: 55px;
    height: 55px;
    font-size: 2.2rem;
  }

}

</style>