<template>
  <div class="activities-page">
    <NavbarPrincipal />

  <main class="map-page">
    <header class="page-heading"><p class="eyebrow">Puntos de encuentro</p><h1>Nos encontramos en la ciudad.</h1><p>Dos espacios culturales que nos inspiran a aprender, compartir y construir comunidad.</p></header>
    <section class="places">
      <a class="place" href="https://maps.app.goo.gl/jMNXMwa2hKKmVory5" target="_blank" rel="noopener noreferrer">
        <img src="/fotos/EXAEQUO/ateneu.jpg" alt="Ateneu Barcelonès">
        <div><p class="eyebrow">Espacio cultural</p><h2>Ateneu Barcelonès</h2><span>Ver ubicación en Google Maps ↗</span></div>
      </a>
      <a class="place" href="https://maps.app.goo.gl/Cfc1hRp7VjKk1WPZ7" target="_blank" rel="noopener noreferrer">
        <img src="/fotos/EXAEQUO/joan-miro.jpg" alt="Biblioteca Joan Miró">
        <div><p class="eyebrow">Espacio de lectura</p><h2>Biblioteca Joan Miró</h2><span>Ver ubicación en Google Maps ↗</span></div>
      </a>
    </section>
  </main>
  </div>
</template>
<script setup>
import NavbarPrincipal from '../../components/NavbarPrincipal.vue'
</script>
<style scoped>
.map-page{background:#fbf9f4;min-height:80vh;padding-bottom:80px}.page-heading{text-align:center;padding:65px 24px 35px}.eyebrow{text-transform:uppercase;letter-spacing:.15em;color:#b76545;font-weight:800;font-size:.75rem}.page-heading h1{font-size:clamp(2.5rem,5vw,4.4rem);letter-spacing:-.05em;color:#204537;margin:12px auto;max-width:850px}.page-heading>p:last-child{color:#657068;line-height:1.7}.places{max-width:1100px;padding:0 24px;margin:20px auto;display:grid;grid-template-columns:1fr 1fr;gap:26px}.place{overflow:hidden;border-radius:20px;background:white;box-shadow:0 12px 35px #1e3d2c12;text-decoration:none;transition:transform .2s}.place:hover{transform:translateY(-5px)}.place img{display:block;width:100%;height:280px;object-fit:cover}.place div{padding:25px}.place h2{color:#214f42;font-size:1.65rem;margin:8px 0 15px}.place span{color:#b76545;font-weight:750}.place .eyebrow{margin:0}
@media(max-width:700px){.places{grid-template-columns:1fr}.place img{height:230px}}
</style>
