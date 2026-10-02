import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import CursosGeneralesView from '../views/CursosGeneralesView.vue'
import CastellanoView from '../views/CastellanoView.vue'
import CatalanView from '../views/CatalanView.vue'
import AlfabetizacionView from '../views/AlfabetizacionView.vue'
import MatriculaView from '../views/MatriculaView.vue'


const router = createRouter({

    history: createWebHistory(),

    routes: [

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
        // CASTELLANO
        // =========================

        {
            path: '/castellano',
            component: CastellanoView
        },


        // =========================
        // CATALÁN
        // =========================

        {
            path: '/catalan',
            component: CatalanView
        },


        // =========================
        // ALFABETIZACIÓN
        // =========================

        {
            path: '/alfabetizacion',
            component: AlfabetizacionView
        },

         {
            path: '/alfabeto',
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
        // OTRAS PÁGINAS DEL HOME
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
        }

    ]

})


export default router