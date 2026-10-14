
<template>
  <div class="relatos-page">
    <NavbarCursos />

    <main class="relatos-container">
      <RouterLink to="/alfabetizacion" class="back-link">
        <span aria-hidden="true">←</span>
        Volver a Alfabetización
      </RouterLink>

      <!-- Portada -->
      <section class="hero">
        <div class="hero-content">
          <span class="eyebrow">
            <span class="eyebrow-icon">✦</span>
            LECTURA · ESCUCHA · IMAGINACIÓN
          </span>

          <h1>
            Un relato,<br />
            <span>mil mundos.</span>
          </h1>

          <p class="hero-description">
            Escucha historias fascinantes, descubre nuevos personajes
            y deja que cada palabra te lleve a un lugar diferente.
            Aprender también puede ser una aventura.
          </p>

          <div class="hero-actions">
            <a
              href="https://audiocuentos.net/"
              target="_blank"
              rel="noopener noreferrer"
              class="primary-button"
            >
              <span class="play-icon">▶</span>
              Escuchar relatos
              <span aria-hidden="true">↗</span>
            </a>

            <a href="#como-aprender" class="secondary-button">
              Cómo aprovecharlos
            </a>
          </div>

          <div class="hero-note">
            <span>🎧</span>
            <span>Escucha a tu ritmo, desde el ordenador o el móvil.</span>
          </div>
        </div>

        <div class="hero-decoration" aria-hidden="true">
          <div class="sound-orbit orbit-one"></div>
          <div class="sound-orbit orbit-two"></div>
          <div class="story-symbol">♫</div>
          <div class="floating-note note-one">♪</div>
          <div class="floating-note note-two">♫</div>
          <div class="floating-note note-three">✦</div>
          <div class="decoration-caption">
            <span>ABRE UN LIBRO</span>
            <strong>Y deja volar tu imaginación</strong>
          </div>
        </div>
      </section>

      <!-- Introducción -->
      <section class="intro-section">
        <div class="section-heading">
          <span class="section-kicker">TU RINCÓN DE HISTORIAS</span>
          <h2>Las historias cobran vida</h2>
          <p>
            A veces, basta con cerrar los ojos y escuchar para descubrir
            una historia extraordinaria.
          </p>
        </div>

        <div class="benefits-grid">
          <article class="benefit-card">
            <div class="benefit-icon icon-lilac">🎧</div>
            <h3>Escucha con atención</h3>
            <p>
              Sigue la narración, reconoce palabras y descubre cómo
              suenan las frases en español.
            </p>
          </article>

          <article class="benefit-card">
            <div class="benefit-icon icon-peach">📖</div>
            <h3>Amplía tu vocabulario</h3>
            <p>
              Aprende expresiones nuevas dentro de historias
              que tienen sentido para ti.
            </p>
          </article>

          <article class="benefit-card">
            <div class="benefit-icon icon-green">💭</div>
            <h3>Imagina y comprende</h3>
            <p>
              Sigue los acontecimientos, identifica personajes
              y cuenta con tus propias palabras lo que has oído.
            </p>
          </article>
        </div>
      </section>

      <!-- Acceso al recurso externo -->
      <section class="listening-section">
        <div class="listening-copy">
          <span class="section-kicker">TU PRÓXIMA AVENTURA</span>
          <h2>Elige una historia y dale al play</h2>
          <p>
            En AudioCuentos encontrarás cuentos infantiles narrados,
            historias clásicas y fábulas. Elige el relato que más te
            interese y accede a la página para empezar a escucharlo.
          </p>

          <a
            href="https://audiocuentos.net/"
            target="_blank"
            rel="noopener noreferrer"
            class="resource-link"
          >
            Explorar AudioCuentos.net
            <span aria-hidden="true">↗</span>
          </a>

          <p class="external-note">
            Se abrirá el sitio web externo en una pestaña nueva.
          </p>
        </div>

        <div class="listening-art" aria-hidden="true">
          <div class="book book-back"></div>
          <div class="book book-front">
            <span class="book-star">✦</span>
            <span class="book-moon">☾</span>
            <span class="book-title">Érase<br />una vez...</span>
            <span class="book-line"></span>
          </div>
          <div class="art-sparkle sparkle-one">✦</div>
          <div class="art-sparkle sparkle-two">✧</div>
          <div class="art-sparkle sparkle-three">♪</div>
        </div>
      </section>

      <!-- Guía para aprender -->
      <section id="como-aprender" class="practice-section">
        <div class="section-heading">
          <span class="section-kicker">APRENDE MIENTRAS ESCUCHAS</span>
          <h2>Convierte cada relato en una práctica</h2>
          <p>
            Sigue estos cuatro pasos para aprovechar mejor cada historia.
          </p>
        </div>

        <div class="steps-grid">
          <article class="step-card">
            <span class="step-number">01</span>
            <div>
              <h3>Escucha una vez</h3>
              <p>Disfruta de la historia sin preocuparte por entender cada palabra.</p>
            </div>
          </article>

          <article class="step-card">
            <span class="step-number">02</span>
            <div>
              <h3>Identifica palabras</h3>
              <p>Anota tres palabras o expresiones nuevas que hayas escuchado.</p>
            </div>
          </article>

          <article class="step-card">
            <span class="step-number">03</span>
            <div>
              <h3>Escucha de nuevo</h3>
              <p>Presta atención a la pronunciación, las pausas y la entonación.</p>
            </div>
          </article>

          <article class="step-card">
            <span class="step-number">04</span>
            <div>
              <h3>Cuenta el relato</h3>
              <p>Explica qué ocurrió, quiénes eran los personajes y cómo termina.</p>
            </div>
          </article>
        </div>

        <div class="reflection-box">
          <div class="reflection-icon">✎</div>
          <div>
            <h3>Después de escuchar, pregúntate...</h3>
            <p>
              ¿Quién es el protagonista? ¿Qué problema tiene?
              ¿Qué parte me ha gustado más? ¿Qué he aprendido?
            </p>
          </div>
        </div>
      </section>

      <!-- Cierre -->
      <section class="closing-banner">
        <div class="closing-symbol" aria-hidden="true">❝</div>
        <div>
          <h2>Cada historia te enseña algo nuevo.</h2>
          <p>Escucha, imagina, aprende y comparte lo que has descubierto.</p>
        </div>
        <a
          href="https://audiocuentos.net/"
          target="_blank"
          rel="noopener noreferrer"
          class="closing-button"
        >
          Empezar a escuchar ↗
        </a>
      </section>

      <footer class="page-footer">
        <span>Tu espacio de lectura y escucha</span>
        <RouterLink to="/alfabetizacion">
          Volver a Alfabetización ↑
        </RouterLink>
      </footer>
    </main>
  </div>
</template>

<script setup>
import NavbarCursos from '../../../components/cursosymatricula/NavbarCursos.vue'
</script>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

.relatos-page {
  min-height: 100vh;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  color: #292747;
  background:
    linear-gradient(
      rgba(250, 248, 255, 0.50),
      rgba(250, 248, 255, 0.44)
    ),
    url('/fotos/cursos/alfabetizacion/relatos/relatos.png')
      center center / cover fixed;
  font-family: Inter, "Segoe UI", sans-serif;
}

.relatos-container {
  width: min(1160px, calc(100% - 40px));
  margin: 0 auto;
  padding: 28px 0 24px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #615783;
  text-decoration: none;
  font-size: 0.94rem;
  font-weight: 650;
  margin-bottom: 24px;
  transition: color 0.2s, transform 0.2s;
}

.back-link:hover {
  color: #8c64c8;
  transform: translateX(-3px);
}

.back-link span {
  font-size: 1.35rem;
}

.hero {
  min-height: 410px;
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  align-items: center;
  gap: 24px;
  padding: 52px 58px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.85);
  border-radius: 32px;
  background:
    radial-gradient(circle at 90% 15%, #e8defc 0, transparent 32%),
    linear-gradient(125deg, #fff 0%, #f8f3ff 55%, #f0eaff 100%);
  box-shadow: 0 18px 60px rgba(83, 64, 125, 0.09);
}

.hero-content {
  position: relative;
  z-index: 2;
}

.eyebrow,
.section-kicker {
  color: #4b1c9b;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 13px;
  border: 1px solid #e8def8;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.8);
}

.eyebrow-icon {
  color: #ad84db;
}

.hero h1 {
  margin: 24px 0 18px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(3.2rem, 6vw, 5.2rem);
  line-height: 0.99;
  letter-spacing: -0.055em;
  font-weight: 700;
}

.hero h1 span {
  color: #9270c7;
  font-style: italic;
  font-weight: 500;
}

.hero-description {
  max-width: 510px;
  color: #6e6a83;
  line-height: 1.8;
  font-size: 1rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 26px;
}

.primary-button,
.secondary-button,
.resource-link,
.closing-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  min-height: 48px;
  padding: 13px 19px;
  border-radius: 14px;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 750;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}

.primary-button {
  color: white;
  background: #8060b5;
  box-shadow: 0 9px 22px rgba(128, 96, 181, 0.23);
}

.primary-button:hover {
  transform: translateY(-2px);
  background: #6e4da5;
  box-shadow: 0 12px 25px rgba(128, 96, 181, 0.3);
}

.play-icon {
  font-size: 0.75rem;
}

.secondary-button {
  color: #6c578f;
  border: 1px solid #e3d8f3;
  background: rgba(255, 255, 255, 0.8);
}

.secondary-button:hover {
  background: white;
  transform: translateY(-2px);
}

.hero-note {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 24px;
  color: #827d96;
  font-size: 0.82rem;
}

.hero-decoration {
  min-height: 285px;
  position: relative;
  display: grid;
  place-items: center;
}

.sound-orbit {
  position: absolute;
  width: 245px;
  height: 245px;
  border: 1px solid rgba(145, 111, 194, 0.2);
  border-radius: 50%;
}

.orbit-two {
  width: 190px;
  height: 190px;
  border-style: dashed;
  animation: rotate-orbit 45s linear infinite;
}

.story-symbol {
  display: grid;
  place-items: center;
  width: 150px;
  height: 150px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 45% 55% 50% 45%;
  color: #fff;
  background: linear-gradient(145deg, #c4a8e8, #8e70c4);
  box-shadow:
    0 20px 50px rgba(125, 89, 174, 0.25),
    inset 0 0 0 9px rgba(255, 255, 255, 0.14);
  font-family: Georgia, serif;
  font-size: 5rem;
  transform: rotate(-7deg);
}

.floating-note {
  position: absolute;
  color: #a586d1;
  font-size: 2.2rem;
}

.note-one {
  top: 18%;
  left: 20%;
  transform: rotate(-15deg);
}

.note-two {
  right: 12%;
  top: 34%;
  color: #d3a9bb;
  font-size: 2.7rem;
}

.note-three {
  right: 22%;
  bottom: 17%;
  color: #d2ad68;
  font-size: 1.8rem;
}

.decoration-caption {
  position: absolute;
  bottom: -3px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: center;
}

.decoration-caption span {
  color: #a08bbf;
  font-size: 0.64rem;
  letter-spacing: 0.19em;
  font-weight: 800;
}

.decoration-caption strong {
  color: #6e5a91;
  font-family: Georgia, serif;
  font-size: 1rem;
  font-style: italic;
  font-weight: 500;
}

.intro-section,
.practice-section {
  padding: 82px 0 12px;
}

.section-heading {
  max-width: 680px;
  margin: 0 auto 34px;
  text-align: center;
}

.section-heading h2,
.listening-copy h2 {
  margin: 12px 0;
  color: #302b4d;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2rem, 4vw, 2.8rem);
  line-height: 1.15;
  letter-spacing: -0.035em;
}

.section-heading > p {
  max-width: 590px;
  margin: 0 auto;
  color: #77728a;
  font-size: 0.98rem;
  line-height: 1.75;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.benefit-card {
  padding: 27px;
  border: 1px solid rgba(228, 220, 242, 0.9);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 9px 30px rgba(70, 54, 104, 0.035);
  transition: transform 0.2s, box-shadow 0.2s;
}

.benefit-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(70, 54, 104, 0.08);
}

.benefit-icon {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  margin-bottom: 20px;
  border-radius: 17px;
  font-size: 1.6rem;
}

.icon-lilac {
  background: #eee5fc;
}

.icon-peach {
  background: #fff0e5;
}

.icon-green {
  background: #e4f3e9;
}

.benefit-card h3,
.step-card h3,
.reflection-box h3 {
  margin: 0 0 10px;
  color: #37314f;
  font-size: 1.08rem;
}

.benefit-card p,
.step-card p {
  margin: 0;
  color: #77728a;
  font-size: 0.92rem;
  line-height: 1.75;
}

.listening-section {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 30px;
  min-height: 325px;
  margin-top: 70px;
  padding: 42px 52px;
  overflow: hidden;
  border: 1px solid #eadff5;
  border-radius: 28px;
  background: linear-gradient(120deg, #f2eafb, #fcf5f7 72%, #f8eee6);
}

.listening-copy {
  position: relative;
  z-index: 1;
}

.listening-copy h2 {
  max-width: 470px;
  font-size: clamp(2rem, 3.7vw, 2.6rem);
}

.listening-copy > p {
  max-width: 540px;
  color: #716b83;
  font-size: 0.95rem;
  line-height: 1.85;
}

.resource-link {
  margin-top: 10px;
  color: white;
  background: #8b6bb9;
}

.resource-link:hover {
  transform: translateY(-2px);
  background: #7553a7;
}

.listening-copy .external-note {
  margin-top: 12px;
  font-size: 0.77rem;
  color: #9389a0;
}

.listening-art {
  position: relative;
  min-height: 245px;
  display: grid;
  place-items: center;
}

.book {
  position: absolute;
  width: 150px;
  height: 195px;
  border-radius: 8px 17px 17px 8px;
  box-shadow: 0 18px 32px rgba(75, 54, 104, 0.18);
}

.book-back {
  background: #d6b7b0;
  transform: translate(17px, 5px) rotate(13deg);
}

.book-front {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  border-left: 9px solid #73539a;
  color: #fff9f0;
  background: linear-gradient(150deg, #b49ad7, #8267af);
  transform: rotate(-7deg);
}

.book-star {
  color: #f4dca1;
  font-size: 1.1rem;
}

.book-moon {
  font-size: 2rem;
}

.book-title {
  font-family: Georgia, serif;
  font-size: 1.35rem;
  font-style: italic;
  text-align: center;
  line-height: 1.1;
}

.book-line {
  width: 35px;
  height: 2px;
  margin-top: 4px;
  background: #f0dca7;
}

.art-sparkle {
  position: absolute;
  color: #a68ac9;
  font-size: 1.6rem;
}

.sparkle-one {
  top: 17%;
  left: 13%;
}

.sparkle-two {
  top: 12%;
  right: 13%;
  color: #d0a1a7;
}

.sparkle-three {
  right: 10%;
  bottom: 14%;
  font-size: 2rem;
}

.practice-section {
  padding-top: 78px;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
}

.step-card {
  display: flex;
  align-items: flex-start;
  gap: 19px;
  padding: 24px;
  border: 1px solid #eae3f2;
  border-radius: 19px;
  background: rgba(255, 255, 255, 0.84);
}

.step-number {
  display: grid;
  place-items: center;
  flex: 0 0 48px;
  width: 48px;
  height: 48px;
  border-radius: 15px;
  color: #8062ae;
  background: #f0e7fb;
  font-size: 0.9rem;
  font-weight: 850;
}

.step-card h3 {
  margin-top: 3px;
}

.reflection-box {
  display: flex;
  align-items: flex-start;
  gap: 17px;
  margin-top: 23px;
  padding: 25px 28px;
  border: 1px solid #e8dcef;
  border-radius: 20px;
  background: rgba(247, 239, 250, 0.9);
}

.reflection-icon {
  display: grid;
  place-items: center;
  flex: 0 0 46px;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  color: #8261ad;
  background: white;
  font-size: 1.5rem;
}

.reflection-box h3 {
  margin-top: 2px;
}

.reflection-box p {
  margin: 0;
  color: #777087;
  line-height: 1.75;
  font-size: 0.92rem;
}

.closing-banner {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-top: 72px;
  padding: 32px 35px;
  border-radius: 23px;
  color: white;
  background: linear-gradient(115deg, #665087, #9676bb);
  box-shadow: 0 15px 40px rgba(97, 70, 135, 0.17);
}

/* Texto introductorio de la sección de práctica */
.practice-section .section-heading > p {
  color: #30213F !important;
  opacity: 1 !important;
  font-weight: 500;
}

/* Frase introductoria del encabezado principal */
.relatos-page p {
  color: #30213F;
  opacity: 1;
}

.relatos-page .hero p {
  color: #30213F !important;
  opacity: 1 !important;
  font-weight: 500;
}

.closing-symbol {
  color: #e6d3f5;
  font-family: Georgia, serif;
  font-size: 4rem;
  line-height: 1;
}

.closing-banner h2 {
  margin: 0 0 7px;
  font-family: Georgia, serif;
  font-size: clamp(1.3rem, 2.7vw, 1.9rem);
}

.closing-banner p {
  margin: 0;
  color: #a78fc2;
  font-size: 1rem;
  line-height: 1.6;
}

.closing-button {
  flex-shrink: 0;
  margin-left: auto;
  color: #3a2458;
  background: #fff;
}

.closing-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(37, 24, 55, 0.15);
}

.page-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 27px 0 4px;
  color: #564f64;
  font-size: 0.82rem;
}

.page-footer a {
  color: #674c87;
  text-decoration: none;
  font-weight: 700;
}

.page-footer a:hover {
  text-decoration: underline;
}

@keyframes rotate-orbit {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 800px) {
  .relatos-container {
    width: min(100% - 28px, 650px);
  }

  .hero {
    grid-template-columns: 1fr;
    padding: 38px 30px;
  }

  .hero-decoration {
    min-height: 245px;
  }

  .hero h1 {
    font-size: clamp(3rem, 11vw, 4.5rem);
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .benefit-card {
    padding: 23px;
  }

  .listening-section {
    grid-template-columns: 1fr;
    padding: 34px 27px;
  }

  .listening-art {
    min-height: 240px;
  }

  .steps-grid {
    grid-template-columns: 1fr;
  }

  .closing-banner {
    flex-wrap: wrap;
    padding: 27px;
  }

  .closing-button {
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .relatos-container {
    width: calc(100% - 24px);
    padding-top: 20px;
  }

  .hero {
    padding: 29px 21px;
    border-radius: 24px;
  }

  .eyebrow {
    font-size: 0.62rem;
    letter-spacing: 0.09em;
  }

  .hero-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
  }

  .hero-note {
    align-items: flex-start;
    line-height: 1.6;
  }

  .intro-section,
  .practice-section {
    padding-top: 59px;
  }

  .section-heading h2 {
    font-size: 2.05rem;
  }

  .listening-section {
    margin-top: 48px;
    padding: 28px 21px;
  }

  .step-card {
    padding: 19px;
    gap: 13px;
  }

  .step-number {
    flex-basis: 42px;
    width: 42px;
    height: 42px;
  }

  .reflection-box {
    padding: 20px;
  }

  .closing-banner {
    margin-top: 50px;
    gap: 13px;
  }

  .closing-symbol {
    font-size: 3rem;
  }

  .closing-banner > div:nth-child(2) {
    flex: 1;
    min-width: 0;
  }

  .closing-button {
    width: 100%;
  }

  .page-footer {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
