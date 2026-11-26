<script setup lang="ts">
import { RouterLink } from 'vue-router'
import FeaturedProject from '../components/FeaturedProject.vue'
</script>

<template>
  <section class="section portfolio-intro">
    <div class="wrap">
      <p class="eyebrow">Portfolio</p>
      <h1>What the work looks like.</h1>
      <p class="section-intro">A closer look at the business problem, what I changed, and how the team uses it.</p>
      <ul class="service-pills" role="list">
        <li>IT consulting</li>
        <li>Integrations</li>
        <li>Automation</li>
        <li>Custom software</li>
      </ul>
    </div>
  </section>

  <FeaturedProject in-portfolio />

  <section class="section">
    <div class="wrap">
      <p class="eyebrow">Behind the project</p>
      <h2>Connect the handoffs, not just the apps.</h2>
      <div class="grid-3">
        <article class="card">
          <h3>The challenge</h3>
          <p>Before work could begin, someone had to set up the job, prepare the work authorization, and check that it was signed.</p>
        </article>
        <article class="card">
          <h3>What I built</h3>
          <p>Job details populate a work authorization automatically. The system sends it for signature and updates the job record when it comes back signed.</p>
        </article>
        <article class="card">
          <h3>What changed</h3>
          <p>The team gets notified when a job is approved, so they know when to start without checking for signatures themselves.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="gallery-title">
    <div class="wrap">
      <p class="eyebrow">Gallery</p>
      <h2 id="gallery-title">More work.</h2>
      <div class="project-gallery">
        <article class="project-card">
          <a class="project-card-media" href="https://www.classzoo.app" target="_blank" rel="noopener">
            <img src="/assets/classzoo-preview.png" alt="ClassZoo preview with attendance, family messaging, student profiles, and invoicing" loading="lazy" />
          </a>
          <div class="project-card-body">
            <p class="eyebrow">App / Preschool operations</p>
            <h3>ClassZoo</h3>
            <p>I built ClassZoo to help preschools run attendance, family messaging, student profiles, and invoicing in one place, with private AI built in.</p>
            <a class="project-card-link" href="https://www.classzoo.app" target="_blank" rel="noopener">Visit ClassZoo <span aria-hidden="true">&rarr;</span></a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section section-tint">
    <div class="wrap">
      <h2>Where does work get held up for your team?</h2>
      <p class="section-intro">Tell me what&rsquo;s happening. We can talk through what&rsquo;s worth changing.</p>
      <RouterLink class="btn btn-primary" to="/contact">Book a free call</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.portfolio-intro { background: var(--gradient-light); }
</style>
