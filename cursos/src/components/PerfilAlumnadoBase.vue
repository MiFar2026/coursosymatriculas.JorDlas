<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">
    <component :is="navbarComponent" />

    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div
        v-if="cargandoPerfil"
        role="status"
        class="mb-4 rounded-xl bg-teal-50 p-4 text-teal-900"
      >
        Cargando los datos del alumno...
      </div>

      <div
        v-else-if="errorPerfil"
        role="alert"
        class="mb-4 rounded-xl bg-rose-50 p-4 text-rose-900"
      >
        {{ errorPerfil }}
        <button
          type="button"
          @click="cargarPerfil"
          class="ml-2 font-bold underline"
        >
          Volver a intentar
        </button>
      </div>

      <!-- Cabecera -->
      <section
        class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800 via-teal-700 to-indigo-800 p-6 text-white shadow-xl sm:p-10"
      >
        <div
          class="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
        ></div>

        <div
          class="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p
              class="text-sm font-bold uppercase tracking-[0.2em] text-teal-100"
            >
              {{ escuela }}
            </p>

            <h1 class="mt-3 text-3xl font-extrabold sm:text-4xl">
              Mi espacio de alumno
            </h1>

            <p
              class="mt-3 max-w-xl text-sm leading-6 text-teal-50 sm:text-base"
            >
              Tus clases, trabajos, resultados, avisos y conversaciones
              con tu profesor, en un solo lugar.
            </p>
          </div>

          <div
            class="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur"
          >
            <div
              class="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-2xl font-extrabold text-teal-800"
            >
              <img
                v-if="fotoPerfil"
                :src="fotoPerfil"
                alt="Foto de perfil del alumno"
                class="h-full w-full object-cover"
              />
              <span v-else>{{ iniciales }}</span>
            </div>

            <div>
              <p class="text-lg font-bold">
                {{ alumno.nombre }} {{ alumno.apellidos }}
              </p>

              <p class="mt-1 text-sm text-teal-100">
                Espacio personal
              </p>

              <div class="mt-2 flex flex-wrap gap-2">
                <label
                  class="inline-block cursor-pointer rounded-lg bg-white px-3 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-50"
                >
                  Cambiar foto
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    class="hidden"
                    @change="seleccionarFoto"
                  />
                </label>

                <button
                  v-if="fotoPerfil"
                  type="button"
                  class="rounded-lg border border-white/40 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  @click="fotoPerfil = ''"
                >
                  Quitar foto
                </button>
              </div>

              <div>
                <button
                  type="button"
                  @click="cerrarSesion"
                  class="mt-3 rounded-xl bg-rose-600 px-4 py-3 font-bold text-white hover:bg-rose-700"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Navegación -->
      <nav
        class="mt-7 flex gap-2 overflow-x-auto pb-2"
        aria-label="Secciones del perfil"
      >
        <button
          v-for="item in secciones"
          :key="item.id"
          type="button"
@click="cambiarSeccion(item.id)"
          :aria-current="seccion === item.id ? 'page' : undefined"
          :class="[
            'shrink-0 rounded-xl px-4 py-3 text-sm font-bold transition',
            seccion === item.id
              ? 'bg-teal-700 text-white shadow-md'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-teal-50'
          ]"
        >
          <span class="mr-2">{{ item.icono }}</span>{{ item.nombre }}
        </button>
      </nav>

      <!-- Resumen -->
      <section v-if="seccion === 'inicio'" class="mt-7 space-y-6">
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article
            class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p class="text-sm font-medium text-slate-500">Mi clase</p>
            <p class="mt-3 text-xl font-extrabold text-teal-800">
              {{ alumno.clase }}
            </p>
            <p class="mt-2 text-sm text-slate-500">Grupo asignado</p>
          </article>

          <article
            class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p class="text-sm font-medium text-slate-500">Mi profesor</p>
            <p class="mt-3 text-xl font-extrabold text-indigo-800">
              {{ alumno.profesor }}
            </p>
            <p class="mt-2 text-sm text-slate-500">Profesor asignado</p>
          </article>

          <article
            class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p class="text-sm font-medium text-slate-500">Trabajos</p>
            <p class="mt-3 text-xl font-extrabold text-amber-700">
              {{ trabajos.length }}
            </p>
            <p class="mt-2 text-sm text-slate-500">
              En esta vista de demostración
            </p>
          </article>

          <article
            class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p class="text-sm font-medium text-slate-500">Avisos privados</p>
            <p class="mt-3 text-xl font-extrabold text-rose-700">
              {{ avisos.length }}
            </p>
            <p class="mt-2 text-sm text-slate-500">Datos de ejemplo</p>
          </article>
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
          <article
            class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <p
                  class="text-sm font-bold uppercase tracking-wider text-teal-700"
                >
                  Mi aprendizaje
                </p>
                <h2 class="mt-1 text-2xl font-extrabold">
                  Bienvenido a tu perfil
                </h2>
              </div>
              <span class="text-3xl">📚</span>
            </div>

            <p class="mt-4 leading-7 text-slate-600">
              Aquí podrás consultar la información de tu curso, enviar tus
              actividades, revisar las correcciones y comunicarte con tu profesor.
            </p>

            <div class="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                @click="seccion = 'trabajos'"
                class="rounded-xl bg-teal-50 p-4 text-left hover:bg-teal-100"
              >
                <span class="text-2xl">📤</span>
                <p class="mt-2 font-bold text-teal-900">
                  Entregar un trabajo
                </p>
                <p class="mt-1 text-sm text-slate-600">
                  Preparar una nueva entrega
                </p>
              </button>

              <button
                type="button"
                @click="seccion = 'mensajes'"
                class="rounded-xl bg-indigo-50 p-4 text-left hover:bg-indigo-100"
              >
                <span class="text-2xl">💬</span>
                <p class="mt-2 font-bold text-indigo-900">
                  Hablar con mi profesor
                </p>
                <p class="mt-1 text-sm text-slate-600">
                  Consultar la mensajería
                </p>
              </button>
            </div>
          </article>

          <article
            class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p
              class="text-sm font-bold uppercase tracking-wider text-amber-700"
            >
              Mi profesor
            </p>
            <div
              class="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-2xl"
            >
              👩‍🏫
            </div>
            <h2 class="mt-3 text-lg font-extrabold">
              {{ alumno.profesor }}
            </h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Este será el espacio para consultar la información del profesor
              asignado a tu grupo.
            </p>
            <button
              type="button"
              @click="seccion = 'mensajes'"
              class="mt-5 font-bold text-teal-800 hover:underline"
            >
              Ir a mensajes →
            </button>
          </article>
        </div>
      </section>

      <!-- Mi perfil -->
      <section
        v-else-if="seccion === 'perfil'"
        class="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div>
          <p
            class="text-sm font-bold uppercase tracking-wider text-teal-700"
          >
            Datos personales
          </p>
          <h2 class="mt-1 text-2xl font-extrabold">Mi perfil</h2>
          <p class="mt-2 text-sm text-slate-500">
            Puedes modificar tu correo electrónico y teléfono. Los demás datos
            son de solo lectura.
          </p>
        </div>

        <form
          class="mt-7 grid gap-5 sm:grid-cols-2"
          @submit.prevent="guardarPerfil"
        >
          <label class="block">
            <span class="mb-2 block text-sm font-bold">Nombre</span>
            <input
              :value="alumno.nombre"
              readonly
              class="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-600"
            />
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-bold">Apellidos</span>
            <input
              :value="alumno.apellidos"
              readonly
              class="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-600"
            />
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-bold">
              Documento de identidad
            </span>
            <input
              :value="alumno.documento"
              readonly
              class="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-600"
            />
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-bold">Clase asignada</span>
            <input
              :value="alumno.clase"
              readonly
              class="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-600"
            />
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-bold">
              Correo electrónico
            </span>
            <input
              v-model.trim="formPerfil.email"
              type="email"
              required
              autocomplete="email"
              class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-bold">Teléfono</span>
            <input
              v-model.trim="formPerfil.telefono"
              type="tel"
              autocomplete="tel"
              class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />
          </label>

          <div class="sm:col-span-2">
            <p
              v-if="mensajePerfil"
              class="mb-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900"
            >
              {{ mensajePerfil }}
            </p>
            <button
              type="submit"
              class="rounded-xl bg-teal-700 px-6 py-3 font-bold text-white hover:bg-teal-800"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </section>

      <!-- Clase -->
      <section
        v-else-if="seccion === 'clase'"
        class="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <p class="text-sm font-bold uppercase tracking-wider text-indigo-700">
          Mi formación
        </p>
        <h2 class="mt-1 text-2xl font-extrabold">
          Mi clase y mi profesor
        </h2>

        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl bg-indigo-50 p-5">
            <p class="text-sm text-indigo-700">Curso asignado</p>
            <p class="mt-2 text-xl font-extrabold">{{ alumno.clase }}</p>
          </div>
          <div class="rounded-2xl bg-teal-50 p-5">
            <p class="text-sm text-teal-700">Profesor asignado</p>
            <p class="mt-2 text-xl font-extrabold">{{ alumno.profesor }}</p>
          </div>
        </div>

        <div class="mt-6 rounded-xl border border-slate-200 p-5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h3 class="font-bold">Horario del curso</h3>
            <span
              class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
            >
              Solo lectura
            </span>
          </div>

          <p v-if="cargandoHorario" class="mt-3 text-sm text-slate-500">
            Cargando horario...
          </p>

          <p v-else-if="errorHorario" class="mt-3 text-sm text-red-600">
            {{ errorHorario }}
          </p>

          <p
            v-else-if="horarios.length === 0"
            class="mt-3 text-sm text-slate-500"
          >
            Todavía no hay horarios asignados a tu grupo.
          </p>

          <div v-else class="mt-4 space-y-3">
            <div
              v-for="horario in horarios"
              :key="horario.id"
              class="flex flex-col justify-between gap-1 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center"
            >
              <span class="font-semibold text-slate-800">
                {{ horario.dia_semana }}
              </span>
              <span class="text-sm text-slate-600">
                {{ horario.hora_inicio }} – {{ horario.hora_fin }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- RECURSOS DEL ALUMNO -->
<section
  v-else-if="seccion === 'recursos'"
  class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
>
  <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
    <div>
      <h2 class="text-2xl font-bold text-slate-800">
        Recursos de aprendizaje
      </h2>

      <p class="mt-2 text-sm text-slate-600">
        Consulta los materiales publicados por tus profesores
        para tu escuela y grupo.
      </p>
    </div>

    <button
      type="button"
      @click="cargarRecursosAlumno"
      :disabled="cargandoRecursos"
      class="rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {{ cargandoRecursos ? 'Cargando...' : 'Actualizar recursos' }}
    </button>
  </div>

  <p
    v-if="cargandoRecursos"
    class="py-6 text-center text-slate-600"
  >
    Cargando recursos...
  </p>

  <div
    v-else-if="errorRecursos"
    class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
  >
    <p>{{ errorRecursos }}</p>

    <button
      type="button"
      @click="cargarRecursosAlumno"
      class="mt-3 font-bold underline"
    >
      Intentar de nuevo
    </button>
  </div>

  <div
    v-else-if="recursosAlumno.length === 0"
    class="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center"
  >
    <p class="font-semibold text-slate-700">
      Todavía no hay recursos publicados para tu grupo.
    </p>

    <p class="mt-2 text-sm text-slate-500">
      Cuando tus profesores publiquen materiales, aparecerán aquí.
    </p>
  </div>

  <div v-else class="grid gap-4 md:grid-cols-2">
    <article
      v-for="recurso in recursosAlumno"
      :key="recurso.id"
      class="rounded-xl border border-slate-200 p-5 transition hover:border-teal-300 hover:bg-teal-50/30"
    >
      <h3 class="text-lg font-bold text-slate-800">
        {{ recurso.titulo }}
      </h3>

      <p
        v-if="recurso.descripcion"
        class="mt-2 whitespace-pre-line text-sm text-slate-600"
      >
        {{ recurso.descripcion }}
      </p>

      <div class="mt-4 space-y-1 text-sm text-slate-500">
        <p v-if="recurso.curso">
          <strong>Curso:</strong>
          {{ recurso.curso }}
          <span v-if="recurso.nivel"> · {{ recurso.nivel }}</span>
        </p>

        <p v-if="recurso.grupo">
          <strong>Grupo:</strong> {{ recurso.grupo }}
        </p>

        <p v-if="recurso.profesor_nombre || recurso.profesor_apellidos">
          <strong>Profesor/a:</strong>
          {{ recurso.profesor_nombre }}
          {{ recurso.profesor_apellidos }}
        </p>
      </div>

      <a
        v-if="recurso.url"
        :href="recurso.url"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-5 inline-flex rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-800"
      >
        Abrir recurso
      </a>

     <a
  v-else-if="recurso.ruta_archivo"
  :href="`http://localhost:5555${recurso.ruta_archivo}`"
  target="_blank"
  rel="noopener noreferrer"
  class="mt-5 inline-flex rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-800"
>
  Abrir archivo
</a>
    </article>
  </div>
</section> 

      <!-- Trabajos -->
      <section
        v-else-if="seccion === 'trabajos'"
        class="mt-7 space-y-6"
      >
        <div
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <p class="text-sm font-bold uppercase tracking-wider text-teal-700">
            Actividades
          </p>
          <h2 class="mt-1 text-2xl font-extrabold">Entregar un trabajo</h2>
          <p class="mt-2 leading-6 text-slate-600">
            Selecciona los archivos que quieras entregar. Puedes preparar documentos,
            imágenes, audio o vídeo.
          </p>

          <form
            class="mt-6 space-y-5"
            @submit.prevent="enviarEntrega"
          >
            <label class="block">
              <span class="mb-2 block text-sm font-bold">
                Título del trabajo
              </span>
              <input
                v-model.trim="formEntrega.titulo"
                required
                maxlength="150"
                placeholder="Ej.: Actividad de la unidad 2"
                class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-bold">
                Comentario para el profesor (opcional)
              </span>
              <textarea
                v-model.trim="formEntrega.comentario"
                rows="3"
                maxlength="2000"
                placeholder="Puedes explicar algo sobre tu entrega..."
                class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              ></textarea>
            </label>

            <label
              class="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-teal-300 bg-teal-50 px-5 py-8 text-center hover:bg-teal-100"
            >
              <span class="text-4xl">📎</span>
              <span class="mt-3 font-bold text-teal-900">
                Seleccionar archivos
              </span>
              <span class="mt-2 text-sm text-slate-600">
                JPG, PNG, PDF, DOC, DOCX, MP3 o MP4
              </span>
              <input
                ref="inputArchivos"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.mp3,.mp4"
                class="sr-only"
                @change="seleccionarArchivos"
              />
            </label>

            <ul v-if="archivos.length" class="space-y-2">
              <li
                v-for="(archivo, index) in archivos"
                :key="archivo.nombre + index"
                class="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3"
              >
                <span class="min-w-0 break-all text-sm">
                  {{ archivo.nombre }}
                </span>
                <button
                  type="button"
                  @click="quitarArchivo(index)"
                  class="shrink-0 text-sm font-bold text-rose-700 hover:underline"
                >
                  Quitar
                </button>
              </li>
            </ul>

            <p
              v-if="mensajeEntrega"
              role="status"
              class="rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900"
            >
              {{ mensajeEntrega }}
            </p>

            <button
              type="submit"
              :disabled="enviandoEntrega"
              class="rounded-xl bg-teal-700 px-6 py-3 font-bold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {{ enviandoEntrega ? 'Enviando...' : 'Enviar trabajo' }}
            </button>
          </form>

          <p class="mt-5 text-xs leading-5 text-slate-500">
            Puedes adjuntar hasta 10 archivos por envío. Cada archivo puede ocupar
            un máximo de 25 MB. Los trabajos enviados aparecerán en «Mis entregas».
          </p>
        </div>

        <div
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h3 class="text-xl font-extrabold">Mis entregas</h3>
            <button
              type="button"
              @click="cargarEntregas"
              :disabled="cargandoEntregas"
              class="text-sm font-bold text-teal-700 hover:underline disabled:opacity-50"
            >
              {{ cargandoEntregas ? 'Actualizando...' : 'Actualizar' }}
            </button>
          </div>

          <p v-if="cargandoEntregas" class="mt-4 text-sm text-slate-600">
            Cargando tus entregas...
          </p>

          <p
            v-else-if="errorEntregas"
            role="alert"
            class="mt-4 rounded-xl bg-rose-50 p-4 text-sm text-rose-800"
          >
            {{ errorEntregas }}
          </p>

          <p
            v-else-if="trabajos.length === 0"
            class="mt-4 text-sm leading-6 text-slate-600"
          >
            Todavía no tienes trabajos enviados.
          </p>

          <ul v-else class="mt-5 space-y-4">
            <li
              v-for="trabajo in trabajos"
              :key="trabajo.id"
              class="rounded-xl border border-slate-200 p-4"
            >
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div class="min-w-0">
                  <h4 class="break-words font-bold text-slate-900">
                    {{ trabajo.titulo }}
                  </h4>
                  <p class="mt-1 break-all text-sm text-slate-600">
                    Archivo: {{ trabajo.nombre_archivo || 'No disponible' }}
                  </p>
                  <p class="mt-1 text-xs text-slate-500">
                    Enviado: {{ formatearFecha(trabajo.fecha_envio) }}
                  </p>
                </div>

                <span
                  class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700"
                >
                  {{ etiquetaEstado(trabajo.estado) }}
                </span>
              </div>

              <p
                v-if="trabajo.comentario"
                class="mt-3 whitespace-pre-line text-sm text-slate-700"
              >
                <strong>Tu comentario:</strong>
                {{ trabajo.comentario }}
              </p>

              <div
                v-if="trabajo.comentario_profesor || trabajo.nombre_archivo_corregido"
                class="mt-4 rounded-xl bg-teal-50 p-4"
              >
                <p class="font-bold text-teal-900">
                  Corrección del profesor
                </p>

                <p
                  v-if="trabajo.comentario_profesor"
                  class="mt-2 whitespace-pre-line text-sm leading-6 text-teal-900"
                >
                  {{ trabajo.comentario_profesor }}
                </p>

                <p
                  v-if="trabajo.nombre_archivo_corregido"
                  class="mt-2 break-all text-sm text-teal-900"
                >
                  Archivo corregido: {{ trabajo.nombre_archivo_corregido }}
                </p>

                <p
                  v-if="trabajo.fecha_revision"
                  class="mt-2 text-xs text-teal-800"
                >
                  Revisado: {{ formatearFecha(trabajo.fecha_revision) }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- Resultados -->
      
<!-- Resultados -->
<section
  v-else-if="seccion === 'resultados'"
  class="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
>
  <div class="flex flex-wrap items-center justify-between gap-3">
    <div>
      <p class="text-sm font-bold uppercase tracking-wider text-indigo-700">
        Evaluación
      </p>
      <h2 class="mt-1 text-2xl font-extrabold">Mis resultados</h2>
      <p class="mt-2 text-sm text-slate-600">
        Consulta las notas y las correcciones publicadas por tus profesores.
      </p>
    </div>

    <button
      type="button"
      @click="cargarResultadosAlumno"
      :disabled="cargandoResultados"
      class="rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-800 disabled:opacity-50"
    >
      {{ cargandoResultados ? 'Actualizando...' : 'Actualizar resultados' }}
    </button>
  </div>

  <p
    v-if="cargandoResultados"
    role="status"
    class="mt-6 rounded-xl bg-indigo-50 p-5 text-sm text-indigo-800"
  >
    Cargando tus resultados...
  </p>

  <div
    v-else-if="errorResultados"
    role="alert"
    class="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800"
  >
    <p>{{ errorResultados }}</p>
    <button
      type="button"
      @click="cargarResultadosAlumno"
      class="mt-3 font-bold underline"
    >
      Intentar de nuevo
    </button>
  </div>

  <div
    v-else-if="resultadosAlumno.length === 0"
    class="mt-6 rounded-xl bg-indigo-50 p-5"
  >
    <p class="font-bold text-indigo-900">
      Todavía no hay resultados para mostrar
    </p>
    <p class="mt-2 text-sm leading-6 text-slate-600">
      Cuando tu profesor publique las notas de tus actividades o exámenes,
      podrás consultarlas aquí.
    </p>
  </div>

  <div v-else class="mt-6 space-y-4">
    <article
      v-for="resultado in resultadosAlumno"
      :key="resultado.id"
      class="rounded-xl border border-slate-200 p-5"
    >
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 class="text-lg font-bold text-slate-900">
            {{ resultado.titulo }}
          </h3>
          <p class="mt-1 text-sm text-slate-600">
            {{ resultado.nombre_curso }}
            <span v-if="resultado.nombre_grupo">
              · {{ resultado.nombre_grupo }}
            </span>
          </p>
          <p class="mt-1 text-xs text-slate-500">
            {{ resultado.tipo }} ·
            {{ formatearFecha(resultado.fecha_resultado) }}
          </p>
        </div>

        
<div class="rounded-xl bg-indigo-50 px-4 py-3 text-center">
  <p class="text-xs font-semibold text-indigo-700">Nota</p>

  <p class="text-2xl font-extrabold text-indigo-900">
    {{ resultado.nota }}
    <span class="text-sm font-semibold">/ 10</span>
  </p>

  <!-- Decisión de APTO / NO APTO para la nota final -->
  <div
    v-if="resultado.tipo === 'FINAL' && resultado.decision_apto"
    class="mt-3"
  >
    <span
      :class="resultado.decision_apto === 'APTO'
        ? 'bg-emerald-100 text-emerald-800'
        : 'bg-rose-100 text-rose-800'"
      class="inline-flex rounded-full px-3 py-1.5 text-sm font-bold"
    >
      {{ resultado.decision_apto === 'APTO' ? 'APTO' : 'NO APTO' }}
    </span>
  </div>
</div>

      </div>

      <p
        v-if="resultado.comentario"
        class="mt-4 whitespace-pre-line rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700"
      >
        <strong>Comentario del profesor:</strong>
        {{ resultado.comentario }}
      </p>


      <a
        v-if="resultado.nombre_archivo_corregido"
        :href="`${API_BASE}/api/resultados/alumno/${resultado.id}/archivo`"
        class="mt-4 inline-flex rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-800"
      >
        Descargar archivo corregido
      </a>
    </article>
  </div>
</section>


    
<!-- Avisos -->
<section
  v-else-if="seccion === 'avisos'"
  class="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
>
  <div class="flex flex-wrap items-center justify-between gap-3">
    <div>
      <p class="text-sm font-bold uppercase tracking-wider text-amber-700">
        Información de tu clase
      </p>

      <h2 class="mt-1 text-2xl font-extrabold">
        Mis avisos
      </h2>

      <p class="mt-2 text-sm leading-6 text-slate-600">
        Consulta los avisos de tu profesor y los mensajes dirigidos a ti.
      </p>
    </div>

    <button
      type="button"
      @click="cargarAvisos"
      :disabled="cargandoAvisos"
      class="rounded-xl border border-amber-300 px-4 py-2 text-sm font-bold text-amber-800 hover:bg-amber-50 disabled:opacity-50"
    >
      {{ cargandoAvisos ? 'Actualizando...' : 'Actualizar avisos' }}
    </button>
  </div>

  <p
    v-if="cargandoAvisos"
    role="status"
    class="mt-6 rounded-xl bg-slate-50 p-5 text-sm text-slate-600"
  >
    Cargando tus avisos...
  </p>

  <div
    v-else-if="errorAvisos"
    role="alert"
    class="mt-6 rounded-xl bg-rose-50 p-5 text-sm text-rose-800"
  >
    <p>{{ errorAvisos }}</p>

    <button
      type="button"
      @click="cargarAvisos"
      class="mt-3 font-bold underline"
    >
      Intentar de nuevo
    </button>
  </div>

  <div v-else-if="avisos.length" class="mt-6 space-y-4">
    <article
      v-for="aviso in avisos"
      :key="aviso.id"
      class="rounded-xl border border-amber-200 bg-amber-50 p-5"
    >
      <div class="flex flex-wrap items-start justify-between gap-2">
        <h3 class="text-lg font-bold text-slate-900">
          {{ aviso.titulo }}
        </h3>

        <span
          class="rounded-full bg-white px-3 py-1 text-xs font-bold text-amber-800"
        >
          {{ aviso.destinatario === 'INDIVIDUAL'
            ? 'Privado para ti'
            : 'Aviso de clase' }}
        </span>
      </div>

      <p class="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">
        {{ aviso.mensaje || aviso.texto }}
      </p>

      <div class="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
        <span>
          Tipo:
          {{ aviso.tipo === 'PERMANENTE' ? 'Permanente' : 'Temporal' }}
        </span>

        <span v-if="aviso.fecha_publicacion">
          Publicado:
          {{ formatearFecha(aviso.fecha_publicacion) }}
        </span>

        <span v-if="aviso.grupo_nombre">
          Grupo: {{ aviso.grupo_nombre }}
        </span>
      </div>
    </article>
  </div>

  <p
    v-else
    class="mt-6 rounded-xl bg-slate-50 p-5 text-sm leading-6 text-slate-600"
  >
    No tienes avisos disponibles en este momento.
  </p>
</section>


      <!-- Mensajes -->
      <section
        v-else-if="seccion === 'mensajes'"
        class="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <p class="text-sm font-bold uppercase tracking-wider text-indigo-700">
          Comunicación
        </p>
        <h2 class="mt-1 text-2xl font-extrabold">
          Mensajes de mi profesor
        </h2>

        <div class="mt-6 rounded-2xl bg-slate-50 p-5">
          <div class="flex items-center gap-3">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-xl"
            >
              👩‍🏫
            </div>
            <div>
              <p class="font-bold">{{ alumno.profesor }}</p>
              <p class="text-sm text-slate-500">Profesor asignado</p>
            </div>
          </div>

          <p class="mt-5 text-sm leading-6 text-slate-600">
            Aquí se mostrarán las conversaciones y los mensajes privados.
            En esta primera versión el envío de mensajes aún no está conectado.
          </p>
        </div>

        <form
          class="mt-5 space-y-3"
          @submit.prevent="prepararMensaje"
        >
          <label class="block">
            <span class="mb-2 block text-sm font-bold">
              Escribe tu mensaje
            </span>
            <textarea
              v-model.trim="textoMensaje"
              rows="4"
              maxlength="3000"
              placeholder="Escribe aquí tu consulta..."
              class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            ></textarea>
          </label>

          <p
            v-if="mensajeChat"
            role="status"
            class="rounded-xl bg-amber-50 p-4 text-sm text-amber-900"
          >
            {{ mensajeChat }}
          </p>

          <button
            type="submit"
            class="rounded-xl bg-indigo-700 px-6 py-3 font-bold text-white hover:bg-indigo-800"
          >
            Preparar mensaje
          </button>
        </form>
      </section>

      
      <footer class="py-8 text-center text-xs text-slate-500">
        {{ escuela }} · Espacio del alumnado
      </footer>

    </main>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed, reactive, ref, watch, onMounted } from 'vue'

const API_BASE = (
  import.meta.env.VITE_API_URL || 'http://localhost:5555'
).replace(/\/+$/, '')


const router = useRouter()
const route = useRoute()

function irAlForo() {
  const destino = route.path.startsWith('/joanmiro')
    ? '/joanmiro/alumnos/foro'
    : '/ateneu/alumnos/foro'

  router.push(destino)
}

const props = defineProps({
  escuela: {
    type: String,
    required: true
  },
  navbarComponent: {
    type: [Object, Function],
    required: true
  }
})

// Navegación
const seccion = ref('inicio')

const secciones = [
  { id: 'inicio', nombre: 'Inicio', icono: '🏠' },
  { id: 'perfil', nombre: 'Mi perfil', icono: '👤' },
  { id: 'clase', nombre: 'Mi clase', icono: '📚' },
  { id: 'recursos', nombre: 'Recursos', icono: '📂' },
  { id: 'trabajos', nombre: 'Trabajos', icono: '📤' },
  { id: 'resultados', nombre: 'Resultados', icono: '📊' },
  { id: 'avisos', nombre: 'Avisos', icono: '🔔' },
  { id: 'mensajes', nombre: 'Mensajes', icono: '💬' },
  { id: 'foro', nombre: 'Foro', icono: '🗣️' }
]

// Foto de perfil
const fotoPerfil = ref('')

function seleccionarFoto(evento) {
  const archivo = evento.target.files?.[0]

  if (!archivo) return

  const tiposPermitidos = [
    'image/jpeg',
    'image/png',
    'image/webp'
  ]

  if (!tiposPermitidos.includes(archivo.type)) {
    alert('Selecciona una imagen JPG, PNG o WebP.')
    evento.target.value = ''
    return
  }

  if (archivo.size > 5 * 1024 * 1024) {
    alert('La foto no puede superar los 5 MB.')
    evento.target.value = ''
    return
  }

  const lector = new FileReader()

  lector.onload = () => {
    if (typeof lector.result === 'string') {
      fotoPerfil.value = lector.result
    }
  }

  lector.onerror = () => {
    alert('No se ha podido leer la imagen.')
  }

  lector.readAsDataURL(archivo)
}

// Datos del alumno
const alumno = reactive({
  id: null,
  nombre: 'Cargando...',
  apellidos: '',
  documento: '',
  email: '',
  telefono: '',
  clase: 'Cargando...',
  grupo: '',
  aula: '',
  escuelaReal: '',
  profesor: 'Cargando...',
  estadoMatricula: ''
})

const iniciales = computed(() => {
  const nombre = alumno.nombre || ''
  const apellidos = alumno.apellidos || ''

  return `${nombre.charAt(0)}${apellidos.charAt(0)}`.toUpperCase()
})

// Estado del perfil
const cargandoPerfil = ref(true)
const errorPerfil = ref('')
const mensajePerfil = ref('')
const recursosAlumno = ref([])
const cargandoRecursos = ref(false)
const errorRecursos = ref('')

const formPerfil = reactive({
  email: '',
  telefono: ''
})

// Horarios
const horarios = ref([])
const cargandoHorario = ref(false)
const errorHorario = ref('')

// Trabajos y entregas
const formEntrega = reactive({
  titulo: '',
  comentario: ''
})

const inputArchivos = ref(null)
const archivos = ref([])
const mensajeEntrega = ref('')
const enviandoEntrega = ref(false)
const cargandoEntregas = ref(false)
const errorEntregas = ref('')
const trabajos = ref([])
// Resultados y calificaciones del alumno
const resultadosAlumno = ref([])
const cargandoResultados = ref(false)
const errorResultados = ref('')

const extensionesPermitidas = [
  'jpg',
  'jpeg',
  'png',
  'pdf',
  'doc',
  'docx',
  'mp3',
  'mp4'
]

// Avisos y mensajes
// Avisos y mensajes
const avisos = ref([])
const cargandoAvisos = ref(false)
const errorAvisos = ref('')
const textoMensaje = ref('')
const mensajeChat = ref('')


// Cargar perfil del alumno
async function cargarPerfil() {
  cargandoPerfil.value = true
  errorPerfil.value = ''

  try {
    const respuesta = await fetch(
      `${API_BASE}/api/perfil-alumno/me`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json'
        }
      }
    )

    const resultado = await respuesta.json().catch(() => ({}))

    if (!respuesta.ok || !resultado.ok) {
      throw new Error(
        resultado.mensaje || 'No se pudo cargar el perfil.'
      )
    }

    const datos = resultado.datos

    alumno.id = datos.id
    alumno.nombre = datos.nombre || ''
    alumno.apellidos = datos.apellidos || ''
    alumno.documento = datos.documento || ''
    alumno.email = datos.email || ''
    alumno.telefono = datos.telefono || ''
    alumno.clase = datos.curso || 'Sin curso asignado'
    alumno.grupo = datos.grupo || ''
    alumno.aula = datos.aula || ''
    alumno.escuelaReal = datos.escuela || ''

    alumno.profesor = [
      datos.profesor_nombre,
      datos.profesor_apellidos
    ]
      .filter(Boolean)
      .join(' ') || 'Sin profesor asignado'

    alumno.estadoMatricula = datos.estado_matricula || ''

    formPerfil.email = alumno.email
    formPerfil.telefono = alumno.telefono
  } catch (error) {
    console.error('Error al cargar el perfil:', error)

    errorPerfil.value =
      error.message || 'No se pudo cargar el perfil.'
  } finally {
    cargandoPerfil.value = false
  }
}

// Cargar Recursos

async function cargarRecursosAlumno() {
  cargandoRecursos.value = true
  errorRecursos.value = ''

  try {
    const respuesta = await fetch(
      `${API_BASE}/api/escuelas/recursos/alumno`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json'
        }
      }
    )

    const resultado = await respuesta.json().catch(() => ({}))

    if (!respuesta.ok || !resultado.ok) {
      throw new Error(
        resultado.mensaje || 'No se pudieron cargar los recursos.'
      )
    }

    recursosAlumno.value = Array.isArray(resultado.datos)
      ? resultado.datos
      : []
  } catch (error) {
    console.error('Error al cargar los recursos:', error)

    errorRecursos.value =
      error.message || 'No se pudieron cargar los recursos.'
  } finally {
    cargandoRecursos.value = false
  }
} 

// Cargar horario
async function cargarHorario() {
  cargandoHorario.value = true
  errorHorario.value = ''

  try {
    const respuesta = await fetch(
      `${API_BASE}/api/horarios/mi-horario`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json'
        }
      }
    )

    const resultado = await respuesta.json().catch(() => ({}))

    if (!respuesta.ok || !resultado.ok) {
      throw new Error(
        resultado.mensaje || 'No se pudo cargar el horario.'
      )
    }

    horarios.value = Array.isArray(resultado.datos)
      ? resultado.datos
      : []
  } catch (error) {
    console.error('Error al cargar el horario:', error)

    errorHorario.value =
      error.message || 'No se pudo cargar el horario.'
  } finally {
    cargandoHorario.value = false
  }
}

// Cargar entregas anteriores
async function cargarEntregas() {
  if (cargandoEntregas.value) return

  cargandoEntregas.value = true
  errorEntregas.value = ''

  try {
    const respuesta = await fetch(
      `${API_BASE}/api/tareas`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json'
        }
      }
    )

    const resultado = await respuesta.json().catch(() => ({}))

    if (!respuesta.ok || !resultado.ok) {
      throw new Error(
        resultado.mensaje || 'No se pudieron cargar tus entregas.'
      )
    }

    trabajos.value = Array.isArray(resultado.datos)
      ? resultado.datos
      : []
  } catch (error) {
    console.error('Error al cargar las entregas:', error)

    errorEntregas.value =
      error.message || 'No se pudieron cargar tus entregas.'
  } finally {
    cargandoEntregas.value = false
  }
}


async function cargarResultadosAlumno() {
  if (cargandoResultados.value) return

  cargandoResultados.value = true
  errorResultados.value = ''

  try {
    const respuesta = await fetch(
      `${API_BASE}/api/resultados/alumno`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json'
        }
      }
    )

    const resultado = await respuesta.json().catch(() => ({}))

    if (!respuesta.ok || !resultado.ok) {
      throw new Error(
        resultado.mensaje || 'No se pudieron cargar tus resultados.'
      )
    }

    resultadosAlumno.value = Array.isArray(resultado.datos)
      ? resultado.datos
      : []
  } catch (error) {
    console.error('Error al cargar los resultados:', error)

    errorResultados.value =
      error.message || 'No se pudieron cargar tus resultados.'
  } finally {
    cargandoResultados.value = false
  }
}

/**
 * Carga los avisos correspondientes al alumno autenticado.
 */
async function cargarAvisos() {
  if (cargandoAvisos.value) return

  cargandoAvisos.value = true
  errorAvisos.value = ''

  try {
    const respuesta = await fetch(
      `${API_BASE}/api/avisos/mis-avisos`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json'
        }
      }
    )

    const resultado = await respuesta.json().catch(() => ({}))

    if (!respuesta.ok || !resultado.ok) {
      throw new Error(
        resultado.mensaje || 'No se pudieron cargar los avisos.'
      )
    }

    avisos.value = Array.isArray(resultado.avisos)
  ? resultado.avisos
  : []
  } catch (error) {
    console.error('Error al cargar los avisos:', error)

    errorAvisos.value =
      error.message || 'No se pudieron cargar los avisos.'
  } finally {
    cargandoAvisos.value = false
  }
}

// Cerrar sesión
async function cerrarSesion() {
  try {
    const respuesta = await fetch(
      `${API_BASE}/api/acceso-alumno/logout`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json'
        }
      }
    )

    if (!respuesta.ok) {
      throw new Error('No se ha podido cerrar la sesión.')
    }

    window.location.href =
      props.escuela === 'Ateneu Aula 502'
        ? '/ateneu/alumnos/acceso?destino=/ateneu/alumnos/perfil'
        : '/joanmiro/alumnos/acceso?destino=/joanmiro/alumnos/perfil'
  } catch (error) {
    console.error('Error al cerrar sesión:', error)

    alert('No se ha podido cerrar la sesión. Inténtalo de nuevo.')
  }
}

// Guardar perfil: por ahora solo actualiza la vista local
async function guardarPerfil() {
  mensajePerfil.value = ''

  try {
    const respuesta = await fetch(
      'http://localhost:5555/api/perfil-alumno/me',
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formPerfil.email,
          telefono: formPerfil.telefono
        })
      }
    )

    const resultado = await respuesta.json()

    if (!respuesta.ok || !resultado.ok) {
      throw new Error(
        resultado.mensaje || 'No se han podido guardar los cambios.'
      )
    }

    // Actualizar los datos visibles con los confirmados por el servidor.
    alumno.email = resultado.datos.email
    alumno.telefono = resultado.datos.telefono || ''

    formPerfil.email = resultado.datos.email
    formPerfil.telefono = resultado.datos.telefono || ''

    mensajePerfil.value =
      resultado.mensaje || 'Los cambios se han guardado correctamente.'
  } catch (error) {
    console.error('Error al guardar el perfil:', error)

    mensajePerfil.value =
      error.message || 'No se han podido guardar los cambios.'
  }
}

// Seleccionar archivos para la entrega
function seleccionarArchivos(evento) {
  const seleccionados = Array.from(evento.target.files || [])
  const disponibles = Math.max(0, 10 - archivos.value.length)
  const candidatos = seleccionados.slice(0, disponibles)

  const validos = []
  const rechazados = []

  if (seleccionados.length > disponibles) {
    rechazados.push(
      `Solo puedes añadir ${disponibles} archivo(s) más. El máximo es 10`
    )
  }

  for (const archivo of candidatos) {
    const extension = archivo.name.split('.').pop().toLowerCase()

    if (!extensionesPermitidas.includes(extension)) {
      rechazados.push(`${archivo.name} (formato no permitido)`)
      continue
    }

    if (archivo.size > 25 * 1024 * 1024) {
      rechazados.push(`${archivo.name} (supera 25 MB)`)
      continue
    }

    validos.push({
      nombre: archivo.name,
      archivo
    })
  }

  archivos.value = [...archivos.value, ...validos]

  mensajeEntrega.value = rechazados.length
    ? `No se han añadido estos archivos: ${rechazados.join(', ')}.`
    : ''

  // Permite volver a seleccionar el mismo archivo.
  if (inputArchivos.value) {
    inputArchivos.value.value = ''
  }
}

// Quitar archivo seleccionado
function quitarArchivo(indice) {
  archivos.value.splice(indice, 1)
}

// Enviar trabajo al backend
async function enviarEntrega() {
  if (enviandoEntrega.value) return

  const titulo = formEntrega.titulo.trim()
  const comentario = formEntrega.comentario.trim()

  if (!titulo) {
    mensajeEntrega.value = 'Escribe el título del trabajo.'
    return
  }

  if (titulo.length > 200) {
    mensajeEntrega.value =
      'El título no puede superar los 200 caracteres.'
    return
  }

  if (comentario.length > 2000) {
    mensajeEntrega.value =
      'El comentario no puede superar los 2000 caracteres.'
    return
  }

  if (!archivos.value.length) {
    mensajeEntrega.value = 'Selecciona al menos un archivo.'
    return
  }

  if (archivos.value.length > 10) {
    mensajeEntrega.value =
      'Puedes enviar un máximo de 10 archivos por entrega.'
    return
  }

  const formulario = new FormData()

  formulario.append('titulo', titulo)
  formulario.append('comentario', comentario)

  for (const elemento of archivos.value) {
    formulario.append('archivos', elemento.archivo)
  }

  enviandoEntrega.value = true
  mensajeEntrega.value = ''

  try {
    const respuesta = await fetch(
      `${API_BASE}/api/tareas`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json'
        },
        body: formulario
      }
    )

    const resultado = await respuesta.json().catch(() => ({}))

    if (!respuesta.ok || !resultado.ok) {
      throw new Error(
        resultado.mensaje || 'No se pudo enviar el trabajo.'
      )
    }

    formEntrega.titulo = ''
    formEntrega.comentario = ''
    archivos.value = []

    if (inputArchivos.value) {
      inputArchivos.value.value = ''
    }

    mensajeEntrega.value =
      resultado.mensaje || 'El trabajo se ha enviado correctamente.'

    await cargarEntregas()
  } catch (error) {
    console.error('Error al enviar el trabajo:', error)

    mensajeEntrega.value =
      error.message || 'No se pudo enviar el trabajo. Inténtalo de nuevo.'
  } finally {
    enviandoEntrega.value = false
  }
}

// Formato de fechas de las entregas
function formatearFecha(fecha) {
  if (!fecha) return 'No disponible'

  const fechaValida = new Date(fecha)

  if (Number.isNaN(fechaValida.getTime())) {
    return String(fecha)
  }

  return fechaValida.toLocaleString('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
}

// Texto del estado de una entrega
function etiquetaEstado(estado) {
  const estados = {
    ENVIADA: 'Enviada',
    REVISADA: 'Revisada',
    DEVUELTA: 'Devuelta'
  }

  return estados[estado] || estado || 'Sin estado'
}

// Preparar mensaje: todavía no se envía al servidor
function prepararMensaje() {
  if (!textoMensaje.value.trim()) {
    mensajeChat.value = 'Escribe un mensaje antes de continuar.'
    return
  }

  mensajeChat.value =
    'Tu mensaje está preparado, pero todavía no se ha enviado. Conectaremos la mensajería al servidor en el siguiente paso.'
}

function cambiarSeccion(id) {
  if (id === 'foro') {
    irAlForo()
    return
  }

  seccion.value = id

  if (id === 'recursos') {
    cargarRecursosAlumno()
  }

  if (id === 'resultados') {
    cargarResultadosAlumno()
  }
}

// Carga inicial
onMounted(() => {
  cargarPerfil()
  cargarEntregas()
})

// Acciones al cambiar de sección
watch(seccion, (nuevaSeccion) => {
  mensajePerfil.value = ''
  mensajeEntrega.value = ''
  mensajeChat.value = ''

  if (nuevaSeccion === 'clase') {
    cargarHorario()
  }

  if (nuevaSeccion === 'trabajos') {
    cargarEntregas()
  }
if (nuevaSeccion === 'avisos') {
  cargarAvisos()
}

})
</script>