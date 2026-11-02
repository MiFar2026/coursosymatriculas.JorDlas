<script setup>
import NavbarJoanmiro from '../../../components/joanmiro/NavbarJoanmiro.vue'
import MensajesProfesorBase from '../../compartidas/MensajesProfesorBase.vue'
</script>

<template>
  <MensajesProfesorBase
    escuela="Biblioteca Joan Miró"
    :navbar-component="NavbarJoanmiro"
  />
</template>