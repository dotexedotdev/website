<script setup lang="ts">
import ContactForm from './ContactForm.vue'
import ContactMap from './ContactMap.vue'
</script>

<template>
  <section class="section contact" id="contact">
    <div class="wrap">
      <p class="eyebrow">Free consultation</p>
      <h2>Tell us what&rsquo;s slowing you down.</h2>
      <p class="section-intro">Book a free call or video call. We&rsquo;ll tell you honestly whether we can fix it &mdash; before you commit to anything.</p>

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
