<script setup>
import NavbarAteneu from '../../../components/ateneu/NavbarAteneu.vue'
import MensajesProfesorBase from '../../compartidas/MensajesProfesorBase.vue'
</script>

<template>
  <MensajesProfesorBase
    escuela="Ateneu Aula 502"
    :navbar-component="NavbarAteneu"
  />
</template>