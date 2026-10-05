
<template>

  <main class="nivel-page">

    <NavbarCursos />

    <section class="hero-nivel">

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


    <section class="contenido">

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


      <div class="fichas">

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
  class="boton"
>
  Abrir ficha →
</a>

          </div>

        </article>


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
  class="boton"
>
  Abrir ficha →
</a>

          </div>

        </article>

      </div>


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
    radial-gradient(
      circle at top,
      #fffaf3,
      #f3eadf 60%,
      #eaded0
    );

  color: #40372f;

}


.hero-nivel {

  text-align: center;

  max-width: 800px;

  margin: auto;

  padding: 80px 25px 70px;

}


.etiqueta {

  display: inline-block;

  color: #a05f3d;

  font-size: .75rem;

  font-weight: 700;

  letter-spacing: 3px;

  margin-bottom: 15px;

}


.hero-nivel h1 {

  margin: 0;

  font-family: Georgia, serif;

  font-size: clamp(2.5rem, 6vw, 4rem);

  font-weight: 500;

}


.hero-nivel p {

  max-width: 650px;

  margin: 25px auto 0;

  color: #71665c;

  line-height: 1.8;

  font-size: 1.08rem;

}


.contenido {

  max-width: 1100px;

  margin: auto;

  padding: 0 25px 100px;

}


.introduccion {

  display: flex;

  align-items: flex-start;

  gap: 25px;

  margin-bottom: 45px;

}


.numero {

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


.fichas {

  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 30px;

}


.ficha {

  overflow: hidden;

  background: rgba(255, 250, 243, .9);

  border: 1px solid #dccab7;

  border-radius: 25px;

  box-shadow: 0 12px 35px rgba(70, 50, 35, .08);

}


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


.ficha-info {

  padding: 30px;

}


.ficha-info > span {

  font-size: .7rem;

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


.boton {

  display: inline-block;

  margin-top: 10px;

  padding: 12px 20px;

  background: #e1cdb8;

  color: #493d35;

  border-radius: 5px;

  text-decoration: none;

  font-weight: 700;

  transition: .25s;

}


.boton:hover {

  background: #cdb094;

  transform: translateY(-2px);

}


.consejo {

  display: flex;

  align-items: center;

  gap: 20px;

  max-width: 700px;

  margin: 50px auto 0;

  padding: 25px;

  border-left: 4px solid #b88765;

  background: rgba(255, 250, 243, .65);

}


.consejo > span {

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


@media (max-width: 750px) {

  .fichas {

    grid-template-columns: 1fr;

  }

  .introduccion {

    flex-direction: column;

  }

}

</style>