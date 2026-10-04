<template>

    <div class="min-h-screen bg-gray-100">

        <div class="max-w-5xl mx-auto px-6 py-12">

            <h1 class="text-4xl font-bold text-gray-800 mb-6">
                Escuela Biblioteca Joan Miró
            </h1>


            <!-- FOTO -->

            <div class="h-72 bg-blue-100 rounded-2xl flex items-center justify-center mb-8">

                <div class="text-center">

                    <div class="text-8xl mb-3">
                        📚
                    </div>

                    <p class="text-blue-700 font-semibold text-lg">
                        Foto de la Escuela Biblioteca Joan Miró
                    </p>

                </div>

            </div>


            <div class="bg-white rounded-2xl shadow-lg p-8">

                <h2 class="text-2xl font-bold mb-4">
                    Bienvenidos a nuestra escuela
                </h2>

                <p class="text-gray-600 mb-6">
                    En esta escuela ofrecemos diferentes actividades
                    educativas y culturales para la comunidad.
                </p>

                <p class="text-gray-600 mb-8">
                    Aquí podrás encontrar cursos, actividades,
                    talleres y espacios de aprendizaje.
                </p>


                <div class="flex flex-wrap gap-4">

                    <RouterLink
                        to="/castellano"
                        class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Cursos de Castellano
                    </RouterLink>


                    <RouterLink
                        to="/catalan"
                        class="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Cursos de Catalán
                    </RouterLink>


                    <RouterLink
                        to="/matricula"
                        class="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Matrícula
                    </RouterLink>

                </div>

            </div>

        </div>

    </div>

</template>