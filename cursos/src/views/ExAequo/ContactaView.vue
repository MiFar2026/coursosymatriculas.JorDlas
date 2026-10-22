
<template>
  <div class="activities-page">
    <NavbarPrincipal />

    <main class="contact-page">
      <!-- Decoración de fondo -->
      <div class="decoration decoration-one"></div>
      <div class="decoration decoration-two"></div>

      <section class="contact-card">
        <div class="icon-wrap">
          <img
            src="/fotos/EXAEQUO/emailIcon.png"
            alt="Icono de correo electrónico"
          />
        </div>

        <p class="eyebrow">Estamos aquí para escucharte</p>

        <h1>Hablemos<span>.</span></h1>

        <p class="description">
          ¿Tienes alguna pregunta, una idea o quieres saber más sobre
          EXAEQUO? Nos encantará conocerte, escucharte y ayudarte
          en lo que necesites.
        </p>

        <a class="email-link" href="mailto:exaequo1995@gmail.com">
          <span>Escríbenos</span>
          <span class="email-address">exaequo1995@gmail.com</span>
          <span class="arrow">↗</span>
        </a>

        <div class="card-divider"></div>

        <p class="small">
          <span class="heart">♡</span>
          Cada conversación puede ser el comienzo de algo bonito.
        </p>
      </section>

      <p class="footer-note">
        EXAEQUO · Creando vínculos, construyendo comunidad.
      </p>
    </main>
  </div>
</template>

<script setup>
import NavbarPrincipal from '../../components/NavbarPrincipal.vue'
</script>

<style scoped>
.activities-page {
  min-height: 100vh;
  background: #f7f3eb;
}

/* Fondo */

.contact-page {
  position: relative;
  isolation: isolate;
  min-height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 65px 24px 30px;

  background:
    radial-gradient(
      circle at 15% 20%,
      rgba(213, 226, 210, 0.7),
      transparent 32%
    ),
    radial-gradient(
      circle at 85% 75%,
      rgba(237, 211, 184, 0.45),
      transparent 30%
    ),
    #f7f3eb;
}

/* Formas decorativas */

.decoration {
  position: absolute;
  z-index: -1;
  pointer-events: none;
  border: 1px solid rgba(33, 79, 66, 0.1);
  border-radius: 50%;
}

.decoration-one {
  width: 340px;
  height: 340px;
  top: -150px;
  right: -90px;
}

.decoration-two {
  width: 260px;
  height: 260px;
  bottom: -120px;
  left: -80px;
}

/* Tarjeta */

.contact-card {
  width: 100%;
  max-width: 680px;
  padding: clamp(32px, 6vw, 65px);
  text-align: center;

  background: rgba(255, 253, 249, 0.94);
  border: 1px solid rgba(222, 213, 198, 0.85);
  border-radius: 48px;

  box-shadow:
    0 25px 70px rgba(33, 79, 66, 0.1),
    0 4px 12px rgba(33, 79, 66, 0.1);

  animation: appear 0.7s ease both;
}

/* Icono */

.icon-wrap {
  width: 130px;
  height: 130px;
  display: grid;
  place-items: center;
  margin: 0 auto 30px;

  background: #e8efe5;
  border: 1px solid #dce7d8;
  border-radius: 25px;
  transition:
    transform 0.3s ease,
    background 0.3s ease;
}

.icon-wrap img {
  width: 100%;
  height: 100px;
  object-fit:cover;
}

.contact-card:hover .icon-wrap {
  transform: translateY(-4px);
  background: #dce9d8;
}
/* Textos */

.eyebrow {
  margin: 0 0 12px;
  color: #b76545;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.17em;
  text-transform: uppercase;
}

.contact-card h1 {
  margin: 0 0 22px;
  color: #204537;
  font-size: clamp(3.5rem, 9vw, 5.5rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.065em;
}

.contact-card h1 span {
  color: #b76545;
}

.description {
  max-width: 490px;
  margin: 0 auto;
  color: #647067;
  font-size: 1.05rem;
  line-height: 1.9;
}

/* Enlace de contacto */

.email-link {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  max-width: 420px;
  margin: 32px auto 0;
  padding: 19px 58px 19px 24px;

  color: #fff;
  text-align: left;
  text-decoration: none;

  background: #214f42;
  border: 1px solid #214f42;
  border-radius: 17px;

  box-shadow: 0 8px 20px rgba(33, 79, 66, 0.12);

  transition:
    transform 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
}

.email-link > span:first-child {
  color: #d9e7d9;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.email-address {
  font-size: clamp(0.95rem, 3vw, 1.1rem);
  font-weight: 750;
  overflow-wrap: anywhere;
}

.arrow {
  position: absolute;
  top: 50%;
  right: 22px;
  font-size: 1.5rem;
  transform: translateY(-50%);
  transition: transform 0.25s ease;
}

.email-link:hover {
  background: #17392f;
  box-shadow: 0 12px 28px rgba(33, 79, 66, 0.2);
  transform: translateY(-3px);
}

.email-link:hover .arrow {
  transform: translate(3px, -55%);
}

.email-link:focus-visible {
  outline: 3px solid #b76545;
  outline-offset: 4px;
}

/* Separador y mensaje final */

.card-divider {
  width: 48px;
  height: 2px;
  margin: 30px auto 22px;
  background: #d9c8b3;
  border-radius: 2px;
}

.small {
  margin: 0;
  color: #7b827b;
  font-size: 0.9rem;
  font-style: italic;
  line-height: 1.7;
}

.heart {
  margin-right: 5px;
  color: #b76545;
  font-size: 1.2rem;
  font-style: normal;
}

/* Pie */

.footer-note {
  margin: 25px 0 0;
  color: #858b81;
  font-size: 0.76rem;
  letter-spacing: 0.04em;
  text-align: center;
}

/* Animación */

@keyframes appear {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Adaptación móvil */

@media (max-width: 600px) {
  .contact-page {
    min-height: calc(100vh - 72px);
    padding: 40px 17px 24px;
  }

  .contact-card {
    padding: 35px 23px;
    border-radius: 23px;
  }

  .icon-wrap {
    width: 74px;
    height: 74px;
    margin-bottom: 24px;
    border-radius: 21px;
  }

  .icon-wrap img {
    width: 42px;
    height: 42px;
  }

  .contact-card h1 {
    font-size: clamp(3.3rem, 15vw, 4.5rem);
  }

  .description {
    font-size: 0.98rem;
    line-height: 1.8;
  }

  .email-link {
    padding: 17px 48px 17px 18px;
  }

  .arrow {
    right: 17px;
  }

  .footer-note {
    max-width: 280px;
    line-height: 1.7;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-card {
    animation: none;
  }

    .icon-wrap {
    width: 110px;
    height: 110px;
    margin-bottom: 25px;
    border-radius: 27px;
  }

  .icon-wrap img {
    width: 84px;
    height: 84px;
  }
  
  .email-link,
  .arrow {
    transition: none;
  }
}
</style>