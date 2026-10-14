
<template>
  <div class="activities-page">
    <NavbarPrincipal />

    <main class="page">
      <!-- Fondo con imagen desenfocada -->
      <div class="background-image"></div>
      <div class="background-overlay"></div>

      <div class="content">
        <section class="banner">
          <div class="banner-text">
            <p class="eyebrow">Compartir experiencias</p>

            <h1>Actividades que nos acercan.</h1>

            <p>
              Aprender un idioma, descubrir la ciudad y crear vínculos:
              cada actividad es una oportunidad para sentirnos parte
              de una comunidad.
            </p>
          </div>

          <img
            src="/fotos/EXAEQUO/actividad.png"
            alt="Actividades de EXAEQUO"
            class="banner-image"
          />
        </section>

        <section class="body-copy">
          <h2>Aprender también es encontrarse</h2>

          <p>
            Organizamos propuestas educativas y comunitarias pensadas
            para acompañar procesos de aprendizaje, fomentar la autonomía
            y disfrutar del camino en compañía. Próximamente compartiremos
            aquí las actividades y los talleres programados.
          </p>

          <div class="note">
            Estamos preparando nuevas actividades.
            ¡Muy pronto podrás descubrirlas aquí!
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import NavbarPrincipal from '../../components/NavbarPrincipal.vue'
</script>

<style scoped>
.activities-page {
  min-height: 100vh;
  background: #fbf9f4;
}

/* Página */

.page {
  position: relative;
  isolation: isolate;
  min-height: 80vh;
  overflow: hidden;
  background: #fbf9f4;
}

/* Imagen de fondo desenfocada */

.background-image {
  position: absolute;
  z-index: -2;
  inset: -15px;

  background-image: url('/fotos/EXAEQUO/actividades.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  filter: blur(-8px);
  transform: scale(1.03);
}

/* Transparencia para mantener el estilo original */

.background-overlay {
  position: absolute;
  z-index: -1;
  inset: 0;
  background: rgba(251, 249, 244, 0.82);
}

.content {
  position: relative;
}

/* Banner original */

.banner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  padding: 65px max(6vw, 24px);
  background: rgba(240, 234, 223, 0.78);
}

.banner-text {
  min-width: 0;
}

.banner h1 {
  margin: 14px 0;
  color: #204537;
  font-size: clamp(2.8rem, 5vw, 4.8rem);
  line-height: 1.02;
  letter-spacing: -0.05em;
}

.banner-text > p:not(.eyebrow) {
  color: #59675f;
  font-size: 1.1rem;
  line-height: 1.8;
}

.eyebrow {
  color: #b76545;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.banner-image {
  display: block;
  width: 100%;
  max-height: 430px;
  object-fit: cover;
  border-radius: 20px;
}

/* Texto inferior original */

.body-copy {
  max-width: 850px;
  margin: auto;
  padding: 70px 24px;
}

.body-copy h2 {
  color: #214f42;
  font-size: 2rem;
}

.body-copy p {
  color: #59675f;
  line-height: 1.85;
}

.note {
  margin-top: 25px;
  padding: 20px;
  border-radius: 12px;
  background: rgba(231, 238, 228, 0.94);
  color: #214f42;
  font-weight: 650;
  line-height: 1.7;
}

/* Móviles */

@media (max-width: 700px) {
  .banner {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 45px 24px;
  }

  .banner h1 {
    font-size: clamp(2.5rem, 10vw, 3.5rem);
  }

  .banner-image {
    max-height: 320px;
  }

  .body-copy {
    padding: 45px 24px;
  }

  .body-copy h2 {
    font-size: 1.8rem;
  }
}
</style>
