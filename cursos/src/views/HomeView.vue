<template>

    <div class="min-h-screen bg-gray-100">

        <!-- NAVBAR PRINCIPAL -->
        <NavbarPrincipal />

        <!-- CABECERA -->
        <section class="text-center py-12 px-6">

            <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Bienvenidos
            </h1>

            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
                Un espacio educativo y cultural para aprender,
                participar, crear y compartir.
            </p>

        </section>


        <!-- TARJETAS -->
        <section class="max-w-6xl mx-auto px-6 pb-16">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

                <!-- JOAN MIRÓ -->
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden">

                    <div class="h-56 overflow-hidden">
                        <img
                            src="/fotos/EXAEQUO/joan-miro.jpg"
                            alt="Escuela Biblioteca Joan Miró"
                            class="w-full h-full object-cover"
                        >
                    </div>

                    <div class="p-8">

                        <h2 class="text-2xl font-bold text-gray-800 mb-4">
                            Escuela Biblioteca Joan Miró
                        </h2>

                        <p class="text-gray-600 mb-6">
                            Un espacio de aprendizaje, cultura y participación
                            abierto a personas de diferentes edades y procedencias.
                        </p>

                        <RouterLink
                            to="/joan-miro"
                            class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                        >
                            Saber más...
                        </RouterLink>

                    </div>
                </div>


                <!-- ATENEU -->
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden">

                    <div class="h-56 overflow-hidden">
                        <img
                            src="/fotos/EXAEQUO/ateneu.jpg"
                            alt="Escuela Ateneu Aula 502"
                            class="w-full h-full object-cover"
                        >
                    </div>

                    <div class="p-8">

                        <h2 class="text-2xl font-bold text-gray-800 mb-4">
                            Escuela Ateneu Aula 502
                        </h2>

                        <p class="text-gray-600 mb-6">
                            Cursos, actividades y espacios de encuentro
                            para aprender y participar en la comunidad.
                        </p>

                        <RouterLink
                            to="/ateneu"
                            class="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
                        >
                            Saber más...
                        </RouterLink>

                    </div>
                </div>


                <!-- CURSOS -->
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden">

                    <div class="h-56 overflow-hidden">
                        <img
                            src="/fotos/EXAEQUO/cursos.jpg"
                            alt="Cursos generales y matrículas"
                            class="w-full h-full object-cover"
                        >
                    </div>

                    <div class="p-8">

                        <h2 class="text-2xl font-bold text-gray-800 mb-4">
                            Cursos generales y matrículas
                        </h2>

                        <p class="text-gray-600 mb-6">
                            Aprende Castellano, Catalán y Alfabetización.
                            Consulta los cursos disponibles y realiza tu matrícula.
                        </p>

                        <RouterLink
                            to="/cursos-generales"
                            class="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold"
                        >
                            Saber más...
                        </RouterLink>

                    </div>
                </div>


                <!-- PREMIO -->
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden">

                    <div class="h-56 overflow-hidden">
                        <img
                            src="/fotos/EXAEQUO/premio.jpg"
                            alt="Premio de literatura y poesía"
                            class="w-full h-full object-cover"
                        >
                    </div>

                    <div class="p-8">

                        <h2 class="text-2xl font-bold text-gray-800 mb-4">
                            Premio de literatura y poesía
                        </h2>

                        <p class="text-gray-600 mb-6">
                            Un espacio dedicado a la creación literaria,
                            la poesía y la participación cultural.
                        </p>

                        <RouterLink
                            to="/premio"
                            class="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold"
                        >
                            Saber más...
                        </RouterLink>

                    </div>
                </div>

            </div>

        </section>


        <!-- PARTE FINAL -->
        <section class="bg-white py-12 text-center">

            <h2 class="text-2xl font-bold text-gray-800 mb-3">
                Aprende · Participa · Crea
            </h2>

            <p class="text-gray-600">
                Descubre nuestros cursos y actividades.
            </p>

        </section>

    </div>

</template>


<script setup>

import NavbarPrincipal from '../components/NavbarPrincipal.vue'

</script>