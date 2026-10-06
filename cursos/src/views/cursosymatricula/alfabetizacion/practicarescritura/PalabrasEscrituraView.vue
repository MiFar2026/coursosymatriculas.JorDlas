
<template>
  <main class="nivel-page">

    <!-- NAVBAR -->
    <NavbarCursos />

    <!-- VOLVER A ALFABETIZACIÓN -->
    <section class="volver-alfa-container">
      <RouterLink
        to="/alfabetizacion"
        class="volver-alfabetizacion"
      >
        <span class="flecha">←</span>
        <span>Volver a Alfabetización</span>
      </RouterLink>
    </section>


    <!-- HERO -->
    <section class="hero-nivel">

      <!-- ICONO -->
      <div class="icono-alfab">
        <img
          src="/fotos/cursos/alfabetizacion/icons/iconopalabra.png"
          alt="Palabras básicas"
        />
      </div>

      <span class="etiqueta">
        NIVEL INICIAL
      </span>

      <h1>
        Palabras básicas
      </h1>

      <p>
        Ya conoces algunas letras. Ahora vamos a unirlas
        para formar palabras y empezar a escribir pequeños
        textos.
      </p>

    </section>


    <!-- CONTENIDO -->
    <section class="contenido">

      <!-- TÍTULO DE SECCIÓN -->
      <div class="titulo-seccion">

        <span>
          02
        </span>

        <div>

          <h2>
            Elige un ejercicio
          </h2>

          <p>
            Puedes empezar por completar letras o practicar
            directamente la escritura de palabras.
          </p>

        </div>

      </div>


      <!-- DOCUMENTOS -->
      <div class="documentos">

        <!-- DOCUMENTO 1 -->
        <article class="documento">

          <div class="documento-numero">
            01
          </div>

          <div class="documento-contenido">

            <span class="tipo">
              DOSSIER
            </span>

            <h3>
              Completa las letras
            </h3>

            <p>
              Ejercicios para completar palabras y reforzar
              la relación entre letras y palabras.
            </p>

            <a
              href="/pdf/practica.escritura/basica/Dossier_1_Escritura_Palabras_Basicas.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="boton"
            >
              Abrir PDF →
            </a>

          </div>

        </article>


        <!-- DOCUMENTO 2 -->
        <article class="documento">

          <div class="documento-numero">
            02
          </div>

          <div class="documento-contenido">

            <span class="tipo">
              DOSSIER
            </span>

            <h3>
              Escritura de palabras básicas
            </h3>

            <p>
              Practica palabras frecuentes y empieza a ganar
              soltura escribiendo en español.
            </p>

            <a
              href="/pdf/practica.escritura/basica/Dossier_2_Completa_Letras.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="boton"
            >
              Abrir PDF →
            </a>

          </div>

        </article>

      </div>


      <!-- VOLVER A PRACTICAR ESCRITURA -->
      <div class="volver-container">

        <RouterLink
          to="/alfabetizacion/practicar-escritura"
          class="volver"
        >
          ← Volver a Practicar escritura
        </RouterLink>

      </div>

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

.nivel-page {
  min-height: 100vh;

  background:
    radial-gradient(
      circle at top,
      #fffaf3,
      #f3eadf 60%,
      #eaded0
    );

  color: #40372f;
}


/* =====================================================
   CONTENEDOR BOTÓN ALFABETIZACIÓN
===================================================== */

.volver-alfa-container {
  width: 100%;
  box-sizing: border-box;
}


/* =====================================================
   BOTÓN VOLVER A ALFABETIZACIÓN
===================================================== */

.volver-alfabetizacion {
  display: inline-flex;

  align-items: center;

  gap: 8px;

  margin: 20px 0 0 30px;

  padding: 10px 18px;

  border-radius: 25px;

  background: #ffffff;

  color: #5f0339;

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

  background: #5f0339;;

  color: #ffffff;

  box-shadow:
    0 8px 20px rgba(80, 60, 45, 0.2);
}


/* =====================================================
   HERO
===================================================== */

.hero-nivel {
  text-align: center;

  max-width: 800px;

  margin: auto;

  padding: 45px 25px 70px;
}


/* =====================================================
   ICONO
===================================================== */

.icono-alfab {
  margin-bottom: 18px;

  animation:
    flotar-alfab 3s ease-in-out infinite;
}


.icono-alfab img {
  display: block;

  width: 80px;
  height: 80px;

  margin: 0 auto;

  object-fit: contain;
}


@keyframes flotar-alfab {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}


/* =====================================================
   ETIQUETA
===================================================== */

.etiqueta,
.tipo {
  color: #a05f3d;

  font-size: 50 px;

  font-weight: 800;

  letter-spacing: 3px;
}


/* =====================================================
   TÍTULO
===================================================== */

.hero-nivel h1 {
  margin: 15px 0;

  font-family: Georgia, serif;

  font-size: clamp(2.5rem, 6vw, 4rem);

  font-weight: 500;
}


/* =====================================================
   DESCRIPCIÓN HERO
===================================================== */

.hero-nivel p {
  max-width: 650px;

  margin: auto;

  color: #71665c;

  line-height: 1.8;

  font-size: 1.08rem;
}


/* =====================================================
   CONTENIDO
===================================================== */

.contenido {
  max-width: 1000px;

  margin: auto;

  padding: 0 25px 40px;
}


/* =====================================================
   TÍTULO DE SECCIÓN
===================================================== */

.titulo-seccion {
  display: flex;

  gap: 25px;

  align-items: flex-start;

  margin-bottom: 45px;
}


.titulo-seccion > span {
  font-family: Georgia, serif;

  font-size: 2.5rem;

  color: #b88765;
}


.titulo-seccion h2 {
  margin: 0 0 10px;

  font-family: Georgia, serif;

  font-weight: 500;

  font-size: 2rem;
}


.titulo-seccion p {
  margin: 0;

  color: #71665c;

  line-height: 1.7;
}


/* =====================================================
   DOCUMENTOS
===================================================== */

.documentos {
  display: grid;

  gap: 25px;
}


.documento {
  display: grid;

  grid-template-columns: 100px 1fr;

  gap: 25px;

  align-items: center;

  padding: 35px;

  background: rgba(255, 250, 243, 0.9);

  border: 1px solid #dccab7;

  border-radius: 25px;

  box-shadow:
    0 10px 30px rgba(70, 50, 35, 0.07);

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}


.documento:hover {
  transform: translateY(-4px);

  box-shadow:
    0 18px 40px rgba(70, 50, 35, 0.12);
}


/* =====================================================
   NÚMERO
===================================================== */

.documento-numero {
  width: 80px;

  height: 80px;

  border-radius: 50%;

  display: flex;

  justify-content: center;

  align-items: center;

  background: #eadbc9;

  color: #8e6248;

  font-family: Georgia, serif;

  font-size: 1.4rem;
}


/* =====================================================
   TEXTO DOCUMENTO
===================================================== */

.documento h3 {
  margin: 8px 0;

  font-family: Georgia, serif;

  font-size: 1.5rem;
}


.documento p {
  color: #71665c;

  line-height: 1.7;

  margin-bottom: 0;
}


/* =====================================================
   BOTÓN PDF
===================================================== */

.boton {
  display: inline-block;

  margin-top: 15px;

  padding: 12px 22px;

  background: #e1cdb8;

  color: #493d35;

  border-radius: 8px;

  text-decoration: none;

  font-weight: 700;

  transition:
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}


.boton:hover {
  background: #cdb094;

  transform: translateY(-2px);

  box-shadow:
    0 6px 15px rgba(70, 50, 35, 0.12);
}


/* =====================================================
   BOTÓN VOLVER A PRACTICAR ESCRITURA
===================================================== */

.volver-container {
  width: 100%;

  display: flex;

  justify-content: center;

  align-items: center;

  margin-top: 45px;

  padding: 0 20px 30px;

  box-sizing: border-box;
}


.volver {
  display: inline-flex;

  align-items: center;

  justify-content: center;

  padding: 13px 24px;

  border: 1px solid #dccab7;

  border-radius: 25px;

  background: #ffffff;

  color: #5f0339;;

  text-decoration: none;

  font-weight: 700;

  box-shadow:
    0 5px 15px rgba(80, 60, 45, 0.12);

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}


.volver:hover {
  transform: translateY(-3px);

  background: #5f0339;

  color: #ffffff;

  box-shadow:
    0 8px 20px rgba(80, 60, 45, 0.2);
}


/* =====================================================
   TABLET
===================================================== */

@media (max-width: 650px) {

  .volver-alfabetizacion {
    margin-left: 15px;

    font-size: 0.9rem;

    padding: 9px 15px;
  }


  .volver-alfabetizacion .flecha {
    font-size: 1.15rem;
  }


  .hero-nivel {
    padding: 40px 20px 50px;
  }


  /* ICONO MÁS PEQUEÑO */

  .icono-alfab img {
    width: 65px;
    height: 65px;
  }


  .contenido {
    padding-left: 20px;

    padding-right: 20px;
  }


  .documento {
    grid-template-columns: 80px 1fr;

    gap: 20px;

    padding: 25px;
  }


  .documento-numero {
    width: 65px;

    height: 65px;
  }

}


/* =====================================================
   MÓVIL
===================================================== */

@media (max-width: 400px) {

  .volver-alfabetizacion {
    margin-left: 10px;

    padding: 8px 13px;

    font-size: 0.85rem;
  }


  .volver-alfabetizacion .flecha {
    font-size: 1.1rem;
  }


  .hero-nivel {
    padding: 35px 15px 45px;
  }


  /* ICONO MÁS PEQUEÑO */

  .icono-alfab img {
    width: 55px;
    height: 55px;
  }


  .hero-nivel h1 {
    font-size: 2.4rem;
  }


  .contenido {
    padding-left: 15px;

    padding-right: 15px;

    padding-bottom: 30px;
  }


  .titulo-seccion {
    gap: 15px;

    margin-bottom: 30px;
  }


  .titulo-seccion > span {
    font-size: 2rem;
  }


  .titulo-seccion h2 {
    font-size: 1.6rem;
  }


  .documento {
    grid-template-columns: 1fr;

    gap: 20px;

    padding: 25px 20px;
  }


  .documento-numero {
    width: 60px;

    height: 60px;
  }


  .documento h3 {
    font-size: 1.35rem;
  }


  .boton {
    width: 100%;

    box-sizing: border-box;

    text-align: center;
  }


  .volver-container {
    margin-top: 35px;

    padding-left: 15px;

    padding-right: 15px;
  }


  .volver {
    width: 100%;

    max-width: 320px;

    padding: 12px 18px;

    text-align: center;
  }

}

</style>
