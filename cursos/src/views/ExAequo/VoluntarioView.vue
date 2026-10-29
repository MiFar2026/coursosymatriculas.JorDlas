
<script setup>
import NavbarPrincipal from '../../components/NavbarPrincipal.vue'
import { reactive, ref } from 'vue'

const form = reactive({
  nombre: '',
  apellidos: '',
  anyo_nacimiento: '',
  lugar_residencia: '',
  documento_identidad: '',
  tipo_documento: '',
  telefono: '',
  email: '',
  tarea: '',
  mensaje: '',
  privacidad: false
})

const sending = ref(false)
const status = ref('')
const error = ref(false)

async function submitForm() {
  sending.value = true
  status.value = ''
  error.value = false

  try {
   const base = (
  import.meta.env.VITE_API_URL || 'http://localhost:5555'
).replace(/\/+$/, '')

    const response = await fetch(`${base}/api/voluntarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(
        data.error || 'No se ha podido enviar la solicitud.'
      )
    }

    status.value =
      '¡Gracias por querer formar parte de EXAEQUO! Hemos recibido tu propuesta.'

    Object.assign(form, {
      nombre: '',
      apellidos: '',
      anyo_nacimiento: '',
      lugar_residencia: '',
      documento_identidad: '',
      tipo_documento: '',
      telefono: '',
      email: '',
      tarea: '',
      mensaje: '',
      privacidad: false
    })
  } catch (e) {
    error.value = true
    status.value =
      e.message || 'No se ha podido conectar con el servidor.'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div class="activities-page">
    <NavbarPrincipal />

    <main class="volunteer-page">
      <section class="vol-hero">
        <div>
          <p class="eyebrow">Tu tiempo importa</p>

          <h1>
            La belleza de ayudar es que
            <em>nos transforma a todos.</em>
          </h1>

          <p>
            Una conversación, una clase compartida o una mano tendida
            pueden devolver confianza y abrir nuevas posibilidades.
            El voluntariado no consiste solo en dar: también es escuchar,
            aprender y descubrir todo lo que tenemos en común.
          </p>

          <a class="button" href="#formulario">
            Quiero colaborar ↓
          </a>
        </div>

        <div class="photo-stack">
          <img
            src="/fotos/EXAEQUO/Voluntariado cultural.png"
            alt="Voluntariado en actividades culturales"
          >
          <img
            src="/fotos/EXAEQUO/Voluntariado natural.png"
            alt="Personas voluntarias en un entorno natural"
          >
        </div>
      </section>

      <section class="impact">
        <p class="eyebrow">Un impacto que se multiplica</p>

        <h2>
          Cuando acompañamos a alguien, hacemos más grande el mundo de ambos.
        </h2>

        <div class="impact-grid">
          <article>
            <span>♥</span>
            <h3>Crear vínculos</h3>
            <p>
              Ofrecer tiempo y atención ayuda a que nadie tenga que
              afrontar las dificultades en soledad.
            </p>
          </article>

          <article>
            <span>✦</span>
            <h3>Compartir oportunidades</h3>
            <p>
              Los conocimientos, las lenguas y la experiencia pueden
              convertirse en herramientas para una vida más autónoma.
            </p>
          </article>

          <article>
            <span>↗</span>
            <h3>Construir comunidad</h3>
            <p>
              La diversidad nos enriquece. Cuando participamos,
              la inclusión deja de ser una idea y se convierte en una práctica.
            </p>
          </article>
        </div>
      </section>

      <section id="formulario" class="form-section">
        <div class="form-intro">
          <p class="eyebrow">Da el primer paso</p>
          <h2>¿En qué te gustaría ayudar?</h2>
          <p>
            Cuéntanos un poco sobre ti y qué te gustaría aportar.
            Nos pondremos en contacto contigo para conversar sobre
            las posibilidades de colaboración.
          </p>
        </div>

        <form class="vol-form" @submit.prevent="submitForm">
          <div class="form-grid">
            <label>
              Nombre
              <input
                v-model.trim="form.nombre"
                required
                maxlength="100"
                autocomplete="given-name"
              >
            </label>

            <label>
              Apellidos
              <input
                v-model.trim="form.apellidos"
                required
                maxlength="150"
                autocomplete="family-name"
              >
            </label>

            <label>
              Año de nacimiento
              <input
                v-model.number="form.anyo_nacimiento"
                type="number"
                min="1900"
                :max="new Date().getFullYear()"
                required
              >
            </label>

            <label>
              Lugar de residencia
              <input
                v-model.trim="form.lugar_residencia"
                required
                maxlength="150"
                autocomplete="address-level2"
                placeholder="Ciudad o municipio"
              >
            </label>

           <label>
  Tipo de documento
  <select
    v-model="form.tipo_documento"
    required
  >
    <option disabled value="">
      Selecciona el tipo de documento
    </option>
    <option value="DNI">DNI</option>
    <option value="NIE">NIE</option>
    <option value="PASAPORTE">Pasaporte</option>
  </select>
</label>

<label>
  Número de documento
  <input
    v-model.trim="form.documento_identidad"
    required
    maxlength="40"
    autocomplete="off"
    placeholder="Número de DNI, NIE o pasaporte"
  >
</label>

            <label>
              Teléfono
              <input
                v-model.trim="form.telefono"
                type="tel"
                required
                maxlength="30"
                autocomplete="tel"
              >
            </label>

            <label>
              Correo electrónico
              <input
                v-model.trim="form.email"
                type="email"
                required
                maxlength="254"
                autocomplete="email"
              >
            </label>

            <label>
              Tarea de voluntariado
              <select v-model="form.tarea" required>
                <option disabled value="">
                  Selecciona una opción
                </option>
                <option value="profesor">Profesor/a</option>
                <option value="acompanante">Acompañante</option>
                <option value="comida">
                  Preparar y repartir comida
                </option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="administrativo">Administración</option>
                <option value="esponsor_financiero">
                  Espónsor financiero
                </option>
              </select>
            </label>
          </div>

          <label>
            Mensaje
            <textarea
              v-model.trim="form.mensaje"
              required
              rows="5"
              maxlength="3000"
              placeholder="Cuéntanos tu experiencia, disponibilidad y qué te gustaría aportar."
            ></textarea>
          </label>

          <label class="consent">
            <input
              v-model="form.privacidad"
              type="checkbox"
              required
            >
            <span>
              He leído la información de privacidad y acepto el
              tratamiento de mis datos para gestionar mi solicitud
              de voluntariado.
            </span>
          </label>

          <button
            class="button"
            type="submit"
            :disabled="sending"
          >
            {{ sending ? 'Enviando…' : 'Enviar mi propuesta ↗' }}
          </button>

          <p
            v-if="status"
            class="status"
            :class="{ error }"
            role="status"
            aria-live="polite"
          >
            {{ status }}
          </p>
        </form>
      </section>
    </main>
  </div>
</template>

<style scoped>
.volunteer-page {
  background: #fbf9f4;
  color: #33473d;
}

.vol-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7%;
  align-items: center;
  padding: 75px max(6vw, 24px);
  background: #f0eadf;
}

.vol-hero > div:first-child {
  max-width: 650px;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: .15em;
  color: #b76545;
  font-weight: 800;
  font-size: .75rem;
}

.vol-hero h1 {
  font-size: clamp(2.8rem, 5vw, 4.8rem);
  line-height: 1.03;
  letter-spacing: -.05em;
  color: #204537;
  margin: 15px 0;
}

.vol-hero h1 em {
  font-family: Georgia, serif;
  color: #b76545;
  font-weight: 500;
}

.vol-hero p:not(.eyebrow) {
  line-height: 1.85;
  color: #59675f;
  font-size: 1.05rem;
}

.button {
  display: inline-block;
  border: 0;
  border-radius: 999px;
  background: #214f42;
  color: #fff;
  padding: 14px 21px;
  font: inherit;
  font-weight: 750;
  text-decoration: none;
  cursor: pointer;
  margin-top: 15px;
}

.button:disabled {
  opacity: .65;
  cursor: wait;
}

.photo-stack {
  position: relative;
  min-height: 470px;
}

.photo-stack img {
  position: absolute;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 20px 45px #183a2c24;
}

.photo-stack img:first-child {
  width: 72%;
  height: 330px;
  top: 0;
  left: 0;
}

.photo-stack img:last-child {
  width: 68%;
  height: 290px;
  right: 0;
  bottom: 0;
  border: 8px solid #f0eadf;
}

.impact {
  text-align: center;
  padding: 80px 24px;
}

.impact h2 {
  max-width: 800px;
  margin: 12px auto 40px;
  color: #204537;
  font-size: clamp(2rem, 4vw, 3.2rem);
  letter-spacing: -.04em;
}

.impact-grid {
  max-width: 1100px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  text-align: left;
}

.impact-grid article {
  padding: 27px;
  border: 1px solid #e7e0d5;
  border-radius: 18px;
  background: #fffdf9;
}

.impact-grid span {
  font-size: 1.6rem;
  color: #b76545;
}

.impact-grid h3 {
  color: #214f42;
}

.impact-grid p {
  color: #68736b;
  line-height: 1.75;
}

.form-section {
  background: #e7eee5;
  padding: 75px 24px;
  display: grid;
  grid-template-columns: .8fr 1.2fr;
  gap: 8%;
  justify-content: center;
}

.form-intro {
  max-width: 400px;
}

.form-intro h2 {
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.05;
  letter-spacing: -.04em;
  color: #204537;
}

.form-intro p:last-child {
  line-height: 1.8;
  color: #59675f;
}

.vol-form {
  min-width: 0;
  background: #fffdf9;
  border-radius: 22px;
  padding: clamp(22px, 4vw, 38px);
  box-shadow: 0 15px 45px #214f4210;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.vol-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #344a3e;
  font-weight: 700;
  font-size: .92rem;
  margin-bottom: 18px;
}

.vol-form input:not([type="checkbox"]),
.vol-form textarea,
.vol-form select {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d8ded5;
  border-radius: 10px;
  padding: 13px;
  background: #fff;
  color: #243c31;
  font: inherit;
  outline-color: #709780;
}

.vol-form textarea {
  resize: vertical;
}

.vol-form .consent {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-weight: 500;
  line-height: 1.5;
}

.consent input {
  margin-top: 4px;
  accent-color: #214f42;
  flex-shrink: 0;
}

.status {
  padding: 12px;
  border-radius: 10px;
  background: #e3f2e4;
  color: #245b37;
  overflow-wrap: anywhere;
}

.status.error {
  background: #fbe8e3;
  color: #923c2b;
}

@media (max-width: 760px) {
  .vol-hero {
    grid-template-columns: 1fr;
    padding-top: 50px;
  }

  .photo-stack {
    min-height: 380px;
  }

  .photo-stack img:first-child {
    height: 270px;
  }

  .photo-stack img:last-child {
    height: 230px;
  }

  .impact-grid {
    grid-template-columns: 1fr;
  }

  .form-section {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
