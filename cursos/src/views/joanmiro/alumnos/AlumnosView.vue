
<template>
    <div class="min-h-screen bg-gray-50 text-gray-800">

        <NavbarJoanmiro />

        <main class="max-w-6xl mx-auto px-4 sm:px-6 py-10">

            <header class="text-center mb-10">

                <p class="text-sm font-bold uppercase tracking-widest
                          text-teal-700 mb-2">
                    Biblioteca Joan Miró
                </p>

                <h1 class="text-3xl sm:text-4xl font-bold mb-3">
                    Espacio de alumnos
                </h1>

                <p class="max-w-2xl mx-auto text-gray-600">
                    Entra en tu perfil para consultar tus clases,
                    entregar trabajos, ver resultados y comunicarte
                    con tus profesores.
                </p>

            </header>

            <!-- NORMAS Y AVISOS -->

            <section class="flex justify-center gap-10 mb-12">

                <button
                    type="button"
                    @click="panel = panel === 'normas' ? null : 'normas'"
                    :aria-expanded="panel === 'normas'"
                    class="flex flex-col items-center gap-2"
                >

                    <span
                        class="w-24 h-24 rounded-full bg-indigo-600
                               hover:bg-indigo-700 text-white text-3xl
                               flex items-center justify-center shadow-lg"
                    >
                        📘
                    </span>

                    <span class="font-bold text-indigo-800">
                        Normas
                    </span>

                </button>

                <button
                    type="button"
                    @click="panel = panel === 'avisos' ? null : 'avisos'"
                    :aria-expanded="panel === 'avisos'"
                    class="flex flex-col items-center gap-2"
                >

                    <span
                        class="w-24 h-24 rounded-full bg-amber-500
                               hover:bg-amber-600 text-white text-3xl
                               flex items-center justify-center shadow-lg"
                    >
                        📢
                    </span>

                    <span class="font-bold text-amber-800">
                        Avisos
                    </span>

                </button>

            </section>

            <!-- NORMAS -->

            <section
                v-if="panel === 'normas'"
                class="bg-white border-l-4 border-indigo-500
                       rounded-xl p-6 shadow mb-8"
            >

                <h2 class="text-xl font-bold mb-4">
                    Normas de clase
                </h2>

                <ul class="list-disc pl-5 space-y-2">

                    <li>
                        Pedir la palabra y esperar el turno.
                    </li>

                    <li>
                        Escuchar con atención.
                    </li>

                    <li>
                        Utilizar un lenguaje respetuoso.
                    </li>

                    <li>
                        Participar de forma constructiva.
                    </li>

                    <li>
                        Respetar la diversidad de opiniones.
                    </li>

                    <li>
                        Llegar puntual y preparado.
                    </li>

                    <li>
                        Mantener una buena higiene personal.
                    </li>

                </ul>

            </section>

            <!-- AVISOS -->

            <section
                v-if="panel === 'avisos'"
                class="bg-white border-l-4 border-amber-500
                       rounded-xl p-6 shadow mb-8"
            >

                <h2 class="text-xl font-bold mb-3">
                    Avisos de Biblioteca Joan Miró
                </h2>

                <p class="text-gray-600">
                    Aquí aparecerán los avisos permanentes y temporales
                    publicados por los profesores de esta escuela.
                </p>

                <p class="text-sm text-amber-800 bg-amber-50
                          rounded-lg p-4 mt-4">
                    Los avisos temporales desaparecerán de la consulta
                    después de 72 horas. La API comprobará su expiración.
                </p>

            </section>

            <!-- BOTONES PRINCIPALES -->

            <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

                <RouterLink

to="/joanmiro/alumnos/acceso?destino=/joanmiro/alumnos/perfil"
                    class="bg-teal-700 hover:bg-teal-800 text-white
                           rounded-2xl p-8 shadow-lg transition"
                >

                    <span class="text-4xl">👤</span>

                    <h2 class="text-2xl font-bold mt-5 mb-3">
                        Entrar en mi perfil
                    </h2>

                    <p class="text-teal-50 leading-relaxed">
                        Consultar mis clases, entregar trabajos,
                        descargar documentos corregidos, ver resultados
                        y escribir a mis profesores.
                    </p>

                    <span class="inline-block mt-6 font-bold">
                        Acceder →
                    </span>

                </RouterLink>

                <RouterLink
                    to="/matricula"
                    class="bg-indigo-700 hover:bg-indigo-800 text-white
                           rounded-2xl p-8 shadow-lg transition"
                >

                    <span class="text-4xl">📝</span>

                    <h2 class="text-2xl font-bold mt-5 mb-3">
                        Matrícula
                    </h2>

                    <p class="text-indigo-50 leading-relaxed">
                        Solicitar una plaza en los cursos disponibles
                        de la escuela.
                    </p>

                    <span class="inline-block mt-6 font-bold">
                        Solicitar matrícula →
                    </span>

                </RouterLink>

            </section>

            <!-- Guía -->

<section
    class="bg-purple-50 border border-purple-200
           rounded-2xl p-6 sm:p-8"
>
    <h2 class="text-2xl font-bold mb-3">
        Guía para estudiantes
    </h2>

    <p class="text-gray-700 mb-5">
        Consulta la guía para estudiantes de la Escuela Biblioteca Joan Miró. Encontrarás información y orientaciones útiles
        para conocer el funcionamiento de la escuela, participar
        en las actividades y aprovechar mejor tu experiencia
        como alumno o alumna.
    </p>

    <RouterLink
        to="/joanmiro/alumnos/guiaalumno"
        class="inline-flex bg-purple-700 hover:bg-purple-800
               text-white font-bold rounded-lg px-5 py-3"
    >
        Consultar la guía
    </RouterLink>
</section>



        </main>

        <footer class="border-t bg-white mt-12 py-6">
            <p class="text-center text-sm text-gray-500">
                ExAequo · Biblioteca Joan Miró · Espacio del alumnado
            </p>
        </footer>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import NavbarJoanmiro from '../../../components/joanmiro/NavbarJoanmiro.vue'

const panel = ref(null)
</script>
