<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="section section-tint">
    <div class="wrap">
      <p class="eyebrow">About .EXE</p>
      <h1>You work directly with the engineer solving the problem.</h1>
      <p class="lede">.EXE is a small, hands-on technology consultancy in Burlington, Ontario. No account managers or sales teams &mdash; you talk directly to the engineer doing the work.</p>
      <blockquote class="about-quote">
        <img class="about-photo" src="/adam-photo.png" alt="Adam Stirtan" width="150" height="307" />
        <div>
          <p>&ldquo;I&rsquo;ve spent my career turning complicated technology problems into software that people can actually use &mdash; across software development, cloud infrastructure, automation, and AI.&rdquo;</p>
          <cite>&mdash; Adam Stirtan, founder of .EXE</cite>
        </div>
      </blockquote>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <h2>15+ years of building software that works.</h2>
      <p>Adam has spent his career building business applications, cloud infrastructure, and automation &mdash; for startups, growing businesses, and large technology companies. .EXE is the small, direct version of that experience: one engineer, working with you, not a sales team handing you off.</p>
      <p>He started .EXE because small businesses kept getting the same raw deal: software that almost fits, subscriptions that pile up, and nobody to call who actually understands how their business runs. The fix is usually smaller than anyone expects &mdash; the right system, built around the way you already work.</p>
      <div class="grid-3">
        <article class="card">
          <h3>15+ years of software engineering</h3>
          <p>From business applications to cloud infrastructure and automation.</p>
        </article>
        <article class="card">
          <h3>Direct access to an engineer</h3>
          <p>No layers. You work directly with the person solving the problem.</p>
        </article>
        <article class="card">
          <h3>Local, in person and remote</h3>
          <p>Based in Burlington, Ontario, working across the GTA and beyond &mdash; on site when it helps, remote when it doesn&rsquo;t.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section section-tint">
    <div class="wrap">
      <p class="eyebrow">How we work</p>
      <h2>Talk first. Build second.</h2>
      <p>Every job starts the same way: a free call about where work piles up. We learn how your business actually works &mdash; including the shortcuts, handoffs, and bottlenecks nobody writes down &mdash; then we start with the smallest useful system, ship it, and improve it with real feedback.</p>
      <ol class="steps">
        <li>
          <span class="step-num">01</span>
          <h3>Free consultation</h3>
          <p>A free call or video call about where work piles up. An honest answer on whether we can fix it &mdash; even if you don&rsquo;t need us.</p>
        </li>
        <li>
          <span class="step-num">02</span>
          <h3>Agree on the scope</h3>
          <p>We agree what we&rsquo;re building, what it must do, and what success looks like. Nothing starts until we&rsquo;re on the same page.</p>
        </li>
        <li>
          <span class="step-num">03</span>
          <h3>Clear pricing, in writing</h3>
          <p>Once scope is agreed, pricing in writing &mdash; before any work starts. No surprises, no meter running.</p>
        </li>
        <li>
          <span class="step-num">04</span>
          <h3>We build it, then keep it running</h3>
          <p>The build is included. Your retainer covers hosting, monitoring, fixes, and changes &mdash; and we keep iterating until it fits.</p>
        </li>
      </ol>
      <p>
        <RouterLink class="btn btn-primary" to="/contact">Book a free call</RouterLink>
        &nbsp;
        <RouterLink class="btn btn-ghost" to="/services">See what we do</RouterLink>
      </p>
    </div>
  </section>
</template>
