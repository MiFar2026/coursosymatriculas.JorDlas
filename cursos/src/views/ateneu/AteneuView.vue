<template>

    <div class="min-h-screen bg-gray-100">

        <div class="max-w-5xl mx-auto px-6 py-12">

            <h1 class="text-4xl font-bold text-gray-800 mb-6">
                Escuela Ateneu Aula 502
            </h1>


            <!-- FOTO -->

            <div class="h-72 bg-green-100 rounded-2xl flex items-center justify-center mb-8">

                <div class="text-center">

                    <div class="text-8xl mb-3">
                        🏫
                    </div>

                    <p class="text-green-700 font-semibold text-lg">
                        Foto de la Escuela Ateneu Aula 502
                    </p>

                </div>

            </div>


            <div class="bg-white rounded-2xl shadow-lg p-8">

                <h2 class="text-2xl font-bold mb-4">
                    Formación y participación
                </h2>

                <p class="text-gray-600 mb-6">
                    La Escuela Ateneu Aula 502 ofrece espacios
                    para el aprendizaje, la formación y la participación.
                </p>

                <p class="text-gray-600 mb-8">
                    Consulta nuestros cursos y actividades disponibles.
                </p>


                <div class="flex flex-wrap gap-4">

                    <RouterLink
                        to="/castellano"
                        class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Castellano
                    </RouterLink>


                    <RouterLink
                        to="/catalan"
                        class="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Catalán
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