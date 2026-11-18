<script setup lang="ts">
import ContactForm from '../components/ContactForm.vue'
import ContactMap from '../components/ContactMap.vue'
</script>

<template>
  <section class="section">
    <div class="wrap">
      <p class="eyebrow">Contact</p>
      <h1>Talk to us.</h1>
      <p class="section-intro">Book a free call or video call &mdash; or reach out directly. We&rsquo;ll tell you honestly whether we can help, and what it would cost, before you commit to anything.</p>

      <div class="contact-grid">
        <ContactForm />
        <aside class="contact-direct">
          <h3>Prefer to reach out directly?</h3>
          <p><a href="tel:+13657781337">(365) 778-1337</a></p>
          <p><a href="mailto:inbox@dotexe.dev">inbox@dotexe.dev</a></p>
          <p class="muted">Burlington, Ontario<br />Serving the GTA and beyond, in person and remote.</p>
        </aside>
      </div>

      <ContactMap />
    </div>
  </section>
</template>
