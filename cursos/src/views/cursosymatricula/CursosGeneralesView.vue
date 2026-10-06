
<template>

<div class="min-h-screen bg-stone-50 text-gray-900">

    <!-- =====================================================
         NAVBAR
    ====================================================== -->

    <NavbarCursos />


    <!-- =====================================================
         BOTÓN VOLVER A EXAEQUO
    ====================================================== -->

    


    <!-- =====================================================
         CONTENIDO PRINCIPAL
    ====================================================== -->

    <main>

        <!-- =================================================
             CABECERA
        ================================================== -->

        <section
            class="bg-gradient-to-br from-red-950 via-red-900 to-red-800 text-white"
        >

            <div
                class="max-w-6xl mx-auto px-6 py-14 md:py-20"
            >

                <div class="max-w-3xl">

                    <h1
                        class="text-4xl md:text-6xl font-black leading-tight mb-6"
                    >
                        Cursos y matrícula
                    </h1>

                    <p
                        class="text-lg md:text-xl text-red-100 leading-relaxed"
                    >
                        Aprende a tu ritmo, mejora tus conocimientos y
                        encuentra el curso que necesitas.
                    </p>
<RouterLink
        to="/"
        aria-label="Volver a ExAequo"
        title="Volver a ExAequo"
        class="fixed top-30 right-6 z-[9999] flex items-center gap-2 rounded-full bg-red-800 px-5 py-3 font-bold text-white shadow-2xl transition-all duration-200 hover:bg-red-900 hover:scale-105"
    >
        <span class="text-2xl leading-none">←</span>
        <span>ExAequo</span>
    </RouterLink>
                </div>

            </div>

        </section>


        <!-- =================================================
             MATRÍCULA
        ================================================== -->

        <section
            class="max-w-6xl mx-auto px-6 pt-10"
        >

            <RouterLink
                to="/matricula"
                class="group block bg-red-700 hover:bg-red-800 text-white rounded-3xl shadow-xl transition-all duration-200 hover:-translate-y-1"
            >

                <div
                    class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-7 md:p-10"
                >

                    <div>

                        <div
                            class="flex items-center gap-3 mb-3"
                        >

                            <img
                                src="/fotos/cursos/cursosgenerales/iconoinscripcion.png"
                                alt="matricula"
                                class="w-8 h-8 object-contain"
                            />

                            <span
                                class="uppercase tracking-widest text-red-100 text-sm font-bold"
                            >
                                Inscripción
                            </span>

                        </div>

                        <h2
                            class="text-3xl md:text-4xl font-black mb-2"
                        >
                            Matrícula
                        </h2>

                        <p
                            class="text-red-100 text-lg"
                        >
                            Apúntate a nuestros cursos.
                        </p>

                    </div>


                    <div
                        class="shrink-0 flex items-center justify-center gap-3 bg-white text-red-800 font-bold px-7 py-4 rounded-2xl group-hover:bg-red-50 transition"
                    >

                        <span>
                            Ir a matrícula
                        </span>

                        <span
                            class="text-xl group-hover:translate-x-1 transition"
                        >
                            →
                        </span>

                    </div>

                </div>

            </RouterLink>

        </section>


        <!-- =================================================
             APRENDIZAJE AUTÓNOMO
        ================================================== -->

        <section
            class="max-w-6xl mx-auto px-6 py-14"
        >

            <div
                class="text-center max-w-2xl mx-auto mb-10"
            >

                <p
                    class="text-red-700 font-bold uppercase tracking-widest text-sm mb-3"
                >
                    Aprende a tu ritmo
                </p>

                <h2
                    class="text-3xl md:text-4xl font-black text-gray-900 mb-4"
                >
                    Aprende idiomas
                </h2>

                <p
                    class="text-gray-600 text-lg"
                >
                    Practica y aprende castellano o catalán con nuestros
                    materiales de autoaprendizaje.
                </p>

            </div>


            <!-- =================================================
                 TARJETAS DE IDIOMAS
            ================================================== -->

            <div
                class="grid md:grid-cols-2 gap-8"
            >

                <!-- =================================================
                     CASTELLANO
                ================================================== -->

                <article
                    class="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-200"
                >

                    <div
                        class="h-72 md:h-80 bg-red-50 overflow-hidden"
                    >

                        <img
                            src="/fotos/cursos/cursosgenerales/spanish.png"
                            alt="Aprendizaje de castellano"
                            class="w-full h-full object-cover object-center"
                        />

                    </div>


                    <div class="p-7">

                        <div
                            class="flex items-center gap-3 mb-4"
                        >

                            <img
                                src="/fotos/cursos/cursosgenerales/iconoespan.png"
                                alt="Español"
                                class="w-8 h-8 object-contain"
                            />

                            <div>

                                <p
                                    class="text-sm text-gray-500 font-semibold"
                                >
                                    Autoaprendizaje
                                </p>

                                <h3
                                    class="text-3xl font-black"
                                >
                                    Castellano
                                </h3>

                            </div>

                        </div>


                        <p
                            class="text-gray-600 leading-relaxed mb-6"
                        >
                            Aprende y practica castellano con actividades
                            sencillas que puedes realizar a tu propio ritmo.
                        </p>


                        <RouterLink
                            to="/castellano"
                            class="flex items-center justify-center w-full bg-red-700 hover:bg-red-800 text-white font-bold text-lg py-4 px-5 rounded-2xl transition"
                        >

                            Aprender castellano

                            <span class="ml-2">
                                →
                            </span>

                        </RouterLink>

                    </div>

                </article>


                <!-- =================================================
                     CATALÁN
                ================================================== -->

                <article
                    class="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-200"
                >

                    <div
                        class="h-72 md:h-80 bg-yellow-50 overflow-hidden"
                    >

                        <img
                            src="/fotos/cursos/cursosgenerales/catalan.png"
                            alt="Aprendizaje de catalán"
                            class="w-full h-full object-cover object-center"
                        />

                    </div>


                    <div class="p-7">

                        <div
                            class="flex items-center gap-3 mb-4"
                        >

                            <img
                                src="/fotos/cursos/cursosgenerales/iconocatala.png"
                                alt="Catalán"
                                class="w-8 h-8 object-contain"
                            />

                            <div>

                                <p
                                    class="text-sm text-gray-500 font-semibold"
                                >
                                    Autoaprenentatge
                                </p>

                                <h3
                                    class="text-3xl font-black"
                                >
                                    Catalán
                                </h3>

                            </div>

                        </div>


                        <p
                            class="text-gray-600 leading-relaxed mb-6"
                        >
                            Aprèn català amb activitats senzilles i
                            materials pensats per aprendre al teu ritme.
                        </p>


                        <RouterLink
                            to="/catalan"
                            class="flex items-center justify-center w-full bg-red-700 hover:bg-red-800 text-white font-bold text-lg py-4 px-5 rounded-2xl transition"
                        >

                            Aprender catalán

                            <span class="ml-2">
                                →
                            </span>

                        </RouterLink>

                    </div>

                </article>

            </div>

        </section>


        <!-- =================================================
             AULAS FÍSICAS
        ================================================== -->

        <section
            class="max-w-6xl mx-auto px-6 py-16"
        >

            <div
                class="text-center max-w-3xl mx-auto mb-12"
            >

                <p
                    class="text-red-700 font-bold uppercase tracking-widest text-sm mb-3"
                >
                    También puedes venir en persona
                </p>

                <h2
                    class="text-3xl md:text-5xl font-black text-gray-900 mb-5"
                >
                    ¿Quieres aprender en un aula física?
                </h2>

                <p
                    class="text-gray-600 text-lg leading-relaxed"
                >
                    Si prefieres aprender acompañado y asistir a clases,
                    conoce nuestras escuelas y espacios de aprendizaje.
                </p>

            </div>


            <div
                class="flex justify-center mb-10"
            >

                <div
                    class="inline-flex items-center gap-3 bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-bold shadow-sm"
                >

                    <img
                        src="/fotos/cursos/cursosgenerales/iconoescuela.png"
                        alt="Escuela"
                        class="w-7 h-7 object-contain"
                    />

                    <span>
                        Nuestras escuelas
                    </span>

                </div>

            </div>


            <div
                class="grid md:grid-cols-2 gap-8"
            >

                <!-- =================================================
                     JOAN MIRÓ
                ================================================== -->

                <RouterLink
                    to="/joan-miro"
                    class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 via-gray-100 to-gray-200 border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >

                    <div
                        class="h-3 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700"
                    ></div>


                    <div
                        class="p-8 md:p-9"
                    >

                        <div
                            class="flex items-center justify-between mb-7"
                        >

                            <div
                                class="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300"
                            >

                                <img
                                    src="/fotos/cursos/cursosgenerales/iconobiblio.png"
                                    alt="Biblioteca Joan Miró"
                                    class="w-full h-full object-contain"
                                />

                            </div>

                            <span
                                class="px-4 py-2 rounded-full bg-gray-800 text-white text-xs font-bold uppercase tracking-wider"
                            >
                                Escuela biblioteca
                            </span>

                        </div>


                        <h3
                            class="text-2xl md:text-3xl font-black text-gray-900 mb-4"
                        >
                            Biblioteca Escuela Joan Miró
                        </h3>


                        <p
                            class="text-gray-600 text-base md:text-lg leading-relaxed mb-8"
                        >
                            Un espacio en una de las bibliotecas más prestigiosas de la ciudad donde puedes aprender,
                            estudiar y recibir apoyo en un ambiente
                            tranquilo y cercano.
                        </p>


                        <div
                            class="flex items-center justify-between bg-white rounded-2xl px-5 py-4 shadow-sm group-hover:bg-gray-800 group-hover:text-white transition-all duration-300"
                        >

                            <span
                                class="font-bold"
                            >
                                Conocer Joan Miró
                            </span>

                            <span
                                class="text-xl group-hover:translate-x-2 transition-transform duration-300"
                            >
                                →
                            </span>

                        </div>

                    </div>

                </RouterLink>


                <!-- =================================================
                     ATENEU
                ================================================== -->

                <RouterLink
                    to="/ateneu"
                    class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 via-gray-100 to-gray-200 border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >

                    <div
                        class="h-3 bg-gradient-to-r from-red-700 via-red-600 to-red-500"
                    ></div>


                    <div
                        class="p-8 md:p-9"
                    >

                        <div
                            class="flex items-center justify-between mb-7"
                        >

                            <div
                                class="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300"
                            >

                                <img
                                    src="/fotos/cursos/cursosgenerales/iconoateneu.jpg"
                                    alt="Ateneu Aula 502"
                                    class="w-full h-full object-contain"
                                />

                            </div>

                            <span
                                class="px-4 py-2 rounded-full bg-red-700 text-white text-xs font-bold uppercase tracking-wider"
                            >
                                Escuela Aula
                            </span>

                        </div>


                        <h3
                            class="text-2xl md:text-3xl font-black text-gray-900 mb-4"
                        >
                            Ateneu · Aula 502
                        </h3>


                        <p
                            class="text-gray-600 text-base md:text-lg leading-relaxed mb-8"
                        >
                            Un aula de un espacio cultural donde puedes asistir a clases,
                            aprender junto a otras personas y formar
                            parte de una comunidad.
                        </p>


                        <div
                            class="flex items-center justify-between bg-white rounded-2xl px-5 py-4 shadow-sm group-hover:bg-red-700 group-hover:text-white transition-all duration-300"
                        >

                            <span
                                class="font-bold"
                            >
                                Conocer Ateneu
                            </span>

                            <span
                                class="text-xl group-hover:translate-x-2 transition-transform duration-300"
                            >
                                →
                            </span>

                        </div>

                    </div>

                </RouterLink>

            </div>

        </section>


        <!-- =================================================
             ALFABETIZACIÓN + ABRIR CAMINOS
        ================================================== -->

        <section
            class="max-w-6xl mx-auto px-6 pb-14"
        >

            <div
                class="bg-white rounded-3xl shadow-lg overflow-hidden"
            >

                <div
                    class="grid md:grid-cols-2"
                >

                    <div
                        class="min-h-72"
                    >

                        <img
                            src="/fotos/cursos/cursosgenerales/abrircaminos.png"
                            alt="La importancia de aprender a leer y escribir"
                            class="w-full h-full object-cover"
                        />

                    </div>


                    <div
                        class="bg-white p-8 md:p-10 flex flex-col items-center justify-center text-center"
                    >

                        <div
                            class="w-40 h-20 mb-6 rounded-2xl bg-white shadow-md flex items-center justify-center overflow-hidden"
                        >

                            <img
                                src="/fotos/cursos/cursosgenerales/iconoauto.png"
                                alt="Alfabetización"
                                class="w-full h-full object-contain p-2"
                            />

                        </div>


                        <p
                            class="text-red-700 uppercase tracking-widest font-bold text-sm mb-3"
                        >
                            Autoaprendizaje
                        </p>


                        <h2
                            class="text-3xl md:text-4xl font-black mb-5 text-gray-900"
                        >
                            Alfabetización
                        </h2>


                        <div
                            class="max-w-2xl"
                        >

                            <p
                                class="text-gray-600 text-lg leading-relaxed mb-4"
                            >
                                Aprende a leer y escribir paso a paso con
                                actividades sencillas que puedes realizar
                                a tu propio ritmo.
                            </p>

                            <p
                                class="text-gray-600 text-lg leading-relaxed mb-6"
                            >
                                Leer y escribir abre caminos, ayuda a ganar
                                autonomía y puede abrir nuevas oportunidades
                                en el día a día.
                            </p>

                        </div>


                        <RouterLink
                            to="/alfabetizacion"
                            class="inline-flex items-center justify-center bg-red-700 hover:bg-red-800 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                        >

                            Empezar a aprender

                            <span
                                class="ml-2 text-xl"
                            >
                                →
                            </span>

                        </RouterLink>

                    </div>

                </div>

            </div>

        </section>


        <!-- =================================================
             NAVEGACIÓN FINAL
        ================================================== -->

        <section
            class="border-t border-gray-200 bg-white"
        >

            <div
                class="max-w-6xl mx-auto px-6 py-12"
            >

                <div
                    class="flex flex-wrap items-center justify-center gap-3"
                >

                    <RouterLink
                        to="/"
                        class="font-black text-xl px-5 py-3 rounded-xl bg-red-700 text-white hover:bg-red-800 hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        ExAequo
                    </RouterLink>


                    <RouterLink
                        to="/cursos-generales"
                        class="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 hover:-translate-y-0.5 font-semibold text-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        Cursos
                    </RouterLink>


                    <RouterLink
                        to="/castellano"
                        class="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 hover:-translate-y-0.5 font-semibold text-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        Castellano
                    </RouterLink>


                    <RouterLink
                        to="/catalan"
                        class="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 hover:-translate-y-0.5 font-semibold text-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        Catalán
                    </RouterLink>


                    <RouterLink
                        to="/alfabetizacion"
                        class="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 hover:-translate-y-0.5 font-semibold text-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        Alfabetización
                    </RouterLink>


                    <RouterLink
                        to="/matricula"
                        class="px-5 py-3 rounded-xl bg-red-700 hover:bg-red-800 hover:-translate-y-0.5 text-white font-bold shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        Matrícula
                    </RouterLink>

                </div>

            </div>

        </section>


    </main>

</div>

</template>


<script setup>

import NavbarCursos from '../../components/cursosymatricula/NavbarCursos.vue'

</script>
