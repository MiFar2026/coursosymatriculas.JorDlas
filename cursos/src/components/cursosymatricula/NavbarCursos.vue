<template>

    <nav class="bg-red-950 text-white shadow-md">

        <div class="max-w-7xl mx-auto px-4 md:px-6 py-4">

            <div class="flex flex-wrap items-center justify-between gap-3">

                <!-- EXAEQUO -->

                <RouterLink
                    to="/"
                    class="font-black text-xl hover:text-red-200 transition"
                >
                    ExAequo
                </RouterLink>


                <!-- NAVEGACIÓN -->

                <div class="flex flex-wrap items-center gap-2 md:gap-3">

                    <RouterLink
                        to="/cursos-generales"
                        class="px-3 py-2 rounded-lg hover:bg-white/10 transition font-semibold"
                    >
                        CURSOS
                    </RouterLink>

                    <RouterLink
                        to="/castellano"
                        class="px-3 py-2 rounded-lg hover:bg-white/10 transition font-semibold"
                    >
                        CASTELLANO
                    </RouterLink>

                    <RouterLink
                        to="/catalan"
                        class="px-3 py-2 rounded-lg hover:bg-white/10 transition font-semibold"
                    >
                        CATALÁN
                    </RouterLink>

                    <RouterLink
                        to="/alfabetizacion"
                        class="px-3 py-2 rounded-lg hover:bg-white/10 transition font-semibold"
                    >
                        ALFABETIZACIÓN
                    </RouterLink>

                    <RouterLink
                        to="/matricula"
                        class="px-4 py-2 rounded-lg bg-white text-red-900 hover:bg-red-100 transition font-black"
                    >
                        MATRÍCULA
                    </RouterLink>

                </div>

            </div>

        </div>

    </nav>

</template>