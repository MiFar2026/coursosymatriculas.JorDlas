<template>
    <section class="flex flex-wrap items-center gap-4">

        <!-- BOTÓN NORMAS -->

        <button
            type="button"
            @click="modalActivo = 'normas'"
            class="w-20 h-20 rounded-full
                   bg-purple-700 hover:bg-purple-800
                   text-white shadow-lg
                   flex flex-col items-center justify-center
                   transition hover:scale-105"
            aria-label="Consultar las normas de Ateneu"
        >
            <span class="text-2xl">📋</span>

            <span class="text-xs font-bold mt-1">
                Normas
            </span>
        </button>

        <!-- BOTÓN AVISOS -->

        <button
            type="button"
            @click="abrirAvisos"
            class="w-20 h-20 rounded-full
                   bg-amber-500 hover:bg-amber-600
                   text-white shadow-lg
                   flex flex-col items-center justify-center
                   transition hover:scale-105"
            aria-label="Consultar los avisos de Ateneu"
        >
            <span class="text-2xl">📢</span>

            <span class="text-xs font-bold mt-1">
                Avisos
            </span>
        </button>

        <!-- VENTANA MODAL -->

        <div
            v-if="modalActivo"
            class="fixed inset-0 z-[100]
                   bg-black/50 flex items-center justify-center
                   p-4"
            @click.self="modalActivo = null"
        >
            <section
                class="bg-white w-full max-w-xl
                       rounded-2xl shadow-2xl
                       max-h-[85vh] overflow-y-auto"
                role="dialog"
                aria-modal="true"
            >

                <!-- CABECERA -->

                <header
                    class="bg-purple-700 text-white
                           p-5 rounded-t-2xl
                           flex justify-between items-center"
                >
                    <h2 class="text-xl font-bold">
                        {{ modalActivo === 'normas'
                            ? 'Normas de Ateneu'
                            : 'Avisos de Ateneu'
                        }}
                    </h2>

                    <button
                        type="button"
                        @click="modalActivo = null"
                        class="text-2xl hover:text-gray-200"
                        aria-label="Cerrar"
                    >
                        &times;
                    </button>
                </header>

                <!-- NORMAS -->

                <div
                    v-if="modalActivo === 'normas'"
                    class="p-6"
                >
                    <p class="text-gray-600 mb-5">
                        Para aprender y convivir en un ambiente
                        respetuoso, seguimos estas normas:
                    </p>

                    <ol class="space-y-4">

                        <li
                            v-for="(norma, indice) in normas"
                            :key="norma"
                            class="flex gap-3 items-start"
                        >
                            <span
                                class="flex-shrink-0 w-8 h-8
                                       rounded-full bg-purple-100
                                       text-purple-800 font-bold
                                       flex items-center justify-center"
                            >
                                {{ indice + 1 }}
                            </span>

                            <span class="pt-1">
                                {{ norma }}
                            </span>
                        </li>

                    </ol>
                </div>

                <!-- AVISOS -->

                <div
                    v-else
                    class="p-6"
                >
                    <div
                        class="rounded-xl bg-amber-50
                               border border-amber-200 p-5"
                    >
                        <p class="font-bold text-amber-900 mb-2">
                            Avisos de la escuela
                        </p>

                        <p class="text-gray-700">
                            Aquí aparecerán los avisos publicados
                            por los tutores de Ateneu.
                        </p>

                        <p class="text-sm text-gray-500 mt-3">
                            Los avisos diarios desaparecerán
                            automáticamente después de 72 horas.
                        </p>
                    </div>

                    <p class="text-sm text-gray-500 mt-4">
                        Los avisos todavía deben conectarse con
                        la API y la base de datos.
                    </p>
                </div>

                <!-- PIE -->

                <footer class="p-5 border-t flex justify-end">
                    <button
                        type="button"
                        @click="modalActivo = null"
                        class="px-5 py-2 rounded-lg
                               bg-gray-200 hover:bg-gray-300
                               font-semibold"
                    >
                        Cerrar
                    </button>
                </footer>

            </section>
        </div>

    </section>
</template>

<script setup>
import { ref } from 'vue'

const modalActivo = ref(null)

const normas = [
    'Pedir la palabra levantando la mano y esperar el turno.',
    'Escuchar con atención a los demás.',
    'Utilizar un lenguaje respetuoso.',
    'Participar de forma constructiva.',
    'Respetar la diversidad de opiniones.',
    'Llegar puntual y preparado para la clase.',
    'Mantener una buena higiene personal.'
]

function abrirAvisos() {
    modalActivo.value = 'avisos'
}
</script>