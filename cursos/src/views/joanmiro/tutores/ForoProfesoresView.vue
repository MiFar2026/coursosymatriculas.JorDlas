
<template>
  <main class="foro">
    <header class="cabecera">
      <button class="volver" type="button" @click="volverPerfil">
        <span aria-hidden="true">←</span> Volver al perfil
      </button>

      <div class="hero">
        <div class="icono-hero" aria-hidden="true">💬</div>
        <span class="sobre-titulo">COMUNIDAD EDUCATIVA</span>
        <h1>Espai Docent</h1>
        <p>
          Un espacio para compartir ideas, resolver dudas y colaborar
          entre los equipos docentes de Ateneu y de la Biblioteca Joan Miró.
        </p>

        <div class="escuelas">
          <span class="escuela escuela-ateneu">● Ateneu</span>
          <span class="escuela escuela-joanmiro">● Joan Miró</span>
          <span class="privado">🔒 Foro privado</span>
        </div>
      </div>
    </header>

    <section class="panel publicar">
      <div class="titulo-seccion">
        <div class="icono-seccion">✍️</div>
        <div>
          <h2>Comparte una idea</h2>
          <p>¿Qué quieres compartir con el equipo docente?</p>
        </div>
      </div>

      <form @submit.prevent="publicar">
        <label for="titulo">Título del mensaje</label>
        <input
          id="titulo"
          v-model="titulo"
          maxlength="200"
          required
          placeholder="Ej. Propuesta para la próxima reunión"
        />

        <label for="mensaje">Tu mensaje</label>
        <textarea
          id="mensaje"
          v-model="mensaje"
          maxlength="5000"
          rows="5"
          required
          placeholder="Escribe aquí tu propuesta, pregunta o idea..."
        ></textarea>

        <div class="pie-formulario">
          <span class="ayuda">Comparte tus ideas con respeto y claridad.</span>
          <button class="boton-principal" type="submit" :disabled="publicando">
            {{ publicando ? 'Publicando…' : 'Publicar mensaje ↗' }}
          </button>
        </div>
      </form>

      <p v-if="aviso" class="aviso" role="status">✓ {{ aviso }}</p>
      <p v-if="error" class="error" role="alert">{{ error }}</p>
    </section>

    <section class="mensajes">
      <div class="titulo-mensajes">
        <div>
          <span class="sobre-titulo">CONVERSACIONES</span>
          <h2>El tablón del profesorado</h2>
          <p>Ideas y novedades compartidas por el equipo.</p>
        </div>

        <button
          class="boton-secundario"
          type="button"
          @click="cargarMensajes"
          :disabled="cargando"
        >
          {{ cargando ? 'Cargando…' : '↻ Actualizar' }}
        </button>
      </div>

      <div v-if="cargando && !mensajes.length" class="estado-vacio">
        <span class="estado-icono">⏳</span>
        <h3>Cargando conversaciones</h3>
        <p>Un momento, estamos buscando los mensajes.</p>
      </div>

      <div v-else-if="!mensajes.length" class="estado-vacio">
        <span class="estado-icono">🌱</span>
        <h3>¡Aquí empieza la conversación!</h3>
        <p>Todavía no hay mensajes. Anímate a publicar el primero.</p>
      </div>

      <article
        v-for="item in mensajes"
        :key="item.id"
        class="mensaje-card"
      >
        <div class="etiquetas">
          <span
            class="escuela"
            :class="claseEscuela(item.escuela)"
          >
            {{ item.escuela }}
          </span>
          <time
            v-if="item.fechaCreacion"
            :datetime="fechaISO(item.fechaCreacion)"
          >
            {{ fechaLegible(item.fechaCreacion) }}
          </time>
        </div>

        <h3>{{ item.titulo }}</h3>

        
<div class="autor">
  <img
    v-if="item.foto"
    class="avatar avatar-foto"
    :src="`${base}${item.foto}`"
    :alt="`Foto de ${item.nombreProfesor}`"
    @error="(evento) => evento.target.style.display = 'none'"
  />
  <span v-else class="avatar" aria-hidden="true">
    {{ iniciales(item.nombreProfesor, item.apellidosProfesor) }}
  </span>

  <div>
    <strong>
      {{ item.nombreProfesor }} {{ item.apellidosProfesor }}
    </strong>
    <span>Equipo docente</span>
  </div>
</div>

<p class="contenido">{{ item.mensaje }}</p>

<section class="respuestas">
  <h4>Respuestas ({{ item.respuestas?.length || 0 }})</h4>

  <div
    v-for="respuesta in (item.respuestas || [])"
    :key="respuesta.id"
    class="respuesta"
  >
    <div class="autor">
      <img
        v-if="respuesta.foto"
        class="avatar avatar-foto"
        :src="`${base}${respuesta.foto}`"
        :alt="`Foto de ${respuesta.nombreProfesor}`"
        @error="(evento) => evento.target.style.display = 'none'"
      />
      <span v-else class="avatar" aria-hidden="true">
        {{ iniciales(respuesta.nombreProfesor, respuesta.apellidosProfesor) }}
      </span>

      <div>
        <strong>
          {{ respuesta.nombreProfesor }} {{ respuesta.apellidosProfesor }}
        </strong>
        <span>{{ respuesta.escuela }} · {{ fechaLegible(respuesta.fechaCreacion) }}</span>
      </div>
    </div>

    <p class="contenido">{{ respuesta.respuesta }}</p>
  </div>

  <form @submit.prevent="responder(item)">
    <label :for="`respuesta-${item.id}`">Escribe una respuesta</label>
    <textarea
      :id="`respuesta-${item.id}`"
      v-model="textosRespuesta[item.id]"
      maxlength="5000"
      rows="3"
      required
      placeholder="Comparte tu respuesta con el equipo docente..."
    ></textarea>

    <button
      class="boton-principal"
      type="submit"
      :disabled="respondiendo === item.id"
    >
      {{ respondiendo === item.id ? 'Enviando…' : 'Responder ↗' }}
    </button>
  </form>
</section>

      </article>
    </section>

    <footer class="pie-pagina">
      <span>💚</span>
      Un espacio para aprender y crecer en equipo.
    </footer>
  </main>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const base = (import.meta.env.VITE_API_URL || 'http://localhost:5555')
  .replace(/\/+$/, '')

const titulo = ref('')
const mensaje = ref('')
const mensajes = ref([])
const cargando = ref(false)
const publicando = ref(false)
const aviso = ref('')
const error = ref('')
const textosRespuesta = ref({})
const respondiendo = ref(null)

const volverPerfil = () => {
  router.push('/ateneu/tutores/perfil')
}

const comprobarSesion = async () => {
  const respuesta = await fetch(`${base}/api/acceso-profesor/session`, {
    credentials: 'include',
    headers: { Accept: 'application/json' }
  })

  const resultado = await respuesta.json().catch(() => ({}))

  if (
    !respuesta.ok ||
    !resultado.ok ||
    !resultado.profesor ||
  ![1, 2].includes(Number(resultado.profesor.escuelaId))
  ) {
    router.replace('/ateneu/tutores/acceso')
    return false
  }

  return true
}

const cargarMensajes = async () => {
  cargando.value = true
  error.value = ''

  try {
    const respuesta = await fetch(`${base}/api/foro-profesores`, {
      credentials: 'include',
      headers: { Accept: 'application/json' }
    })

    const resultado = await respuesta.json().catch(() => ({}))

    if (respuesta.status === 401 || respuesta.status === 403) {
      router.replace('/ateneu/tutores/acceso')
      return
    }

    if (!respuesta.ok || !resultado.ok) {
      throw new Error(
        resultado.mensaje || 'No se han podido cargar los mensajes.'
      )
    }

    mensajes.value = Array.isArray(resultado.mensajes)
      ? resultado.mensajes
      : []
  } catch (e) {
    error.value = e.message || 'Error al cargar los mensajes.'
  } finally {
    cargando.value = false
  }
}

const publicar = async () => {
  aviso.value = ''
  error.value = ''

  const tituloLimpio = titulo.value.trim()
  const mensajeLimpio = mensaje.value.trim()

  if (!tituloLimpio || !mensajeLimpio) {
    error.value = 'Escribe un título y un mensaje.'
    return
  }

  publicando.value = true

  try {
    const respuesta = await fetch(`${base}/api/foro-profesores`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        titulo: tituloLimpio,
        mensaje: mensajeLimpio
      })
    })

    const resultado = await respuesta.json().catch(() => ({}))

    if (respuesta.status === 401 || respuesta.status === 403) {
      router.replace('/ateneu/tutores/acceso')
      return
    }

    if (!respuesta.ok || !resultado.ok) {
      throw new Error(
        resultado.mensaje || 'No se ha podido publicar el mensaje.'
      )
    }

    titulo.value = ''
    mensaje.value = ''
    aviso.value = 'Mensaje publicado correctamente.'

    await cargarMensajes()
  } catch (e) {
    error.value = e.message || 'Error al publicar el mensaje.'
  } finally {
    publicando.value = false
  }
}

const responder = async (item) => {
  aviso.value = ''
  error.value = ''

  const texto = String(textosRespuesta.value[item.id] || '').trim()

  if (!texto) {
    error.value = 'Escribe una respuesta antes de enviarla.'
    return
  }

  respondiendo.value = item.id

  try {
    const respuesta = await fetch(
      `${base}/api/foro-profesores/${item.id}/respuestas`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ respuesta: texto })
      }
    )

    const resultado = await respuesta.json().catch(() => ({}))

    if (respuesta.status === 401 || respuesta.status === 403) {
      router.replace('/ateneu/tutores/acceso')
      return
    }

    if (!respuesta.ok || !resultado.ok) {
      throw new Error(
        resultado.mensaje || 'No se ha podido publicar la respuesta.'
      )
    }

    textosRespuesta.value[item.id] = ''
    aviso.value = 'Respuesta publicada correctamente.'

    await cargarMensajes()
  } catch (e) {
    error.value = e.message || 'Error al publicar la respuesta.'
  } finally {
    respondiendo.value = null
  }
}

const iniciales = (nombre = '', apellidos = '') => {
  const resultado = `${nombre.trim().charAt(0)}${apellidos.trim().charAt(0)}`
    .toUpperCase()

  return resultado || 'P'
}

const claseEscuela = (escuela = '') => {
  const nombre = escuela.toLowerCase()

  return nombre.includes('ateneu')
    ? 'escuela-ateneu'
    : 'escuela-joan'
}

const fechaISO = (fecha) => {
  const date = new Date(fecha)

  return Number.isNaN(date.getTime())
    ? ''
    : date.toISOString()
}

const fechaLegible = (fecha) => {
  const date = new Date(fecha)

  if (Number.isNaN(date.getTime())) {
    return fecha || ''
  }

  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)
}

onMounted(async () => {
  try {
    if (await comprobarSesion()) {
      await cargarMensajes()
    }
  } catch (e) {
    console.error('Error al comprobar la sesión del profesor:', e)
    router.replace('/ateneu/tutores/acceso')
  }
})
</script>


<style scoped>
.foro {
  --verde: #176b61;
  --verde-oscuro: #124c46;
  --texto: #233b36;
  --suave: #687b74;
  max-width: 1000px;
  margin: 0 auto;
  padding: 28px 22px 45px;
  color: var(--texto);
}

.cabecera {
  margin-bottom: 28px;
}

.volver,
.boton-secundario {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  border: 1px solid #d9e5df;
  border-radius: 12px;
  background: #fff;
  color: var(--texto);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s, transform .2s, border-color .2s;
}

.volver:hover,
.boton-secundario:hover {
  background: #edf6f1;
  border-color: #b8d5c8;
  transform: translateY(-1px);
}

.hero {
  position: relative;
  overflow: hidden;
  margin-top: 22px;
  padding: clamp(26px, 5vw, 46px);
  border-radius: 26px;
  background: linear-gradient(130deg, #124c46, #218578);
  color: #fff;
  box-shadow: 0 14px 35px #174e4220;
}

.hero::after {
  content: "";
  position: absolute;
  width: 230px;
  height: 230px;
  right: -70px;
  top: -95px;
  border: 35px solid #ffffff12;
  border-radius: 50%;
  pointer-events: none;
}

.icono-hero {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  margin-bottom: 20px;
  border-radius: 17px;
  background: #ffffff20;
  font-size: 27px;
}

.sobre-titulo {
  color: #72cabb;
  font-size: .75rem;
  font-weight: 800;
  letter-spacing: .15em;
}

.hero h1 {
  margin: 8px 0 12px;
  font-size: clamp(2rem, 5vw, 3.1rem);
  line-height: 1.1;
  letter-spacing: -.04em;
}

.hero > p {
  max-width: 650px;
  margin: 0;
  color: #e1f2ed;
  line-height: 1.8;
}

.escuelas {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 24px;
}

.escuela,
.privado {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 11px;
  border-radius: 100px;
  font-size: .82rem;
  font-weight: 700;
}

.escuela-ateneu {
  background: #e0f3e9;
  color: #176448;
}

.escuela-joanmiro {
  background: #fff0d8;
  color: #86591b;
}

.privado {
  background: #ffffff18;
  color: #fff;
}

.panel,
.mensaje-card,
.estado-vacio {
  background: #fff;
  border: 1px solid #e3ebe6;
  border-radius: 20px;
  box-shadow: 0 7px 24px #244d3d08;
}

.publicar {
  padding: clamp(20px, 4vw, 30px);
  margin-bottom: 42px;
}

.titulo-seccion {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}

.icono-seccion {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 15px;
  background: #e7f4ee;
  font-size: 23px;
}

.titulo-seccion h2,
.titulo-mensajes h2 {
  margin: 0 0 5px;
  font-size: 1.35rem;
  letter-spacing: -.025em;
}

.titulo-seccion p,
.titulo-mensajes p {
  margin: 0;
  color: var(--suave);
  font-size: .94rem;
  line-height: 1.6;
}

form {
  display: grid;
  gap: 10px;
}

form label {
  margin-top: 5px;
  font-size: .9rem;
  font-weight: 700;
}

input,
textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 13px 15px;
  border: 1px solid #d9e5df;
  border-radius: 12px;
  background: #fbfdfb;
  color: var(--texto);
  font: inherit;
  transition: border-color .2s, box-shadow .2s, background .2s;
}

input::placeholder,
textarea::placeholder {
  color: #9aa9a2;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #409d8b;
  background: #fff;
  box-shadow: 0 0 0 4px #21857819;
}

textarea {
  resize: vertical;
  min-height: 130px;
  line-height: 1.6;
}

.pie-formulario {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 8px;
}

.ayuda {
  color: var(--suave);
  font-size: .82rem;
}

.boton-principal {
  padding: 12px 19px;
  border: 0;
  border-radius: 12px;
  background: var(--verde);
  color: #fff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 5px 12px #176b6128;
  transition: background .2s, transform .2s, box-shadow .2s;
}

.boton-principal:hover:not(:disabled) {
  background: var(--verde-oscuro);
  transform: translateY(-2px);
  box-shadow: 0 8px 17px #176b6130;
}

button:disabled {
  opacity: .6;
  cursor: wait;
}

.aviso,
.error {
  margin: 16px 0 0;
  padding: 12px 14px;
  border-radius: 10px;
  line-height: 1.5;
}

.aviso {
  background: #e7f6ec;
  color: #176b3a;
}

.error {
  background: #fff0ef;
  color: #b42318;
}

.mensajes {
  display: grid;
  gap: 16px;
}

.titulo-mensajes {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 6px;
}

.titulo-mensajes .sobre-titulo {
  display: block;
  margin-bottom: 9px;
  color: var(--verde);
}

.titulo-mensajes h2 {
  font-size: clamp(1.4rem, 3vw, 1.8rem);
}

.boton-secundario:disabled {
  cursor: wait;
}

.mensaje-card {
  padding: clamp(20px, 3.5vw, 27px);
  transition: transform .2s, box-shadow .2s;
}

.mensaje-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px #244d3d12;
}

.etiquetas {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.etiquetas time {
  color: #87958e;
  font-size: .82rem;
}

.mensaje-card h3 {
  margin: 18px 0 15px;
  font-size: 1.3rem;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

.autor {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 17px;
}

.avatar {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #dcefe7;
  color: var(--verde);
  font-size: .85rem;
  font-weight: 800;
}

.autor strong,
.autor div > span {
  display: block;
}

.autor strong {
  font-size: .91rem;
}

.autor div > span {
  margin-top: 3px;
  color: var(--suave);
  font-size: .8rem;
}

.contenido {
  margin: 0;
  padding-top: 16px;
  border-top: 1px solid #edf1ee;
  color: #4d6259;
  line-height: 1.8;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.estado-vacio {
  padding: 35px 20px;
  text-align: center;
  border-style: dashed;
  background: #fbfdfb;
}

.estado-icono {
  display: block;
  margin-bottom: 12px;
  font-size: 2rem;
}

.estado-vacio h3 {
  margin: 0 0 8px;
}

.estado-vacio p {
  margin: 0;
  color: var(--suave);
  line-height: 1.6;
}

.pie-pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 35px;
  color: var(--suave);
  font-size: .88rem;
  text-align: center;
}

@media (max-width: 600px) {
  .foro {
    padding: 18px 14px 32px;
  }

  .hero {
    border-radius: 20px;
  }

  .titulo-mensajes {
    align-items: flex-start;
  }

  .boton-secundario {
    width: 100%;
    justify-content: center;
  }

  .pie-formulario {
    align-items: stretch;
    flex-direction: column;
  }

  .boton-principal {
    width: 100%;
  }
}
.avatar-foto {
  display: block;
  object-fit: cover;
}

.respuestas {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid #edf1ee;
}

.respuestas h4 {
  margin: 0 0 16px;
  font-size: 1rem;
}

.respuesta {
  margin-bottom: 18px;
  padding: 15px;
  border-radius: 14px;
  background: #f7faf8;
}

.respuesta .autor {
  margin-bottom: 10px;
}

.respuesta .contenido {
  padding-top: 10px;
}

.respuestas form {
  margin-top: 18px;
}
</style>
