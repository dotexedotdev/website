<script setup lang="ts">
import { ref } from 'vue'

const navOpen = ref(false)

function closeNav(): void {
  navOpen.value = false
}
</script>

<template>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="logo" href="#top" aria-label=".EXE home"><span class="logo-mark">.exe</span></a>
      <nav class="site-nav" :class="{ open: navOpen }" aria-label="Main navigation">
        <a href="#services" @click="closeNav">Services</a>
        <a href="#how" @click="closeNav">How it works</a>
        <a href="#work" @click="closeNav">Our work</a>
        <a href="#about" @click="closeNav">About</a>
        <a href="#faq" @click="closeNav">FAQ</a>
      </nav>
      <div class="header-actions">
        <a class="btn btn-primary btn-small" href="#contact">Book a free call</a>
        <button
          class="nav-toggle"
          :aria-expanded="navOpen ? 'true' : 'false'"
          aria-controls="site-nav"
          aria-label="Menu"
          @click="navOpen = !navOpen"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
</template>
