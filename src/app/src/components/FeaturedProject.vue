<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

defineProps<{ inPortfolio?: boolean }>()

const screenshots: { title: string; description: string; image?: { src: string; alt: string } }[] = [
  { title: 'Job logged', description: 'New customers become jobs in the CRM.' },
  { title: 'Authorization sent', description: 'Paperwork is filled in and sent for signature.' },
  { title: 'Team notified', description: 'A signature approves the job and alerts the team.' },
]
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
        <p class="eyebrow">{{ inPortfolio ? 'Case study' : 'Featured project' }} / Restoration services</p>
        <h2 id="featured-project-title">From new job to signed approval.</h2>
        <p>I connected job intake, signatures, and team alerts so a restoration crew can start work without chasing paperwork.</p>
        <RouterLink v-if="!inPortfolio" class="featured-project-link" :to="{ name: 'portfolio', hash: '#stories' }">Read the case study <span aria-hidden="true">&rarr;</span></RouterLink>
      </div>
      <div class="project-flow">
        <figure aria-live="polite" aria-atomic="true">
          <div class="project-screenshot">
            <img v-if="screenshot.image" :src="screenshot.image.src" :alt="screenshot.image.alt" loading="lazy" />
            <span v-else>Screenshot pending</span>
          </div>
          <figcaption>
            <strong>{{ screenshot.title }}</strong>
            <p>{{ screenshot.description }}</p>
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
