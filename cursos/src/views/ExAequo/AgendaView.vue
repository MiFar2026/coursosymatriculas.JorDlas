<template>
  <div class="activities-page">
    <NavbarPrincipal />

    <main class="agenda">
      <div class="overlay">
        <p class="eyebrow">Nos encontramos pronto</p>

        <h1>Agenda</h1>

        <p>
          Hay encuentros que abren caminos. Estamos preparando las próximas
          fechas, talleres y actividades de EXAEQUO.
        </p>

        <span class="coming">
          Próximamente publicaremos el calendario.
        </span>
      </div>
    </main>
  </div>
</template>

<script setup>
import NavbarPrincipal from '../../components/NavbarPrincipal.vue'
</script>

<style scoped>
.agenda {
  min-height: calc(100vh - 72px);
  display: grid;
  place-items: center;
  padding: 40px 24px;
  background:
    linear-gradient(90deg, #17382ed9, #17382e40),
    url('/fotos/EXAEQUO/agenda.png') center / cover no-repeat;
}

.overlay {
  max-width: 720px;
  text-align: center;
  color: #fff;
  padding: clamp(28px, 6vw, 65px);
  border: 1px solid #ffffff70;
  background: #17382e80;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 24px;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: .18em;
  font-size: .75rem;
  font-weight: 800;
  color: #f4c89d;
}

.overlay h1 {
  font-size: clamp(3.5rem, 9vw, 6.5rem);
  line-height: 1;
  margin: 18px 0;
  letter-spacing: -.06em;
}

.overlay p:not(.eyebrow) {
  font-size: 1.15rem;
  line-height: 1.8;
}

.coming {
  display: inline-block;
  margin-top: 18px;
  padding: 12px 18px;
  border-radius: 999px;
  background: #fff8ed;
  color: #214f42;
  font-weight: 750;
}

@media (max-width: 600px) {
  .agenda {
    padding: 28px 16px;
  }

  .overlay h1 {
    font-size: clamp(3rem, 12vw, 4.5rem);
  }
}
</style>