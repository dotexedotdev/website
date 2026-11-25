<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="section about section-tint" id="about">
    <div class="wrap">
      <p class="eyebrow">Meet Adam</p>
      <h2>I&rsquo;m Adam. You work directly with me.</h2>
      <p>Adam.exe is my small, hands-on consultancy. No account managers or sales teams. You talk directly to me, the engineer doing the work.</p>
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
      <p class="section-more"><RouterLink to="/about">More about Adam &rarr;</RouterLink></p>
      <blockquote class="about-quote">
        <img class="about-photo" src="/adam-photo.png" alt="Adam Stirtan" width="150" height="307" />
        <div>
          <p>&ldquo;I&rsquo;ve spent my career turning complicated technology problems into software that people can actually use &mdash; across software development, cloud infrastructure, automation, and AI.&rdquo;</p>
          <cite>&mdash; Adam Stirtan, founder of Adam.exe</cite>
        </div>
      </blockquote>
    </div>
  </section>
</template>
