
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

            <!-- NORMAS Y RED DE APOYO -->

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

                <div class="relative inline-block text-left">

                    <!-- BOTÓN RED DE APOYO -->

                    <button
                        type="button"
                        @click="panel = panel === 'avisos' ? null : 'avisos'"
                        :aria-expanded="panel === 'avisos'"
                        class="flex flex-col items-center gap-2 focus:outline-none"
                    >

                        <span
                            class="w-24 h-24 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-3xl flex items-center justify-center shadow-lg transition-colors duration-200"
                        >
                            🤝
                        </span>

                        <span class="font-bold text-amber-800">
                            Red de apoyo
                        </span>

                    </button>

                    <!-- PANEL DESPLEGABLE RED DE APOYO -->

                    <div
                        v-if="panel === 'avisos'"
                        class="absolute left-0 mt-3 w-96 rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden border border-amber-100"
                    >

                        <!-- CABECERA -->

                        <div class="bg-amber-500 p-4 text-white">

                            <h3 class="font-bold text-lg flex items-center gap-2">
                                🏠 Red de Apoyo en Barcelona
                            </h3>

                            <p class="text-xs text-amber-100 mt-1">
                                Recursos de emergencia, alojamiento y alimentación para estudiantes.
                            </p>

                        </div>

                        <!-- CONTENIDO -->

                        <div class="max-h-[400px] overflow-y-auto p-4 space-y-4 text-sm text-slate-700">

                            <!-- SECCIÓN 1: EMERGENCIAS -->

                            <div>

                                <h4 class="font-bold text-amber-800 border-b border-amber-100 pb-1 mb-2 uppercase text-xs tracking-wider">
                                    🚨 Emergencia Social (24h)
                                </h4>

                                <ul class="space-y-2">

                                    <li>

                                        <strong class="block text-slate-900">
                                            CUESB (Urgencias Sociales)
                                        </strong>

                                        <span class="text-xs text-slate-500 block">
                                            C/ Llacuna, 25
                                        </span>

                                        <a
                                            href="tel:900703030"
                                            class="text-amber-600 hover:underline text-xs font-semibold"
                                        >
                                            📞 900 70 30 30 (Gratuito)
                                        </a>

                                    </li>

                                    <li>

                                        <strong class="block text-slate-900">
                                            Servicio de Inserción Social (SIS)
                                        </strong>

                                        <span class="text-xs text-slate-500 block">
                                            Passeig Pujades, 29 (Sin cita previa)
                                        </span>

                                        <a
                                            href="tel:932566650"
                                            class="text-amber-600 hover:underline text-xs font-semibold"
                                        >
                                            📞 93 256 66 50
                                        </a>

                                    </li>

                                </ul>

                            </div>

                            <!-- SECCIÓN 2: ENTIDADES SOCIALES -->

                            <div>

                                <h4 class="font-bold text-amber-800 border-b border-amber-100 pb-1 mb-2 uppercase text-xs tracking-wider">
                                    🤝 Entidades y Albergues
                                </h4>

                                <ul class="space-y-3">

                                    <li>

                                        <a
                                            href="https://arrelsfundacio.org"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="font-semibold text-slate-900 hover:text-amber-600 block"
                                        >
                                            Arrels Fundació ↗
                                        </a>

                                        <p class="text-xs text-slate-500">
                                            Orientación, duchas y consigna. C/ Riereta, 24.
                                        </p>

                                    </li>

                                    <li>

                                        <a
                                            href="https://sjdserveissocials-bcn.org"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="font-semibold text-slate-900 hover:text-amber-600 block"
                                        >
                                            Sant Joan de Déu ↗
                                        </a>

                                        <p class="text-xs text-slate-500">
                                            Centros residenciales específicos para jóvenes.
                                        </p>

                                    </li>

                                    <li>

                                        <a
                                            href="https://fcmb.org"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="font-semibold text-slate-900 hover:text-amber-600 block"
                                        >
                                            Casa de Misericordia ↗
                                        </a>

                                        <p class="text-xs text-slate-500">
                                            Pisos de estudiantes y acompañamiento para jóvenes vulnerables.
                                        </p>

                                    </li>

                                </ul>

                            </div>

                            <!-- SECCIÓN 3: ALIMENTACIÓN E HIGIENE -->

                            <div class="bg-amber-50 p-2.5 rounded-lg border border-amber-100">

                                <h4 class="font-bold text-amber-900 text-xs uppercase tracking-wider mb-1">
                                    🍲 Comedores y Servicios Básicos
                                </h4>

                                <p class="text-xs text-amber-800 leading-relaxed">
                                    Puedes acceder a los comedores públicos gratis durante 3 días de forma directa. Para estancias largas o duchas, solicita derivación en el SIS o en Cáritas (Via Laietana, 5).
                                </p>

                            </div>

                        </div>

                        <!-- PIE DEL PANEL -->

                        <div class="bg-slate-50 p-3 text-center border-t border-slate-100">

                            <p class="text-[11px] text-slate-400">
                                Si eres universitario, consulta también con el Servicio de Atención al Estudiante de tu centro.
                            </p>

                        </div>

                    </div>

                </div>

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

            <!-- GUÍA -->

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

<style scoped>

/* Estilos opcionales para personalizar la barra de scroll del panel */

.max-h-\[400px\]::-webkit-scrollbar {
    width: 6px;
}

.max-h-\[400px\]::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.max-h-\[400px\]::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
}

.max-h-\[400px\]::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}

</style>
