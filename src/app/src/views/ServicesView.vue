<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="section">
    <div class="wrap">
      <p class="eyebrow">Services</p>
      <h1>Software built around your business, not the other way around.</h1>
      <p class="section-intro">Custom business software, automation, and integrations &mdash; built around the tools your team already uses.</p>
    </div>
  </section>

  <section class="section section-tint">
    <div class="wrap">
      <div class="grid-2">
        <article class="card service" id="custom-software">
          <div class="service-art"><img src="/assets/service-dashboard.png" alt="Illustration of a software dashboard" /></div>
          <h3>Custom Software</h3>
          <p>When spreadsheets and off-the-shelf software aren&rsquo;t quite right, build something around the way your business actually works.</p>
          <ul>
            <li>Internal business apps</li>
            <li>Dashboards</li>
            <li>Customer portals</li>
            <li>Mobile apps</li>
            <li>Custom databases</li>
            <li>Integrations with existing software</li>
          </ul>
        </article>
        <article class="card service" id="automation">
          <div class="service-art"><img src="/assets/service-workflow.png" alt="Illustration of documents flowing through a workflow" /></div>
          <h3>Automation</h3>
          <p>Make repetitive administrative work happen automatically &mdash; and connect the systems you already use.</p>
          <ul>
            <li>Automated notifications &amp; reminders</li>
            <li>Invoice &amp; payment workflows</li>
            <li>Document generation &amp; signatures</li>
            <li>Connecting apps together</li>
            <li>AI-assisted workflows</li>
          </ul>
        </article>
        <article class="card service" id="integrations">
          <div class="service-art"><img src="/assets/service-integrations.png" alt="Illustration of people and systems connected together" /></div>
          <h3>Integrations</h3>
          <p>Your CRM, documents, payments, and communications share the same information automatically. No re-typing, no wondering which copy is current.</p>
          <ul>
            <li>CRM &amp; sales systems</li>
            <li>Documents &amp; signatures</li>
            <li>Payments &amp; accounting</li>
            <li>Email &amp; calendars</li>
          </ul>
          <p><RouterLink :to="{ path: '/', hash: '#integrations' }">See pairs we connect every day &rarr;</RouterLink></p>
        </article>
        <article class="card service" id="consulting">
          <div class="service-art"><img src="/assets/service-videocall.png" alt="Illustration of two people in a video call" /></div>
          <h3>Technical Consulting</h3>
          <p>Clear advice when the path isn&rsquo;t &mdash; including the bill. We help businesses escape endless subscriptions for cost-effective apps that work.</p>
          <ul>
            <li>Software &amp; subscription cost reviews</li>
            <li>Choosing the right tools for your business</li>
            <li>In-person &amp; remote help along the way</li>
          </ul>
        </article>
      </div>

      <div class="tech-logos" aria-label="Technologies we work with">
        <div class="tech-logo"><img src="/assets/microsoft.svg" alt="" /><span>Microsoft 365</span></div>
        <div class="tech-logo"><img src="/assets/microsoftazure.svg" alt="" /><span>Azure</span></div>
        <div class="tech-logo"><img src="/assets/logo-outlook.png" alt="" /><span>Microsoft Outlook</span></div>
        <div class="tech-logo"><img src="/assets/logo-google.png" alt="" /><span>Google Workspace</span></div>
        <div class="tech-logo"><img src="/assets/logo-google-cloud.png" alt="" /><span>Google Cloud</span></div>
        <div class="tech-logo"><img src="/assets/logo-gmail.png" alt="" /><span>Gmail</span></div>
        <div class="tech-logo"><img src="/assets/logo-aws.png" alt="" /><span>AWS</span></div>
        <div class="tech-logo"><img src="/assets/github.svg" alt="" /><span>GitHub</span></div>
        <div class="tech-logo"><img src="/assets/logo-openai.png" alt="" /><span>OpenAI</span></div>
        <div class="tech-logo"><img src="/assets/logo-supabase.png" alt="" /><span>Supabase</span></div>
        <div class="tech-logo"><img src="/assets/csharp.svg" alt="" /><span>C# / .NET</span></div>
        <div class="tech-logo"><img src="/assets/linux.svg" alt="" /><span>Linux</span></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <p class="eyebrow">How it works</p>
      <h2>Talk to us for free. Know the cost before we build.</h2>
      <p>Every engagement starts with a free consultation, then we agree the scope, then pricing in writing &mdash; before any work starts. The build is included, and your retainer covers hosting, monitoring, fixes, and changes.</p>
      <p>
        <RouterLink class="btn btn-primary" to="/contact">Book a free call</RouterLink>
        &nbsp;
        <RouterLink class="btn btn-ghost" to="/support">How support works</RouterLink>
      </p>
    </div>
  </section>
</template>
