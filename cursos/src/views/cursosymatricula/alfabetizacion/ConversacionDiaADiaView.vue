
<template>
  <main class="nivel-page">
    <NavbarCursos />

    <div class="portada" :style="estiloPortada">
      <div class="portada-interior">
        <RouterLink
          to="/alfabetizacion"
          class="volver-alfabetizacion"
        >
          <span class="flecha">←</span>
          Volver a Alfabetización
        </RouterLink>

        <section class="hero">
          <div class="hero-texto">
            <span class="etiqueta">ESPAÑOL PRÁCTICO</span>

            <h1>Conversación día a día</h1>

            <p>
              Aprende español hablando de situaciones cotidianas,
              practicando expresiones útiles y ganando confianza
              para comunicarte.
            </p>

            <div class="hero-botones">
              <a href="#recursos" class="boton boton-claro">
                Explorar recursos <span>↓</span>
              </a>

              <a href="#ejercicios" class="boton boton-borde">
                Practicar conversación
              </a>
            </div>

            <div class="hero-datos">
              <div>
                <strong>01</strong>
                <span>Aprende vocabulario</span>
              </div>
              <div>
                <strong>02</strong>
                <span>Escucha diálogos</span>
              </div>
              <div>
                <strong>03</strong>
                <span>Practica hablando</span>
              </div>
            </div>
          </div>

          <div class="hero-visual">
            <img
              :src="imagenes.portada"
              alt="Material visual para aprender español"
              @error="imagenNoDisponible"
            />

            <div class="mensaje-flotante">
              <span class="mensaje-icono">💬</span>
              <div>
                <strong>¡Hablar es aprender!</strong>
                <span>Practica un poco cada día</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div class="contenido">
      <section class="introduccion">
        <div>
          <span class="subtitulo">TU ESPACIO DE APRENDIZAJE</span>
          <h2>Comunícate con más confianza</h2>
        </div>

        <p>
          Encuentra diálogos, materiales descargables y actividades
          para mejorar tu comprensión y expresarte en español
          en situaciones reales.
        </p>
      </section>

      <section id="recursos" class="seccion">
        <div class="titulo-seccion">
          <div>
            <span class="subtitulo">APRENDE A TU RITMO</span>
            <h2>Recursos para aprender</h2>
          </div>

          <span class="contador">02 recursos online</span>
        </div>

        <div class="rejilla">
          <article class="tarjeta">
            <div class="imagen-tarjeta">
              <img
                :src="imagenes.dialogos"
                alt="Material de aprendizaje de español"
                @error="imagenNoDisponible"
              />
              <span class="tipo-recurso">ONLINE</span>
            </div>

            <div class="tarjeta-contenido">
              <span class="numero-tarjeta">RECURSO 01</span>
              <h3>Diálogos en español con audio</h3>

              <p>
                Practica la comprensión auditiva con diálogos
                y expresiones que puedes utilizar en la vida cotidiana.
              </p>

              <a
                href="https://superespanol.com/dialogos-con-audio-para-aprender-espanol/"
                target="_blank"
                rel="noopener noreferrer"
                class="enlace-tarjeta"
              >
                Escuchar y aprender <span>↗</span>
              </a>
            </div>
          </article>

          <article class="tarjeta">
            <div class="imagen-tarjeta">
              <img
                :src="imagenes.conversaciones"
                alt="Fichas para practicar conversaciones"
                @error="imagenNoDisponible"
              />
              <span class="tipo-recurso">ACTIVIDADES</span>
            </div>

            <div class="tarjeta-contenido">
              <span class="numero-tarjeta">RECURSO 02</span>
              <h3>Fichas de conversación</h3>

              <p>
                Descubre fichas y actividades para practicar preguntas,
                respuestas y conversaciones en diferentes contextos.
              </p>

              <a
                href="https://es.islcollective.com/espanol-ele-hojas-de-trabajo/buscar/conversacion"
                target="_blank"
                rel="noopener noreferrer"
                class="enlace-tarjeta"
              >
                Ver actividades <span>↗</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section class="seccion documentos">
        <div class="titulo-seccion">
          <div>
            <span class="subtitulo">MATERIAL DE ESTUDIO</span>
            <h2>Documentos para descargar</h2>
          </div>

          <span class="contador">PDF</span>
        </div>

        <div class="rejilla">
          <article class="pdf-card">
            <div class="pdf-icono">PDF</div>

            <div class="pdf-info">
              <h3>Spanish Table</h3>

              <p>
                Material de apoyo para estudiar español y repasar
                expresiones útiles.
              </p>

              <a
                :href="pdfs.tabla"
                target="_blank"
                rel="noopener noreferrer"
                class="boton boton-pdf"
              >
                Abrir documento ↗
              </a>
            </div>
          </article>

          <article class="pdf-card">
            <div class="pdf-icono">PDF</div>

            <div class="pdf-info">
              <h3>101 Conversations in Simple Spanish</h3>

              <p>
                Conversaciones sencillas para leer, comprender
                y practicar español a tu propio ritmo.
              </p>

              <a
                :href="pdfs.conversaciones"
                target="_blank"
                rel="noopener noreferrer"
                class="boton boton-pdf"
              >
                Abrir documento ↗
              </a>
            </div>
          </article>
        </div>
      </section>

      <section class="seccion">
        <div class="titulo-seccion">
          <div>
            <span class="subtitulo">ESPAÑOL EN CONTEXTO</span>
            <h2>Aprende con imágenes</h2>
          </div>
        </div>

        <div class="galeria">
          <figure class="galeria-item galeria-grande">
            <img
              :src="imagenes.espanol"
              alt="Material visual de español"
              @error="imagenNoDisponible"
            />
            <figcaption>
              <strong>Aprende vocabulario</strong>
              <span>Relaciona palabras con situaciones reales.</span>
            </figcaption>
          </figure>

          <figure class="galeria-item">
            <img
              :src="imagenes.experiencias"
              alt="Experiencias cotidianas"
              @error="imagenNoDisponible"
            />
            <figcaption>
              <strong>Cuenta tus experiencias</strong>
              <span>Practica cómo contar lo que te sucede.</span>
            </figcaption>
          </figure>

          <figure class="galeria-item">
            <img
              :src="imagenes.frases"
              alt="Frases para aprender español"
              @error="imagenNoDisponible"
            />
            <figcaption>
              <strong>Utiliza frases útiles</strong>
              <span>Mejora tu expresión oral cada día.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="ejercicios" class="seccion">
        <div class="titulo-seccion">
          <div>
            <span class="subtitulo">PONLO EN PRÁCTICA</span>
            <h2>Actividades para practicar</h2>
          </div>
        </div>

        <div class="rejilla">
          <article class="ejercicio-card">
            <img
              :src="imagenes.ejercicioConversaciones"
              alt="Ejercicio de conversación"
              @error="imagenNoDisponible"
            />

            <div class="ejercicio-contenido">
              <span class="numero-tarjeta">ACTIVIDAD 01</span>
              <h3>Practica un diálogo</h3>

              <p>
                Elige una situación cotidiana e inventa una
                conversación de dos o tres frases.
              </p>

              <div class="ejemplo">
                <strong>Ejemplo</strong>
                <p>— Hola, ¿qué tal estás?</p>
                <p>— Muy bien, gracias. ¿Y tú?</p>
              </div>
            </div>
          </article>

          <article class="ejercicio-card">
            <img
              :src="imagenes.ejercicioFrases"
              alt="Ejercicio de frases útiles"
              @error="imagenNoDisponible"
            />

            <div class="ejercicio-contenido">
              <span class="numero-tarjeta">ACTIVIDAD 02</span>
              <h3>Construye frases útiles</h3>

              <p>
                Practica expresiones para preguntar, responder
                y pedir ayuda en español.
              </p>

              <div class="ejemplo">
                <strong>Frases para empezar</strong>
                <p>«¿Puedes ayudarme, por favor?»</p>
                <p>«¿Puedes repetirlo más despacio?»</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="reto-final">
        <div class="reto-icono">✦</div>

        <div class="reto-texto">
          <span class="subtitulo">TU RETO DE HOY</span>
          <h2>Habla español durante cinco minutos</h2>

          <p>
            Cuenta cómo ha sido tu día, qué has hecho o qué planes tienes.
            No importa cometer errores: lo importante es practicar.
          </p>
        </div>

        <a href="#recursos" class="boton boton-claro">
          Empezar ahora ↑
        </a>
      </section>
    </div>

    <footer class="pie-pagina">
      <p>Aprende, practica y disfruta hablando español.</p>
      <RouterLink to="/alfabetizacion">
        Volver a Alfabetización ↑
      </RouterLink>
    </footer>
  </main>
</template>

<script setup>

import { computed } from 'vue'
import NavbarCursos from '../../../components/cursosymatricula/NavbarCursos.vue'

/*
 * IMPORTANTE:
 * Los archivos están en public, por lo que sus rutas comienzan
 * desde la raíz del sitio web, sin incluir la palabra "public".
 *
 * Las rutas se enlazan mediante :src para evitar que Vite
 * las trate como imports estáticos.
 */

const baseFotos = '/fotos/cursos/alfabetizacion/conversa'
const basePdf = '/pdf/conversa'

const imagenes = {
  portada: `${baseFotos}/1.jpg`,
  dialogos: `${baseFotos}/Espanol-2.jpg`,
  conversaciones: `${baseFotos}/Conversaciones.jpg`,
  espanol: `${baseFotos}/Espanol-2.jpg`,
  experiencias: `${baseFotos}/life-experiences.jpg`,
  frases: `${baseFotos}/Frases.jpg`,
  ejercicioConversaciones: `${baseFotos}/Conversaciones.jpg`,
  ejercicioFrases: `${baseFotos}/Frases.jpg`,
}

const pdfs = {
  tabla: `${basePdf}/spanish-table-estudiafeliz.pdf`,
  conversaciones: `${basePdf}/101-Conversations-in-Simple-Span.pdf`,
}

const estiloPortada = computed(() => ({
  backgroundImage: [
    'linear-gradient(120deg, rgba(13, 38, 58, 0.50), rgba(20, 100, 111, 0.70))',
    `url("${baseFotos}/cinco_11zon.jpg")`,
  ].join(', '),
}))

function imagenNoDisponible(event) {
  event.target.style.display = 'none'
}
</script>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(html) {
  scroll-behavior: smooth;
}

.nivel-page {
  min-height: 100vh;
  overflow: hidden;
  color: #20313d;
  background: #f5f8f7;
  font-family: Inter, "Segoe UI", Arial, sans-serif;
}

.portada {
  color: white;
  position: relative;
  isolation: isolate;
  background-color: #428c99;
  background-position: center;
  background-size: cover;
}


.portada::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.55);
  z-index: -1;
}

.portada-interior {
  width: min(1200px, 90%);
  margin: 0 auto;
  padding: 25px 0 70px;
}

.volver-alfabetizacion {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
  color: rgb(34, 2, 2);
  font-size: 0.94rem;
  font-weight: 650;
  text-decoration: none;
}

.volver-alfabetizacion:hover {
  opacity: 0.8;
}

.flecha {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 1px solid rgba(50, 5, 5, 0.35);
  border-radius: 50%;
  font-size: 1.2rem;
}

.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 55px;
}

.hero-texto {
  max-width: 650px;
  color: #022420;
}

.etiqueta,
.subtitulo {
  display: inline-block;
  color: #073d36;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.hero .etiqueta {
  margin-bottom: 16px;
  color: #2e0505;
}

.hero h1 {
  margin: 0 0 22px;
  font-size: clamp(2.7rem, 5.5vw, 5rem);
  font-weight: 850;
  line-height: 1.04;
  letter-spacing: 0.02em;
}

.hero-texto > p {
  max-width: 590px;
  color: rgba(74, 12, 12, 0.85);
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.8;
}

.hero-botones {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.boton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 46px;
  padding: 12px 19px;
  border: 1px solid transparent;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 750;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.boton:hover {
  transform: translateY(-2px);
}

.boton-claro {
  color: #0a3939;
  background: white;
  border-color:#073d36;
}

.boton-borde {
  color: rgb(41, 2, 2);
  border-color: rgba(40, 4, 38, 0.42);
  background: rgba(204, 177, 210, 0.07);
}

.hero-datos {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  margin-top: 40px;
}

.hero-datos div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.hero-datos strong {
  color: #0a3426;
  font-size: 1.5rem;
}

.hero-datos span {
  color: rgba(13, 0, 0, 0.78);
  font-size: 1.25rem;
}

.hero-visual {
  position: relative;
  min-width: 0;
}

.hero-visual > img {
  display: block;
  width: 100%;
  height: 370px;
  border: 1px solid rgba(26, 1, 1, 1);
  border-radius: 28px;
  object-fit: cover;
  box-shadow: 0 25px 60px rgb(0 0 0 / 20%);
}

.mensaje-flotante {
  position: absolute;
  right: -12px;
  bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  color: #20313d;
  background: white;
  border-radius: 16px;
  box-shadow: 0 12px 36px rgb(0 0 0 / 18%);
}

.mensaje-icono {
  display: grid;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  place-items: center;
  background: #e4f5ed;
  border-radius: 12px;
  font-size: 1.3rem;
}

.mensaje-flotante div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.mensaje-flotante strong {
  font-size: 0.88rem;
}

.mensaje-flotante div span {
  color: #6d7c83;
  font-size: 0.75rem;
}

.contenido {
  width: min(1200px, 90%);
  margin: 0 auto;
}

.introduccion {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  align-items: end;
  gap: 45px;
  padding: 65px 0 25px;
}

.introduccion h2,
.titulo-seccion h2,
.reto-final h2 {
  margin: 10px 0 0;
  color: #20313d;
  font-size: clamp(1.7rem, 3vw, 2.35rem);
  font-weight: 850;
  line-height: 1.2;
  letter-spacing: -0.04em;
}

.introduccion > p {
  margin: 0;
  color: #687981;
  font-size: 0.97rem;
  line-height: 1.8;
}

.seccion {
  padding: 40px 0;
  scroll-margin-top: 25px;
}

.titulo-seccion {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 25px;
}

.contador {
  padding: 9px 13px;
  color: #41746d;
  background: #e6f3ee;
  border-radius: 30px;
  font-size: 0.76rem;
  font-weight: 750;
  white-space: nowrap;
}

.rejilla {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.tarjeta,
.ejercicio-card {
  overflow: hidden;
  background: white;
  border: 1px solid #e6ece9;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgb(31 65 57 / 4%);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.tarjeta:hover,
.pdf-card:hover,
.ejercicio-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgb(31 65 57 / 9%);
}

.imagen-tarjeta {
  position: relative;
  height: 235px;
  overflow: hidden;
  background: #e6efeb;
}

.imagen-tarjeta img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.tarjeta:hover .imagen-tarjeta img {
  transform: scale(1.035);
}

.tipo-recurso {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 8px 12px;
  color: #225b50;
  background: white;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 850;
}

.tarjeta-contenido {
  padding: 25px;
}

.numero-tarjeta {
  color: #268579;
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.1em;
}

.tarjeta h3,
.pdf-card h3,
.ejercicio-card h3 {
  margin: 10px 0;
  color: #20313d;
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.4;
}

.tarjeta-contenido > p,
.pdf-info > p,
.ejercicio-contenido > p {
  color: #6a7a80;
  font-size: 0.92rem;
  line-height: 1.75;
}

.enlace-tarjeta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
  color: #207d70;
  font-weight: 800;
  font-size: 0.9rem;
  text-decoration: none;
}

.enlace-tarjeta:hover {
  color: #134e47;
}

.documentos {
  margin-top: 15px;
  padding: 35px;
  background: #edf4f0;
  border-radius: 24px;
}

.pdf-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 25px;
  background: white;
  border: 1px solid #e4ece7;
  border-radius: 16px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.pdf-icono {
  display: grid;
  width: 62px;
  height: 72px;
  flex-shrink: 0;
  place-items: center;
  color: white;
  background: #d75b54;
  border-radius: 10px 10px 14px 10px;
  font-size: 0.85rem;
  font-weight: 900;
}

.pdf-info {
  min-width: 0;
}

.pdf-info h3 {
  margin-top: 0;
}

.boton-pdf {
  margin-top: 8px;
  color: #216b5e;
  background: #e8f4ee;
}

.boton-pdf:hover {
  background: #d5ebe0;
}

.galeria {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  grid-template-rows: repeat(2, minmax(170px, 1fr));
  gap: 18px;
}

.galeria-item {
  position: relative;
  min-height: 190px;
  margin: 0;
  overflow: hidden;
  background: #dce9e3;
  border-radius: 18px;
}

.galeria-grande {
  grid-row: span 2;
  min-height: 400px;
}

.galeria-item img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  object-fit: cover;
}

.galeria-item::after {
  position: absolute;
  inset: 25% 0 0;
  background: linear-gradient(transparent, rgb(11 30 28 / 78%));
  content: "";
  pointer-events: none;
}

.galeria-item figcaption {
  position: absolute;
  z-index: 1;
  right: 22px;
  bottom: 20px;
  left: 22px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: white;
}

.galeria-item figcaption strong {
  font-size: 1.05rem;
}

.galeria-item figcaption span {
  color: rgb(255 255 255 / 85%);
  font-size: 0.82rem;
  line-height: 1.5;
}

.ejercicio-card > img {
  display: block;
  width: 100%;
  height: 210px;
  object-fit: cover;
  background: #e6efeb;
}

.ejercicio-contenido {
  padding: 25px;
}

.ejemplo {
  margin-top: 20px;
  padding: 17px;
  background: #f0f7f3;
  border-left: 3px solid #3a9a84;
  border-radius: 8px;
}

.ejemplo strong {
  display: block;
  margin-bottom: 10px;
  color: #277768;
  font-size: 0.82rem;
}

.ejemplo p {
  margin: 6px 0;
  color: #415b54;
  font-size: 0.87rem;
  line-height: 1.5;
}

.reto-final {
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 35px 0 65px;
  padding: 35px;
  color: white;
  background: linear-gradient(120deg, #1c635d, #267d70);
  border-radius: 24px;
}

.reto-icono {
  display: grid;
  width: 62px;
  height: 62px;
  flex-shrink: 0;
  place-items: center;
  color: #21675d;
  background: #c9f1df;
  border-radius: 18px;
  font-size: 1.8rem;
}

.reto-texto {
  flex: 1;
}

.reto-final .subtitulo {
  color: #b8ead8;
}

.reto-final h2 {
  color: white;
  font-size: clamp(1.4rem, 2.5vw, 2rem);
}

.reto-final p {
  max-width: 620px;
  color: rgb(255 255 255 / 85%);
  font-size: 0.91rem;
  line-height: 1.7;
}

.reto-final > .boton {
  flex-shrink: 0;
}

.pie-pagina {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 24px 5%;
  color: #718079;
  background: #eaf0ec;
  font-size: 0.84rem;
}

.pie-pagina p {
  margin: 0;
}

.pie-pagina a {
  color: #26786b;
  font-weight: 750;
  text-decoration: none;
}

@media (max-width: 850px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 35px;
  }

  .hero-visual {
    max-width: 600px;
  }

  .hero-visual > img {
    height: 330px;
  }

  .introduccion {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .documentos {
    padding: 25px;
  }

  .reto-final {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .reto-texto {
    min-width: 200px;
  }
}

@media (max-width: 600px) {
  .portada-interior {
    padding: 20px 0 45px;
  }

  .volver-alfabetizacion {
    margin-bottom: 30px;
  }

  .hero h1 {
    font-size: 2.65rem;
  }

  .hero-texto > p {
    font-size: 1rem;
  }

  .hero-datos {
    gap: 18px;
  }

  .hero-datos span {
    max-width: 100px;
    line-height: 1.4;
  }

  .hero-visual > img {
    height: 260px;
    border-radius: 20px;
  }

  .mensaje-flotante {
    right: 8px;
    bottom: 12px;
    padding: 12px;
  }

  .introduccion {
    padding-top: 45px;
  }

  .seccion {
    padding: 30px 0;
  }

  .titulo-seccion {
    align-items: flex-start;
    flex-direction: column;
  }

  .rejilla {
    grid-template-columns: 1fr;
  }

  .imagen-tarjeta {
    height: 210px;
  }

  .documentos {
    padding: 20px;
    border-radius: 18px;
  }

  .pdf-card {
    gap: 14px;
    padding: 18px;
  }

  .pdf-icono {
    width: 48px;
    height: 58px;
    font-size: 0.72rem;
  }

  .galeria {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .galeria-grande {
    grid-row: auto;
    min-height: 280px;
  }

  .galeria-item {
    min-height: 220px;
  }

  .reto-final {
    gap: 17px;
    margin: 25px 0 40px;
    padding: 24px;
  }

  .reto-icono {
    width: 48px;
    height: 48px;
  }

  .pie-pagina {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
