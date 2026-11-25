<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="section section-tint">
    <div class="wrap">
      <p class="eyebrow">About Adam.exe</p>
      <h1>I&rsquo;m Adam. You work directly with me.</h1>
      <p class="lede">Adam.exe is my small, hands-on technology consultancy in Burlington, Ontario. No account managers or sales teams. You talk directly to me, the engineer doing the work.</p>
      <blockquote class="about-quote">
        <img class="about-photo" src="/adam-photo.png" alt="Adam Stirtan" width="150" height="307" />
        <div>
          <p>&ldquo;I&rsquo;ve spent my career turning complicated technology problems into software that people can actually use &mdash; across software development, cloud infrastructure, automation, and AI.&rdquo;</p>
          <cite>&mdash; Adam Stirtan, founder of Adam.exe</cite>
        </div>
      </blockquote>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <h2>15+ years of building software that works.</h2>
      <p>I have spent my career building business applications, cloud infrastructure, and automation for startups, growing businesses, and large technology companies. Adam.exe is the small, direct version of that experience: one engineer, working with you, not a sales team handing you off.</p>
      <p>I started Adam.exe because small businesses kept getting the same raw deal: software that almost fits, subscriptions that pile up, and nobody to call who actually understands how their business runs. The fix is usually smaller than anyone expects: the right system, built around the way you already work.</p>
      <div class="grid-3">
        <article class="card">
          <h3>15+ years of software engineering</h3>
          <p>From business applications to cloud infrastructure and automation.</p>
        </article>
        <article class="card">
          <h3>Direct access to me</h3>
          <p>No layers. You work directly with the person solving the problem.</p>
        </article>
        <article class="card">
          <h3>Local, in person and remote</h3>
          <p>Based in Burlington, Ontario, working across the GTA and beyond: on site when it helps, remote when it doesn&rsquo;t.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section section-tint">
    <div class="wrap">
      <p class="eyebrow">How I work</p>
      <h2>Talk first. Build second.</h2>
      <p>Every job starts the same way: a free call about where work piles up. I learn how your business actually works, including the shortcuts, handoffs, and bottlenecks nobody writes down. Then I start with the smallest useful system, ship it, and improve it with real feedback.</p>
      <ol class="steps">
        <li>
          <span class="step-num">01</span>
          <h3>Free consultation</h3>
          <p>A free call or video call about where work piles up. An honest answer on whether I can fix it, even if you don&rsquo;t need me.</p>
        </li>
        <li>
          <span class="step-num">02</span>
          <h3>Agree on the scope</h3>
          <p>We agree what I&rsquo;m building, what it must do, and what success looks like. Nothing starts until we&rsquo;re on the same page.</p>
        </li>
        <li>
          <span class="step-num">03</span>
          <h3>Clear pricing, in writing</h3>
          <p>Once scope is agreed, pricing in writing before any work starts. No surprises, no meter running.</p>
        </li>
        <li>
          <span class="step-num">04</span>
          <h3>I build it, then keep it running</h3>
          <p>The build is included. Your retainer covers hosting, monitoring, fixes, and changes, and I keep iterating until it fits.</p>
        </li>
      </ol>
      <p>
        <RouterLink class="btn btn-primary" to="/contact">Book a free call</RouterLink>
        &nbsp;
        <RouterLink class="btn btn-ghost" to="/services">See what I do</RouterLink>
      </p>
    </div>
  </section>
</template>
