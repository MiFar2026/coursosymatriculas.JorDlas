<template>

    <div
        class="min-h-screen bg-cover bg-center bg-fixed"
        style="background-image: url('/fotos/ateneu/general/background.png');"
    >

        <div class="min-h-screen bg-white/65">

            <!-- =================================================
                 NAVBAR
            ================================================== -->

            <NavbarAteneu />


            <main>

                <!-- =================================================
                     HERO
                ================================================== -->

                <section
                    class="relative overflow-hidden"
                >

                    <!-- Decoración -->

                    <div
                        class="absolute -top-24 -right-24 w-72 h-72 bg-red-100 rounded-full opacity-40"
                    ></div>

                    <div
                        class="absolute -bottom-32 -left-20 w-80 h-80 bg-amber-100 rounded-full opacity-30"
                    ></div>


                    <div
                        class="relative max-w-7xl mx-auto px-6 py-20 md:py-24"
                    >

                        <div
                            class="max-w-4xl mx-auto text-center"
                        >


                            <h1
                                class="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-6 drop-shadow-sm"
                            >
                                Escuela Ateneu Aula 502
                            </h1>


                            <p
                                class="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium"
                            >
                                Un proyecto educativo y cultural
                                vinculado al Ateneu Barcelonès.
                            </p>

                        </div>

                    </div>

                </section>



                <!-- =================================================
                     QUIÉNES SOMOS + CONTACTO
                ================================================== -->

                <section>

                    <div
                        class="max-w-6xl mx-auto px-6 py-16 md:py-20"
                    >

                        <div
                            class="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        >


                            <!-- =================================================
                                 QUIÉNES SOMOS
                            ================================================== -->

                            <article
                                class="relative overflow-hidden bg-gradient-to-br from-red-700 to-red-900 text-white rounded-3xl p-8 md:p-10 shadow-2xl border-4 border-red-300"
                            >

                                <!-- Decoración -->

                                <div
                                    class="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-white opacity-10"
                                ></div>

                                <div
                                    class="absolute -left-16 -bottom-20 w-52 h-52 rounded-full bg-amber-400 opacity-10"
                                ></div>


                                <div class="relative">

                                    <p
                                        class="text-red-100 font-bold uppercase tracking-widest text-xs md:text-sm mb-3"
                                    >
                                        Quiénes somos
                                    </p>


                                    <h2
                                        class="text-3xl md:text-4xl font-bold mb-6"
                                    >
                                        Un espacio para aprender y compartir
                                    </h2>


                                    <p
                                        class="text-red-50 leading-relaxed mb-5"
                                    >
                                        La Escuela Ateneu Aula 502 forma parte
                                        de un proyecto educativo y cultural
                                        vinculado al Ateneu Barcelonès.
                                    </p>


                                    <p
                                        class="text-red-50 leading-relaxed mb-5"
                                    >
                                        Un espacio dedicado a la educación,
                                        la cultura y el conocimiento, abierto
                                        a personas de diferentes orígenes.
                                    </p>


                                    <p
                                        class="text-red-50 leading-relaxed"
                                    >
                                        Queremos crear un lugar donde aprender,
                                        compartir y participar.
                                    </p>

                                </div>

                            </article>



                            <!-- =================================================
                                 DÓNDE ESTAMOS
                            ================================================== -->

                            <a
                                href="https://maps.app.goo.gl/egjrFMMN6ZyMUxz98"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="group relative bg-white rounded-3xl border-4 border-amber-200 shadow-2xl hover:shadow-3xl transition overflow-hidden"
                            >

                                <!-- Imagen del mapa -->

                                <div
                                    class="h-56 md:h-64 overflow-hidden bg-gray-100"
                                >

                                    <img
                                        src="/fotos/ateneu/general/mapa1.png"
                                        alt="Mapa del Ateneu Barcelonès"
                                        class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    >

                                </div>


                                <!-- Información -->

                                <div
                                    class="p-7"
                                >

                                    <div
                                        class="flex items-start justify-between gap-4 pr-14"
                                    >

                                        <div>

                                            <p
                                                class="text-red-700 font-bold uppercase tracking-widest text-xs mb-2"
                                            >
                                                Dónde estamos
                                            </p>


                                            <h2
                                                class="text-2xl font-bold text-gray-800"
                                            >
                                                Ateneu Barcelonès
                                            </h2>

                                        </div>

                                    </div>


                                    <!-- =================================================
                                         FLECHA MAPA
                                         Ahora queda aproximadamente a mitad
                                         de la tarjeta
                                    ================================================== -->

                                    <img
                                        src="/fotos/ateneu/general/flecha.png"
                                        alt="Abrir mapa"
                                        class="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 object-contain opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition duration-300"
                                    >


                                    <div
                                        class="mt-6 space-y-4"
                                    >

                                        <!-- Dirección -->

                                        <div
                                            class="flex items-center gap-4"
                                        >

                                            <div
                                                class="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0"
                                            >

                                                <img
                                                    src="/fotos/ateneu/general/map.png"
                                                    alt=""
                                                    class="w-6 h-6 object-contain"
                                                >

                                            </div>


                                            <p
                                                class="text-gray-600 text-sm"
                                            >
                                                Carrer de la Canuda, 6<br>
                                                08002 Barcelona
                                            </p>

                                        </div>


                                        <!-- Teléfono -->

                                        <div
                                            class="flex items-center gap-4"
                                        >

                                            <div
                                                class="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0"
                                            >

                                                <img
                                                    src="/fotos/ateneu/general/tel.png"
                                                    alt=""
                                                    class="w-10 h-10 object-contain opacity-70 translate-y-2 group-hover:opacity-100 transition duration-300"
                                                >

                                            </div>


                                            <p
                                                class="text-gray-600 text-sm"
                                            >
                                                93 343 61 21
                                            </p>

                                        </div>


                                        <!-- Email -->

                                        <div
                                            class="flex items-center gap-4"
                                        >

                                            <div
                                                class="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0"
                                            >

                                                <img
                                                    src="/fotos/ateneu/general/mail.png"
                                                    alt=""
                                                    class="w-6 h-6 object-contain"
                                                >

                                            </div>


                                            <p
                                                class="text-gray-600 text-sm break-all"
                                            >
                                                info@ateneubcn.cat
                                            </p>

                                        </div>

                                    </div>


                                    <div
                                        class="mt-6 pt-5 border-t border-gray-100"
                                    >

                                        <p
                                            class="text-sm font-bold text-red-700"
                                        >
                                            Abrir ubicación en Google Maps
                                        </p>

                                    </div>

                                </div>

                            </a>

                        </div>

                    </div>

                </section>



                <!-- =================================================
                     NUESTRA ESCUELA
                ================================================== -->

                <section
                    class="border-y border-white/40"
                >

                    <div
                        class="max-w-6xl mx-auto px-6 py-16 md:py-20"
                    >

                        <!-- Encabezado -->

                        <div
                            class="text-center max-w-3xl mx-auto mb-12"
                        >

                            <p
                                class="text-red-700 font-bold uppercase tracking-widest text-xs md:text-sm mb-3"
                            >
                                Nuestra escuela
                            </p>


                            <h2
                                class="text-3xl md:text-4xl font-bold text-gray-800 mb-4 drop-shadow-sm"
                            >
                                Todo lo que necesitas para aprender
                            </h2>


                            <p
                                class="text-gray-700 leading-relaxed font-medium"
                            >
                                Accede a la información de tutores,
                                alumnos y recursos educativos.
                            </p>

                        </div>



                        <!-- =================================================
                             TARJETAS
                        ================================================== -->

                        <div
                            class="grid grid-cols-1 md:grid-cols-3 gap-7"
                        >


                            <!-- =================================================
                                 TUTORES
                            ================================================== -->

                            <RouterLink
                                to="/ateneu/tutores"
                                class="group bg-white rounded-3xl overflow-hidden border-4 border-red-200 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:border-red-400 transition duration-300"
                            >

                                <div
                                    class="h-48 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center overflow-hidden border-b-4 border-red-200"
                                >

                                    <img
                                        src="/fotos/ateneu/general/tutores.png"
                                        alt="Tutores"
                                        class="w-32 h-32 object-contain group-hover:scale-110 transition duration-300"
                                    >

                                </div>


                                <div
                                    class="p-6"
                                >

                                    <div
                                        class="flex items-center justify-between mb-3"
                                    >

                                        <h3
                                            class="text-xl font-bold text-gray-800"
                                        >
                                            Tutores
                                        </h3>


                                        <span
                                            class="text-red-700 text-4xl font-black leading-none group-hover:translate-x-2 transition duration-300"
                                        >
                                            →
                                        </span>

                                    </div>


                                    <p
                                        class="text-gray-600 text-sm leading-relaxed"
                                    >
                                        Información y recursos para los
                                        tutores de la escuela.
                                    </p>

                                </div>

                            </RouterLink>



                            <!-- =================================================
                                 ALUMNOS
                            ================================================== -->

                            <RouterLink
                                to="/ateneu/alumnos"
                                class="group bg-white rounded-3xl overflow-hidden border-4 border-amber-200 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:border-amber-400 transition duration-300"
                            >

                                <div
                                    class="h-48 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center overflow-hidden border-b-4 border-amber-200"
                                >

                                    <img
                                        src="/fotos/ateneu/general/estudiante.png"
                                        alt="Alumnos"
                                        class="w-32 h-32 object-contain group-hover:scale-110 transition duration-300"
                                    >

                                </div>


                                <div
                                    class="p-6"
                                >

                                    <div
                                        class="flex items-center justify-between mb-3"
                                    >

                                        <h3
                                            class="text-xl font-bold text-gray-800"
                                        >
                                            Alumnos
                                        </h3>


                                        <span
                                            class="text-amber-600 text-4xl font-black leading-none group-hover:translate-x-2 transition duration-300"
                                        >
                                            →
                                        </span>

                                    </div>


                                    <p
                                        class="text-gray-600 text-sm leading-relaxed"
                                    >
                                        Información, materiales y recursos
                                        para nuestros alumnos.
                                    </p>

                                </div>

                            </RouterLink>



                            <!-- =================================================
                                 RECURSOS
                            ================================================== -->

                            <RouterLink
                                to="/ateneu/recursos"
                                class="group bg-white rounded-3xl overflow-hidden border-4 border-blue-200 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:border-blue-400 transition duration-300"
                            >

                                <div
                                    class="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center overflow-hidden border-b-4 border-blue-200"
                                >

                                    <img
                                        src="/fotos/ateneu/general/recurso.png"
                                        alt="Recursos"
                                        class="w-32 h-32 object-contain group-hover:scale-110 transition duration-300"
                                    >

                                </div>


                                <div
                                    class="p-6"
                                >

                                    <div
                                        class="flex items-center justify-between mb-3"
                                    >

                                        <h3
                                            class="text-xl font-bold text-gray-800"
                                        >
                                            Recursos
                                        </h3>


                                        <span
                                            class="text-blue-700 text-4xl font-black leading-none group-hover:translate-x-2 transition duration-300"
                                        >
                                            →
                                        </span>

                                    </div>


                                    <p
                                        class="text-gray-600 text-sm leading-relaxed"
                                    >
                                        Materiales educativos para continuar
                                        aprendiendo dentro y fuera del aula.
                                    </p>

                                </div>

                            </RouterLink>

                        </div>

                    </div>

                </section>



                <!-- =================================================
                     HORARIOS
                ================================================== -->

                <section>

                    <div
                        class="max-w-6xl mx-auto px-6 py-16 md:py-20"
                    >

                        <div
                            class="bg-gradient-to-r from-amber-50/95 to-red-50/95 rounded-3xl p-8 md:p-12 border-4 border-red-100 shadow-xl"
                        >

                            <div
                                class="flex flex-col md:flex-row items-center justify-between gap-8"
                            >

                                <div
                                    class="text-center md:text-left"
                                >

                                    <p
                                        class="text-red-700 font-bold uppercase tracking-widest text-xs md:text-sm mb-3"
                                    >
                                        Organización
                                    </p>


                                    <h2
                                        class="text-3xl font-bold text-gray-800 mb-3"
                                    >
                                        Horarios de los cursos
                                    </h2>


                                    <p
                                        class="text-gray-600 max-w-xl"
                                    >
                                        Consulta los horarios y la información
                                        de nuestros cursos.
                                    </p>

                                </div>


                                <RouterLink
                                    to="/ateneu/horarios"
                                    class="inline-flex items-center gap-3 bg-red-700 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-red-800 hover:shadow-lg transition flex-shrink-0"
                                >

                                    Ver horarios

                                    <span
                                        class="text-2xl font-black leading-none"
                                    >
                                        →
                                    </span>

                                </RouterLink>

                            </div>

                        </div>

                    </div>

                </section>



                <!-- =================================================
                     OTRA ESCUELA
                     
                     Joan Miró es independiente del Ateneu.
                ================================================== -->

                <section
                    class="bg-gray-900/95 text-white"
                >

                    <div
                        class="max-w-6xl mx-auto px-6 py-10"
                    >

                        <div
                            class="flex flex-col md:flex-row items-center justify-between gap-5"
                        >

                            <div
                                class="text-center md:text-left"
                            >

                                <p
                                    class="text-gray-400 text-sm mb-1"
                                >
                                    ¿Buscas otra escuela?
                                </p>


                                <p
                                    class="font-semibold text-lg"
                                >
                                    Escuela Biblioteca Joan Miró
                                </p>

                            </div>


                            <RouterLink
                                to="/joanmiro"
                                class="inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                            >

                                Ir a la escuela Joan Miró

                                <img
                                    src="/fotos/ateneu/general/flecha.png"
                                    alt=""
                                    class="w-6 h-6 object-contain"
                                >

                            </RouterLink>

                        </div>

                    </div>

                </section>

            </main>

        </div>

    </div>

</template>



<script setup>

import NavbarAteneu
    from '../../components/ateneu/NavbarAteneu.vue'

</script>