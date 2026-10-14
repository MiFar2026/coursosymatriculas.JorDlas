
import { createRouter, createWebHistory } from 'vue-router'

// ======================================================
// EX AEQUO - PÁGINAS PRINCIPALES
// ======================================================

import HomeView from '../views/ExAequo/HomeView.vue'
import ActividadesView from '../views/ExAequo/ActividadesView.vue'
import AgendaView from '../views/ExAequo/AgendaView.vue'
import MapaView from '../views/ExAequo/MapaView.vue'
import VoluntarioView from '../views/ExAequo/VoluntarioView.vue'
import SobreNosotrosView from '../views/ExAequo/SobreNosotrosView.vue'
import ContactaView from '../views/ExAequo/ContactaView.vue'

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
import RelatosView from '../views/cursosymatricula/alfabetizacion/RelatosView.vue'
import LeerPalabrasView from '../views/cursosymatricula/alfabetizacion/LeerPalabrasView.vue'
import ConversacionDiaADiaView from '../views/cursosymatricula/alfabetizacion/ConversacionDiaADiaView.vue'
import EscribirLetrasView from '../views/cursosymatricula/alfabetizacion/EscribirLetrasView.vue'

// ======================================================
// PRÁCTICA DE ESCRITURA
// ======================================================

import PracticarEscrituraView from '../views/cursosymatricula/alfabetizacion/practicarescritura/PracticarEscrituraView.vue'
import AlfabetizacionEscrituraView from '../views/cursosymatricula/alfabetizacion/practicarescritura/AlfabetizacionEscrituraView.vue'
import PalabrasEscrituraView from '../views/cursosymatricula/alfabetizacion/practicarescritura/PalabrasEscrituraView.vue'
import A1EscrituraView from '../views/cursosymatricula/alfabetizacion/practicarescritura/A1EscrituraView.vue'
import GramaticaView from '../views/cursosymatricula/alfabetizacion/practicarescritura/GramaticaView.vue'
import AvanzadoView from '../views/cursosymatricula/alfabetizacion/practicarescritura/AvanzadoView.vue'

// ======================================================
// MATRÍCULA
// ======================================================

import MatriculaView from '../views/cursosymatricula/matricula/MatriculaView.vue'

// ======================================================
// PREMIO
// ======================================================

import ParticiparPremioView from '../views/premio/participar/ParticiparPremioView.vue'

// ======================================================
// CONFIGURACIÓN DE RUTAS
// ======================================================

const routes = [

    // --------------------------------------------------
    // EX AEQUO - PÁGINAS PRINCIPALES
    // --------------------------------------------------

    {
        path: '/',
        component: HomeView
    },
    {
        path: '/actividades',
        component: ActividadesView
    },
    {
        path: '/agenda',
        component: AgendaView
    },
    {
        path: '/mapa',
        component: MapaView
    },
    {
        path: '/voluntario',
        component: VoluntarioView
    },
    {
        path: '/sobre-nosotros',
        component: SobreNosotrosView
    },
    {
        path: '/contacta',
        component: ContactaView
    },

    // --------------------------------------------------
    // CURSOS GENERALES
    // --------------------------------------------------

    {
        path: '/cursos-generales',
        component: CursosGeneralesView
    },
    {
        path: '/castellano',
        component: CastellanoView
    },
    {
        path: '/catalan',
        component: CatalanView
    },

    // --------------------------------------------------
    // ALFABETIZACIÓN
    // --------------------------------------------------

    {
        path: '/alfabetizacion',
        component: AlfabetizacionView
    },
    {
        path: '/alfabetizacion/alfabeto',
        component: AlfabetoView
    },
    {
        path: '/alfabetizacion/escritura',
        component: AlfabetizacionEscrituraView
    },
    {
        path: '/alfabetizacion/palabras',
        component: PalabrasEscrituraView
    },
    {
        path: '/alfabetizacion/leer-palabras',
        name: 'LeerPalabras',
        component: LeerPalabrasView
    },
    {
        path: '/alfabetizacion/escribir-letras',
        component: EscribirLetrasView
    },
    {
        path: '/alfabetizacion/practicarescritura/conversaciondiaadia',
        name: 'ConversacionDiaADia',
        component: ConversacionDiaADiaView
    },
    {
        path: '/alfabetizacion/relatos',
        name: 'Relatos',
        component: RelatosView
    },

    // --------------------------------------------------
    // PRÁCTICA DE ESCRITURA
    // --------------------------------------------------

    {
        path: '/alfabetizacion/practicar-escritura',
        component: PracticarEscrituraView
    },
    {
        path: '/alfabetizacion/practicar-escritura/gramatica',
        component: GramaticaView
    },
    {
        path: '/alfabetizacion/practicar-escritura/avanzados',
        component: AvanzadoView
    },
    {
        path: '/alfabetizacion/a1',
        component: A1EscrituraView
    },

    // --------------------------------------------------
    // MATRÍCULA
    // --------------------------------------------------

    {
        path: '/matricula',
        component: MatriculaView
    },

    // ==================================================
    // BIBLIOTECA JOAN MIRÓ
    // ==================================================

    {
        path: '/joanmiro',
        component: () => import('../views/joanmiro/JoanMiroView.vue')
    },
    {
        path: '/joan-miro',
        redirect: '/joanmiro'
    },

    // Alumnos

    {
        path: '/joanmiro/alumnos',
        component: () => import('../views/joanmiro/alumnos/AlumnosView.vue')
    },
    {
        path: '/joanmiro/alumnos/perfil',
        component: () => import('../views/joanmiro/alumnos/PerfilAlumnoView.vue')
    },
    {
        path: '/joanmiro/alumnos/entregar-tarea',
        component: () => import('../views/joanmiro/alumnos/EntregarTareaView.vue')
    },
    {
        path: '/joanmiro/alumnos/foro',
        component: () => import('../views/joanmiro/alumnos/ForoAlumnosView.vue')
    },

    // Tutores

    {
        path: '/joanmiro/tutores',
        component: () => import('../views/joanmiro/tutores/TutoresView.vue')
    },
    {
        path: '/joanmiro/tutores/mensaje-profesor',
        component: () => import('../views/joanmiro/tutores/MensajeProfesorView.vue')
    },
    {
        path: '/joanmiro/tutores/resultados-alumno',
        component: () => import('../views/joanmiro/tutores/ResultadosAlumnoView.vue')
    },
    {
        path: '/joanmiro/tutores/foro-profesores',
        component: () => import('../views/joanmiro/tutores/ForoProfesoresView.vue')
    },

    // Recursos

    {
        path: '/joanmiro/recursos',
        component: () => import('../views/joanmiro/recursos/RecursosView.vue')
    },

    // Horarios

    {
        path: '/joanmiro/horarios',
        component: () => import('../views/joanmiro/horarios/HorariosView.vue')
    },

    // ==================================================
    // ATENEU BARCELONÈS
    // ==================================================

    {
        path: '/ateneu',
        component: () => import('../views/ateneu/AteneuView.vue')
    },

    // Alumnos

    {
        path: '/ateneu/alumnos',
        component: () => import('../views/ateneu/alumnos/AlumnosView.vue')
    },
    {
        path: '/ateneu/alumnos/perfil',
        component: () => import('../views/ateneu/alumnos/PerfilAlumnoView.vue')
    },
    {
        path: '/ateneu/alumnos/entregar-tarea',
        component: () => import('../views/ateneu/alumnos/EntregarTareaView.vue')
    },
    {
        path: '/ateneu/alumnos/foro',
        component: () => import('../views/ateneu/alumnos/ForoAlumnosView.vue')
    },

    // Tutores

    {
        path: '/ateneu/tutores',
        name: 'tutores',
        component: () => import('../views/ateneu/tutores/TutoresView.vue')
    },
    {
        path: '/ateneu/tutores/mensaje-profesor',
        component: () => import('../views/ateneu/tutores/MensajeProfesorView.vue')
    },
    {
        path: '/ateneu/tutores/resultados-alumno',
        component: () => import('../views/ateneu/tutores/ResultadosAlumnoView.vue')
    },
    {
        path: '/ateneu/tutores/foro-profesores',
        component: () => import('../views/ateneu/tutores/ForoProfesoresView.vue')
    },

    // Recursos

    {
        path: '/ateneu/recursos',
        component: () => import('../views/ateneu/recursos/RecursosView.vue')
    },

    // Horarios

    {
        path: '/ateneu/horarios',
        component: () => import('../views/ateneu/horarios/HorariosView.vue')
    },

    // ==================================================
    // PREMIO
    // ==================================================

    {
        path: '/premio',
        component: () => import('../views/premio/PremioView.vue')
    },
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

// ======================================================
// CREAR ROUTER
// ======================================================

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
