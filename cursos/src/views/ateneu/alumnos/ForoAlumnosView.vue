<template>
    <div class="min-h-screen bg-gray-50 text-gray-800">

        <NavbarAteneu />

        <main class="max-w-6xl mx-auto px-4 sm:px-6 py-10">

            <header class="mb-8">

                <p class="text-sm font-bold uppercase tracking-widest
                          text-purple-700 mb-2">
                    Escuela Ateneu
                </p>

                <h1 class="text-3xl font-bold mb-3">
                    Foro de estudiantes
                </h1>

                <p class="text-gray-600">
                    Comparte dudas, ideas y recursos con los compañeros
                    y los profesores.
                </p>

            </header>

            <section class="grid grid-cols-1 sm:grid-cols-2
                            lg:grid-cols-4 gap-4 mb-8">

                <button
                    v-for="categoria in categorias"
                    :key="categoria"
                    type="button"
                    @click="seleccionarCategoria(categoria)"
                    class="rounded-xl border p-5 text-left transition"
                    :class="
                        categoriaSeleccionada === categoria
                            ? 'bg-purple-700 text-white border-purple-700'
                            : 'bg-white hover:bg-purple-50'
                    "
                >

                    <span class="block text-2xl mb-3">
                        {{ categoria === 'General' ? '🌍' : '📚' }}
                    </span>

                    <span class="font-bold">
                        {{ categoria }}
                    </span>

                </button>

            </section>

            <section class="bg-white rounded-2xl border shadow p-6 mb-8">

                <h2 class="text-xl font-bold mb-2">
                    {{ categoriaSeleccionada }}
                </h2>

                <p class="text-gray-600 mb-5">
                    Publica una pregunta o comparte algo útil
                    con la comunidad de Ateneu.
                </p>

                <form
                    @submit.prevent="publicarMensaje"
                    class="space-y-4"
                >

                    <div>

                        <label class="block font-semibold mb-2">
                            Título
                        </label>

                        <input
                            v-model.trim="formulario.titulo"
                            required
                            maxlength="200"
                            class="w-full border rounded-lg p-3"
                            placeholder="¿Sobre qué quieres hablar?"
                        >

                    </div>

                    <div>

                        <label class="block font-semibold mb-2">
                            Mensaje
                        </label>

                        <textarea
                            v-model.trim="formulario.mensaje"
                            required
                            rows="5"
                            class="w-full border rounded-lg p-3"
                            placeholder="Escribe tu mensaje..."
                        ></textarea>

                    </div>

                    <div
                        v-if="estado"
                        role="status"
                        class="rounded-lg p-4"
                        :class="
                            error
                                ? 'bg-red-50 text-red-800'
                                : 'bg-blue-50 text-blue-800'
                        "
                    >
                        {{ estado }}
                    </div>

                    <button
                        type="submit"
                        class="bg-purple-700 hover:bg-purple-800
                               text-white font-bold rounded-lg px-5 py-3"
                    >
                        Publicar mensaje
                    </button>

                </form>

            </section>

            <section class="bg-white rounded-2xl border shadow p-6">

                <h2 class="text-xl font-bold mb-4">
                    Publicaciones
                </h2>

                <p class="text-gray-600">
                    Aquí aparecerán las publicaciones de la categoría
                    seleccionada cuando conectemos la API del foro.
                </p>

            </section>

        </main>

    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import NavbarAteneu from '../../../components/ateneu/NavbarAteneu.vue'

const categorias = [
    'Castellano A1',
    'Castellano A2',
    'Castellano B1',
    'Catalán A1',
    'Catalán A2',
    'Catalán B1',
    'Alfabetización',
    'General'
]

const categoriaSeleccionada = ref('General')

const formulario = reactive({
    titulo: '',
    mensaje: ''
})

const estado = ref('')
const error = ref(false)

function seleccionarCategoria(categoria) {
    categoriaSeleccionada.value = categoria
    estado.value = ''
}

function publicarMensaje() {
    estado.value = ''
    error.value = false

    if (!formulario.titulo.trim() || !formulario.mensaje.trim()) {
        error.value = true
        estado.value = 'Escribe un título y un mensaje.'
        return
    }

    /*
     * Próximo paso:
     * POST /api/foro.php
     *
     * La categoría y la escuela se validarán en el servidor.
     */

    estado.value =
        'El formulario está preparado. Falta conectar las publicaciones con la API PHP.'
}
</script>
