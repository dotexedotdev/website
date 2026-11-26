<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { norgardScreenshots as screenshots } from '../views/portfolioProjects'

const current = ref(0)
const screenshot = computed(() => screenshots[current.value]!)

function move(direction: number) {
  current.value = (current.value + direction + screenshots.length) % screenshots.length
}
</script>

<template>
  <section class="section featured-project" id="stories" aria-labelledby="featured-project-title">
    <div class="wrap featured-project-grid">
      <div>
        <p class="eyebrow">Featured project / Restoration services</p>
        <h2 id="featured-project-title">From new job to signed approval.</h2>
        <p>I connected job intake, signatures, and team alerts so a restoration crew can start work without chasing paperwork.</p>
        <RouterLink class="featured-project-link" :to="{ name: 'portfolio', hash: '#stories' }">Read the case study <span aria-hidden="true">&rarr;</span></RouterLink>
      </div>
      <div class="project-flow">
        <figure aria-live="polite" aria-atomic="true">
          <div class="project-screenshot">
            <img :src="screenshot.src" :alt="`Restoration app screenshot: ${screenshot.title}`" :width="screenshot.width" :height="screenshot.height" loading="lazy" />
          </div>
          <figcaption>
            <strong>{{ screenshot.title }}</strong>
            <span class="sr-only">Slide {{ current + 1 }} of {{ screenshots.length }}</span>
          </figcaption>
        </figure>
        <div class="project-gallery-controls">
          <button type="button" aria-label="Previous screenshot" @click="move(-1)">&larr;</button>
          <span aria-hidden="true">{{ current + 1 }} / {{ screenshots.length }}</span>
          <button type="button" aria-label="Next screenshot" @click="move(1)">&rarr;</button>
        </div>
      </div>
    </div>
  </section>
</template>
