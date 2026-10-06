
<template>

  <main class="avanzado-page">

    <!-- NAVBAR -->
    <NavbarCursos />

    <!-- VOLVER A ALFABETIZACIÓN -->
    <RouterLink
      to="/alfabetizacion"
      class="volver-alfabetizacion"
    >
      <span class="flecha">←</span>
      <span>Volver a Alfabetización</span>
    </RouterLink>


    <!-- CONTENIDO -->
    <section class="avanzado-container">

      <!-- ICONO -->
      <div class="icono">
        <img
          src="/fotos/cursos/alfabetizacion/icons/iconavanzada.png"
          alt="Niveles avanzados"
        />
      </div>


      <!-- TÍTULO -->
      <h1>
        Niveles avanzados
      </h1>


      <!-- DESCRIPCIÓN -->
      <p class="descripcion">
        Aquí encontrarás recursos para continuar practicando
        y mejorar tu español en niveles más avanzados.
      </p>


      <!-- ENLACE EXTERNO -->
      <a
        href="https://aprenderespanol.org/"
        target="_blank"
        rel="noopener noreferrer"
        class="boton-recurso"
      >
        Ir a los recursos avanzados
      </a>

    </section>


    <!-- VOLVER A PRACTICAR ESCRITURA -->
    <div class="volver-container">

      <RouterLink
        to="/alfabetizacion/practicar-escritura"
        class="volver"
      >
        ← Volver a Practicar escritura
      </RouterLink>

    </div>


  </main>

</template>


<script setup>

import NavbarCursos from '../../../../components/cursosymatricula/NavbarCursos.vue'

</script>


<style scoped>

/* =====================================================
   PÁGINA
===================================================== */

.avanzado-page {
  min-height: 100vh;

  padding-bottom: 60px;

  background:
    radial-gradient(
      circle at top left,
      rgba(223, 199, 255, 0.85),
      transparent 35%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(194, 154, 255, 0.6),
      transparent 35%
    ),
    #faf7ff;

  color: #333;
}


/* =====================================================
   VOLVER A ALFABETIZACIÓN
===================================================== */

.volver-alfabetizacion {
  display: inline-flex;

  align-items: center;
  gap: 8px;

  margin: 20px 0 0 30px;
  padding: 10px 18px;

  border-radius: 25px;
  border: 1px solid #d8c7ef;

  background: #ffffff;
  color: #673ab7;

  text-decoration: none;
  font-weight: 700;

  box-shadow:
    0 5px 15px rgba(80, 50, 120, 0.12);

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}

.volver-alfabetizacion:hover {
  transform: translateX(-4px);

  background: #673ab7;
  color: #ffffff;

  box-shadow:
    0 8px 20px rgba(80, 50, 120, 0.2);
}

.volver-alfabetizacion .flecha {
  font-size: 1.25rem;
  line-height: 1;
}


/* =====================================================
   CONTENEDOR PRINCIPAL
===================================================== */

.avanzado-container {
  width: min(700px, calc(100% - 40px));

  margin: 70px auto 0;
  padding: 50px 35px;

  box-sizing: border-box;

  text-align: center;

  background: rgba(255, 255, 255, 0.94);

  border-radius: 30px;

  border: 1px solid rgba(216, 199, 239, 0.8);

  box-shadow:
    0 15px 40px rgba(80, 50, 120, 0.18);
}


/* =====================================================
   ICONO
===================================================== */

.icono {
  margin-bottom: 20px;

  animation:
    flotar 3s ease-in-out infinite;
}


/* TAMAÑO DEL ICONO */

.icono img {
  display: block;

  width: 80px;
  height: 80px;

  margin: 0 auto;

  object-fit: contain;
}


/* =====================================================
   TÍTULO
===================================================== */

.avanzado-container h1 {
  margin: 0 0 20px;

  color: #673ab7;

  font-size: clamp(2.2rem, 5vw, 3.2rem);

  font-weight: 800;
}


/* =====================================================
   DESCRIPCIÓN
===================================================== */

.descripcion {
  max-width: 560px;

  margin: 0 auto 30px;

  color: #555;

  font-size: 1.1rem;

  line-height: 1.7;
}


/* =====================================================
   BOTÓN RECURSOS AVANZADOS
===================================================== */

.boton-recurso {
  display: inline-block;

  padding: 15px 28px;

  border-radius: 30px;

  background:
    linear-gradient(
      135deg,
      #8e5de7,
      #673ab7
    );

  color: #ffffff;

  text-decoration: none;
  font-weight: 700;

  box-shadow:
    0 8px 20px rgba(103, 58, 183, 0.2);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.boton-recurso:hover {
  transform: translateY(-3px);

  box-shadow:
    0 12px 25px rgba(103, 58, 183, 0.3);
}


/* =====================================================
   CONTENEDOR DEL BOTÓN DE VOLVER
===================================================== */

.volver-container {
  width: 100%;

  display: flex;

  justify-content: center;
  align-items: center;

  margin-top: 40px;

  padding: 0 20px 20px;

  box-sizing: border-box;
}


/* =====================================================
   BOTÓN VOLVER A PRACTICAR ESCRITURA
===================================================== */

.volver {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  padding: 13px 24px;

  border: 1px solid #d8c7ef;

  border-radius: 25px;

  background: #ffffff;

  color: #673ab7;

  text-decoration: none;

  font-weight: 700;

  box-shadow:
    0 5px 15px rgba(80, 50, 120, 0.12);

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}

.volver:hover {
  transform: translateY(-3px);

  background: #673ab7;

  color: #ffffff;

  box-shadow:
    0 8px 20px rgba(80, 50, 120, 0.2);
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


  .avanzado-container {
    width: calc(100% - 30px);

    margin: 50px auto 0;

    padding: 40px 22px;

    border-radius: 25px;
  }


  /* ICONO MÁS PEQUEÑO EN MÓVIL */

  .icono img {
    width: 65px;
    height: 65px;
  }


  .avanzado-container h1 {
    font-size: 2.1rem;
  }


  .descripcion {
    font-size: 1rem;
  }


  .boton-recurso {
    padding: 13px 20px;

    font-size: 0.95rem;
  }


  .volver-container {
    margin-top: 35px;
  }


  .volver {
    font-size: 0.9rem;
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


  .avanzado-container {
    width: calc(100% - 20px);

    padding: 35px 15px;
  }


  /* ICONO MUY PEQUEÑO */

  .icono img {
    width: 55px;
    height: 55px;
  }


  .avanzado-container h1 {
    font-size: 1.9rem;
  }


  .descripcion {
    font-size: 0.95rem;
  }


  .boton-recurso {
    width: 100%;

    box-sizing: border-box;
  }


  .volver {
    width: 100%;

    box-sizing: border-box;

    font-size: 0.9rem;
  }

}

</style>
