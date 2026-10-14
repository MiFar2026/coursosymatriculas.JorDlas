
<script setup>

import { ref, onMounted } from 'vue'

/* =========================================================
   API
========================================================= */

const API_BASE_URL = '/backend/api'


/* =========================================================
   IDIOMA
========================================================= */

const idioma = ref('es')


/* =========================================================
   TEXTOS
========================================================= */

const textos = {

    es: {
        nombre: 'Nombre',
        apellido: 'Apellido',
        pais: 'País de origen',
        email: 'Correo electrónico',
        telefono: 'Teléfono',
        escuela: 'Escuela',
        seleccionar: 'Selecciona una escuela',

        joan: 'Escuela Biblioteca Joan Miró',
        ateneu: 'Escuela de Ateneu Aula 502',

        anterior: '¿Has sido alumno/a anteriormente?',
        si: 'Sí',
        no: 'No',

        nivel: 'Selecciona tu nivel',
        castellano: 'Castellano',
        catalan: 'Catalán',

        test: 'Quiero hacer el test de nivel',

        enviar: 'Enviar formulario',
        enviando: 'Enviando...',
        limpiar: 'Limpiar formulario',

        titulo: 'Formulario de inscripción',

        obligatorio:
            'Por favor, completa todos los campos obligatorios.',

        emailError:
            'Introduce un correo electrónico válido.',

        exito:
            'Ya estás registrada. ¡Gracias!',

        error:
            'Lo sentimos. No se ha podido completar la matrícula. Inténtalo de nuevo.',

        campos:
            'Campos obligatorios',

        cargando:
            'Enviando matrícula...',

        niveles: {
            a1: 'A1',
            a2: 'A2',
            b1: 'B1',
            b2: 'B2'
        }
    },


    en: {
        nombre: 'First name',
        apellido: 'Last name',
        pais: 'Country of origin',
        email: 'Email',
        telefono: 'Phone',
        escuela: 'School',
        seleccionar: 'Select a school',

        joan: 'Joan Miró Library School',
        ateneu: 'Ateneu Aula 502 School',

        anterior: 'Have you been a student before?',
        si: 'Yes',
        no: 'No',

        nivel: 'Select your level',
        castellano: 'Spanish',
        catalan: 'Catalan',

        test: 'I want to take the level test',

        enviar: 'Submit form',
        enviando: 'Sending...',
        limpiar: 'Clear form',

        titulo: 'Registration form',

        obligatorio:
            'Please complete all required fields.',

        emailError:
            'Please enter a valid email address.',

        exito:
            'You are now registered. Thank you!',

        error:
            'We are sorry. The enrollment could not be completed. Please try again.',

        campos:
            'Required fields',

        cargando:
            'Sending enrollment...',

        niveles: {
            a1: 'A1',
            a2: 'A2',
            b1: 'B1',
            b2: 'B2'
        }
    },


    fr: {
        nombre: 'Prénom',
        apellido: 'Nom',
        pais: 'Pays d’origine',
        email: 'E-mail',
        telefono: 'Téléphone',
        escuela: 'École',
        seleccionar: 'Sélectionnez une école',

        joan: 'École Bibliothèque Joan Miró',
        ateneu: 'École Ateneu Aula 502',

        anterior: 'Avez-vous déjà été étudiant(e) ?',
        si: 'Oui',
        no: 'Non',

        nivel: 'Sélectionnez votre niveau',
        castellano: 'Espagnol',
        catalan: 'Catalan',

        test: 'Je veux passer le test de niveau',

        enviar: 'Envoyer le formulaire',
        enviando: 'Envoi...',
        limpiar: 'Effacer le formulaire',

        titulo: 'Formulaire d’inscription',

        obligatorio:
            'Veuillez compléter tous les champs obligatoires.',

        emailError:
            'Veuillez saisir une adresse e-mail valide.',

        exito:
            'Vous êtes maintenant inscrit(e). Merci !',

        error:
            'Nous sommes désolés. L’inscription n’a pas pu être effectuée. Veuillez réessayer.',

        campos:
            'Champs obligatoires',

        cargando:
            'Envoi de l’inscription...',

        niveles: {
            a1: 'A1',
            a2: 'A2',
            b1: 'B1',
            b2: 'B2'
        }
    },


    fa: {
        aviso:
            'لطفا خانه ها را با شماره ها و حروف لاتین پر کنید. لطفاً از حروف فارسی استفاده نکنید.',

        nombre: 'نام',
        apellido: 'نام خانوادگی',
        pais: 'کشور مبدأ',
        email: 'ایمیل',
        telefono: 'تلفن',
        escuela: 'مدرسه',
        seleccionar: 'یک مدرسه انتخاب کنید',

        joan: 'مدرسه و کتابخانه خوان میرو',
        ateneu: 'مدرسه آتنئو آولا ۵۰۲',

        anterior: 'آیا قبلاً دانش‌آموز بوده‌اید؟',
        si: 'بله',
        no: 'خیر',

        nivel: 'سطح خود را انتخاب کنید',
        castellano: 'اسپانیایی',
        catalan: 'کاتالان',

        test: 'می‌خواهم در آزمون تعیین سطح شرکت کنم',

        enviar: 'ارسال فرم',
        enviando: 'در حال ارسال...',
        limpiar: 'پاک کردن فرم',

        titulo: 'فرم ثبت‌نام',

        obligatorio:
            'لطفاً تمام قسمت‌های الزامی را تکمیل کنید.',

        emailError:
            'لطفاً یک ایمیل معتبر وارد کنید.',

        exito:
            'ثبت‌نام شما انجام شد. متشکریم!',

        error:
            'متأسفیم. ثبت‌نام انجام نشد. لطفاً دوباره تلاش کنید.',

        campos:
            'قسمت‌های الزامی',

        cargando:
            'در حال ارسال ثبت‌نام...',

        niveles: {
            a1: 'A1',
            a2: 'A2',
            b1: 'B1',
            b2: 'B2'
        }
    },


    ca: {
        nombre: 'Nom',
        apellido: 'Cognoms',
        pais: 'País d’origen',
        email: 'Correu electrònic',
        telefono: 'Telèfon',
        escuela: 'Escola',
        seleccionar: 'Selecciona una escola',

        joan: 'Escola Biblioteca Joan Miró',
        ateneu: 'Escola de l’Ateneu Aula 502',

        anterior: 'Has estat alumne/a anteriorment?',
        si: 'Sí',
        no: 'No',

        nivel: 'Selecciona el teu nivell',
        castellano: 'Castellà',
        catalan: 'Català',

        test: 'Vull fer la prova de nivell',

        enviar: 'Enviar formulari',
        enviando: 'Enviant...',
        limpiar: 'Netejar formulari',

        titulo: 'Formulari d’inscripció',

        obligatorio:
            'Completa tots els camps obligatoris.',

        emailError:
            'Introdueix un correu electrònic vàlid.',

        exito:
            'Ja estàs registrada. Gràcies!',

        error:
            'Ho sentim. No s’ha pogut completar la matrícula. Torna-ho a provar.',

        campos:
            'Camps obligatoris',

        cargando:
            'Enviant matrícula...',

        niveles: {
            a1: 'A1',
            a2: 'A2',
            b1: 'B1',
            b2: 'B2'
        }
    }

}


// =====================================================
// DATOS PROCEDENTES DE LA BASE DE DATOS
// =====================================================

const escuelasDisponibles = ref([])
const cursosDisponibles = ref([])
const cargandoDatos = ref(true)
const errorDatos = ref('')

// Cargar escuelas y cursos desde la API de Express
async function cargarDatos() {
    cargandoDatos.value = true
    errorDatos.value = ''

    try {
        const [respuestaEscuelas, respuestaCursos] = await Promise.all([
            fetch('http://localhost:3000/api/escuelas'),
            fetch('http://localhost:3000/api/cursos')
        ])

        if (!respuestaEscuelas.ok || !respuestaCursos.ok) {
            throw new Error('No se pudieron cargar los datos.')
        }

        const resultadoEscuelas = await respuestaEscuelas.json()
        const resultadoCursos = await respuestaCursos.json()

        if (!resultadoEscuelas.ok || !resultadoCursos.ok) {
            throw new Error('La API no ha devuelto los datos correctamente.')
        }

        escuelasDisponibles.value = resultadoEscuelas.datos
        cursosDisponibles.value = resultadoCursos.datos

    } catch (error) {
        console.error('Error al cargar escuelas y cursos:', error)
        errorDatos.value = 'No se pudieron cargar las escuelas y los cursos.'
    } finally {
        cargandoDatos.value = false
    }
}

// Cargar los datos al abrir el formulario
onMounted(() => {
    cargarDatos()
})

/* =========================================================
   DATOS DEL FORMULARIO
========================================================= */

const nombre = ref('')

const apellido = ref('')

const pais = ref('')

const email = ref('')

const telefono = ref('')

const escuela = ref('')

const alumnoAnterior = ref('')

const niveles = ref([])

const solicitaTest = ref(false)


/* =========================================================
   ESTADO DEL ENVÍO
========================================================= */

const enviando = ref(false)


/*
 * Estos mensajes están VACÍOS al comenzar.
 *
 * No se muestran al entrar en la página.
 */

const mensajeExito = ref('')

const mensajeError = ref('')


/* =========================================================
   CAMBIAR IDIOMA
========================================================= */

function cambiarIdioma(nuevoIdioma) {

    idioma.value = nuevoIdioma

}


/* =========================================================
   LIMPIAR MENSAJES
========================================================= */

function limpiarMensajes() {

    mensajeExito.value = ''

    mensajeError.value = ''

}


/* =========================================================
   VALIDAR FORMULARIO
========================================================= */

function validarFormulario() {

    if (!nombre.value.trim()) {

        return false

    }


    if (!apellido.value.trim()) {

        return false

    }


    if (!email.value.trim()) {

        return false

    }


    if (!escuela.value) {

        return false

    }


    return true

}


/* =========================================================
   ENVIAR FORMULARIO
========================================================= */

async function enviarFormulario() {

    /*
     * Primero quitamos cualquier mensaje anterior.
     */

    limpiarMensajes()


    /*
     * Validación básica.
     */

    if (!validarFormulario()) {

        mensajeError.value =
            textos[idioma.value].obligatorio

        return

    }


    /*
     * Comprobamos el email.
     */

const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email.value.trim()
)



    if (!emailValido) {

        mensajeError.value =
            textos[idioma.value].emailError

        return

    }


    /*
     * Activamos el estado de envío.
     */

    enviando.value = true


    try {

        /*
         * Estos son exactamente los nombres
         * que espera el PHP matriculas.php.
         */

        const datos = {

            nombre:
                nombre.value.trim(),

            apellidos:
                apellido.value.trim(),

            pais_origen:
                pais.value.trim(),

            email:
                email.value.trim(),

            telefono:
                telefono.value.trim(),

            escuela_id:
                Number(escuela.value),

            alumno_anterior:
                alumnoAnterior.value === 'si',

            solicita_test:
                solicitaTest.value,

            niveles:
                niveles.value

        }


        console.log(
            'Enviando matrícula:',
            datos
        )


        
/*
 * CONEXIÓN VUE → EXPRESS
 */

const respuesta = await fetch(
    'http://localhost:3000/api/matriculas/solicitudes',
    {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(datos)
    }
)



        /*
         * Leemos la respuesta del Express.
         */

        const resultado =
            await respuesta.json()


        console.log(
            'Respuesta del servidor:',
            resultado
        )


       /*
 * Si Express devuelve un error,
 * mostramos el mensaje rojo.
 */
        if (
            !respuesta.ok ||
            !resultado.ok
        ) {

            throw new Error(
                resultado.mensaje ||
                textos[idioma.value].error
            )

        }


        /*
         * =====================================================
         * MATRÍCULA CORRECTA
         * =====================================================
         *
         * EL MENSAJE VERDE SOLO SE ACTIVA AQUÍ.
         */

        mensajeExito.value =
            textos[idioma.value].exito


        mensajeError.value = ''


        /*
         * Limpiamos el formulario.
         */

        nombre.value = ''

        apellido.value = ''

        pais.value = ''

        email.value = ''

        telefono.value = ''

        escuela.value = ''

        alumnoAnterior.value = ''

        niveles.value = []

        solicitaTest.value = false


        /*
         * Subimos al principio para que se vea
         * inmediatamente el mensaje de éxito.
         */

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })


    } catch (error) {

        console.error(
            'Error en la matrícula:',
            error
        )


        /*
         * =====================================================
         * ERROR
         * =====================================================
         *
         * EL MENSAJE ROJO SOLO APARECE DESPUÉS
         * DE INTENTAR ENVIAR.
         */

        mensajeError.value =
            textos[idioma.value].error


        mensajeExito.value = ''


        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })


    } finally {

        enviando.value = false

    }

}


/* =========================================================
   LIMPIAR FORMULARIO
========================================================= */

function limpiarFormulario() {

    nombre.value = ''

    apellido.value = ''

    pais.value = ''

    email.value = ''

    telefono.value = ''

    escuela.value = ''

    alumnoAnterior.value = ''

    niveles.value = []

    solicitaTest.value = false

    limpiarMensajes()

}

</script>


<template>

    <!-- =====================================================
         FONDO DE LA PÁGINA
    ====================================================== -->

    <div
        class="min-h-screen bg-cover bg-center bg-fixed relative"
        :style="{
            backgroundImage:
                `url('/fotos/cursos/matriculas/matricula.png')`
        }"
        :dir="idioma === 'fa' ? 'rtl' : 'ltr'"
    >


        <!--
            Capa muy ligera para que la foto siga viéndose.
        -->

        <div
            class="absolute inset-0 bg-black/20"
        ></div>


        <!-- =================================================
             CONTENIDO
        ================================================== -->

        <div
            class="relative z-10 max-w-3xl mx-auto px-4 py-8 md:py-12"
        >


            <!-- =================================================
                 CABECERA
            ================================================== -->

            <div
                class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 mb-6 border border-white/50"
            >


                <!-- IDIOMAS -->

                <div
                    class="flex justify-center items-center gap-3 mb-6"
                >

                    <button
                        type="button"
                        @click="cambiarIdioma('es')"
                        title="Español"
                        class="w-11 h-11 rounded-full bg-white/90 shadow-md border-2 transition hover:scale-110"
                        :class="
                            idioma === 'es'
                                ? 'border-blue-600 ring-2 ring-blue-200'
                                : 'border-gray-200'
                        "
                    >
                        🇪🇸
                    </button>


                    <button
                        type="button"
                        @click="cambiarIdioma('en')"
                        title="English"
                        class="w-11 h-11 rounded-full bg-white/90 shadow-md border-2 transition hover:scale-110"
                        :class="
                            idioma === 'en'
                                ? 'border-blue-600 ring-2 ring-blue-200'
                                : 'border-gray-200'
                        "
                    >
                        🇬🇧
                    </button>


                    <button
                        type="button"
                        @click="cambiarIdioma('fr')"
                        title="Français"
                        class="w-11 h-11 rounded-full bg-white/90 shadow-md border-2 transition hover:scale-110"
                        :class="
                            idioma === 'fr'
                                ? 'border-blue-600 ring-2 ring-blue-200'
                                : 'border-gray-200'
                        "
                    >
                        🇫🇷
                    </button>


                    <button
                        type="button"
                        @click="cambiarIdioma('fa')"
                        title="فارسی"
                        class="w-11 h-11 rounded-full bg-white/90 shadow-md border-2 transition hover:scale-110"
                        :class="
                            idioma === 'fa'
                                ? 'border-blue-600 ring-2 ring-blue-200'
                                : 'border-gray-200'
                        "
                    >
                        فارسی
                    </button>


                    <button
                        type="button"
                        @click="cambiarIdioma('ca')"
                        title="Català"
                        class="w-11 h-11 rounded-full bg-white/90 shadow-md border-2 transition hover:scale-110"
                        :class="
                            idioma === 'ca'
                                ? 'border-blue-600 ring-2 ring-blue-200'
                                : 'border-gray-200'
                        "
                    >
                        🇨🇦
                    </button>

                </div>


                <!-- TITULO -->

                <h1
                    class="text-3xl md:text-4xl font-extrabold text-center text-gray-800"
                >
                    {{ textos[idioma].titulo }}
                </h1>


                <div
                    class="w-20 h-1 bg-blue-600 rounded-full mx-auto mt-4"
                ></div>

            </div>


            <!-- =================================================
                 AVISO PERSA
            ================================================== -->

            <div
                v-if="idioma === 'fa'"
                dir="rtl"
                class="mb-6 rounded-2xl border border-yellow-300 bg-yellow-50/90 backdrop-blur-sm p-5 text-right shadow-xl"
            >

                <div
                    class="flex items-start gap-3"
                >

                    <span class="text-2xl">
                        ⚠️
                    </span>


                    <div>

                        <p
                            class="font-bold text-lg mb-2 text-gray-800"
                        >
                            توجه مهم
                        </p>


                        <p
                            class="leading-7 text-gray-700"
                        >
                            {{ textos[idioma].aviso }}
                        </p>

                    </div>

                </div>

            </div>


            <!-- =================================================
                 MENSAJE DE ÉXITO
                 SOLO DESPUÉS DE UNA MATRÍCULA CORRECTA
            ================================================== -->

            <div
                v-if="mensajeExito"
                class="mb-6 rounded-2xl border border-green-300 bg-green-50/95 p-5 shadow-xl"
            >

                <div
                    class="flex items-center gap-4 text-green-800"
                >

                    <div
                        class="w-12 h-12 flex-shrink-0 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold"
                    >
                        ✓
                    </div>


                    <p
                        class="font-bold text-lg"
                    >
                        {{ mensajeExito }}
                    </p>

                </div>

            </div>


            <!-- =================================================
                 MENSAJE DE ERROR
                 SOLO DESPUÉS DE INTENTAR ENVIAR
            ================================================== -->

            <div
                v-if="mensajeError"
                class="mb-6 rounded-2xl border border-red-300 bg-red-50/95 p-5 shadow-xl"
            >

                <div
                    class="flex items-center gap-4 text-red-800"
                >

                    <div
                        class="w-12 h-12 flex-shrink-0 rounded-full bg-red-500 text-white flex items-center justify-center text-2xl font-bold"
                    >
                        !
                    </div>


                    <p
                        class="font-bold text-lg"
                    >
                        {{ mensajeError }}
                    </p>

                </div>

            </div>


            <!-- =================================================
                 FORMULARIO
            ================================================== -->

            <form
                @submit.prevent="enviarFormulario"
                class="bg-white/75 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 border border-white/60"
            >

<!-- =================================================
     NOMBRE
================================================== -->

<div class="mb-5">

    <label
        for="nombre"
        class="block font-semibold text-gray-800 mb-2"
    >
        {{ textos[idioma].nombre }}

        <span class="text-red-500">*</span>
    </label>

    <input
        id="nombre"
        v-model="nombre"
        type="text"
        autocomplete="given-name"
        required
        class="w-full border border-gray-300/80 rounded-xl px-4 py-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    >

</div>


<!-- =================================================
     APELLIDO
================================================== -->

<div class="mb-5">

    <label
        for="apellido"
        class="block font-semibold text-gray-800 mb-2"
    >
        {{ textos[idioma].apellido }}

        <span class="text-red-500">*</span>
    </label>

    <input
        id="apellido"
        v-model="apellido"
        type="text"
        autocomplete="family-name"
        required
        class="w-full border border-gray-300/80 rounded-xl px-4 py-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    >

</div>


<!-- =================================================
     PAÍS
================================================== -->

<div class="mb-5">

    <label
        for="pais"
        class="block font-semibold text-gray-800 mb-2"
    >
        {{ textos[idioma].pais }}
    </label>

    <input
        id="pais"
        v-model="pais"
        type="text"
        autocomplete="country-name"
        class="w-full border border-gray-300/80 rounded-xl px-4 py-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    >

</div>


<!-- =================================================
     EMAIL
================================================== -->

<div class="mb-5">

    <label
        for="email"
        class="block font-semibold text-gray-800 mb-2"
    >
        {{ textos[idioma].email }}

        <span class="text-red-500">*</span>
    </label>

    <input
        id="email"
        v-model="email"
        type="email"
        autocomplete="email"
        required
        class="w-full border border-gray-300/80 rounded-xl px-4 py-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    >

</div>


<!-- =================================================
     TELÉFONO
================================================== -->

<div class="mb-6">

    <label
        for="telefono"
        class="block font-semibold text-gray-800 mb-2"
    >
        {{ textos[idioma].telefono }}
    </label>

    <input
        id="telefono"
        v-model="telefono"
        type="tel"
        autocomplete="tel"
        class="w-full border border-gray-300/80 rounded-xl px-4 py-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    >

</div>


<!-- =================================================
     ESCUELA
     DATOS PROCEDENTES DE LA BASE DE DATOS
================================================== -->

<div class="mb-7">

    <label
        for="escuela"
        class="block font-semibold text-gray-800 mb-2"
    >
        {{ textos[idioma].escuela }}

        <span class="text-red-500">*</span>
    </label>

    <select
        id="escuela"
        v-model="escuela"
        required
        :disabled="cargandoDatos"
        class="w-full border border-gray-300/80 rounded-xl px-4 py-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    >
        <option value="" disabled>
            {{ textos[idioma].seleccionar }}
        </option>

        <option
            v-for="centro in escuelasDisponibles"
            :key="centro.id"
            :value="String(centro.id)"
        >
            {{ centro.nombre }}
        </option>
    </select>

    <p
        v-if="cargandoDatos"
        class="mt-2 text-sm text-gray-600"
    >
        Cargando escuelas...
    </p>

    <p
        v-else-if="errorDatos"
        class="mt-2 text-sm text-red-600"
    >
        {{ errorDatos }}
    </p>

</div>


                 

        



                <!-- =================================================
                     ALUMNO ANTERIOR
                ================================================== -->

                <div
                    class="mb-7 p-5 rounded-2xl bg-white/55 border border-white/70"
                >

                    <p
                        class="font-semibold text-gray-800 mb-4"
                    >
                        {{ textos[idioma].anterior }}
                    </p>


                    <div
                        class="flex flex-wrap gap-6"
                    >

                        <label
                            class="flex items-center gap-2 cursor-pointer"
                        >

                            <input
                                v-model="alumnoAnterior"
                                type="radio"
                                value="si"
                                class="w-5 h-5"
                            >

                            <span>
                                {{ textos[idioma].si }}
                            </span>

                        </label>


                        <label
                            class="flex items-center gap-2 cursor-pointer"
                        >

                            <input
                                v-model="alumnoAnterior"
                                type="radio"
                                value="no"
                                class="w-5 h-5"
                            >

                            <span>
                                {{ textos[idioma].no }}
                            </span>

                        </label>

                    </div>

                </div>


            
<!-- =================================================
     NIVELES
     SOLO PARA ALUMNOS ANTERIORES
     DATOS PROCEDENTES DE LA BASE DE DATOS
================================================== -->

<div
    v-if="alumnoAnterior === 'si'"
    class="mb-7 p-5 rounded-2xl bg-blue-50/75 border border-blue-200/70"
>

    <p class="font-bold text-gray-800 mb-5">
        {{ textos[idioma].nivel }}
    </p>

    <!-- AVISO DE CARGA -->

    <p
        v-if="cargandoDatos"
        class="text-gray-600 mb-4"
    >
        Cargando cursos...
    </p>

    <!-- ERROR -->

    <p
        v-else-if="errorDatos"
        class="text-red-600 mb-4"
    >
        {{ errorDatos }}
    </p>

    <!-- CURSOS -->

    <template v-else>

        <!-- CASTELLANO -->

        <template
            v-if="cursosDisponibles.some(curso => curso.idioma === 'Castellano')"
        >

            <p class="font-semibold text-gray-700 mb-3">
                {{ textos[idioma].castellano }}
            </p>

            <div class="grid grid-cols-3 gap-3 mb-6">

                <label
                    v-for="curso in cursosDisponibles.filter(curso => curso.idioma === 'Castellano')"
                    :key="curso.id"
                    class="flex items-center gap-2 bg-white/85 rounded-xl p-3 border cursor-pointer hover:border-blue-400 transition"
                >

                    <input
                        v-model="niveles"
                        type="checkbox"
                        :value="curso.nombre"
                        class="w-4 h-4"
                    >

                    <span>
                        {{ curso.nivel }}
                    </span>

                </label>

            </div>

        </template>

        <!-- CATALÁN -->

        <template
            v-if="cursosDisponibles.some(curso => curso.idioma === 'Catalán')"
        >

            <p class="font-semibold text-gray-700 mb-3">
                {{ textos[idioma].catalan }}
            </p>

            <div class="grid grid-cols-3 gap-3 mb-6">

                <label
                    v-for="curso in cursosDisponibles.filter(curso => curso.idioma === 'Catalán')"
                    :key="curso.id"
                    class="flex items-center gap-2 bg-white/85 rounded-xl p-3 border cursor-pointer hover:border-blue-400 transition"
                >

                    <input
                        v-model="niveles"
                        type="checkbox"
                        :value="curso.nombre"
                        class="w-4 h-4"
                    >

                    <span>
                        {{ curso.nivel }}
                    </span>

                </label>

            </div>

        </template>

        <!-- ALFABETIZACIÓN -->

        <template
            v-if="cursosDisponibles.some(curso => curso.idioma === 'Alfabetización')"
        >

            <p class="font-semibold text-gray-700 mb-3">
                Alfabetización
            </p>

            <div class="grid grid-cols-1 gap-3">

                <label
                    v-for="curso in cursosDisponibles.filter(curso => curso.idioma === 'Alfabetización')"
                    :key="curso.id"
                    class="flex items-center gap-2 bg-white/85 rounded-xl p-3 border cursor-pointer hover:border-blue-400 transition"
                >

                    <input
                        v-model="niveles"
                        type="checkbox"
                        :value="curso.nombre"
                        class="w-4 h-4"
                    >

                    <span>
                        {{ curso.nombre }}
                    </span>

                </label>

            </div>

        </template>

    </template>

</div>



  


                <!-- =================================================
                     TEST DE NIVEL
                     SOLO PARA ALUMNOS NUEVOS
                ================================================== -->

                <div
                    v-if="alumnoAnterior === 'no'"
                    class="mb-8 p-5 rounded-2xl bg-white/55 border border-white/70"
                >

                    <label
                        class="flex items-start gap-3 cursor-pointer"
                    >

                        <input
                            v-model="solicitaTest"
                            type="checkbox"
                            class="w-5 h-5 mt-0.5"
                        >


                        <span
                            class="text-gray-700"
                        >
                            {{ textos[idioma].test }}
                        </span>

                    </label>

                </div>


                <!-- =================================================
                     BOTONES
                ================================================== -->

                <div
                    class="flex flex-col sm:flex-row gap-3"
                >

                    <!-- ENVIAR -->

                    <button
                        type="submit"
                        :disabled="enviando"
                        class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl shadow-lg transition"
                    >

                        <span
                            v-if="!enviando"
                        >
                            {{ textos[idioma].enviar }}
                        </span>


                        <span
                            v-else
                            class="flex items-center justify-center gap-2"
                        >

                            <span
                                class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                            ></span>

                            {{ textos[idioma].enviando }}

                        </span>

                    </button>


                    <!-- LIMPIAR -->

                    <button
                        type="button"
                        @click="limpiarFormulario"
                        :disabled="enviando"
                        class="sm:w-auto px-6 py-4 rounded-xl border border-gray-300/80 bg-white/75 hover:bg-white disabled:opacity-50 text-gray-700 font-semibold transition"
                    >
                        {{ textos[idioma].limpiar }}
                    </button>

                </div>


                <!-- =================================================
                     CAMPOS OBLIGATORIOS
                ================================================== -->

                <p
                    class="text-sm text-gray-600 mt-5 text-center"
                >

                    <span class="text-red-500">
                        *
                    </span>

                    {{ textos[idioma].campos }}

                </p>

            </form>

        </div>

    </div>

</template>
