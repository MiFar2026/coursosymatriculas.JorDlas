import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/ExAequo/HomeView.vue'
import CursosGeneralesView from '../views/cursosymatricula/CursosGeneralesView.vue'
import CastellanoView from '../views/cursosymatricula/castellano/CastellanoView.vue'
import CatalanView from '../views/cursosymatricula/catalan/CatalanView.vue'
import AlfabetizacionView from '../views/cursosymatricula/alfabetizacion/AlfabetizacionView.vue'
import AlfabetoView from '../views/cursosymatricula/alfabetizacion/AlfabetoView.vue'
import MatriculaView from '../views/cursosymatricula/matricula/MatriculaView.vue'
import ParticiparPremioView from '../views/premio/participar/ParticiparPremioView.vue'


const routes = [

    // =========================
    // HOME PRINCIPAL
    // =========================

    {
        path: '/',
        component: HomeView
    },


    // =========================
    // CURSOS GENERALES
    // =========================

    {
        path: '/cursos-generales',
        component: CursosGeneralesView
    },


    // =========================
    // CURSOS
    // =========================

    {
        path: '/castellano',
        component: CastellanoView
    },

    {
        path: '/catalan',
        component: CatalanView
    },

    {
        path: '/alfabetizacion',
        component: AlfabetizacionView
    },

    {
        path: '/alfabetizacion/alfabeto',
        component: AlfabetoView
    },


    // =========================
    // MATRÍCULA
    // =========================

    {
        path: '/matricula',
        component: MatriculaView
    },


    // =========================
    // EXAEQUO
    // =========================

    {
        path: '/joan-miro',
        component: () => import('../views/joanmiro/JoanMiroView.vue')
    },

    {
        path: '/ateneu',
        component: () => import('../views/ateneu/AteneuView.vue')
    },

    {
        path: '/premio',
        component: () => import('../views/premio/PremioView.vue')
    },


    // =========================
    // PREMIO
    // =========================

    {
        path: '/premio/tesoro-literario',
        component: () => import('../views/premio/tesoro/TesoroLiterarioView.vue')
    },

    {
        path: '/premio/participar',
        component: ParticiparPremioView
    },

    {
        path: '/premio/requisitos',
        component: () => import('../views/premio/requisitos/RequisitosPremioView.vue')
    },

    {
        path: '/premio/ganadores',
        component: () => import('../views/premio/ganadores/GanadoresPremioView.vue')
    }

]


const router = createRouter({

    history: createWebHistory(),

    routes

})


export default router