
<template>
  <div class="min-h-screen bg-gray-400">
    <!-- CABECERA -->
    <header class="border-b border-gray-200 bg-gray-100 px-4 py-4 shadow-sm">
      <div class="mx-auto flex max-w-6xl flex-wrap justify-center gap-4">
        <router-link
          to="/"
          class="rounded-xl bg-red-950 px-5 py-3 text-lg font-bold text-white hover:bg-red-900"
        >
          ExAequo
        </router-link>

        <router-link
          to="/joanmiro"
          class="rounded-xl bg-red-950 px-5 py-3 text-lg font-bold text-white hover:bg-red-900"
        >
          Biblioteca Joan Miró
        </router-link>

        <router-link
          to="/ateneu"
          class="rounded-xl bg-red-950 px-5 py-3 text-lg font-bold text-white hover:bg-red-900"
        >
          Ateneu Barcelonès
        </router-link>
      </div>
    </header>

    <!-- FORMULARIO DE ACCESO -->
    <main
      class="flex min-h-[calc(100vh-90px)] items-center justify-center px-4 py-10"
    >
      <section
        class="w-full max-w-lg rounded-2xl border border-gray-200 bg-gray-300 p-8 shadow-lg"
      >
        <!-- BOTÓN CERRAR -->
        <div class="mb-6 flex justify-end">
          <button
            type="button"
            @click="cerrarAcceso"
            class="rounded-xl border-2 border-gray-300 bg-white px-5 py-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            ✕ Cerrar
          </button>
        </div>

        <h1 class="mb-3 text-2xl font-bold text-gray-800">
          Acceso del profesorado
        </h1>

        <p class="mb-6 leading-7 text-gray-600">
          Introduce tus datos registrados en la escuela para acceder a tu perfil.
        </p>

        <form class="space-y-5" @submit.prevent="iniciarSesion">
          <!-- DOCUMENTO -->
          <div>
            <label
              for="documento"
              class="mb-2 block font-medium text-gray-700"
            >
              NIE o documento de identidad
            </label>

            <input
              id="documento"
              v-model.trim="documento"
              type="text"
              autocomplete="off"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Introduce tu documento"
            />
          </div>

          <!-- TELÉFONO -->
          <div>
            <label
              for="telefono"
              class="mb-2 block font-medium text-gray-700"
            >
              Teléfono registrado
            </label>

            <input
              id="telefono"
              v-model.trim="telefono"
              type="tel"
              autocomplete="tel"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Introduce tu teléfono"
            />
          </div>

          <!-- AÑO DE NACIMIENTO -->
          <div>
            <label
              for="anio"
              class="mb-2 block font-medium text-gray-700"
            >
              Año de nacimiento
            </label>

            <input
              id="anio"
              v-model="anioNacimiento"
              type="number"
              inputmode="numeric"
              min="1900"
              :max="new Date().getFullYear()"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Ej. 1980"
            />
          </div>

          <!-- CORREO ELECTRÓNICO -->
          <div>
            <label
              for="email"
              class="mb-2 block font-medium text-gray-700"
            >
              Correo electrónico registrado
            </label>

            <input
              id="email"
              v-model.trim="email"
              type="email"
              autocomplete="email"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="tu@correo.com"
            />
          </div>

          <!-- RECORDAR Y BORRAR DATOS -->
          <div class="flex flex-wrap items-center gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="recordarDatos"
                type="checkbox"
                class="h-4 w-4"
              />
              <span class="text-gray-700">Recordar mis datos</span>
            </label>

            <button
              type="button"
              @click="borrarDatos"
              class="rounded-lg border border-gray-400 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Borrar datos
            </button>
          </div>

          <p class="text-sm text-gray-600">
            Si activas «Recordar mis datos», se guardarán en este navegador
            hasta que los borres o desactives esta opción.
          </p>

          <!-- MENSAJE DE ERROR -->
          <p
            v-if="mensaje"
            role="alert"
            class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-base text-red-700"
          >
            {{ mensaje }}
          </p>

          <!-- BOTÓN DE ACCESO -->
          <button
            type="submit"
            :disabled="cargando"
            class="w-full rounded-xl bg-blue-700 px-5 py-4 text-lg font-bold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ cargando ? 'Verificando datos...' : 'Entrar en mi perfil' }}
          </button>
        </form>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Datos del formulario.
const documento = ref('')
const telefono = ref('')
const anioNacimiento = ref('')
const email = ref('')

const mensaje = ref('')
const cargando = ref(false)
const recordarDatos = ref(false)

// Detectar la escuela según la dirección actual.
const escuela = route.path.startsWith('/joanmiro/')
  ? 'joanmiro'
  : 'ateneu'

// Cada escuela utiliza una clave de almacenamiento diferente.
const CLAVE_DATOS = escuela === 'joanmiro'
  ? 'exaequo_profesor_datos_joanmiro'
  : 'exaequo_profesor_datos_ateneu'

// Dirección del backend.
const baseAPI = (
  import.meta.env.VITE_API_URL || 'http://localhost:5555'
).replace(/\/+$/, '')

// Cerrar el acceso y volver a la escuela correspondiente.
function cerrarAcceso() {
  const destino = escuela === 'joanmiro'
    ? '/joanmiro'
    : '/ateneu'

  router.push(destino)
}

// Recuperar los datos guardados.
onMounted(() => {
  try {
    const datosGuardados = localStorage.getItem(CLAVE_DATOS)

    if (!datosGuardados) return

    const datos = JSON.parse(datosGuardados)

    if (datos.recordar !== true) return

    documento.value = datos.documento || ''
    telefono.value = datos.telefono || ''
    anioNacimiento.value = datos.anioNacimiento || ''
    email.value = datos.email || ''

    recordarDatos.value = true
  } catch (error) {
    console.error('No se pudieron recuperar los datos guardados.')

    try {
      localStorage.removeItem(CLAVE_DATOS)
    } catch {
      // El navegador puede tener bloqueado el almacenamiento.
    }
  }
})

// Guardar los datos únicamente si se ha marcado la casilla.
watch(
  [documento, telefono, anioNacimiento, email, recordarDatos],
  () => {
    try {
      if (!recordarDatos.value) {
        localStorage.removeItem(CLAVE_DATOS)
        return
      }

      localStorage.setItem(
        CLAVE_DATOS,
        JSON.stringify({
          recordar: true,
          documento: documento.value,
          telefono: telefono.value,
          anioNacimiento: anioNacimiento.value,
          email: email.value
        })
      )
    } catch (error) {
      console.error('No se pudieron guardar los datos en el navegador.')
    }
  }
)

// Borrar todos los campos y los datos almacenados.
function borrarDatos() {
  recordarDatos.value = false
  documento.value = ''
  telefono.value = ''
  anioNacimiento.value = ''
  email.value = ''
  mensaje.value = ''

  try {
    localStorage.removeItem(CLAVE_DATOS)
  } catch (error) {
    console.error('No se pudieron borrar los datos del navegador.')
  }
}

// Verificar los datos del profesor en el backend.
async function iniciarSesion() {
  if (cargando.value) return

  mensaje.value = ''
  cargando.value = true

  try {
    const respuesta = await fetch(
      `${baseAPI}/api/acceso-profesor/login`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          documento: documento.value.trim(),
          telefono: telefono.value.trim(),
          anioNacimiento: Number(anioNacimiento.value),
          email: email.value.trim(),
          escuela
        })
      }
    )

    const resultado = await respuesta.json()

    if (!respuesta.ok || !resultado.ok) {
      throw new Error(
        resultado.mensaje || 'No se han podido verificar los datos.'
      )
    }

    // Comprobar que el servidor reconoce la sesión creada.
    const comprobacion = await fetch(
      `${baseAPI}/api/acceso-profesor/session`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json'
        }
      }
    )

    const sesion = await comprobacion.json()

    if (!comprobacion.ok || !sesion.ok || !sesion.profesor) {
      throw new Error(
        sesion.mensaje ||
        'No se ha podido confirmar la sesión del profesor.'
      )
    }

    // Verificar que la sesión pertenece a la escuela correcta.
    const escuelaEsperada = escuela === 'joanmiro' ? 1 : 2

    if (Number(sesion.profesor.escuelaId) !== escuelaEsperada) {
      await fetch(`${baseAPI}/api/acceso-profesor/logout`, {
        method: 'POST',
        credentials: 'include'
      })

      throw new Error(
        'No tienes autorización para acceder a esta escuela.'
      )
    }

    // Redirigir al perfil correcto.
    const destino = escuela === 'joanmiro'
      ? '/joanmiro/tutores/perfil'
      : '/ateneu/tutores/perfil'

    await router.push(destino)
  } catch (error) {
    mensaje.value =
      error.message ||
      'No se ha podido conectar con el servidor.'
  } finally {
    cargando.value = false
  }
}
</script>
