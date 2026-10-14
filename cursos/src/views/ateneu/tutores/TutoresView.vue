
<template>
    <div class="min-h-screen bg-gray-50 text-gray-800">

        <NavbarAteneu />

        <main class="max-w-7xl mx-auto px-4 sm:px-6 py-10">

            <header class="mb-10">

                <p class="text-sm uppercase tracking-widest
                          font-bold text-indigo-700 mb-2">
                    Escuela Ateneu
                </p>

                <h1 class="text-3xl sm:text-4xl font-bold mb-3">
                    Espacio de tutores
                </h1>

                <p class="text-gray-600 max-w-3xl">
                    Gestiona tus grupos, consulta las tareas entregadas,
                    comparte recursos, publica avisos y comunícate
                    con los alumnos.
                </p>

            </header>

            <!-- AVISOS -->

            <section
                class="bg-amber-50 border border-amber-200
                       rounded-2xl p-6 mb-10"
            >

                <div class="flex flex-col sm:flex-row
                            sm:items-center sm:justify-between gap-4">

                    <div>

                        <h2 class="text-xl font-bold mb-2">
                            📢 Avisos de Ateneu
                        </h2>

                        <p class="text-gray-700">
                            Publica avisos permanentes o temporales.
                            Los temporales expirarán después de 72 horas.
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
                            placeholder="Ej.: Cambio de aula"
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
                        class="bg-indigo-600 hover:bg-indigo-700
                               text-white font-bold rounded-lg
                               px-5 py-3"
                    >
                        Preparar publicación
                    </button>

                    <p class="text-sm text-gray-500">
                        La publicación real se activará cuando conectemos
                        este formulario con la API de avisos.
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

            <!-- PANEL DE FUNCIONES -->

            <section>

                <h2 class="text-2xl font-bold mb-6">
                    Gestión educativa
                </h2>

                <div class="grid grid-cols-1 sm:grid-cols-2
                            lg:grid-cols-3 gap-5">

                    <RouterLink
                        to="/ateneu/alumnos"
                        class="tarjeta bg-white border-t-4 border-indigo-600"
                    >

                        <span class="text-3xl">👩‍🎓</span>

                        <h3 class="titulo-tarjeta">
                            Alumnos
                        </h3>

                        <p class="texto-tarjeta">
                            Acceder al espacio del alumnado y consultar
                            la información de sus clases.
                        </p>

                    </RouterLink>

                    <RouterLink
                        to="/ateneu/tutores/resultados-alumno"
                        class="tarjeta bg-white border-t-4 border-red-500"
                    >

                        <span class="text-3xl">📝</span>

                        <h3 class="titulo-tarjeta">
                            Tareas y resultados
                        </h3>

                        <p class="texto-tarjeta">
                            Revisar trabajos, añadir comentarios,
                            poner notas y devolver documentos corregidos.
                        </p>

                    </RouterLink>

                    <RouterLink
                        to="/ateneu/tutores/mensaje-profesor"
                        class="tarjeta bg-white border-t-4 border-blue-500"
                    >

                        <span class="text-3xl">💬</span>

                        <h3 class="titulo-tarjeta">
                            Mensajes
                        </h3>

                        <p class="texto-tarjeta">
                            Enviar y recibir mensajes identificando
                            al alumno y su grupo.
                        </p>

                    </RouterLink>

                    <RouterLink
                        to="/ateneu/recursos"
                        class="tarjeta bg-white border-t-4 border-green-600"
                    >

                        <span class="text-3xl">📚</span>

                        <h3 class="titulo-tarjeta">
                            Recursos educativos
                        </h3>

                        <p class="texto-tarjeta">
                            Acceder a la sección donde se publicarán
                            materiales para los estudiantes.
                        </p>

                    </RouterLink>

                    <RouterLink
                        to="/ateneu/alumnos/foro"
                        class="tarjeta bg-white border-t-4 border-purple-600"
                    >

                        <span class="text-3xl">🌍</span>

                        <h3 class="titulo-tarjeta">
                            Foro de estudiantes
                        </h3>

                        <p class="texto-tarjeta">
                            Participar en los foros de los cursos
                            y en el foro general de Ateneu.
                        </p>

                    </RouterLink>

                    <button
                        type="button"
                        @click="mostrarForoProfesores = !mostrarForoProfesores"
                        class="tarjeta text-left bg-white
                               border-t-4 border-gray-700"
                    >

                        <span class="text-3xl">🔒</span>

                        <h3 class="titulo-tarjeta">
                            Foro del profesorado
                        </h3>

                        <p class="texto-tarjeta">
                            Espacio reservado a los profesores
                            y tutores de Ateneu.
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
                        Este espacio necesita una ruta y un control
                        de acceso exclusivos para profesores.
                    </p>

                    <p class="text-sm text-amber-800 bg-amber-50 p-4 rounded-lg">
                        Por ahora es una vista informativa.
                        No se debe considerar privado hasta que el servidor
                        compruebe que el usuario es un profesor autorizado.
                    </p>

                </div>

            </section>

        </main>

        <footer class="border-t bg-white py-6 mt-12">
            <p class="text-center text-sm text-gray-500">
                ExAequo · Ateneu · Espacio del profesorado
            </p>
        </footer>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import NavbarAteneu from '../../../components/ateneu/NavbarAteneu.vue'

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
        'El formulario está preparado. Falta conectarlo con la API para guardar el aviso en la base de datos.'

    // No se simula un envío exitoso.
    // La publicación se implementará con la API PHP.
}
</script>

<style scoped>
.tarjeta {
    display: block;
    width: 100%;
    padding: 1.5rem;
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
