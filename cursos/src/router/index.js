import { createRouter, createWebHistory } from 'vue-router'


// ======================================================
// HOME
// ======================================================

import HomeView from '../views/ExAequo/HomeView.vue'


// ======================================================
// CURSOS GENERALES
// ======================================================

import CursosGeneralesView from '../views/cursosymatricula/CursosGeneralesView.vue'

import CastellanoView from '../views/cursosymatricula/castellano/CastellanoView.vue'

import CatalanView from '../views/cursosymatricula/catalan/CatalanView.vue'


// ======================================================
// ALFABETIZACIÓN
// ======================================================

import AlfabetizacionView from '../views/cursosymatricula/alfabetizacion/AlfabetizacionView.vue'

import AlfabetoView from '../views/cursosymatricula/alfabetizacion/AlfabetoView.vue'


// ======================================================
// PRÁCTICA DE ESCRITURA
// ======================================================

import PracticarEscrituraView from '../views/cursosymatricula/alfabetizacion/practicarescritura/PracticarEscrituraView.vue'

import AlfabetizacionEscrituraView from '../views/cursosymatricula/alfabetizacion/practicarescritura/AlfabetizacionEscrituraView.vue'

import PalabrasEscrituraView from '../views/cursosymatricula/alfabetizacion/practicarescritura/PalabrasEscrituraView.vue'

import A1EscrituraView from '../views/cursosymatricula/alfabetizacion/practicarescritura/A1EscrituraView.vue'


// ======================================================
// MATRÍCULA
// ======================================================

import MatriculaView from '../views/cursosymatricula/matricula/MatriculaView.vue'


// ======================================================
// PREMIO
// ======================================================

import ParticiparPremioView from '../views/premio/participar/ParticiparPremioView.vue'


// ======================================================
// RUTAS
// ======================================================

const routes = [

    // ==================================================
    // HOME PRINCIPAL
    // ==================================================

    {
        path: '/',
        component: HomeView
    },


    // ==================================================
    // CURSOS GENERALES
    // ==================================================

    {
        path: '/cursos-generales',
        component: CursosGeneralesView
    },


    // ==================================================
    // CASTELLANO
    // ==================================================

    {
        path: '/castellano',
        component: CastellanoView
    },


    // ==================================================
    // CATALÁN
    // ==================================================

    {
        path: '/catalan',
        component: CatalanView
    },


    // ==================================================
    // ALFABETIZACIÓN
    // ==================================================

    {
        path: '/alfabetizacion',
        component: AlfabetizacionView
    },


    // ==================================================
    // ALFABETO
    // ==================================================

    {
        path: '/alfabetizacion/alfabeto',
        component: AlfabetoView
    },


    // ==================================================
    // PRÁCTICA DE ESCRITURA
    // ==================================================

    {
        path: '/alfabetizacion/practicar-escritura',
        component: PracticarEscrituraView
    },


    // ==================================================
    // ALFABETIZACIÓN - ESCRITURA
    // ==================================================

    {
        path: '/alfabetizacion/escritura',
        component: AlfabetizacionEscrituraView
    },


    // ==================================================
    // PALABRAS
    // ==================================================

    {
        path: '/alfabetizacion/palabras',
        component: PalabrasEscrituraView
    },


    // ==================================================
    // A1 ESCRITURA
    // ==================================================

    {
        path: '/alfabetizacion/a1',
        component: A1EscrituraView
    },


    // ==================================================
    // MATRÍCULA
    // ==================================================

    {
        path: '/matricula',
        component: MatriculaView
    },


    // ==================================================
    // EXAEQUO
    // ==================================================

    {
        path: '/joan-miro',
        component: () =>
            import('../views/joanmiro/JoanMiroView.vue')
    },


    {
        path: '/ateneu',
        component: () =>
            import('../views/ateneu/AteneuView.vue')
    },


    // ==================================================
    // PREMIO
    // ==================================================

    {
        path: '/premio',
        component: () =>
            import('../views/premio/PremioView.vue')
    },


    // ==================================================
    // PREMIO - TESORO LITERARIO
    // ==================================================

    {
        path: '/premio/tesoro-literario',
        component: () =>
            import('../views/premio/tesoro/TesoroLiterarioView.vue')
    },


    // ==================================================
    // PREMIO - PARTICIPAR
    // ==================================================

    {
        path: '/premio/participar',
        component: ParticiparPremioView
    },


    // ==================================================
    // PREMIO - REQUISITOS
    // ==================================================

    {
        path: '/premio/requisitos',
        component: () =>
            import('../views/premio/requisitos/RequisitosPremioView.vue')
    },


    // ==================================================
    // PREMIO - GANADORES
    // ==================================================

    {
        path: '/premio/ganadores',
        component: () =>
            import('../views/premio/ganadores/GanadoresPremioView.vue')
    }

]


// ======================================================
// CREAR ROUTER
// ======================================================

const router = createRouter({

    history: createWebHistory(),

    routes

})


export default router