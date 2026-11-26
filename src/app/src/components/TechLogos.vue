<script setup lang="ts">
import { defaultTechnologies, techLogos, type Technology } from './techLogos'

defineProps<{ technologies?: readonly Technology[] }>()
</script>

<template>
  <div class="tech-logos">
    <div v-for="technology in technologies ?? defaultTechnologies" :key="technology" class="tech-logo">
      <img :src="`/assets/${techLogos[technology]}`" alt="" /><span>{{ technology }}</span>
    </div>
  </div>
</template>
