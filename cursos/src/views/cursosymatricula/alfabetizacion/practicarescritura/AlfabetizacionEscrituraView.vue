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

    <!-- CABECERA -->
    <section class="hero-nivel">

      <!-- ICONO -->
      <div class="icono-alfab">
        <img
          src="/fotos/cursos/alfabetizacion/icons/iconoalfab.png"
          alt="Alfabetización"
        />
      </div>

      <span class="etiqueta">
        PRIMER PASO
      </span>

      <h1>
        Alfabetización
      </h1>

      <p>
        Empieza por las letras. Practica el alfabeto español,
        reconoce cada letra y mejora poco a poco tu escritura.
      </p>

    </section>

    <!-- CONTENIDO -->
    <section class="contenido">

      <!-- INTRODUCCIÓN -->
      <div class="introduccion">

        <span class="numero">
          01
        </span>

        <div>

          <h2>
            Practica el alfabeto
          </h2>

          <p>
            Estos ejercicios están pensados para practicar
            la escritura de las letras del alfabeto español.
            Puedes imprimirlos y practicar tantas veces como quieras.
          </p>

        </div>

      </div>

      <!-- FICHAS -->
      <div class="fichas">

        <!-- FICHA 01 -->
        <article class="ficha">

          <div class="ficha-imagen">

            <img
              src="/fotos/cursos/alfabetizacion/practica.escritura/Spanish Alphabet Handwriting Practice Sheet.png"
              alt="Ficha para practicar el alfabeto español"
            />

          </div>

          <div class="ficha-info">

            <span>
              FICHA 01
            </span>

            <h3>
              Letras del alfabeto
            </h3>

            <p>
              Practica el reconocimiento y la escritura
              de las letras del alfabeto español.
            </p>

            <a
              href="/fotos/cursos/alfabetizacion/practica.escritura/Spanish Alphabet Handwriting Practice Sheet.png"
              target="_blank"
              rel="noopener noreferrer"
              class="boton"
            >
              Abrir ficha →
            </a>

          </div>

        </article>

        <!-- FICHA 02 -->
        <article class="ficha">

          <div class="ficha-imagen">

            <img
              src="/fotos/cursos/alfabetizacion/practica.escritura/Spanish Alphabet Handwriting Practice Sheet 2.png"
              alt="Segunda ficha para practicar el alfabeto español"
            />

          </div>

          <div class="ficha-info">

            <span>
              FICHA 02
            </span>

            <h3>
              Más práctica
            </h3>

            <p>
              Continúa practicando las letras y mejora
              la seguridad y claridad de tu escritura.
            </p>

            <a
              href="/fotos/cursos/alfabetizacion/practica.escritura/Spanish Alphabet Handwriting Practice Sheet 2.png"
              target="_blank"
              rel="noopener noreferrer"
              class="boton"
            >
              Abrir ficha →
            </a>

          </div>

        </article>

      </div>

      <!-- CONSEJO -->
      <div class="consejo">

        <span>✎</span>

        <div>

          <strong>
            Un pequeño consejo
          </strong>

          <p>
            No tengas prisa. Escribe cada letra lentamente,
            intentando mantener un tamaño y una forma parecidos.
          </p>

        </div>

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

.volver-alfa-container {
  width: 100%;
  box-sizing: border-box;
}

.volver-alfabetizacion {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  margin: 20px 0 0 30px;
  padding: 10px 18px;

  border-radius: 25px;

  background: #ffffff;
  color: #062e28;

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

  background: #062e28;
  color: #ffffff;

  box-shadow:
    0 8px 20px rgba(80, 60, 45, 0.2);
}


/* =====================================================
   CABECERA
===================================================== */

.hero-nivel {
  max-width: 800px;

  margin: auto;

  padding: 45px 25px 70px;

  text-align: center;
}


/* =====================================================
   ICONO ALFABETIZACIÓN
===================================================== */

.icono-alfab {
  margin-bottom: 18px;

  animation:
    flotar-alfab 3s ease-in-out infinite;
}

.icono-alfab img {
  display: block;

  width: 30%;
  height: 40%;

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

.etiqueta {
  display: inline-block;

  color: #a05f3d;

  font-size: 50 px;
  font-weight: 800;

  letter-spacing: 3px;

  margin-bottom: 15px;
}


/* =====================================================
   TÍTULO
===================================================== */

.hero-nivel h1 {
  margin: 0;

  font-family: Georgia, serif;

  font-size: clamp(2.5rem, 6vw, 4rem);

  font-weight: 500;
}


/* =====================================================
   DESCRIPCIÓN
===================================================== */

.hero-nivel p {
  max-width: 650px;

  margin: 25px auto 0;

  color: #71665c;

  line-height: 1.8;

  font-size: 1.08rem;
}


/* =====================================================
   CONTENIDO
===================================================== */

.contenido {
  max-width: 1100px;

  margin: auto;

  padding: 0 25px 40px;
}


/* =====================================================
   INTRODUCCIÓN
===================================================== */

.introduccion {
  display: flex;

  align-items: flex-start;

  gap: 25px;

  margin-bottom: 45px;
}

.numero {
  flex-shrink: 0;

  font-family: Georgia, serif;

  font-size: 2.5rem;

  color: #b88765;
}

.introduccion h2 {
  margin: 0 0 10px;

  font-family: Georgia, serif;

  font-size: 2rem;

  font-weight: 500;
}

.introduccion p {
  margin: 0;

  color: #71665c;

  line-height: 1.7;
}


/* =====================================================
   FICHAS
===================================================== */

.fichas {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 30px;
}

.ficha {
  overflow: hidden;

  background: rgba(255, 250, 243, 0.9);

  border: 1px solid #dccab7;

  border-radius: 25px;

  box-shadow:
    0 12px 35px rgba(70, 50, 35, 0.08);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.ficha:hover {
  transform: translateY(-4px);

  box-shadow:
    0 18px 40px rgba(70, 50, 35, 0.13);
}


/* =====================================================
   IMAGEN DE LAS FICHAS
===================================================== */

.ficha-imagen {
  padding: 25px;

  background: #f8f1e7;
}

.ficha-imagen img {
  display: block;

  width: 100%;

  height: 300px;

  object-fit: contain;
}


/* =====================================================
   INFORMACIÓN DE LAS FICHAS
===================================================== */

.ficha-info {
  padding: 30px;
}

.ficha-info > span {
  font-size: 0.7rem;

  letter-spacing: 2px;

  font-weight: 700;

  color: #a05f3d;
}

.ficha-info h3 {
  margin: 10px 0;

  font-family: Georgia, serif;

  font-size: 1.5rem;
}

.ficha-info p {
  color: #71665c;

  line-height: 1.7;
}


/* =====================================================
   BOTÓN ABRIR FICHA
===================================================== */

.boton {
  display: inline-block;

  margin-top: 10px;

  padding: 12px 20px;

  background: #e1cdb8;

  color: #493d35;

  border-radius: 5px;

  text-decoration: none;

  font-weight: 700;

  transition:
    background 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.boton:hover {
  background: #cdb094;

  transform: translateY(-2px);

  box-shadow:
    0 6px 15px rgba(70, 50, 35, 0.12);
}


/* =====================================================
   CONSEJO
===================================================== */

.consejo {
  display: flex;

  align-items: center;

  gap: 20px;

  max-width: 700px;

  margin: 50px auto 0;

  padding: 25px;

  border-left: 4px solid #b88765;

  background: rgba(255, 250, 243, 0.65);
}

.consejo > span {
  flex-shrink: 0;

  font-size: 2rem;
}

.consejo strong {
  font-family: Georgia, serif;
}

.consejo p {
  margin: 7px 0 0;

  color: #71665c;

  line-height: 1.6;
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

  color: #062e28;

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

  background: #021b18;

  color: #ffffff;

  box-shadow:
    0 8px 20px rgba(80, 60, 45, 0.2);
}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 750px) {

  .volver-alfabetizacion {
    margin-left: 15px;

    padding: 9px 15px;

    font-size: 0.9rem;
  }


  .hero-nivel {
    padding: 40px 20px 55px;
  }


  /* ICONO MÁS PEQUEÑO */

  .icono-alfab img {
    width: 65px;
    height: 65px;
  }


  .hero-nivel h1 {
    font-size: 2.5rem;
  }

  .hero-nivel p {
    font-size: 1rem;
  }


  .contenido {
    padding-left: 20px;
    padding-right: 20px;
  }


  .fichas {
    grid-template-columns: 1fr;
  }


  .introduccion {
    flex-direction: column;

    gap: 10px;
  }


  .numero {
    font-size: 2.2rem;
  }


  .introduccion h2 {
    font-size: 1.7rem;
  }

}


/* =====================================================
   MÓVIL PEQUEÑO
===================================================== */

@media (max-width: 450px) {

  .volver-alfabetizacion {
    margin-left: 10px;

    padding: 8px 13px;

    font-size: 0.85rem;
  }


  .hero-nivel {
    padding-top: 35px;

    padding-bottom: 45px;
  }


  /* ICONO TODAVÍA MÁS PEQUEÑO */

  .icono-alfab img {
    width: 55px;
    height: 55px;
  }


  .hero-nivel h1 {
    font-size: 2.2rem;
  }


  .contenido {
    padding-left: 15px;
    padding-right: 15px;
  }


  .ficha-info {
    padding: 25px 20px;
  }


  .ficha-imagen {
    padding: 15px;
  }


  .ficha-imagen img {
    height: 250px;
  }


  .consejo {
    align-items: flex-start;

    padding: 20px;

    gap: 15px;
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
