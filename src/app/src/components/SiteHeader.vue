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
      <RouterLink class="logo" to="/" aria-label=".EXE home" @click="closeNav"
        ><img src="/logo-icon.png" alt="" width="40" height="40" /><span class="logo-mark">.exe</span></RouterLink
      >
      <nav class="site-nav" :class="{ open: navOpen }" aria-label="Main navigation">
        <RouterLink :to="{ path: '/', hash: '#services' }" @click="closeNav">Services</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#how' }" @click="closeNav">How it works</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#work' }" @click="closeNav">Our work</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#about' }" @click="closeNav">About</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#faq' }" @click="closeNav">FAQ</RouterLink>
        <RouterLink to="/blog" @click="closeNav">Blog</RouterLink>
        <RouterLink to="/contact" @click="closeNav">Contact</RouterLink>
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
