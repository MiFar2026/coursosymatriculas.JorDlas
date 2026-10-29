
<template>
  <section class="mx-auto my-10 w-full max-w-6xl px-4">
    <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-8">

      <!-- ACCESO -->
      <button
        v-if="!mostrarFormulario && !sesionIniciada"
        type="button"
        @click="mostrarFormulario = true"
        class="w-full rounded-lg bg-gray-800 px-5 py-3 font-semibold text-white hover:bg-gray-700"
      >
        Acceso administrador
      </button>

      <!-- LOGIN -->
      <div v-if="mostrarFormulario && !sesionIniciada">
        <h2 class="mb-2 text-center text-2xl font-bold text-gray-800">
          Administración ExAequo
        </h2>

        <p class="mb-6 text-center text-gray-600">
          Introduce tus credenciales para acceder al panel.
        </p>

        <form
          class="mx-auto max-w-md space-y-4"
          @submit.prevent="iniciarSesion"
        >
          <div>
            <label for="usuario-admin" class="mb-1 block font-medium">
              Usuario
            </label>

            <input
              id="usuario-admin"
              v-model.trim="usuario"
              type="text"
              autocomplete="username"
              required
              class="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label for="contrasena-admin" class="mb-1 block font-medium">
              Contraseña
            </label>

            <input
              id="contrasena-admin"
              v-model="contrasena"
              type="password"
              autocomplete="current-password"
              required
              class="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <p
            v-if="mensaje"
            role="status"
            aria-live="polite"
            class="rounded-lg bg-gray-100 p-3 text-sm text-gray-700"
          >
            {{ mensaje }}
          </p>

          <button
            type="submit"
            :disabled="cargando"
            class="w-full rounded-lg bg-blue-800 px-5 py-3 font-semibold text-white disabled:opacity-50"
          >
            {{ cargando ? 'Comprobando...' : 'Iniciar sesión' }}
          </button>

          <button
            type="button"
            @click="cancelarLogin"
            :disabled="cargando"
            class="w-full rounded-lg border border-gray-300 px-5 py-2"
          >
            Cancelar
          </button>
        </form>
      </div>

      <!-- PANEL -->
      <div v-if="sesionIniciada">
        <header
          class="mb-8 flex flex-col justify-between gap-4 border-b pb-6 md:flex-row md:items-center"
        >
          <div>
            <p class="mb-1 text-sm font-bold uppercase tracking-widest text-red-700">
              ExAequo
            </p>

            <h2 class="text-3xl font-bold text-gray-900">
              Panel de administración
            </h2>

            <p class="mt-2 text-gray-600">
              Gestión administrativa y protección de la comunidad educativa.
            </p>
          </div>

          <button
            type="button"
            @click="cerrarSesion"
            :disabled="procesandoId !== null"
            class="rounded-lg bg-gray-800 px-5 py-3 font-semibold text-white disabled:opacity-50"
          >
            Cerrar sesión
          </button>
        </header>

        <p
          v-if="mensaje"
          role="status"
          aria-live="polite"
          class="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-700"
        >
          {{ mensaje }}
        </p>

        
        <!-- MÓDULOS PRINCIPALES -->
        <section>
          <h3 class="mb-4 text-xl font-bold text-gray-900">
            Gestión de la escuela
          </h3>

          <p class="mb-5 text-sm text-gray-600">
            Accede a cada apartado para organizar las escuelas y las clases.
          </p>

          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
           


  <!-- ESCUELAS, CURSOS Y GRUPOS -->
  <button
    type="button"
    @click="mostrarEscuelasAdmin = !mostrarEscuelasAdmin"
    :aria-expanded="mostrarEscuelasAdmin"
    class="rounded-xl border border-indigo-200
           bg-indigo-50 p-6 text-left transition
           hover:bg-indigo-100"
  >
    <span class="mb-3 block text-3xl">🏫</span>

    <h3 class="text-xl font-bold text-gray-900">
      Escuelas, cursos y grupos
    </h3>

    <p class="mt-2 text-sm text-gray-700">
      Consulta cursos, horarios, profesores y aulas
    </p>

    <span class="mt-4 block font-semibold text-indigo-800">
      {{ mostrarEscuelasAdmin ? 'Cerrar ↑' : 'Gestionar →' }}
    </span>
  </button>



            <!-- PROFESORES, ALUMNOS Y MATRÍCULAS -->
            <button
              type="button"
              @click="seleccionarModulo('personas')"
              class="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-left transition hover:bg-emerald-100"
            >
              <span class="mb-3 block text-3xl">👥</span>
              <h3 class="text-xl font-bold text-gray-900">
               Gestión de Profesores
              </h3>
              <p class="mt-2 text-sm text-gray-700">
                Perfil del profesorado y asignación del grupo
              </p>
              <span class="mt-4 block font-semibold text-emerald-800">
                Gestionar →
              </span>
            </button>

            <!-- HORARIOS -->
            <button
              type="button"
              @click="seleccionarModulo('horarios')"
              class="rounded-xl border border-amber-200 bg-amber-50 p-6 text-left transition hover:bg-amber-100"
            >
              <span class="mb-3 block text-3xl">🗓️</span>
              <h3 class="text-xl font-bold text-gray-900">
                Gestión de horarios
              </h3>
              <p class="mt-2 text-sm text-gray-700">
                Días y horas de clase.
              </p>
              <span class="mt-4 block font-semibold text-amber-900">
                Gestionar →
              </span>
            </button>

            <!-- GESTIÓN DE ALUMNOS -->


<button
  type="button"
  @click="seleccionarModulo('datos')"
  class="rounded-xl border border-sky-200 bg-sky-50 p-6 text-left transition hover:bg-sky-100"
>
  <span class="mb-3 block text-3xl">👩‍🎓</span>

  <h3 class="text-xl font-bold text-gray-900">
    Gestión de Alumnos
  </h3>

  <p class="mt-2 text-sm text-gray-700">
    Consultar, editar y gestionar los datos y horas de asistencia, resultados y certificados del alumnado.
  </p>

  <span class="mt-4 block font-semibold text-sky-800">
    Gestionar →
  </span>
</button>

          </div>
        </section>

        <!-- MÓDULOS COMPLEMENTARIOS -->
        <section class="mt-8">
          <h3 class="mb-4 text-xl font-bold text-gray-900">
            Otras herramientas
          </h3>

          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">

            <!-- MODERACIÓN: SE CONSERVA -->
            <button
              type="button"
              @click="seleccionarModulo('foros')"
              class="rounded-xl border border-red-200 bg-red-50 p-6 text-left transition hover:bg-red-100"
            >
              <span class="mb-3 block text-3xl">🛡️</span>
              <h3 class="text-xl font-bold">Moderación y convivencia</h3>
              <p class="mt-2 text-sm text-gray-700">
                Consultar, ocultar, restaurar y retirar publicaciones.
              </p>
              <span class="mt-4 block font-semibold text-red-800">
                Gestionar →
              </span>
            </button>

            <!-- ARCHIVOS: SE CONSERVA -->
            <button
              type="button"
              @click="seleccionarModulo('archivos')"
              class="rounded-xl border border-blue-200 bg-blue-50 p-6 text-left transition hover:bg-blue-100"
            >
              <span class="mb-3 block text-3xl">📁</span>
              <h3 class="text-xl font-bold">Archivos y materiales</h3>
              <p class="mt-2 text-sm text-gray-700">
                Consultar y retirar materiales publicados.
              </p>
              <span class="mt-4 block font-semibold text-blue-800">
                Gestionar →
              </span>
            </button>

            <!-- VOLUNTARIADO: SE CONSERVA -->
            <button
              type="button"
              @click="seleccionarModulo('voluntarios')"
              class="rounded-xl border border-teal-200 bg-teal-50 p-6 text-left transition hover:bg-teal-100"
            >
              <span class="mb-3 block text-3xl">🤝</span>
              <h3 class="text-xl font-bold">Gestión de voluntariado</h3>
              <p class="mt-2 text-sm text-gray-700">
                Consultar solicitudes y gestionar su estado.
              </p>
              <span class="mt-4 block font-semibold text-teal-800">
                Gestionar →
              </span>
            </button>

          
          </div>
        </section>

<!-- RESULTADOS FINALES Y CERTIFICADOS -->
<section
  v-if="moduloSeleccionado === 'certificados'"
  class="mt-8 space-y-6 rounded-xl border border-purple-200 bg-white p-6"
>
  <div class="flex flex-wrap items-center justify-between gap-3">
    <div>
      <h3 class="text-2xl font-bold text-gray-900">
        Resultados finales y certificados
      </h3>
      <p class="mt-2 text-gray-600">
        Resultados de Biblioteca Joan Miró y Ateneu Aula 502.
      </p>
    </div>

    <button
      type="button"
      @click="cargarResultadosFinales"
      :disabled="cargandoDatos || procesandoId !== null"
      class="rounded-lg border px-4 py-2 disabled:opacity-50"
    >
      Actualizar
    </button>
  </div>

  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div class="rounded-lg bg-gray-50 p-4">
      <p class="text-sm text-gray-600">Resultados finales</p>
      <p class="mt-1 text-2xl font-bold">
        {{ resultadosFinales.length }}
      </p>
    </div>

    <div class="rounded-lg bg-green-50 p-4">
      <p class="text-sm text-green-800">Alumnos aptos</p>
      <p class="mt-1 text-2xl font-bold text-green-900">
        {{ resultadosFinales.filter(r => r.decision_apto === 'APTO').length }}
      </p>
    </div>
  </div>

  <p
    v-if="!cargandoDatos && resultadosFinales.length === 0"
    class="rounded-lg border border-dashed p-5 text-center text-gray-600"
  >
    No hay resultados finales registrados.
  </p>

  <div
    v-for="resultado in resultadosFinales"
    :key="resultado.id"
    class="rounded-xl border p-5"
  >
    <div class="flex flex-col justify-between gap-4 md:flex-row">
      <div>
        <h4 class="text-lg font-bold text-gray-900">
          {{ resultado.nombre }} {{ resultado.apellidos }}
        </h4>

        <p class="mt-1 text-sm text-gray-600">
          {{ resultado.nombre_escuela }}
        </p>

        <p class="text-sm text-gray-600">
          Curso: {{ resultado.nombre_curso || 'No indicado' }}
        </p>

        <p class="text-sm text-gray-600">
          Grupo: {{ resultado.nombre_grupo }}
        </p>

        <p class="mt-3">
          Nota final:
          <strong>
            {{ resultado.nota ?? 'No indicada' }}
          </strong>
        </p>

        <p class="mt-2">
          Aptitud:
          <span
            v-if="resultado.decision_apto === 'APTO'"
            class="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800"
          >
            APTO
          </span>

          <span
            v-else-if="resultado.decision_apto === 'NO_APTO'"
            class="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800"
          >
            NO APTO
          </span>

          <span
            v-else
            class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
          >
            Sin decisión
          </span>
        </p>

        <p class="mt-2 text-sm text-gray-500">
          Fecha: {{ formatearFecha(resultado.fecha_resultado) }}
        </p>
      </div>

      <div class="w-full md:max-w-xs">
        <label
          :for="`certificado-${resultado.id}`"
          class="mb-2 block font-semibold"
        >
          Estado del certificado
        </label>

        <select
          :id="`certificado-${resultado.id}`"
          :value="resultado.estado_certificado"
          @change="actualizarEstadoCertificado(resultado, $event.target.value)"
          :disabled="
            procesandoId !== null ||
            cargandoDatos ||
            resultado.decision_apto !== 'APTO'
          "
          class="w-full rounded-lg border px-3 py-2 disabled:bg-gray-100"
        >
          <option value="PENDIENTE">Pendiente</option>
          <option value="EMITIDO">Emitido</option>
          <option value="ENTREGADO">Entregado</option>
        </select>

        <p
          v-if="resultado.decision_apto !== 'APTO'"
          class="mt-2 text-sm text-amber-800"
        >
          No se puede gestionar un certificado si el resultado no es APTO.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- HORAS DE ASISTENCIA -->
<section
  v-if="moduloSeleccionado === 'asistencia'"
  class="mt-8 space-y-6 rounded-xl border border-orange-200 bg-white p-6"
>
  <div class="flex flex-wrap items-center justify-between gap-3">
    <div>
      <h3 class="text-2xl font-bold text-gray-900">
        Horas de asistencia del alumnado
      </h3>
      <p class="mt-2 text-gray-600">
        Resumen acumulado de Biblioteca Joan Miró y Ateneu Aula 502.
      </p>
    </div>

    <button
      type="button"
      @click="cargarHorasAsistencia"
      :disabled="cargandoDatos || procesandoId !== null"
      class="rounded-lg border px-4 py-2 disabled:opacity-50"
    >
      Actualizar
    </button>
  </div>

  <p
    v-if="mensajeHorasAsistencia"
    role="status"
    class="rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-700"
  >
    {{ mensajeHorasAsistencia }}
  </p>

  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
    <div class="rounded-lg bg-orange-50 p-4">
      <p class="text-sm text-orange-800">Alumnos registrados</p>
      <p class="mt-1 text-2xl font-bold text-orange-900">
        {{ horasAsistencia.length }}
      </p>
    </div>

    <div class="rounded-lg bg-blue-50 p-4">
      <p class="text-sm text-blue-800">Horas acumuladas</p>
      <p class="mt-1 text-2xl font-bold text-blue-900">
        {{
          horasAsistencia
            .reduce((total, alumno) => total + Number(alumno.total_horas || 0), 0)
            .toFixed(2)
        }}
      </p>
    </div>

    <div class="rounded-lg bg-gray-50 p-4">
      <p class="text-sm text-gray-600">Registros consultados</p>
      <p class="mt-1 text-2xl font-bold text-gray-900">
        {{ horasAsistencia.length }}
      </p>
    </div>
  </div>

  <div class="overflow-x-auto rounded-xl border">
    <table class="w-full min-w-[700px] text-left text-sm">
      <thead class="bg-gray-50 text-gray-700">
        <tr>
          <th class="px-4 py-3">Escuela</th>
          <th class="px-4 py-3">Alumno/a</th>
          <th class="px-4 py-3">Grupo</th>
          <th class="px-4 py-3 text-right">Minutos</th>
          <th class="px-4 py-3 text-right">Horas</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="alumno in horasAsistencia"
          :key="`${alumno.alumno_id}-${alumno.grupo_id}`"
          class="border-t"
        >
          <td class="px-4 py-3">{{ alumno.nombre_escuela }}</td>
          <td class="px-4 py-3">
            {{ alumno.nombre }} {{ alumno.apellidos }}
          </td>
          <td class="px-4 py-3">{{ alumno.nombre_grupo }}</td>
          <td class="px-4 py-3 text-right">
            {{ Number(alumno.total_minutos || 0) }}
          </td>
          <td class="px-4 py-3 text-right font-semibold">
            {{ Number(alumno.total_horas || 0).toFixed(2) }}
          </td>
        </tr>

        <tr v-if="!cargandoDatos && horasAsistencia.length === 0">
          <td colspan="5" class="px-4 py-6 text-center text-gray-500">
            No hay alumnos ni horas de asistencia para mostrar.
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <p class="text-sm text-gray-500">
    Las horas se calculan a partir de los registros de asistencia guardados
    en la base de datos. Las sesiones canceladas no deben contabilizarse.
  </p>
</section>

        <!-- HORARIOS -->
        <section
          v-if="moduloSeleccionado === 'horarios'"
          class="mt-8"
        >
          <GestionHorariosAdmin />
        </section>

        
<!--Gestión de Escuelas, Cursos-->

  <!-- CONTENIDO DESPLEGABLE -->
  <div
    v-if="mostrarEscuelasAdmin"
    class="mt-4 rounded-xl border border-gray-200
           bg-white p-5 shadow-sm"
  >
    <!-- CABECERA Y ACTUALIZACIÓN -->
    <div
      class="mb-6 flex flex-wrap items-center
             justify-between gap-3"
    >
      <div>
        <h3 class="text-xl font-bold text-gray-900">
          Listado de escuelas
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Selecciona una escuela para consultar sus grupos.
        </p>
      </div>

      <button
        type="button"
        @click="cargarEscuelasCursosAdmin"
        :disabled="cargandoEscuelasAdmin"
        class="inline-flex items-center gap-2 rounded-lg
               bg-indigo-600 px-4 py-2.5 font-semibold
               text-white transition hover:bg-indigo-700
               disabled:cursor-not-allowed
               disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          :class="{ 'animate-spin': cargandoEscuelasAdmin }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 4v5h5M20 20v-5h-5M5.6 9A7 7 0 0 1 18 6l2 3M4 15l2 3a7 7 0 0 0 12.4-3"
          />
        </svg>

        {{ cargandoEscuelasAdmin
          ? 'Actualizando...'
          : 'Actualizar datos' }}
      </button>
    </div>
    <!-- ALTA DE CURSO, GRUPO Y HORARIO -->
<section class="mb-6 rounded-xl border border-indigo-200 bg-indigo-50 p-5">
  <div class="flex flex-wrap items-center justify-between gap-3">
    <div>
      <h4 class="text-lg font-bold text-indigo-950">
        Añadir curso, grupo y horario
      </h4>
      <p class="mt-1 text-sm text-indigo-800">
        Los datos se guardarán en la base de datos.
      </p>
    </div>

    <button
      type="button"
      @click="abrirFormularioGrupoAdmin"
      class="rounded-lg bg-indigo-700 px-4 py-2 font-semibold text-white hover:bg-indigo-800"
    >
      {{ mostrarFormularioGrupoAdmin ? 'Cerrar formulario' : '+ Añadir grupo' }}
    </button>
  </div>

  <form
    v-if="mostrarFormularioGrupoAdmin"
    class="mt-5 space-y-5"
    @submit.prevent="guardarGrupoAdmin"
  >
    <div
      v-if="mensajeGrupoAdmin"
      role="status"
      aria-live="polite"
      class="rounded-lg border border-indigo-200 bg-white p-3 text-sm text-gray-800"
    >
      {{ mensajeGrupoAdmin }}
    </div>

    <!-- ESCUELA -->
    <div>
      <label class="mb-1 block font-semibold" for="nueva-escuela-admin">
        Escuela *
      </label>

      <select
        id="nueva-escuela-admin"
        v-model="formGrupoAdmin.escuela_id"
        required
        class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
      >
        <option value="1">Biblioteca Joan Miró</option>
        <option value="2">Ateneu Aula 502</option>
      </select>
    </div>

    <!-- ELEGIR CURSO EXISTENTE O CREAR UNO -->
    <div class="rounded-lg border border-gray-200 bg-white p-4">
      <label class="flex items-start gap-3">
        <input
          v-model="crearCursoNuevoAdmin"
          type="checkbox"
          class="mt-1"
        />
        <span>
          <span class="block font-semibold">Crear un curso nuevo</span>
          <span class="text-sm text-gray-600">
            Si no marcas esta opción, podrás seleccionar un curso existente.
          </span>
        </span>
      </label>

      <div v-if="!crearCursoNuevoAdmin" class="mt-4">
        <label class="mb-1 block font-semibold" for="curso-existente-admin">
          Curso existente *
        </label>

        <select
          id="curso-existente-admin"
          v-model="formGrupoAdmin.curso_id"
          required
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        >
          <option value="">Selecciona un curso</option>

          <option
            v-for="curso in cursosFormularioAdmin"
            :key="curso.id"
            :value="String(curso.id)"
          >
            {{ curso.nombre }} — {{ curso.idioma }} {{ curso.nivel }}
          </option>
        </select>

        <p
          v-if="cursosFormularioAdmin.length === 0"
          class="mt-2 text-sm text-amber-800"
        >
          No hay cursos disponibles. Marca «Crear un curso nuevo».
        </p>
      </div>

      <div v-else class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label>
          <span class="mb-1 block font-semibold">Nombre del curso *</span>
          <input
            v-model.trim="formGrupoAdmin.curso_nombre"
            required
            maxlength="100"
            placeholder="Ej.: Castellano A1"
            class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
          />
        </label>

        <label>
          <span class="mb-1 block font-semibold">Idioma *</span>
          <select
            v-model="formGrupoAdmin.idioma"
            required
            class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
          >
            <option value="Castellano">Castellano</option>
            <option value="Catalán">Catalán</option>
            <option value="Alfabetización">Alfabetización</option>
          </select>
        </label>

        <label>
          <span class="mb-1 block font-semibold">Nivel *</span>
          <input
            v-model.trim="formGrupoAdmin.nivel"
            required
            maxlength="20"
            placeholder="Ej.: A1, A2, B1"
            class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
          />
        </label>
      </div>
    </div>

    <!-- DATOS DEL GRUPO -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <label>
        <span class="mb-1 block font-semibold">Nombre del grupo *</span>
        <input
          v-model.trim="formGrupoAdmin.nombre"
          required
          maxlength="100"
          placeholder="Ej.: Castellano A1 - Mañana"
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        />
      </label>

      <label>
        <span class="mb-1 block font-semibold">Turno *</span>
        <select
          v-model="formGrupoAdmin.turno"
          required
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        >
          <option value="Mañana">Mañana</option>
          <option value="Tarde">Tarde</option>
        </select>
      </label>

      <label>
        <span class="mb-1 block font-semibold">Aula</span>
        <input
          v-model.trim="formGrupoAdmin.aula"
          maxlength="50"
          placeholder="Ej.: Aula 502"
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        />
      </label>

      <label>
        <span class="mb-1 block font-semibold">Profesor/a</span>
        <select
          v-model="formGrupoAdmin.profesor_id"
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        >
          <option value="">Sin profesor asignado</option>

          <option
            v-for="profesor in profesoresAdmin.filter(
              p => Number(p.activo) === 1
            )"
            :key="profesor.id"
            :value="String(profesor.id)"
          >
            {{ profesor.nombre }} {{ profesor.apellidos }}
          </option>
        </select>
      </label>
    </div>

    <!-- DÍAS Y HORAS -->
    <div class="rounded-lg border border-gray-200 bg-white p-4">
      <h5 class="font-bold text-gray-900">Horario de las clases</h5>

      <p class="mt-1 text-sm text-gray-600">
        Selecciona los días y establece la hora de inicio y de finalización.
        Se aplicarán las mismas horas a todos los días seleccionados.
      </p>

      <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label
          v-for="dia in diasSemanaGrupoAdmin"
          :key="dia"
          class="flex items-center gap-2 rounded-lg border border-gray-200 p-3"
        >
          <input
            v-model="diasSeleccionadosGrupoAdmin"
            type="checkbox"
            :value="dia"
          />
          <span>{{ dia }}</span>
        </label>
      </div>

      <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label>
          <span class="mb-1 block font-semibold">Hora de inicio *</span>
          <input
            v-model="formGrupoAdmin.hora_inicio"
            type="time"
            required
            class="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>

        <label>
          <span class="mb-1 block font-semibold">Hora de finalización *</span>
          <input
            v-model="formGrupoAdmin.hora_fin"
            type="time"
            required
            class="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
      </div>
    </div>

    <!-- BOTONES -->
    <div class="flex flex-wrap gap-3">
      <button
        type="submit"
        :disabled="guardandoGrupoAdmin"
        class="rounded-lg bg-indigo-700 px-5 py-3 font-semibold text-white hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {{
          guardandoGrupoAdmin
            ? 'Guardando...'
            : 'Guardar curso, grupo y horario'
        }}
      </button>

      <!-- RESULTADO DE GUARDAR EL CURSO, GRUPO Y HORARIO -->
<div
  v-if="mensajeGrupoAdmin"
  class="mt-4 rounded-lg border p-3 text-sm"
  :class="mensajeGrupoAdmin.includes('correctamente')
    ? 'border-green-300 bg-green-50 text-green-800'
    : 'border-red-300 bg-red-50 text-red-800'"
  role="status"
>
  {{ mensajeGrupoAdmin }}
</div>

      <button
        type="button"
        :disabled="guardandoGrupoAdmin"
        @click="restablecerFormularioGrupoAdmin"
        class="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 disabled:opacity-50"
      >
        Limpiar formulario
      </button>
    </div>
  </form>
</section>

    <!-- ERROR -->
    <div
      v-if="errorEscuelasAdmin"
      role="alert"
      class="mb-5 rounded-lg border border-red-200
             bg-red-50 p-4 text-red-800"
    >
      {{ errorEscuelasAdmin }}
    </div>

    <!-- CARGANDO -->
    <div
      v-if="cargandoEscuelasAdmin"
      class="py-8 text-center text-gray-500"
    >
      Consultando los datos...
    </div>

    <!-- LISTADO -->
    <div
      v-else-if="escuelasAdmin.length"
      class="space-y-4"
    >
      <article
        v-for="escuela in escuelasAdmin"
        :key="escuela.id"
        class="overflow-hidden rounded-xl
               border border-gray-200"
      >
        <!-- BOTÓN DE CADA ESCUELA -->
        <button
          type="button"
          @click="alternarEscuelaAdmin(escuela.id)"
          :aria-expanded="Boolean(escuelasAbiertasAdmin[escuela.id])"
          class="flex w-full items-center justify-between
                 gap-3 bg-gray-50 p-4 text-left
                 transition hover:bg-indigo-50"
        >
          <span class="flex min-w-0 items-center gap-3">
            <span
              class="flex h-10 w-10 shrink-0
                     items-center justify-center
                     rounded-lg bg-indigo-100
                     font-bold text-indigo-700"
            >
              {{ escuela.nombre?.charAt(0)?.toUpperCase() || 'E' }}
            </span>

            <span class="min-w-0">
              <span
                class="block truncate font-bold text-gray-900"
              >
                {{ escuela.nombre }}
              </span>

              <span class="mt-1 block text-xs text-gray-500">
                Escuela ID: {{ escuela.id }}
              </span>
            </span>
          </span>

          <span
            class="flex h-8 w-8 shrink-0 items-center
                   justify-center rounded-full
                   bg-white text-xl text-indigo-700
                   shadow-sm"
          >
            {{
              escuelasAbiertasAdmin[escuela.id]
                ? '−'
                : '+'
            }}
          </span>
        </button>

        <!-- DATOS DE LA ESCUELA -->
        <div
          v-if="escuelasAbiertasAdmin[escuela.id]"
          class="border-t border-gray-200 p-4"
        >
          <div class="overflow-x-auto">
            <table
              class="w-full min-w-[900px]
                     border-collapse text-left text-sm"
            >
              <thead>
                <tr class="bg-gray-100 text-gray-700">
                  <th class="border p-3">Horario y días</th>
                  <th class="border p-3">Curso</th>
                  <th class="border p-3">Grupo y turno</th>
                  <th class="border p-3">Profesor/a</th>
                  <th class="border p-3">Aula</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="grupo in gruposEscuelasAdmin.filter(
                    item => Number(item.escuela_id) === Number(escuela.id)
                  )"
                  :key="grupo.grupo_id"
                  class="align-top transition hover:bg-gray-50"
                >
                  <td class="border p-3">
                    {{ obtenerHorarioGrupoAdmin(grupo.grupo_id) }}
                  </td>

                  <td class="border p-3">
                    <span class="font-medium text-gray-900">
                      {{ grupo.curso || 'Sin curso' }}
                    </span>

                    <span
                      v-if="grupo.idioma || grupo.nivel"
                      class="mt-1 block text-gray-500"
                    >
                      {{
                        [grupo.idioma, grupo.nivel]
                          .filter(Boolean)
                          .join(' · ')
                      }}
                    </span>
                  </td>

                  <td class="border p-3">
                    {{ grupo.grupo || 'Sin nombre' }}

                    <span class="mt-1 block text-gray-500">
                      {{ grupo.turno || 'Turno sin indicar' }}
                    </span>
                  </td>

                  <td class="border p-3">
                    <template v-if="grupo.profesor_id">
                      {{
                        [
                          grupo.profesor_nombre,
                          grupo.profesor_apellidos
                        ].filter(Boolean).join(' ')
                      }}
                    </template>

                    <span v-else class="text-gray-500">
                      Sin profesor asignado
                    </span>
                  </td>

                  <td class="border p-3">
                    {{ grupo.aula || 'Aula sin indicar' }}
                  </td>
                </tr>

                <tr
                  v-if="!gruposEscuelasAdmin.some(
                    item => Number(item.escuela_id) === Number(escuela.id)
                  )"
                >
                  <td
                    colspan="5"
                    class="border p-6 text-center text-gray-500"
                  >
                    Todavía no hay grupos registrados para esta escuela.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="mt-3 text-xs text-gray-500">
            Los datos proceden de los grupos y horarios existentes.
          </p>
        </div>
      </article>
    </div>

    <!-- SIN ESCUELAS -->
    <div
      v-else
      class="rounded-lg border border-dashed
             border-gray-300 p-8 text-center"
    >
      <p class="font-medium text-gray-700">
        No hay escuelas para mostrar.
      </p>
      <p class="mt-1 text-sm text-gray-500">
        Pulsa «Actualizar datos» para volver a consultar.
      </p>
    </div>
  </div>


<!-- GESTIÓN DE PROFESORES Y ASIGNACIONES -->

<section
  v-if="moduloSeleccionado === 'personas'"
  class="mt-8 space-y-6"
>
  <div class="flex flex-wrap items-center justify-between gap-3">
    <div>
      <h3 class="text-2xl font-bold text-gray-900">
        Gestión de profesores
      </h3>
      <p class="mt-2 text-gray-600">
        Una misma persona puede impartir varios cursos en ambas escuelas.
      </p>
    </div>

  </div>

  <!-- EXPLICACIÓN -->
  <div class="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
    <p class="font-semibold text-emerald-900">
      Biblioteca Joan Miró y Ateneu Aula 502
    </p>
    <p class="mt-1 text-sm text-emerald-800">
      Cada profesor tiene una sola ficha. Sus asignaciones se gestionan
      por grupo, curso, escuela y turno.
    </p>
  </div>

  <!-- LISTA DE PROFESORES -->
       <button
  type="button"
  @click="abrirAltaProfesor"
  class="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
>
  + Añadir profesor
</button>
    <button
      type="button"
      @click="cargarGestionProfesores"
      :disabled="cargandoDatos || procesandoId !== null"
      class="rounded-lg border px-4 py-2 disabled:opacity-50"
    >
      Actualizar
    </button>

<div
  v-if="creandoProfesor"
  class="mt-5 rounded-xl border border-indigo-200 bg-indigo-50 p-5"
>
  <h3 class="mb-4 text-xl font-bold text-gray-800">
    Nuevo profesor
  </h3>

  <form
    class="grid grid-cols-1 gap-4 md:grid-cols-2"
    @submit.prevent="crearProfesorAdmin"
  >
    <div>
      <label class="mb-1 block font-medium">Tipo de documento *</label>
      <select
        v-model="formNuevoProfesor.tipo_documento"
        required
        class="w-full rounded-lg border p-2"
      >
        <option value="">Selecciona</option>
        <option value="DNI">DNI</option>
        <option value="NIE">NIE</option>
        <option value="PASAPORTE">Pasaporte</option>
      </select>
    </div>

    <div>
      <label class="mb-1 block font-medium">Número de documento *</label>
      <input
        v-model.trim="formNuevoProfesor.documento"
        required
        maxlength="30"
        class="w-full rounded-lg border p-2"
      />
    </div>

    <div>
      <label class="mb-1 block font-medium">Nombre *</label>
      <input
        v-model.trim="formNuevoProfesor.nombre"
        required
        maxlength="100"
        class="w-full rounded-lg border p-2"
      />
    </div>

    <div>
      <label class="mb-1 block font-medium">Apellidos *</label>
      <input
        v-model.trim="formNuevoProfesor.apellidos"
        required
        maxlength="150"
        class="w-full rounded-lg border p-2"
      />
    </div>

    <div>
      <label class="mb-1 block font-medium">Año de nacimiento</label>
      <input
        v-model="formNuevoProfesor.anio_nacimiento"
        type="number"
        min="1900"
        :max="new Date().getFullYear()"
        class="w-full rounded-lg border p-2"
      />
    </div>

    <div>
      <label class="mb-1 block font-medium">Teléfono</label>
      <input
        v-model.trim="formNuevoProfesor.telefono"
        type="tel"
        class="w-full rounded-lg border p-2"
      />
    </div>

    <div>
      <label class="mb-1 block font-medium">Correo electrónico</label>
      <input
        v-model.trim="formNuevoProfesor.email"
        type="email"
        class="w-full rounded-lg border p-2"
      />
    </div>

    <div>
      <label class="mb-1 block font-medium">Especialidad</label>
      <input
        v-model.trim="formNuevoProfesor.especialidad"
        maxlength="150"
        class="w-full rounded-lg border p-2"
      />
    </div>

    <div class="flex flex-wrap gap-3 md:col-span-2">
      <button
        type="submit"
        :disabled="procesandoId !== null"
        class="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {{ procesandoId === 'nuevo-profesor' ? 'Guardando...' : 'Crear profesor' }}
      </button>

      <button
        type="button"
        @click="cancelarAltaProfesor"
        class="rounded-lg border border-gray-300 bg-white px-4 py-2"
      >
        Cancelar
      </button>
    </div>
  </form>
</div>

  <details class="rounded-xl border p-5">
    <summary class="mb-4 text-xl font-bold">Profesores registrados</summary>

    <p
      v-if="!cargandoDatos && profesoresAdmin.length === 0"
      class="rounded-lg bg-gray-50 p-4 text-gray-600"
    >
      No hay profesores registrados.
    </p>

    <article
      v-for="profesor in profesoresAdmin"
      :key="profesor.id"
      class="mb-4 rounded-xl border p-4 last:mb-0"
    >
      <div class="flex flex-col justify-between gap-3 sm:flex-row">
        <div>
          <h5 class="text-lg font-bold">
            {{ profesor.nombre }} {{ profesor.apellidos }}
          </h5>
          <p class="mt-1 text-sm text-gray-600">
            {{ profesor.especialidad || 'Especialidad no indicada' }}
          </p>
          <p class="text-sm text-gray-600">
            Correo: {{ profesor.email || 'No indicado' }}
          </p>
          <p class="text-sm text-gray-600">
            Teléfono: {{ profesor.telefono || 'No indicado' }}
          </p>
          <p class="mt-2 text-sm">
            Estado:
            <span
              :class="Number(profesor.activo) === 1
                ? 'font-semibold text-green-700'
                : 'font-semibold text-red-700'"
            >
              {{ Number(profesor.activo) === 1 ? 'Activo' : 'Inactivo' }}
            </span>
          </p>
        </div>

        <div class="flex flex-wrap content-start gap-2">
          <button
            type="button"
            @click="editarProfesorAdmin(profesor)"
            :disabled="procesandoId !== null || cargandoDatos"
            class="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            Editar datos
          </button>

          <button
            type="button"
            @click="cargarHistorialProfesor(profesor)"
            :disabled="procesandoId !== null || cargandoDatos"
            class="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            Historial
          </button>

          <button
            type="button"
            @click="cambiarEstadoProfesor(profesor)"
            :disabled="procesandoId !== null || cargandoDatos"
            class="rounded-lg px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
            :class="Number(profesor.activo) === 1
              ? 'bg-red-700 hover:bg-red-800'
              : 'bg-green-700 hover:bg-green-800'"
          >
            {{ Number(profesor.activo) === 1 ? 'Desactivar' : 'Activar' }}
          </button>
        </div>
      </div>
    </article>
  </details>

  <!-- EDITAR PROFESOR -->
  <div
    v-if="profesorEditando"
    class="rounded-xl border border-blue-200 bg-white p-5"
  >
    <h4 class="mb-4 text-xl font-bold">
      Editar ficha del profesor
    </h4>

    <form class="grid grid-cols-1 gap-4 sm:grid-cols-2" @submit.prevent="guardarProfesorAdmin">
      <div>
        <label class="mb-1 block text-sm font-medium" for="prof-tipo-documento">
          Tipo de documento
        </label>
        <select
          id="prof-tipo-documento"
          v-model="formProfesor.tipo_documento"
          required
          class="w-full rounded-lg border px-3 py-2"
        >
          <option value="DNI">DNI</option>
          <option value="NIE">NIE</option>
          <option value="PASAPORTE">Pasaporte</option>
        </select>
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium" for="prof-documento">
          Documento
        </label>
        <input
          id="prof-documento"
          v-model.trim="formProfesor.documento"
          required
          maxlength="30"
          class="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium" for="prof-nombre">
          Nombre
        </label>
        <input
          id="prof-nombre"
          v-model.trim="formProfesor.nombre"
          required
          maxlength="100"
          class="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium" for="prof-apellidos">
          Apellidos
        </label>
        <input
          id="prof-apellidos"
          v-model.trim="formProfesor.apellidos"
          required
          maxlength="100"
          class="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium" for="prof-nacimiento">
          Año de nacimiento
        </label>
        <input
          id="prof-nacimiento"
          v-model="formProfesor.anio_nacimiento"
          type="number"
          min="1900"
          :max="new Date().getFullYear()"
          class="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium" for="prof-telefono">
          Teléfono
        </label>
        <input
          id="prof-telefono"
          v-model.trim="formProfesor.telefono"
          maxlength="30"
          class="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium" for="prof-email">
          Correo electrónico
        </label>
        <input
          id="prof-email"
          v-model.trim="formProfesor.email"
          type="email"
          maxlength="150"
          class="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium" for="prof-especialidad">
          Especialidad
        </label>
        <input
          id="prof-especialidad"
          v-model.trim="formProfesor.especialidad"
          maxlength="100"
          class="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div class="sm:col-span-2">
        <label class="mb-1 block text-sm font-medium" for="prof-foto">
          Foto (ruta o referencia existente)
        </label>
        <input
          id="prof-foto"
          v-model.trim="formProfesor.foto"
          maxlength="255"
          class="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div class="flex flex-wrap gap-3 sm:col-span-2">
        <button
          type="submit"
          :disabled="procesandoId !== null"
          class="rounded-lg bg-blue-800 px-5 py-3 font-semibold text-white disabled:opacity-50"
        >
          Guardar cambios
        </button>

        <button
          type="button"
          @click="profesorEditando = null"
          :disabled="procesandoId !== null"
          class="rounded-lg border px-5 py-3 disabled:opacity-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>

<!-- ASIGNACIÓN DE GRUPOS -->
<details class="rounded-xl border p-5">
  <summary
    class="cursor-pointer list-none flex items-center justify-between gap-4 text-xl font-bold"
  >
    <span>Asignación de profesores a grupos</span>
    <span class="text-gray-500 transition-transform">
      ▼
    </span>
  </summary>

  <div class="mt-4">
    <p class="mb-4 text-sm text-gray-600">
      Elige un profesor para cada grupo. Puedes repetir el mismo profesor
      en diferentes cursos, turnos y escuelas.
    </p>

    <!-- FILTRAR POR ESCUELA -->
    <div class="mb-4">
      <label
        for="filtro-escuela-grupos"
        class="mb-1 block font-medium"
      >
        Filtrar por escuela
      </label>

      <select
        id="filtro-escuela-grupos"
        v-model="filtroEscuelaGrupos"
        @change="cargarGruposAdmin"
        :disabled="cargandoDatos || procesandoId !== null"
        class="w-full rounded-lg border px-3 py-2 sm:max-w-md"
      >
        <option value="">Todas las escuelas</option>
        <option value="1">Biblioteca Joan Miró</option>
        <option value="2">Ateneu Aula 502</option>
      </select>
    </div>

    <!-- MENSAJE SI NO HAY GRUPOS -->
    <p
      v-if="!cargandoDatos && gruposAdmin.length === 0"
      class="rounded-lg bg-gray-50 p-4 text-gray-600"
    >
      No hay grupos para mostrar con este filtro.
    </p>

    <!-- LISTA DE GRUPOS -->
    <article
      v-for="grupo in gruposAdmin"
      :key="grupo.grupo_id"
      class="mb-4 rounded-xl border p-4 last:mb-0"
    >
      <div class="mb-3">
        <h5 class="font-bold">
          {{ grupo.grupo }}
        </h5>

        <p class="mt-1 text-sm text-gray-600">
          {{ grupo.escuela }} · {{ grupo.curso }}
          <span v-if="grupo.idioma">
            · {{ grupo.idioma }}
          </span>
          <span v-if="grupo.nivel">
            · Nivel {{ grupo.nivel }}
          </span>
        </p>

        <p class="text-sm text-gray-600">
          Turno: {{ grupo.turno || 'No indicado' }}
          · Aula: {{ grupo.aula || 'No indicada' }}
        </p>
      </div>

      <!-- ASIGNAR PROFESOR -->
      <label
        :for="`profesor-grupo-${grupo.grupo_id}`"
        class="mb-1 block text-sm font-medium"
      >
        Profesor asignado
      </label>

      <select
        :id="`profesor-grupo-${grupo.grupo_id}`"
        v-model="profesorPorGrupo[grupo.grupo_id]"
        @change="asignarProfesorAGrupo(grupo)"
        :disabled="
          procesandoId !== null ||
          cargandoDatos ||
          Number(grupo.grupo_activo) !== 1
        "
        class="w-full rounded-lg border px-3 py-2"
      >
        <option value="">Sin profesor asignado</option>

        <option
          v-for="profesor in profesoresAdmin.filter(
            p => Number(p.activo) === 1
          )"
          :key="profesor.id"
          :value="String(profesor.id)"
        >
          {{ profesor.nombre }} {{ profesor.apellidos }}
        </option>
      </select>

      <p
        v-if="Number(grupo.grupo_activo) !== 1"
        class="mt-2 text-sm text-amber-800"
      >
        Este grupo está inactivo y no admite nuevas asignaciones.
      </p>
    </article>
  </div>
</details>

  <!-- HISTORIAL -->
  <div
    v-if="historialProfesorSeleccionado"
    class="rounded-xl border border-amber-200 p-5"
  >
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h4 class="text-xl font-bold">
        Historial: {{ historialProfesorSeleccionado.nombre }}
        {{ historialProfesorSeleccionado.apellidos }}
      </h4>
      <button
        type="button"
        @click="historialProfesorSeleccionado = null"
        class="rounded-lg border px-3 py-2"
      >
        Cerrar historial
      </button>
    </div>

    <h5 class="mb-2 mt-5 font-semibold">Cambios de la ficha</h5>
    <p
      v-if="historialProfesorSeleccionado.cambiosPerfil.length === 0"
      class="text-sm text-gray-600"
    >
      No hay cambios de perfil registrados.
    </p>

    <div
      v-for="cambio in historialProfesorSeleccionado.cambiosPerfil"
      :key="`campo-${cambio.id}`"
      class="mb-3 rounded-lg bg-gray-50 p-3"
    >
      <p class="font-medium">{{ cambio.campo_modificado }}</p>
      <p class="mt-1 break-words text-sm text-gray-600">
        Antes: {{ cambio.valor_anterior ?? 'Vacío' }}
      </p>
      <p class="break-words text-sm text-gray-600">
        Después: {{ cambio.valor_nuevo ?? 'Vacío' }}
      </p>
      <p class="mt-1 text-xs text-gray-500">
        {{ formatearFecha(cambio.fecha_modificacion) }}
      </p>
    </div>

    <h5 class="mb-2 mt-5 font-semibold">Registro de operaciones</h5>
    <p
      v-if="historialProfesorSeleccionado.historial.length === 0"
      class="text-sm text-gray-600"
    >
      No hay operaciones registradas en el historial general.
    </p>

    <div
      v-for="cambio in historialProfesorSeleccionado.historial"
      :key="`historial-${cambio.historial_id}`"
      class="mb-3 rounded-lg border p-3"
    >
      <p class="font-semibold">{{ cambio.accion }}</p>
      <p class="mt-1 text-sm text-gray-600">
        {{ formatearFecha(cambio.fecha_cambio) }}
      </p>
      <details class="mt-2">
        <summary class="cursor-pointer text-sm font-medium">
          Ver datos registrados
        </summary>
        <pre class="mt-2 overflow-x-auto whitespace-pre-wrap break-words text-xs">{{ JSON.stringify({
          anteriores: cambio.datos_anteriores,
          nuevos: cambio.datos_nuevos
        }, null, 2) }}</pre>
      </details>
    </div>
  </div>

  <p class="text-sm text-gray-500">
    La gestión de alumnos y matrículas se conectará por separado.
    El borrado definitivo de profesores no está habilitado.
  </p>
</section>

       <!-- GESTIÓN DE ALUMNOS -->
<section
  v-if="moduloSeleccionado === 'datos'"
  class="mt-8 rounded-xl border border-sky-200 bg-white p-6"
>
  <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
    <div>
      <h3 class="text-2xl font-bold text-gray-900">
        Gestión de Alumnos
      </h3>

      <p class="mt-2 text-sm text-gray-600">
        Consulta, edita y administra los datos del alumnado.
      </p>
    </div>
  </div>
 <div class="mt-4 flex flex-wrap gap-3">  

  <button
    type="button"
    @click="abrirAltaAlumno"
    class="rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700"
  >
    + Añadir alumno
  </button>

    <button
      type="button"
      @click="cargarAlumnosAdmin"
      :disabled="cargandoDatos"
      class="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800 disabled:opacity-50"
    >
      Actualizar lista
    </button>
 <button
      type="button"
      @click="exportarAlumnosCSV"
      class="rounded-xl bg-sky-800 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
    >
      Exportar a Excel
    </button>
    
    <button
      type="button"
      @click="alumnoEditando = null"
      class="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
    >
      Cerrar edición
    </button>
   
  </div>
  <hr class="my-4 border-0 h-px bg-gray-300" />

  <!-- FILTROS -->
  <div class="mt-6 grid gap-4 sm:grid-cols-2">
    <label class="block">
      <span class="mb-2 block text-sm font-semibold text-gray-700">
        Escuela
      </span>

      <select
        v-model="filtroEscuelaAlumnos"
        @change="cargarAlumnosAdmin"
        class="w-full rounded-xl border border-gray-300 px-4 py-3"
      >
        <option value="">Todas las escuelas</option>
        <option value="1">Biblioteca Joan Miró</option>
        <option value="2">Ateneu Aula 502</option>
      </select>

    </label>

    <label class="block">
      <span class="mb-2 block text-sm font-semibold text-gray-700">
        Buscar alumno
      </span>

      <input
        v-model="busquedaAlumnos"
        type="search"
        placeholder="Nombre, documento o correo"
        class="w-full rounded-xl border border-gray-300 px-4 py-3"
      />
    </label>   
  </div>

 

  <!-- MENSAJE -->
  <p
    v-if="mensaje"
    class="mt-4 rounded-xl bg-sky-50 p-4 text-sm text-sky-900"
    role="status"
  >
    {{ mensaje }}
  </p>

  <!-- TABLA -->
  <div class="mt-6 overflow-x-auto rounded-xl border border-gray-200">
    <table class="w-full min-w-[1250px] border-collapse text-left text-sm">
      <thead class="bg-slate-100 text-slate-700">
        <tr>
          <th class="p-3">Nombre</th>
          <th class="p-3">Apellidos</th>
          <th class="p-3">Documento de identidad</th>
          <th class="p-3">Clase asignada</th>
          <th class="p-3">Correo electrónico</th>
          <th class="p-3">Teléfono</th>
          <th class="p-3">Horario asignado</th>
          <th class="p-3">Profesor</th>
          <th class="p-3">Escuela</th>
          <th class="p-3">Estado</th>
          <th class="p-3">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="alumnoFila in alumnosAdminFiltrados"
          :key="alumnoFila.id"
          class="border-t border-gray-200"
        >
          <td class="p-3">{{ alumnoFila.nombre }}</td>
          <td class="p-3">{{ alumnoFila.apellidos }}</td>

          <td class="p-3">
            {{ alumnoFila.tipo_documento || '' }}
            {{ alumnoFila.documento || '—' }}
          </td>

          <td class="p-3">
            {{ alumnoFila.clase_asignada || alumnoFila.curso || alumnoFila.grupo || 'Sin asignar' }}
          </td>

          <td class="p-3">{{ alumnoFila.email || '—' }}</td>
          <td class="p-3">{{ alumnoFila.telefono || '—' }}</td>

          <td class="p-3">
            {{ alumnoFila.horario_asignado || alumnoFila.turno || '—' }}
          </td>

          <td class="p-3">
            {{ [alumnoFila.profesor_nombre, alumnoFila.profesor_apellidos].filter(Boolean).join(' ') || 'Sin asignar' }}
          </td>

          <td class="p-3">
            {{ alumnoFila.escuela || 'Sin asignar' }}
          </td>

          <td class="p-3">
            <span
              :class="Number(alumnoFila.activo) === 1
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-gray-100 text-gray-700'"
              class="rounded-full px-3 py-1 text-xs font-semibold"
            >
              {{ Number(alumnoFila.activo) === 1 ? 'Activo' : 'Inactivo' }}
            </span>
          </td>

          <td class="p-3">
            <div class="flex flex-col gap-2">
              <button
                type="button"
                @click="editarAlumnoAdmin(alumnoFila)"
                class="rounded-lg border border-sky-300 px-3 py-2 font-semibold text-sky-800 hover:bg-sky-50"
              >
                Editar
              </button>

              <button
                type="button"
                @click="cambiarEstadoAlumnoAdmin(alumnoFila)"
                class="rounded-lg border border-gray-300 px-3 py-2 font-semibold hover:bg-gray-50"
              >
                {{ Number(alumnoFila.activo) === 1 ? 'Desactivar' : 'Reactivar' }}
              </button>
            </div>
          </td>
        </tr>

        <tr v-if="!cargandoDatos && alumnosAdminFiltrados.length === 0">
          <td colspan="11" class="p-6 text-center text-gray-500">
            No se han encontrado alumnos con estos filtros.
          </td>
        </tr>

        <tr v-if="cargandoDatos">
          <td colspan="11" class="p-6 text-center text-gray-500">
            Cargando datos del alumnado…
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- FORMULARIO PARA AÑADIR ALUMNO -->
  <div
    v-if="creandoAlumno"
    class="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5"
  >
    <h4 class="text-xl font-bold text-gray-900">
      Añadir nuevo alumno
    </h4>

    <p class="mt-2 text-sm text-gray-600">
      Introduce los datos del alumno y selecciona su grupo.
    </p>

    <form
      class="mt-5 grid gap-4 sm:grid-cols-2"
      @submit.prevent="crearAlumnoAdmin"
    >
      <label class="block">
        <span class="mb-1 block text-sm font-semibold">Nombre</span>
        <input
          v-model.trim="formNuevoAlumno.nombre"
          required
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        />
      </label>

      <label class="block">
        <span class="mb-1 block text-sm font-semibold">Apellidos</span>
        <input
          v-model.trim="formNuevoAlumno.apellidos"
          required
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        />
      </label>

      <label class="block">
        <span class="mb-1 block text-sm font-semibold">Tipo de documento</span>
        <select
          v-model="formNuevoAlumno.tipo_documento"
          required
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        >
          <option value="">Selecciona el tipo</option>
          <option value="DNI">DNI</option>
          <option value="NIE">NIE</option>
          <option value="PASAPORTE">Pasaporte</option>
        </select>
      </label>

      <label class="block">
        <span class="mb-1 block text-sm font-semibold">Número de documento</span>
        <input
          v-model.trim="formNuevoAlumno.documento"
          required
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        />
      </label>

      <label class="block">
        <span class="mb-1 block text-sm font-semibold">Correo electrónico</span>
        <input
          v-model.trim="formNuevoAlumno.email"
          type="email"
          required
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        />
      </label>

      <label class="block">
        <span class="mb-1 block text-sm font-semibold">Teléfono</span>
        <input
          v-model.trim="formNuevoAlumno.telefono"
          type="tel"
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        />
      </label>

      <label class="block">
        <span class="mb-1 block text-sm font-semibold">Fecha de nacimiento</span>
        <input
          v-model="formNuevoAlumno.fecha_nacimiento"
          type="date"
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        />
      </label>

      <label class="block">
        <span class="mb-1 block text-sm font-semibold">Grupo y horario</span>
        <select
          v-model="formNuevoAlumno.grupo_id"
          required
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        >
          <option value="">Selecciona un grupo</option>
          <option
            v-for="grupo in gruposAdmin"
            :key="grupo.grupo_id"
            :value="String(grupo.grupo_id)"
          >
            {{ grupo.escuela }} — {{ grupo.grupo }}
          </option>
        </select>
      </label>

      <div class="flex flex-wrap items-end gap-3 sm:col-span-2">
        <button
          type="submit"
          :disabled="procesandoId !== null"
          class="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
        >
          {{ procesandoId === 'nuevo-alumno' ? 'Guardando...' : 'Crear alumno' }}
        </button>

        <button
          type="button"
          @click="cancelarAltaAlumno"
          class="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>

  <!-- FORMULARIO DE EDICIÓN -->
  <div
    v-if="alumnoEditando"
    class="mt-8 rounded-xl border border-sky-200 bg-sky-50 p-5"
  >
    <h4 class="text-xl font-bold text-gray-900">
      Editar alumno:
      {{ alumnoEditando.nombre }} {{ alumnoEditando.apellidos }}
    </h4>

    <p class="mt-2 text-sm text-gray-600">
      Los cambios se guardarán en la base de datos.
    </p>

    <form
      class="mt-5 grid gap-4 sm:grid-cols-2"
      @submit.prevent="guardarAlumnoAdmin"
    >
      <label>
        <span class="mb-1 block text-sm font-semibold">Nombre</span>
        <input
          v-model.trim="formAlumnoAdmin.nombre"
          required
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        />
      </label>

      <label>
        <span class="mb-1 block text-sm font-semibold">Apellidos</span>
        <input
          v-model.trim="formAlumnoAdmin.apellidos"
          required
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        />
      </label>

      <label>
        <span class="mb-1 block text-sm font-semibold">Tipo de documento</span>
        <select
          v-model="formAlumnoAdmin.tipo_documento"
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        >
          <option value="">Sin especificar</option>
          <option value="DNI">DNI</option>
          <option value="NIE">NIE</option>
          <option value="PASAPORTE">Pasaporte</option>
        </select>
      </label>

      <label>
        <span class="mb-1 block text-sm font-semibold">Documento</span>
        <input
          v-model.trim="formAlumnoAdmin.documento"
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        />
      </label>

      <label>
        <span class="mb-1 block text-sm font-semibold">Correo electrónico</span>
        <input
          v-model.trim="formAlumnoAdmin.email"
          type="email"
          required
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        />
      </label>

      <label>
        <span class="mb-1 block text-sm font-semibold">Teléfono</span>
        <input
          v-model.trim="formAlumnoAdmin.telefono"
          type="tel"
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        />
      </label>

      <label>
        <span class="mb-1 block text-sm font-semibold">Fecha de nacimiento</span>
        <input
          v-model="formAlumnoAdmin.fecha_nacimiento"
          type="date"
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        />
      </label>

      <div class="flex flex-wrap items-end gap-3 sm:col-span-2">
        <button
          type="submit"
          :disabled="procesandoId !== null"
          class="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800 disabled:opacity-50"
        >
          Guardar cambios
        </button>

        <button
          type="button"
          @click="alumnoEditando = null"
          class="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
<hr class="my-4 border-0 h-px bg-gray-300" />

  <!-- HORAS DE ASISTENCIA DEL ALUMNADO -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              @click="seleccionarModulo('asistencia')"
              class="rounded-xl border border-orange-200 bg-orange-50 p-6 text-left transition hover:bg-orange-100"
            >
              <span class="mb-3 block text-3xl">⏱️</span>

              <h3 class="text-xl font-bold text-gray-900">
                Horas de asistencia del alumnado
              </h3>

              <p class="mt-2 text-sm text-gray-700">
                Consultar las horas acumuladas del alumnado de ambas escuelas.
              </p>

              <span class="mt-4 block font-semibold text-orange-800">
                Consultar →
              </span>
            </button> 
             <button
  type="button"
  @click="seleccionarModulo('certificados')"
  class="rounded-xl border border-purple-200 bg-purple-50 p-6 text-left transition hover:bg-purple-100"
>
  <span class="mb-3 block text-3xl">🎓</span>
  <h3 class="text-xl font-bold text-gray-900">
    Resultados finales y certificados
  </h3>
  <p class="mt-2 text-sm text-gray-700">
    Consultar las notas finales, la aptitud y gestionar los certificados.
  </p>
  <span class="mt-4 block font-semibold text-purple-800">
    Gestionar →
  </span>
</button>          
</div>
</section>


        <!-- MODERACIÓN DE FOROS -->
        <section
          v-if="moduloSeleccionado === 'foros'"
          class="mt-8 space-y-6"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h3 class="text-2xl font-bold text-gray-900">
              Moderación de foros
            </h3>

            <button
              type="button"
              @click="cargarForos"
              :disabled="cargandoDatos || procesandoId !== null"
              class="rounded-lg border px-4 py-2 disabled:opacity-50"
            >
              {{ cargandoDatos ? 'Actualizando...' : 'Actualizar' }}
            </button>
          </div>

          <p class="text-sm text-gray-600">
            Ocultar y retirar excepcionalmente son acciones distintas.
            Las publicaciones retiradas excepcionalmente no se pueden
            restaurar desde este panel.
          </p>

          <!-- SELECTOR DE FORO -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              @click="foroAbierto = 'estudiantes'"
              :aria-pressed="foroAbierto === 'estudiantes'"
              class="rounded-xl border p-5 text-left"
              :class="foroAbierto === 'estudiantes'
                ? 'border-blue-700 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-200'"
            >
              <span class="mb-2 block text-3xl">👩‍🎓</span>
              <span class="block text-lg font-bold">Foro de estudiantes</span>
              <span class="mt-1 block text-sm text-gray-600">
                {{ mensajesEstudiantes.length }} mensajes
              </span>
            </button>

            <button
              type="button"
              @click="foroAbierto = 'profesores'"
              :aria-pressed="foroAbierto === 'profesores'"
              class="rounded-xl border p-5 text-left"
              :class="foroAbierto === 'profesores'
                ? 'border-emerald-700 bg-emerald-50 ring-2 ring-emerald-200'
                : 'border-gray-200'"
            >
              <span class="mb-2 block text-3xl">👩‍🏫</span>
              <span class="block text-lg font-bold">Foro de profesores</span>
              <span class="mt-1 block text-sm text-gray-600">
                {{ mensajesProfesores.length }} publicaciones
              </span>
            </button>
          </div>

          <!-- MENSAJES DE ESTUDIANTES -->
          <div
            v-if="foroAbierto === 'estudiantes'"
            class="rounded-xl border p-5"
          >
            <h4 class="mb-4 text-xl font-bold">Foro de estudiantes</h4>

            <p
              v-if="!cargandoDatos && mensajesEstudiantes.length === 0"
              class="rounded-lg bg-gray-50 p-4 text-gray-600"
            >
              No hay mensajes de estudiantes.
            </p>

            <article
              v-for="item in mensajesEstudiantes"
              :key="item.id"
              class="mb-4 rounded-lg border p-4 last:mb-0"
            >
              <div class="flex flex-wrap justify-between gap-2">
                <p class="font-semibold">
                  {{ item.autor || 'Autor no disponible' }}
                </p>
                <span class="text-xs text-gray-500">
                  {{ formatearFecha(item.fecha_creacion) }}
                </span>
              </div>

              <p class="mt-1 text-sm text-gray-500">
                {{ item.escuela || 'Escuela no indicada' }}
                <span v-if="item.grupo"> · {{ item.grupo }}</span>
              </p>

              <p v-if="item.titulo" class="mt-3 font-semibold">
                {{ item.titulo }}
              </p>

              <p class="mt-2 whitespace-pre-wrap break-words">
                {{ item.mensaje || 'Sin texto' }}
              </p>

              <div class="mt-4 flex flex-wrap items-center gap-2">
                <span
                  v-if="item.ultima_accion === 'ELIMINAR'"
                  class="rounded-full bg-red-100 px-3 py-1 text-sm text-red-800"
                >
                  Retirada excepcionalmente
                </span>

                <span
                  v-else-if="!estaActivo(item.activo)"
                  class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  Mensaje oculto
                </span>

                <span
                  v-else
                  class="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800"
                >
                  Visible
                </span>

                <button
                  v-if="estaActivo(item.activo) && item.ultima_accion !== 'ELIMINAR'"
                  type="button"
                  @click="abrirModeracion('estudiantes', item, 'ocultar')"
                  :disabled="procesandoId !== null || cargandoDatos"
                  class="rounded-lg bg-amber-700 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Ocultar
                </button>

                <button
                  v-else-if="item.ultima_accion !== 'ELIMINAR'"
                  type="button"
                  @click="abrirModeracion('estudiantes', item, 'mostrar')"
                  :disabled="procesandoId !== null || cargandoDatos"
                  class="rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Restaurar
                </button>

                <button
                  v-if="item.ultima_accion !== 'ELIMINAR'"
                  type="button"
                  @click="abrirModeracion('estudiantes', item, 'eliminar')"
                  :disabled="procesandoId !== null || cargandoDatos"
                  class="rounded-lg bg-red-800 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Retirada excepcional
                </button>
              </div>
            </article>
          </div>

          <!-- MENSAJES DE PROFESORES -->
          <div
            v-if="foroAbierto === 'profesores'"
            class="rounded-xl border p-5"
          >
            <h4 class="mb-4 text-xl font-bold">Foro de profesores</h4>

            <p
              v-if="!cargandoDatos && mensajesProfesores.length === 0"
              class="rounded-lg bg-gray-50 p-4 text-gray-600"
            >
              No hay publicaciones de profesores.
            </p>

            <article
              v-for="item in mensajesProfesores"
              :key="item.id"
              class="mb-4 rounded-lg border p-4 last:mb-0"
            >
              <div class="flex flex-wrap justify-between gap-2">
                <p class="font-semibold">
                  {{ item.titulo || 'Publicación del profesor' }}
                </p>
                <span class="text-xs text-gray-500">
                  {{ formatearFecha(item.fecha_creacion) }}
                </span>
              </div>

              <p class="mt-1 text-sm text-gray-500">
                {{ item.escuela || 'Escuela no indicada' }}
                <span v-if="item.autor"> · {{ item.autor }}</span>
              </p>

              <p class="mt-3 whitespace-pre-wrap break-words">
                {{ item.mensaje || 'Sin texto' }}
              </p>

              <div class="mt-4 flex flex-wrap items-center gap-2">
                <span
                  v-if="item.ultima_accion === 'ELIMINAR'"
                  class="rounded-full bg-red-100 px-3 py-1 text-sm text-red-800"
                >
                  Retirada excepcionalmente
                </span>

                <span
                  v-else-if="!estaActivo(item.activo)"
                  class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  Publicación oculta
                </span>

                <span
                  v-else
                  class="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800"
                >
                  Visible
                </span>

                <button
                  v-if="estaActivo(item.activo) && item.ultima_accion !== 'ELIMINAR'"
                  type="button"
                  @click="abrirModeracion('profesores', item, 'ocultar')"
                  :disabled="procesandoId !== null || cargandoDatos"
                  class="rounded-lg bg-amber-700 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Ocultar
                </button>

                <button
                  v-else-if="item.ultima_accion !== 'ELIMINAR'"
                  type="button"
                  @click="abrirModeracion('profesores', item, 'mostrar')"
                  :disabled="procesandoId !== null || cargandoDatos"
                  class="rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Restaurar
                </button>

                <button
                  v-if="item.ultima_accion !== 'ELIMINAR'"
                  type="button"
                  @click="abrirModeracion('profesores', item, 'eliminar')"
                  :disabled="procesandoId !== null || cargandoDatos"
                  class="rounded-lg bg-red-800 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Retirada excepcional
                </button>
              </div>
            </article>
          </div>
        </section>

        <!-- MATERIALES -->
        <section
          v-if="moduloSeleccionado === 'archivos'"
          class="mt-8"
        >
          <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 class="text-2xl font-bold">Archivos y materiales</h3>

            <button
              type="button"
              @click="cargarRecursos"
              :disabled="cargandoDatos || procesandoId !== null"
              class="rounded-lg border px-4 py-2 disabled:opacity-50"
            >
              {{ cargandoDatos ? 'Actualizando...' : 'Actualizar' }}
            </button>
          </div>

          <p
            v-if="!cargandoDatos && recursos.length === 0"
            class="rounded-xl border border-dashed p-6 text-center text-gray-500"
          >
            Todavía no hay materiales registrados.
          </p>

          <article
            v-for="item in recursos"
            :key="item.id"
            class="mb-4 rounded-xl border p-5"
          >
            <div class="flex flex-col justify-between gap-3 sm:flex-row">
              <div>
                <h4 class="text-lg font-bold">
                  {{ item.titulo || item.nombre_archivo || 'Material sin título' }}
                </h4>

                <p class="mt-1 text-sm text-gray-600">
                  Escuela: {{ item.escuela || 'No indicada' }}
                </p>

                <p class="text-sm text-gray-600">
                  Profesor: {{ item.profesor || 'No indicado' }}
                </p>

                <p class="mt-3 whitespace-pre-wrap break-words">
                  {{ item.descripcion || 'Sin descripción' }}
                </p>

                <p class="mt-2 text-xs text-gray-500">
                  {{ item.nombre_archivo || 'Archivo no disponible' }}
                </p>
              </div>

              <div class="shrink-0">
                <span
                  v-if="!estaPublicado(item.publicado)"
                  class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  Retirado
                </span>

                <button
                  v-else
                  type="button"
                  @click="retirarMaterial(item)"
                  :disabled="procesandoId !== null || cargandoDatos"
                  class="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Retirar material
                </button>
              </div>
            </div>
          </article>
        </section>

        <!-- VOLUNTARIADO -->
        <section
          v-if="moduloSeleccionado === 'voluntarios'"
          class="mt-8"
        >
          <GestionVoluntarios />
        </section>

        <p
          v-if="cargandoDatos"
          role="status"
          class="mt-5 text-center text-gray-500"
        >
          Cargando información...
        </p>

        <button
          v-if="moduloSeleccionado"
          type="button"
          @click="volverAlPanel"
          :disabled="procesandoId !== null"
          class="mt-8 rounded-lg border border-gray-300 px-5 py-3 font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          Volver al panel
        </button>

        <!-- FORMULARIO ÚNICO DE MODERACIÓN -->
        <section
          v-if="moderacionAbierta"
          class="mt-8 rounded-xl border border-red-200 bg-red-50 p-5"
        >
          <h3 class="text-xl font-bold text-gray-900">
            {{
              moderacionAbierta.accion === 'ocultar'
                ? 'Ocultar publicación'
                : moderacionAbierta.accion === 'mostrar'
                  ? 'Restaurar publicación'
                  : 'Retirada excepcional'
            }}
          </h3>

          <p class="mt-2 text-sm text-gray-700">
            Escribe el motivo de la acción. El motivo debe registrarse
            en la auditoría de moderación del servidor.
          </p>

          <form
            class="mt-4 space-y-4"
            @submit.prevent="confirmarModeracion"
          >
            <div>
              <label for="motivo-moderacion" class="mb-1 block font-medium">
                Motivo (entre 5 y 500 caracteres)
              </label>

              <textarea
                id="motivo-moderacion"
                v-model="motivoModeracion"
                required
                minlength="5"
                maxlength="500"
                rows="3"
                class="w-full rounded-lg border border-gray-300 bg-white p-3"
                placeholder="Explica el motivo de la acción..."
              ></textarea>

              <p class="mt-1 text-xs text-gray-500">
                {{ motivoModeracion.trim().length }} / 500 caracteres
              </p>
            </div>

            <div v-if="moderacionAbierta.accion === 'eliminar'">
              <label
                for="contrasena-retirada"
                class="mb-1 block font-medium"
              >
                Contraseña del administrador
              </label>

              <input
                id="contrasena-retirada"
                v-model="contrasenaModeracion"
                type="password"
                required
                autocomplete="current-password"
                class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
                placeholder="Vuelve a introducir tu contraseña"
              />

              <p class="mt-2 text-sm text-red-800">
                Esta acción no debe borrar físicamente el registro.
                El servidor debe verificar tu contraseña, registrar
                la auditoría y bloquear la restauración normal.
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <button
                type="submit"
                :disabled="procesandoId !== null || cargandoDatos"
                class="rounded-lg bg-red-800 px-5 py-3 font-semibold text-white disabled:opacity-50"
              >
                {{
                  procesandoId !== null
                    ? 'Procesando...'
                    : 'Confirmar acción'
                }}
              </button>

              <button
                type="button"
                :disabled="procesandoId !== null"
                @click="cancelarModeracion"
                class="rounded-lg border border-gray-300 bg-white px-5 py-3 disabled:opacity-50"
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>

        <!-- AVISO DE SEGURIDAD -->
        <div class="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h3 class="font-bold text-amber-900">
            Seguridad y protección de la comunidad
          </h3>

          <p class="mt-2 text-sm leading-relaxed text-amber-900">
            Las acciones de moderación deben registrarse en la auditoría.
            Ocultar una publicación no debe borrar su fila de la base de datos.
            Comprueba también que el servidor impida acceder públicamente
            a materiales retirados mediante enlaces directos.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

import { ref, computed } from 'vue'

import GestionVoluntarios from '../components/GestionVoluntarios.vue'
import GestionHorariosAdmin from './GestionHorariosAdmin.vue'

import {
  guardarTokenAdmin,
  obtenerTokenAdmin,
  cerrarSesionAdmin,
  peticionAdmin
} from '../services/adminApi'

// =====================================================
// ESTADO
// =====================================================

const mostrarFormulario = ref(false)
const usuario = ref('')
const contrasena = ref('')
const mensaje = ref('')
const cargando = ref(false)
const sesionIniciada = ref(Boolean(obtenerTokenAdmin()))

const moduloSeleccionado = ref('')
const cargandoDatos = ref(false)
const procesandoId = ref(null)

const mensajesEstudiantes = ref([])
const mensajesProfesores = ref([])
const recursos = ref([])
const resultadosFinales = ref([])
const horasAsistencia = ref([])
const mensajeHorasAsistencia = ref('')

const foroAbierto = ref('estudiantes')

const mostrarEscuelasAdmin = ref(false);

/* =====================================================
   GESTIÓN ADMINISTRATIVA DE PROFESORES Y GRUPOS
   ===================================================== */

const profesoresAdmin = ref([])
const gruposAdmin = ref([])
const profesorPorGrupo = ref({})
const filtroEscuelaGrupos = ref('')

// ========================================
// ESCUELAS, CURSOS, GRUPOS Y HORARIOS
// ========================================

const escuelasAdmin = [
  { id: 1, nombre: 'Biblioteca Joan Miró' },
  { id: 2, nombre: 'Ateneu Aula 502' }
]

const gruposEscuelasAdmin = ref([])
const horariosEscuelasAdmin = ref({})
const escuelasAbiertasAdmin = ref({})
const cargandoEscuelasAdmin = ref(false)
const errorEscuelasAdmin = ref('')

// =====================================================
// ALTA DE CURSOS, GRUPOS Y HORARIOS
// =====================================================

const mostrarFormularioGrupoAdmin = ref(false)
const guardandoGrupoAdmin = ref(false)
const mensajeGrupoAdmin = ref('')

const cursosFormularioAdmin = ref([])

const diasSemanaGrupoAdmin = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
]

const diasSeleccionadosGrupoAdmin = ref(['Lunes'])

const crearCursoNuevoAdmin = ref(false)

function nuevoFormularioGrupoAdmin() {
  return {
    escuela_id: '1',
    curso_id: '',
    curso_nombre: '',
    idioma: 'Castellano',
    nivel: 'A1',
    nombre: '',
    turno: 'Mañana',
    aula: '',
    profesor_id: '',
    hora_inicio: '09:00',
    hora_fin: '10:00'
  }
}

const formGrupoAdmin = ref(nuevoFormularioGrupoAdmin())

async function abrirFormularioGrupoAdmin() {
  if (mostrarFormularioGrupoAdmin.value) {
    mostrarFormularioGrupoAdmin.value = false
    return
  }

  mostrarFormularioGrupoAdmin.value = true
  mensajeGrupoAdmin.value = ''

  try {
    const [respuestaCursos, respuestaProfesores] = await Promise.all([
      peticionAdmin('/cursos'),
      peticionAdmin('/admin/profesores')
    ])

    cursosFormularioAdmin.value = Array.isArray(respuestaCursos?.datos)
      ? respuestaCursos.datos
      : []

    profesoresAdmin.value = Array.isArray(respuestaProfesores?.profesores)
      ? respuestaProfesores.profesores
      : []
  } catch (error) {
    mensajeGrupoAdmin.value =
      error.message || 'No se pudieron cargar los cursos y profesores.'
  }
}

function restablecerFormularioGrupoAdmin() {
  formGrupoAdmin.value = nuevoFormularioGrupoAdmin()
  diasSeleccionadosGrupoAdmin.value = ['Lunes']
  crearCursoNuevoAdmin.value = false
  mensajeGrupoAdmin.value = ''
}

async function guardarGrupoAdmin() {
  if (guardandoGrupoAdmin.value) return

  const formulario = formGrupoAdmin.value
  const diasSeleccionados = diasSeleccionadosGrupoAdmin.value

  if (!diasSeleccionados.length) {
    mensajeGrupoAdmin.value = 'Selecciona al menos un día de clase.'
    return
  }

  if (formulario.hora_inicio >= formulario.hora_fin) {
    mensajeGrupoAdmin.value =
      'La hora de finalización debe ser posterior a la hora de inicio.'
    return
  }

  if (
    !crearCursoNuevoAdmin.value &&
    !formulario.curso_id
  ) {
    mensajeGrupoAdmin.value = 'Selecciona un curso existente.'
    return
  }

  guardandoGrupoAdmin.value = true
  mensajeGrupoAdmin.value = ''

  let grupoCreadoId = null

  try {
    let cursoId

    // 1. Crear el curso si se ha solicitado.
    if (crearCursoNuevoAdmin.value) {
      const respuestaCurso = await peticionAdmin('/admin/cursos', {
        method: 'POST',
        body: JSON.stringify({
          nombre: formulario.curso_nombre,
          idioma: formulario.idioma,
          nivel: formulario.nivel
        })
      })

      cursoId = Number(respuestaCurso?.curso?.id)

      if (!Number.isSafeInteger(cursoId) || cursoId <= 0) {
        throw new Error(
          'El servidor no ha devuelto el identificador del curso.'
        )
      }
    } else {
      cursoId = Number(formulario.curso_id)
    }

    // 2. Crear el grupo en la escuela seleccionada.
    const respuestaGrupo = await peticionAdmin('/admin/grupos', {
      method: 'POST',
      body: JSON.stringify({
        escuela_id: Number(formulario.escuela_id),
        curso_id: cursoId,
        nombre: formulario.nombre,
        turno: formulario.turno,
        aula: formulario.aula || null,
        profesor_id: formulario.profesor_id
          ? Number(formulario.profesor_id)
          : null
      })
    })

    grupoCreadoId = Number(respuestaGrupo?.grupo_id)

    if (!Number.isSafeInteger(grupoCreadoId) || grupoCreadoId <= 0) {
      throw new Error(
        'El grupo puede haberse creado, pero no se recibió su identificador.'
      )
    }

    // 3. Guardar los siete días; solo los seleccionados quedan activos.
    const horarios = diasSemanaGrupoAdmin.map(dia => {
      const activo = diasSeleccionados.includes(dia)

      return {
        dia_semana: dia,
        hora_inicio: activo ? formulario.hora_inicio : '09:00',
        hora_fin: activo ? formulario.hora_fin : '18:00',
        activo
      }
    })

    await peticionAdmin('/horarios/', {
      method: 'PUT',
      body: JSON.stringify({
        grupo_id: grupoCreadoId,
        horarios
      })
    })

    mensajeGrupoAdmin.value =
      'Curso, grupo y horario guardados correctamente.'

    // Actualizar la tabla de escuelas y sus horarios.
    await cargarEscuelasCursosAdmin()

    // Actualizar los grupos de la sección de asignaciones.
    try {
      await cargarGruposAdminInterno()
    } catch (error) {
      console.error('No se pudo actualizar la lista de grupos:', error)
    }

    // Actualizar el selector de cursos.
    try {
      const respuestaCursos = await peticionAdmin('/cursos')

      cursosFormularioAdmin.value = Array.isArray(respuestaCursos?.datos)
        ? respuestaCursos.datos
        : []
    } catch (error) {
      console.error('No se pudo actualizar la lista de cursos:', error)
    }

    restablecerFormularioGrupoAdmin()
    mostrarFormularioGrupoAdmin.value = false

    mensaje.value =
      'El curso, grupo y horario se han guardado correctamente.'
  } catch (error) {
    if (grupoCreadoId !== null) {
      mensajeGrupoAdmin.value =
        'El grupo se ha creado, pero no se pudo confirmar el guardado del horario. ' +
        'Comprueba el horario antes de volver a crear el grupo. ' +
        (error.message || '')
    } else {
      mensajeGrupoAdmin.value =
        error.message || 'No se pudo guardar el curso o el grupo.'
    }
  } finally {
    guardandoGrupoAdmin.value = false
  }
}

const profesorEditando = ref(null)
const formProfesor = ref({})

const historialProfesorSeleccionado = ref(null)
// =====================================================
// GESTIÓN ADMINISTRATIVA DE ALUMNOS
// =====================================================

const alumnosAdmin = ref([])
const filtroEscuelaAlumnos = ref('')
const busquedaAlumnos = ref('')

const alumnoEditando = ref(null)

const formAlumnoAdmin = ref({
  tipo_documento: '',
  documento: '',
  nombre: '',
  apellidos: '',
  email: '',
  telefono: '',
  fecha_nacimiento: ''
})

const alumnosAdminFiltrados = computed(() => {
  const texto = busquedaAlumnos.value.trim().toLocaleLowerCase('es')

  if (!texto) return alumnosAdmin.value

  return alumnosAdmin.value.filter(alumno => {
    const contenido = [
      alumno.nombre,
      alumno.apellidos,
      alumno.documento,
      alumno.email,
      alumno.telefono,
      alumno.escuela,
      alumno.grupo,
      alumno.curso
    ]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase('es')

    return contenido.includes(texto)
  })
})

// Formulario único de moderación.
const moderacionAbierta = ref(null)
const motivoModeracion = ref('')
const contrasenaModeracion = ref('')

// =====================================================
// LOGIN
// =====================================================

async function iniciarSesion() {
  if (cargando.value) return

  cargando.value = true
  mensaje.value = ''

  try {
    const respuesta = await fetch(
      'http://localhost:5555/api/admin/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario: usuario.value,
          contrasena: contrasena.value
        })
      }
    )

    const datos = await respuesta.json()

    if (!respuesta.ok || !datos.token) {
      mensaje.value =
        datos.mensaje ||
        'No se pudo iniciar sesión. Comprueba tus credenciales.'
      return
    }

    guardarTokenAdmin(datos.token)

    // Compatibilidad con componentes antiguos.
    localStorage.setItem('token', datos.token)

    sesionIniciada.value = true
    mostrarFormulario.value = false
    moduloSeleccionado.value = ''
    mensaje.value = 'Acceso verificado correctamente.'
    contrasena.value = ''
  } catch (error) {
    console.error('Error en el inicio de sesión:', error)

    mensaje.value =
      'No se puede conectar con el servidor. Comprueba que el backend esté funcionando.'
  } finally {
    cargando.value = false
  }
}

function cancelarLogin() {
  if (cargando.value) return

  mostrarFormulario.value = false
  usuario.value = ''
  contrasena.value = ''
  mensaje.value = ''
}

// =====================================================
// NAVEGACIÓN
// =====================================================


function seleccionarModulo(modulo) {
  if (procesandoId.value !== null || cargandoDatos.value) return

  moduloSeleccionado.value = modulo
  mensaje.value = ''
  cancelarModeracion()

  if (modulo === 'foros') {
    cargarForos()
  } else if (modulo === 'archivos') {
    cargarRecursos()
  } else if (modulo === 'personas') {
    cargarGestionProfesores()
  } else if (modulo === 'certificados') {
    cargarResultadosFinales()
  } else if (modulo === 'escuelas') {
    cargarEscuelasCursosAdmin()
  } else if (modulo === 'datos') {
    cargarAlumnosAdmin()
  }
}

async function cargarEscuelasCursosAdmin() {
  if (cargandoEscuelasAdmin.value) return

  cargandoEscuelasAdmin.value = true
  errorEscuelasAdmin.value = ''

  try {
    const resultado = await peticionAdmin('/admin/grupos')

    if (!Array.isArray(resultado?.grupos)) {
      throw new Error(
        'La API no ha devuelto una lista válida de grupos.'
      )
    }

    gruposEscuelasAdmin.value = resultado.grupos

    // Abrir las dos escuelas al entrar por primera vez.
    if (Object.keys(escuelasAbiertasAdmin.value).length === 0) {
      escuelasAbiertasAdmin.value = {
        1: true,
        2: true
      }
    }

    // Consultar los horarios de los grupos activos.
    const consultas = await Promise.all(
      resultado.grupos.map(async grupo => {
        const grupoId = Number(grupo.grupo_id)

        if (Number(grupo.grupo_activo) !== 1) {
          return [grupoId, []]
        }

        try {
          const respuesta = await peticionAdmin(
            `/horarios/?grupo_id=${encodeURIComponent(grupoId)}`
          )

          const dias = Array.isArray(respuesta)
            ? respuesta
            : Array.isArray(respuesta?.datos)
              ? respuesta.datos
              : null

          if (!dias) {
            throw new Error('Formato de horario no válido.')
          }

          return [grupoId, dias]
        } catch (error) {
          console.error(
            `No se pudo cargar el horario del grupo ${grupoId}:`,
            error
          )

          return [grupoId, null]
        }
      })
    )

    horariosEscuelasAdmin.value = Object.fromEntries(consultas)
  } catch (error) {
    errorEscuelasAdmin.value =
      error.message || 'No se pudieron cargar las escuelas y los grupos.'
  } finally {
    cargandoEscuelasAdmin.value = false
  }
}

function alternarEscuelaAdmin(escuelaId) {
  escuelasAbiertasAdmin.value = {
    ...escuelasAbiertasAdmin.value,
    [escuelaId]: !escuelasAbiertasAdmin.value[escuelaId]
  }
}

function obtenerHorarioGrupoAdmin(grupoId) {
  const dias = horariosEscuelasAdmin.value[grupoId]

  if (dias === null) {
    return 'No se ha podido consultar el horario.'
  }

  if (!Array.isArray(dias)) {
    return 'Sin horario configurado.'
  }

  const activos = dias.filter(dia => dia.activo)

  if (!activos.length) {
    return 'Sin días de clase configurados.'
  }

  return activos
    .map(dia =>
      `${dia.dia_semana}: ${String(dia.hora_inicio).slice(0, 5)}–${String(dia.hora_fin).slice(0, 5)}`
    )
    .join(' · ')
}

function volverAlPanel() {
  if (procesandoId.value !== null) return

  moduloSeleccionado.value = ''
  mensaje.value = ''
  cancelarModeracion()
}

// =====================================================
// CARGAR ALUMNOS
// =====================================================

async function cargarAlumnosAdmin() {
  if (cargandoDatos.value || procesandoId.value !== null) return

  cargandoDatos.value = true
  mensaje.value = ''

  try {
    const parametros = filtroEscuelaAlumnos.value
      ? `?escuelaId=${encodeURIComponent(filtroEscuelaAlumnos.value)}`
      : ''

    const resultado = await peticionAdmin(
      `/admin/alumnos${parametros}`
    )

    alumnosAdmin.value = Array.isArray(resultado?.datos)
      ? resultado.datos
      : []

    alumnoEditando.value = null
  } catch (error) {
    mensaje.value =
      error.message || 'No se pudo cargar la lista de alumnos.'
  } finally {
    cargandoDatos.value = false
  }
}

// =====================================================
// ABRIR EDICIÓN DE UN ALUMNO
// =====================================================

function editarAlumnoAdmin(alumno) {
  if (procesandoId.value !== null || cargandoDatos.value) return

  alumnoEditando.value = alumno.id

  formAlumnoAdmin.value = {
    tipo_documento: alumno.tipo_documento || '',
    documento: alumno.documento || '',
    nombre: alumno.nombre || '',
    apellidos: alumno.apellidos || '',
    email: alumno.email || '',
    telefono: alumno.telefono || '',
    fecha_nacimiento: alumno.fecha_nacimiento
      ? String(alumno.fecha_nacimiento).slice(0, 10)
      : ''
  }

  mensaje.value = ''
}

// =====================================================
// GUARDAR CAMBIOS DE UN ALUMNO
// =====================================================

async function guardarAlumnoAdmin() {
  const id = Number(alumnoEditando.value)

  if (
    !Number.isSafeInteger(id) ||
    id <= 0 ||
    procesandoId.value !== null ||
    cargandoDatos.value
  ) {
    return
  }

  const datos = {
    tipo_documento: formAlumnoAdmin.value.tipo_documento || null,
    documento: formAlumnoAdmin.value.documento.trim() || null,
    nombre: formAlumnoAdmin.value.nombre.trim(),
    apellidos: formAlumnoAdmin.value.apellidos.trim(),
    email: formAlumnoAdmin.value.email.trim(),
    telefono: formAlumnoAdmin.value.telefono.trim() || null,
    fecha_nacimiento: formAlumnoAdmin.value.fecha_nacimiento || null
  }

  if (!datos.nombre || !datos.apellidos || !datos.email) {
    mensaje.value = 'Nombre, apellidos y correo son obligatorios.'
    return
  }

  procesandoId.value = `alumno-${id}`
  mensaje.value = ''

  try {
    const resultado = await peticionAdmin(
      `/admin/alumnos/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(datos)
      }
    )

    alumnoEditando.value = null

    await cargarAlumnosAdmin()

    mensaje.value =
      resultado?.mensaje || 'Alumno actualizado correctamente.'
  } catch (error) {
    mensaje.value =
      error.message || 'No se pudieron guardar los datos del alumno.'
  } finally {
    procesandoId.value = null
  }
}

// Abrir y cancelar el alta de alumnos
async function abrirAltaAlumno() {
  formNuevoAlumno.value = {
    tipo_documento: '',
    documento: '',
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    fecha_nacimiento: '',
    grupo_id: ''
  }

  alumnoEditando.value = null
  creandoAlumno.value = true

  try {
    await cargarGruposAdmin()
  } catch (error) {
    mensaje.value =
      error.message || 'No se pudieron cargar los grupos.'
  }
}

function cancelarAltaAlumno() {
  creandoAlumno.value = false
}

// Crear alumno y matricularlo en el grupo elegido
async function crearAlumnoAdmin() {
  if (procesandoId.value !== null) return

  procesandoId.value = 'nuevo-alumno'
  mensaje.value = ''

  try {
    const resultado = await peticionAdmin('/admin/alumnos', {
      method: 'POST',
      body: JSON.stringify(formNuevoAlumno.value)
    })

    mensaje.value =
      resultado?.mensaje || 'Alumno creado correctamente.'

    creandoAlumno.value = false
procesandoId.value = null
await cargarAlumnosAdmin()
  } catch (error) {
    mensaje.value = error.message || 'No se pudo crear el alumno.'
  } finally {
    procesandoId.value = null
  }
}

// Abrir y cancelar el alta de profesores
function abrirAltaProfesor() {
  formNuevoProfesor.value = {
    tipo_documento: '',
    documento: '',
    nombre: '',
    apellidos: '',
    anio_nacimiento: '',
    telefono: '',
    email: '',
    especialidad: '',
    foto: ''
  }

  creandoProfesor.value = true
  profesorEditando.value = null
}

function cancelarAltaProfesor() {
  creandoProfesor.value = false
}

// Crear profesor
async function crearProfesorAdmin() {
  if (procesandoId.value !== null) return

  procesandoId.value = 'nuevo-profesor'
  mensaje.value = ''

  try {
    const resultado = await peticionAdmin('/admin/profesores', {
      method: 'POST',
      body: JSON.stringify(formNuevoProfesor.value)
    })

    mensaje.value =
      resultado?.mensaje || 'Profesor creado correctamente.'

    creandoProfesor.value = false
    await cargarGestionProfesores()
  } catch (error) {
    mensaje.value = error.message || 'No se pudo crear el profesor.'
  } finally {
    procesandoId.value = null
  }
}

// Alta de alumnos

const creandoAlumno = ref(false)

const formNuevoAlumno = ref({
  tipo_documento: '',
  documento: '',
  nombre: '',
  apellidos: '',
  email: '',
  telefono: '',
  fecha_nacimiento: '',
  grupo_id: ''
})

// Alta de profesores
const creandoProfesor = ref(false)

const formNuevoProfesor = ref({
  tipo_documento: '',
  documento: '',
  nombre: '',
  apellidos: '',
  anio_nacimiento: '',
  telefono: '',
  email: '',
  especialidad: '',
  foto: ''
})


// =====================================================
// DESACTIVAR O REACTIVAR UN ALUMNO
// =====================================================

async function cambiarEstadoAlumnoAdmin(alumno) {
  const id = Number(alumno.id)

  if (
    !Number.isSafeInteger(id) ||
    id <= 0 ||
    procesandoId.value !== null ||
    cargandoDatos.value
  ) {
    return
  }

  const estaActualmenteActivo = Number(alumno.activo) === 1
  const nuevoEstado = estaActualmenteActivo ? 0 : 1

  const nombreCompleto =
    `${alumno.nombre || ''} ${alumno.apellidos || ''}`.trim()

  const confirmacion = estaActualmenteActivo
    ? `¿Quieres desactivar a ${nombreCompleto}? Sus datos se conservarán.`
    : `¿Quieres reactivar a ${nombreCompleto}?`

  if (!window.confirm(confirmacion)) return

  procesandoId.value = `alumno-${id}`
  mensaje.value = ''

  try {
    const resultado = await peticionAdmin(
      `/admin/alumnos/${id}/estado`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          activo: nuevoEstado
        })
      }
    )

    await cargarAlumnosAdmin()

    mensaje.value =
      resultado?.mensaje ||
      (nuevoEstado === 1
        ? 'Alumno reactivado correctamente.'
        : 'Alumno desactivado correctamente.')
  } catch (error) {
    mensaje.value =
      error.message || 'No se pudo cambiar el estado del alumno.'
  } finally {
    procesandoId.value = null
  }
}

// =====================================================
// EXPORTAR ALUMNOS PARA EXCEL
// =====================================================

function exportarAlumnosCSV() {
  if (alumnosAdminFiltrados.value.length === 0) {
    mensaje.value = 'No hay alumnos para exportar.'
    return
  }

  const columnas = [
    ['Nombre', 'nombre'],
    ['Apellidos', 'apellidos'],
    ['Tipo de documento', 'tipo_documento'],
    ['Documento de identidad', 'documento'],
    ['Clase asignada', 'clase_asignada'],
    ['Curso', 'curso'],
    ['Correo electrónico', 'email'],
    ['Teléfono', 'telefono'],
    ['Horario asignado', 'horario_asignado'],
    ['Turno', 'turno'],
    ['Profesor', 'profesor_completo'],
    ['Escuela', 'escuela'],
    ['Estado', 'estado']
  ]

  const escaparCSV = valor => {
    const texto = String(valor ?? '')
    return `"${texto.replace(/"/g, '""')}"`
  }

  const filas = alumnosAdminFiltrados.value.map(alumno => {
    const valores = {
      ...alumno,
      profesor_completo: [
        alumno.profesor_nombre,
        alumno.profesor_apellidos
      ].filter(Boolean).join(' '),
      estado: Number(alumno.activo) === 1 ? 'Activo' : 'Inactivo'
    }

    return columnas
      .map(([, campo]) => escaparCSV(valores[campo]))
      .join(';')
  })

  const contenido = [
    columnas.map(([titulo]) => escaparCSV(titulo)).join(';'),
    ...filas
  ].join('\r\n')

  const archivo = new Blob(
    ['\uFEFF', contenido],
    { type: 'text/csv;charset=utf-8;' }
  )

  const url = URL.createObjectURL(archivo)
  const enlace = document.createElement('a')

  enlace.href = url
  enlace.download = 'gestion-alumnos.csv'
  document.body.appendChild(enlace)
  enlace.click()
  enlace.remove()
  URL.revokeObjectURL(url)

  mensaje.value = 'Archivo exportado. Puedes abrirlo con Excel.'
}
// =====================================================
// CARGAR FOROS
// =====================================================

async function cargarForos() {
  if (cargandoDatos.value) return

  cargandoDatos.value = true
  mensaje.value = ''

  try {
    const [estudiantes, profesores] = await Promise.all([
      peticionAdmin('/admin/moderacion/foro-estudiantes'),
      peticionAdmin('/admin/moderacion/foro-profesores')
    ])

    mensajesEstudiantes.value = Array.isArray(estudiantes?.datos)
      ? estudiantes.datos
      : []

    mensajesProfesores.value = Array.isArray(profesores?.datos)
      ? profesores.datos
      : []
  } catch (error) {
    mensaje.value = error.message || 'No se pudieron cargar los foros.'
  } finally {
    cargandoDatos.value = false
  }
}

// =====================================================
// FORMULARIO DE MODERACIÓN
// =====================================================

function abrirModeracion(tipo, item, accion) {
  if (procesandoId.value !== null || cargandoDatos.value) return

  if (!['estudiantes', 'profesores'].includes(tipo)) {
    mensaje.value = 'El tipo de foro no es válido.'
    return
  }

  if (!['ocultar', 'mostrar', 'eliminar'].includes(accion)) {
    mensaje.value = 'La acción de moderación no es válida.'
    return
  }

  const id = Number(item?.id)

  if (!Number.isSafeInteger(id) || id <= 0) {
    mensaje.value = 'El mensaje no tiene un identificador válido.'
    return
  }

  // Evita iniciar una acción normal sobre una retirada excepcional.
  if (item.ultima_accion === 'ELIMINAR') {
    mensaje.value =
      'Esta publicación fue retirada excepcionalmente y no se puede restaurar desde el panel habitual.'
    return
  }

  // Evita solicitar una acción redundante desde la interfaz.
  if (accion === 'ocultar' && !estaActivo(item.activo)) {
    mensaje.value = 'Esta publicación ya está oculta.'
    return
  }

  if (accion === 'mostrar' && estaActivo(item.activo)) {
    mensaje.value = 'Esta publicación ya está visible.'
    return
  }

  moderacionAbierta.value = {
    tipo,
    id,
    accion
  }

  motivoModeracion.value = ''
  contrasenaModeracion.value = ''
  mensaje.value = ''
}

function cancelarModeracion() {
  if (procesandoId.value !== null) return

  moderacionAbierta.value = null
  motivoModeracion.value = ''
  contrasenaModeracion.value = ''
}

// =====================================================
// CONFIRMAR MODERACIÓN
// =====================================================

async function confirmarModeracion() {
  const seleccion = moderacionAbierta.value

  if (!seleccion || procesandoId.value !== null || cargandoDatos.value) {
    return
  }

  const id = Number(seleccion.id)

  if (!Number.isSafeInteger(id) || id <= 0) {
    mensaje.value = 'El mensaje no tiene un identificador válido.'
    return
  }

  const motivo = motivoModeracion.value.trim()

  if (motivo.length < 5 || motivo.length > 500) {
    mensaje.value = 'El motivo debe tener entre 5 y 500 caracteres.'
    return
  }

  if (
    seleccion.accion === 'eliminar' &&
    !contrasenaModeracion.value
  ) {
    mensaje.value = 'Debes introducir la contraseña del administrador.'
    return
  }

  const sufijos = {
    ocultar: 'ocultar',
    mostrar: 'mostrar',
    eliminar: 'eliminar'
  }

  const rutaBase = seleccion.tipo === 'estudiantes'
    ? '/admin/moderacion/foro-estudiantes'
    : '/admin/moderacion/foro-profesores'

  const esRetirada = seleccion.accion === 'eliminar'

  const cuerpo = { motivo }

  if (esRetirada) {
    cuerpo.contrasena = contrasenaModeracion.value
  }

  const idOperacion = `${seleccion.tipo}-${id}`

  procesandoId.value = idOperacion
  mensaje.value = ''

  try {
    const resultado = await peticionAdmin(
      `${rutaBase}/${id}/${sufijos[seleccion.accion]}`,
      {
        method: esRetirada ? 'POST' : 'PATCH',
        body: JSON.stringify(cuerpo)
      }
    )

    const mensajeOperacion =
      resultado?.mensaje || 'Operación completada correctamente.'

    // Cerrar el formulario y borrar las credenciales introducidas.
    moderacionAbierta.value = null
    motivoModeracion.value = ''
    contrasenaModeracion.value = ''

    // Actualizar la lista correspondiente sin perder el mensaje de éxito.
    if (seleccion.tipo === 'estudiantes') {
      await cargarListaEstudiantes()
    } else {
      await cargarListaProfesores()
    }

    mensaje.value = mensajeOperacion
  } catch (error) {
    mensaje.value =
      error.message || 'No se pudo completar la moderación.'
  } finally {
    procesandoId.value = null
  }
}

// =====================================================
// ACTUALIZAR CADA FORO POR SEPARADO
// =====================================================

async function cargarListaEstudiantes() {
  const resultado = await peticionAdmin(
    '/admin/moderacion/foro-estudiantes'
  )

  mensajesEstudiantes.value = Array.isArray(resultado?.datos)
    ? resultado.datos
    : []
}

async function cargarListaProfesores() {
  const resultado = await peticionAdmin(
    '/admin/moderacion/foro-profesores'
  )

  mensajesProfesores.value = Array.isArray(resultado?.datos)
    ? resultado.datos
    : []
}

// =====================================================
// MATERIALES
// =====================================================

async function cargarRecursos() {
  if (cargandoDatos.value) return

  cargandoDatos.value = true
  mensaje.value = ''

  try {
    const resultado = await peticionAdmin(
      '/admin/moderacion/recursos'
    )

    recursos.value = Array.isArray(resultado?.datos)
      ? resultado.datos
      : []
  } catch (error) {
    mensaje.value =
      error.message || 'No se pudieron cargar los materiales.'
  } finally {
    cargandoDatos.value = false
  }
}

async function retirarMaterial(item) {
  const id = Number(item?.id)

  if (!Number.isSafeInteger(id) || id <= 0) {
    mensaje.value = 'El material no tiene un identificador válido.'
    return
  }

  if (procesandoId.value !== null || cargandoDatos.value) return

  if (!window.confirm('¿Quieres retirar este material de la publicación?')) {
    return
  }

  procesandoId.value = `recurso-${id}`
  mensaje.value = ''

  try {
    const resultado = await peticionAdmin(
      `/admin/moderacion/recursos/${id}/retirar`,
      {
        method: 'PATCH'
      }
    )

    const mensajeOperacion =
      resultado?.mensaje || 'Material retirado correctamente.'

    // Actualizar la lista antes de mostrar el resultado.
    const lista = await peticionAdmin('/admin/moderacion/recursos')

    recursos.value = Array.isArray(lista?.datos)
      ? lista.datos
      : []

    mensaje.value = mensajeOperacion
  } catch (error) {
    mensaje.value =
      error.message || 'No se pudo retirar el material.'
  } finally {
    procesandoId.value = null
  }
}

/* =====================================================
   CARGAR PROFESORES Y GRUPOS
   ===================================================== */

async function cargarGestionProfesores() {
  if (cargandoDatos.value || procesandoId.value !== null) return

  cargandoDatos.value = true
  mensaje.value = ''

  try {
    const resultado = await peticionAdmin('/admin/profesores')

    profesoresAdmin.value = Array.isArray(resultado?.profesores)
      ? resultado.profesores
      : []

    await cargarGruposAdminInterno()
  } catch (error) {
    mensaje.value =
      error.message || 'No se pudieron cargar los profesores.'
  } finally {
    cargandoDatos.value = false
  }
}

async function cargarGruposAdminInterno() {
  const parametros = filtroEscuelaGrupos.value
    ? `?escuelaId=${encodeURIComponent(filtroEscuelaGrupos.value)}`
    : ''

  const resultado = await peticionAdmin(`/admin/grupos${parametros}`)

  gruposAdmin.value = Array.isArray(resultado?.grupos)
    ? resultado.grupos
    : []

  const asignaciones = {}

  for (const grupo of gruposAdmin.value) {
    asignaciones[grupo.grupo_id] = grupo.profesor_id == null
      ? ''
      : String(grupo.profesor_id)
  }

  profesorPorGrupo.value = asignaciones
}

async function cargarGruposAdmin() {
  if (cargandoDatos.value || procesandoId.value !== null) return

  cargandoDatos.value = true
  mensaje.value = ''

  try {
    await cargarGruposAdminInterno()
  } catch (error) {
    mensaje.value =
      error.message || 'No se pudieron cargar los grupos.'
  } finally {
    cargandoDatos.value = false
  }
}

/* =====================================================
   ASIGNAR UN PROFESOR A UN GRUPO
   ===================================================== */

async function asignarProfesorAGrupo(grupo) {
  if (procesandoId.value !== null || cargandoDatos.value) return

  const grupoId = Number(grupo.grupo_id)
  const valorSeleccionado = profesorPorGrupo.value[grupoId]
  const profesorId = valorSeleccionado === ''
    ? null
    : Number(valorSeleccionado)

  if (
    !Number.isSafeInteger(grupoId) ||
    grupoId <= 0 ||
    (
      profesorId !== null &&
      (!Number.isSafeInteger(profesorId) || profesorId <= 0)
    )
  ) {
    mensaje.value = 'El grupo o el profesor seleccionado no son válidos.'
    await cargarGruposAdmin()
    return
  }

  const asignacionAnterior = grupo.profesor_id == null
    ? ''
    : String(grupo.profesor_id)

  // Evita guardar una asignación que no ha cambiado.
  if (String(valorSeleccionado) === asignacionAnterior) return

  procesandoId.value = `grupo-${grupoId}`
  mensaje.value = ''

  try {
    const resultado = await peticionAdmin(
      `/admin/grupos/${grupoId}/profesor`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          profesor_id: profesorId
        })
      }
    )

    mensaje.value =
      resultado?.mensaje || 'Asignación actualizada correctamente.'

    // Volver a consultar el servidor para mostrar los datos reales.
    await cargarGruposAdminInterno()
  } catch (error) {
    mensaje.value =
      error.message || 'No se pudo modificar la asignación.'

    // Restablecer el selector al valor guardado en el servidor.
    try {
      await cargarGruposAdminInterno()
    } catch (errorRecarga) {
      console.error('Error al actualizar los grupos:', errorRecarga)
    }
  } finally {
    procesandoId.value = null
  }
}

/* =====================================================
   EDITAR LA FICHA DE UN PROFESOR
   ===================================================== */

function editarProfesorAdmin(profesor) {
  if (procesandoId.value !== null || cargandoDatos.value) return

  formProfesor.value = {
    tipo_documento: profesor.tipo_documento || 'DNI',
    documento: profesor.documento || '',
    nombre: profesor.nombre || '',
    apellidos: profesor.apellidos || '',
    anio_nacimiento: profesor.anio_nacimiento ?? '',
    telefono: profesor.telefono || '',
    email: profesor.email || '',
    especialidad: profesor.especialidad || '',
    foto: profesor.foto || ''
  }

  profesorEditando.value = Number(profesor.id)
  historialProfesorSeleccionado.value = null
  mensaje.value = ''
}

async function guardarProfesorAdmin() {
  const id = Number(profesorEditando.value)

  if (
    !Number.isSafeInteger(id) ||
    id <= 0 ||
    procesandoId.value !== null ||
    cargandoDatos.value
  ) {
    return
  }

  const datos = {
    tipo_documento: formProfesor.value.tipo_documento,
    documento: formProfesor.value.documento.trim(),
    nombre: formProfesor.value.nombre.trim(),
    apellidos: formProfesor.value.apellidos.trim(),
    anio_nacimiento: formProfesor.value.anio_nacimiento === ''
      ? null
      : Number(formProfesor.value.anio_nacimiento),
    telefono: formProfesor.value.telefono.trim() || null,
    email: formProfesor.value.email.trim() || null,
    especialidad: formProfesor.value.especialidad.trim() || null,
    foto: formProfesor.value.foto.trim() || null
  }

  if (!datos.documento || !datos.nombre || !datos.apellidos) {
    mensaje.value = 'Documento, nombre y apellidos son obligatorios.'
    return
  }

  if (
    datos.anio_nacimiento !== null &&
    (
      !Number.isInteger(datos.anio_nacimiento) ||
      datos.anio_nacimiento < 1900 ||
      datos.anio_nacimiento > new Date().getFullYear()
    )
  ) {
    mensaje.value = 'El año de nacimiento no es válido.'
    return
  }

  procesandoId.value = `profesor-${id}`
  mensaje.value = ''

  try {
    const resultado = await peticionAdmin(
      `/admin/profesores/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(datos)
      }
    )

    const indice = profesoresAdmin.value.findIndex(
      profesor => Number(profesor.id) === id
    )

    if (indice !== -1 && resultado?.profesor) {
      profesoresAdmin.value[indice] = resultado.profesor
    }

    profesorEditando.value = null
    formProfesor.value = {}

    mensaje.value =
      resultado?.mensaje || 'Profesor actualizado correctamente.'
  } catch (error) {
    mensaje.value =
      error.message || 'No se pudieron guardar los datos del profesor.'
  } finally {
    procesandoId.value = null
  }
}

/* =====================================================
   ACTIVAR O DESACTIVAR PROFESORES
   ===================================================== */

async function cambiarEstadoProfesor(profesor) {
  const id = Number(profesor.id)

  if (
    !Number.isSafeInteger(id) ||
    id <= 0 ||
    procesandoId.value !== null ||
    cargandoDatos.value
  ) {
    return
  }

  const estaActivo = Number(profesor.activo) === 1
  const nuevoEstado = estaActivo ? 0 : 1

  const confirmacion = estaActivo
    ? `¿Quieres desactivar a ${profesor.nombre} ${profesor.apellidos}? No podrá acceder al perfil docente mientras esté inactivo.`
    : `¿Quieres activar a ${profesor.nombre} ${profesor.apellidos}?`

  if (!window.confirm(confirmacion)) return

  procesandoId.value = `profesor-${id}`
  mensaje.value = ''

  try {
    const resultado = await peticionAdmin(
      `/admin/profesores/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          activo: nuevoEstado
        })
      }
    )

    const indice = profesoresAdmin.value.findIndex(
      item => Number(item.id) === id
    )

    if (indice !== -1 && resultado?.profesor) {
      profesoresAdmin.value[indice] = resultado.profesor
    }

    mensaje.value =
      resultado?.mensaje ||
      (nuevoEstado === 1
        ? 'Profesor activado correctamente.'
        : 'Profesor desactivado correctamente.')

    // Si se desactiva un profesor, sus asignaciones no se borran.
    // El administrador podrá reasignar los grupos si lo necesita.
  } catch (error) {
    mensaje.value =
      error.message || 'No se pudo cambiar el estado del profesor.'
  } finally {
    procesandoId.value = null
  }
}

/* =====================================================
   CONSULTAR HISTORIAL
   ===================================================== */

async function cargarHistorialProfesor(profesor) {
  const id = Number(profesor.id)

  if (
    !Number.isSafeInteger(id) ||
    id <= 0 ||
    procesandoId.value !== null ||
    cargandoDatos.value
  ) {
    return
  }

  cargandoDatos.value = true
  mensaje.value = ''

  try {
    const resultado = await peticionAdmin(
      `/admin/profesores/${id}/historial`
    )

    if (resultado?.profesorExiste === false) {
      historialProfesorSeleccionado.value = null
      mensaje.value = 'No se ha encontrado ese profesor.'
      return
    }

    historialProfesorSeleccionado.value = {
      id,
      nombre: profesor.nombre,
      apellidos: profesor.apellidos,
      historial: Array.isArray(resultado?.historial)
        ? resultado.historial
        : [],
      cambiosPerfil: Array.isArray(resultado?.cambiosPerfil)
        ? resultado.cambiosPerfil
        : []
    }

    profesorEditando.value = null
  } catch (error) {
    mensaje.value =
      error.message || 'No se pudo consultar el historial.'
  } finally {
    cargandoDatos.value = false
  }
}

// =====================================================
// UTILIDADES
// =====================================================

function estaActivo(valor) {
  return valor === true || valor === 1 || valor === '1'
}

function estaPublicado(valor) {
  return estaActivo(valor)
}

function formatearFecha(valor) {
  if (!valor) return 'Fecha no disponible'

  const fecha = new Date(valor)

  if (Number.isNaN(fecha.getTime())) {
    return String(valor)
  }

  return fecha.toLocaleString('es-ES')
}


// =====================================================
// RESULTADOS FINALES Y CERTIFICADOS
// =====================================================

async function cargarResultadosFinales() {
  if (cargandoDatos.value || procesandoId.value !== null) return

  cargandoDatos.value = true
  mensaje.value = ''

  try {
    const resultado = await peticionAdmin(
      '/admin/resultados-finales'
    )

   resultadosFinales.value = Array.isArray(resultado?.datos)
  ? resultado.datos
  : Array.isArray(resultado?.resultados)
    ? resultado.resultados
    : Array.isArray(resultado)
      ? resultado
      : []

  } catch (error) {
    mensaje.value =
      error.message || 'No se pudieron cargar los resultados finales.'
  } finally {
    cargandoDatos.value = false
  }
}

async function actualizarEstadoCertificado(resultado, nuevoEstado) {
  const id = Number(resultado?.id)

  if (
    !Number.isSafeInteger(id) ||
    id <= 0 ||
    procesandoId.value !== null ||
    cargandoDatos.value
  ) {
    return
  }

  if (resultado.decision_apto !== 'APTO') {
    mensaje.value = 'Solo se pueden gestionar certificados de resultados APTO.'
    return
  }

  const estadosPermitidos = ['PENDIENTE', 'EMITIDO', 'ENTREGADO']

  if (!estadosPermitidos.includes(nuevoEstado)) {
    mensaje.value = 'El estado del certificado no es válido.'
    return
  }

  const estadoAnterior = resultado.estado_certificado

  if (nuevoEstado === estadoAnterior) return

  procesandoId.value = `certificado-${id}`
  mensaje.value = ''

  try {
    const respuesta = await peticionAdmin(
      `/admin/resultados-finales/${id}/certificado`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          estado_certificado: nuevoEstado
        })
      }
    )

    resultado.estado_certificado = nuevoEstado

    mensaje.value =
      respuesta?.mensaje || 'Estado del certificado actualizado correctamente.'
  } catch (error) {
    mensaje.value =
      error.message || 'No se pudo actualizar el certificado.'

    // Recuperar el estado real del servidor.
    try {
      await cargarResultadosFinalesInterno()
    } catch (errorRecarga) {
      console.error(
        'Error al recuperar los resultados finales:',
        errorRecarga
      )
    }
  } finally {
    procesandoId.value = null
  }
}

// =====================================================
// ASISTENCIA
// =========================

async function cargarHorasAsistencia() {
  mensajeHorasAsistencia.value = ''
  cargandoDatos.value = true

  try {
    const token = sessionStorage.getItem('exaequo_admin_token')

    if (!token) {
      throw new Error('La sesión de administración ha caducado.')
    }

    const respuesta = await fetch(
      'http://localhost:5555/api/admin/asistencia/horas',
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      }
    )

    const resultado = await respuesta.json()

    if (!respuesta.ok || !resultado.ok) {
      throw new Error(
        resultado.mensaje || 'No se pudieron cargar las horas de asistencia.'
      )
    }

    horasAsistencia.value = resultado.datos || []
  } catch (error) {
    mensajeHorasAsistencia.value =
      error.message || 'No se pudieron cargar las horas de asistencia.'
  } finally {
    cargandoDatos.value = false
  }
}
// =====================================================
// RESULTADO
// =====================================================
async function cargarResultadosFinalesInterno() {
  const resultado = await peticionAdmin(
    '/admin/resultados-finales'
  )

  resultadosFinales.value = Array.isArray(resultado?.datos)
  ? resultado.datos
  : Array.isArray(resultado?.resultados)
    ? resultado.resultados
    : Array.isArray(resultado)
      ? resultado
      : []
}

// =====================================================
// CERRAR SESIÓN
// =====================================================

function cerrarSesion() {
  if (procesandoId.value !== null || cargandoDatos.value) return

  cerrarSesionAdmin()
  localStorage.removeItem('token')

  sesionIniciada.value = false
  mostrarFormulario.value = false
  moduloSeleccionado.value = ''

  mensajesEstudiantes.value = []
  mensajesProfesores.value = []
  recursos.value = []

  usuario.value = ''
  contrasena.value = ''
  mensaje.value = ''

  cancelarModeracion()
}
</script>
