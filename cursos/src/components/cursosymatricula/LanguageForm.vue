
<script setup>

import { ref } from 'vue'

const idioma = ref('es')

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
        titulo: 'Formulario de inscripción'
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
        titulo: 'Registration form'
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
        titulo: 'Formulaire d’inscription'
    },

    fa: {
        aviso: 'لطفا خانه ها را با شماره ها و حروف لاتین پر کنید. لطفاً از حروف فارسی استفاده نکنید.',
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
        titulo: 'فرم ثبت‌نام'
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
        titulo: 'Formulari d’inscripció'
    }

}

const nombre = ref('')
const apellido = ref('')
const pais = ref('')
const email = ref('')
const telefono = ref('')
const escuela = ref('')
const alumnoAnterior = ref('')

</script>


<template>

    <div
        class="max-w-3xl mx-auto p-6"
        :dir="idioma === 'fa' ? 'rtl' : 'ltr'"
    >

        <!-- BANDERAS -->

        <div class="flex justify-center gap-3 mb-6">

            <button
                type="button"
                @click="idioma = 'es'"
                title="Español"
                class="text-2xl"
            >
                🇪🇸
            </button>


            <button
                type="button"
                @click="idioma = 'en'"
                title="English"
                class="text-2xl"
            >
                🇬🇧
            </button>


            <button
                type="button"
                @click="idioma = 'fr'"
                title="Français"
                class="text-2xl"
            >
                🇫🇷
            </button>


            <button
                type="button"
                @click="idioma = 'fa'"
                title="فارسی"
                class="text-2xl"
            >
                🇮🇷
            </button>


            <button
                type="button"
                @click="idioma = 'ca'"
                title="Català"
                class="text-2xl"
            >
                🇨🇦
            </button>

        </div>


        <!-- TITULO -->

        <h1 class="text-3xl font-bold text-center mb-8">

            {{ textos[idioma].titulo }}

        </h1>


       <!-- AVISO PERSA -->

<div
    v-if="idioma === 'fa'"
    dir="rtl"
    class="mb-6 rounded-xl border-2 border-yellow-400 bg-yellow-50 p-5 text-right text-gray-800 shadow-sm"
>
    <div class="flex items-start gap-3">
        
        <span class="text-2xl">
            ⚠️
        </span>

        <div>
            <p class="font-bold text-lg mb-2">
                توجه مهم
            </p>

            <p class="leading-7">
                {{ textos[idioma].aviso }}
            </p>
        </div>

    </div>
</div>

        <form class="bg-white rounded-2xl shadow-lg p-8">


            <!-- NOMBRE -->

            <div class="mb-5">

                <label class="block font-semibold mb-2">

                    {{ textos[idioma].nombre }}

                </label>

                <input
                    v-model="nombre"
                    type="text"
                    class="w-full border rounded-lg px-4 py-3"
                >

            </div>


            <!-- APELLIDO -->

            <div class="mb-5">

                <label class="block font-semibold mb-2">

                    {{ textos[idioma].apellido }}

                </label>

                <input
                    v-model="apellido"
                    type="text"
                    class="w-full border rounded-lg px-4 py-3"
                >

            </div>


            <!-- PAIS -->

            <div class="mb-5">

                <label class="block font-semibold mb-2">

                    {{ textos[idioma].pais }}

                </label>

                <input
                    v-model="pais"
                    type="text"
                    class="w-full border rounded-lg px-4 py-3"
                >

            </div>


            <!-- EMAIL -->

            <div class="mb-5">

                <label class="block font-semibold mb-2">

                    {{ textos[idioma].email }}

                </label>

                <input
                    v-model="email"
                    type="email"
                    class="w-full border rounded-lg px-4 py-3"
                >

            </div>


            <!-- TELEFONO -->

            <div class="mb-5">

                <label class="block font-semibold mb-2">

                    {{ textos[idioma].telefono }}

                </label>

                <input
                    v-model="telefono"
                    type="tel"
                    class="w-full border rounded-lg px-4 py-3"
                >

            </div>


            <!-- ESCUELA -->

            <div class="mb-6">

                <label class="block font-semibold mb-2">

                    {{ textos[idioma].escuela }}

                </label>


                <select
                    v-model="escuela"
                    class="w-full border rounded-lg px-4 py-3 bg-white"
                >

                    <option value="">

                        {{ textos[idioma].seleccionar }}

                    </option>


                    <option value="joan-miro">

                        {{ textos[idioma].joan }}

                    </option>


                    <option value="ateneu-502">

                        {{ textos[idioma].ateneu }}

                    </option>

                </select>

            </div>


            <!-- ALUMNO ANTERIOR -->

            <div class="mb-6">

                <p class="font-semibold mb-3">

                    {{ textos[idioma].anterior }}

                </p>


                <label class="mr-6">

                    <input
                        v-model="alumnoAnterior"
                        type="radio"
                        value="si"
                    >

                    {{ textos[idioma].si }}

                </label>


                <label>

                    <input
                        v-model="alumnoAnterior"
                        type="radio"
                        value="no"
                    >

                    {{ textos[idioma].no }}

                </label>

            </div>


            <!-- NIVELES -->

            <div
                v-if="alumnoAnterior === 'si'"
                class="mb-6"
            >

                <p class="font-semibold mb-4">

                    {{ textos[idioma].nivel }}

                </p>


                <!-- CASTELLANO -->

                <p class="font-semibold mb-2">

                    {{ textos[idioma].castellano }}

                </p>


                <div class="mb-5">

                    <label class="mr-6">

                        <input type="checkbox">

                        A1

                    </label>


                    <label class="mr-6">

                        <input type="checkbox">

                        A2

                    </label>


                    <label>

                        <input type="checkbox">

                        B1

                    </label>

                </div>


                <!-- CATALAN -->

                <p class="font-semibold mb-2">

                    {{ textos[idioma].catalan }}

                </p>


                <div>

                    <label class="mr-6">

                        <input type="checkbox">

                        A1

                    </label>


                    <label class="mr-6">

                        <input type="checkbox">

                        A2

                    </label>


                    <label>

                        <input type="checkbox">

                        B1

                    </label>

                </div>

            </div>


            <!-- TEST DE NIVEL -->

            <div
                v-if="alumnoAnterior === 'no'"
                class="mb-6"
            >

                <label>

                    <input type="checkbox">

                    {{ textos[idioma].test }}

                </label>

            </div>


            <!-- BOTON -->

            <button
                type="button"
                class="w-full bg-blue-600 text-white font-bold py-3 rounded-xl"
            >

                {{ textos[idioma].enviar }}

            </button>


        </form>

    </div>

</template>