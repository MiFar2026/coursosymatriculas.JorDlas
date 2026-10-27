
<template>
  <div class="pagina-biblioteca relative min-h-screen text-gray-800">

    <!-- FONDO GENERAL DESENFOCADO -->
    <div class="fondo-general" aria-hidden="true">
      <img
        src="/fotos/ateneu/guias/library2.jpg"
        alt=""
        class="fondo-general-imagen"
      />
      <div class="fondo-general-velo"></div>
    </div>

    <div class="contenido-pagina relative z-10">

      <!-- NAVBAR -->
      <NavbarJoanmiro />

      <!-- CABECERA BIBLIOTECA JOAN MIRÓ -->
      <header class="cabecera-biblioteca relative isolate overflow-hidden">

        <img
          src="/fotos/ateneu/guias/library1.jpg"
          alt=""
          class="cabecera-imagen"
        />

        <div class="cabecera-velo" aria-hidden="true"></div>

        <div class="relative mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div class="cabecera-panel">

            <p class="cabecera-etiqueta">
              Biblioteca Joan Miró
            </p>

            <h1>
              Biblioteca Joan Miró
            </h1>

            <p class="cabecera-descripcion">
              Un espacio para descubrir libros, fomentar la lectura,
              compartir conocimientos y acercar la cultura a toda la
              comunidad. Explora nuestros recursos y actividades
              para disfrutar de la lectura y el aprendizaje.
            </p>

          </div>
        </div>
      </header>

      <!-- CONTENIDO PRINCIPAL -->
      <main class="biblioteca-contenido">

        <!-- PRESENTACIÓN -->
        <section class="bloque-presentacion">
          <span class="seccion-etiqueta">NUESTRO ESPACIO</span>

          <h2>
            Un lugar para leer, aprender y compartir
          </h2>

          <p>
            La Biblioteca Joan Miró es un espacio de encuentro en el que
            los libros, la lectura y el aprendizaje nos ayudan a descubrir
            nuevas ideas, desarrollar la imaginación y compartir experiencias.
            Te invitamos a explorar sus recursos y participar en la vida
            de la biblioteca.
          </p>
        </section>

        <!-- SECCIONES DE LA BIBLIOTECA -->
        <section class="bloque-biblioteca">

          <div class="titulo-seccion">
            <span class="seccion-etiqueta">EXPLORA LA BIBLIOTECA</span>
            <h2>¿Qué puedes encontrar?</h2>
            <p>
              Descubre diferentes formas de disfrutar de la lectura
              y aprovechar los recursos de la biblioteca.
            </p>
          </div>

          <div class="biblioteca-grid">

            <!-- LECTURA -->
            <article class="biblioteca-card">
              <div class="biblioteca-icono">📚</div>

              <span class="biblioteca-tipo">LECTURA</span>

              <h3>Libros y literatura</h3>

              <p>
                Un espacio para descubrir historias, conocer autores,
                explorar diferentes géneros literarios y encontrar
                nuevas lecturas.
              </p>

              <span class="biblioteca-detalle">
                Descubre nuevas historias
              </span>
            </article>

            <!-- INFANCIA -->
            <article class="biblioteca-card">
              <div class="biblioteca-icono">🧸</div>

              <span class="biblioteca-tipo">INFANCIA Y JUVENTUD</span>

              <h3>Lectura para todas las edades</h3>

              <p>
                Propuestas para despertar la curiosidad, fomentar el hábito
                lector y acompañar a niños, niñas y jóvenes en su aprendizaje.
              </p>

              <span class="biblioteca-detalle">
                Aprender leyendo
              </span>
            </article>

            <!-- APRENDIZAJE -->
            <article class="biblioteca-card">
              <div class="biblioteca-icono">✏️</div>

              <span class="biblioteca-tipo">APRENDIZAJE</span>

              <h3>Estudio y conocimiento</h3>

              <p>
                Recursos para estudiar, investigar, consultar información
                y desarrollar nuevas habilidades a través de la lectura.
              </p>

              <span class="biblioteca-detalle">
                Aprende algo nuevo
              </span>
            </article>

            <!-- ACTIVIDADES -->
            <article class="biblioteca-card">
              <div class="biblioteca-icono">🤝</div>

              <span class="biblioteca-tipo">COMUNIDAD</span>

              <h3>Actividades y encuentros</h3>

              <p>
                Un lugar para compartir experiencias, participar en
                propuestas culturales y disfrutar de actividades
                relacionadas con los libros y la lectura.
              </p>

              <span class="biblioteca-detalle">
                Compartir la cultura
              </span>
            </article>

          </div>
        </section>

        <!-- IMPORTANCIA DE LA LECTURA -->
        <section class="mensaje-biblioteca">

          <div class="mensaje-icono">🌿</div>

          <div>
            <h2>La lectura nos abre nuevas puertas</h2>

            <p>
              Cada libro nos ofrece la oportunidad de aprender, imaginar
              y conocer otras realidades. La biblioteca es un espacio
              abierto al descubrimiento, la convivencia y el crecimiento
              personal.
            </p>
          </div>

        </section>

        <!-- NAVEGACIÓN -->
        <nav
          class="navegacion-biblioteca"
          aria-label="Navegación de la biblioteca"
        >

          <RouterLink
            to="/ateneu/tutores"
            class="boton-navegacion boton-secundario"
          >
            <span>←</span>
            Volver al espacio de tutores
          </RouterLink>

          <RouterLink
            to="/ateneu/tutores/acceso"
            class="boton-navegacion boton-principal"
          >
            Entrar en mi perfil
            <span>→</span>
          </RouterLink>

        </nav>

        <div class="espacio-final"></div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import NavbarJoanmiro from '../../../components/joanmiro/NavbarJoanmiro.vue';
</script>

<style>
/* =========================================
   FONDO GENERAL
   ========================================= */

.pagina-biblioteca {
  isolation: isolate;
  min-height: 100vh;
  background: #f5f5f0;
}

.fondo-general {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.fondo-general-imagen {
  position: absolute;
  inset: -20px;
  width: calc(100% + 40px);
  height: calc(100% + 40px);
  object-fit: cover;
  object-position: center;
  filter: blur(7px);
  opacity: 2rem;
}

.fondo-general-velo {
  position: absolute;
  inset: 0;
  background: rgba(250, 249, 246, 0.78);
}

/* =========================================
   CABECERA
   ========================================= */

.cabecera-biblioteca {
  border-bottom: 1px solid rgba(217, 119, 6, 0.3);
  background: #e9e2d5;
}

.cabecera-imagen {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 45%;
}

.cabecera-velo {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    to bottom,
    rgba(20, 20, 20, 0.16),
    rgba(20, 20, 20, 0.08) 45%,
    rgba(20, 20, 20, 0.32)
  );
}

.cabecera-panel {
  max-width: 850px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.14);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.cabecera-etiqueta {
  margin: 0 0 12px;
  color: #92400e;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.cabecera-panel h1 {
  margin: 0 0 18px;
  color: #1f2937;
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 800;
  line-height: 1.12;
}

.cabecera-descripcion {
  max-width: 700px;
  margin: 0;
  color: #374151;
  font-size: 18px;
  line-height: 1.8;
}

/* =========================================
   CONTENIDO PRINCIPAL
   ========================================= */

.biblioteca-contenido {
  max-width: 1120px;
  margin: 0 auto;
  padding: 48px 24px;
}

.bloque-presentacion {
  max-width: 820px;
  margin-bottom: 58px;
}

.seccion-etiqueta {
  display: inline-block;
  margin-bottom: 12px;
  color: #245b52;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.bloque-presentacion h2,
.titulo-seccion h2 {
  margin: 0 0 18px;
  color: #245b52;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  line-height: 1.2;
}

.bloque-presentacion p,
.titulo-seccion p {
  color: #526660;
  font-size: 16px;
  line-height: 1.8;
}

.titulo-seccion {
  margin-bottom: 26px;
}

.titulo-seccion p {
  max-width: 720px;
  margin: 0;
}

/* =========================================
   TARJETAS
   ========================================= */

.biblioteca-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.biblioteca-card {
  display: flex;
  min-width: 0;
  min-height: 260px;
  flex-direction: column;
  align-items: flex-start;
  padding: 28px;
  border: 1px solid rgba(223, 232, 227, 0.95);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 4px 18px rgba(29, 63, 53, 0.06);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.biblioteca-card:hover {
  transform: translateY(-4px);
  border-color: #8db7a8;
  box-shadow: 0 12px 28px rgba(29, 63, 53, 0.12);
}

.biblioteca-icono {
  display: grid;
  width: 54px;
  height: 54px;
  place-items: center;
  margin-bottom: 18px;
  border-radius: 15px;
  background: #eaf3ef;
  font-size: 27px;
}

.biblioteca-tipo {
  color: #245b52;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
}

.biblioteca-card h3 {
  margin: 10px 0;
  color: #263d37;
  font-size: 21px;
  font-weight: 750;
  line-height: 1.4;
}

.biblioteca-card p {
  margin: 0 0 22px;
  color: #596b65;
  font-size: 14px;
  line-height: 1.8;
}

.biblioteca-detalle {
  margin-top: auto;
  color: #245b52;
  font-size: 14px;
  font-weight: 750;
}

/* =========================================
   MENSAJE DESTACADO
   ========================================= */

.mensaje-biblioteca {
  display: flex;
  align-items: flex-start;
  gap: 22px;
  margin-top: 58px;
  padding: 30px;
  border: 1px solid rgba(217, 232, 223, 0.9);
  border-radius: 18px;
  background: rgba(243, 247, 245, 0.95);
}

.mensaje-icono {
  display: grid;
  width: 54px;
  height: 54px;
  flex: 0 0 54px;
  place-items: center;
  border-radius: 15px;
  background: #dcece4;
  font-size: 27px;
}

.mensaje-biblioteca h2 {
  margin: 0 0 10px;
  color: #245b52;
  font-size: 23px;
  font-weight: 800;
}

.mensaje-biblioteca p {
  margin: 0;
  color: #526660;
  font-size: 15px;
  line-height: 1.8;
}

/* =========================================
   NAVEGACIÓN
   ========================================= */

.navegacion-biblioteca {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  padding-top: 38px;
}

.boton-navegacion {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.boton-navegacion:hover {
  transform: translateY(-2px);
}

.boton-secundario {
  border: 1px solid #d1d5db;
  background: rgba(255, 255, 255, 0.95);
  color: #374151;
}

.boton-secundario:hover {
  background: #f3f4f6;
}

.boton-principal {
  background: #b45309;
  color: #ffffff;
}

.boton-principal:hover {
  background: #92400e;
}

.boton-navegacion:focus-visible {
  outline: 3px solid #d97706;
  outline-offset: 3px;
}

.espacio-final {
  height: 20px;
}

/* =========================================
   MÓVILES
   ========================================= */

@media (max-width: 650px) {
  .cabecera-panel {
    padding: 24px;
    border-radius: 16px;
  }

  .cabecera-descripcion {
    font-size: 16px;
  }

  .biblioteca-contenido {
    padding: 34px 16px;
  }

  .biblioteca-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .biblioteca-card {
    min-height: auto;
    padding: 23px;
  }

  .mensaje-biblioteca {
    flex-direction: column;
    padding: 23px;
  }

  .navegacion-biblioteca {
    flex-direction: column;
    align-items: stretch;
  }

  .boton-navegacion {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .biblioteca-card,
  .boton-navegacion {
    transition: none;
  }

  .biblioteca-card:hover,
  .boton-navegacion:hover {
    transform: none;
  }
}
</style>
