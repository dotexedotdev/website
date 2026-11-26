<script setup lang="ts">
import ContactForm from './ContactForm.vue'
</script>

<template>
  <section class="section contact" id="contact">
    <div class="wrap home-split home-contact">
      <div>
        <p class="eyebrow">Free consultation</p>
        <h2>Let&rsquo;s talk about what you need.</h2>
        <p class="section-intro">A few sentences are enough to start. I&rsquo;ll reply by email to find a time for a free call or video call.</p>
        <div class="contact-direct">
          <h3>Prefer to reach out directly?</h3>
          <p><a href="tel:+13657781337">(365) 778-1337</a></p>
          <p><a href="mailto:inbox@dotexe.dev">inbox@dotexe.dev</a></p>
          <p class="muted">Burlington, Ontario<br />Serving the GTA and beyond, in person and remote.</p>
        </div>
      </div>
      <ContactForm />
    </div>
  </section>
</template>
