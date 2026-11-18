<script setup lang="ts">
import TerminalWindow from './TerminalWindow.vue'
</script>

<template>
  <section class="hero" id="top">
    <div class="wrap hero-grid">
      <div>
        <p class="eyebrow">Burlington, Ontario &middot; Serving the GTA and beyond</p>
        <h1>You&rsquo;re paying for software that doesn&rsquo;t talk to each other.</h1>
        <p class="lede">.EXE builds custom software, automation, and integrations for small businesses &mdash; so the tools you already use finally work together, and the repetitive work disappears.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#contact">Book a free consultation</a>
          <a class="btn btn-ghost" href="#how">See how it works</a>
        </div>
        <p class="hero-trust">Free intro call &middot; No build fee &middot; You own the system</p>
      </div>
      <TerminalWindow />
    </div>
  </section>
</template>
