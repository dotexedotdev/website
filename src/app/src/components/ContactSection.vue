<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  business: '',
  email: '',
  phone: '',
  message: '',
  website: '',
})

const sending = ref(false)
const sent = ref(false)
const error = ref('')

async function submit(): Promise<void> {
  error.value = ''
  sending.value = true
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const body = (await response.json().catch(() => ({}))) as { message?: string }
    if (!response.ok) {
      throw new Error(
        body.message ?? 'The message could not be sent. Please try again or email inbox@dotexe.dev directly.',
      )
    }
    sent.value = true
  } catch (e) {
    error.value =
      e instanceof Error
        ? e.message
        : 'The message could not be sent. Please try again or email inbox@dotexe.dev directly.'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section class="section contact" id="contact">
    <div class="wrap">
      <p class="eyebrow">Free consultation</p>
      <h2>Tell us what&rsquo;s slowing you down.</h2>
      <p class="section-intro">Book a free call or video call. We&rsquo;ll tell you honestly whether we can fix it &mdash; and exactly what it would cost &mdash; before you commit to anything.</p>

      <div class="contact-grid">
        <form v-if="!sent" id="contact-form" @submit.prevent="submit">
          <input
            v-model="form.website"
            type="text"
            name="website"
            class="honeypot"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
          />

          <div class="field">
            <label for="name">Your name</label>
            <input id="name" v-model="form.name" type="text" autocomplete="name" required />
          </div>
          <div class="field">
            <label for="business">Business</label>
            <input id="business" v-model="form.business" type="text" autocomplete="organization" />
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input id="email" v-model="form.email" type="email" autocomplete="email" required />
          </div>
          <div class="field">
            <label for="phone">Phone <span class="optional">(optional)</span></label>
            <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" />
          </div>
          <div class="field">
            <label for="message">What&rsquo;s eating your time or budget?</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="5"
              required
              placeholder="A sentence or two is plenty — what’s the work that keeps piling up?"
            ></textarea>
          </div>
          <button class="btn btn-primary" type="submit" :disabled="sending">
            {{ sending ? 'Sending…' : 'Request a free consultation' }}
          </button>
          <p class="form-note">No obligation, no sales pitch. If we can&rsquo;t help, we&rsquo;ll say so.</p>
          <p v-if="error" class="form-error" role="alert">{{ error }}</p>
        </form>

        <p v-else class="sent-banner" role="status">
          Thanks &mdash; your message is on its way. We&rsquo;ll get back to you shortly.
        </p>

        <aside class="contact-direct">
          <h3>Prefer to reach out directly?</h3>
          <p><a href="tel:+13657781337">(365) 778-1337</a></p>
          <p><a href="mailto:inbox@dotexe.dev">inbox@dotexe.dev</a></p>
          <p class="muted">Burlington, Ontario<br />Serving the GTA and beyond, in person and remote.</p>
        </aside>
      </div>
    </div>
  </section>
</template>
