
<template>
  <RecursosBase
    :navbar-component="NavbarJoanmiro"
    nombre-escuela="Biblioteca Joan Miró"
    escuela-api="Biblioteca Joan Miró"
    :escuela-id="ID_ESCUELA_JOANMIRO"
    fondo="/fotos/joanmiro/recursos/recursos.jpg"
  />
</template>

<script setup>
import RecursosBase from '../../../components/RecursosBase.vue'
import NavbarJoanmiro from '../../../components/joanmiro/NavbarJoanmiro.vue'

// Sustituye 0 por el ID real de Biblioteca Joan Miró en la base de datos.
const ID_ESCUELA_JOANMIRO = 1
</script>
