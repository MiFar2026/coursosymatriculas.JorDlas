
<template>
  <div class="activities-page">
    <NavbarPrincipal />

    <main class="about-page">
      <section class="about-hero">
        <p class="eyebrow">Nuestra esencia</p>

        <h1>
          EXAEQUO significa <em>por igual.</em>
        </h1>

        <p class="hero-description">
          Y esa es la idea que nos une: todas las personas merecen dignidad,
          oportunidades y un lugar en el que sentirse parte.
        </p>
      </section>

      <section class="about-content">
        <div class="content-heading">
          <p class="eyebrow">Quiénes somos</p>

          <h2>
            La igualdad no es solo un principio: es algo que construimos
            cada día.
          </h2>
        </div>

        <div class="copy">
          <p>
            EXAEQUO nace de una convicción sencilla y profunda: ninguna
            circunstancia debería impedir que una persona aprenda,
            participe y pueda imaginar un futuro con más oportunidades.
          </p>

          <p>
            Somos una iniciativa formada por dos escuelas y un equipo
            comprometido de profesorado, personas voluntarias y
            profesionales que unen sus conocimientos y su tiempo para
            acompañar a personas que atraviesan situaciones de vulnerabilidad.
          </p>

          <p>
            Ofrecemos cursos de español y catalán, así como espacios de
            alfabetización dirigidos a personas recién llegadas, personas
            sin hogar y otras personas que afrontan situaciones difíciles.
            Aprender una lengua va mucho más allá de las palabras: significa
            poder comunicarse, desenvolverse con mayor autonomía, crear
            vínculos y participar en la vida de la comunidad.
          </p>

          <p>
            Queremos que cada persona encuentre un espacio acogedor donde
            sea escuchada, respetada y acompañada. Trabajamos desde la
            inclusión, la solidaridad y la certeza de que una sociedad
            más justa se construye cuando avanzamos, de verdad, en igualdad.
          </p>
        </div>
      </section>

      <section class="values">
        <div class="value-card">
          <span class="value-number">01</span>
          <h3>Dignidad</h3>
          <p>Mirar a cada persona más allá de sus circunstancias.</p>
        </div>

        <div class="value-card">
          <span class="value-number">02</span>
          <h3>Inclusión</h3>
          <p>Crear espacios donde todas las voces tengan lugar.</p>
        </div>

        <div class="value-card">
          <span class="value-number">03</span>
          <h3>Compromiso</h3>
          <p>Convertir la buena voluntad en acompañamiento real.</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import NavbarPrincipal from '../../components/NavbarPrincipal.vue'
</script>


<style scoped>
.activities-page {
  min-height: 100vh;
  background: #fbf7ef;
}

.about-page {
  color: #34473d;
  background: #fbf7ef;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #a94f32;
  font-weight: 800;
  font-size: 0.75rem;
}

/* HERO: verde salvia con más personalidad */

.about-hero {
  position: relative;
  overflow: hidden;
  padding: 105px 24px 110px;
  text-align: center;
  background:
    radial-gradient(
      circle at 10% 20%,
      rgba(255, 255, 255, 0.3),
      transparent 28%
    ),
    radial-gradient(
      circle at 90% 85%,
      rgba(211, 157, 111, 0.25),
      transparent 30%
    ),
    #d6e4d4;
}

.about-hero::before {
  content: "";
  position: absolute;
  width: 280px;
  height: 280px;
  top: -155px;
  right: -50px;
  border: 45px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  pointer-events: none;
}

.about-hero::after {
  content: "";
  position: absolute;
  width: 160px;
  height: 160px;
  bottom: -100px;
  left: 8%;
  border: 30px solid rgba(169, 79, 50, 0.12);
  border-radius: 50%;
  pointer-events: none;
}

.about-hero .eyebrow {
  color: #995035;
}

.about-hero h1 {
  position: relative;
  max-width: 1000px;
  margin: 22px auto;
  color: #173e30;
  font-size: clamp(3rem, 7vw, 6rem);
  line-height: 1;
  letter-spacing: -0.06em;
}

.about-hero h1 em {
  color: #a94f32;
  font-family: Georgia, serif;
  font-weight: 500;
}

.hero-description {
  position: relative;
  max-width: 700px;
  margin: 26px auto 0;
  color: #405b4b;
  font-size: 1.15rem;
  line-height: 1.9;
}

/* QUIÉNES SOMOS */

.about-content {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 9%;
  max-width: 1150px;
  margin: 0 auto;
  padding: 100px 30px;
}

.content-heading {
  align-self: start;
}

.content-heading .eyebrow {
  display: inline-block;
  padding: 9px 13px;
  color: #985036;
  background: #f1dfcf;
  border-radius: 6px;
}

.content-heading h2 {
  margin-top: 22px;
  color: #214f42;
  font-size: clamp(2.1rem, 3.5vw, 3.2rem);
  line-height: 1.12;
  letter-spacing: -0.045em;
}

.copy p {
  margin: 0 0 22px;
  color: #536359;
  font-size: 1.02rem;
  line-height: 1.95;
}

.copy p:last-child {
  margin-bottom: 0;
}

/* VALORES: bloque verde intenso */

.values {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  padding: 75px max(6vw, 30px);
  overflow: hidden;
  background: #214f42;
  color: white;
}

.values::before {
  content: "";
  position: absolute;
  width: 400px;
  height: 400px;
  top: -260px;
  right: -80px;
  border: 65px solid rgba(255, 255, 255, 0.045);
  border-radius: 50%;
  pointer-events: none;
}

.value-card {
  position: relative;
  padding: 28px 26px 30px;
  background: rgba(255, 255, 255, 0.065);
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 18px;
  transition:
    transform 0.25s ease,
    background 0.25s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.11);
}

.value-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 43px;
  height: 43px;
  color: #214f42;
  background: #e8c49e;
  border-radius: 13px;
  font-size: 0.85rem;
  font-weight: 850;
}

.value-card h3 {
  margin: 22px 0 12px;
  color: #fff4e6;
  font-size: 1.55rem;
}

.value-card p {
  margin: 0;
  color: #dce8df;
  line-height: 1.8;
}

/* MÓVILES */

@media (max-width: 700px) {
  .about-hero {
    padding: 75px 24px 85px;
  }

  .about-hero h1 {
    font-size: clamp(2.8rem, 11vw, 4rem);
  }

  .hero-description {
    font-size: 1rem;
    line-height: 1.8;
  }

  .about-content {
    grid-template-columns: 1fr;
    gap: 25px;
    padding: 65px 24px;
  }

  .content-heading h2 {
    font-size: 2.2rem;
  }

  .values {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 50px 24px;
  }

  .value-card {
    padding: 25px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .value-card {
    transition: none;
  }
}
</style>

