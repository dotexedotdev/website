<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SlotMachine from '../components/SlotMachine.vue'
import TechLogos from '../components/TechLogos.vue'

const services = [
  {
    id: 'consulting',
    name: 'IT consulting',
    heading: 'Get a second opinion before you spend.',
    description: 'I’ll help you decide what to keep, what to replace, and what isn’t worth paying for.',
    examples: ['Review software and subscription costs', 'Compare tools before you commit', 'Plan and roll out changes'],
  },
  {
    id: 'integrations',
    name: 'Integrations',
    heading: 'Enter information once.',
    description: 'Connect the apps you already use so they can share updates.',
    examples: ['Sync customer records', 'Send payments to accounting', 'Connect bookings and calendars'],
  },
  {
    id: 'automation',
    name: 'Automation',
    heading: 'Stop chasing the same tasks.',
    description: 'Keep work moving without relying on someone to remember every step.',
    examples: ['Send reminders and status updates', 'Generate paperwork for signature', 'Follow up on unpaid invoices'],
  },
  {
    id: 'custom-software',
    name: 'Custom software',
    heading: 'Build what’s missing.',
    description: 'Replace a spreadsheet you’ve outgrown with a tool that fits how your team works.',
    examples: ['Internal dashboards', 'Customer self-service portals', 'Job trackers and business apps'],
  },
]
</script>

<template>
  <section class="section services-intro">
    <div class="wrap">
      <p class="eyebrow">Services</p>
      <h1>Get the right help for what&rsquo;s not working.</h1>
      <p class="section-intro">From a second opinion to a custom build, we&rsquo;ll start with what your business actually needs.</p>
      <ul class="service-pills" role="list">
        <li v-for="service in services" :key="service.id">{{ service.name }}</li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="service-guide">
        <article v-for="service in services" :id="service.id" :key="service.id" class="service-entry">
          <div>
            <p class="eyebrow">{{ service.name }}</p>
            <h2>{{ service.heading }}</h2>
            <p>{{ service.description }}</p>
          </div>
          <div class="service-examples">
            <ul>
              <li v-for="example in service.examples" :key="example">{{ example }}</li>
            </ul>
            <a v-if="service.id === 'integrations'" href="#integration-demo">Try the demo <span aria-hidden="true">&rarr;</span></a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section tools-section" aria-labelledby="tools-title">
    <div class="wrap">
      <p class="eyebrow">The tech stack</p>
      <h2 id="tools-title">Tools I work with</h2>
      <TechLogos />
    </div>
  </section>

  <SlotMachine />

  <section class="section">
    <div class="wrap">
      <p class="eyebrow">How it works</p>
      <h2>Talk to me for free. Know the cost before I build.</h2>
      <p>Every engagement starts with a free consultation, then we agree the scope, then pricing in writing before any work starts. The build is included, and your retainer covers hosting, monitoring, fixes, and changes.</p>
      <p>
        <RouterLink class="btn btn-primary" to="/contact">Book a free call</RouterLink>
      </p>
    </div>
  </section>
</template>
