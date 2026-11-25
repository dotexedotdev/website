<script setup lang="ts">
import TerminalWindow from './TerminalWindow.vue'
</script>

<template>
  <section class="hero" id="top">
    <div class="wrap hero-grid">
      <div>
        <p class="eyebrow">Adam Stirtan &middot; Burlington, Ontario &middot; Serving the GTA and beyond</p>
        <h1>Technical assistance your small business can trust.</h1>
        <p class="lede">I&rsquo;m Adam Stirtan, a software engineer. I build custom software, automation, and integrations around your business.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#contact">Book a free consultation</a>
          <a class="btn btn-ghost" href="#how">See how it works</a>
        </div>
        <p class="hero-trust">Work directly with Adam &middot; Free intro call &middot; No build fee &middot; You own the system</p>
      </div>
      <TerminalWindow />
    </div>
  </section>
</template>
