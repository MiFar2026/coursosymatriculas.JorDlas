import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import CursosGeneralesView from '../views/cursosymatricula/CursosGeneralesView.vue'
import CastellanoView from '../views/cursosymatricula/castellano/CastellanoView.vue'
import CatalanView from '../views/cursosymatricula/catalan/CatalanView.vue'
import AlfabetizacionView from '../views/cursosymatricula/alfabetizacion/AlfabetizacionView.vue'
import MatriculaView from '../views/cursosymatricula/matricula/MatriculaView.vue'


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
            path: '/alfabetizacion/alfabeto',
            component: AlfabetoView
        },

        // =========================
        // MATRÍCULA
        // =========================

        {
            path: '/alfabetizacion/matricula',
            component: MatriculaView
        },


        // =========================
        // OTRAS PÁGINAS DEL HOME
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
        }

    ]

})


export default router