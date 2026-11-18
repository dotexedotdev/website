<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="site-footer">
    <div class="wrap footer-inner">
      <div class="footer-brand">
        <RouterLink class="logo footer-logo" to="/" aria-label=".EXE home"
          ><img src="/logo-icon.png" alt="" width="64" height="64" /><span class="logo-mark">.exe</span></RouterLink
        >
        <p class="muted">Software that works for your business.</p>
      </div>
      <nav aria-label="Footer navigation">
        <RouterLink :to="{ path: '/', hash: '#services' }">Services</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#how' }">How it works</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#work' }">Our work</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#faq' }">FAQ</RouterLink>
        <RouterLink to="/blog">Blog</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>
      <p class="muted">&copy; 2026 .EXE &middot; Burlington, Ontario</p>
    </div>
  </footer>
</template>
