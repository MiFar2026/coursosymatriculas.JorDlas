<script setup>
import NavbarPremio from '../../../components/premio/NavbarPremio.vue'
</script>

<template>
<main class="requisitos-page pagina-requisitos">
  <NavbarPremio />

    <!-- CABECERA -->
    <section class="hero-requisitos">
      <div class="hero-overlay">
        <div class="hero-contenido">
          <span class="etiqueta">CONCURSO LITERARIO</span>

          <h1>Tu historia también importa</h1>

          <p>
            Un espacio para que jóvenes que están aprendiendo castellano o
            catalán puedan compartir sus historias, poemas e ideas.
          </p>

          <p class="hero-subtexto">
            No buscamos una escritura perfecta. Buscamos una voz propia,
            una historia sincera y las ganas de expresarse.
          </p>
        </div>
      </div>
    </section>

    <!-- INTRODUCCIÓN -->
    <section class="intro">
      <div class="intro-contenido">
        <span class="numero">01</span>

        <div>
          <h2>¿Quién puede participar?</h2>

          <p>
            Esta convocatoria está pensada especialmente para jóvenes que han
            aprendido recientemente castellano o catalán y desean expresarse
            mediante la literatura.
          </p>

          <p>
            La iniciativa nace desde una perspectiva
            <strong>social, inclusiva y sin ánimo de lucro</strong>.
            Queremos que la situación económica, social o personal de una
            persona no sea un obstáculo para participar.
          </p>
        </div>
      </div>
    </section>

    <!-- REQUISITOS -->
    <section class="requisitos-section">
      <div class="section-heading">
        <span>02</span>
        <h2>Requisitos de participación</h2>
        <p>
          Antes de enviar tu obra, comprueba que cumples estos requisitos.
        </p>
      </div>

      <div class="cards-grid">
        <!-- CARD 1 -->
        <article class="requisito-card">
          <div class="icono">👤</div>

          <h3>Edad y categoría</h3>

          <p>
            El participante deberá encontrarse dentro del tramo de edad
            establecido en la convocatoria.
          </p>

          <ul>
            <li>La edad se comprobará mediante un documento identificativo.</li>
            <li>
              Las categorías de edad se indicarán claramente en cada
              convocatoria.
            </li>
            <li>
              Cada participante deberá presentar su obra en la categoría que
              le corresponda.
            </li>
          </ul>
        </article>

        <!-- CARD 2 -->
        <article class="requisito-card">
          <div class="icono">🗣️</div>

          <h3>Aprendizaje del idioma</h3>

          <p>
            La convocatoria está especialmente dirigida a jóvenes que están
            aprendiendo castellano o catalán como segunda lengua.
          </p>

          <ul>
            <li>
              El idioma de la obra deberá ser castellano o catalán.
            </li>
            <li>
              No es necesario tener un nivel académico avanzado.
            </li>
            <li>
              Se valorará especialmente el esfuerzo y la capacidad de
              expresarse.
            </li>
          </ul>
        </article>

        <!-- CARD 3 -->
        <article class="requisito-card destacado">
          <div class="icono">✍️</div>

          <h3>Obra original</h3>

          <p>
            La obra presentada debe ser creada por el propio participante.
          </p>

          <ul>
            <li>Debe ser original e inédita.</li>
            <li>No puede haber sido copiada de otra persona.</li>
            <li>
              No debe haber sido presentada anteriormente con otro nombre.
            </li>
          </ul>
        </article>

        <!-- CARD 4 -->
        <article class="requisito-card">
          <div class="icono">📖</div>

          <h3>Modalidades</h3>

          <p>
            Puedes participar utilizando diferentes formas de expresión
            literaria.
          </p>

          <ul>
            <li><strong>Poema</strong></li>
            <li><strong>Cuento corto</strong></li>
            <li><strong>Microrrelato</strong></li>
            <li>Otras modalidades indicadas en la convocatoria.</li>
          </ul>
        </article>

        <!-- CARD 5 -->
        <article class="requisito-card">
          <div class="icono">📄</div>

          <h3>Formato de la obra</h3>

          <p>
            Para facilitar la lectura y valoración, recomendamos presentar
            el texto con un formato sencillo y legible.
          </p>

          <ul>
            <li>Archivo PDF o Word.</li>
            <li>Letra legible, preferentemente Arial o Times New Roman.</li>
            <li>Tamaño recomendado: 12 puntos.</li>
            <li>Texto correctamente identificado.</li>
          </ul>
        </article>

        <!-- CARD 6 -->
        <article class="requisito-card">
          <div class="icono">💻</div>

          <h3>Uso de Inteligencia Artificial</h3>

          <p>
            Queremos conocer la voz y la creatividad de cada participante.
          </p>

          <ul>
            <li>
              La obra debe ser principalmente creada por el participante.
            </li>
            <li>
              No se permitirá presentar como propia una obra generada
              íntegramente por Inteligencia Artificial.
            </li>
            <li>
              La organización podrá solicitar una explicación sobre el
              proceso creativo si fuera necesario.
            </li>
          </ul>
        </article>
      </div>
    </section>

    <!-- EXTENSIÓN -->
    <section class="extension">
      <div class="extension-contenido">
        <span class="numero">03</span>

        <div>
          <h2>Extensión recomendada</h2>

          <p>
            Queremos que participar sea accesible para todos. Por eso
            recomendamos textos breves que permitan al autor desarrollar
            una idea completa sin necesidad de escribir una obra extensa.
          </p>

          <div class="extensiones">
            <div>
              <strong>Microrrelato</strong>
              <span>Hasta 500 palabras</span>
            </div>

            <div>
              <strong>Cuento corto</strong>
              <span>Entre 1 y 5 páginas</span>
            </div>

            <div>
              <strong>Poema</strong>
              <span>Extensión libre razonable</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PRINCIPIOS -->
    <section class="principios">
      <div class="principios-imagen">
        <img
          src="/fotos/premio/requisitos/Tu historia también importa.png"
          alt="Tu historia también importa"
        />
      </div>

      <div class="principios-texto">
        <span class="numero">04</span>

        <h2>Una convocatoria diferente</h2>

        <p>
          Este concurso forma parte de una iniciativa social. La Fundación
          trabaja con personas en situación de sinhogarismo y con personas
          que atraviesan diferentes circunstancias de vulnerabilidad.
        </p>

        <p>
          Por eso queremos que la literatura sea también un lugar de
          encuentro, participación y expresión.
        </p>

        <div class="mensaje">
          <span>“</span>
          <p>
            Tu nivel de idioma no define el valor de tu historia.
            Tu historia merece ser escuchada.
          </p>
        </div>
      </div>
    </section>

    <!-- DECLARACIÓN -->
    <section class="declaracion">
      <div class="declaracion-contenido">
        <h2>Participar es gratuito</h2>

        <p>
          La participación en el concurso es completamente gratuita.
          No se solicitará ningún pago para presentar una obra.
        </p>

        <p>
          Nuestro objetivo es ofrecer una oportunidad cultural y social
          abierta, respetuosa e inclusiva.
        </p>

        <div class="check-list">
          <div>✓ Participación gratuita</div>
          <div>✓ Convocatoria con finalidad social</div>
          <div>✓ Sin ánimo de lucro</div>
          <div>✓ Respeto a todas las personas participantes</div>
        </div>
      </div>
    </section>

    <!-- RECORDATORIO FINAL -->
  
<section class="final">
  <span class="final-etiqueta">¿LISTO PARA PARTICIPAR?</span>

  <h2>Tu historia merece ser escuchada</h2>

  <p class="final-intro">
    Si has leído los requisitos y quieres compartir tu poema,
    cuento o microrrelato, puedes dar el siguiente paso.
  </p>

  <div class="check-final">
    <p>✓ La obra es tuya y es original.</p>
    <p>✓ Está escrita en castellano o catalán.</p>
    <p>✓ Cumple la extensión de la modalidad elegida.</p>
    <p>✓ Has incluido correctamente tus datos.</p>
    <p>✓ El archivo se puede abrir y leer correctamente.</p>
  </div>

  <p class="final-frase">
    No tengas miedo de equivocarte.<br />
    <strong>Estamos aquí para escuchar tu historia.</strong>
  </p>

 <RouterLink
  to="/premio/participar"
  class="boton-participar"
>
  Quiero participar
  <span>→</span>
</RouterLink>
</section>
  </main>
</template>

<style scoped>
.requisitos-page {
  min-height: 100vh;
  background: #f6f1e8;
  color: #3d352f;
}

/* HERO */

.hero-requisitos {
  min-height: 500px;
  background-image:
    linear-gradient(
      rgba(45, 38, 31, 0.55),
      rgba(45, 38, 31, 0.7)
    ),
    url("/fotos/premio/requisitos/Tu%20historia%20también%20importa.png");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}

.hero-overlay {
  width: 100%;
}

.hero-contenido {
  max-width: 900px;
  margin: 0 auto;
  padding: 90px 30px;
  color: white;
}

.etiqueta,
.final-etiqueta {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  margin-bottom: 18px;
  padding: 8px 14px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 30px;
}

.hero-contenido h1 {
  max-width: 750px;
  margin: 0 0 25px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(3rem, 7vw, 5.8rem);
  line-height: 0.98;
  font-weight: 500;
}

.hero-contenido p {
  max-width: 700px;
  font-size: 1.25rem;
  line-height: 1.7;
}

.hero-subtexto {
  font-size: 1rem !important;
  opacity: 0.9;
}

/* INTRO */

.intro {
  padding: 100px 25px;
  background: #fffaf2;
}

.intro-contenido,
.extension-contenido {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 30px;
}

.numero {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 2rem;
  color: #a66a42;
  font-weight: 700;
}

.intro h2,
.extension h2,
.principios h2 {
  margin: 0 0 25px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 500;
}

.intro p,
.extension p,
.principios p {
  max-width: 760px;
  font-size: 1.08rem;
  line-height: 1.85;
}

/* REQUISITOS */

.requisitos-section {
  padding: 100px 25px;
}

.section-heading {
  max-width: 1000px;
  margin: 0 auto 55px;
}

.section-heading > span {
  color: #a66a42;
  font-weight: 700;
}

.section-heading h2 {
  margin: 10px 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.3rem, 5vw, 3.5rem);
  font-weight: 500;
}

.section-heading p {
  font-size: 1.05rem;
  color: #756a61;
}

.cards-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

.requisito-card {
  padding: 35px;
  background: #fffaf2;
  border: 1px solid #e2d7c9;
  border-radius: 18px;
  transition:
  transform 0.3s ease,
  background 0.3s ease,
  border-color 0.3s ease,
  box-shadow 0.3s ease;
}

.requisito-card:hover {
  transform: translateY(-5px);
  background: white;
  border-color: #c9a487;
  box-shadow: 0 15px 35px rgba(65, 48, 37, 0.09);
}

.requisito-card.destacado {
  border: 2px solid #a66a42;
}

.icono {
  font-size: 2rem;
  margin-bottom: 18px;
}

.requisito-card h3 {
  margin: 0 0 15px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.6rem;
}

.requisito-card p {
  line-height: 1.7;
  color: #665c54;
}

.requisito-card ul {
  padding-left: 20px;
  margin-top: 20px;
}

.requisito-card li {
  margin-bottom: 10px;
  line-height: 1.6;
}

/* EXTENSION */

.extension {
  padding: 100px 25px;
  background: #e8ddd0;
}

.extensiones {
  margin-top: 35px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.extensiones div {
  padding: 22px;
  background: rgba(255, 255, 255, 0.55);
  border-radius: 12px;
}

.extensiones strong,
.extensiones span {
  display: block;
}

.extensiones strong {
  margin-bottom: 7px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.2rem;
}

.extensiones span {
  color: #74695f;
}

/* PRINCIPIOS */

.principios {
  max-width: 1100px;
  margin: 0 auto;
  padding: 110px 25px;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 70px;
  align-items: center;
}

.principios-imagen {
  overflow: hidden;
  border-radius: 22px;
  box-shadow: 0 20px 50px rgba(55, 42, 31, 0.15);
}

.principios-imagen img {
  display: block;
  width: 100%;
  height: auto;
}

.mensaje {
  margin-top: 35px;
  padding: 25px 30px;
  background: #e8ddd0;
  border-left: 5px solid #a66a42;
  border-radius: 0 12px 12px 0;
}

.mensaje span {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 3rem;
  line-height: 0;
  color: #a66a42;
}

.mensaje p {
  margin: 10px 0 0;
  font-family: Georgia, "Times New Roman", serif;
  font-style: italic;
}

/* DECLARACION */

.declaracion {
  padding: 100px 25px;
  background: #493d35;
  color: #fffaf2;
}

.declaracion-contenido {
  max-width: 850px;
  margin: 0 auto;
  text-align: center;
}

.declaracion h2 {
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.3rem, 5vw, 3.5rem);
  font-weight: 500;
}

.declaracion p {
  font-size: 1.08rem;
  line-height: 1.8;
}

.check-list {
  max-width: 650px;
  margin: 40px auto 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  text-align: left;
}

.check-list div {
  padding: 14px 18px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

/* FINAL */

.final {
  padding: 100px 25px;
  text-align: center;
  background: #fffaf2;
}

.final-etiqueta {
  color: #a66a42;
  border-color: #c9a487;
}

.final h2 {
  margin: 10px 0 40px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 500;
}

.check-final {
  max-width: 650px;
  margin: 0 auto;
  text-align: left;
}

.check-final p {
  padding: 15px 20px;
  margin: 8px 0;
  background: #f0e7dc;
  border-radius: 10px;
}

.final-frase {
  margin-top: 60px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.35rem;
  line-height: 1.7;
}


.final-intro {
  max-width: 650px;
  margin: 0 auto 35px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #665c54;
}

.boton-participar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;

  margin-top: 35px;
  margin-left: auto;
  margin-right: 8%;

  padding: 15px 32px;

  background: #e8ddd0;
  color: #493d35;

  border: 1px solid #cdbca9;
  border-radius: 4px;

  text-decoration: none;
  font-size: 1rem;
  font-weight: 700;

  transition:
    background 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.boton-participar span {
  margin-left: 15px;
  font-size: 1.2rem;
  transition: transform 0.25s ease;
}

.boton-participar:hover {
  background: #d9c9b8;
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(60, 45, 35, 0.15);
}

.boton-participar:hover span {
  transform: translateX(4px);
}
/* RESPONSIVE */

@media (max-width: 800px) {
  .cards-grid,
  .principios {
    grid-template-columns: 1fr;
  }

  .intro-contenido,
  .extension-contenido {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .extensiones,
  .check-list {
    grid-template-columns: 1fr;
  }

  .hero-contenido {
    padding: 70px 25px;
  }

  .hero-contenido h1 {
    font-size: 3.3rem;
  }

  .principios {
    padding-top: 70px;
    padding-bottom: 70px;
  }
}

@media (max-width: 500px) {
  .requisito-card {
    padding: 25px;
  }

  .hero-contenido h1 {
    font-size: 2.8rem;
  }

  .hero-contenido p {
    font-size: 1.05rem;
  }
}
/* =========================================
   NAVBAR TRANSPARENTE — SOLO REQUISITOS
========================================= */

.pagina-requisitos :deep(.navbar-premio) {
  background: transparent !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: none;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}


/* LOGO */

.pagina-requisitos :deep(.navbar-logo a) {
  color: white !important;
}


/* ENLACES */

.pagina-requisitos :deep(.navbar-links a) {
  color: white !important;
}

.pagina-requisitos :deep(.navbar-links a:hover) {
  color: #d8b27c !important;
}


/* BOTÓN MÓVIL */

.pagina-requisitos :deep(.menu-button) {
  color: white !important;
}


/* MENÚ MÓVIL */

@media (max-width: 900px) {

  .pagina-requisitos :deep(.navbar-links) {
    background: rgba(35, 30, 26, 0.88);

    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

}
 
</style>
