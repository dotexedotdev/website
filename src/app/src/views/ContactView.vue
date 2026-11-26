<script setup lang="ts">
import ContactForm from '../components/ContactForm.vue'
import ContactMap from '../components/ContactMap.vue'
</script>

<template>
  <section class="section contact-page-hero">
    <div class="wrap contact-grid contact-page-grid">
      <div>
        <p class="eyebrow">Contact</p>
        <h1>Let&rsquo;s talk about what&rsquo;s not working.</h1>
        <p class="section-intro">Tell me what you need help with. I&rsquo;ll reply by email to find a time for a free call.</p>

        <aside class="contact-direct">
          <h2>Prefer to reach out directly?</h2>
          <p><a href="tel:+13657781337">(365) 778-1337</a></p>
          <p><a href="mailto:inbox@dotexe.dev">inbox@dotexe.dev</a></p>
          <p class="muted">Burlington, Ontario<br />Serving the GTA and beyond, in person and remote.</p>
        </aside>
      </div>
      <ContactForm />
    </div>
  </section>

  <section class="section section-tint contact-page-location" aria-labelledby="contact-location-title">
    <div class="wrap">
      <p class="eyebrow">Where I work</p>
      <h2 id="contact-location-title">Based in Burlington, Ontario.</h2>
      <ContactMap />
    </div>
  </section>
</template>
