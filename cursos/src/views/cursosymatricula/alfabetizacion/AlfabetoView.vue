
<script setup>

import { ref } from 'vue'
import NavbarCursos from '../../../components/cursosymatricula/NavbarCursos.vue'

// ======================================
// PALABRAS DEL ALFABETO Y SUS AUDIOS
// ======================================

const palabras = {

  A: { palabra: 'Avión', audio: '/audio/a.mp3' },
  B: { palabra: 'Bus', audio: '/audio/b.mp3' },
  C: { palabra: 'Casa', audio: '/audio/c.mp3' },
  D: { palabra: 'Diente', audio: '/audio/d.mp3' },
  E: { palabra: 'Espejo', audio: '/audio/e.mp3' },
  F: { palabra: 'Familia', audio: '/audio/f.mp3' },
  G: { palabra: 'Gato', audio: '/audio/g.mp3' },
  H: { palabra: 'Hospital', audio: '/audio/h.mp3' },
  I: { palabra: 'Identificación', audio: '/audio/i.mp3' },
  J: { palabra: 'Jabón', audio: '/audio/j.mp3' },
  K: { palabra: 'Kiwi', audio: '/audio/k.mp3' },
  L: { palabra: 'Luna', audio: '/audio/l.mp3' },
  LL: { palabra: 'Llave', audio: '/audio/ll.mp3' },
  M: { palabra: 'Medicamento', audio: '/audio/m.mp3' },
  N: { palabra: 'Niña', audio: '/audio/n.mp3' },
  Ñ: { palabra: 'Señor', audio: '/audio/ny.mp3' },
  O: { palabra: 'Obra', audio: '/audio/o.mp3' },
  P: { palabra: 'Pan', audio: '/audio/p.mp3' },
  Q: { palabra: 'Queso', audio: '/audio/q.mp3' },
  R: { palabra: 'Recibo', audio: '/audio/r.mp3' },
  S: { palabra: 'Sol', audio: '/audio/s.mp3' },
  T: { palabra: 'Tren', audio: '/audio/t.mp3' },
  U: { palabra: 'Universidad', audio: '/audio/u.mp3' },
  V: { palabra: 'Verdura', audio: '/audio/v.mp3' },
  X: { palabra: 'Axila', audio: '/audio/x.mp3' },
  Y: { palabra: 'Yoga', audio: '/audio/y.mp3' },
  Z: { palabra: 'Zapato', audio: '/audio/z.mp3' }

}

// ======================================
// DATOS SELECCIONADOS
// ======================================

const palabraSeleccionada = ref('')
const letraSeleccionada = ref('')
const audioSeleccionado = ref('')

// ======================================
// POSICIÓN DEL RESULTADO
// ======================================

const posiciones = {

  A: { left: '2%', top: '14%' },
  B: { left: '2%', top: '22%' },
  C: { left: '2%', top: '30%' },
  D: { left: '2%', top: '38%' },
  E: { left: '2%', top: '46%' },
  F: { left: '2%', top: '54%' },
  G: { left: '2%', top: '62%' },
  H: { left: '2%', top: '70%' },
  I: { left: '2%', top: '78%' },
  J: { left: '2%', top: '86%' },

  K: { left: '35%', top: '14%' },
  L: { left: '35%', top: '22%' },
  LL: { left: '35%', top: '30%' },
  M: { left: '35%', top: '38%' },
  N: { left: '35%', top: '46%' },
  Ñ: { left: '35%', top: '54%' },
  O: { left: '35%', top: '62%' },
  P: { left: '35%', top: '70%' },
  Q: { left: '35%', top: '78%' },
  R: { left: '35%', top: '86%' },

  S: { left: '70%', top: '14%' },
  T: { left: '70%', top: '22%' },
  U: { left: '70%', top: '30%' },
  V: { left: '70%', top: '38%' },
  X: { left: '70%', top: '54%' },
  Y: { left: '70%', top: '62%' },
  Z: { left: '70%', top: '78%' }

}

// ======================================
// MOSTRAR PALABRA
// ======================================

function mostrarPalabra(letra) {

  // Cambiar inmediatamente el contenido anterior
  palabraSeleccionada.value = palabras[letra].palabra

  letraSeleccionada.value = letra

  audioSeleccionado.value = palabras[letra].audio

}

// ======================================
// REPRODUCIR AUDIO
// ======================================

let audioActual = null

function reproducirAudio() {

  if (!audioSeleccionado.value) return

  // Detener audio anterior
  if (audioActual) {
    audioActual.pause()
    audioActual.currentTime = 0
  }

  audioActual = new Audio(audioSeleccionado.value)

  audioActual.play().catch(error => {
    console.error('Error al reproducir el audio:', error)
  })

}

</script>

<template>

  <main class="min-h-screen bg-gray-100">

    <!-- NAVBAR -->

    <NavbarCursos />

    <div class="max-w-5xl mx-auto px-4 pt-6">

      <!-- VOLVER -->

      <RouterLink
        to="/alfabetizacion"
        class="inline-flex items-center gap-3 bg-white/90 hover:bg-red-950 hover:text-white text-red-900 px-5 py-3 rounded-xl shadow-md transition-all duration-300 font-bold mb-8"
      >
        <span class="text-2xl leading-none">←</span>

        <span>Volver a Alfabetización</span>

      </RouterLink>

      <!-- TÍTULO -->

      <h1 class="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8">
        Aprende el alfabeto
      </h1>

      <!-- IMAGEN Y ZONAS CLICABLES -->

      <div class="relative mx-auto w-full max-w-4xl">

        <img
          src="/fotos/cursos/alfabetizacion/alfabeto/alfabeto.png"
          alt="El alfabeto"
          class="w-full h-auto block rounded-lg shadow-lg"
        />

        <!-- A - J -->

        <button @click="mostrarPalabra('A')" class="letra A" aria-label="A de Avión"></button>
        <button @click="mostrarPalabra('B')" class="letra B" aria-label="B de Bus"></button>
        <button @click="mostrarPalabra('C')" class="letra C" aria-label="C de Casa"></button>
        <button @click="mostrarPalabra('D')" class="letra D" aria-label="D de Diente"></button>
        <button @click="mostrarPalabra('E')" class="letra E" aria-label="E de Espejo"></button>
        <button @click="mostrarPalabra('F')" class="letra F" aria-label="F de Familia"></button>
        <button @click="mostrarPalabra('G')" class="letra G" aria-label="G de Gato"></button>
        <button @click="mostrarPalabra('H')" class="letra H" aria-label="H de Hospital"></button>
        <button @click="mostrarPalabra('I')" class="letra I" aria-label="I de Identificación"></button>
        <button @click="mostrarPalabra('J')" class="letra J" aria-label="J de Jabón"></button>

        <!-- K - R -->

        <button @click="mostrarPalabra('K')" class="letra K" aria-label="K de Kiwi"></button>
        <button @click="mostrarPalabra('L')" class="letra L" aria-label="L de Luna"></button>
        <button @click="mostrarPalabra('LL')" class="letra LL" aria-label="LL de Llave"></button>
        <button @click="mostrarPalabra('M')" class="letra M" aria-label="M de Medicamento"></button>
        <button @click="mostrarPalabra('N')" class="letra N" aria-label="N de Niña"></button>
        <button @click="mostrarPalabra('Ñ')" class="letra Ñ" aria-label="Ñ de Señor"></button>
        <button @click="mostrarPalabra('O')" class="letra O" aria-label="O de Obra"></button>
        <button @click="mostrarPalabra('P')" class="letra P" aria-label="P de Pan"></button>
        <button @click="mostrarPalabra('Q')" class="letra Q" aria-label="Q de Queso"></button>
        <button @click="mostrarPalabra('R')" class="letra R" aria-label="R de Recibo"></button>

        <!-- S - Z -->

        <button @click="mostrarPalabra('S')" class="letra S" aria-label="S de Sol"></button>
        <button @click="mostrarPalabra('T')" class="letra T" aria-label="T de Tren"></button>
        <button @click="mostrarPalabra('U')" class="letra U" aria-label="U de Universidad"></button>
        <button @click="mostrarPalabra('V')" class="letra V" aria-label="V de Verdura"></button>
        <button @click="mostrarPalabra('X')" class="letra X" aria-label="X de Axila"></button>
        <button @click="mostrarPalabra('Y')" class="letra Y" aria-label="Y de Yoga"></button>
        <button @click="mostrarPalabra('Z')" class="letra Z" aria-label="Z de Zapato"></button>

        <!-- ====================================== -->
        <!-- RESULTADO ENCIMA DE LA IMAGEN -->
        <!-- ====================================== -->

        <div
          v-if="palabraSeleccionada"
          class="resultado-imagen"
          :style="{
            left: posiciones[letraSeleccionada].left,
            top: posiciones[letraSeleccionada].top
          }"
        >

          <div class="resultado-contenido">

            <p class="text-sm md:text-lg font-bold text-red-800">
              {{ letraSeleccionada }}
            </p>

            <p class="text-lg md:text-2xl font-bold text-gray-800">
              {{ palabraSeleccionada }}
            </p>

            <button
              @click.stop="reproducirAudio"
              class="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 md:px-5 rounded-xl shadow transition text-sm md:text-base"
            >
              🔊 Escuchar
            </button>

          </div>

        </div>

      </div>

      <div class="h-10"></div>

    </div>

  </main>

</template>

<style scoped>

/* ======================================
   ZONAS CLICABLES
   ====================================== */

.letra {
  position: absolute;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;
}

.letra:hover {
  background: rgba(255, 255, 255, 0.20);
  border-radius: 10px;
}

/* ======================================
   RESULTADO SOBRE LA IMAGEN
   ====================================== */

.resultado-imagen {
  position: absolute;
  z-index: 5;
  transform: translateY(-105%);
  pointer-events: none;
  max-width: 45%;
}

.resultado-contenido {
  background: rgba(255, 255, 255, 0.96);
  border: 2px solid #991b1b;
  border-radius: 14px;
  padding: 8px 12px;
  text-align: center;
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.22);
  pointer-events: auto;
}

/* ======================================
   COLUMNA A - J
   ====================================== */

.A { left: 2%; top: 14%; width: 14%; height: 5%; }
.B { left: 2%; top: 22%; width: 14%; height: 5%; }
.C { left: 2%; top: 30%; width: 14%; height: 5%; }
.D { left: 2%; top: 38%; width: 14%; height: 5%; }
.E { left: 2%; top: 46%; width: 14%; height: 5%; }
.F { left: 2%; top: 54%; width: 14%; height: 5%; }
.G { left: 2%; top: 62%; width: 14%; height: 5%; }
.H { left: 2%; top: 70%; width: 14%; height: 5%; }
.I { left: 2%; top: 78%; width: 14%; height: 5%; }
.J { left: 2%; top: 88%; width: 14%; height: 5%; }

/* ======================================
   COLUMNA K - R
   ====================================== */

.K { left: 35%; top: 14%; width: 14%; height: 5%; }
.L { left: 35%; top: 22%; width: 14%; height: 5%; }
.LL { left: 35%; top: 30%; width: 14%; height: 5%; }
.M { left: 35%; top: 38%; width: 14%; height: 5%; }
.N { left: 35%; top: 46%; width: 14%; height: 5%; }
.Ñ { left: 35%; top: 54%; width: 14%; height: 5%; }
.O { left: 35%; top: 62%; width: 14%; height: 5%; }
.P { left: 35%; top: 71%; width: 14%; height: 5%; }
.Q { left: 35%; top: 78%; width: 14%; height: 5%; }
.R { left: 35%; top: 86%; width: 14%; height: 5%; }

/* ======================================
   COLUMNA S - Z
   ====================================== */

.S { left: 68%; top: 14%; width: 14%; height: 5%; }
.T { left: 68%; top: 22%; width: 14%; height: 5%; }
.U { left: 68%; top: 31%; width: 14%; height: 5%; }
.V { left: 68%; top: 41%; width: 14%; height: 5%; }
.X { left: 68%; top: 52%; width: 14%; height: 5%; }
.Y { left: 68%; top: 62%; width: 14%; height: 5%; }
.Z { left: 68%; top: 74%; width: 14%; height: 5%; }

</style>
