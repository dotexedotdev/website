<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="section">
    <div class="wrap">
      <p class="eyebrow">Support</p>
      <h1>Support when you need it.</h1>
      <p class="section-intro">Something broken, slow, or just not working the way it should? Getting help is simple &mdash; and the first call is free.</p>
      <div class="grid-3">
        <article class="card">
          <h3>Call us</h3>
          <p><a href="tel:+13657781337">(365) 778-1337</a></p>
          <p class="muted">Talk to the engineer directly &mdash; no phone tree, no ticket queue.</p>
        </article>
        <article class="card">
          <h3>Email us</h3>
          <p><a href="mailto:inbox@dotexe.dev">inbox@dotexe.dev</a></p>
          <p class="muted">Describe the problem; we aim to reply the same business day.</p>
        </article>
        <article class="card">
          <h3>Send the form</h3>
          <p><RouterLink to="/contact">Book a free call</RouterLink></p>
          <p class="muted">Tell us what&rsquo;s slowing you down and pick a time that suits you.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section section-tint">
    <div class="wrap">
      <p class="eyebrow">How getting help works</p>
      <h2>Four steps, no runaround.</h2>
      <ol class="steps">
        <li>
          <span class="step-num">01</span>
          <h3>Tell us what&rsquo;s wrong</h3>
          <p>A free call or video call. Describe the problem in your own words &mdash; no jargon needed.</p>
        </li>
        <li>
          <span class="step-num">02</span>
          <h3>We figure it out</h3>
          <p>Usually remote, by screen share. On site in Burlington and across Halton and the GTA when it helps to be there in person.</p>
        </li>
        <li>
          <span class="step-num">03</span>
          <h3>We fix it and explain it</h3>
          <p>The fix, in plain English &mdash; what went wrong, what we changed, and how to avoid it next time.</p>
        </li>
        <li>
          <span class="step-num">04</span>
          <h3>We keep it fixed</h3>
          <p>Your monthly retainer covers monitoring, fixes, and ongoing changes as your business evolves.</p>
        </li>
      </ol>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <p class="eyebrow">What to expect</p>
      <h2>Straight answers, in writing, before you commit.</h2>
      <ul>
        <li>An honest answer on whether we can help &mdash; even if you don&rsquo;t need us.</li>
        <li>Pricing in writing before any work starts. No surprises, no meter running.</li>
        <li>You own the system &mdash; documented, and set up so you can operate it independently.</li>
        <li>Remote help, or in person in Burlington and across the GTA when it helps to be on site.</li>
      </ul>
      <p>
        <RouterLink class="btn btn-primary" to="/contact">Book a free call</RouterLink>
      </p>
    </div>
  </section>
</template>
