
<template>
    <header
        class="w-full sticky top-0 z-50 shadow-md border-b-2 border-black"
    >
        <!-- =================================================
             FONDO DEL NAVBAR
             MISMA ESTRUCTURA QUE NAVBARATENEU
        ================================================== -->

        <div class="relative overflow-hidden">

            <!-- =================================================
                 IMAGEN VERDE COMO FONDO DEL NAVBAR

                 La imagen queda detrás del menú.
                 No crea altura adicional.
            ================================================== -->

            <div
                class="absolute inset-0 bg-center bg-no-repeat bg-cover"
                style="
                    background-image: url('/fotos/joanmiro/JoanMironavbar.png');
                "
            ></div>

            <!-- =================================================
                 CAPA GENERAL SUAVE
            ================================================== -->

            <div
                class="absolute inset-0 bg-white/25"
            ></div>

            <!-- =================================================
                 DEGRADADO DE LEGIBILIDAD

                 Izquierda: imagen verde visible.
                 Derecha: fondo progresivamente más claro.
            ================================================== -->

            <div
                class="absolute inset-0 bg-gradient-to-r from-white/35 via-white/55 via-65% to-white/95"
            ></div>

            <!-- =================================================
                 REFUERZO DE LEGIBILIDAD A LA DERECHA
            ================================================== -->

            <div
                class="absolute inset-y-0 right-0 w-[45%] bg-gradient-to-l from-white/45 via-white/20 to-transparent"
            ></div>

            <!-- =================================================
                 NAVBAR PRINCIPAL
            ================================================== -->

            <nav
                class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >

                <div
                    class="flex items-center justify-between min-h-[88px]"
                >

                    <!-- =================================================
                         EXAEQUO
                    ================================================== -->

                    <RouterLink
                        to="/"
                        class="font-bold text-xl text-gray-950 hover:text-red-700 transition drop-shadow-sm relative z-10"
                    >
                        ExAequo
                    </RouterLink>

                    <!-- =================================================
                         MENÚ DESKTOP
                    ================================================== -->

                    <div
                        class="hidden lg:flex items-center gap-3 xl:gap-5"
                    >

                        <!-- HOME -->

                        <RouterLink
                            to="/joanmiro"
                            class="nav-link font-bold"
                        >
                            HOME
                        </RouterLink>

                        <!-- TUTORES -->

                        <RouterLink
                            to="/joanmiro/tutores"
                            class="nav-link"
                        >
                            Tutores
                        </RouterLink>

                        <!-- ALUMNOS -->

                        <RouterLink
                            to="/joanmiro/alumnos"
                            class="nav-link"
                        >
                            Alumnos
                        </RouterLink>

                        <!-- informacion-util -->

                       <RouterLink to="/joanmiro/informacion-util">
  Información útil
</RouterLink>

                        <!-- HORARIOS -->

                        <RouterLink
                            to="/joanmiro/horarios"
                            class="nav-link"
                        >
                            Horarios
                        </RouterLink>

                        <!-- MATRÍCULA -->

                        <RouterLink
                            to="/matricula"
                            class="nav-link nav-link-red"
                        >
                            Matrícula
                        </RouterLink>

                        <!-- MAPA -->

                        <a
                            href="https://maps.app.goo.gl/m3h2biqFUq6Gxwg88"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="nav-link flex items-center gap-1.5"
                        >
                            <span class="text-base">
                                📍
                            </span>

                            <span>
                                Mapa
                            </span>
                        </a>

                    </div>

                    <!-- =================================================
                         BOTÓN MENÚ MÓVIL
                    ================================================== -->

                    <button
                        type="button"
                        class="lg:hidden text-2xl text-gray-950 hover:text-red-700 transition relative z-10"
                        @click="menuAbierto = !menuAbierto"
                        :aria-expanded="menuAbierto"
                        aria-label="Abrir menú"
                    >
                        ☰
                    </button>

                </div>

                <!-- =================================================
                     MENÚ MÓVIL
                ================================================== -->

                <div
                    v-if="menuAbierto"
                    class="lg:hidden border-t border-black/30 py-4"
                >

                    <div
                        class="flex flex-col gap-2 bg-white/70 backdrop-blur-md rounded-xl p-3 border border-black/20"
                    >

                        <!-- HOME -->

                        <RouterLink
                            to="/joanmiro"
                            @click="menuAbierto = false"
                            class="mobile-link"
                        >
                            HOME
                        </RouterLink>

                        <!-- TUTORES -->

                        <RouterLink
                            to="/joanmiro/tutores"
                            @click="menuAbierto = false"
                            class="mobile-link"
                        >
                            Tutores
                        </RouterLink>

                        <!-- ALUMNOS -->

                        <RouterLink
                            to="/joanmiro/alumnos"
                            @click="menuAbierto = false"
                            class="mobile-link"
                        >
                            Alumnos
                        </RouterLink>

                        <!-- informacion-util -->

                        <RouterLink
                            to="/joanmiro/informacion-util"
                            @click="menuAbierto = false"
                            class="mobile-link"
                        >
                            informacion-util
                        </RouterLink>

                        <!-- HORARIOS -->

                        <RouterLink
                            to="/joanmiro/horarios"
                            @click="menuAbierto = false"
                            class="mobile-link"
                        >
                            Horarios
                        </RouterLink>

                        <!-- MATRÍCULA -->

                        <RouterLink
                            to="/matricula"
                            @click="menuAbierto = false"
                            class="mobile-link text-red-700"
                        >
                            Matrícula
                        </RouterLink>

                        <!-- MAPA -->

                        <a
                            href="https://maps.app.goo.gl/m3h2biqFUq6Gxwg88"
                            target="_blank"
                            rel="noopener noreferrer"
                            @click="menuAbierto = false"
                            class="mobile-link"
                        >
                            📍 Mapa
                        </a>

                    </div>

                </div>

            </nav>

        </div>

        <!-- =================================================
             BARRA SECUNDARIA AL HACER SCROLL
        ================================================== -->

        <transition name="slide-down">

            <div
                v-if="mostrarJoanMiro"
                class="border-t border-black/20 bg-white/95 backdrop-blur-sm"
            >

                <div
                    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2"
                >

                    <div
                        class="flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
                    >

                        <!-- MATRÍCULA -->

                        <RouterLink
                            to="/matricula"
                            class="flex items-center gap-2 text-sm font-bold text-red-700 hover:text-red-800 transition"
                        >
                            <span>
                                Matrícula
                            </span>

                            <span class="text-red-400">
                                →
                            </span>
                        </RouterLink>

                        <!-- SEPARADOR -->

                        <span class="hidden sm:inline text-gray-300">
                            |
                        </span>

                        <!-- ENLACE A ATENEU -->

                        <RouterLink
                            to="/ateneu"
                            class="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-red-700 transition"
                        >
                            <span>
                                Escuela Ateneu Aula 502
                            </span>

                            <span class="text-gray-400">
                                →
                            </span>
                        </RouterLink>

                    </div>

                </div>

            </div>

        </transition>

    </header>
</template>

<script setup>
import {
    ref,
    onMounted,
    onBeforeUnmount
} from 'vue'

/* =================================================
   ESTADO DEL MENÚ MÓVIL
================================================== */

const menuAbierto = ref(false)

/* =================================================
   ESTADO DE LA BARRA SECUNDARIA
================================================== */

const mostrarJoanMiro = ref(false)

/* =================================================
   CONTROL DEL SCROLL
================================================== */

const controlarScroll = () => {
    mostrarJoanMiro.value = window.scrollY > 180
}

/* =================================================
   AL MONTAR EL COMPONENTE
================================================== */

onMounted(() => {
    window.addEventListener(
        'scroll',
        controlarScroll,
        { passive: true }
    )

    controlarScroll()
})

/* =================================================
   AL SALIR DEL COMPONENTE
================================================== */

onBeforeUnmount(() => {
    window.removeEventListener(
        'scroll',
        controlarScroll
    )
})
</script>

<style scoped>

/* =================================================
   ENLACES DEL NAVBAR
   MISMO DISEÑO QUE ATENEU
================================================== */

.nav-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 0.55rem 0.65rem;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: rgb(31 41 55);
    background: rgba(255, 255, 255, 0.32);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9);
    transition:
        color 0.2s ease,
        background-color 0.2s ease,
        transform 0.2s ease;
}

/* =================================================
   EFECTO HOVER
================================================== */

.nav-link:hover {
    color: rgb(185 28 28);
    background: rgba(255, 255, 255, 0.72);
    transform: translateY(-1px);
}

/* =================================================
   MATRÍCULA
================================================== */

.nav-link-red {
    color: rgb(185 28 28);
    font-weight: 700;
    background: rgba(255, 255, 255, 0.52);
}

.nav-link-red:hover {
    color: rgb(153 27 27);
    background: rgba(254, 242, 242, 0.88);
}

/* =================================================
   MENÚ MÓVIL
================================================== */

.mobile-link {
    display: block;
    padding: 0.65rem 0.75rem;
    border-radius: 0.6rem;
    font-weight: 600;
    color: rgb(31 41 55);
    transition:
        background-color 0.2s ease,
        color 0.2s ease;
}

.mobile-link:hover {
    background: rgba(255, 255, 255, 0.85);
    color: rgb(185 28 28);
}

/* =================================================
   ENLACE A LA OTRA ESCUELA
================================================== */

.school-link {
    background: rgba(255, 255, 255, 0.55);
    border: 1px solid rgba(0, 0, 0, 0.10);
}

.school-link:hover {
    background: rgba(255, 255, 255, 0.9);
}

/* =================================================
   ANIMACIÓN DE LA BARRA SECUNDARIA
================================================== */

.slide-down-enter-active,
.slide-down-leave-active {
    transition:
        opacity 0.25s ease,
        transform 0.25s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

</style>