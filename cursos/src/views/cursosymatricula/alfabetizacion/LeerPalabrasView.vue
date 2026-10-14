
<template>
  <div class="leer-page">
    <NavbarCursos />

    <header class="hero">
      <div class="hero-content">
        <RouterLink to="/alfabetizacion" class="back-link">
          <span>←</span> Volver a Alfabetización
        </RouterLink>

        <span class="eyebrow">APRENDER A LEER, PASO A PASO</span>
        <h1>Leer palabras,<br /><span>descubrir mundos</span></h1>

        <p class="hero-description">
          Empezamos por las letras, descubrimos palabras, aprendemos
          a pronunciar sílabas y avanzamos hacia la lectura y la comprensión.
          Cada pequeño paso cuenta.
        </p>

        <button class="primary-button" @click="goToStage('letras')">
          Empezar a aprender <span>↓</span>
        </button>

        <div class="hero-stats">
          <div><strong>6</strong><span>etapas</span></div>
          <div><strong>3</strong><span>niveles de lectura</span></div>
          <div><strong>2</strong><span>ejercicios de comprensión</span></div>
        </div>
      </div>

      <div class="hero-decoration" aria-hidden="true">
        <span class="floating-letter letter-a">A</span>
        <span class="floating-letter letter-m">M</span>
        <span class="floating-letter letter-l">L</span>
        <span class="floating-star">✦</span>
        <div class="book-illustration">
          <span class="book-symbol">Aa</span>
          <span class="book-caption">Leer es crecer</span>
        </div>
      </div>
    </header>

    <main class="main-content">
      <section class="welcome-section">
        <div class="welcome-icon">📖</div>
        <div>
          <span class="section-kicker">TU CAMINO LECTOR</span>
          <h2>Una palabra cada vez</h2>
          <p>
            Primero reconocemos las palabras, después aprendemos cómo se
            forman y suenan, y finalmente practicamos la lectura para
            comprender lo que leemos.
          </p>
        </div>
      </section>

      <section class="progress-panel">
        <div class="progress-top">
          <div>
            <span class="section-kicker">TU RECORRIDO</span>
            <h2>Avanza a tu ritmo</h2>
          </div>
          <span class="progress-count">{{ completedStages.length }} / 6</span>
        </div>

        <div class="progress-track">
          <div
            class="progress-fill"
            :style="{ width: `${completedStages.length / 6 * 100}%` }"
          ></div>
        </div>

        <p class="progress-help">
          Marca las etapas cuando termines de practicar. El progreso se
          conserva mientras esta página permanezca abierta.
        </p>

        <div class="stage-dots">
          <button
            v-for="stage in stages"
            :key="stage.id"
            class="stage-dot"
            :class="{ 'stage-dot-done': completedStages.includes(stage.id) }"
            @click="goToStage(stage.id)"
          >
            <span>{{ completedStages.includes(stage.id) ? '✓' : stage.number }}</span>
            <small>{{ stage.shortTitle }}</small>
          </button>
        </div>
      </section>

      <!-- 1. PALABRAS POR LETRA -->
      <section id="letras" class="learning-section">
        <div class="section-heading">
          <span class="section-kicker">01 · PRIMEROS PASOS</span>
          <h2>Palabras por letra</h2>
          <p>
            Comenzamos reconociendo palabras que empiezan por distintas
            letras. Observa los materiales, lee los ejemplos y pronuncia
            las palabras en voz alta.
          </p>
        </div>

        <div class="notice-card">
          <span class="notice-icon">💡</span>
          <div>
            <strong>Un listado orientativo que iremos completando</strong>
            <p>
              Esta selección es un punto de partida. Iremos ampliando el
              listado progresivamente con nuevas palabras, ejemplos y
              actividades para seguir aprendiendo.
            </p>
          </div>
        </div>

        <div class="image-grid">
          <article v-for="item in letterImages" :key="item.src" class="image-card">
            <button class="image-button" @click="openImage(item)" :aria-label="`Ampliar ${item.title}`">
              <img :src="item.src" :alt="item.alt" loading="lazy" />
              <span class="image-zoom">↗ Ampliar</span>
            </button>
            <div class="image-caption">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </article>
        </div>

        <StageComplete id="letras" :completed="completedStages.includes('letras')" @toggle="toggleCompleted('letras')" />
      </section>

      <!-- 2. ANTÓNIMOS -->
      <section id="antonimos" class="learning-section tinted-section">
        <div class="section-heading">
          <span class="section-kicker">02 · DESCUBRIMOS SIGNIFICADOS</span>
          <h2>Antónimos: palabras opuestas</h2>
          <p>
            Algunas palabras expresan ideas contrarias. Aprenderlas nos
            ayuda a ampliar el vocabulario y comprender mejor el lenguaje.
          </p>
        </div>

        <div class="concept-banner">
          <span class="concept-symbol">↔</span>
          <div>
            <h3>¿Qué es un antónimo?</h3>
            <p>
              Es una palabra cuyo significado es contrario al de otra.
              Por ejemplo: <strong>grande y pequeño</strong>.
            </p>
          </div>
        </div>

        <div class="opposites-grid">
          <div v-for="pair in oppositePairs" :key="pair.left" class="opposite-card">
            <span>{{ pair.left }}</span>
            <b>↔</b>
            <span>{{ pair.right }}</span>
          </div>
        </div>

        <div class="image-grid">
          <article v-for="item in antonymImages" :key="item.src" class="image-card">
            <button class="image-button" @click="openImage(item)" :aria-label="`Ampliar ${item.title}`">
              <img :src="item.src" :alt="item.alt" loading="lazy" />
              <span class="image-zoom">↗ Ampliar</span>
            </button>
            <div class="image-caption">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </article>
        </div>

        <StageComplete id="antonimos" :completed="completedStages.includes('antonimos')" @toggle="toggleCompleted('antonimos')" />
      </section>

      <!-- 3. VOCABULARIO -->
      <section id="vocabulario" class="learning-section">
        <div class="section-heading">
          <span class="section-kicker">03 · AMPLIAMOS EL VOCABULARIO</span>
          <h2>Descubrimos nuevas palabras</h2>
          <p>
            Leer palabras diferentes nos permite reconocer objetos,
            ideas y situaciones de la vida cotidiana.
          </p>
        </div>

        <div class="image-grid">
          <article v-for="item in vocabularyImages" :key="item.src" class="image-card">
            <button class="image-button" @click="openImage(item)" :aria-label="`Ampliar ${item.title}`">
              <img :src="item.src" :alt="item.alt" loading="lazy" />
              <span class="image-zoom">↗ Ampliar</span>
            </button>
            <div class="image-caption">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </article>
        </div>

        <StageComplete id="vocabulario" :completed="completedStages.includes('vocabulario')" @toggle="toggleCompleted('vocabulario')" />
      </section>

      <!-- 4. SÍLABAS Y PRONUNCIACIÓN -->
      <section id="silabas" class="learning-section tinted-section">
        <div class="section-heading">
          <span class="section-kicker">04 · ESCUCHAMOS Y PRONUNCIAMOS</span>
          <h2>Las palabras tienen ritmo</h2>
          <p>
            Las sílabas nos ayudan a dividir las palabras en partes más
            pequeñas. Practicaremos su pronunciación, despacio y con claridad.
          </p>
        </div>

        <div class="pronunciation-tip">
          <span class="tip-icon">🗣️</span>
          <div>
            <h3>Cómo practicar</h3>
            <p>
              Mira la palabra, separa sus sílabas, pronuncia cada parte
              y después intenta decir la palabra completa. Puedes repetir
              el ejercicio tantas veces como necesites.
            </p>
          </div>
        </div>

        <div class="syllable-demo">
          <span class="demo-label">PRUÉBALO CON ESTA PALABRA</span>
          <div class="syllable-word">
            <span>CA</span><i>·</i><span>SA</span>
          </div>
          <p>Dos sílabas que, juntas, forman una palabra.</p>
        </div>

        <div class="image-grid">
          <article v-for="item in syllableImages" :key="item.src" class="image-card">
            <button class="image-button" @click="openImage(item)" :aria-label="`Ampliar ${item.title}`">
              <img :src="item.src" :alt="item.alt" loading="lazy" />
              <span class="image-zoom">↗ Ampliar</span>
            </button>
            <div class="image-caption">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </article>
        </div>

        <StageComplete id="silabas" :completed="completedStages.includes('silabas')" @toggle="toggleCompleted('silabas')" />
      </section>

      <!-- 5. TRES NIVELES DE LECTURA -->
      <section id="lectura" class="learning-section">
        <div class="section-heading">
          <span class="section-kicker">05 · PRACTICAMOS LA LECTURA</span>
          <h2>Tres niveles para avanzar</h2>
          <p>
            Empieza por el nivel que te resulte cómodo. Lo importante es
            leer con atención, reconocer las palabras y ganar confianza.
          </p>
        </div>

        <div class="level-grid">
          <article v-for="level in readingLevels" :key="level.title" class="level-card" :class="level.className">
            <div class="level-number">{{ level.number }}</div>
            <span class="level-tag">{{ level.tag }}</span>
            <h3>{{ level.title }}</h3>
            <p>{{ level.description }}</p>

            <button class="level-image-button" @click="openImage(level.image)" :aria-label="`Ampliar material de ${level.title}`">
              <img :src="level.image.src" :alt="level.image.alt" loading="lazy" />
              <span>Ver material ↗</span>
            </button>

            <ul>
              <li v-for="goal in level.goals" :key="goal">{{ goal }}</li>
            </ul>

            <button class="level-action" @click="goToStage('lectura')">
              Practicar este nivel <span>→</span>
            </button>
          </article>
        </div>

        <div class="image-grid reading-extras">
          <article v-for="item in extraReadingImages" :key="item.src" class="image-card">
            <button class="image-button" @click="openImage(item)" :aria-label="`Ampliar ${item.title}`">
              <img :src="item.src" :alt="item.alt" loading="lazy" />
              <span class="image-zoom">↗ Ampliar</span>
            </button>
            <div class="image-caption">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </article>
        </div>

        <StageComplete id="lectura" :completed="completedStages.includes('lectura')" @toggle="toggleCompleted('lectura')" />
      </section>

      <!-- 6. COMPRENSIÓN -->
      <section id="comprension" class="learning-section tinted-section">
        <div class="section-heading">
          <span class="section-kicker">06 · COMPRENDEMOS LO QUE LEEMOS</span>
          <h2>Leer también es entender</h2>
          <p>
            Después de practicar la lectura, trabajaremos la comprensión
            para reconocer información, interpretar frases y reflexionar
            sobre lo que hemos leído.
          </p>
        </div>

        <div class="comprehension-intro">
          <span class="comprehension-icon">🧠</span>
          <div>
            <h3>Dos ejercicios para pensar</h3>
            <p>
              Observa cada ficha y realiza las actividades con calma.
              Puedes volver a leer siempre que lo necesites.
            </p>
          </div>
        </div>

        <div class="image-grid comprehension-grid">
          <article v-for="item in comprehensionImages" :key="item.src" class="image-card comprehension-card">
            <div class="exercise-number">{{ item.number }}</div>
            <button class="image-button" @click="openImage(item)" :aria-label="`Ampliar ${item.title}`">
              <img :src="item.src" :alt="item.alt" loading="lazy" />
              <span class="image-zoom">↗ Ampliar</span>
            </button>
            <div class="image-caption">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </article>
        </div>

        <StageComplete id="comprension" :completed="completedStages.includes('comprension')" @toggle="toggleCompleted('comprension')" />
      </section>

      <!-- CIERRE -->
      <section class="closing-banner">
        <span class="closing-sparkle">✦</span>
        <span class="section-kicker">CADA PASO ES UN LOGRO</span>
        <h2>Hoy lees una palabra.<br />Mañana, una historia.</h2>
        <p>
          Aprende sin prisas, practica con confianza y celebra cada avance.
          La lectura se construye poco a poco.
        </p>
        <RouterLink to="/alfabetizacion" class="closing-button">
          Volver a Alfabetización <span>→</span>
        </RouterLink>
      </section>
    </main>

    <!-- VISOR DE IMÁGENES -->
    <div v-if="selectedImage" class="image-modal" @click.self="selectedImage = null" @keydown.esc="selectedImage = null">
      <div class="modal-panel" role="dialog" aria-modal="true" :aria-label="selectedImage.title">
        <button class="modal-close" @click="selectedImage = null" aria-label="Cerrar">×</button>
        <img :src="selectedImage.src" :alt="selectedImage.alt" />
        <div class="modal-caption">
          <h3>{{ selectedImage.title }}</h3>
          <p>{{ selectedImage.description }}</p>
        </div>
      </div>
    </div>

    <footer class="page-footer">
      <p>Aprender a leer es abrir una puerta a nuevas posibilidades.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'
import NavbarCursos from '../../../components/cursosymatricula/NavbarCursos.vue'

const base = '/fotos/cursos/alfabetizacion/leer/'

const image = (filename, title, description, alt = title) => ({
  src: base + filename,
  title,
  description,
  alt
})

const letterImages = [
  image('palabras por letra (1).png', 'Palabras por letra', 'Primeros ejemplos para reconocer palabras.'),
  image('palabras por letra (1).jpg', 'Leemos por letras', 'Observa las palabras y practica su lectura.'),
  image('palabras por letra (2).jpg', 'Seguimos aprendiendo', 'Más ejemplos para practicar.'),
  image('palabras por letra (3).jpg', 'Nuevas palabras', 'Amplía tu vocabulario letra a letra.'),
  image('palabras por letra (4).jpg', 'Leemos y reconocemos', 'Relaciona las letras con las palabras.'),
  image('palabras por letra (5).jpg', 'Practicamos juntos', 'Continúa con nuevos ejemplos.'),
  image('palabras por letra (6).png', 'Más palabras por letra', 'Material complementario para seguir practicando.')
]

const antonymImages = [
  image('antonimos (1).png', 'Antónimos', 'Descubre palabras con significados opuestos.'),
  ...Array.from({ length: 11 }, (_, i) =>
    image(`antonimos (${i + 1}).jpg`, `Antónimos: ficha ${i + 1}`, 'Practica las palabras opuestas.')
  )
]

const vocabularyImages = [
  image('palabras (2).png', 'Palabras y vocabulario', 'Reconoce palabras y enriquece tu vocabulario.'),
  image('palabras (17).png', 'Más palabras', 'Continúa practicando con nuevos ejemplos.')
]

const syllableImages = Array.from({ length: 7 }, (_, i) =>
  image(`silabas (${i + 1}).jpg`, `Sílabas: ficha ${i + 1}`, 'Lee, separa y pronuncia las sílabas.')
)

const readingLevels = [
  {
    number: '01',
    title: 'Lectura nivel 1',
    tag: 'EMPEZAMOS',
    className: 'level-one',
    description: 'Un primer paso para ganar seguridad y reconocer palabras.',
    image: image('leer1.png', 'Lectura nivel 1', 'Material de práctica del primer nivel.'),
    goals: ['Leer despacio', 'Reconocer palabras', 'Repetir cuando haga falta']
  },
  {
    number: '02',
    title: 'Lectura nivel 2',
    tag: 'AVANZAMOS',
    className: 'level-two',
    description: 'Seguimos practicando para leer con mayor soltura.',
    image: image('leer2 (1).png', 'Lectura nivel 2', 'Material de práctica del segundo nivel.'),
    goals: ['Leer con atención', 'Unir palabras', 'Mejorar la fluidez']
  },
  {
    number: '03',
    title: 'Lectura nivel 3',
    tag: 'CONFIANZA',
    className: 'level-three',
    description: 'Consolidamos la práctica y nos preparamos para comprender.',
    image: image('leer3 (1).png', 'Lectura nivel 3', 'Material de práctica del tercer nivel.'),
    goals: ['Leer con confianza', 'Prestar atención al texto', 'Prepararse para comprender']
  }
]

const extraReadingImages = [
  image('Leer1 (1).jpg', 'Lectura inicial: ficha 1', 'Material adicional de lectura inicial.'),
  image('Leer1 (2).jpg', 'Lectura inicial: ficha 2', 'Más práctica para el nivel inicial.'),
  image('leer1 (2).png', 'Lectura inicial: ficha complementaria', 'Continúa reforzando la lectura.'),
  ...Array.from({ length: 9 }, (_, i) =>
    image(`leer2 (${i + 1}).jpg`, `Lectura nivel 2: ficha ${i + 1}`, 'Material complementario para practicar la lectura.')
  ),
  image('leer3 (2).png', 'Lectura nivel 3: ficha 1', 'Más práctica para avanzar.'),
  image('leer3 (3).png', 'Lectura nivel 3: ficha 2', 'Consolida tus habilidades lectoras.')
]

const comprehensionImages = [
  image('comprension (1).png', 'Comprensión lectora: ejercicio 1', 'Primer ejercicio para trabajar la comprensión.'),
  image('comprension (2).png', 'Comprensión lectora: ejercicio 2', 'Segundo ejercicio para practicar la comprensión.')
].map((item, index) => ({
  ...item,
  number: `0${index + 1}`
}))

const oppositePairs = [
  { left: 'Grande', right: 'Pequeño' },
  { left: 'Alto', right: 'Bajo' },
  { left: 'Día', right: 'Noche' },
  { left: 'Frío', right: 'Caliente' },
  { left: 'Rápido', right: 'Lento' },
  { left: 'Abierto', right: 'Cerrado' }
]

const stages = [
  { id: 'letras', number: '1', title: 'Palabras por letra', shortTitle: 'Letras' },
  { id: 'antonimos', number: '2', title: 'Antónimos', shortTitle: 'Antónimos' },
  { id: 'vocabulario', number: '3', title: 'Vocabulario', shortTitle: 'Palabras' },
  { id: 'silabas', number: '4', title: 'Sílabas', shortTitle: 'Sílabas' },
  { id: 'lectura', number: '5', title: 'Lectura por niveles', shortTitle: 'Lectura' },
  { id: 'comprension', number: '6', title: 'Comprensión lectora', shortTitle: 'Comprensión' }
]

const completedStages = ref([])
const selectedImage = ref(null)

function toggleCompleted(id) {
  if (completedStages.value.includes(id)) {
    completedStages.value = completedStages.value.filter(item => item !== id)
  } else {
    completedStages.value = [...completedStages.value, id]
  }
}

function goToStage(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

function openImage(item) {
  selectedImage.value = item
}

/*
 * Componente local para marcar cada etapa sin crear otro archivo.
 */
const StageComplete = defineComponent({
  props: {
    id: { type: String, required: true },
    completed: { type: Boolean, default: false }
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    return () => h('div', { class: 'section-footer' }, [
      h('span', { class: 'footer-check' }, props.completed ? '✓' : '✦'),
      h('p', props.completed
        ? '¡Muy bien! Has marcado esta etapa como completada.'
        : 'Cuando termines de practicar, marca esta etapa como completada.'),
      h('button', {
        class: ['complete-button', props.completed && 'completed'],
        onClick: () => emit('toggle')
      }, props.completed ? 'Etapa completada ✓' : 'Marcar como completada')
    ])
  }
})
</script>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(html) {
  scroll-behavior: smooth;
}

.leer-page {
  --ink: #30213f;
  --muted: #61566d;
  --purple: #6845a0;
  --purple-dark: #49316e;
  --lavender: #eee7fa;
  --pink: #f8e5ee;
  --cream: #fffaf4;
  min-height: 100vh;
  color: var(--ink);
  background:
    linear-gradient(rgba(255, 252, 249, .91), rgba(255, 252, 249, .96)),
    url('/fotos/cursos/alfabetizacion/leer/vive-amor-leer.png')
      center top / cover fixed;
  font-family: Inter, "Segoe UI", Arial, sans-serif;
}

.hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(260px, .7fr);
  align-items: center;
  gap: 36px;
  max-width: 1240px;
  min-height: 500px;
  padding: 48px 36px 56px;
  margin: 0 auto;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 42px;
  color: var(--purple-dark);
  font-size: .94rem;
  font-weight: 750;
  text-decoration: none;
}

.back-link:hover {
  color: #9c4b83;
}

.back-link span {
  font-size: 1.3rem;
}

.eyebrow,
.section-kicker {
  display: block;
  color: #7953a4;
  font-size: .76rem;
  font-weight: 850;
  letter-spacing: .15em;
  line-height: 1.6;
}

.hero h1 {
  margin: 14px 0 20px;
  color: #342342;
  font-size: clamp(2.6rem, 5vw, 4.6rem);
  font-weight: 850;
  letter-spacing: -.055em;
  line-height: 1.04;
}

.hero h1 span {
  color: #8056ae;
}

.hero-description {
  max-width: 640px;
  color: #493c55;
  font-size: 1.08rem;
  line-height: 1.85;
}

.primary-button,
.closing-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  min-height: 51px;
  padding: 0 24px;
  border: 0;
  border-radius: 15px;
  color: white;
  background: linear-gradient(120deg, #7651a7, #583681);
  box-shadow: 0 9px 24px #67418b30;
  font: inherit;
  font-weight: 750;
  text-decoration: none;
  cursor: pointer;
  transition: transform .2s, box-shadow .2s;
}

.primary-button {
  margin-top: 14px;
}

.primary-button:hover,
.closing-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 30px #67418b40;
}

.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-top: 38px;
}

.hero-stats div {
  display: grid;
  gap: 4px;
}

.hero-stats strong {
  color: #694695;
  font-size: 1.75rem;
}

.hero-stats span {
  color: #51455c;
  font-size: .83rem;
}

.hero-decoration {
  position: relative;
  display: grid;
  min-height: 310px;
  place-items: center;
}

.book-illustration {
  display: grid;
  place-items: center;
  width: min(270px, 100%);
  height: 245px;
  border: 1px solid #ffffffb8;
  border-radius: 42% 58% 55% 45% / 48% 42% 58% 52%;
  background: linear-gradient(145deg, #f4eafa, #fff0e5);
  box-shadow: 0 20px 55px #63478b1c;
  transform: rotate(-5deg);
}

.book-symbol {
  color: #7a4fa8;
  font-family: Georgia, serif;
  font-size: 6rem;
  font-weight: 800;
}

.book-caption {
  margin-top: -52px;
  color: #624578;
  font-size: 1rem;
  font-weight: 750;
}

.floating-letter {
  position: absolute;
  display: grid;
  width: 60px;
  height: 60px;
  place-items: center;
  border: 1px solid #fff;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 12px 30px #51356718;
  color: #704a9b;
  font-size: 1.7rem;
  font-weight: 850;
  animation: float 4s ease-in-out infinite;
}

.letter-a { top: 15px; left: 6%; }
.letter-m { right: 4%; top: 60px; animation-delay: .6s; }
.letter-l { bottom: 8px; left: 13%; animation-delay: 1s; }

.floating-star {
  position: absolute;
  right: 15%;
  bottom: 25px;
  color: #d18caa;
  font-size: 2.3rem;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-10px) rotate(4deg); }
}

.main-content {
  max-width: 1160px;
  padding: 0 28px 70px;
  margin: 0 auto;
}

.welcome-section {
  display: flex;
  align-items: flex-start;
  gap: 22px;
  padding: 30px;
  margin: 0 0 25px;
  border: 1px solid #e9dfef;
  border-radius: 24px;
  background: #ffffffeb;
  box-shadow: 0 10px 35px #4b2f5a0a;
}

.welcome-icon {
  display: grid;
  flex: 0 0 58px;
  width: 58px;
  height: 58px;
  place-items: center;
  border-radius: 19px;
  background: #f0e7fa;
  font-size: 1.7rem;
}

.welcome-section h2,
.progress-panel h2 {
  margin: 5px 0 8px;
  font-size: 1.6rem;
}

.welcome-section p,
.section-heading p,
.concept-banner p,
.pronunciation-tip p,
.comprehension-intro p {
  margin: 0;
  color: #51455c;
  font-size: .99rem;
  line-height: 1.8;
}

.progress-panel {
  padding: 28px;
  margin-bottom: 36px;
  border: 1px solid #e7dced;
  border-radius: 24px;
  background: #fffdfdf2;
}

.progress-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.progress-count {
  padding: 9px 14px;
  border-radius: 12px;
  background: #efe6fa;
  color: #5d3d86;
  font-weight: 850;
}

.progress-track {
  height: 10px;
  margin: 18px 0 10px;
  overflow: hidden;
  border-radius: 99px;
  background: #eae2ed;
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #a27bcb, #66418f);
  transition: width .35s ease;
}

.progress-help {
  color: #62566b;
  font-size: .88rem;
  line-height: 1.6;
}

.stage-dots {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  margin-top: 24px;
}

.stage-dot {
  display: grid;
  justify-items: center;
  gap: 8px;
  padding: 0;
  border: 0;
  color: #584766;
  background: transparent;
  cursor: pointer;
}

.stage-dot > span {
  display: grid;
  width: 39px;
  height: 39px;
  place-items: center;
  border: 1px solid #dfd1e8;
  border-radius: 50%;
  background: white;
  color: #67458d;
  font-weight: 850;
  transition: all .2s;
}

.stage-dot:hover > span {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px #4d306b20;
}

.stage-dot-done > span {
  color: white;
  border-color: #6b4994;
  background: #6b4994;
}

.stage-dot small {
  text-align: center;
  font-size: .75rem;
  font-weight: 700;
}

.learning-section {
  padding: 42px 0;
  scroll-margin-top: 24px;
}

.tinted-section {
  padding: 36px 28px;
  margin: 22px -12px;
  border: 1px solid #eee4f1;
  border-radius: 30px;
  background: #f7f1fae8;
}

.section-heading {
  max-width: 790px;
  margin-bottom: 26px;
}

.section-heading h2 {
  margin: 10px 0 12px;
  color: #342342;
  font-size: clamp(1.9rem, 3vw, 2.65rem);
  letter-spacing: -.035em;
  line-height: 1.2;
}

.notice-card,
.concept-banner,
.pronunciation-tip,
.comprehension-intro {
  display: flex;
  align-items: flex-start;
  gap: 17px;
  padding: 21px 24px;
  margin: 24px 0;
  border: 1px solid #ead9b5;
  border-radius: 20px;
  background: #fff9e9;
}

.notice-icon,
.tip-icon,
.comprehension-icon {
  flex: 0 0 auto;
  font-size: 1.8rem;
}

.notice-card strong,
.concept-banner h3,
.pronunciation-tip h3,
.comprehension-intro h3 {
  display: block;
  margin: 0 0 6px;
  color: #49325f;
  font-size: 1.05rem;
}

.notice-card p {
  margin: 0;
  color: #594b59;
  line-height: 1.75;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin-top: 28px;
}

.image-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid #e9e0ed;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 8px 24px #3e28500a;
  transition: transform .22s, box-shadow .22s;
}

.image-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 32px #3e285015;
}

.image-button,
.level-image-button {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  border: 0;
  background: #f6f0f8;
  cursor: zoom-in;
}

.image-button img {
  display: block;
  width: 100%;
  height: 235px;
  object-fit: contain;
  transition: transform .3s;
}

.image-card:hover .image-button img {
  transform: scale(1.025);
}

.image-zoom {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 7px 10px;
  border: 1px solid #ffffffb5;
  border-radius: 9px;
  color: #3e294d;
  background: #ffffffed;
  font-size: .75rem;
  font-weight: 800;
}

.image-caption {
  padding: 17px 18px 20px;
}

.image-caption h3 {
  margin: 0 0 7px;
  color: #3e2a50;
  font-size: 1.02rem;
}

.image-caption p {
  margin: 0;
  color: #655a6b;
  font-size: .9rem;
  line-height: 1.7;
}

.section-footer {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 17px 0 0;
  margin-top: 24px;
  border-top: 1px solid #e8deec;
}

.footer-check,
.section-footer > span {
  color: #5f8b6c;
  font-size: 1.2rem;
  font-weight: 900;
}

.section-footer p {
  flex: 1;
  margin: 0;
  color: #51455c;
  font-size: .88rem;
  line-height: 1.6;
}

.complete-button {
  flex: 0 0 auto;
  padding: 11px 14px;
  border: 1px solid #6f4d99;
  border-radius: 12px;
  color: #5b3b83;
  background: white;
  font: inherit;
  font-size: .82rem;
  font-weight: 800;
  cursor: pointer;
  transition: all .2s;
}

.complete-button:hover,
.complete-button.completed {
  color: white;
  background: #65438b;
}

.concept-banner {
  align-items: center;
  border-color: #dfd0f0;
  background: #f3ebfc;
}

.concept-symbol {
  display: grid;
  flex: 0 0 52px;
  width: 52px;
  height: 52px;
  place-items: center;
  border-radius: 16px;
  color: #694493;
  background: white;
  font-size: 2rem;
}

.opposites-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 13px;
  margin: 22px 0 30px;
}

.opposite-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 17px 15px;
  border: 1px solid #e8dbee;
  border-radius: 15px;
  background: #fff;
  font-size: .96rem;
  font-weight: 800;
}

.opposite-card b {
  color: #b27ba7;
}

.pronunciation-tip {
  border-color: #d9e7d8;
  background: #f2f8ef;
}

.syllable-demo {
  display: grid;
  justify-items: center;
  gap: 10px;
  padding: 27px;
  margin: 24px 0;
  border: 1px solid #e2d7ef;
  border-radius: 23px;
  background: linear-gradient(135deg, #fff, #f7effd);
}

.demo-label {
  color: #71538f;
  font-size: .72rem;
  font-weight: 850;
  letter-spacing: .13em;
}

.syllable-word {
  display: flex;
  align-items: center;
  gap: 13px;
  color: #64418c;
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: .04em;
}

.syllable-word i {
  color: #d49bb9;
  font-style: normal;
}

.syllable-demo p {
  margin: 0;
  color: #594d63;
  text-align: center;
  line-height: 1.7;
}

.level-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.level-card {
  padding: 22px;
  border: 1px solid #e7dced;
  border-radius: 22px;
  background: white;
  box-shadow: 0 8px 25px #4930590a;
}

.level-one { border-top: 5px solid #8ebca1; }
.level-two { border-top: 5px solid #a28bce; }
.level-three { border-top: 5px solid #df9ab4; }

.level-number {
  color: #76519b;
  font-size: 2.2rem;
  font-weight: 900;
}

.level-tag {
  display: inline-block;
  padding: 5px 8px;
  border-radius: 7px;
  color: #614477;
  background: #f1e8f8;
  font-size: .67rem;
  font-weight: 850;
  letter-spacing: .08em;
}

.level-card h3 {
  margin: 13px 0 9px;
  color: #382747;
  font-size: 1.23rem;
}

.level-card > p {
  min-height: 76px;
  margin: 0 0 17px;
  color: #5e5268;
  font-size: .91rem;
  line-height: 1.7;
}

.level-image-button {
  border-radius: 13px;
}

.level-image-button img {
  display: block;
  width: 100%;
  height: 190px;
  object-fit: contain;
}

.level-image-button span {
  display: block;
  padding: 10px;
  color: #61447f;
  background: #f5eef9;
  font-size: .83rem;
  font-weight: 800;
}

.level-card ul {
  display: grid;
  gap: 10px;
  padding-left: 19px;
  margin: 19px 0;
  color: #564961;
  font-size: .88rem;
  line-height: 1.55;
}

.level-card li::marker {
  color: #956eb9;
}

.level-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 13px;
  border: 1px solid #e1d5eb;
  border-radius: 11px;
  color: #593a7c;
  background: #faf6fd;
  font: inherit;
  font-size: .85rem;
  font-weight: 800;
  cursor: pointer;
}

.level-action:hover {
  background: #efe4f8;
}

.reading-extras {
  margin-top: 35px;
}

.comprehension-intro {
  border-color: #d5e6df;
  background: #eff8f4;
}

.comprehension-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.comprehension-card {
  position: relative;
}

.comprehension-card .image-button img {
  height: 300px;
}

.exercise-number {
  position: absolute;
  z-index: 1;
  top: 12px;
  left: 12px;
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 12px;
  color: white;
  background: #65438b;
  font-weight: 900;
}

.closing-banner {
  position: relative;
  display: grid;
  justify-items: center;
  padding: 52px 28px;
  margin-top: 38px;
  overflow: hidden;
  border: 1px solid #e5d7ed;
  border-radius: 30px;
  background: linear-gradient(135deg, #f2e8fb, #fff0ed);
  text-align: center;
  background:
    linear-gradient(
      rgba(255, 255, 255, 0.70),
      rgba(255, 255, 255, 0.70)
    ),
    url('/fotos/cursos/alfabetizacion/leer/mujerleyendo.png')
    center / cover no-repeat;
  }

.closing-sparkle {
  margin-bottom: 12px;
  color: #b27bab;
  font-size: 2rem;
}

.closing-banner h2 {
  margin: 13px 0;
  color: #382448;
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: -.035em;
  line-height: 1.2;
}

.closing-banner > p {
  max-width: 610px;
  margin: 0 0 25px;
  color: #574a61;
  line-height: 1.8;
}

.closing-button {
  min-height: 48px;
}

.page-footer {
  padding: 25px;
  border-top: 1px solid #e8deec;
  color: #5b4c65;
  background: #fffaf4df;
  text-align: center;
}

.page-footer p {
  margin: 0;
  font-size: .88rem;
}

.image-modal {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 24px;
  background: #21172bdc;
  backdrop-filter: blur(7px);
}

.modal-panel {
  position: relative;
  width: min(900px, 100%);
  max-height: 92vh;
  padding: 15px;
  overflow: auto;
  border: 1px solid #ffffff50;
  border-radius: 22px;
  background: white;
  box-shadow: 0 25px 90px #0004;
}

.modal-panel > img {
  display: block;
  width: 100%;
  max-height: 72vh;
  object-fit: contain;
  border-radius: 12px;
  background: #f8f5fa;
}

.modal-close {
  position: sticky;
  z-index: 2;
  top: 5px;
  float: right;
  width: 40px;
  height: 40px;
  margin-bottom: -40px;
  border: 0;
  border-radius: 50%;
  color: #4d355e;
  background: #f0e6f8;
  font-size: 1.8rem;
  cursor: pointer;
}

.modal-caption {
  padding: 13px 5px 4px;
}

.modal-caption h3 {
  margin: 0 0 6px;
  color: #3c2a4b;
}

.modal-caption p {
  margin: 0;
  color: #65566d;
  line-height: 1.6;
}

@media (max-width: 850px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 30px 24px 38px;
  }

  .hero-decoration {
    min-height: 240px;
  }

  .book-illustration {
    width: 220px;
    height: 200px;
  }

  .book-symbol {
    font-size: 4.8rem;
  }

  .image-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .level-grid {
    grid-template-columns: 1fr;
  }

  .level-card > p {
    min-height: 0;
  }

  .stage-dots {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 18px;
  }
}

@media (max-width: 560px) {
  .hero {
    gap: 12px;
    padding: 24px 19px 30px;
  }

  .back-link {
    margin-bottom: 28px;
  }

  .hero h1 {
    font-size: 2.7rem;
  }

  .hero-description {
    font-size: .98rem;
  }

  .hero-stats {
    gap: 20px;
  }

  .hero-stats strong {
    font-size: 1.45rem;
  }

  .hero-stats span {
    max-width: 90px;
    font-size: .75rem;
  }

  .main-content {
    padding: 0 16px 42px;
  }

  .welcome-section {
    gap: 14px;
    padding: 21px 17px;
  }

  .welcome-icon {
    flex-basis: 43px;
    width: 43px;
    height: 43px;
    font-size: 1.3rem;
  }

  .welcome-section h2,
  .progress-panel h2 {
    font-size: 1.35rem;
  }

  .progress-panel {
    padding: 20px 15px;
  }

  .stage-dots {
    gap: 13px 5px;
  }

  .stage-dot small {
    font-size: .67rem;
  }

  .learning-section {
    padding: 31px 0;
  }

  .tinted-section {
    padding: 27px 15px;
    margin-right: -5px;
    margin-left: -5px;
    border-radius: 22px;
  }

  .image-grid,
  .comprehension-grid {
    grid-template-columns: 1fr;
    gap: 17px;
  }

  .image-button img {
    height: auto;
    max-height: 360px;
    min-height: 180px;
  }

  .opposites-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .opposite-card {
    padding: 14px 10px;
    font-size: .83rem;
  }

  .section-footer {
    flex-wrap: wrap;
  }

  .section-footer p {
    flex-basis: calc(100% - 35px);
  }

  .complete-button {
    width: 100%;
  }

  .notice-card,
  .concept-banner,
  .pronunciation-tip,
  .comprehension-intro {
    padding: 17px;
  }

  .syllable-word {
    font-size: 2.5rem;
  }

  .comprehension-card .image-button img {
    height: auto;
    max-height: 400px;
  }

  .closing-banner {
    padding: 40px 19px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation: none !important;
    transition: none !important;
  }
}
</style>
