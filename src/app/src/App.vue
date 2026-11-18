<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ProblemSection from './components/ProblemSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import HowItWorksSection from './components/HowItWorksSection.vue'
import WorkSection from './components/WorkSection.vue'
import AboutSection from './components/AboutSection.vue'
import FaqSection from './components/FaqSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main">
    <HeroSection />
    <ProblemSection />
    <ServicesSection />
    <HowItWorksSection />
    <WorkSection />
    <AboutSection />
    <FaqSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
