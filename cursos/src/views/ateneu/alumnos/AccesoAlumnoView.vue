
<template>
  <div class="min-h-screen bg-gray-50">

    <header class="w-full border-b border-gray-200 bg-white px-4 py-4 shadow-sm">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-4">

        <router-link
          to="/"
          class="inline-flex items-center justify-center rounded-xl border-2 border-red-900 bg-red-950 px-6 py-3 text-lg font-bold text-white shadow-md transition duration-200 hover:border-red-700 hover:bg-red-900 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-200"
        >
          ExAequo
        </router-link>

        <router-link
          to="/joanmiro"
          class="inline-flex items-center justify-center rounded-xl border-2 border-red-900 bg-red-950 px-6 py-3 text-lg font-bold text-white shadow-md transition duration-200 hover:border-red-700 hover:bg-red-900 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-200"
        >
          Biblioteca Joan Miró
        </router-link>

        <router-link
          to="/ateneu"
          class="inline-flex items-center justify-center rounded-xl border-2 border-red-900 bg-red-950 px-6 py-3 text-lg font-bold text-white shadow-md transition duration-200 hover:border-red-700 hover:bg-red-900 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-200"
        >
          Ateneu Barcelonés
        </router-link>

      </div>
    </header>

    <!-- =====================================================
         ACCESO DEL ALUMNADO
    ====================================================== -->
    <main class="flex min-h-[calc(100vh-90px)] items-center justify-center px-4 py-10">

      <section class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">

        <h1 class="mb-2 text-2xl font-bold text-gray-800">
          Acceso del alumnado
        </h1>

        <p class="mb-6 text-sm leading-6 text-gray-600">
          Introduce tu documento de identidad y el correo electrónico
          registrado en la escuela.
        </p>

        <form class="space-y-5" @submit.prevent="iniciarSesion">

          <!-- DOCUMENTO DE IDENTIDAD -->
          <div>
            <label
              for="documento"
              class="mb-1 block text-sm font-medium text-gray-700"
            >
              Documento de identidad
            </label>

            <input
              id="documento"
              v-model.trim="documento"
              type="text"
              autocomplete="username"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="DNI, NIE o pasaporte"
            />
          </div>

          <!-- CORREO ELECTRÓNICO -->
          <div>
            <label
              for="email"
              class="mb-1 block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>

            <input
              id="email"
              v-model.trim="email"
              type="email"
              autocomplete="email"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="tu@correo.com"
            />
          </div>

          <!-- MENSAJE DE ERROR -->
          <p
            v-if="mensaje"
            role="alert"
            class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {{ mensaje }}
          </p>

          <!-- BOTÓN DE ACCESO -->
          <button
            type="submit"
            :disabled="cargando"
            class="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ cargando ? 'Verificando...' : 'Entrar en mi perfil' }}
          </button>

        </form>

      </section>
    </main>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const documento = ref('')
const email = ref('')
const mensaje = ref('')
const cargando = ref(false)

async function iniciarSesion() {
  if (cargando.value) return

  cargando.value = true
  mensaje.value = ''

  try {
    const base = (
  import.meta.env.VITE_API_URL || 'http://localhost:5555'
).replace(/\/+$/, '')

    const respuesta = await fetch(
      `${base}/api/acceso-alumno/login`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          documento: documento.value,
          email: email.value
        })
      }
    )

    const resultado = await respuesta.json()

    if (!respuesta.ok || !resultado.ok) {
      throw new Error(
        resultado.mensaje || 'No se ha podido verificar el acceso.'
      )
    }

    const destino = route.query.destino

    const rutasPermitidas = [
      '/ateneu/alumnos/perfil'
    ]

    const rutaDestino = rutasPermitidas.includes(destino)
      ? destino
      : '/ateneu/alumnos/perfil'

    await router.push(rutaDestino)

  } catch (error) {
    mensaje.value =
      error.message || 'No se ha podido conectar con el servidor.'
  } finally {
    cargando.value = false
  }
}
</script>
