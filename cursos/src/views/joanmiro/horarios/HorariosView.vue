<template>
    <div class="min-h-screen bg-white">

        <NavbarJoanmiro />

        <main>

            <section
                class="max-w-6xl mx-auto px-6 pt-16 pb-20"
            >

                <div
                    class="max-w-3xl mx-auto text-center"
                >

                    <p
                        class="text-red-700 font-bold uppercase tracking-widest text-sm mb-3"
                    >
                        Escuela Biblioteca Joan Miró
                    </p>

                    <h1
                        class="text-4xl md:text-5xl font-bold text-gray-800 mb-5"
                    >
                        Horarios
                    </h1>

                    <p
                        class="text-lg text-gray-600 leading-relaxed"
                    >
                        Consulta los horarios de los cursos
                        de la Escuela Biblioteca Joan Miró.
                    </p>

                </div>


                <div
                    class="max-w-4xl mx-auto mt-12 bg-gray-50 rounded-2xl border border-gray-200 p-8"
                >

                    <h2
                        class="text-2xl font-bold text-gray-800 mb-4"
                    >
                        Horarios de los cursos
                    </h2>

                    <p
                        class="text-gray-600 leading-relaxed"
                    >
                        En esta sección se publicarán los horarios
                        y la información de los diferentes cursos.
                    </p>

                </div>

            </section>

        </main>

    </div>
</template>


<script setup>

import NavbarJoanmiro
    from '../../../components/joanmiro/NavbarJoanmiro.vue'

</script>