
<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">
    <NavbarJoanmiro/>

    <main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <!-- Cabecera -->
      <section
        class="relative mb-8 overflow-hidden rounded-3xl
               bg-gradient-to-r from-green-600 via--600
               to-purple-500 px-7 py-9 text-white shadow-lg"
      >
        <div class="relative z-10">
          <span
            class="inline-flex rounded-full bg-white/20 px-3 py-1
                   text-sm font-medium ring-1 ring-white/30"
          >
            Oferta formativa
          </span>

          <h1 class="mt-4 text-3xl font-extrabold sm:text-4xl">
            Horarios de los cursos
          </h1>

          <p class="mt-3 max-w-2xl text-indigo-100">
            Encuentra tu curso, consulta los horarios y organiza
            tu tiempo con facilidad.
          </p>
        </div>

        <div
          class="pointer-events-none absolute -right-10 -top-16
                 h-64 w-64 rounded-full bg-white/10"
        ></div>
        <div
          class="pointer-events-none absolute -bottom-24 right-40
                 h-48 w-48 rounded-full bg-pink-300/20"
        ></div>
      </section>

      <!-- Filtros -->
      <section
        class="mb-8 rounded-2xl border border-slate-200
               bg-white p-5 shadow-sm sm:p-6"
      >
        <div class="mb-5 flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center
                   rounded-xl bg-indigo-100 text-xl"
          >
            🔎
          </div>
          <div>
            <h2 class="font-bold text-slate-800">
              Encuentra tu horario
            </h2>
            <p class="text-sm text-slate-500">
              Filtra los cursos disponibles.
            </p>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label class="block">
            <span class="mb-2 block text-sm font-semibold">
              Escuela
            </span>
            <select
              v-model="filtros.escuela"
              class="w-full rounded-xl border border-slate-200
                     bg-slate-50 px-3 py-3 outline-none
                     transition focus:border-indigo-500
                     focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">Todas las escuelas</option>
              <option
                v-for="escuela in opciones.escuelas"
                :key="escuela"
                :value="escuela"
              >
                {{ escuela }}
              </option>
            </select>
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-semibold">
              Idioma
            </span>
            <select
              v-model="filtros.idioma"
              class="w-full rounded-xl border border-slate-200
                     bg-slate-50 px-3 py-3 outline-none
                     focus:border-indigo-500
                     focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">Todos los idiomas</option>
              <option
                v-for="idioma in opciones.idiomas"
                :key="idioma"
                :value="idioma"
              >
                {{ idioma }}
              </option>
            </select>
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-semibold">
              Nivel
            </span>
            <select
              v-model="filtros.nivel"
              class="w-full rounded-xl border border-slate-200
                     bg-slate-50 px-3 py-3 outline-none
                     focus:border-indigo-500
                     focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">Todos los niveles</option>
              <option
                v-for="nivel in opciones.niveles"
                :key="nivel"
                :value="nivel"
              >
                {{ nivel }}
              </option>
            </select>
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-semibold">
              Turno
            </span>
            <select
              v-model="filtros.turno"
              class="w-full rounded-xl border border-slate-200
                     bg-slate-50 px-3 py-3 outline-none
                     focus:border-indigo-500
                     focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">Todos los turnos</option>
              <option
                v-for="turno in opciones.turnos"
                :key="turno"
                :value="turno"
              >
                {{ turno }}
              </option>
            </select>
          </label>
        </div>

        <div class="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p class="text-sm text-slate-500">
            <span class="font-bold text-indigo-600">
              {{ horariosFiltrados.length }}
            </span>
            horarios encontrados
          </p>

          <button
            type="button"
            @click="limpiarFiltros"
            class="rounded-xl border border-indigo-200 px-4 py-2
                   text-sm font-semibold text-indigo-700
                   transition hover:bg-indigo-50"
          >
            Limpiar filtros
          </button>
        </div>
      </section>

      <!-- Error de conexión -->
      <div
        v-if="error"
        class="mb-6 rounded-2xl border border-red-200
               bg-red-50 p-5 text-red-800"
      >
        <p class="font-bold">No se han podido cargar los horarios</p>
        <p class="mt-1 text-sm">{{ error }}</p>
        <button
          @click="cargarHorarios"
          class="mt-3 rounded-lg bg-red-100 px-4 py-2
                 text-sm font-semibold hover:bg-red-200"
        >
          Intentar de nuevo
        </button>
      </div>

      <!-- Cargando -->
      <div
        v-else-if="cargando"
        class="rounded-2xl border border-slate-200 bg-white
               p-12 text-center shadow-sm"
      >
        <div
          class="mx-auto mb-4 h-10 w-10 animate-spin rounded-full
                 border-4 border-indigo-100 border-t-indigo-600"
        ></div>
        <p class="font-semibold text-slate-700">
          Cargando horarios...
        </p>
      </div>

      <!-- Horarios reales de la API -->
      <section v-else-if="horariosFiltrados.length">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-800">
            Cursos disponibles
          </h2>
          <span
            class="rounded-full bg-emerald-100 px-3 py-1
                   text-xs font-bold text-emerald-700"
          >
            Datos actualizados desde la API
          </span>
        </div>

        <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="horario in horariosFiltrados"
            :key="horario.id"
            class="overflow-hidden rounded-2xl border border-slate-200
                   bg-white shadow-sm transition duration-200
                   hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              class="h-2"
              :class="colorIdioma(horario.idioma)"
            ></div>

            <div class="p-5">
              <div class="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p
                    class="text-xs font-bold uppercase tracking-wider
                           text-slate-400"
                  >
                    {{ horario.escuela }}
                  </p>
                  <h3 class="mt-1 text-lg font-extrabold text-slate-800">
                    {{ horario.curso }}
                  </h3>
                </div>

                <span
                  class="shrink-0 rounded-lg px-3 py-1 text-xs
                         font-bold"
                  :class="fondoIdioma(horario.idioma)"
                >
                  {{ horario.idioma }}
                </span>
              </div>

              <div class="mb-4 flex flex-wrap gap-2">
                <span
                  class="rounded-lg bg-slate-100 px-3 py-1.5
                         text-sm font-medium text-slate-600"
                >
                  Nivel {{ horario.nivel || 'Sin nivel' }}
                </span>
                <span
                  class="rounded-lg bg-indigo-50 px-3 py-1.5
                         text-sm font-semibold text-indigo-700"
                >
                  {{ horario.turno || 'Por confirmar' }}
                </span>
              </div>

              <div
                class="rounded-xl border border-slate-100
                       bg-slate-50 p-4"
              >
                <p class="mb-3 text-xs font-bold uppercase
                          tracking-wider text-slate-400">
                  <span class="mr-2">🕒</span>Horario de clase
                </p>

                <div
                  v-for="(sesion, i) in horario.sesiones || []"
                  :key="sesion.id ?? i"
                  class="flex items-center justify-between gap-3"
                  :class="{ 'mt-3 border-t border-slate-200 pt-3': i > 0 }"
                >
                  <span class="text-sm font-semibold text-slate-700">
                    {{ sesion.dia }}
                  </span>
                  <span
                    class="rounded-lg bg-white px-3 py-1.5
                           text-sm font-bold text-slate-800
                           shadow-sm"
                  >
                    {{ sesion.hora_inicio }} – {{ sesion.hora_fin }}
                  </span>
                </div>

                <p
                  v-if="!horario.sesiones?.length"
                  class="text-sm text-amber-700"
                >
                  Horario pendiente de publicación.
                </p>
              </div>

              <p class="mt-4 text-sm text-slate-500">
                <span class="mr-2">📍</span>
                {{ horario.aula || 'Aula por confirmar' }}
              </p>
            </div>
          </article>
        </div>
      </section>

      <!-- Estado vacío -->
      <section
        v-else
        class="rounded-2xl border border-slate-200 bg-white
               px-6 py-14 text-center shadow-sm"
      >
        <div
          class="mx-auto flex h-16 w-16 items-center justify-center
                 rounded-2xl bg-violet-100 text-3xl"
        >
          📅
        </div>

        <h2 class="mt-5 text-xl font-extrabold text-slate-800">
          {{ hayFiltros ? 'No hay resultados' : 'Horarios pendientes de publicación' }}
        </h2>

        <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          {{
            hayFiltros
              ? 'Prueba a cambiar los filtros para encontrar otros cursos.'
              : 'Estamos preparando la información de los cursos. Consulta esta página próximamente.'
          }}
        </p>

        <button
          v-if="hayFiltros"
          @click="limpiarFiltros"
          class="mt-5 rounded-xl bg-indigo-600 px-5 py-3
                 font-semibold text-white transition
                 hover:bg-indigo-700"
        >
          Ver todos los horarios
        </button>
      </section>

      <p class="mt-8 text-center text-sm text-slate-400">
        Los horarios pueden estar sujetos a cambios.
      </p>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import NavbarJoanmiro from '../../../components/joanmiro/NavbarJoanmiro.vue'

const API_URL = 'http://localhost:5555/api/horarios'

const cargando = ref(false)
const error = ref('')
const horarios = ref([])

const filtros = reactive({
  escuela: '',
  idioma: '',
  nivel: '',
  turno: ''
})

const opciones = computed(() => ({
  escuelas: [...new Set(horarios.value.map(h => h.escuela).filter(Boolean))],
  idiomas: [...new Set(horarios.value.map(h => h.idioma).filter(Boolean))],
  niveles: [...new Set(horarios.value.map(h => h.nivel).filter(Boolean))],
  turnos: [...new Set(horarios.value.map(h => h.turno).filter(Boolean))]
}))

const hayFiltros = computed(() =>
  Boolean(filtros.escuela || filtros.idioma || filtros.nivel || filtros.turno)
)

const horariosFiltrados = computed(() =>
  horarios.value.filter(h =>
    (!filtros.escuela || h.escuela === filtros.escuela) &&
    (!filtros.idioma || h.idioma === filtros.idioma) &&
    (!filtros.nivel || h.nivel === filtros.nivel) &&
    (!filtros.turno || h.turno === filtros.turno)
  )
)


async function cargarHorarios() {
  cargando.value = true
  error.value = ''

  try {
    // 1. Consultar los grupos disponibles.
    const respuestaGrupos = await fetch(`${API_URL}/grupos`)

    if (!respuestaGrupos.ok) {
      throw new Error(
        `Error al consultar los grupos (${respuestaGrupos.status})`
      )
    }

    const grupos = await respuestaGrupos.json()

    if (!Array.isArray(grupos)) {
      throw new Error('La API no ha devuelto una lista de grupos.')
    }

    // Si todavía no hay grupos, no hay horarios que consultar.
    if (grupos.length === 0) {
      horarios.value = []
      return
    }

    // 2. Consultar los horarios de cada grupo.
    const resultados = await Promise.all(
      grupos.map(async (grupo) => {
        const respuesta = await fetch(
          `${API_URL}?grupo_id=${encodeURIComponent(grupo.id)}`
        )

        if (!respuesta.ok) {
          throw new Error(
            `Error al consultar el grupo ${grupo.nombre} (${respuesta.status})`
          )
        }

        const datos = await respuesta.json()

        if (!Array.isArray(datos)) {
          throw new Error(
            `La respuesta de horarios del grupo ${grupo.nombre} no es válida.`
          )
        }

        return {
          grupo,
          horarios: datos
        }
      })
    )

    // 3. Preparar los datos para las tarjetas públicas.
    horarios.value = resultados.map(({ grupo, horarios: dias }) => {
      const sesiones = dias
        .filter(dia => dia.configurado && dia.activo && !dia.cerrado)
        .map(dia => ({
          id: dia.id ?? dia.dia_semana,
          dia: dia.dia_semana,
          hora_inicio: dia.hora_inicio,
          hora_fin: dia.hora_fin
        }))

      return {
        id: grupo.id,
        grupo_id: grupo.id,
        escuela: grupo.nombre_escuela ?? '',
        curso: grupo.nombre_curso ?? grupo.nombre,
        idioma: grupo.idioma ?? '',
        nivel: grupo.nivel ?? '',
        turno: grupo.turno ?? '',
        aula: grupo.aula ?? '',
        sesiones
      }
    })
  } catch (e) {
    console.error('Error al cargar horarios:', e)
    error.value = e.message || 'No se pudo conectar con el servidor.'
  } finally {
    cargando.value = false
  }
}

function limpiarFiltros() {
  filtros.escuela = ''
  filtros.idioma = ''
  filtros.nivel = ''
  filtros.turno = ''
}

function colorIdioma(idioma) {
  const colores = {
    Castellano: 'bg-violet-500',
    Catalán: 'bg-emerald-500',
    Alfabetización: 'bg-amber-500'
  }
  return colores[idioma] || 'bg-indigo-500'
}

function fondoIdioma(idioma) {
  const colores = {
    Castellano: 'bg-violet-100 text-violet-700',
    Catalán: 'bg-emerald-100 text-emerald-700',
    Alfabetización: 'bg-amber-100 text-amber-700'
  }
  return colores[idioma] || 'bg-indigo-100 text-indigo-700'
}

onMounted(cargarHorarios)
</script>
