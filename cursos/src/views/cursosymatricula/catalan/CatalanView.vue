
<template>
    <div class="min-h-screen text-gray-800">

        <!-- =====================================================
             NAVBAR DE CURSOS
        ====================================================== -->

        <div class="sticky top-0 z-[100] w-full">
            <NavbarCursos />
        </div>


        <!-- =====================================================
             CONTINGUT PRINCIPAL I FONS
        ====================================================== -->

        <main class="relative isolate min-h-screen overflow-hidden">

            <!-- Fotografia de fons: Sagrada Família -->

            <div
                class="pointer-events-none fixed inset-0 -z-30 bg-center bg-no-repeat bg-cover"
                style="background-image: url('/fotos/cursos/catalan/sagradafamilia.jpg');"
                aria-hidden="true"
            ></div>


            <!-- Capa translúcida per millorar la lectura -->

            <div
                class="pointer-events-none fixed inset-0 -z-20 bg-gradient-to-br from-emerald-50/90 via-amber-50/85 to-sky-100/90"
                aria-hidden="true"
            ></div>


            <!-- Efectes decoratius -->

            <div
                class="pointer-events-none absolute -left-20 top-20 -z-10 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl"
                aria-hidden="true"
            ></div>

            <div
                class="pointer-events-none absolute right-0 top-[800px] -z-10 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl"
                aria-hidden="true"
            ></div>


            <div class="relative z-10">

                <!-- =================================================
                     CAPÇALERA
                ================================================== -->

                <section class="px-5 pb-10 pt-12 md:px-8 md:pt-16">

                    <div class="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/80 bg-white/80 shadow-xl backdrop-blur-md">

                        <div class="grid grid-cols-1 items-center gap-8 p-7 md:grid-cols-2 md:p-12">

                            <div>

                                <span class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800">
                                    🌿 Aprèn català pas a pas
                                </span>

                                <h1 class="mb-5 mt-5 text-4xl font-extrabold leading-tight text-emerald-950 md:text-5xl lg:text-6xl">
                                    Aprèn
                                    <span class="text-emerald-700">català</span>
                                    al teu ritme
                                </h1>

                                <p class="max-w-xl text-lg leading-relaxed text-gray-700">
                                    Troba materials per aprendre a llegir,
                                    escriure, comprendre i parlar català.
                                    Practica a poc a poc i torna als recursos
                                    sempre que ho necessitis.
                                </p>

                                <p class="mt-4 leading-relaxed text-gray-600">
                                    Descobreix recursos gratuïts, fitxes
                                    visuals i materials publicats pel
                                    professorat de les nostres escoles.
                                </p>

                                <a
                                    href="#recursos-online"
                                    class="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white shadow-md transition hover:-translate-y-1 hover:bg-emerald-800"
                                >
                                    Explora els recursos
                                    <span aria-hidden="true">↓</span>
                                </a>

                            </div>

                            <div class="flex min-h-64 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-100 via-teal-50 to-sky-100 p-8">

                                <div class="text-center">

                                    <div class="mb-5 text-8xl md:text-9xl">
                                        📚
                                    </div>

                                    <p class="text-xl font-extrabold text-emerald-900">
                                        Llegir, escriure i parlar
                                    </p>

                                    <p class="mt-2 text-gray-600">
                                        Aprendre una llengua cada dia
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                <!-- =================================================
                     NAVEGACIÓ RÀPIDA
                ================================================== -->

                <section class="px-5 pb-12 md:px-8">

                    <div class="mx-auto max-w-6xl">

                        <div class="mb-6 text-center">

                            <h2 class="text-2xl font-extrabold text-emerald-950 md:text-3xl">
                                Explora ExAequo
                            </h2>

                            <p class="mt-2 text-gray-700">
                                Accedeix directament a altres seccions.
                            </p>

                        </div>

                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                            <RouterLink
                                to="/matricula"
                                class="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/90 p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-3xl">
                                    📝
                                </span>

                                <span>
                                    <span class="block font-bold">Matrícula</span>
                                    <span class="mt-1 block text-sm text-gray-600">
                                        Inscriu-t'hi a un curs.
                                    </span>
                                </span>
                            </RouterLink>


                            <RouterLink
                                to="/alfabetizacion"
                                class="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/90 p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-3xl">
                                    ✏️
                                </span>

                                <span>
                                    <span class="block font-bold">Alfabetització</span>
                                    <span class="mt-1 block text-sm text-gray-600">
                                        Aprèn des del principi.
                                    </span>
                                </span>
                            </RouterLink>


                            <RouterLink
                                to="/joan-miro"
                                class="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/90 p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-3xl">
                                    📖
                                </span>

                                <span>
                                    <span class="block font-bold">Biblioteca Joan Miró</span>
                                    <span class="mt-1 block text-sm text-gray-600">
                                        Coneix la nostra escola.
                                    </span>
                                </span>
                            </RouterLink>


                            <RouterLink
                                to="/ateneu"
                                class="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/90 p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-3xl">
                                    🏫
                                </span>

                                <span>
                                    <span class="block font-bold">Escola Ateneu Aula 502</span>
                                    <span class="mt-1 block text-sm text-gray-600">
                                        Consulta els nostres recursos.
                                    </span>
                                </span>
                            </RouterLink>

                        </div>

                    </div>

                </section>


                <!-- =================================================
                     RECURSOS EN LÍNIA
                ================================================== -->

                <section
                    id="recursos-online"
                    class="scroll-mt-24 px-5 py-12 md:px-8"
                >

                    <div class="mx-auto max-w-6xl">

                        <div class="mb-9 text-center">

                            <span class="inline-block rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-800">
                                🌐 Recursos externs
                            </span>

                            <h2 class="mt-4 text-3xl font-extrabold text-emerald-950 md:text-4xl">
                                Aprèn català en línia
                            </h2>

                            <p class="mx-auto mt-4 max-w-2xl leading-relaxed text-gray-700">
                                Consulta aquestes pàgines per practicar
                                la gramàtica, fer exercicis, aprendre
                                vocabulari i millorar l'expressió oral.
                            </p>

                        </div>

                        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                            <article
                                v-for="recurs in recursosOnline"
                                :key="recurs.titol"
                                class="flex flex-col rounded-2xl border border-white/80 bg-white/95 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                            >

                                <div
                                    class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                                    :class="recurs.colorIcona"
                                >
                                    {{ recurs.icona }}
                                </div>

                                <span
                                    class="mb-2 text-xs font-bold uppercase tracking-wider"
                                    :class="recurs.colorText"
                                >
                                    {{ recurs.categoria }}
                                </span>

                                <h3 class="mb-3 text-xl font-extrabold text-gray-800">
                                    {{ recurs.titol }}
                                </h3>

                                <p class="mb-6 flex-grow leading-relaxed text-gray-600">
                                    {{ recurs.descripcio }}
                                </p>

                                <a
                                    :href="recurs.url"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-center font-bold text-white transition"
                                    :class="recurs.colorBoto"
                                >
                                    {{ recurs.boto }}
                                    <span aria-hidden="true">↗</span>
                                </a>

                            </article>

                        </div>

                    </div>

                </section>


                <!-- =================================================
                     RECURSOS DEL PROFESSORAT
                ================================================== -->

                <section
                    id="recursos-professors"
                    class="scroll-mt-24 px-5 py-14 md:px-8"
                >

                    <div class="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-emerald-100 bg-white/95 shadow-xl">

                        <div class="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-700 p-7 text-white md:p-9">

                            <span class="inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
                                👩‍🏫 Recursos de les nostres escoles
                            </span>

                            <h2 class="mt-4 text-3xl font-extrabold md:text-4xl">
                                Materials publicats pel professorat
                            </h2>

                            <p class="mt-4 max-w-3xl leading-relaxed text-emerald-50">
                                Consulta fitxes, documents i altres materials
                                que el professorat hagi publicat per aprendre
                                i practicar català.
                            </p>

                        </div>

                        <div class="p-6 md:p-9">

                            <div class="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                <div>

                                    <label
                                        for="nivell-catala"
                                        class="mb-2 block font-bold text-gray-800"
                                    >
                                        Filtra per nivell
                                    </label>

                                    <select
                                        id="nivell-catala"
                                        v-model="nivellSeleccionat"
                                        class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 sm:w-64"
                                    >
                                        <option value="TOTS">Tots els nivells</option>
                                           <option value="alfabetització">alfabetització</option>

                                    <option value="català-A1">català-A1 - Inicial</option>
                                    <option value="català-A2">català-A2 - Bàsic</option>
                                    <option value="català-B1">català-B1 - Intermedi</option>
                                    </select>

                                </div>

                                <button
                                    type="button"
                                    @click="carregarRecursosProfessors"
                                    :disabled="carregantRecursos"
                                    class="rounded-xl border border-emerald-700 px-5 py-3 font-bold text-emerald-800 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {{ carregantRecursos ? 'Actualitzant...' : '↻ Actualitza els recursos' }}
                                </button>

                            </div>


                            <div
                                v-if="carregantRecursos"
                                class="rounded-2xl bg-emerald-50 p-8 text-center"
                            >
                                <div class="mb-3 text-4xl">📚</div>
                                <p class="font-semibold text-emerald-900">
                                    Estem cercant els recursos publicats...
                                </p>
                            </div>


                            <div
                                v-else-if="errorRecursos"
                                class="rounded-2xl border border-amber-200 bg-amber-50 p-6"
                            >
                                <h3 class="font-bold text-amber-900">
                                    No s'han pogut carregar els recursos
                                </h3>

                                <p class="mt-2 text-sm leading-relaxed text-amber-800">
                                    {{ errorRecursos }}
                                </p>

                                <button
                                    type="button"
                                    @click="carregarRecursosProfessors"
                                    class="mt-4 rounded-lg bg-amber-700 px-4 py-2 font-bold text-white hover:bg-amber-800"
                                >
                                    Torna-ho a provar
                                </button>
                            </div>


                            <div
                                v-else-if="recursosProfessorsFiltrats.length === 0"
                                class="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center"
                            >
                                <div class="mb-4 text-5xl">📂</div>

                                <h3 class="text-xl font-bold text-gray-800">
                                    Encara no hi ha recursos publicats
                                </h3>

                                <p class="mx-auto mt-3 max-w-xl leading-relaxed text-gray-600">
                                    Quan es publiquin materials per a aquest
                                    idioma i nivell, apareixeran aquí
                                    automàticament.
                                </p>
                            </div>


                            <div
                                v-else
                                class="grid grid-cols-1 gap-5 md:grid-cols-2"
                            >

                                <article
                                    v-for="recurs in recursosProfessorsFiltrats"
                                    :key="recurs.id"
                                    class="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
                                >

                                    <div class="flex items-start gap-4">

                                        <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
                                            {{ iconaTipus(recurs.tipus) }}
                                        </div>

                                        <div class="min-w-0 flex-1">

                                            <h3 class="break-words text-lg font-extrabold text-gray-800">
                                                {{ recurs.titol }}
                                            </h3>

                                            <p class="mt-1 text-sm font-semibold text-emerald-800">
                                                {{ recurs.idioma || 'Català' }}
                                                <span v-if="recurs.nivel">
                                                    · {{ recurs.nivel }}
                                                </span>
                                            </p>

                                        </div>

                                    </div>

                                    <p
                                        v-if="recurs.descripcio"
                                        class="mt-4 whitespace-pre-line leading-relaxed text-gray-600"
                                    >
                                        {{ recurs.descripcio }}
                                    </p>

                                    <div class="mt-4 space-y-1 text-sm text-gray-500">

                                        <p v-if="nomProfessor(recurs)">
                                            <span class="font-semibold">Publicat per:</span>
                                            {{ nomProfessor(recurs) }}
                                        </p>

                                        <p v-if="recurs.escuela">
                                            <span class="font-semibold">Escola:</span>
                                            {{ recurs.escuela }}
                                        </p>

                                        <p v-if="recurs.grupo">
                                            <span class="font-semibold">Grup:</span>
                                            {{ recurs.grupo }}
                                        </p>

                                        <p v-if="recurs.fecha_publicacion">
                                            <span class="font-semibold">Data de publicació:</span>
                                            {{ formatarData(recurs.fecha_publicacion) }}
                                        </p>

                                    </div>

                                    <a
                                        v-if="urlRecurs(recurs)"
                                        :href="urlRecurs(recurs)"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white transition hover:bg-emerald-800"
                                    >
                                        Obre el recurs
                                        <span aria-hidden="true">↗</span>
                                    </a>

                                    <p
                                        v-else
                                        class="mt-5 rounded-lg bg-gray-50 p-3 text-sm text-gray-500"
                                    >
                                        Aquest recurs encara no té cap
                                        ruta de fitxer disponible.
                                    </p>

                                </article>

                            </div>

                        </div>

                    </div>

                </section>


                <!-- =================================================
                     MATERIALS VISUALS
                ================================================== -->

                <section
                    id="materials-visuals"
                    class="px-5 py-14 md:px-8"
                >

                    <div class="mx-auto max-w-6xl">

                        <div class="mb-10 text-center">

                            <span class="inline-block rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-800">
                                🖼️ Materials d'estudi
                            </span>

                            <h2 class="mt-4 text-3xl font-extrabold text-emerald-950 md:text-4xl">
                                Aprèn amb imatges
                            </h2>

                            <p class="mx-auto mt-4 max-w-2xl leading-relaxed text-gray-700">
                                Consulta les fitxes visuals per aprendre
                                paraules, estudiar gramàtica i repassar
                                els continguts del curs.
                            </p>

                        </div>

                        <div class="space-y-10">

                            <section
                                v-for="categoria in categoriesFotos"
                                :key="categoria.titol"
                                class="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-lg backdrop-blur-sm md:p-8"
                            >

                                <div class="mb-6 flex items-center gap-4">

                                    <div
                                        class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl"
                                        :class="categoria.colorIcona"
                                    >
                                        {{ categoria.icona }}
                                    </div>

                                    <div>

                                        <h3 class="text-2xl font-extrabold text-emerald-950">
                                            {{ categoria.titol }}
                                        </h3>

                                        <p class="mt-1 text-gray-600">
                                            {{ categoria.descripcio }}
                                        </p>

                                    </div>

                                </div>

                                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                                    <article
                                        v-for="foto in categoria.fotos"
                                        :key="foto.archivo"
                                        class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
                                    >

                                        <a
                                            :href="rutaFoto(foto.archivo)"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            :aria-label="'Obre la imatge: ' + foto.titol"
                                        >
                                            <img
                                                :src="rutaFoto(foto.archivo)"
                                                :alt="foto.titol"
                                                loading="lazy"
                                                class="h-56 w-full bg-white p-3 object-contain"
                                            >
                                        </a>

                                        <div class="p-4">

                                            <h4 class="font-bold text-gray-800">
                                                {{ foto.titol }}
                                            </h4>

                                            <p class="mt-2 text-sm leading-relaxed text-gray-600">
                                                {{ foto.descripcio }}
                                            </p>

                                        </div>

                                    </article>

                                </div>

                            </section>

                        </div>

                    </div>

                </section>


                <!-- =================================================
                     MISSATGE FINAL
                ================================================== -->

                <section class="px-5 pb-16 pt-4 md:px-8">

                    <div class="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 p-8 text-white shadow-xl md:p-12">

                        <div class="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto]">

                            <div>

                                <h2 class="text-2xl font-extrabold md:text-3xl">
                                    Aprendre requereix pràctica
                                </h2>

                                <p class="mt-4 max-w-2xl leading-relaxed text-emerald-50">
                                    Tria una fitxa, aprèn paraules noves
                                    i repassa-les. Pots combinar els materials
                                    visuals amb els cursos en línia i els
                                    recursos publicats pel professorat.
                                </p>

                            </div>

                            <div class="text-center text-6xl md:text-7xl">
                                🌱
                            </div>

                        </div>

                    </div>

                </section>


                <!-- =================================================
                     PEU DE PÀGINA
                ================================================== -->

                <footer class="border-t border-emerald-200/70 bg-white/80 px-5 py-7 text-center">

                    <p class="font-semibold text-emerald-950">
                        ExAequo · Cursos Generals
                    </p>

                    <p class="mt-2 text-sm text-gray-600">
                        Recursos per aprendre, practicar i compartir.
                    </p>

                </footer>

            </div>

        </main>

    </div>
</template>


<script setup>

import { ref, computed, onMounted } from 'vue'
import NavbarCursos from '../../../components/cursosymatricula/NavbarCursos.vue'


// ============================================================
// CONFIGURACIÓ DEL BACKEND
// ============================================================

const API_BASE_URL = 'http://localhost:5555/api'


// ============================================================
// RECURSOS EN LÍNIA
// ============================================================

const recursosOnline = [

    {
        titol: 'Gramàtica del CPNL',
        categoria: 'Gramàtica',
        descripcio: 'Consulta explicacions i recursos relacionats amb la gramàtica catalana.',
        url: 'https://www.cpnl.cat/gramatica/',
        icona: '📘',
        boto: 'Consulta la gramàtica',
        colorIcona: 'bg-emerald-100',
        colorText: 'text-emerald-700',
        colorBoto: 'bg-emerald-700 hover:bg-emerald-800'
    },

    {
        titol: 'Fils de conversa',
        categoria: 'Expressions quotidianes',
        descripcio: 'Una guia per familiaritzar-te amb expressions i usos del català. També inclou exercicis per practicar.',
        url: 'https://llengua.gencat.cat/ca/serveis/aprendre_catala/a-catalunya/fils-de-conversa/guia-dus/',
        icona: '💬',
        boto: 'Obre la guia',
        colorIcona: 'bg-sky-100',
        colorText: 'text-sky-700',
        colorBoto: 'bg-sky-700 hover:bg-sky-800'
    },

    {
        titol: 'Parla.cat',
        categoria: 'Curs en línia',
        descripcio: 'Plataforma per estudiar català per internet. Consulta la modalitat lliure gratuïta.',
        url: 'https://parla.cat/login/index.php',
        icona: '🎓',
        boto: 'Entra a Parla.cat',
        colorIcona: 'bg-violet-100',
        colorText: 'text-violet-700',
        colorBoto: 'bg-violet-700 hover:bg-violet-800'
    },

    {
        titol: 'Speakcat',
        categoria: 'Expressió oral',
        descripcio: 'Recurs per practicar l’expressió oral i millorar la capacitat de comunicar-te en català.',
        url: 'https://www.intercat.cat/speakcat/',
        icona: '🗣️',
        boto: 'Practica la conversa',
        colorIcona: 'bg-amber-100',
        colorText: 'text-amber-700',
        colorBoto: 'bg-amber-600 hover:bg-amber-700'
    },

    {
        titol: 'Abecedari català',
        categoria: 'Nivell inicial',
        descripcio: 'Recurs per familiaritzar-te amb les lletres de l’alfabet català i començar a reconèixer-les.',
        url: 'https://el-abecedario.com/abecedario-catalan',
        icona: '🔤',
        boto: 'Aprèn l’abecedari',
        colorIcona: 'bg-rose-100',
        colorText: 'text-rose-700',
        colorBoto: 'bg-rose-700 hover:bg-rose-800'
    }

]


// ============================================================
// RUTA DE LES FOTOGRAFIES
// ============================================================

const carpetaFotos = '/fotos/cursos/catalan/'

function rutaFoto(archivo) {
    return carpetaFotos + encodeURIComponent(archivo)
}


// ============================================================
// CATEGORIA 1: ABECEDARI I ALFABETITZACIÓ
// ============================================================

const fotosAbecedari = [

    {
        archivo: 'Abecedario catalán para niños.png',
        titol: 'Abecedari català',
        descripcio: 'Material visual per reconèixer les lletres de l’alfabet català.'
    },

    {
        archivo: 'alfabetizaciondecatalan (1).jpg',
        titol: 'Alfabetització en català',
        descripcio: 'Fitxa de suport per començar a familiaritzar-se amb el català escrit.'
    },

    {
        archivo: 'alfabetizaciondecatalan (2).jpg',
        titol: 'Pràctica d’alfabetització',
        descripcio: 'Material complementari per continuar aprenent des del nivell inicial.'
    }

]


// ============================================================
// CATEGORIA 2: VOCABULARI QUOTIDIÀ
// ============================================================

const fotosVocabulari = [

    {
        archivo: 'bodyparts.jpg',
        titol: 'El cos humà',
        descripcio: 'Aprèn paraules per anomenar les parts del cos.'
    },

    {
        archivo: 'clothes.jpg',
        titol: 'La roba',
        descripcio: 'Vocabulari relacionat amb les peces de vestir i els accessoris.'
    },

    {
        archivo: 'colors.jpg',
        titol: 'Els colors',
        descripcio: 'Aprèn els noms dels colors en català.'
    },

    {
        archivo: 'jobs.jpg',
        titol: 'Professions i oficis',
        descripcio: 'Paraules relacionades amb els oficis i les professions.'
    },

    {
        archivo: 'nature.jpg',
        titol: 'La natura',
        descripcio: 'Vocabulari per parlar de l’entorn natural.'
    },

    {
        archivo: 'descripcioPersons.jpg',
        titol: 'Descripció de persones',
        descripcio: 'Material per descriure persones i les seves característiques.'
    },

    {
        archivo: 'frasesfets.jpg',
        titol: 'Frases fetes',
        descripcio: 'Expressions habituals per ampliar el vocabulari.'
    }

]


// ============================================================
// CATEGORIA 3: NOMBRES, DATES I HORES
// ============================================================

const fotosNombres = [

    {
        archivo: 'number1-10.jpg',
        titol: 'Nombres de l’1 al 10',
        descripcio: 'Comença a practicar els nombres bàsics.'
    },

    {
        archivo: 'number10.jpg',
        titol: 'El nombre 10',
        descripcio: 'Fitxa visual per repassar el nombre deu.'
    },

    {
        archivo: 'number20.jpg',
        titol: 'El nombre 20',
        descripcio: 'Practica el vocabulari numèric.'
    },

    {
        archivo: 'number30.jpg',
        titol: 'El nombre 30',
        descripcio: 'Continua aprenent els nombres.'
    },

    {
        archivo: 'numbers40.jpg',
        titol: 'El nombre 40',
        descripcio: 'Material de suport per estudiar els nombres.'
    },

    {
        archivo: 'numbers50.jpg',
        titol: 'El nombre 50',
        descripcio: 'Repasa les desenes i amplia el vocabulari.'
    },

    {
        archivo: 'number100.jpg',
        titol: 'El nombre 100',
        descripcio: 'Aprèn a reconèixer i utilitzar el nombre cent.'
    },

    {
        archivo: 'numberscomplets.jpg',
        titol: 'Nombres complets',
        descripcio: 'Fitxa de repàs per estudiar diferents nombres.'
    },

    {
        archivo: 'month,days,seasons.jpg',
        titol: 'Dies, mesos i estacions',
        descripcio: 'Aprèn vocabulari per parlar del calendari i del temps.'
    },

    {
        archivo: 'horaenCatalan.jpg',
        titol: 'L’hora en català',
        descripcio: 'Practica com expressar l’hora en situacions quotidianes.'
    }

]


// ============================================================
// CATEGORIA 4: GRAMÀTICA I ESCRIPTURA
// ============================================================

const fotosGramatica = [

    {
        archivo: 'acents.jpg',
        titol: 'Els accents',
        descripcio: 'Material per estudiar les regles d’accentuació.'
    },

    {
        archivo: 'acents1.jpg',
        titol: 'Pràctica d’accents',
        descripcio: 'Fitxa complementària per repassar els accents.'
    },

    {
        archivo: 'reglas de acentuacion.jpg',
        titol: 'Regles d’accentuació',
        descripcio: 'Consulta les regles per escriure correctament.'
    },

    {
        archivo: 'contraccions.jpg',
        titol: 'Contraccions',
        descripcio: 'Aprèn les contraccions més habituals en català.'
    },

    {
        archivo: 'connectors.jpg',
        titol: 'Connectors',
        descripcio: 'Recursos per relacionar idees i construir frases.'
    },

    {
        archivo: 'connectors1.jpg',
        titol: 'Més connectors',
        descripcio: 'Material addicional per millorar l’escriptura.'
    },

    {
        archivo: 'pronoms.jpg',
        titol: 'Pronoms',
        descripcio: 'Repasa els pronoms i el seu ús en les oracions.'
    },

    {
        archivo: 'verbs.jpg',
        titol: 'Verbs',
        descripcio: 'Material per estudiar els verbs en català.'
    },

    {
        archivo: 'verbs1.jpg',
        titol: 'Pràctica de verbs',
        descripcio: 'Fitxa complementària per reforçar els coneixements.'
    },

    {
        archivo: 'verbsgrammar.jpg',
        titol: 'Gramàtica dels verbs',
        descripcio: 'Consulta material de suport sobre els verbs.'
    },

    {
        archivo: 'presentIrregular.jpg',
        titol: 'Present irregular',
        descripcio: 'Repasa alguns verbs irregulars en present.'
    },

    {
        archivo: 'verbopasadoimperfecto.jpg',
        titol: 'Pretèrit imperfet',
        descripcio: 'Material per estudiar els verbs en passat.'
    }

]


// ============================================================
// AGRUPACIÓ DE LES FOTOGRAFIES
// ============================================================

const categoriesFotos = [

    {
        titol: '1. Abecedari i alfabetització',
        descripcio: 'Primers passos per aprendre les lletres i el català escrit.',
        icona: '🔤',
        colorIcona: 'bg-emerald-100',
        fotos: fotosAbecedari
    },

    {
        titol: '2. Vocabulari quotidià',
        descripcio: 'Paraules sobre el cos, la roba, els colors, els oficis i la vida diària.',
        icona: '🧠',
        colorIcona: 'bg-sky-100',
        fotos: fotosVocabulari
    },

    {
        titol: '3. Nombres, dates i hores',
        descripcio: 'Practica els nombres, els dies, els mesos, les estacions i l’hora.',
        icona: '🔢',
        colorIcona: 'bg-amber-100',
        fotos: fotosNombres
    },

    {
        titol: '4. Gramàtica i escriptura',
        descripcio: 'Repasa els accents, les contraccions, els pronoms, els connectors i els verbs.',
        icona: '✍️',
        colorIcona: 'bg-violet-100',
        fotos: fotosGramatica
    }

]


// ============================================================
// RECURSOS PUBLICATS PEL PROFESSORAT
// ============================================================

const recursosProfessors = ref([])
const carregantRecursos = ref(true)
const errorRecursos = ref('')
const nivellSeleccionat = ref('TOTS')


const recursosProfessorsFiltrats = computed(() => {

    return recursosProfessors.value.filter((recurs) => {

        const nivell = String(recurs.nivel || '')
            .trim()
            .toUpperCase()

        if (nivellSeleccionat.value === 'TOTS') {
            return true
        }

        return nivell === nivellSeleccionat.value

    })

})


// ============================================================
// CARREGAR ELS RECURSOS DE LES DUES ESCOLES
// ============================================================

async function carregarRecursosProfessors() {

    carregantRecursos.value = true
    errorRecursos.value = ''

    try {

        const escoles = [
            'Ateneu Aula 502',
            'Biblioteca Joan Miró'
        ]

        const respostes = await Promise.all(

            escoles.map(async (escola) => {

                const url = new URL(
                    `${API_BASE_URL}/escuelas/recursos`
                )

                url.searchParams.set('escuela', escola)

                const resposta = await fetch(url.toString())

                if (!resposta.ok) {
                    throw new Error(
                        `No s'han pogut consultar els recursos de ${escola}.`
                    )
                }

                const resultat = await resposta.json()

                if (resultat.ok === false) {
                    throw new Error(
                        resultat.mensaje ||
                        'No s’han pogut obtenir els recursos.'
                    )
                }

                return Array.isArray(resultat.datos)
                    ? resultat.datos
                    : []

            })

        )

        const totsElsRecursos = respostes.flat()

        recursosProfessors.value = totsElsRecursos.filter((recurs) => {

            const idioma = normalitzarText(recurs.idioma)

            return idioma.includes('catala') ||
                   idioma.includes('catalan')

        })

    } catch (error) {

        console.error(
            'Error en carregar els recursos de català:',
            error
        )

        errorRecursos.value =
            'Comprova que el servidor del backend funciona al port 5555. ' +
            (error.message || 'No s’ha pogut establir la connexió.')

    } finally {

        carregantRecursos.value = false

    }

}


// ============================================================
// FUNCIONS AUXILIARS
// ============================================================

function normalitzarText(valor) {

    return String(valor || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase()

}


function nomProfessor(recurs) {

    return [
        recurs.profesor_nombre,
        recurs.profesor_apellidos
    ]
        .filter(Boolean)
        .join(' ')
        .trim()

}


function iconaTipus(tipus) {

    const tipusNormalitzat = String(tipus || '').toUpperCase()

    const icones = {
        PDF: '📕',
        DOCUMENTO: '📄',
        IMAGEN: '🖼️',
        AUDIO: '🎧',
        VIDEO: '🎬',
        OTRO: '📎'
    }

    return icones[tipusNormalitzat] || '📎'

}


function urlRecurs(recurs) {

    const ruta = String(
        recurs.ruta_archivo || recurs.url || ''
    ).trim()

    if (!ruta) {
        return ''
    }

    if (/^https?:\/\//i.test(ruta)) {
        return ruta
    }

    if (ruta.startsWith('/')) {
        return `http://localhost:5555${ruta}`
    }

    return `http://localhost:5555/${ruta.replace(/^\/+/, '')}`

}


function formatarData(data) {

    if (!data) {
        return ''
    }

    const dataConvertida = new Date(data)

    if (Number.isNaN(dataConvertida.getTime())) {
        return data
    }

    return new Intl.DateTimeFormat('ca-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(dataConvertida)

}


onMounted(() => {
    carregarRecursosProfessors()
})

</script>