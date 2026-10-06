
<template>
  <main class="nivel-page">

    <NavbarCursos />

    <!-- VOLVER A ALFABETIZACIÓN -->
    <RouterLink
      to="/alfabetizacion"
      class="volver-alfabetizacion"
    >
      <span class="flecha">←</span>
      <span>Volver a Alfabetización</span>
    </RouterLink>

    <!-- CABECERA -->
    <section class="hero-nivel">

      <div class="nivel-circulo">
        A1
      </div>

      <span class="etiqueta">
        NIVEL A1
      </span>

      <h1>
        Un paso más
      </h1>

      <p>
        Si ya puedes comprender palabras y frases sencillas,
        estos materiales te ayudarán a seguir desarrollando
        tu escritura y tu español.
      </p>

    </section>

    <!-- CONTENIDO -->
    <section class="contenido">

      <!-- MENSAJE -->
      <div class="mensaje">

        <span class="mensaje-icono">
          ✦
        </span>

        <div>
          <h2>
            Practica con materiales más completos
          </h2>

          <p>
            Trabaja vocabulario, frases y situaciones
            de la vida cotidiana. No necesitas hacerlo todo
            de una vez: avanza poco a poco.
          </p>
        </div>

      </div>

      <!-- DOCUMENTOS -->
      <div class="documentos">

        <!-- DOCUMENTO 1 -->
        <article class="documento">

  <div class="documento-icono"> <img src="/fotos/cursos/alfabetizacion/icons/iconpdf.png" alt="Manual PDF" /> </div>

          <div class="documento-contenido">

            <span class="tipo">
              MANUAL
            </span>

            <h3>
              Manual de Fundación FIE
            </h3>

            <p>
              Material de apoyo para continuar aprendiendo
              español y practicar diferentes situaciones
              comunicativas.
            </p>

            <a
              href="/pdf/practica.escritura/A1/manual-de-Fundacion-Fie.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="boton"
            >
              Abrir manual →
            </a>

          </div>

        </article>

        <!-- DOCUMENTO 2 -->
        <article class="documento">

          <div class="documento-icono"> <img src="/fotos/cursos/alfabetizacion/icons/iconpdf.png" alt="Manual PDF" /> </div>

          <div class="documento-contenido">

            <span class="tipo">
              MANUAL
            </span>

            <h3>
              Aprendemos español
            </h3>

            <p>
              Material pensado para personas inmigrantes
              que quieren continuar desarrollando
              su español.
            </p>

            <a
              href="/pdf/practica.escritura/A1/Aprendemos-espanol-Manual-Inmigrantes.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="boton"
            >
              Abrir manual →
            </a>

          </div>

        </article>

      </div>

      <!-- CONTINUAR -->
      <div class="proximo">

        <span>
          A1
        </span>

        <p>
          Cuando te sientas preparado, puedes continuar
          practicando con ejercicios online de niveles
          superiores.
        </p>

        <a
          href="https://aprenderespanol.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="enlace-externo"
        >
          Continuar practicando →
        </a>

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
   BOTÓN VOLVER A ALFABETIZACIÓN
===================================================== */

.volver-alfabetizacion {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  margin: 20px 0 0 30px;
  padding: 10px 18px;

  border-radius: 25px;
  border: 1px solid #dccab7;

  background: #ffffff;
  color: #07052e;

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

.volver-alfabetizacion:hover {
  transform: translateX(-4px);

  background: #07052e;
  color: #ffffff;

  box-shadow:
    0 8px 20px rgba(80, 60, 45, 0.2);
}

.volver-alfabetizacion .flecha {
  font-size: 1.25rem;
  line-height: 1;
}


/* =====================================================
   HERO
===================================================== */

.hero-nivel {
  max-width: 800px;

  margin: 0 auto;

  padding: 65px 25px 75px;

  text-align: center;
}


/* =====================================================
   CÍRCULO A1
===================================================== */

.nivel-circulo {
  width: 90px;
  height: 90px;

  margin: 0 auto 25px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  border: 2px solid #cdb094;

  background: #eadbc9;
  color: #8e6248;

  font-family: Georgia, serif;
  font-size: 1.8rem;
  font-weight: bold;
}


/* =====================================================
   ETIQUETAS
===================================================== */

.etiqueta,
.tipo {
  color: #a05f3d;

  font-size: 0.75rem;
  font-weight: 700;

  letter-spacing: 3px;
}


/* =====================================================
   TÍTULO
===================================================== */

.hero-nivel h1 {
  margin: 12px 0 20px;

  font-family: Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 500;
}


/* =====================================================
   TEXTO HERO
===================================================== */

.hero-nivel p {
  max-width: 650px;

  margin: 0 auto;

  color: #71665c;

  line-height: 1.8;
  font-size: 1.08rem;
}


/* =====================================================
   CONTENIDO
===================================================== */

.contenido {
  width: 100%;
  max-width: 1000px;

  margin: 0 auto;

  padding: 0 25px 60px;

  box-sizing: border-box;
}


/* =====================================================
   ICON
===================================================== */


.documento-icono {
  width: 80px;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.documento-icono img {
  width: 70px;
  height: 70px;

  object-fit: contain;
}

/* =====================================================
   MENSAJE
===================================================== */

.mensaje {
  display: flex;
  align-items: center;

  gap: 20px;

  margin-bottom: 40px;
  padding: 30px;

  border: 1px solid #dccab7;
  border-radius: 20px;

  background: rgba(255, 250, 243, 0.7);

  box-sizing: border-box;
}

.mensaje-icono {
  flex-shrink: 0;

  font-size: 2rem;
  color: #a05f3d;
}

.mensaje h2 {
  margin: 0 0 8px;

  font-family: Georgia, serif;
  font-size: 1.6rem;
  font-weight: 500;
}

.mensaje p {
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

  grid-template-columns: 90px 1fr;

  gap: 25px;

  padding: 35px;

  border: 1px solid #dccab7;
  border-radius: 25px;

  background: rgba(255, 250, 243, 0.92);

  box-shadow:
    0 10px 30px rgba(70, 50, 35, 0.07);

  box-sizing: border-box;
}

.documento-icono {
  width: 75px;
  height: 75px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #eadbc9;

  font-size: 1.7rem;
}

.documento-contenido {
  min-width: 0;
}

.documento h3 {
  margin: 8px 0;

  font-family: Georgia, serif;
  font-size: 1.5rem;
}

.documento p {
  color: #71665c;

  line-height: 1.7;
}


/* =====================================================
   BOTÓN PDF
===================================================== */

.boton {
  display: inline-block;

  margin-top: 10px;
  padding: 12px 22px;

  border-radius: 5px;

  background: #e1cdb8;
  color: #493d35;

  text-decoration: none;
  font-weight: 700;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.boton:hover {
  background: #cdb094;

  transform: translateY(-2px);
}


/* =====================================================
   BLOQUE FINAL
===================================================== */

.proximo {
  margin-top: 50px;
  padding: 35px;

  border-radius: 25px;

  background: #40372f;
  color: #fffaf3;

  text-align: center;

  box-sizing: border-box;
}

.proximo > span {
  display: block;

  margin-bottom: 12px;

  color: #e1cdb8;

  font-family: Georgia, serif;
  font-size: 1.5rem;
}

.proximo p {
  max-width: 600px;

  margin: 0 auto;

  line-height: 1.7;

  opacity: 0.9;
}

.enlace-externo {
  display: inline-block;

  margin-top: 20px;

  color: #fffaf3;

  font-weight: 700;

  text-decoration: none;
}

.enlace-externo:hover {
  text-decoration: underline;
}


/* =====================================================
   VOLVER A PRACTICAR ESCRITURA
===================================================== */

.volver-container {
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 40px;
  padding: 0 0 20px;

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
  color: #07052e;

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

  background: #07052e;
  color: #ffffff;

  box-shadow:
    0 8px 20px rgba(80, 60, 45, 0.2);
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

  .hero-nivel {
    padding-top: 45px;
  }

  .contenido {
    padding-left: 18px;
    padding-right: 18px;
  }

  .mensaje {
    align-items: flex-start;

    padding: 25px;
  }

  .documento {
    grid-template-columns: 1fr;

    padding: 25px;
  }

  .documento-icono {
    margin-bottom: 5px;
  }

  .volver-container {
    margin-top: 35px;
  }

  .volver {
    width: 100%;

    box-sizing: border-box;

    text-align: center;

    font-size: 0.9rem;
  }

}
</style>
