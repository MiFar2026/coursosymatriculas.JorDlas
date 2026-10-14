
<template>
    <div class="relative min-h-screen text-gray-800">
    <!-- Fondo con imagen -->
    <div
        class="fixed inset-0 bg-cover bg-center bg-fixed blur-sm scale-105"
        style="background-image: url('/fotos/ateneu/recursos/recursos.jpg');"
    ></div>

    <!-- Capa transparente -->
    <div class="fixed inset-0 bg-white/40 backdrop-blur-sm"></div>

    <!-- Contenido de la página -->
    <div class="relative z-10">
        <div class="relative z-[100] w-full">
            <NavbarJoanmiro />
        </div>
    </div>


        <main class="relative">

            <!-- CABECERA -->
            <section
                class="bg-gradient-to-br from-red-950 via-red-900 to-red-800
                       text-white px-6 py-16"
            >
                <div class="max-w-5xl mx-auto text-center">

                    <p
                        class="text-sm font-bold uppercase tracking-widest
                               text-amber-200 mb-3"
                    >
                        Escuela Biblioteca Joan Miró
                    </p>

                    <h1 class="text-4xl md:text-5xl font-bold mb-5">
                        Recursos educativos
                    </h1>

                    <p class="text-lg text-red-100 max-w-2xl mx-auto">
                        Materiales para aprender, practicar y continuar
                        estudiando dentro y fuera del aula.
                    </p>

                </div>
            </section>

            <div class="max-w-6xl mx-auto px-6 py-12 space-y-12">

                <!-- RECURSOS DEL PROFESORADO -->
                <section>

                    <div class="mb-6">
                        <h2 class="text-2xl font-bold mb-2">
                            Recursos del profesorado
                        </h2>

                        <p class="text-gray-600">
                            Aquí encontrarás los materiales publicados
                            por los profesores de la Escuela Biblioteca
                            Joan Miró.
                        </p>
                    </div>

                    <!-- CARGANDO -->
                    <div
                        v-if="cargando"
                        class="bg-white border rounded-2xl p-8 text-center"
                    >
                        Cargando recursos...
                    </div>

                    <!-- ERROR -->
                    <div
                        v-else-if="error"
                        class="bg-white border border-amber-200 rounded-2xl
                               p-6 text-center"
                    >
                        <p class="font-semibold mb-2">
                            No se han podido cargar los recursos.
                        </p>

                        <p class="text-gray-600 mb-4">
                            Puedes intentarlo de nuevo más tarde.
                        </p>

                        <button
                            @click="cargarRecursos"
                            class="bg-red-900 text-white rounded-lg px-5 py-2
                                   hover:bg-red-800"
                        >
                            Volver a intentar
                        </button>
                    </div>

                    <!-- SIN RECURSOS -->
                    <div
                        v-else-if="recursos.length === 0"
                        class="bg-white border border-gray-200 rounded-2xl
                               p-8 text-center"
                    >
                        <div class="text-4xl mb-3">📚</div>

                        <h3 class="text-xl font-bold mb-2">
                            Todavía no hay recursos publicados
                        </h3>

                        <p class="text-gray-600 max-w-xl mx-auto">
                            Cuando los profesores publiquen actividades,
                            documentos o materiales educativos, aparecerán
                            aquí automáticamente.
                        </p>
                    </div>

                    <!-- LISTA DE RECURSOS -->
                    <div
                        v-else
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                               gap-6"
                    >
                        <article
                            v-for="(recurso, indice) in recursos"
                            :key="recurso.id || recurso.id_recurso || indice"
                            class="bg-white border border-gray-200 rounded-2xl
                                   p-6 shadow-sm"
                        >
                            <p class="text-sm text-red-800 font-semibold mb-2">
                                {{ recurso.nivel || 'Material educativo' }}
                            </p>

                            <h3 class="text-xl font-bold mb-3">
                                {{ recurso.titulo || recurso.nombre || 'Recurso educativo' }}
                            </h3>

                            <p class="text-gray-600 mb-4">
                                {{ recurso.descripcion || 'Material publicado por el profesorado.' }}
                            </p>

                            <p
                                v-if="recurso.nombre_profesor || recurso.profesor"
                                class="text-sm text-gray-500 mb-4"
                            >
                                Profesor/a:
                                {{ recurso.nombre_profesor || recurso.profesor }}
                            </p>

                            <a
                                v-if="obtenerUrl(recurso)"
                                :href="obtenerUrl(recurso)"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-block bg-red-900 text-white
                                       rounded-lg px-4 py-2 hover:bg-red-800"
                            >
                                Abrir recurso ↗
                            </a>
                        </article>
                    </div>

                </section>

                <!-- RECURSOS DE CONSULTA -->
                <section>

                    <div class="mb-6">
                        <h2 class="text-2xl font-bold mb-2">
                            Recursos de consulta
                        </h2>

                        <p class="text-gray-600">
                            Enlaces y materiales para practicar y ampliar
                            los conocimientos de forma autónoma.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <!-- CURSOS GENERALES -->
                        <article
                            class="bg-white border border-gray-200
                                   rounded-2xl p-6 shadow-sm"
                        >
                            <h3 class="text-xl font-bold mb-3">
                                Cursos generales
                            </h3>

                            <p class="text-gray-600 mb-5">
                                Consulta los cursos de castellano, catalán
                                y alfabetización de ExAequo.
                            </p>

                            <RouterLink
                                to="/cursos-generales"
                                class="inline-block bg-red-900 text-white
                                       rounded-lg px-4 py-2 hover:bg-red-800"
                            >
                                Ver cursos
                            </RouterLink>
                        </article>

                        <!-- CASTELLANO -->
                        <article
                            class="bg-white border border-gray-200
                                   rounded-2xl p-6 shadow-sm"
                        >
                            <h3 class="text-xl font-bold mb-3">
                                Materiales de castellano
                            </h3>

                            <p class="text-gray-600 mb-5">
                                Accede a ejercicios, lecturas y materiales
                                para practicar español.
                            </p>

                            <RouterLink
                                to="/castellano"
                                class="inline-block bg-red-900 text-white
                                       rounded-lg px-4 py-2 hover:bg-red-800"
                            >
                                Explorar materiales
                            </RouterLink>
                        </article>

                    </div>

                </section>

            </div>
        </main>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import NavbarJoanmiro
    from '../../../components/joanmiro/NavbarJoanmiro.vue'

const API_URL = 'http://localhost:3000/api/escuelas/recursos'
const escuela = 'Biblioteca Joan Miró'

const recursos = ref([])
const cargando = ref(true)
const error = ref(false)

async function cargarRecursos() {
    cargando.value = true
    error.value = false

    try {
        const respuesta = await fetch(
            `${API_URL}?escuela=${encodeURIComponent(escuela)}`
        )

        if (!respuesta.ok) {
            throw new Error('No se pudieron cargar los recursos')
        }

        const resultado = await respuesta.json()

        if (resultado.ok === false) {
            throw new Error(
                resultado.mensaje || 'Error al cargar recursos'
            )
        }

        recursos.value = Array.isArray(resultado.datos)
            ? resultado.datos
            : []

    } catch (err) {
        console.error(
            'Error al cargar los recursos de Joan Miró:',
            err
        )

        error.value = true

    } finally {
        cargando.value = false
    }
}

function obtenerUrl(recurso) {
    const ruta =
        recurso.url ||
        recurso.archivo_url ||
        recurso.ruta_archivo ||
        recurso.archivo ||
        recurso.ruta

    if (!ruta) return ''

    if (/^https?:\/\//i.test(ruta)) {
        return ruta
    }

    return `http://localhost:3000/${ruta.replace(/^\/+/, '')}`
}

onMounted(cargarRecursos)
</script>
