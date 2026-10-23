
<template>
  <div class="pagina-guias relative min-h-screen text-gray-800">

    <!-- FONDO GENERAL DESENFOCADO -->
    <div class="fondo-general" aria-hidden="true">
      <img
        src="/fotos/ateneu/guias/library2.jpg"
        alt=""
        class="fondo-general-imagen"
      />
      <div class="fondo-general-velo"></div>
    </div>

    <!-- CONTENIDO COMPLETO -->
    <div class="contenido-pagina relative z-10">

      <!-- NAVBAR -->
      <NavbarAteneu />

      <!-- CABECERA CON FOTOGRAFÍA -->
      <header class="cabecera-guias relative isolate overflow-hidden">
        <img
          src="/fotos/ateneu/guias/library1.jpg"
          alt=""
          class="cabecera-imagen"
        />

        <div class="cabecera-velo" aria-hidden="true"></div>

        <div class="relative mx-auto max-w-6xl px-6 py-14 md:py-20">
          <!-- PANEL BLANCO TRANSLÚCIDO -->
          <div class="cabecera-panel">
            <p class="cabecera-etiqueta">
              Ateneu Aula 502
            </p>

            <h1>
              Guías para el profesorado
            </h1>

            <p class="cabecera-descripcion">
              Un espacio para reunir instrucciones, documentos, materiales
              didácticos y recursos de apoyo para preparar y desarrollar
              las clases.
            </p>
          </div>
        </div>
      </header>

      <!-- BIBLIOTECA EDUCATIVA -->
      <main class="recursos-docentes">

        <div class="recursos-header">
          <span class="recursos-etiqueta">
            BIBLIOTECA EDUCATIVA
          </span>

          <h2>Libros y recursos para la alfabetización</h2>

          <p>
            Una selección de manuales, libros y guías didácticas para enseñar
            español, desarrollar la lectoescritura y promover la inclusión.
            Recursos útiles para docentes, educadores y voluntariado.
          </p>
        </div>

        <!-- CATEGORÍA 1 -->
        <section class="recursos-categorias">
          <h3>01. Alfabetización y lectoescritura</h3>

          <p class="categoria-descripcion">
            Materiales para aprender las letras, relacionar sonidos y grafías,
            leer palabras y avanzar hacia la escritura de frases.
          </p>

          <div class="recursos-grid">

            <a
              class="recurso-card"
              href="https://alfabetizacioninmigrantes.wordpress.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="libro-icono">📘</div>
              <span class="recurso-tipo">MANUAL DE ALFABETIZACIÓN</span>
              <h4>Integra 1 y 2</h4>
              <p>
                Materiales para trabajar el alfabeto, los sonidos, las grafías
                y las primeras palabras mediante actividades prácticas.
              </p>
              <span class="recurso-enlace">Consultar el material ↗</span>
            </a>

            <a
              class="recurso-card"
              href="https://espanolparainmigrantes.wordpress.com/2023/04/19/integra-manual-de-neolectura-y-neoescritura/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="libro-icono">📗</div>
              <span class="recurso-tipo">LECTURA Y ESCRITURA</span>
              <h4>Integra 3: Neolectura y neoescritura</h4>
              <p>
                Propuestas para reforzar la lectura, la comprensión y la
                expresión escrita de quienes ya conocen las letras.
              </p>
              <span class="recurso-enlace">Consultar el material ↗</span>
            </a>

            <a
              class="recurso-card"
              href="https://www.cear.es/espacio-conectar/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="libro-icono">📙</div>
              <span class="recurso-tipo">MATERIALES PARA DOCENTES</span>
              <h4>CEAR: Manuales de lectoescritura</h4>
              <p>
                Manuales de distintos niveles para acompañar el aprendizaje
                inicial de la lectura y la escritura, con orientaciones
                metodológicas para el profesorado.
              </p>
              <span class="recurso-enlace">Explorar los manuales ↗</span>
            </a>

            <a
              class="recurso-card"
              href="https://www.fundacionmontemadrid.es/noticias/manual-de-espanol-para-inmigrantes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="libro-icono">📕</div>
              <span class="recurso-tipo">ESPAÑOL Y ALFABETIZACIÓN</span>
              <h4>¿Cómo se escribe?</h4>
              <p>
                Manual que combina la práctica oral con el aprendizaje
                progresivo de las letras y la escritura.
              </p>
              <span class="recurso-enlace">Ver el manual ↗</span>
            </a>

          </div>
        </section>

        <!-- CATEGORÍA 2 -->
        <section class="recursos-categorias">
          <h3>02. Comunicación oral y prealfabetización</h3>

          <p class="categoria-descripcion">
            Recursos para desarrollar la comprensión y la expresión oral
            antes o durante el aprendizaje de la lectura y la escritura.
          </p>

          <div class="recursos-grid">

            <a
              class="recurso-card"
              href="http://www.madrid.org/bvirtual/BVCM001312.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="libro-icono">🗣️</div>
              <span class="recurso-tipo">GUÍA PEDAGÓGICA</span>
              <h4>Enseñanza oral del español</h4>
              <p>
                Orientaciones para enseñar español a personas no alfabetizadas
                mediante la interacción, las imágenes y situaciones cotidianas.
              </p>
              <span class="recurso-enlace">Abrir la guía ↗</span>
            </a>

            <a
              class="recurso-card"
              href="https://todoele.net/manuales-destinatarios/inmigrantes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="libro-icono">💬</div>
              <span class="recurso-tipo">COMPETENCIA ORAL</span>
              <h4>Manuales Conecta(R)</h4>
              <p>
                Recursos para trabajar la comunicación en niveles iniciales
                de español, con apoyo visual y vocabulario funcional.
              </p>
              <span class="recurso-enlace">Descubrir los recursos ↗</span>
            </a>

          </div>
        </section>

        <!-- CATEGORÍA 3 -->
        <section class="recursos-categorias">
          <h3>03. Inclusión, asilo y refugio</h3>

          <p class="categoria-descripcion">
            Materiales para fomentar la convivencia, comprender los derechos
            humanos y abordar la diversidad cultural desde el respeto.
          </p>

          <div class="recursos-grid">

            <a
              class="recurso-card"
              href="https://www.acnur.org/que-hacemos/construir-un-futuro-mejor/educacion/ensenar-sobre-las-personas-refugiadas"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="libro-icono">🌍</div>
              <span class="recurso-tipo">EDUCACIÓN E INCLUSIÓN</span>
              <h4>ACNUR: Enseñar sobre las personas refugiadas</h4>
              <p>
                Materiales educativos y orientaciones para promover la
                inclusión, la acogida y la comprensión de la realidad
                de las personas refugiadas.
              </p>
              <span class="recurso-enlace">Acceder a los recursos ↗</span>
            </a>

            <a
              class="recurso-card"
              href="https://www.cear.es/wp-content/uploads/2026/05/Guia-didactica-asilo-refugio-CEAR.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="libro-icono">🤝</div>
              <span class="recurso-tipo">GUÍA DIDÁCTICA</span>
              <h4>CEAR: Guía didáctica de asilo y refugio</h4>
              <p>
                Material para abordar el asilo, el refugio y las experiencias
                de las personas desplazadas desde una perspectiva social,
                educativa y humana.
              </p>
              <span class="recurso-enlace">Consultar la guía ↗</span>
            </a>

          </div>
        </section>

        <!-- CONSEJO PARA EL PROFESORADO -->
        <aside class="recursos-nota">
          <strong>Una recomendación para el profesorado</strong>
          <p>
            Antes de elegir un material, identifica el nivel de lectoescritura
            del alumnado, sus conocimientos previos de español y sus objetivos
            comunicativos. Adapta las actividades al ritmo de cada persona y
            comprueba las condiciones de descarga y uso de cada recurso.
          </p>
        </aside>

      </main>

      <!-- NAVEGACIÓN -->
      <nav class="navegacion-guias" aria-label="Navegación del profesorado">

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

      <div class="pb-10"></div>

    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import NavbarAteneu from '../../../components/ateneu/NavbarAteneu.vue'
</script>

<style>
/* =========================================
   FONDO GENERAL DE LA PÁGINA
   ========================================= */

.pagina-guias {
  isolation: isolate;
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
  opacity: 3rem;
}

.fondo-general-velo {
  position: absolute;
  inset: 0;
  background: rgba(250, 249, 246, 0.76);
}

/* =========================================
   CABECERA CON IMAGEN
   ========================================= */

.cabecera-guias {
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
   BIBLIOTECA EDUCATIVA
   ========================================= */

.recursos-docentes {
  max-width: 1120px;
  margin: 0 auto;
  padding: 48px 24px;
  color: #293b38;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.65;
}

.recursos-header {
  max-width: 780px;
  margin-bottom: 46px;
}

.recursos-etiqueta {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 30px;
  background: #eaf3ef;
  color: #245b52;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.2px;
}

.recursos-header h2 {
  margin: 16px 0;
  color: #245b52;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 800;
  line-height: 1.2;
}

.recursos-header p,
.categoria-descripcion {
  color: #526660;
  font-size: 16px;
}

.recursos-categorias {
  margin-bottom: 48px;
}

.recursos-categorias h3 {
  margin: 0 0 8px;
  color: #245b52;
  font-size: 23px;
  font-weight: 750;
}

.categoria-descripcion {
  max-width: 760px;
  margin: 0 0 22px;
}

.recursos-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.recurso-card {
  display: flex;
  min-width: 0;
  min-height: 270px;
  flex-direction: column;
  align-items: flex-start;
  padding: 26px;
  border: 1px solid rgba(223, 232, 227, 0.95);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.94);
  color: inherit;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(29, 63, 53, 0.06);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.recurso-card:hover {
  transform: translateY(-4px);
  border-color: #8db7a8;
  box-shadow: 0 12px 28px rgba(29, 63, 53, 0.13);
}

.recurso-card:focus-visible {
  outline: 3px solid #408c79;
  outline-offset: 4px;
}

.libro-icono {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  margin-bottom: 16px;
  border-radius: 12px;
  background: #eaf3ef;
  font-size: 25px;
}

.recurso-tipo {
  color: #245b52;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.8px;
}

.recurso-card h4 {
  margin: 9px 0;
  color: #263d37;
  font-size: 20px;
  font-weight: 750;
  line-height: 1.35;
}

.recurso-card p {
  margin: 0 0 20px;
  color: #596b65;
  font-size: 14px;
}

.recurso-enlace {
  margin-top: auto;
  color: #245b52;
  font-size: 14px;
  font-weight: 700;
}

.recursos-nota {
  padding: 24px 26px;
  border-left: 4px solid #245b52;
  border-radius: 8px;
  background: rgba(243, 247, 245, 0.95);
}

.recursos-nota strong {
  color: #245b52;
  font-size: 17px;
}

.recursos-nota p {
  margin: 8px 0 0;
  color: #293b38;
  font-size: 14px;
}

/* =========================================
   BOTONES DE NAVEGACIÓN
   ========================================= */

.navegacion-guias {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  padding: 8px 24px 36px;
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

/* =========================================
   DISEÑO RESPONSIVE
   ========================================= */

@media (max-width: 650px) {
  .cabecera-panel {
    padding: 24px;
    border-radius: 16px;
  }

  .cabecera-descripcion {
    font-size: 16px;
  }

  .recursos-docentes {
    padding: 32px 16px;
  }

  .recursos-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .recurso-card {
    min-height: auto;
    padding: 22px;
  }

  .recursos-categorias h3 {
    font-size: 21px;
  }

  .navegacion-guias {
    flex-direction: column;
    align-items: stretch;
    padding-right: 16px;
    padding-left: 16px;
  }

  .boton-navegacion {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .recurso-card,
  .boton-navegacion {
    transition: none;
  }

  .recurso-card:hover,
  .boton-navegacion:hover {
    transform: none;
  }
}
</style>
