
<template>
    <div class="min-h-screen bg-gray-50 text-gray-800">

        <NavbarJoanMiro />

        <main class="max-w-7xl mx-auto px-4 sm:px-6 py-10">

            <header class="mb-10">

                <p class="text-sm uppercase tracking-widest
                          font-bold text-teal-700 mb-2">
                    Biblioteca Joan Miró
                </p>

                <h1 class="text-3xl sm:text-4xl font-bold mb-3">
                    Espacio de tutores
                </h1>

                <p class="text-gray-600 max-w-3xl">
                    Gestiona los alumnos, revisa las tareas, comparte
                    recursos educativos, publica avisos y comunícate
                    con tus estudiantes.
                </p>

            </header>

            <section
                class="bg-amber-50 border border-amber-200
                       rounded-2xl p-6 mb-10"
            >

                <div class="flex flex-col sm:flex-row
                            sm:items-center sm:justify-between gap-4">

                    <div>

                        <h2 class="text-xl font-bold mb-2">
                            📢 Avisos de Biblioteca Joan Miró
                        </h2>

                        <p class="text-gray-700">
                            Los avisos pueden ser permanentes o temporales.
                            Los temporales expirarán a las 72 horas.
                        </p>

                    </div>

                    <button
                        type="button"
                        @click="mostrarFormularioAviso = !mostrarFormularioAviso"
                        class="bg-amber-600 hover:bg-amber-700
                               text-white font-bold rounded-lg
                               px-5 py-3"
                    >
                        {{ mostrarFormularioAviso
                            ? 'Cerrar formulario'
                            : 'Crear aviso'
                        }}
                    </button>

                </div>

                <form
                    v-if="mostrarFormularioAviso"
                    @submit.prevent="publicarAviso"
                    class="mt-6 bg-white rounded-xl border
                           border-amber-200 p-5 space-y-4"
                >

                    <div>

                        <label class="block font-semibold mb-2">
                            Título del aviso
                        </label>

                        <input
                            v-model.trim="aviso.titulo"
                            required
                            maxlength="200"
                            class="w-full border rounded-lg p-3"
                            placeholder="Ej.: Cambio de horario"
                        >

                    </div>

                    <div>

                        <label class="block font-semibold mb-2">
                            Contenido
                        </label>

                        <textarea
                            v-model.trim="aviso.mensaje"
                            required
                            rows="4"
                            class="w-full border rounded-lg p-3"
                            placeholder="Escribe el aviso..."
                        ></textarea>

                    </div>

                    <div>

                        <label class="block font-semibold mb-2">
                            Duración
                        </label>

                        <select
                            v-model="aviso.tipo"
                            class="w-full border rounded-lg p-3 bg-white"
                        >
                            <option value="PERMANENTE">
                                Permanente
                            </option>

                            <option value="DIARIO">
                                Temporal: máximo 72 horas
                            </option>
                        </select>

                    </div>

                    <button
                        type="submit"
                        class="bg-teal-700 hover:bg-teal-800
                               text-white font-bold rounded-lg
                               px-5 py-3"
                    >
                        Preparar publicación
                    </button>

                    <p class="text-sm text-gray-500">
                        La publicación real se activará al conectar
                        el formulario con la API de Joan Miró.
                    </p>

                </form>

                <p
                    v-if="mensajeAviso"
                    role="status"
                    class="mt-4 text-sm font-semibold"
                >
                    {{ mensajeAviso }}
                </p>

            </section>

            <section>

                <h2 class="text-2xl font-bold mb-6">
                    Gestión educativa
                </h2>

                <div class="grid grid-cols-1 sm:grid-cols-2
                            lg:grid-cols-3 gap-5">

                    <RouterLink
                        to="/joanmiro/alumnos"
                        class="tarjeta border-t-4 border-teal-600"
                    >

                        <span class="text-3xl">👩‍🎓</span>

                        <h3 class="titulo-tarjeta">
                            Alumnos
                        </h3>

                        <p class="texto-tarjeta">
                            Acceder al espacio del alumnado de Joan Miró.
                        </p>

                    </RouterLink>

                    <RouterLink
                        to="/joanmiro/tutores/resultados-alumno"
                        class="tarjeta border-t-4 border-red-500"
                    >

                        <span class="text-3xl">📝</span>

                        <h3 class="titulo-tarjeta">
                            Tareas y resultados
                        </h3>

                        <p class="texto-tarjeta">
                            Revisar trabajos, registrar notas y comentarios,
                            y devolver documentos corregidos.
                        </p>

                    </RouterLink>

                    <RouterLink
                        to="/joanmiro/tutores/mensaje-profesor"
                        class="tarjeta border-t-4 border-blue-500"
                    >

                        <span class="text-3xl">💬</span>

                        <h3 class="titulo-tarjeta">
                            Mensajes
                        </h3>

                        <p class="texto-tarjeta">
                            Enviar y recibir mensajes de los alumnos
                            de esta escuela.
                        </p>

                    </RouterLink>

                    <RouterLink
                        to="/joanmiro/recursos"
                        class="tarjeta border-t-4 border-green-600"
                    >

                        <span class="text-3xl">📚</span>

                        <h3 class="titulo-tarjeta">
                            Recursos educativos
                        </h3>

                        <p class="texto-tarjeta">
                            Acceder al espacio de recursos de Joan Miró.
                        </p>

                    </RouterLink>

                    <RouterLink
                        to="/joanmiro/alumnos/foro"
                        class="tarjeta border-t-4 border-purple-600"
                    >

                        <span class="text-3xl">🌍</span>

                        <h3 class="titulo-tarjeta">
                            Foro de estudiantes
                        </h3>

                        <p class="texto-tarjeta">
                            Participar en los foros de los cursos
                            y el foro general de Joan Miró.
                        </p>

                    </RouterLink>

                    <button
                        type="button"
                        @click="mostrarForoProfesores = !mostrarForoProfesores"
                        class="tarjeta text-left border-t-4 border-gray-700"
                    >

                        <span class="text-3xl">🔒</span>

                        <h3 class="titulo-tarjeta">
                            Foro del profesorado
                        </h3>

                        <p class="texto-tarjeta">
                            Espacio reservado al equipo docente de Joan Miró.
                        </p>

                    </button>

                </div>

                <div
                    v-if="mostrarForoProfesores"
                    class="mt-6 bg-white border rounded-xl p-6"
                >

                    <h3 class="text-xl font-bold mb-2">
                        Foro privado del profesorado
                    </h3>

                    <p class="text-gray-600 mb-4">
                        Esta escuela tendrá su propio foro interno,
                        separado del foro de Ateneu.
                    </p>

                    <p class="text-sm text-amber-800 bg-amber-50 p-4 rounded-lg">
                        El control de acceso real debe realizarse
                        en el servidor antes de habilitar el foro.
                    </p>

                </div>

            </section>

        </main>

        <footer class="border-t bg-white py-6 mt-12">
            <p class="text-center text-sm text-gray-500">
                ExAequo · Biblioteca Joan Miró · Espacio del profesorado
            </p>
        </footer>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import NavbarJoanMiro from '../../../components/joanmiro/NavbarJoanMiro.vue'

const mostrarFormularioAviso = ref(false)
const mostrarForoProfesores = ref(false)
const mensajeAviso = ref('')

const aviso = ref({
    titulo: '',
    mensaje: '',
    tipo: 'DIARIO'
})

function publicarAviso() {
    mensajeAviso.value =
        'El formulario está preparado. Falta conectarlo con la API de Joan Miró para guardar el aviso.'
}
</script>

<style scoped>
.tarjeta {
    display: block;
    width: 100%;
    padding: 1.5rem;
    background: white;
    border-radius: 1rem;
    border-right: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
    border-left: 1px solid #e5e7eb;
    box-shadow: 0 2px 8px rgb(0 0 0 / 5%);
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
}

.tarjeta:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 18px rgb(0 0 0 / 10%);
}

.titulo-tarjeta {
    font-size: 1.2rem;
    font-weight: 700;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
}

.texto-tarjeta {
    color: #4b5563;
    line-height: 1.6;
}
</style>
