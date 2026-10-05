
<template>

  <main class="nivel-page">

    <NavbarCursos />

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


    <section class="contenido">

      <div class="mensaje">

        <span>
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


      <div class="documentos">

        <article class="documento">

          <div class="documento-icono">
            📘
          </div>

          <div>

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
              class="boton"
            >
              Abrir manual →
            </a>

          </div>

        </article>


        <article class="documento">

          <div class="documento-icono">
            📗
          </div>

          <div>

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
              class="boton"
            >
              Abrir manual →
            </a>

          </div>

        </article>

      </div>


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
        >
          Continuar practicando →
        </a>

      </div>

    </section>

  </main>

</template>


<script setup>

import NavbarCursos from '../../../../components/cursosymatricula/NavbarCursos.vue'
</script>


<style scoped>

.nivel-page {

  min-height: 100vh;

  background:
    radial-gradient(circle at top, #fffaf3, #f3eadf 60%, #eaded0);

  color: #40372f;

}


.hero-nivel {

  text-align: center;

  max-width: 800px;

  margin: auto;

  padding: 65px 25px 75px;

}


.nivel-circulo {

  width: 90px;

  height: 90px;

  margin: 0 auto 25px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #eadbc9;

  border: 2px solid #cdb094;

  color: #8e6248;

  font-family: Georgia, serif;

  font-size: 1.8rem;

  font-weight: bold;

}


.etiqueta,
.tipo {

  color: #a05f3d;

  font-size: .75rem;

  font-weight: 700;

  letter-spacing: 3px;

}


.hero-nivel h1 {

  margin: 12px 0 20px;

  font-family: Georgia, serif;

  font-size: clamp(2.5rem, 6vw, 4rem);

  font-weight: 500;

}


.hero-nivel p {

  max-width: 650px;

  margin: auto;

  color: #71665c;

  line-height: 1.8;

  font-size: 1.08rem;

}


.contenido {

  max-width: 1000px;

  margin: auto;

  padding: 0 25px 120px;

}


.mensaje {

  display: flex;

  align-items: center;

  gap: 20px;

  margin-bottom: 40px;

  padding: 30px;

  border-radius: 20px;

  background: rgba(255, 250, 243, .7);

  border: 1px solid #dccab7;

}


.mensaje > span {

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


.documentos {

  display: grid;

  gap: 25px;

}


.documento {

  display: grid;

  grid-template-columns: 90px 1fr;

  gap: 25px;

  padding: 35px;

  background: rgba(255, 250, 243, .92);

  border: 1px solid #dccab7;

  border-radius: 25px;

  box-shadow: 0 10px 30px rgba(70, 50, 35, .07);

}


.documento-icono {

  width: 75px;

  height: 75px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #eadbc9;

  font-size: 1.7rem;

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


.boton {

  display: inline-block;

  margin-top: 10px;

  padding: 12px 22px;

  background: #e1cdb8;

  color: #493d35;

  border-radius: 5px;

  text-decoration: none;

  font-weight: 700;

}


.boton:hover {

  background: #cdb094;

}


.proximo {

  margin-top: 50px;

  padding: 35px;

  text-align: center;

  background: #40372f;

  color: #fffaf3;

  border-radius: 25px;

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

  margin: auto;

  line-height: 1.7;

  opacity: .9;

}


.proximo a {

  display: inline-block;

  margin-top: 20px;

  color: #fffaf3;

  font-weight: 700;

  text-decoration: none;

}


@media (max-width: 650px) {

  .documento {

    grid-template-columns: 1fr;

  }

  .mensaje {

    align-items: flex-start;

  }

}

</style>