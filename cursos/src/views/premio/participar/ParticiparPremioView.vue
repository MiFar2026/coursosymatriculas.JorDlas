<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* =========================
   FORMULARIO
========================= */

const form = ref({
  nombre: '',
  apellidos: '',
  email: '',
  telefono: '',
  pais: '',
  nombreArtistico: '',

  tituloObra: '',
  tipoObra: '',
  genero: '',
  idioma: '',
  numeroPalabras: '',
  sinopsis: '',
  comentarios: '',

  aceptaBases: false,
  declaraAutoria: false
})

const archivo = ref(null)
const enviado = ref(false)
const error = ref('')

/* =========================
   OPCIONES
========================= */

const tiposObra = [
  'Relato',
  'Cuento',
  'Poesía',
  'Novela',
  'Ensayo',
  'Microrrelato',
  'Otro'
]

const generos = [
  'Literatura infantil',
  'Ficción',
  'Poesía',
  'Fantasía',
  'Ciencia ficción',
  'Drama',
  'Comedia',
  'Misterio',
  'Memoria / autobiografía',
  'Ensayo',
  'Otro'
]

const idiomas = [
  'Castellano',
  'Catalán',
  'Persa',
  'Inglés',
  'Francés',
  'Otro'
]

/* =========================
   ARCHIVO
========================= */

const nombreArchivo = computed(() => {
  return archivo.value ? archivo.value.name : ''
})

const seleccionarArchivo = (event) => {
  const file = event.target.files[0]

  if (!file) {
    archivo.value = null
    return
  }

  const tiposPermitidos = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]

  if (!tiposPermitidos.includes(file.type)) {
    error.value = 'Por favor, selecciona un archivo PDF o Word.'
    archivo.value = null
    event.target.value = ''
    return
  }

  const maximo = 10 * 1024 * 1024

  if (file.size > maximo) {
    error.value = 'El archivo no puede superar los 10 MB.'
    archivo.value = null
    event.target.value = ''
    return
  }

  error.value = ''
  archivo.value = file
}

/* =========================
   ENVIAR
========================= */

const enviarFormulario = () => {
  error.value = ''

  if (
    !form.value.nombre ||
    !form.value.apellidos ||
    !form.value.email ||
    !form.value.tituloObra ||
    !form.value.tipoObra ||
    !form.value.idioma
  ) {
    error.value = 'Por favor, completa todos los campos obligatorios.'
    return
  }

  if (!archivo.value) {
    error.value = 'Debes adjuntar tu obra literaria.'
    return
  }

  if (!form.value.aceptaBases) {
    error.value = 'Debes aceptar las bases del concurso.'
    return
  }

  if (!form.value.declaraAutoria) {
    error.value = 'Debes confirmar que la obra es de tu autoría.'
    return
  }

  /*
    POR AHORA:
    Aquí simulamos el envío.

    Más adelante sustituiremos esta parte por:
    fetch('/api/participaciones', ...)
  */

  enviado.value = true

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

/* =========================
   VOLVER
========================= */

const volverAlPremio = () => {
  router.push('/premio')
}
</script>


<template>

  <main class="participar-page">

    <!-- =========================
         CABECERA
    ========================== -->

    <section class="hero">

      <div class="hero-overlay"></div>

      <div class="hero-content">

        <button
          class="volver"
          @click="volverAlPremio"
        >
          ← Volver al Premio
        </button>

        <span class="small-title">
          PREMIO DE LITERATURA Y POESÍA
        </span>

        <h1>
          Comparte tu historia
        </h1>

        <p>
          Toda historia comienza con alguien que decide escribirla.
        </p>

        <p class="hero-description">
          Este espacio está pensado para recibir nuevas voces,
          relatos, poemas e historias que merecen ser leídas.
        </p>

      </div>

    </section>


    <!-- =========================
         CONTENIDO
    ========================== -->

    <section class="contenido">


      <!-- =========================
           MENSAJE INTRODUCTORIO
      ========================== -->

      <div class="introduccion">

        <div class="numero">
          01
        </div>

        <div>

          <h2>
            Participa en el concurso
          </h2>

          <p>
            Queremos conocer tu manera de mirar el mundo.
            Puedes presentar una obra literaria original
            y dejar que tus palabras encuentren nuevos lectores.
          </p>

          <p>
            Antes de enviar tu propuesta, prepara tu obra en
            <strong>PDF o Word</strong> y completa cuidadosamente
            los datos del formulario.
          </p>

        </div>

      </div>


      <!-- =========================
           PASOS
      ========================== -->

      <div class="pasos">

        <div class="paso">

          <span>1</span>

          <div>
            <strong>Cuéntanos quién eres</strong>
            <p>
              Necesitamos algunos datos básicos para poder
              contactar contigo.
            </p>
          </div>

        </div>


        <div class="paso">

          <span>2</span>

          <div>
            <strong>Háblanos de tu obra</strong>
            <p>
              Indica el título, el tipo de obra, el idioma
              y otros datos literarios.
            </p>
          </div>

        </div>


        <div class="paso">

          <span>3</span>

          <div>
            <strong>Sube tu creación</strong>
            <p>
              Adjunta tu obra en formato PDF o Word.
            </p>
          </div>

        </div>

      </div>


      <!-- =========================
           FORMULARIO
      ========================== -->

      <form
        v-if="!enviado"
        class="formulario"
        @submit.prevent="enviarFormulario"
      >


        <!-- =========================
             BLOQUE 1
        ========================== -->

        <section class="form-section">

          <div class="section-heading">

            <span class="section-number">
              01
            </span>

            <div>
              <h2>
                Sobre ti
              </h2>

              <p>
                Queremos saber quién está detrás de las palabras.
              </p>
            </div>

          </div>


          <div class="grid">

            <div class="campo">

              <label>
                Nombre <span>*</span>
              </label>

              <input
                v-model="form.nombre"
                type="text"
                placeholder="Tu nombre"
              >

            </div>


            <div class="campo">

              <label>
                Apellidos <span>*</span>
              </label>

              <input
                v-model="form.apellidos"
                type="text"
                placeholder="Tus apellidos"
              >

            </div>


            <div class="campo">

              <label>
                Correo electrónico <span>*</span>
              </label>

              <input
                v-model="form.email"
                type="email"
                placeholder="tu@email.com"
              >

            </div>


            <div class="campo">

              <label>
                Teléfono
              </label>

              <input
                v-model="form.telefono"
                type="tel"
                placeholder="+34 000 000 000"
              >

            </div>


            <div class="campo">

              <label>
                País
              </label>

              <input
                v-model="form.pais"
                type="text"
                placeholder="País de origen o residencia"
              >

            </div>


            <div class="campo">

              <label>
                Nombre artístico
              </label>

              <input
                v-model="form.nombreArtistico"
                type="text"
                placeholder="Opcional"
              >

            </div>

          </div>

        </section>


        <!-- =========================
             BLOQUE 2
        ========================== -->

        <section class="form-section">

          <div class="section-heading">

            <span class="section-number">
              02
            </span>

            <div>
              <h2>
                Tu obra
              </h2>

              <p>
                Ahora queremos conocer un poco mejor tu creación.
              </p>
            </div>

          </div>


          <div class="grid">


            <div class="campo campo-grande">

              <label>
                Título de la obra <span>*</span>
              </label>

              <input
                v-model="form.tituloObra"
                type="text"
                placeholder="Escribe aquí el título"
              >

            </div>


            <div class="campo">

              <label>
                Tipo de obra <span>*</span>
              </label>

              <select v-model="form.tipoObra">

                <option value="">
                  Selecciona una opción
                </option>

                <option
                  v-for="tipo in tiposObra"
                  :key="tipo"
                  :value="tipo"
                >
                  {{ tipo }}
                </option>

              </select>

            </div>


            <div class="campo">

              <label>
                Género
              </label>

              <select v-model="form.genero">

                <option value="">
                  Selecciona un género
                </option>

                <option
                  v-for="genero in generos"
                  :key="genero"
                  :value="genero"
                >
                  {{ genero }}
                </option>

              </select>

            </div>


            <div class="campo">

              <label>
                Idioma de la obra <span>*</span>
              </label>

              <select v-model="form.idioma">

                <option value="">
                  Selecciona un idioma
                </option>

                <option
                  v-for="idioma in idiomas"
                  :key="idioma"
                  :value="idioma"
                >
                  {{ idioma }}
                </option>

              </select>

            </div>


            <div class="campo">

              <label>
                Número aproximado de palabras
              </label>

              <input
                v-model="form.numeroPalabras"
                type="number"
                min="0"
                placeholder="Ej. 2500"
              >

            </div>


            <div class="campo campo-completo">

              <label>
                Cuéntanos brevemente tu obra
              </label>

              <textarea
                v-model="form.sinopsis"
                rows="5"
                placeholder="Puedes contarnos brevemente de qué trata tu obra..."
              ></textarea>

            </div>


            <div class="campo campo-completo">

              <label>
                Comentarios adicionales
              </label>

              <textarea
                v-model="form.comentarios"
                rows="4"
                placeholder="Si quieres añadir alguna información, puedes hacerlo aquí."
              ></textarea>

            </div>

          </div>

        </section>


        <!-- =========================
             BLOQUE 3
        ========================== -->

        <section class="form-section">

          <div class="section-heading">

            <span class="section-number">
              03
            </span>

            <div>

              <h2>
                Tu manuscrito
              </h2>

              <p>
                Este es el momento de compartir tu obra.
              </p>

            </div>

          </div>


          <label class="upload-box">

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              @change="seleccionarArchivo"
            >

            <div class="upload-icon">
              ↑
            </div>

            <strong v-if="!nombreArchivo">
              Sube aquí tu obra
            </strong>

            <strong v-else>
              {{ nombreArchivo }}
            </strong>

            <span v-if="!nombreArchivo">
              PDF o Word · máximo 10 MB
            </span>

            <span v-else>
              Archivo preparado para enviar
            </span>

          </label>

        </section>


        <!-- =========================
             DECLARACIONES
        ========================== -->

        <section class="declaraciones">

          <label class="check">

            <input
              v-model="form.aceptaBases"
              type="checkbox"
            >

            <span>
              He leído y acepto las bases y condiciones
              del concurso.
            </span>

          </label>


          <label class="check">

            <input
              v-model="form.declaraAutoria"
              type="checkbox"
            >

            <span>
              Declaro que la obra presentada es de mi autoría
              y que los datos facilitados son correctos.
            </span>

          </label>

        </section>


        <!-- =========================
             ERROR
        ========================== -->

        <div
          v-if="error"
          class="error-message"
        >
          {{ error }}
        </div>


        <!-- =========================
             BOTÓN
        ========================== -->

        <div class="submit-area">

          <p>
            Revisa los datos antes de enviar tu participación.
          </p>

          <button
            type="submit"
            class="submit-button"
          >
            Enviar mi obra
            <span>→</span>
          </button>

        </div>

      </form>


      <!-- =========================
           CONFIRMACIÓN
      ========================== -->

      <section
        v-else
        class="confirmacion"
      >

        <div class="confirmacion-icon">
          ✓
        </div>

        <span class="small-title">
          PARTICIPACIÓN RECIBIDA
        </span>

        <h2>
          Gracias por compartir tu historia
        </h2>

        <p>
          Hemos recibido tu participación.
          Tus palabras ya forman parte de este espacio dedicado
          a la literatura y a las nuevas voces.
        </p>

        <p>
          Conserva una copia de tu obra y permanece atento/a
          a las comunicaciones relacionadas con el concurso.
        </p>

        <button
          class="back-button"
          @click="volverAlPremio"
        >
          Volver al Premio
        </button>

      </section>

    </section>

  </main>

</template>


<style scoped>

/* =========================
   GENERAL
========================= */

* {
  box-sizing: border-box;
}

.participar-page {
  min-height: 100vh;
  background: #f7f3ec;
  color: #29251f;
  font-family:
    Georgia,
    'Times New Roman',
    serif;
}


/* =========================
   HERO
========================= */

.hero {
  position: relative;
  min-height: 460px;

  display: flex;
  align-items: center;

  background-image:
    linear-gradient(
      rgba(32, 27, 22, 0.55),
      rgba(32, 27, 22, 0.65)
    ),
    url('/fotos/premio/Biblioteca de sueños junto al mar.png');

  background-size: cover;
  background-position: center;

  color: white;
}

.hero-content {
  position: relative;
  z-index: 2;

  width: min(1100px, 90%);
  margin: 0 auto;

  padding: 70px 0;
}

.volver {
  border: 0;
  background: transparent;
  color: white;

  font-family: inherit;
  font-size: 16px;

  cursor: pointer;

  margin-bottom: 55px;

  opacity: 0.9;
}

.volver:hover {
  opacity: 1;
  transform: translateX(-3px);
}

.small-title {
  display: block;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  font-size: 12px;
  letter-spacing: 3px;
  font-weight: 700;

  margin-bottom: 20px;
}

.hero h1 {
  margin: 0 0 18px;

  font-size: clamp(46px, 7vw, 82px);
  line-height: 0.95;
  font-weight: 400;
}

.hero p {
  max-width: 720px;

  font-size: 25px;
  line-height: 1.4;

  margin: 0 0 12px;
}

.hero-description {
  max-width: 620px !important;

  font-size: 17px !important;
  line-height: 1.7 !important;

  opacity: 0.9;
}


/* =========================
   CONTENIDO
========================= */

.contenido {
  width: min(1050px, 90%);
  margin: 0 auto;

  padding: 85px 0 110px;
}


/* =========================
   INTRODUCCIÓN
========================= */

.introduccion {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 30px;

  max-width: 850px;

  margin: 0 auto 65px;
}

.numero {
  font-family:
    Arial,
    Helvetica,
    sans-serif;

  font-size: 14px;
  letter-spacing: 2px;

  color: #9b7258;
  padding-top: 9px;
}

.introduccion h2 {
  margin: 0 0 20px;

  font-size: 38px;
  font-weight: 400;
}

.introduccion p {
  margin: 0 0 12px;

  font-size: 18px;
  line-height: 1.8;

  color: #665f57;
}


/* =========================
   PASOS
========================= */

.pasos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  border-top: 1px solid #d9d0c4;
  border-bottom: 1px solid #d9d0c4;

  margin-bottom: 75px;
}

.paso {
  display: flex;
  gap: 18px;

  padding: 30px 25px;

  border-right: 1px solid #d9d0c4;
}

.paso:last-child {
  border-right: none;
}

.paso > span {
  flex-shrink: 0;

  width: 35px;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #9b7258;
  border-radius: 50%;

  color: #9b7258;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
}

.paso strong {
  display: block;

  margin-bottom: 8px;

  font-size: 17px;
}

.paso p {
  margin: 0;

  color: #777067;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  font-size: 13px;
  line-height: 1.6;
}


/* =========================
   FORMULARIO
========================= */

.formulario {
  background: white;

  border: 1px solid #e1d9ce;

  box-shadow:
    0 20px 60px rgba(55, 43, 30, 0.07);
}


/* =========================
   SECCIONES
========================= */

.form-section {
  padding: 55px;

  border-bottom: 1px solid #e7dfd5;
}

.section-heading {
  display: flex;
  gap: 25px;

  margin-bottom: 40px;
}

.section-number {
  font-family: Arial, Helvetica, sans-serif;

  font-size: 12px;
  letter-spacing: 2px;

  color: #9b7258;

  padding-top: 8px;
}

.section-heading h2 {
  margin: 0 0 8px;

  font-size: 30px;
  font-weight: 400;
}

.section-heading p {
  margin: 0;

  color: #81786e;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}


/* =========================
   GRID
========================= */

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 25px;
}

.campo {
  display: flex;
  flex-direction: column;
}

.campo-grande {
  grid-column: span 2;
}

.campo-completo {
  grid-column: span 2;
}

.campo label {
  margin-bottom: 9px;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  font-size: 13px;
  font-weight: 700;

  color: #49443e;
}

.campo label span {
  color: #a45e51;
}

.campo input,
.campo select,
.campo textarea {

  width: 100%;

  border: 1px solid #d9d0c4;

  background: #fcfaf7;

  padding: 14px 15px;

  border-radius: 2px;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  font-size: 14px;

  color: #332e29;

  outline: none;

  transition:
    border-color 0.2s,
    background 0.2s;
}

.campo input:focus,
.campo select:focus,
.campo textarea:focus {
  border-color: #9b7258;
  background: white;
}

.campo textarea {
  resize: vertical;
  line-height: 1.6;
}


/* =========================
   UPLOAD
========================= */

.upload-box {
  min-height: 230px;

  border: 2px dashed #cfc3b5;

  background: #fcfaf7;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  cursor: pointer;

  transition:
    border-color 0.2s,
    background 0.2s;
}

.upload-box:hover {
  border-color: #9b7258;
  background: #faf6ef;
}

.upload-box input {
  display: none;
}

.upload-icon {
  width: 58px;
  height: 58px;

  border: 1px solid #9b7258;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #9b7258;

  font-family: Arial, Helvetica, sans-serif;

  font-size: 25px;

  margin-bottom: 18px;
}

.upload-box strong {
  font-size: 19px;
  font-weight: 400;

  margin-bottom: 8px;
}

.upload-box span {
  color: #847b72;

  font-family: Arial, Helvetica, sans-serif;

  font-size: 12px;
}


/* =========================
   DECLARACIONES
========================= */

.declaraciones {
  padding: 35px 55px;

  background: #faf7f2;
}

.check {
  display: flex;
  align-items: flex-start;

  gap: 13px;

  margin-bottom: 17px;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  font-size: 13px;
  line-height: 1.6;

  color: #5f5851;

  cursor: pointer;
}

.check:last-child {
  margin-bottom: 0;
}

.check input {
  margin-top: 4px;

  width: 16px;
  height: 16px;

  accent-color: #8e6953;
}


/* =========================
   ERROR
========================= */

.error-message {
  margin: 30px 55px 0;

  padding: 15px 18px;

  background: #f9e9e5;

  border-left: 3px solid #a45e51;

  color: #7d433a;

  font-family: Arial, Helvetica, sans-serif;

  font-size: 13px;
}


/* =========================
   ENVIAR
========================= */

.submit-area {
  padding: 40px 55px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 30px;
}

.submit-area p {
  margin: 0;

  color: #81786e;

  font-family: Arial, Helvetica, sans-serif;

  font-size: 12px;
  line-height: 1.5;

  max-width: 380px;
}

.submit-button {
  border: none;

  background: #302b26;
  color: white;

  padding: 17px 28px;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  font-size: 13px;
  font-weight: 700;

  cursor: pointer;

  transition:
    transform 0.2s,
    background 0.2s;
}

.submit-button span {
  margin-left: 15px;
  font-size: 18px;
}

.submit-button:hover {
  background: #8e6953;
  transform: translateY(-2px);
}


/* =========================
   CONFIRMACIÓN
========================= */

.confirmacion {
  max-width: 720px;

  margin: 40px auto;

  padding: 80px 50px;

  text-align: center;

  background: white;

  border: 1px solid #e1d9ce;

  box-shadow:
    0 20px 60px rgba(55, 43, 30, 0.07);
}

.confirmacion-icon {
  width: 70px;
  height: 70px;

  margin: 0 auto 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #8e6953;
  border-radius: 50%;

  color: #8e6953;

  font-size: 30px;
}

.confirmacion h2 {
  margin: 0 0 20px;

  font-size: 38px;
  font-weight: 400;
}

.confirmacion p {
  max-width: 570px;

  margin: 0 auto 15px;

  color: #6d665e;

  font-size: 17px;
  line-height: 1.8;
}

.back-button {
  margin-top: 25px;

  padding: 15px 25px;

  border: none;

  background: #302b26;
  color: white;

  cursor: pointer;

  font-family: Arial, Helvetica, sans-serif;
}

.back-button:hover {
  background: #8e6953;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 800px) {

  .hero {
    min-height: 430px;
  }

  .hero-content {
    padding: 50px 0;
  }

  .hero h1 {
    font-size: 52px;
  }

  .hero p {
    font-size: 20px;
  }

  .introduccion {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .pasos {
    grid-template-columns: 1fr;
  }

  .paso {
    border-right: none;
    border-bottom: 1px solid #d9d0c4;
  }

  .paso:last-child {
    border-bottom: none;
  }

  .form-section {
    padding: 35px 25px;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .campo-grande,
  .campo-completo {
    grid-column: span 1;
  }

  .declaraciones {
    padding: 30px 25px;
  }

  .submit-area {
    padding: 30px 25px;

    flex-direction: column;
    align-items: stretch;
  }

  .submit-button {
    width: 100%;
  }

  .error-message {
    margin-left: 25px;
    margin-right: 25px;
  }

  .confirmacion {
    padding: 60px 25px;
  }

}


@media (max-width: 500px) {

  .contenido {
    width: 94%;
  }

  .hero-content {
    width: 90%;
  }

  .hero h1 {
    font-size: 43px;
  }

  .introduccion h2 {
    font-size: 31px;
  }

  .section-heading h2 {
    font-size: 26px;
  }

}
</style>