<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="hero" id="top">
    <div class="wrap hero-grid">
      <div>
        <h1>Practical IT help for your small business.</h1>
        <p class="lede">I&rsquo;m Adam Stirtan, an independent IT consultant in Burlington. I help small businesses choose the right tools, fix what isn&rsquo;t working, and build what&rsquo;s missing. You work directly with me.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#contact">Book a free call</a>
          <RouterLink class="btn btn-ghost hero-portfolio-link" :to="{ name: 'portfolio' }">View portfolio <span aria-hidden="true">&rarr;</span></RouterLink>
        </div>
      </div>
      <figure class="hero-profile">
        <div class="hero-portrait">
          <img src="/adam-photo.png" alt="Adam Stirtan" width="516" height="1058" fetchpriority="high" />
        </div>
        <figcaption class="eyebrow">Adam Stirtan / Founder, Adam.exe</figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; }
.hero-portfolio-link { color: #fff; border-color: var(--indigo-light); }
.hero-portfolio-link:hover { background: rgba(165, 180, 252, 0.16); border-color: #fff; }
.hero-portfolio-link:focus-visible { outline-color: #fff; }
</style>
