<template>
  <main class="gramatica-page">

    <!-- NAVBAR -->
    <NavbarCursos />

    <!-- VOLVER A ALFABETIZACIÓN -->
    <section>
    <RouterLink
      to="/alfabetizacion"
      class="volver-alfabetizacion"
    >
      <span class="flecha">←</span>
      <span>Volver a Alfabetización</span>
    </RouterLink>
   </section>
    
    <!-- CONTENIDO -->
    <section class="gramatica-contenido">

  

        <div class="gramatica-icono"> <img src="/fotos/cursos/alfabetizacion/icons/icongrammar.png" alt="gramatica" /> </div>


      <h1>Gramática básica</h1>

      <p>
        Aquí encontrarás recursos para aprender y practicar
        la gramática del español.
      </p>

      <a
        href="https://pigquiz.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="enlace-recurso"
      >
        Ir a los ejercicios de gramática
      </a>

    </section>

    <section>

      <!-- VOLVER A PRACTICAR ESCRITURA -->
      <RouterLink
        to="/alfabetizacion/practicar-escritura"
        class="volver"
      >
        ← Volver a Practicar escritura
      </RouterLink>

    </section>

  </main>
</template>

<script setup>
import NavbarCursos from '../../../../components/cursosymatricula/NavbarCursos.vue'
</script>

<style scoped>

/* =====================================================
   PÁGINA
===================================================== */

.gramatica-page {
  min-height: 100vh;
  padding-bottom: 60px;

  background:
    radial-gradient(
      circle at top left,
      rgba(255, 241, 180, 0.8),
      transparent 35%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(255, 214, 120, 0.6),
      transparent 35%
    ),
    #fffaf0;

  color: #333;
}


/* =====================================================
   BOTÓN VOLVER
===================================================== */

.volver-alfabetizacion {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  margin: 20px 0 0 30px;
  padding: 10px 18px;

  border-radius: 25px;

  background: #ffffff;
  color: #8e6248;

  text-decoration: none;
  font-weight: 700;

  border: 1px solid #dccab7;

  box-shadow:
    0 5px 15px rgba(80, 60, 45, 0.12);

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}

.volver-alfabetizacion .flecha {
  font-size: 1.25rem;
  line-height: 1;
}

.volver-alfabetizacion:hover {
  transform: translateX(-4px);

  background: #8e6248;
  color: #ffffff;

  box-shadow:
    0 8px 20px rgba(80, 60, 45, 0.2);
}

/* =====================================================
   VOLVER A PRACTICAR ESCRITURA
===================================================== */

.volver {
   display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 13px 24px;

  border: 1px solid #dccab7;
  border-radius: 25px;

  background: #ffffff;

  color: #8e6248;

  text-decoration: none;

  font-weight: 700;

    box-shadow: 0 5px 15px rgba(80, 60, 45, 0.12);
}

.volver-container {
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 40px;
  padding: 0 0 20px;
}

.volver:hover {
  transform: translateX(-3px);

  color: #410a0a;

  text-decoration: underline;
}


/* =====================================================
   CONTENIDO
===================================================== */

.gramatica-contenido {
  max-width: 800px;

  margin: 70px auto 0;
  padding: 50px 30px;

  text-align: center;

  background: rgba(255, 255, 255, 0.9);

  border-radius: 30px;

  border: 1px solid rgba(220, 202, 183, 0.8);

  box-shadow:
    0 15px 40px rgba(100, 75, 30, 0.12);
}


/* =====================================================
   ICONO
===================================================== */

.gramatica-icono {
  margin-bottom: 15px;
  animation: flotar 3s ease-in-out infinite;
}

.gramatica-icono img {
  width: 50%;
  max-width: 100px;
  height: auto;
  display: block;
  margin: 0 auto;
}


/* =====================================================
   TÍTULO
===================================================== */

.gramatica-contenido h1 {
  margin: 0 0 20px;

  font-size: clamp(2.2rem, 5vw, 3.2rem);

  color: #7a4b00;

  font-weight: 800;
}


/* =====================================================
   TEXTO
===================================================== */

.gramatica-contenido p {
  max-width: 650px;

  margin: 0 auto 35px;

  font-size: 1.15rem;

  line-height: 1.6;

  color: #5f5f5f;
}


/* =====================================================
   ENLACE EXTERNO
===================================================== */

.enlace-recurso {
  display: inline-block;

  padding: 14px 25px;

  border-radius: 30px;

  background: linear-gradient(
    135deg,
    #f6b73c,
    #e99a16
  );

  color: white;

  text-decoration: none;

  font-weight: 700;

  box-shadow:
    0 8px 20px rgba(180, 120, 20, 0.2);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.enlace-recurso:hover {
  transform: translateY(-3px);

  box-shadow:
    0 12px 25px rgba(180, 120, 20, 0.3);
}


/* =====================================================
   ANIMACIÓN
===================================================== */

@keyframes flotar {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }

}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 650px) {

  .volver-alfabetizacion {
    margin-left: 15px;

    padding: 9px 15px;

    font-size: 0.9rem;
  }

  .volver-alfabetizacion .flecha {
    font-size: 1.15rem;
  }

  .gramatica-contenido {
    margin: 50px 15px 0;

    padding: 40px 20px;

    border-radius: 25px;
  }

  .gramatica-icono {
    font-size: 3.2rem;
  }

  .gramatica-contenido h1 {
    font-size: 2.1rem;
  }

  .gramatica-contenido p {
    font-size: 1rem;
  }

  .enlace-recurso {
    padding: 13px 20px;

    font-size: 0.95rem;
  }

}


/* =====================================================
   MÓVIL PEQUEÑO
===================================================== */

@media (max-width: 400px) {

  .volver-alfabetizacion {
    margin-left: 10px;

    padding: 8px 13px;

    font-size: 0.85rem;
  }

  .gramatica-contenido {
    margin-left: 10px;
    margin-right: 10px;

    padding: 35px 15px;
  }

  .gramatica-contenido h1 {
    font-size: 1.9rem;
  }

  .enlace-recurso {
    width: 100%;
    box-sizing: border-box;
  }

   .volver {
    font-size: 0.9rem;
  }

}

</style>