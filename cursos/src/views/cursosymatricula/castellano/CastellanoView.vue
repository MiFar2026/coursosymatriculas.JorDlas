
<template>
    <div class="min-h-screen bg-stone-50 text-gray-800">

        <!-- =====================================================
             NAVBAR CURSOS: SIEMPRE ARRIBA DE TODO
        ====================================================== -->

        <div class="relative z-[100] w-full">
            <NavbarCursos />
        </div>

        <!-- =====================================================
             FONDO Y CONTENIDO
        ====================================================== -->

        <main class="relative isolate min-h-screen overflow-hidden">

            <div
                class="pointer-events-none absolute inset-0 -z-20
                       bg-center bg-cover bg-no-repeat"
                style="background-image: url('/fotos/cursos/castellano/sevillabackground.jpg')"
                aria-hidden="true"
            ></div>

            <div
                class="pointer-events-none absolute inset-0 -z-10
                       bg-gradient-to-br from-amber-50/90
                       via-orange-50/85 to-rose-50/90"
                aria-hidden="true"
            ></div>

            <div class="relative z-10">

                <!-- =================================================
                     CABECERA
                ================================================== -->

                <section class="px-5 py-10 md:px-8 md:py-14">
                    <div
                        class="mx-auto grid max-w-6xl grid-cols-1
                               items-center gap-8 rounded-3xl
                               border border-white/80 bg-white/85
                               p-7 shadow-xl backdrop-blur-md
                               md:grid-cols-2 md:p-12"
                    >
                        <div>
                            <span
                                class="inline-flex rounded-full
                                       bg-amber-100 px-4 py-2
                                       text-sm font-bold text-amber-900"
                            >
                                🇪🇸 Cursos generales
                            </span>

                            <h1
                                class="mt-5 text-4xl font-extrabold
                                       leading-tight text-amber-950
                                       md:text-5xl"
                            >
                                Aprende
                                <span class="text-orange-700">
                                    castellano
                                </span>
                                a tu ritmo
                            </h1>

                            <p class="mt-5 leading-relaxed text-gray-700">
                                Recursos para leer, escribir, escuchar,
                                comprender y hablar español. Aprende con
                                tus profesores, consulta libros en PDF
                                y practica con actividades gratuitas.
                            </p>

                            <a
                                href="#recursos-profesorado"
                                class="mt-7 inline-flex items-center gap-2
                                       rounded-xl bg-amber-800 px-6 py-3
                                       font-bold text-white shadow
                                       transition hover:bg-amber-950"
                            >
                                Ver recursos del profesorado ↓
                            </a>
                        </div>

                        <div
                            class="flex min-h-64 flex-col items-center
                                   justify-center rounded-3xl
                                   bg-gradient-to-br from-amber-100
                                   via-orange-50 to-rose-100 p-8 text-center"
                        >
                            <div class="text-8xl">📚</div>

                            <h2 class="mt-5 text-2xl font-extrabold text-amber-950">
                                Leer, escribir y conversar
                            </h2>

                            <p class="mt-2 text-gray-600">
                                Aprende español cada día.
                            </p>
                        </div>
                    </div>
                </section>

                <!-- =================================================
                     ACCESOS RÁPIDOS
                ================================================== -->

                <section class="px-5 pb-10 md:px-8">
                    <div class="mx-auto max-w-6xl">
                        <h2
                            class="mb-6 text-center text-2xl
                                   font-extrabold text-amber-950"
                        >
                            Explora los materiales
                        </h2>

                        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <a
                                href="#recursos-profesorado"
                                class="rounded-2xl border border-white
                                       bg-white/85 p-5 text-center
                                       shadow-md transition hover:bg-white"
                            >
                                <div class="text-4xl">👩‍🏫</div>
                                <h3 class="mt-3 font-bold text-amber-950">
                                    Profesorado
                                </h3>
                            </a>

                            <a
                                href="#recursos-online"
                                class="rounded-2xl border border-white
                                       bg-white/85 p-5 text-center
                                       shadow-md transition hover:bg-white"
                            >
                                <div class="text-4xl">🌐</div>
                                <h3 class="mt-3 font-bold text-amber-950">
                                    Recursos online
                                </h3>
                            </a>

                            <a
                                href="#pdf-ninos"
                                class="rounded-2xl border border-white
                                       bg-white/85 p-5 text-center
                                       shadow-md transition hover:bg-white"
                            >
                                <div class="text-4xl">🧒</div>
                                <h3 class="mt-3 font-bold text-amber-950">
                                    Para niños
                                </h3>
                            </a>

                            <a
                                href="#fichas-visuales"
                                class="rounded-2xl border border-white
                                       bg-white/85 p-5 text-center
                                       shadow-md transition hover:bg-white"
                            >
                                <div class="text-4xl">🖼️</div>
                                <h3 class="mt-3 font-bold text-amber-950">
                                    Fichas visuales
                                </h3>
                            </a>
                        </div>
                    </div>
                </section>

                <!-- =================================================
                     PRIMERO: RECURSOS DEL PROFESORADO
                ================================================== -->

                <section
                    id="recursos-profesorado"
                    class="scroll-mt-24 px-5 pb-14 md:px-8"
                >
                    <div
                        class="mx-auto max-w-6xl rounded-3xl
                               border border-white/80 bg-white/90
                               p-7 shadow-xl backdrop-blur-md md:p-10"
                    >
                        <span class="text-4xl">👩‍🏫</span>

                        <h2
                            class="mt-3 text-3xl font-extrabold
                                   text-amber-950 md:text-4xl"
                        >
                            Recursos del profesorado
                        </h2>

                        <p class="mt-3 max-w-3xl leading-relaxed text-gray-700">
                            Aquí encontrarás los materiales publicados por
                            los profesores de Ateneu Aula 502 y Biblioteca
                            Joan Miró. Los recursos se consultan desde el
                            backend y se filtran por idioma.
                        </p>

                        <div
                            class="mt-7 flex flex-col gap-4
                                   sm:flex-row sm:items-end
                                   sm:justify-between"
                        >
                            <div class="w-full sm:max-w-xs">
                                <label
                                    for="nivel-castellano"
                                    class="mb-2 block font-bold text-gray-800"
                                >
                                    Filtrar por nivel
                                </label>

                                <select
                                    id="nivel-castellano"
                                    v-model="nivelSeleccionado"
                                    class="w-full rounded-xl border
                                           border-gray-300 bg-white
                                           px-4 py-3 outline-none
                                           focus:border-amber-600
                                           focus:ring-2 focus:ring-amber-200"
                                >
                                    <option value="TODOS">
                                        Todos los niveles
                                    </option>
                                    <option value="Alfabetización">Alfabetización</option>
                                    <option value="Castellano-A1">Castellano-A1 - Inicial</option>
                                    <option value="Castellano-A2">Castellano-A2 - Básico</option>
                                    <option value="Castellano-B1">Castellano-B1 - Intermedio</option>
                                </select>
                            </div>

                            <button
                                type="button"
                                @click="cargarRecursosProfesor"
                                :disabled="cargandoRecursos"
                                class="rounded-xl bg-amber-800 px-5 py-3
                                       font-bold text-white transition
                                       hover:bg-amber-950
                                       disabled:cursor-wait disabled:opacity-60"
                            >
                                {{
                                    cargandoRecursos
                                        ? 'Consultando...'
                                        : 'Actualizar recursos'
                                }}
                            </button>
                        </div>

                        <!-- Cargando -->

                        <div
                            v-if="cargandoRecursos"
                            class="mt-8 rounded-2xl bg-amber-50 p-6 text-center"
                        >
                            <p class="font-semibold text-amber-950">
                                Estamos consultando los recursos...
                            </p>
                        </div>

                        <!-- Error real de conexión o de API -->

                        <div
                            v-else-if="errorRecursos"
                            class="mt-8 rounded-2xl border
                                   border-red-200 bg-red-50 p-6"
                        >
                            <h3 class="font-bold text-red-800">
                                No se pudieron cargar los recursos
                            </h3>

                            <p class="mt-2 text-red-700">
                                {{ errorRecursos }}
                            </p>

                            <p class="mt-2 text-sm text-red-700">
                                Comprueba que el backend esté funcionando
                                en el puerto 3000.
                            </p>
                        </div>

                        <!-- No hay materiales publicados -->

                        <div
                            v-else-if="recursosFiltrados.length === 0"
                            class="mt-8 rounded-2xl border
                                   border-amber-200 bg-amber-50/90
                                   p-7 text-center"
                        >
                            <div class="text-5xl">📂</div>

                            <h3
                                class="mt-4 text-xl font-extrabold
                                       text-amber-950"
                            >
                                Todavía no hay recursos publicados
                            </h3>

                            <p class="mt-2 leading-relaxed text-gray-700">
                                Cuando los profesores publiquen materiales
                                de castellano, aparecerán aquí.
                            </p>
                        </div>

                        <!-- Recursos disponibles -->

                        <div
                            v-else
                            class="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2"
                        >
                            <article
                                v-for="recurso in recursosFiltrados"
                                :key="recurso.id"
                                class="rounded-2xl border border-gray-200
                                       bg-white p-6 shadow-sm"
                            >
                                <span
                                    class="inline-flex rounded-full
                                           bg-amber-100 px-3 py-1
                                           text-sm font-bold text-amber-900"
                                >
                                    {{ recurso.nivel || 'Material general' }}
                                </span>

                                <h3 class="mt-3 text-xl font-extrabold text-gray-900">
                                    {{ recurso.titulo }}
                                </h3>

                                <p
                                    v-if="recurso.descripcion"
                                    class="mt-2 leading-relaxed text-gray-600"
                                >
                                    {{ recurso.descripcion }}
                                </p>

                                <div class="mt-4 space-y-1 text-sm text-gray-600">
                                    <p v-if="recurso.escuela">
                                        <strong>Escuela:</strong>
                                        {{ recurso.escuela }}
                                    </p>

                                    <p v-if="recurso.curso">
                                        <strong>Curso:</strong>
                                        {{ recurso.curso }}
                                    </p>

                                    <p v-if="recurso.profesor_nombre">
                                        <strong>Profesor/a:</strong>
                                        {{ recurso.profesor_nombre }}
                                        {{ recurso.profesor_apellidos || '' }}
                                    </p>

                                    <p v-if="recurso.tipo">
                                        <strong>Tipo:</strong>
                                        {{ recurso.tipo }}
                                    </p>
                                </div>

                                <a
                                    v-if="recurso.ruta_archivo"
                                    :href="urlRecurso(recurso.ruta_archivo)"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="mt-5 inline-flex rounded-xl
                                           bg-amber-800 px-5 py-3
                                           font-bold text-white
                                           transition hover:bg-amber-950"
                                >
                                    Abrir material ↗
                                </a>
                            </article>
                        </div>
                    </div>
                </section>

                <!-- =================================================
                     DESPUÉS: NUESTROS RECURSOS ONLINE
                ================================================== -->

                <section
                    id="recursos-online"
                    class="scroll-mt-24 px-5 pb-14 md:px-8"
                >
                    <div class="mx-auto max-w-6xl">
                        <div
                            class="mb-8 rounded-3xl border border-white/80
                                   bg-white/85 p-7 shadow-lg md:p-10"
                        >
                            <h2
                                class="text-3xl font-extrabold
                                       text-amber-950 md:text-4xl"
                            >
                                Nuestros recursos gratuitos en línea
                            </h2>

                            <p class="mt-3 leading-relaxed text-gray-700">
                                Páginas externas para practicar español
                                mediante actividades, escucha, diálogos
                                y ejercicios de distintos niveles.
                            </p>
                        </div>

                        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <article
                                v-for="recurso in recursosOnline"
                                :key="recurso.url"
                                class="flex flex-col rounded-3xl
                                       border border-white/80 bg-white/90
                                       p-6 shadow-lg transition
                                       hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div class="flex items-start gap-4">
                                    <div
                                        class="flex h-16 w-16 shrink-0
                                               items-center justify-center
                                               rounded-2xl text-3xl"
                                        :class="recurso.colorIcono"
                                    >
                                        {{ recurso.icono }}
                                    </div>

                                    <div>
                                        <span
                                            class="text-sm font-bold"
                                            :class="recurso.colorTexto"
                                        >
                                            {{ recurso.categoria }}
                                        </span>

                                        <h3
                                            class="mt-1 text-xl font-extrabold
                                                   text-gray-900"
                                        >
                                            {{ recurso.titulo }}
                                        </h3>
                                    </div>
                                </div>

                                <p class="mt-4 flex-1 leading-relaxed text-gray-600">
                                    {{ recurso.descripcion }}
                                </p>

                                <a
                                    :href="recurso.url"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="mt-6 inline-flex items-center
                                           justify-center gap-2 rounded-xl
                                           px-5 py-3 font-bold text-white
                                           transition"
                                    :class="recurso.colorBoton"
                                >
                                    {{ recurso.boton }} ↗
                                </a>
                            </article>
                        </div>
                    </div>
                </section>

                <!-- =================================================
                     PDF PARA NIÑOS
                ================================================== -->

                <section
                    id="pdf-ninos"
                    class="scroll-mt-24 px-5 pb-14 md:px-8"
                >
                    <div class="mx-auto max-w-6xl">
                        <div
                            class="mb-7 rounded-3xl border border-white/80
                                   bg-white/85 p-7 shadow-lg md:p-9"
                        >
                            <span class="text-4xl">🧒</span>

                            <h2 class="mt-3 text-3xl font-extrabold text-amber-950">
                                PDF para niños
                            </h2>

                            <p class="mt-3 text-gray-700">
                                Libros y materiales para iniciarse en el
                                aprendizaje del español y la lectura.
                            </p>
                        </div>

                        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            <article
                                v-for="pdf in pdfNinos"
                                :key="pdf.archivo"
                                class="flex flex-col rounded-2xl
                                       border border-white/80 bg-white/90
                                       p-6 shadow-md transition
                                       hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div class="text-4xl">📕</div>

                                <h3 class="mt-4 text-lg font-extrabold text-gray-900">
                                    {{ pdf.titulo }}
                                </h3>

                                <p class="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                                    {{ pdf.descripcion }}
                                </p>

                                <a
                                    :href="rutaPdf('child', pdf.archivo)"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="mt-5 rounded-xl bg-amber-800
                                           px-4 py-3 text-center font-bold
                                           text-white hover:bg-amber-950"
                                >
                                    Abrir PDF ↗
                                </a>
                            </article>
                        </div>
                    </div>
                </section>

                <!-- =================================================
                     PDF PARA ADOLESCENTES
                ================================================== -->

                <section
                    id="pdf-adolescentes"
                    class="scroll-mt-24 px-5 pb-14 md:px-8"
                >
                    <div class="mx-auto max-w-6xl">
                        <div
                            class="mb-7 rounded-3xl border border-white/80
                                   bg-white/85 p-7 shadow-lg md:p-9"
                        >
                            <span class="text-4xl">📚</span>

                            <h2 class="mt-3 text-3xl font-extrabold text-amber-950">
                                PDF para adolescentes
                            </h2>

                            <p class="mt-3 text-gray-700">
                                Manuales para aprender español y trabajar
                                los primeros niveles.
                            </p>
                        </div>

                        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            <article
                                v-for="pdf in pdfAdolescentes"
                                :key="pdf.archivo"
                                class="flex flex-col rounded-2xl
                                       border border-white/80 bg-white/90
                                       p-6 shadow-md transition
                                       hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div class="text-4xl">📘</div>

                                <h3 class="mt-4 text-lg font-extrabold text-gray-900">
                                    {{ pdf.titulo }}
                                </h3>

                                <p class="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                                    {{ pdf.descripcion }}
                                </p>

                                <a
                                    :href="rutaPdf('adolescentes', pdf.archivo)"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="mt-5 rounded-xl bg-orange-700
                                           px-4 py-3 text-center font-bold
                                           text-white hover:bg-orange-800"
                                >
                                    Abrir PDF ↗
                                </a>
                            </article>
                        </div>
                    </div>
                </section>

                <!-- =================================================
                     PDF PARA ADULTOS
                ================================================== -->

                <section
                    id="pdf-adultos"
                    class="scroll-mt-24 px-5 pb-14 md:px-8"
                >
                    <div class="mx-auto max-w-6xl">
                        <div
                            class="mb-7 rounded-3xl border border-white/80
                                   bg-white/85 p-7 shadow-lg md:p-9"
                        >
                            <span class="text-4xl">🎓</span>

                            <h2 class="mt-3 text-3xl font-extrabold text-amber-950">
                                PDF para adultos
                            </h2>

                            <p class="mt-3 text-gray-700">
                                Materiales de apoyo para estudiar y
                                practicar español.
                            </p>
                        </div>

                        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            <article
                                v-for="pdf in pdfAdultos"
                                :key="pdf.archivo"
                                class="flex flex-col rounded-2xl
                                       border border-white/80 bg-white/90
                                       p-6 shadow-md transition
                                       hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div class="text-4xl">📗</div>

                                <h3 class="mt-4 text-lg font-extrabold text-gray-900">
                                    {{ pdf.titulo }}
                                </h3>

                                <p class="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                                    {{ pdf.descripcion }}
                                </p>

                                <a
                                    :href="rutaPdf('adults', pdf.archivo)"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="mt-5 rounded-xl bg-rose-700
                                           px-4 py-3 text-center font-bold
                                           text-white hover:bg-rose-800"
                                >
                                    Abrir PDF ↗
                                </a>
                            </article>
                        </div>
                    </div>
                </section>

                <!-- =================================================
                     FOTOGRAFÍAS Y FICHAS VISUALES
                ================================================== -->

                <section
                    id="fichas-visuales"
                    class="scroll-mt-24 px-5 pb-14 md:px-8"
                >
                    <div class="mx-auto max-w-6xl">
                        <div
                            class="mb-8 rounded-3xl border border-white/80
                                   bg-white/85 p-7 shadow-lg md:p-10"
                        >
                            <span class="text-4xl">🖼️</span>

                            <h2
                                class="mt-3 text-3xl font-extrabold
                                       text-amber-950 md:text-4xl"
                            >
                                Fotografías y fichas visuales
                            </h2>

                            <p class="mt-3 leading-relaxed text-gray-700">
                                Material visual organizado por temas
                                según los nombres de tus archivos.
                            </p>
                        </div>

                        <div class="space-y-10">
                            <section
                                v-for="categoria in categoriasFotos"
                                :key="categoria.nombre"
                                class="rounded-3xl border border-white/80
                                       bg-white/80 p-5 shadow-lg
                                       backdrop-blur-sm md:p-7"
                            >
                                <h3 class="text-2xl font-extrabold text-amber-950">
                                    {{ categoria.icono }}
                                    {{ categoria.nombre }}
                                </h3>

                                <p class="mb-6 mt-2 text-gray-600">
                                    {{ categoria.descripcion }}
                                </p>

                                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                    <article
                                        v-for="foto in categoria.fotos"
                                        :key="foto.archivo"
                                        class="overflow-hidden rounded-2xl
                                               border border-gray-100
                                               bg-white shadow-sm transition
                                               hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <a
                                            :href="rutaFoto(foto.archivo)"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                :src="rutaFoto(foto.archivo)"
                                                :alt="foto.titulo"
                                                loading="lazy"
                                                class="h-56 w-full bg-gray-100
                                                       object-contain p-2"
                                            />
                                        </a>

                                        <div class="p-4">
                                            <h4 class="font-bold text-gray-900">
                                                {{ foto.titulo }}
                                            </h4>

                                            <p class="mt-2 text-sm leading-relaxed text-gray-600">
                                                {{ foto.descripcion }}
                                            </p>

                                            <a
                                                :href="rutaFoto(foto.archivo)"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="mt-3 inline-block text-sm
                                                       font-bold text-amber-800
                                                       hover:text-amber-950"
                                            >
                                                Ver imagen completa ↗
                                            </a>
                                        </div>
                                    </article>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>

                <!-- =================================================
                     CIERRE
                ================================================== -->

                <section class="px-5 pb-16 md:px-8">
                    <div
                        class="mx-auto grid max-w-5xl grid-cols-1
                               items-center gap-6 rounded-3xl
                               bg-gradient-to-r from-amber-900
                               via-orange-800 to-rose-800
                               p-8 text-white shadow-xl md:grid-cols-[1fr_auto]
                               md:p-12"
                    >
                        <div>
                            <h2 class="text-2xl font-extrabold md:text-3xl">
                                Aprende un poco cada día
                            </h2>

                            <p class="mt-4 leading-relaxed text-amber-50">
                                Combina los materiales de tus profesores,
                                los libros en PDF y las actividades online
                                para seguir mejorando tu castellano.
                            </p>
                        </div>

                        <div class="text-center text-6xl md:text-7xl">
                            🌱
                        </div>
                    </div>
                </section>

                <footer
                    class="border-t border-amber-200/70
                           bg-white/90 px-5 py-7 text-center"
                >
                    <p class="font-semibold text-amber-950">
                        ExAequo · Cursos Generales
                    </p>

                    <p class="mt-2 text-sm text-gray-600">
                        Recursos para aprender, practicar y compartir.
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
// BACKEND
// ============================================================

const API_BASE_URL = 'http://localhost:3000/api'

// ============================================================
// RECURSOS GRATUITOS ONLINE
// ============================================================

const recursosOnline = [
    {
        titulo: 'ProfeDeELE',
        categoria: 'Actividades y recursos',
        descripcion:
            'Actividades, vídeos y materiales para practicar español en distintos niveles.',
        url: 'https://www.profedeele.es/',
        icono: '📝',
        boton: 'Explorar actividades',
        colorIcono: 'bg-amber-100',
        colorTexto: 'text-amber-800',
        colorBoton: 'bg-amber-700 hover:bg-amber-800'
    },
    {
        titulo: 'AprenderEspañol.org',
        categoria: 'Escucha y comprensión',
        descripcion:
            'Ejercicios para practicar la comprensión auditiva y otros aspectos del español.',
        url: 'https://aprenderespanol.org/',
        icono: '🎧',
        boton: 'Practicar español',
        colorIcono: 'bg-sky-100',
        colorTexto: 'text-sky-800',
        colorBoton: 'bg-sky-700 hover:bg-sky-800'
    },
    {
        titulo: 'Superespañol',
        categoria: 'Diálogos y audio',
        descripcion:
            'Recursos para practicar la escucha y familiarizarse con diálogos en español.',
        url: 'https://superespanol.com/',
        icono: '🗣️',
        boton: 'Escuchar y practicar',
        colorIcono: 'bg-emerald-100',
        colorTexto: 'text-emerald-800',
        colorBoton: 'bg-emerald-700 hover:bg-emerald-800'
    },
    {
        titulo: 'DELE Ahora',
        categoria: 'Ejercicios y niveles avanzados',
        descripcion:
            'Actividades para practicar español y trabajar ejercicios de distintos niveles.',
        url: 'https://deleahora.com/actividades',
        icono: '🎓',
        boton: 'Resolver actividades',
        colorIcono: 'bg-violet-100',
        colorTexto: 'text-violet-800',
        colorBoton: 'bg-violet-700 hover:bg-violet-800'
    }
]

// ============================================================
// PDF PARA NIÑOS
// public/pdf/castellano/child/
// ============================================================

const pdfNinos = [
    {
        archivo: 'Hola.amigos1.pdf',
        titulo: 'Hola amigos 1',
        descripcion: 'Material para comenzar a aprender español.'
    },
    {
        archivo: 'Hola.amigos2.pdf',
        titulo: 'Hola amigos 2',
        descripcion: 'Continuación de la serie Hola amigos.'
    },
    {
        archivo: 'Hola.amigos3.pdf',
        titulo: 'Hola amigos 3',
        descripcion: 'Material para continuar practicando español.'
    },
    {
        archivo: 'hola.amigos4.pdf',
        titulo: 'Hola amigos 4',
        descripcion: 'Cuarto material de la serie Hola amigos.'
    },
    {
        archivo: 'Paul Noble Spanish for Kids.pdf',
        titulo: 'Paul Noble Spanish for Kids',
        descripcion: 'Material de aprendizaje de español para niños.'
    },
    {
        archivo: 'VEN A LEER 1  arasaac.pdf',
        titulo: 'Ven a leer 1 · ARASAAC',
        descripcion: 'Material de apoyo para comenzar a trabajar la lectura.'
    }
]

// ============================================================
// PDF PARA ADOLESCENTES
// public/pdf/castellano/adolescentes/
// ============================================================

const pdfAdolescentes = [
    {
        archivo: 'Aprendemos-espanol-Manual-Inmigrantes.pdf',
        titulo: 'Aprendemos español · Manual para inmigrantes',
        descripcion: 'Manual de apoyo para aprender español.'
    },
    {
        archivo: 'manual-tejiendo-el-espanol-nivel-a1.pdf',
        titulo: 'Tejiendo el español · Nivel A1',
        descripcion: 'Material de nivel inicial para aprender español.'
    },
    {
        archivo: 'Material-espanol-ninos-jovenes.pdf',
        titulo: 'Material de español para niños y jóvenes',
        descripcion: 'Recursos de apoyo para el aprendizaje del español.'
    }
]

// ============================================================
// PDF PARA ADULTOS
// public/pdf/castellano/adults/
// ============================================================

const pdfAdultos = [
    {
        archivo: 'Libro1.pdf',
        titulo: 'Libro 1',
        descripcion: 'Material de estudio y consulta para aprender español.'
    },
    {
        archivo: 'Libro1-2.pdf',
        titulo: 'Libro 1-2',
        descripcion: 'Material complementario para continuar el aprendizaje.'
    },
    {
        archivo: 'Libro3.pdf',
        titulo: 'Libro 3',
        descripcion: 'Material para seguir practicando español.'
    }
]

// ============================================================
// RUTAS DE LOS ARCHIVOS
// ============================================================

function rutaPdf(carpeta, archivo) {
    return `/pdf/castellano/${carpeta}/${archivo
        .split('/')
        .map(parte => encodeURIComponent(parte))
        .join('/')}`
}

const carpetaFotos = '/fotos/cursos/castellano/'

function rutaFoto(archivo) {
    return carpetaFotos + encodeURIComponent(archivo)
}

// ============================================================
// FICHAS VISUALES POR CATEGORÍA
// ============================================================

const categoriasFotos = [
    {
        nombre: 'Vocabulario básico y expresiones',
        icono: '🔤',
        descripcion: 'Expresiones útiles y vocabulario cotidiano.',
        fotos: [
            { archivo: 'basic.expressions.jpg', titulo: 'Expresiones básicas', descripcion: 'Expresiones para empezar a comunicarse.' },
            { archivo: 'basic.questions.jpg', titulo: 'Preguntas básicas', descripcion: 'Preguntas útiles para conversar.' },
            { archivo: 'frassesImportantes.jpg', titulo: 'Frases importantes', descripcion: 'Frases de uso frecuente.' },
            { archivo: 'wordsofinterest.jpg', titulo: 'Palabras de interés', descripcion: 'Vocabulario para ampliar la expresión.' },
            { archivo: 'wordsofinterest1.jpg', titulo: 'Palabras de interés 1', descripcion: 'Material visual de vocabulario.' },
            { archivo: 'wordsofinterest2.jpg', titulo: 'Palabras de interés 2', descripcion: 'Más vocabulario para practicar.' },
            { archivo: 'numbers.png', titulo: 'Los números', descripcion: 'Apoyo visual para aprender los números.' },
            { archivo: 'erroresComunes.jpg', titulo: 'Errores comunes', descripcion: 'Ficha para repasar errores habituales.' }
        ]
    },
    {
        nombre: 'Adjetivos, colores y descripciones',
        icono: '🎨',
        descripcion: 'Aprende a describir personas, objetos y características.',
        fotos: [
            { archivo: 'adjetivosDeDiscripcion.jpg', titulo: 'Adjetivos para describir', descripcion: 'Vocabulario para realizar descripciones.' },
            { archivo: 'adjetivosopuestos.jpg', titulo: 'Adjetivos opuestos', descripcion: 'Aprende adjetivos y sus contrarios.' },
            { archivo: 'adjetivosopuestos1.jpg', titulo: 'Adjetivos opuestos 1', descripcion: 'Más ejemplos de adjetivos contrarios.' },
            { archivo: 'colores.jpg', titulo: 'Los colores', descripcion: 'Vocabulario visual de colores.' },
            { archivo: 'forma.jpg', titulo: 'Las formas', descripcion: 'Aprende a identificar formas.' },
            { archivo: 'sensacion.jpg', titulo: 'Sensaciones', descripcion: 'Palabras para expresar sensaciones.' },
            { archivo: 'estadoEmocions.jpg', titulo: 'Estados emocionales', descripcion: 'Vocabulario relacionado con las emociones.' }
        ]
    },
    {
        nombre: 'Gramática y tiempos verbales',
        icono: '📘',
        descripcion: 'Material visual para repasar estructuras gramaticales.',
        fotos: [
            { archivo: 'articulos.ese.esa.alli.jpg', titulo: 'Artículos y demostrativos', descripcion: 'Repaso visual de palabras demostrativas.' },
            { archivo: 'singularyplural.jpg', titulo: 'Singular y plural', descripcion: 'Diferencias entre singular y plural.' },
            { archivo: 'fuiyser.jpg', titulo: 'Ser y fui', descripcion: 'Material para repasar formas verbales.' },
            { archivo: 'nativeagreement.jpg', titulo: 'Concordancia', descripcion: 'Ficha de repaso gramatical.' },
            { archivo: 'nativereaactions.jpg', titulo: 'Reacciones y expresiones', descripcion: 'Expresiones útiles en una conversación.' },
            { archivo: 'pastpresentfuture.jpg', titulo: 'Pasado, presente y futuro', descripcion: 'Repaso visual de los tiempos verbales.' },
            { archivo: 'pastpresentfuture2.jpg', titulo: 'Tiempos verbales 2', descripcion: 'Más práctica de los tiempos verbales.' },
            { archivo: 'pastpresentfutureq.jpg', titulo: 'Preguntas sobre los tiempos verbales', descripcion: 'Material de repaso verbal.' }
        ]
    },
    {
        nombre: 'Verbos y acciones',
        icono: '🏃',
        descripcion: 'Verbos para hablar de acciones y actividades.',
        fotos: [
            { archivo: 'verbos.jpg', titulo: 'Los verbos', descripcion: 'Introducción visual a los verbos.' },
            { archivo: 'verbos2.jpg', titulo: 'Los verbos 2', descripcion: 'Más vocabulario de acciones.' },
            { archivo: 'verbosComunes.jpg', titulo: 'Verbos comunes', descripcion: 'Verbos frecuentes en la vida diaria.' },
            { archivo: 'verbos importantes.jpg', titulo: 'Verbos importantes', descripcion: 'Verbos útiles para comunicarse.' },
            { archivo: 'verbosimportantes2.jpg', titulo: 'Verbos importantes 2', descripcion: 'Más verbos para practicar.' },
            { archivo: 'verbos accion.jpg', titulo: 'Verbos de acción', descripcion: 'Acciones representadas visualmente.' },
            { archivo: 'verbosmovimiento.jpg', titulo: 'Verbos de movimiento', descripcion: 'Verbos relacionados con el movimiento.' },
            { archivo: 'verbosdecomunicacion.jpg', titulo: 'Verbos de comunicación', descripcion: 'Verbos para hablar y comunicarse.' },
            { archivo: 'verbosdecocinar.jpg', titulo: 'Verbos de cocina', descripcion: 'Acciones relacionadas con cocinar.' },
            { archivo: 'verbo.clima.jpg', titulo: 'Verbos relacionados con el clima', descripcion: 'Vocabulario relacionado con el tiempo.' },
            { archivo: 'imperstivo.jpg', titulo: 'El imperativo', descripcion: 'Material para practicar instrucciones.' },
            { archivo: 'imperativosdeInteres.jpg', titulo: 'Imperativos útiles', descripcion: 'Instrucciones de uso frecuente.' }
        ]
    },
    {
        nombre: 'Adverbios, direcciones y conectores',
        icono: '🧭',
        descripcion: 'Aprende a indicar dónde, cuándo y cómo suceden las cosas.',
        fotos: [
            { archivo: 'basic.adverbios.jpg', titulo: 'Adverbios básicos', descripcion: 'Introducción a los adverbios.' },
            { archivo: 'adverbio.jpg', titulo: 'Adverbios', descripcion: 'Ficha de repaso de adverbios.' },
            { archivo: 'adverbdelugar.jpg', titulo: 'Adverbios de lugar', descripcion: 'Expresiones para indicar dónde.' },
            { archivo: 'adverbiodetiempo.jpg', titulo: 'Adverbios de tiempo', descripcion: 'Expresiones para hablar del tiempo.' },
            { archivo: 'adverbiodetiempo1.jpg', titulo: 'Adverbios de tiempo 1', descripcion: 'Más vocabulario temporal.' },
            { archivo: 'direcciones.jpg', titulo: 'Cómo dar direcciones', descripcion: 'Expresiones para orientarse.' },
            { archivo: 'direcciones1.jpg', titulo: 'Direcciones 1', descripcion: 'Práctica de indicaciones.' },
            { archivo: 'direcciones2.jpg', titulo: 'Direcciones 2', descripcion: 'Más ejemplos de orientación.' },
            { archivo: 'transitionphrase.jpg', titulo: 'Conectores y transiciones', descripcion: 'Expresiones para enlazar ideas.' },
            { archivo: 'uncertainityphrase.jpg', titulo: 'Expresiones de incertidumbre', descripcion: 'Expresiones para indicar dudas.' }
        ]
    },
    {
        nombre: 'La familia, la casa y la vida cotidiana',
        icono: '🏠',
        descripcion: 'Vocabulario para hablar del hogar y las actividades diarias.',
        fotos: [
            { archivo: 'lafamilia.jpg', titulo: 'La familia', descripcion: 'Vocabulario de parentesco.' },
            { archivo: 'laCasa.jpg', titulo: 'La casa', descripcion: 'Partes y espacios de una vivienda.' },
            { archivo: 'cosas del dormitorio.jpg', titulo: 'Cosas del dormitorio', descripcion: 'Objetos habituales del dormitorio.' },
            { archivo: 'objetos del dormitorio.jpg', titulo: 'Objetos del dormitorio 2', descripcion: 'Más vocabulario doméstico.' },
            { archivo: 'tareasdelHogar.jpg', titulo: 'Tareas del hogar', descripcion: 'Actividades domésticas.' },
            { archivo: 'escolar.jpg', titulo: 'Vocabulario escolar', descripcion: 'Palabras relacionadas con la escuela.' },
            { archivo: 'profesiones.jpg', titulo: 'Las profesiones', descripcion: 'Nombres de profesiones y trabajos.' },
            { archivo: 'body.jpg', titulo: 'El cuerpo', descripcion: 'Vocabulario básico del cuerpo humano.' },
            { archivo: 'cuerpoHumano.jpg', titulo: 'El cuerpo humano', descripcion: 'Ficha visual del cuerpo humano.' }
        ]
    },
    {
        nombre: 'Comida, bebida y cocina',
        icono: '🍎',
        descripcion: 'Aprende nombres de alimentos, bebidas y sabores.',
        fotos: [
            { archivo: 'agua.jpg', titulo: 'El agua', descripcion: 'Vocabulario relacionado con el agua.' },
            { archivo: 'bebidas.jpg', titulo: 'Las bebidas', descripcion: 'Nombres de bebidas habituales.' },
            { archivo: 'cocina.jpg', titulo: 'La cocina', descripcion: 'Vocabulario de cocina.' },
            { archivo: 'continentedecomida.jpg', titulo: 'Alimentos', descripcion: 'Material visual de alimentos.' },
            { archivo: 'estadodecomida.jpg', titulo: 'Estados de los alimentos', descripcion: 'Vocabulario relacionado con la comida.' },
            { archivo: 'sabor.jpg', titulo: 'Los sabores', descripcion: 'Palabras para describir sabores.' },
            { archivo: 'sabor1.jpg', titulo: 'Los sabores 1', descripcion: 'Más vocabulario de sabores.' },
            { archivo: 'verduras.jpg', titulo: 'Las verduras', descripcion: 'Nombres de verduras.' },
            { archivo: 'insectos.jpg', titulo: 'Los insectos', descripcion: 'Vocabulario visual de insectos.' }
        ]
    },
    {
        nombre: 'Ropa, lugares, salud y entorno',
        icono: '🌍',
        descripcion: 'Vocabulario para describir el entorno y situaciones cotidianas.',
        fotos: [
            { archivo: 'laropa.jpg', titulo: 'La ropa', descripcion: 'Nombres de prendas de vestir.' },
            { archivo: 'lugares.jpg', titulo: 'Los lugares', descripcion: 'Vocabulario de lugares y espacios.' },
            { archivo: 'climaytiempo.jpg', titulo: 'El clima y el tiempo', descripcion: 'Expresiones relacionadas con el clima.' },
            { archivo: 'medicina.jpg', titulo: 'La salud y la medicina', descripcion: 'Vocabulario de salud.' },
            { archivo: 'preguntas.jpg', titulo: 'Preguntas', descripcion: 'Apoyo visual para formular preguntas.' },
            { archivo: 'Amar.jpg', titulo: 'Amar', descripcion: 'Material visual para trabajar vocabulario.' }
        ]
    },
    {
        nombre: 'Comunicación y expresiones',
        icono: '💬',
        descripcion: 'Frases útiles, expresiones idiomáticas y comunicación.',
        fotos: [
            { archivo: 'Hablarmejor.jpg', titulo: 'Hablar mejor', descripcion: 'Material para mejorar la comunicación.' },
            { archivo: 'realmeaningidioms.jpg', titulo: 'Expresiones idiomáticas', descripcion: 'Expresiones cuyo significado no siempre es literal.' },
            { archivo: 'expresionesfolklor.jpg', titulo: 'Expresiones populares', descripcion: 'Material de expresiones culturales.' },
            { archivo: 'insultos.jpg', titulo: 'Insultos y lenguaje', descripcion: 'Material lingüístico sobre expresiones.' }
        ]
    }
]

// ============================================================
// NORMALIZAR TEXTO PARA COMPARAR IDIOMAS
// ============================================================

function normalizarTexto(valor) {
    return String(valor || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
}

// ============================================================
// ESTADO DE LOS RECURSOS DEL PROFESORADO
// ============================================================

const recursosProfesor = ref([])
const cargandoRecursos = ref(true)
const errorRecursos = ref('')
const nivelSeleccionado = ref('TODOS')

const recursosFiltrados = computed(() => {
    return recursosProfesor.value.filter((recurso) => {
        const nivel = String(recurso.nivel || '')
            .trim()
            .toUpperCase()

        if (nivelSeleccionado.value === 'TODOS') {
            return true
        }

        return nivel === nivelSeleccionado.value
    })
})

// ============================================================
// CONSULTAR LA API DE LAS DOS ESCUELAS
// ============================================================

async function cargarRecursosProfesor() {
    cargandoRecursos.value = true
    errorRecursos.value = ''

    try {
        const escuelas = [
            'Ateneu Aula 502',
            'Biblioteca Joan Miró'
        ]

        const respuestas = await Promise.all(
            escuelas.map(async (escuela) => {
                const url = new URL(
                    `${API_BASE_URL}/escuelas/recursos`
                )

                url.searchParams.set('escuela', escuela)

                const respuesta = await fetch(url.toString())

                if (!respuesta.ok) {
                    throw new Error(
                        `No se pudieron consultar los recursos de ${escuela}.`
                    )
                }

                const resultado = await respuesta.json()

                if (resultado.ok === false) {
                    throw new Error(
                        resultado.mensaje ||
                        'No se pudieron obtener los recursos.'
                    )
                }

                return Array.isArray(resultado.datos)
                    ? resultado.datos
                    : []
            })
        )

        const todosLosRecursos = respuestas.flat()

        recursosProfesor.value = todosLosRecursos.filter((recurso) => {
            const idioma = normalizarTexto(recurso.idioma)

            return (
                idioma === 'castellano' ||
                idioma.includes('castellano') ||
                idioma === 'espanol' ||
                idioma.includes('espanol') ||
                idioma === 'spanish' ||
                idioma.includes('spanish')
            )
        })

    } catch (error) {
        console.error(
            'Error al cargar los recursos de castellano:',
            error
        )

        errorRecursos.value =
            'Comprueba que el backend funciona en el puerto 3000. ' +
            (error.message || 'No se pudo establecer la conexión.')

    } finally {
        cargandoRecursos.value = false
    }
}

// ============================================================
// CONSTRUIR LA URL DEL ARCHIVO PUBLICADO POR EL PROFESORADO
// ============================================================

function urlRecurso(ruta) {
    const valor = String(ruta || '').trim()

    if (!valor) {
        return '#'
    }

    if (/^https?:\/\//i.test(valor)) {
        return valor
    }

    return `http://localhost:3000/${valor.replace(/^\/+/, '')}`
}

// ============================================================
// CARGA INICIAL
// ============================================================

onMounted(() => {
    cargarRecursosProfesor()
})
</script>
