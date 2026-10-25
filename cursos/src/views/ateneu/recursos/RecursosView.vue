
<template>
  <RecursosBase
    :navbar-component="NavbarAteneu"
    nombre-escuela="Escuela Ateneu Aula 502"
    escuela-api="Ateneu Aula 502"
    :escuela-id="2"
    fondo="/fotos/ateneu/recursos/recursos.jpg"
  />
</template>

<script setup>
import RecursosBase from '../../../components/RecursosBase.vue'
import NavbarAteneu from '../../../components/ateneu/NavbarAteneu.vue'
</script>
