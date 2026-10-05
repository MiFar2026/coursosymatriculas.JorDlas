<script setup>

import { ref } from 'vue'
import NavbarCursos from '../../../components/cursosymatricula/NavbarCursos.vue'


// ======================================
// PALABRAS DEL ALFABETO
// ======================================

const palabras = {

  A: {
    palabra: 'Avión',
    audio: '/audio/A.mp3'
  },

  B: {
    palabra: 'Bus',
    audio: '/audio/B.mp3'
  },

  C: {
    palabra: 'Casa',
    audio: '/audio/C.mp3'
  },

  D: {
    palabra: 'Diente',
    audio: '/audio/D.mp3'
  },

  E: {
    palabra: 'Empleo',
    audio: '/audio/E.mp3'
  },

  F: {
    palabra: 'Familia',
    audio: '/audio/F.mp3'
  },

  G: {
    palabra: 'Gato',
    audio: '/audio/G.mp3'
  },

  H: {
    palabra: 'Hospital',
    audio: '/audio/H.mp3'
  },

  I: {
    palabra: 'Identificación',
    audio: '/audio/I.mp3'
  },

  J: {
    palabra: 'Jabón',
    audio: '/audio/J.mp3'
  },

  K: {
    palabra: 'Kiwi',
    audio: '/audio/K.mp3'
  },

  L: {
    palabra: 'Luna',
    audio: '/audio/L.mp3'
  },

  LL: {
    palabra: 'Llave',
    audio: '/audio/LL.mp3'
  },

  M: {
    palabra: 'Medicamento',
    audio: '/audio/M.mp3'
  },

  N: {
    palabra: 'Niña',
    audio: '/audio/N.mp3'
  },

  Ñ: {
    palabra: 'Señor',
    audio: '/audio/Ñ.mp3'
  },

  O: {
    palabra: 'Obra',
    audio: '/audio/O.mp3'
  },

  P: {
    palabra: 'Pan',
    audio: '/audio/P.mp3'
  },

  Q: {
    palabra: 'Queso',
    audio: '/audio/Q.mp3'
  },

  R: {
    palabra: 'Recibo',
    audio: '/audio/R.mp3'
  },

  S: {
    palabra: 'Sol',
    audio: '/audio/S.mp3'
  },

  T: {
    palabra: 'Tren',
    audio: '/audio/T.mp3'
  },

  U: {
    palabra: 'Universidad',
    audio: '/audio/U.mp3'
  },

  V: {
    palabra: 'Verdura',
    audio: '/audio/V.mp3'
  },

  X: {
    palabra: 'Axila',
    audio: '/audio/X.mp3'
  },

  Y: {
    palabra: 'Yoga',
    audio: '/audio/Y.mp3'
  },

  Z: {
    palabra: 'Zapato',
    audio: '/audio/Z.mp3'
  }

}


// ======================================
// DATOS SELECCIONADOS
// ======================================

const palabraSeleccionada = ref('')
const letraSeleccionada = ref('')
const audioSeleccionado = ref('')


// ======================================
// MOSTRAR PALABRA
// ======================================

function mostrarPalabra(letra) {

  letraSeleccionada.value = letra

  palabraSeleccionada.value = palabras[letra].palabra

  audioSeleccionado.value = palabras[letra].audio

}


// ======================================
// REPRODUCIR AUDIO
// ======================================

function reproducirAudio() {

  if (!audioSeleccionado.value) {
    return
  }

  const audio = new Audio(audioSeleccionado.value)

  audio.play()

}

</script>


<template>

  <main class="min-h-screen bg-gray-100">

    <!-- ====================================== -->
    <!-- NAVBAR -->
    <!-- ====================================== -->

    <NavbarCursos />


    <!-- ====================================== -->
    <!-- CONTENIDO -->
    <!-- ====================================== -->

    <div class="py-8 px-4">

      <div class="max-w-5xl mx-auto">


        <!-- ====================================== -->
        <!-- TÍTULO -->
        <!-- ====================================== -->

        <h1
          class="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8"
        >
          Aprende el alfabeto
        </h1>


        <!-- ====================================== -->
        <!-- IMAGEN DEL ALFABETO -->
        <!-- ====================================== -->

        <div class="relative mx-auto w-full max-w-4xl">

          <img
            src="/fotos/cursos/alfabetizacion/alfabeto/alfabeto.png"
            alt="El alfabeto"
            class="w-full h-auto block rounded-lg shadow-lg"
          />


          <!-- ================================== -->
          <!-- A - J -->
          <!-- ================================== -->

          <button
            @click="mostrarPalabra('A')"
            class="letra A"
            aria-label="A de Avión"
          ></button>

          <button
            @click="mostrarPalabra('B')"
            class="letra B"
            aria-label="B de Bus"
          ></button>

          <button
            @click="mostrarPalabra('C')"
            class="letra C"
            aria-label="C de Casa"
          ></button>

          <button
            @click="mostrarPalabra('D')"
            class="letra D"
            aria-label="D de Diente"
          ></button>

          <button
            @click="mostrarPalabra('E')"
            class="letra E"
            aria-label="E de Empleo"
          ></button>

          <button
            @click="mostrarPalabra('F')"
            class="letra F"
            aria-label="F de Familia"
          ></button>

          <button
            @click="mostrarPalabra('G')"
            class="letra G"
            aria-label="G de Gato"
          ></button>

          <button
            @click="mostrarPalabra('H')"
            class="letra H"
            aria-label="H de Hospital"
          ></button>

          <button
            @click="mostrarPalabra('I')"
            class="letra I"
            aria-label="I de Identificación"
          ></button>

          <button
            @click="mostrarPalabra('J')"
            class="letra J"
            aria-label="J de Jabón"
          ></button>


          <!-- ================================== -->
          <!-- K - R -->
          <!-- ================================== -->

          <button
            @click="mostrarPalabra('K')"
            class="letra K"
            aria-label="K de Kiwi"
          ></button>

          <button
            @click="mostrarPalabra('L')"
            class="letra L"
            aria-label="L de Luna"
          ></button>

          <button
            @click="mostrarPalabra('LL')"
            class="letra LL"
            aria-label="LL de Llave"
          ></button>

          <button
            @click="mostrarPalabra('M')"
            class="letra M"
            aria-label="M de Medicamento"
          ></button>

          <button
            @click="mostrarPalabra('N')"
            class="letra N"
            aria-label="N de Niña"
          ></button>

          <button
            @click="mostrarPalabra('Ñ')"
            class="letra Ñ"
            aria-label="Ñ de Señor"
          ></button>

          <button
            @click="mostrarPalabra('O')"
            class="letra O"
            aria-label="O de Obra"
          ></button>

          <button
            @click="mostrarPalabra('P')"
            class="letra P"
            aria-label="P de Pan"
          ></button>

          <button
            @click="mostrarPalabra('Q')"
            class="letra Q"
            aria-label="Q de Queso"
          ></button>

          <button
            @click="mostrarPalabra('R')"
            class="letra R"
            aria-label="R de Recibo"
          ></button>


          <!-- ================================== -->
          <!-- S - Z -->
          <!-- ================================== -->

          <button
            @click="mostrarPalabra('S')"
            class="letra S"
            aria-label="S de Sol"
          ></button>

          <button
            @click="mostrarPalabra('T')"
            class="letra T"
            aria-label="T de Tren"
          ></button>

          <button
            @click="mostrarPalabra('U')"
            class="letra U"
            aria-label="U de Universidad"
          ></button>

          <button
            @click="mostrarPalabra('V')"
            class="letra V"
            aria-label="V de Verdura"
          ></button>

          <button
            @click="mostrarPalabra('X')"
            class="letra X"
            aria-label="X de Axila"
          ></button>

          <button
            @click="mostrarPalabra('Y')"
            class="letra Y"
            aria-label="Y de Yoga"
          ></button>

          <button
            @click="mostrarPalabra('Z')"
            class="letra Z"
            aria-label="Z de Zapato"
          ></button>

        </div>


        <!-- ====================================== -->
        <!-- RESULTADO -->
        <!-- ====================================== -->

        <div
          v-if="palabraSeleccionada"
          class="mt-8 flex justify-center"
        >

          <div
            class="bg-white rounded-2xl shadow-xl px-8 py-6 text-center"
          >

            <p
              class="text-2xl font-semibold text-gray-500 mb-2"
            >
              {{ letraSeleccionada }}
            </p>


            <p
              class="text-4xl md:text-5xl font-bold text-gray-800 mb-5"
            >
              {{ palabraSeleccionada }}
            </p>


            <button
              @click="reproducirAudio"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition"
            >
              🔊 Escuchar
            </button>

          </div>

        </div>

      </div>

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

}


/* ======================================
   EFECTO AL PASAR EL RATÓN
   ====================================== */

.letra:hover {

  background: rgba(255, 255, 255, 0.20);

  border-radius: 10px;

}


/* ======================================
   COLUMNA A - J
   ====================================== */

.A {
  left: 2%;
  top: 14%;
  width: 14%;
  height: 5%;
}

.B {
  left: 2%;
  top: 22%;
  width: 14%;
  height: 5%;
}

.C {
  left: 2%;
  top: 30%;
  width: 14%;
  height: 5%;
}

.D {
  left: 2%;
  top: 38%;
  width: 14%;
  height: 5%;
}

.E {
  left: 2%;
  top: 46%;
  width: 14%;
  height: 5%;
}

.F {
  left: 2%;
  top: 54%;
  width: 14%;
  height: 5%;
}

.G {
  left: 2%;
  top: 62%;
  width: 14%;
  height: 5%;
}

.H {
  left: 2%;
  top: 70%;
  width: 14%;
  height: 5%;
}

.I {
  left: 2%;
  top: 78%;
  width: 14%;
  height: 5%;
}

.J {
  left: 2%;
  top: 86%;
  width: 14%;
  height: 5%;
}


/* ======================================
   COLUMNA K - R
   ====================================== */

.K {
  left: 35%;
  top: 14%;
  width: 14%;
  height: 5%;
}

.L {
  left: 35%;
  top: 22%;
  width: 14%;
  height: 5%;
}

.LL {
  left: 35%;
  top: 30%;
  width: 14%;
  height: 5%;
}

.M {
  left: 35%;
  top: 38%;
  width: 14%;
  height: 5%;
}

.N {
  left: 35%;
  top: 46%;
  width: 14%;
  height: 5%;
}

.Ñ {
  left: 35%;
  top: 54%;
  width: 14%;
  height: 5%;
}

.O {
  left: 35%;
  top: 62%;
  width: 14%;
  height: 5%;
}

.P {
  left: 35%;
  top: 70%;
  width: 14%;
  height: 5%;
}

.Q {
  left: 35%;
  top: 78%;
  width: 14%;
  height: 5%;
}

.R {
  left: 35%;
  top: 86%;
  width: 14%;
  height: 5%;
}


/* ======================================
   COLUMNA S - Z
   ====================================== */

.S {
  left: 70%;
  top: 14%;
  width: 14%;
  height: 5%;
}

.T {
  left: 70%;
  top: 22%;
  width: 14%;
  height: 5%;
}

.U {
  left: 70%;
  top: 30%;
  width: 14%;
  height: 5%;
}

.V {
  left: 70%;
  top: 38%;
  width: 14%;
  height: 5%;
}

.X {
  left: 70%;
  top: 54%;
  width: 14%;
  height: 5%;
}

.Y {
  left: 70%;
  top: 62%;
  width: 14%;
  height: 5%;
}

.Z {
  left: 70%;
  top: 78%;
  width: 14%;
  height: 5%;
}

</style>