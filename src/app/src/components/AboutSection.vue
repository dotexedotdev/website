<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TechLogos from './TechLogos.vue'
</script>

<template>
  <section class="section section-tint" id="about">
    <div class="wrap home-split meet-adam">
      <div>
        <p class="eyebrow">Meet Adam</p>
        <h2>15+ years of hands-on engineering experience.</h2>
        <p class="section-intro">My background spans software development, cloud infrastructure, and automation. I work with clients in person across the GTA and remotely beyond it.</p>
        <RouterLink class="section-more" :to="{ name: 'portfolio', hash: '#case-studies' }">See what I&rsquo;ve built <span aria-hidden="true">&rarr;</span></RouterLink>
      </div>
      <div>
        <h3 class="eyebrow">Tools I work with</h3>
        <TechLogos />
      </div>
    </div>
  </section>
</template>

<style scoped>
.meet-adam :deep(.tech-logos) { margin-top: 12px; }
</style>
