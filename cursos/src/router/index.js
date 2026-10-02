import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import CursosGeneralesView from '../views/CursosGeneralesView.vue'
import CastellanoView from '../views/CastellanoView.vue'
import CatalanView from '../views/CatalanView.vue'
import AlfabetizacionView from '../views/AlfabetizacionView.vue'
import AlfabetoView from '../views/AlfabetoView.vue'
import MatriculaView from '../views/MatriculaView.vue'

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
        component: () => import('../views/JoanMiroView.vue')
    },

    {
        path: '/ateneu',
        component: () => import('../views/AteneuView.vue')
    },

    {
        path: '/premio',
        component: () => import('../views/PremioView.vue')
    },





  // =========================
    // PREMIO
    // =========================



    {
    path: '/premio/tesoro-literario',
    component: () => import('../views/TesoroLiterarioView.vue')
},

{
    path: '/premio/participar',
    component: () => import('../views/ParticiparPremioView.vue')
},

{
    path: '/premio/requisitos',
    component: () => import('../views/RequisitosPremioView.vue')
},

{
    path: '/premio/ganadores',
    component: () => import('../views/GanadoresPremioView.vue')
},

{
    path: '/premio/tesoro-literario',
    component: () => import('../views/TesoroLiterarioView.vue')
}





]


const router = createRouter({

    history: createWebHistory(),

    routes

})


export default router