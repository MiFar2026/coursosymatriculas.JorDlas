<template>

    <nav class="bg-red-900 text-white p-4">

        <div class="flex gap-6">

            <!-- Vuelve al HOME PRINCIPAL -->
            <RouterLink to="/">
                ExAequo
            </RouterLink>

            <!-- Vuelve a CURSOS GENERALES Y MATRÍCULAS -->
            <RouterLink to="/cursos-generales">
                HOME
            </RouterLink>

            <RouterLink to="/castellano">
                CASTELLANO
            </RouterLink>

            <RouterLink to="/catalan">
                CATALÁN
            </RouterLink>

            <RouterLink to="/alfabetizacion">
                ALFABETIZACIÓN
            </RouterLink>

            <RouterLink to="/matricula">
                MATRÍCULA
            </RouterLink>

        </div>

    </nav>

</template>