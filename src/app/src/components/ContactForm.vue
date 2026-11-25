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
  <div class="contact-form-wrap">
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
      <p class="form-note">No obligation, no sales pitch. If I can&rsquo;t help, I&rsquo;ll say so.</p>
      <p v-if="error" class="form-error" role="alert">{{ error }}</p>
    </form>

    <p v-else class="sent-banner" role="status">
      Thanks, your message is on its way. I&rsquo;ll get back to you shortly.
    </p>
  </div>
</template>
