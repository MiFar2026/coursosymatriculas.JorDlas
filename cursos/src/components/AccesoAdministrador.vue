
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
              @click="seleccionarModulo('escuelas')"
              class="rounded-xl border border-indigo-200 bg-indigo-50 p-6 text-left transition hover:bg-indigo-100"
            >
              <span class="mb-3 block text-3xl">🏫</span>
              <h3 class="text-xl font-bold text-gray-900">
                Escuelas y cursos
              </h3>
              <p class="mt-2 text-sm text-gray-700">
                Escuelas, cursos y grupos.
              </p>
              <span class="mt-4 block font-semibold text-indigo-800">
                Gestionar →
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
                Profesores y alumnos
              </h3>
              <p class="mt-2 text-sm text-gray-700">
                Personas y matrículas.
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

            <!-- DATOS DE LA ESCUELA -->
            <button
              type="button"
              @click="seleccionarModulo('datos')"
              class="rounded-xl border border-sky-200 bg-sky-50 p-6 text-left transition hover:bg-sky-100"
            >
              <span class="mb-3 block text-3xl">🗄️</span>
              <h3 class="text-xl font-bold text-gray-900">
                Datos de la escuela
              </h3>
              <p class="mt-2 text-sm text-gray-700">
                Consultar y mantener los datos.
              </p>
              <span class="mt-4 block font-semibold text-sky-800">
                Consultar →
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

        <!-- HORARIOS -->
        <section
          v-if="moduloSeleccionado === 'horarios'"
          class="mt-8"
        >
          <GestionHorariosAdmin />
        </section>

       
        <!-- ESCUELAS, CURSOS Y GRUPOS -->
        <section
          v-if="moduloSeleccionado === 'escuelas'"
          class="mt-8 rounded-xl border border-indigo-200 bg-white p-6"
        >
          <h3 class="text-2xl font-bold text-gray-900">
            Escuelas, cursos y grupos
          </h3>

          <p class="mt-2 text-gray-600">
            Desde aquí organizaremos las escuelas, los cursos y los grupos
            de clase de Biblioteca Joan Miró y Ateneu Aula 502.
          </p>

          <div class="mt-5 rounded-xl bg-indigo-50 p-4">
            <p class="font-semibold text-indigo-900">
              Base de datos: BaseDeDatosEscuelas
            </p>
            <p class="mt-1 text-sm text-indigo-800">
              La conexión para consultar, crear y editar estos datos
              se implementará a través de la API del servidor.
            </p>
          </div>

          <p class="mt-4 text-sm text-gray-500">
            Este apartado todavía necesita sus operaciones de gestión.
            No modifica ni elimina los datos actuales.
          </p>
        </section>

        <!-- PROFESORES, ALUMNOS Y MATRÍCULAS -->
        
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

    <button
      type="button"
      @click="cargarGestionProfesores"
      :disabled="cargandoDatos || procesandoId !== null"
      class="rounded-lg border px-4 py-2 disabled:opacity-50"
    >
      Actualizar
    </button>
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
  <div class="rounded-xl border p-5">
    <h4 class="mb-4 text-xl font-bold">Profesores registrados</h4>

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
  </div>

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
  <div class="rounded-xl border p-5">
    <div class="mb-4">
      <h4 class="text-xl font-bold">Asignación de profesores a grupos</h4>
      <p class="mt-1 text-sm text-gray-600">
        Elige un profesor para cada grupo. Puedes repetir el mismo profesor
        en diferentes cursos, turnos y escuelas.
      </p>
    </div>

    <div class="mb-4">
      <label for="filtro-escuela-grupos" class="mb-1 block font-medium">
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

    <p
      v-if="!cargandoDatos && gruposAdmin.length === 0"
      class="rounded-lg bg-gray-50 p-4 text-gray-600"
    >
      No hay grupos para mostrar con este filtro.
    </p>

    <article
      v-for="grupo in gruposAdmin"
      :key="grupo.grupo_id"
      class="mb-4 rounded-xl border p-4 last:mb-0"
    >
      <div class="mb-3">
        <h5 class="font-bold">{{ grupo.grupo }}</h5>
        <p class="mt-1 text-sm text-gray-600">
          {{ grupo.escuela }} · {{ grupo.curso }}
          <span v-if="grupo.idioma"> · {{ grupo.idioma }}</span>
          <span v-if="grupo.nivel"> · Nivel {{ grupo.nivel }}</span>
        </p>
        <p class="text-sm text-gray-600">
          Turno: {{ grupo.turno || 'No indicado' }}
          · Aula: {{ grupo.aula || 'No indicada' }}
        </p>
      </div>

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
        :disabled="procesandoId !== null || cargandoDatos || Number(grupo.grupo_activo) !== 1"
        class="w-full rounded-lg border px-3 py-2"
      >
        <option value="">Sin profesor asignado</option>
        <option
          v-for="profesor in profesoresAdmin.filter(p => Number(p.activo) === 1)"
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

        <!-- DATOS DE LA ESCUELA -->
        <section
          v-if="moduloSeleccionado === 'datos'"
          class="mt-8 rounded-xl border border-sky-200 bg-white p-6"
        >
          <h3 class="text-2xl font-bold text-gray-900">
            Datos de la escuela
          </h3>

          <p class="mt-2 text-gray-600">
            Apartado para consultar el estado de la información y las
            operaciones administrativas de la base de datos.
          </p>

          <div class="mt-5 rounded-xl bg-sky-50 p-4">
            <p class="font-semibold text-sky-900">
              Información centralizada
            </p>
            <p class="mt-1 text-sm text-sky-800">
              La aplicación consultará los datos mediante el backend,
              sin exponer las credenciales de MySQL en el navegador.
            </p>
          </div>

          <p class="mt-4 text-sm text-gray-500">
            Este apartado es informativo por ahora. No ejecuta consultas
            SQL ni modifica datos directamente.
          </p>
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
import { ref } from 'vue'

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

const foroAbierto = ref('estudiantes')

/* =====================================================
   GESTIÓN ADMINISTRATIVA DE PROFESORES Y GRUPOS
   ===================================================== */

const profesoresAdmin = ref([])
const gruposAdmin = ref([])
const profesorPorGrupo = ref({})
const filtroEscuelaGrupos = ref('')

const profesorEditando = ref(null)
const formProfesor = ref({})

const historialProfesorSeleccionado = ref(null)

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
}

}

function volverAlPanel() {
  if (procesandoId.value !== null) return

  moduloSeleccionado.value = ''
  mensaje.value = ''
  cancelarModeracion()
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
