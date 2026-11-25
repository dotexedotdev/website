<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand">
          <RouterLink class="logo footer-logo" to="/" aria-label="Adam.exe home"
            ><img src="/logo-icon.png" alt="" width="64" height="64" /><span class="logo-mark">Adam.exe</span></RouterLink
          >
          <p class="muted">Software that works for your business.</p>
          <p class="muted">Adam Stirtan&rsquo;s small, hands-on technology consultancy in Burlington, Ontario: custom software, automation, and integrations for small businesses.</p>
        </div>
        <nav class="footer-col" aria-label="Explore">
          <h3>Explore</h3>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/services">Services</RouterLink>
          <RouterLink to="/support">Support</RouterLink>
          <RouterLink to="/blog">Blog</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
          <RouterLink :to="{ path: '/', hash: '#reviews' }">Reviews</RouterLink>
        </nav>
        <nav class="footer-col" aria-label="Services">
          <h3>Services</h3>
          <RouterLink to="/services#custom-software">Custom Software</RouterLink>
          <RouterLink to="/services#automation">Automation</RouterLink>
          <RouterLink to="/services#integrations">Integrations</RouterLink>
          <RouterLink to="/services#consulting">Technical Consulting</RouterLink>
        </nav>
        <div class="footer-col">
          <h3>Get in touch</h3>
          <p><a href="tel:+13657781337">(365) 778-1337</a></p>
          <p><a href="mailto:inbox@dotexe.dev">inbox@dotexe.dev</a></p>
          <p class="muted">Burlington, Ontario<br />Serving the GTA and beyond, in person and remote.</p>
          <p><RouterLink class="btn btn-primary btn-small" to="/contact">Book a free call</RouterLink></p>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="muted">&copy; 2026 Adam.exe &middot; Burlington, Ontario</p>
      </div>
    </div>
  </footer>
</template>
