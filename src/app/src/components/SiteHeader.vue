<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const navOpen = ref(false)

function closeNav(): void {
  navOpen.value = false
}
</script>

<template>
  <header class="site-header">
    <div class="wrap header-inner">
      <RouterLink class="logo" to="/" aria-label="Adam.exe home" @click="closeNav"
        ><img src="/logo-icon.png" alt="" width="40" height="40" /><span class="logo-mark">Adam.exe</span></RouterLink
      >
      <nav class="site-nav" :class="{ open: navOpen }" aria-label="Main navigation">
        <RouterLink to="/" @click="closeNav">Home</RouterLink>
        <RouterLink to="/about" @click="closeNav">About</RouterLink>
        <RouterLink to="/services" @click="closeNav">Services</RouterLink>
        <RouterLink to="/support" @click="closeNav">Support</RouterLink>
        <RouterLink to="/blog" @click="closeNav">Blog</RouterLink>
      </nav>
      <div class="header-actions">
        <RouterLink class="btn btn-primary btn-small" to="/contact">Book a free call</RouterLink>
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
