<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface Story {
  title: string
  subtitle: string
  description: string
  tags: string[]
}

// Placeholder slots only — Adam supplies the real stories (screenshot,
// title, subtitle, description, tags) afterwards. No client names or
// stories are invented here.
const stories: Story[] = Array.from({ length: 6 }, (_, i) => ({
  title: `Success story ${i + 1} — coming soon`,
  subtitle: 'Subtitle coming soon',
  description:
    'A short description of what was built and why it mattered will go here.',
  tags: ['Tag 1', 'Tag 2', 'Tag 3'],
}))

const current = ref(0)
const paused = ref(false)
const reduced = ref(false)
const story = computed(() => stories[current.value] as Story)

let timer: number | undefined

function goTo(n: number): void {
  current.value = (n + stories.length) % stories.length
  restart()
}

function next(): void {
  goTo(current.value + 1)
}

function prev(): void {
  goTo(current.value - 1)
}

function restart(): void {
  if (timer !== undefined) {
    window.clearInterval(timer)
    timer = undefined
  }
  if (reduced.value || paused.value) return
  timer = window.setInterval(() => {
    current.value = (current.value + 1) % stories.length
  }, 6000)
}

function onEnter(): void {
  paused.value = true
  if (timer !== undefined) {
    window.clearInterval(timer)
    timer = undefined
  }
}

function onLeave(): void {
  paused.value = false
  restart()
}

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  restart()
})

onUnmounted(() => {
  if (timer !== undefined) window.clearInterval(timer)
})
</script>

<template>
  <section class="section section-tint" id="stories">
    <div class="wrap">
      <p class="eyebrow">Success stories</p>
      <h2>Things we&rsquo;ve built.</h2>
      <p class="section-intro">Real projects, told properly &mdash; each story shows what was built and why it mattered.</p>

      <div class="carousel" @mouseenter="onEnter" @mouseleave="onLeave">
        <Transition name="fade-slide" mode="out-in">
          <article :key="current" class="card story-card">
            <div class="story-shot" role="img" aria-label="Screenshot — coming soon">
              <span>Screenshot &mdash; coming soon</span>
            </div>
            <p class="story-subtitle">{{ story.subtitle }}</p>
            <h3>{{ story.title }}</h3>
            <p>{{ story.description }}</p>
            <p class="story-tags">
              <span v-for="tag in story.tags" :key="tag" class="story-tag">{{ tag }}</span>
            </p>
          </article>
        </Transition>

        <div class="carousel-controls">
          <button
            class="btn btn-ghost carousel-arrow"
            type="button"
            aria-label="Previous story"
            @click="prev"
          >
            &larr;
          </button>
          <div class="carousel-dots" role="tablist" aria-label="Choose a story">
            <button
              v-for="(_, i) in stories"
              :key="i"
              type="button"
              class="carousel-dot"
              :class="{ active: i === current }"
              :aria-label="`Story ${i + 1}`"
              :aria-current="i === current ? 'true' : undefined"
              @click="goTo(i)"
            />
          </div>
          <button
            class="btn btn-ghost carousel-arrow"
            type="button"
            aria-label="Next story"
            @click="next"
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
