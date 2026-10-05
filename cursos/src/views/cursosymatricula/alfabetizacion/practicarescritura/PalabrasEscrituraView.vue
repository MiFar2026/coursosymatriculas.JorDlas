
<template>

  <main class="nivel-page">

    <NavbarCursos />

    <section class="hero-nivel">

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


    <section class="contenido">

      <div class="titulo-seccion">

        <span>02</span>

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


      <div class="documentos">

        <article class="documento">

          <div class="documento-numero">
            01
          </div>

          <div>

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
              href="/pdf/practica.escritura/basica/Dossier_2_Completa_Letras.pdf"
              target="_blank"
              class="boton"
            >
              Abrir PDF →
            </a>

          </div>

        </article>


        <article class="documento">

          <div class="documento-numero">
            02
          </div>

          <div>

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
              href="/pdf/practica.escritura/basica/Dossier_1_Escritura_Palabras_Basicas.pdf"
              target="_blank"
              class="boton"
            >
              Abrir PDF →
            </a>

          </div>

        </article>

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

  padding: 80px 25px 70px;

}


.etiqueta,
.tipo {

  color: #a05f3d;

  font-size: .75rem;

  font-weight: 700;

  letter-spacing: 3px;

}


.hero-nivel h1 {

  margin: 15px 0;

  font-family: Georgia, serif;

  font-size: clamp(2.5rem, 6vw, 4rem);

  font-weight: 500;

}


.hero-nivel p {

  max-width: 650px;

  margin: auto;

  color: #71665c;

  line-height: 1.8;

}


.contenido {

  max-width: 1000px;

  margin: auto;

  padding: 0 25px 120px;

}


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

  background: rgba(255, 250, 243, .9);

  border: 1px solid #dccab7;

  border-radius: 25px;

  box-shadow: 0 10px 30px rgba(70, 50, 35, .07);

  transition: .3s;

}


.documento:hover {

  transform: translateY(-4px);

  box-shadow: 0 18px 40px rgba(70, 50, 35, .12);

}


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


@media (max-width: 650px) {

  .documento {

    grid-template-columns: 1fr;

  }

}

</style>
