<template>
    <div class="min-h-screen text-slate-800">

        <!-- =========================================================
             NAVBAR
        ========================================================== -->
        <nav class="bg-red-950 text-white shadow-lg sticky top-0 z-50">

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
                            HOME
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
                            class="px-3 py-2 rounded-lg bg-white/10 transition font-semibold"
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


        <!-- =========================================================
             CONTENIDO PRINCIPAL
        ========================================================== -->

    <main
    class="min-h-screen bg-[#ae8e3c] bg-cover bg-center bg-fixed"
    :style="{
        backgroundImage: `
            linear-gradient(
                rgba(177, 146, 67, 0.82),
                rgba(177, 146, 67, 0.82)
            ),
            url('/fotos/cursos/alfabetizacion/aprender.escritura/lamina.png')
        `
    }"
>

            

            <!-- CONTENIDO -->
            <div class="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">


                <!-- =================================================
                     VOLVER
                ================================================== -->

                <RouterLink
                    to="/alfabetizacion"
                    class="inline-flex items-center gap-3 bg-white/90 hover:bg-red-950 hover:text-white text-red-900 px-5 py-3 rounded-xl shadow-md transition-all duration-300 font-bold mb-8"
                >
                    <span class="text-2xl leading-none">←</span>

                    <span>
                        Volver a Alfabetización
                    </span>
                </RouterLink>


                <!-- =================================================
                     CABECERA
                ================================================== -->

                <section
                    class="bg-white/50 backdrop-transparent rounded-3xl shadow-xl border border-red-100 overflow-hidden mb-10"
                >

                    <div class="p-6 md:p-10 text-center">

                        <div
    class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-5 shadow-inner"
>
    <img
        src="/fotos/cursos/alfabetizacion/icon4.png"
        alt="Aprender a escribir"
        class="w-20 h-20 rounded-full"
    />
</div>

                        <p
                            class="text-red-800 font-black uppercase tracking-widest text-sm mb-3"
                        >
                            Alfabetización
                        </p>

                        <h1
                            class="text-4xl md:text-6xl font-black text-red-950 leading-tight"
                        >
                            Aprender a escribir
                        </h1>

                        <p
                            class="max-w-3xl mx-auto mt-5 text-lg md:text-xl text-slate-600 leading-relaxed"
                        >
                            Aprende poco a poco a escribir con el lápiz,
                            practica los trazos, conoce las letras y avanza
                            desde la escritura sencilla hasta la escritura
                            cursiva.
                        </p>

                    </div>


        <!-- MINI RESUMEN -->
<div class="grid md:grid-cols-2 border-t border-red-100">

    <!-- ESCRITURA SENCILLA -->
    <a
        href="#paso-2"
        class="block p-6 md:p-8 bg-red-50 hover:bg-red-100 transition"
    >
        <div class="flex gap-4">
            <div class="shrink-0">
                <img
                    src="/fotos/cursos/alfabetizacion/icon2.png"
                    alt="Escritura sencilla"
                    class="w-20 h-20 rounded-full"
                />
            </div>

            <div>
                <h2 class="font-black text-xl text-red-950">
                    Escritura sencilla
                </h2>

                <p class="mt-2 text-slate-600">
                    Empezamos aprendiendo las letras de
                    forma clara y sencilla, como aparecen
                    normalmente en los libros.
                </p>
            </div>
        </div>
    </a>

    <!-- ESCRITURA CURSIVA -->
    <a
        href="#paso-3"
        class="block p-6 md:p-8 bg-amber-50 hover:bg-amber-100 transition"
    >
        <div class="flex gap-4">
            <div class="shrink-0">
                <img
                    src="/fotos/cursos/alfabetizacion/icon1.png"
                    alt="Escritura cursiva"
                    class="w-20 h-20 rounded-full"
                />
            </div>

            <div>
                <h2 class="font-black text-xl text-red-950">
                    Escritura cursiva
                </h2>

                <p class="mt-2 text-slate-600">
                    Después practicamos la escritura
                    cursiva, uniendo los movimientos
                    para escribir de una manera más
                    fluida.
                </p>
            </div>
        </div>
    </a>

</div>
                </section>
             
             


<!-- =================================================
     CONSEJO INICIAL
================================================== -->

<section
    id="consejo-inicial"
    class="bg-red-950 text-white rounded-3xl shadow-xl p-6 md:p-8 mb-12"
>
    <div
        class="flex flex-col md:flex-row items-center gap-6 cursor-pointer"
        @click="irAPaso('paso-1')"
    >

        <div
            class="w-20 h-20 shrink-0 rounded-full bg-white/10 flex items-center justify-center"
        >
            <img
                src="/fotos/cursos/alfabetizacion/icon3.png"
                alt="Escritura"
                class="w-20 h-20 rounded-full"
            />
        </div>

        <div class="text-center md:text-left">

            <h2 class="text-2xl md:text-3xl font-black">
                Empezamos con el lápiz
            </h2>

            <p class="mt-2 text-red-100 text-lg">
                Antes de escribir muchas letras, es importante
                aprender a controlar el lápiz. Practica
                líneas, curvas y movimientos sencillos.
            </p>

        </div>

    </div>
</section>



                <!-- =================================================
                     PROGRESO
                ================================================== -->

                <section class="mb-14">

                    <div class="text-center mb-8">

                        <p
                            class="text-red-800 font-black uppercase tracking-widest text-sm"
                        >
                            Nuestro recorrido
                        </p>

                        <h2
                            class="text-3xl md:text-4xl font-black text-red-950 mt-2"
                        >
                            Aprende paso a paso
                        </h2>

                    </div>


                    <div class="grid md:grid-cols-2 xl:grid-cols-5 gap-5">

                        <div
                            v-for="step in steps"
                            :key="step.number"
                            class="bg-white/95 rounded-2xl shadow-lg border border-white p-5 hover:-translate-y-1 transition duration-300"
                        >

                            <div
                                class="w-11 h-11 rounded-full bg-red-950 text-white flex items-center justify-center font-black text-lg mb-4"
                            >
                                {{ step.number }}
                            </div>

                            <div class="text-3xl mb-3">
                                {{ step.icon }}
                            </div>

                            <h3 class="font-black text-lg text-red-950">
                                {{ step.title }}
                            </h3>

                            <p class="text-sm text-slate-600 mt-2">
                                {{ step.description }}
                            </p>

                        </div>

                    </div>

                </section>


                <!-- =================================================
                     1. TRAZOS
                ================================================== -->

 <section
    id="paso-1"
    class="bg-white/95 backdrop-blur rounded-3xl shadow-xl p-6 md:p-10 mb-10"
>

                    <div class="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">

                        <div>

                            <span
                                class="inline-block bg-red-100 text-red-900 px-3 py-1 rounded-full text-sm font-black mb-3"
                            >
                                PASO 1
                            </span>

                            <h2
                                class="text-3xl md:text-4xl font-black text-red-950"
                            >
                                Practicamos con el lápiz
                            </h2>

                            <p class="mt-3 text-slate-600 max-w-3xl">
                                Empieza haciendo los ejercicios de trazos.
                                No tengas prisa. Lo importante es aprender a
                                mover el lápiz con seguridad.
                            </p>

                        </div>

                        <div class="text-4xl">
                            ✏️
                        </div>

                    </div>


                    <div class="grid md:grid-cols-3 gap-6">

                        <div
                            v-for="item in strokeExercises"
                            :key="item.title"
                            class="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition"
                        >

                            <div class="aspect-[4/3] bg-white overflow-hidden">

                                <img
                                    :src="item.src"
                                    :alt="item.title"
                                    class="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                                />

                            </div>

                            <div class="p-5">

                                <h3 class="font-black text-lg text-red-950">
                                    {{ item.title }}
                                </h3>

                                <p class="text-sm text-slate-600 mt-2">
                                    {{ item.description }}
                                </p>

                                <button
                                    @click="openImage(item)"
                                    class="mt-4 w-full bg-red-950 text-white py-2.5 rounded-xl font-bold hover:bg-red-800 transition"
                                >
                                    Ver lámina
                                </button>

                            </div>

                        </div>

                    </div>

                </section>


                <!-- =================================================
                     2. LETRAS SIMPLES
                ================================================== -->

                <section
    id="paso-2"
    class="bg-white/95 backdrop-blur rounded-3xl shadow-xl p-6 md:p-10 mb-10"
>

                    <div class="mb-8">

                        <span
                            class="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-black mb-3"
                        >
                            PASO 2
                        </span>

                        <h2
                            class="text-3xl md:text-4xl font-black text-red-950"
                        >
                            Aprendemos las letras sencillas
                        </h2>

                        <p class="mt-3 text-slate-600 max-w-3xl">
                            Primero conocemos cómo se escriben las letras de
                            forma sencilla. Puedes observarlas y después
                            practicar escribiéndolas tú mismo.
                        </p>

                    </div>


                    <div class="grid md:grid-cols-2 gap-6">

                        <div
                            v-for="item in simpleLetters"
                            :key="item.title"
                            class="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 hover:shadow-xl transition"
                        >

                            <div class="p-5">

                                <div class="flex items-start justify-between gap-4">

                                    <div>

                                        <h3
                                            class="text-xl font-black text-red-950"
                                        >
                                            {{ item.title }}
                                        </h3>

                                        <p class="text-slate-600 mt-2">
                                            {{ item.description }}
                                        </p>

                                    </div>

                                    <span class="text-3xl">
                                        {{ item.icon }}
                                    </span>

                                </div>


                                <div
                                    class="mt-5 flex flex-wrap gap-3"
                                >

                                    <button
                                        @click="openPdf(item.src)"
                                        class="px-4 py-2.5 rounded-xl bg-red-950 text-white font-bold hover:bg-red-800 transition"
                                    >
                                        📄 Ver PDF
                                    </button>

                                    <a
                                        :href="item.src"
                                        target="_blank"
                                        class="px-4 py-2.5 rounded-xl bg-white border border-red-200 text-red-900 font-bold hover:bg-red-50 transition"
                                    >
                                        Abrir
                                    </a>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                <!-- =================================================
                     3. CURSIVA
                ================================================== -->

                <section
    id="paso-3"
    class="bg-white/95 backdrop-blur rounded-3xl shadow-xl p-6 md:p-10 mb-10"
>

                    <div class="mb-8">

                        <span
                            class="inline-block bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-sm font-black mb-3"
                        >
                            PASO 3
                        </span>

                        <h2
                            class="text-3xl md:text-4xl font-black text-red-950"
                        >
                            Ahora aprendemos cursiva
                        </h2>

                        <p class="mt-3 text-slate-600 max-w-3xl">
                            Cuando ya conocemos los movimientos básicos,
                            podemos empezar a trabajar la escritura cursiva. Estas láminas permiten practicar escribiendo
                            encima de las letras.
                        </p>

                    </div>


                    <div class="grid md:grid-cols-3 gap-6">

                        <div
                            v-for="item in cursiveLetters"
                            :key="item.title"
                            class="bg-amber-50 rounded-2xl overflow-hidden border border-amber-200 hover:shadow-xl transition"
                        >

                            <div class="aspect-[4/3] bg-white">

                                <img
                                    :src="item.src"
                                    :alt="item.title"
                                    class="w-full h-full object-contain"
                                />

                            </div>

                            <div class="p-5">

                                <h3
                                    class="font-black text-lg text-red-950"
                                >
                                    {{ item.title }}
                                </h3>

                                <p
                                    class="text-sm text-slate-600 mt-2"
                                >
                                    {{ item.description }}
                                </p>

                                <button
                                    @click="openImage(item)"
                                    class="mt-4 w-full bg-red-950 text-white py-2.5 rounded-xl font-bold hover:bg-red-800 transition"
                                >
                                    Ver lámina
                                </button>

                            </div>

                        </div>

                    </div>

                </section>


                <!-- =================================================
                     4. NÚMEROS
                ================================================== -->

                <section
                    class="bg-white/95 backdrop-blur rounded-3xl shadow-xl p-6 md:p-10 mb-10"
                >

                    <div class="flex items-center gap-4 mb-8">

                        <div
                            class="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl"
                        >
                            🔢
                        </div>

                        <div>

                            <span
                                class="text-green-800 font-black text-sm uppercase tracking-widest"
                            >
                                PASO 4
                            </span>

                            <h2
                                class="text-3xl md:text-4xl font-black text-red-950"
                            >
                                También aprendemos los números
                            </h2>

                        </div>

                    </div>


                    <div
                        class="grid md:grid-cols-2 items-center gap-8"
                    >

                        <div>

                            <p
                                class="text-lg text-slate-600 leading-relaxed"
                            >
                                Practica los números con tranquilidad.
                                Observa su forma y después intenta
                                escribirlos tú mismo.
                            </p>

                            <button
                                @click="openImage(numbers)"
                                class="mt-6 bg-red-950 text-white px-6 py-3 rounded-xl font-black hover:bg-red-800 transition"
                            >
                                🔢 Ver ejercicios de números
                            </button>

                        </div>


                        <div
                            class="bg-slate-50 rounded-2xl p-4 border border-slate-200"
                        >

                            <img
                                :src="numbers.src"
                                :alt="numbers.title"
                                class="w-full max-h-96 object-contain rounded-xl"
                            />

                        </div>

                    </div>

                </section>


                <!-- =================================================
                     5. REESCRIBIR LÍNEAS
                ================================================== -->

                <section
                    class="bg-white/95 backdrop-blur rounded-3xl shadow-xl p-6 md:p-10 mb-10"
                >

                    <div class="mb-8">

                        <span
                            class="inline-block bg-purple-100 text-purple-900 px-3 py-1 rounded-full text-sm font-black mb-3"
                        >
                            PASO 5
                        </span>

                        <h2
                            class="text-3xl md:text-4xl font-black text-red-950"
                        >
                            Practicamos líneas
                        </h2>

                        <p class="mt-3 text-slate-600 max-w-3xl">
                            Finalmente podemos practicar líneas sencillas y
                            líneas cursivas. Repite los movimientos varias
                            veces para ganar seguridad y soltura.
                        </p>

                    </div>


                    <!-- SIMPLES -->

                    <div class="mb-10">

                        <h3
                            class="text-2xl font-black text-red-950 mb-5"
                        >
                            📖 Líneas sencillas
                        </h3>

                        <div class="grid md:grid-cols-2 gap-6">

                            <div
                                v-for="item in simpleLines"
                                :key="item.title"
                                class="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition"
                            >

                                <img
                                    :src="item.src"
                                    :alt="item.title"
                                    class="w-full aspect-[4/3] object-contain bg-white"
                                />

                                <div class="p-4">

                                    <h4 class="font-black text-red-950">
                                        {{ item.title }}
                                    </h4>

                                    <button
                                        @click="openImage(item)"
                                        class="mt-3 w-full py-2 bg-red-950 text-white rounded-lg font-bold hover:bg-red-800 transition"
                                    >
                                        Ver lámina
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>


                    <!-- CURSIVAS -->

                    <div>

                        <h3
                            class="text-2xl font-black text-red-950 mb-5"
                        >
                            ✍️ Líneas cursivas
                        </h3>

                        <div class="grid md:grid-cols-3 gap-6">

                            <div
                                v-for="item in cursiveLines"
                                :key="item.title"
                                class="bg-amber-50 rounded-2xl overflow-hidden border border-amber-200 hover:shadow-lg transition"
                            >

                                <img
                                    :src="item.src"
                                    :alt="item.title"
                                    class="w-full aspect-[4/3] object-contain bg-white"
                                />

                                <div class="p-4">

                                    <h4 class="font-black text-red-950">
                                        {{ item.title }}
                                    </h4>

                                    <button
                                        @click="openImage(item)"
                                        class="mt-3 w-full py-2 bg-red-950 text-white rounded-lg font-bold hover:bg-red-800 transition"
                                    >
                                        Ver lámina
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                <!-- =================================================
                     FINAL
                ================================================== -->

                <section
                    class="bg-gradient-to-br from-red-950 to-red-800 text-white rounded-3xl shadow-2xl p-8 md:p-12 text-center"
                >

                    <div class="text-5xl mb-5">
                        🌟
                    </div>

                    <h2
                        class="text-3xl md:text-4xl font-black"
                    >
                        ¡Practica un poco cada día!
                    </h2>

                    <p
                        class="max-w-2xl mx-auto mt-4 text-red-100 text-lg leading-relaxed"
                    >
                        No es necesario hacerlo todo de una vez.
                        Repite los ejercicios, avanza poco a poco y
                        celebra cada mejora.
<

                    </p>

                    <RouterLink
                        to="/alfabetizacion"
                        class="inline-flex items-center gap-2 mt-7 bg-white text-red-950 px-6 py-3 rounded-xl font-black hover:bg-red-100 transition"
                    >
                        ← Volver a Alfabetización
                    </RouterLink>

                </section>

            </div>

        </main>


        <!-- =========================================================
             MODAL IMAGEN
        ========================================================== -->

        <Transition name="fade">

            <div
                v-if="selectedImage"
                class="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
                @click.self="selectedImage = null"
            >

                <div
                    class="relative bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
                >

                    <!-- CABECERA MODAL -->

                    <div
                        class="flex items-center justify-between gap-4 p-4 border-b"
                    >

                        <div>

                            <h3
                                class="font-black text-red-950 text-lg"
                            >
                                {{ selectedImage.title }}
                            </h3>

                            <p
                                v-if="selectedImage.description"
                                class="text-sm text-slate-500"
                            >
                                {{ selectedImage.description }}
                            </p>

                        </div>

                        <button
                            @click="selectedImage = null"
                            class="w-10 h-10 rounded-full bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-900 font-black text-xl transition"
                            aria-label="Cerrar"
                        >
                            ×
                        </button>

                    </div>


                    <!-- IMAGEN -->

                    <div
                        class="p-4 bg-slate-100 flex items-center justify-center max-h-[75vh] overflow-auto"
                    >

                        <img
                            :src="selectedImage.src"
                            :alt="selectedImage.title"
                            class="max-w-full max-h-[70vh] object-contain rounded-lg shadow"
                        />

                    </div>


                    <!-- ACCIONES -->

                    <div class="p-4 flex flex-wrap justify-center gap-3">

                        <a
                            :href="selectedImage.src"
                            target="_blank"
                            class="px-5 py-2.5 bg-red-950 text-white rounded-xl font-bold hover:bg-red-800 transition"
                        >
                            Abrir en otra pestaña
                        </a>

                        <button
                            @click="printImage(selectedImage.src)"
                            class="px-5 py-2.5 bg-white border border-slate-300 text-slate-800 rounded-xl font-bold hover:bg-slate-50 transition"
                        >
                            🖨️ Imprimir
                        </button>

                    </div>

                </div>

            </div>

        </Transition>


        <!-- =========================================================
             MODAL PDF
        ========================================================== -->

        <Transition name="fade">

            <div
                v-if="selectedPdf"
                class="fixed inset-0 z-[110] bg-black/80 flex items-center justify-center p-3 md:p-6"
                @click.self="selectedPdf = null"
            >

                <div
                    class="bg-white rounded-2xl w-full max-w-6xl h-[95vh] shadow-2xl overflow-hidden flex flex-col"
                >

                    <div
                        class="flex items-center justify-between gap-4 px-5 py-4 border-b"
                    >

                        <h3 class="font-black text-red-950">
                            Material de aprendizaje
                        </h3>

                        <div class="flex items-center gap-2">

                            <a
                                :href="selectedPdf"
                                target="_blank"
                                class="px-4 py-2 bg-red-950 text-white rounded-lg font-bold text-sm hover:bg-red-800 transition"
                            >
                                Abrir PDF
                            </a>

                            <button
                                @click="selectedPdf = null"
                                class="w-9 h-9 rounded-full bg-slate-100 hover:bg-red-100 font-black text-xl"
                            >
                                ×
                            </button>

                        </div>

                    </div>


                    <iframe
                        :src="selectedPdf"
                        class="w-full flex-1"
                        title="Material PDF"
                    ></iframe>

                </div>

            </div>

        </Transition>

    </div>
</template>


<script setup>

import { ref } from 'vue'


/*
|--------------------------------------------------------------------------
| ESTADO
|--------------------------------------------------------------------------
*/

const selectedImage = ref(null)
const selectedPdf = ref(null)


/*
|--------------------------------------------------------------------------
| PASOS
|--------------------------------------------------------------------------
*/

const steps = [
    {
        number: 1,
        icon: '✏️',
        title: 'Preparar la mano',
        description: 'Practica movimientos y trazos con el lápiz.'
    },
    {
        number: 2,
        icon: '📖',
        title: 'Letras sencillas',
        description: 'Aprende a escribir las letras de forma clara.'
    },
    {
        number: 3,
        icon: '✍️',
        title: 'Cursiva',
        description: 'Aprende los movimientos de la escritura cursiva.'
    },
    {
        number: 4,
        icon: '🔢',
        title: 'Números',
        description: 'Practica también la escritura de los números.'
    },
    {
        number: 5,
        icon: '📝',
        title: 'Repetir y mejorar',
        description: 'Reescribe líneas para ganar soltura.'
    }
]


/*
|--------------------------------------------------------------------------
| TRAZOS
|--------------------------------------------------------------------------
*/

const strokeExercises = [
    {
        title: 'Ejercicio de trazos 1',
        description: 'Primeros movimientos para aprender a controlar el lápiz.',
        src: '/fotos/cursos/alfabetizacion/aprender.escritura/practicarconlapiz/1.jpg'
    },
    {
        title: 'Ejercicio de trazos 2',
        description: 'Continúa practicando líneas y movimientos.',
        src: '/fotos/cursos/alfabetizacion/aprender.escritura/practicarconlapiz/2.jpg'
    },
    {
        title: 'Ejercicio de trazos 3',
        description: 'Más ejercicios para preparar la escritura.',
        src: '/fotos/cursos/alfabetizacion/aprender.escritura/practicarconlapiz/3.jpg'
    }
]


/*
|--------------------------------------------------------------------------
| LETRAS SIMPLES
|--------------------------------------------------------------------------
|
| Los archivos:
| ab.pdf
| abcz.pdf
|
*/

const simpleLetters = [
    {
        title: 'Aprendemos las letras',
        description: 'Primera lámina para conocer cómo se escriben las letras sencillas.',
        icon: '🔤',
        src: '/pdf/Alfabetizacion/ab.pdf'
    },
    {
        title: 'Reescribimos las letras',
        description: 'Practica escribiendo encima de las letras para aprender su forma.',
        icon: '✏️',
        src: '/pdf/Alfabetizacion/abcz.pdf'
    }
]


/*
|--------------------------------------------------------------------------
| CURSIVA
|--------------------------------------------------------------------------
*/

const cursiveLetters = [
    
    {
        title: 'Cursiva pequeña 1',
        description: 'Practica la escritura cursiva siguiendo las letras.',
        src: '/fotos/cursos/alfabetizacion/aprender.escritura/cursive/cursive.little.1.jpg'
    },
    {
        title: 'Cursiva pequeña 2',
        description: 'Continúa practicando los movimientos cursivos.',
        src: '/fotos/cursos/alfabetizacion/aprender.escritura/cursive/cursive.little.2.jpg'
    },
    {
        title: 'Cursiva grande',
        description: 'Practica letras cursivas de mayor tamaño.',
        src: '/fotos/cursos/alfabetizacion/aprender.escritura/cursive/cursive.big.jpg'
    }

]


/*
|--------------------------------------------------------------------------
| NÚMEROS
|--------------------------------------------------------------------------
*/

const numbers = {
    title: 'Escribir números',
    description: 'Practica la escritura de los números.',
    src: '/fotos/cursos/alfabetizacion/aprender.escritura/numeros/num.jpg'
}


/*
|--------------------------------------------------------------------------
| LÍNEAS SENCILLAS
|--------------------------------------------------------------------------
*/

const simpleLines = [
    {
        title: 'Líneas sencillas 1',
        src: '/fotos/cursos/alfabetizacion/aprender.escritura/reescribir/simples%20(1).jpg'
    },
    {
        title: 'Líneas sencillas 2',
        src: '/fotos/cursos/alfabetizacion/aprender.escritura/reescribir/simples%20(2).jpg'
    }
]


/*
|--------------------------------------------------------------------------
| LÍNEAS CURSIVAS
|--------------------------------------------------------------------------
*/

const cursiveLines = [
    {
        title: 'Cursiva 1',
        src: '/fotos/cursos/alfabetizacion/aprender.escritura/reescribir/cursivos%20(1).jpg'
    },
    {
        title: 'Cursiva 2',
        src: '/fotos/cursos/alfabetizacion/aprender.escritura/reescribir/cursivos%20(2).jpg'
    },
    {
        title: 'Cursiva 3',
        src: '/fotos/cursos/alfabetizacion/aprender.escritura/reescribir/cursivos%20(3).jpg'
    }
]


/*
|--------------------------------------------------------------------------
| FUNCIONES
|--------------------------------------------------------------------------
*/

function irAPaso(id) {
    document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}


function openImage(item) {
    selectedImage.value = item
}


function openPdf(src) {
    selectedPdf.value = src
}


function printImage(src) {

    const printWindow = window.open('', '_blank')

    if (!printWindow) return

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Imprimir ejercicio</title>

            <style>
                @page {
                    margin: 10mm;
                }

                html,
                body {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    background: white;
                }

                body {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                img {
                    max-width: 100%;
                    max-height: 100vh;
                    object-fit: contain;
                }
            </style>
        </head>

        <body>

            <img
                src="${src}"
                onload="window.print()"
            />

        </body>
        </html>
    `)

    printWindow.document.close()
}

</script>


<style scoped>

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

</style>