<script setup lang="ts">
import { shallowRef, useTemplateRef } from 'vue'
import { RouterLink } from 'vue-router'
import TechLogos from '../components/TechLogos.vue'
import { portfolioProjects, type ProjectScreenshot } from './portfolioProjects'

const capabilities = [
  { name: 'Custom software', description: 'Apps that fit the way your team works.', icon: 'M4 5h16v14H4zM4 9h16m-12 4-2 2 2 2m8-4 2 2-2 2' },
  { name: 'Automation', description: 'Paperwork, reminders, and handoffs that run on their own.', icon: 'm13 3-8 11h6l-1 7 9-11h-6l1-7z' },
  { name: 'Integrations', description: 'Tools that share updates without double entry.', icon: 'm10 13 4-4m-6 6-1 1a3 3 0 0 1-4-4l4-4a3 3 0 0 1 4 0m2 2a3 3 0 0 0 4 0l4-4a3 3 0 0 0-4-4l-1 1' },
  { name: 'IT consulting', description: 'A practical plan for what to keep, change, or replace.', icon: 'M5 5h14v11h-8l-4 4v-4H5zM8 9h8m-8 3h5' },
]

const screenshotDialog = useTemplateRef<HTMLDialogElement>('screenshotDialog')
const activeScreenshot = shallowRef<ProjectScreenshot>()

function enlargeScreenshot(screenshot: ProjectScreenshot) {
  activeScreenshot.value = screenshot
  screenshotDialog.value?.showModal()
}
</script>

<template>
  <section class="hero portfolio-hero" aria-labelledby="portfolio-title">
    <div class="wrap hero-grid">
      <div>
        <p class="eyebrow">Portfolio / Selected work</p>
        <h1 id="portfolio-title">Less chasing.<br />More getting done.</h1>
        <p class="lede">See how Adam.exe helps small teams replace manual work, connect their tools, and build what&rsquo;s missing.</p>
      </div>
      <div class="capabilities">
        <h2 class="eyebrow">What Adam.exe does</h2>
        <ul class="capability-grid" role="list">
          <li v-for="capability in capabilities" :key="capability.name">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path :d="capability.icon" />
            </svg>
            <strong>{{ capability.name }}</strong>
            <span>{{ capability.description }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section id="case-studies" class="section section-tint" aria-labelledby="case-studies-title">
    <div class="wrap">
      <p class="eyebrow">Case studies</p>
      <h2 id="case-studies-title">A closer look at the work.</h2>
      <div class="case-studies">
        <details v-for="project in portfolioProjects" :id="project.anchor" :key="project.name" :open="project.initiallyOpen" class="project-panel" :data-tone="project.tone">
          <summary class="project-summary">
            <span class="project-logo" aria-hidden="true">
              <svg v-if="typeof project.logo === 'string'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path :d="project.logo" />
              </svg>
              <img v-else :src="project.logo.src" alt="" />
            </span>
            <span class="project-heading">
              <span class="project-meta eyebrow">{{ project.category }}<span v-if="project.concept" class="concept-label">Concept</span></span>
              <strong class="project-name">{{ project.name }}</strong>
              <span class="project-synopsis">{{ project.synopsis }}</span>
            </span>
            <span class="project-toggle" aria-hidden="true"></span>
          </summary>
          <div class="project-body">
            <div>
              <h3>About the project</h3>
              <p>{{ project.description }}</p>
              <h3 class="eyebrow project-stack">{{ project.concept ? 'Proposed stack' : 'Built with' }}</h3>
              <TechLogos v-if="project.technologies" :technologies="project.technologies" />
              <p v-else class="stack-note">Technology stack not disclosed here.</p>
              <a v-if="project.url" class="project-link" :href="project.url" target="_blank" rel="noopener">
                Visit {{ project.name }} <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <div v-if="project.media.kind === 'screenshots'" class="project-media project-screenshots">
              <button v-for="image in project.media.images" :key="image.src" type="button" :aria-label="`Enlarge ${project.name}: ${image.title}`" @click="enlargeScreenshot(image)">
                <img :src="image.src" alt="" :width="image.width" :height="image.height" loading="lazy" />
                <span>{{ image.title }}</span>
              </button>
            </div>
            <figure v-else class="project-media">
              <img v-if="project.media.kind === 'image'" :src="project.media.src" :alt="project.media.alt" :width="project.media.width" :height="project.media.height" loading="lazy" />
              <video v-else-if="project.media.kind === 'video'" :src="project.media.src" controls preload="none">
                <track kind="captions" :src="project.media.captions" srclang="en" label="English" />
              </video>
              <div v-else class="project-mockup">
                <p class="eyebrow">{{ project.name }}</p>
                <strong>{{ project.media.title }}</strong>
                <ul role="list">
                  <li v-for="row in project.media.rows" :key="row.label"><span>{{ row.label }}</span><span class="mockup-status">{{ row.status }}</span></li>
                </ul>
              </div>
              <figcaption>{{ project.media.kind === 'mockup' ? 'Interface concept · Sample data' : project.media.caption }}</figcaption>
            </figure>
          </div>
        </details>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <h2>Where does work get held up for your team?</h2>
      <p class="section-intro">Tell me what&rsquo;s happening. We can talk through what&rsquo;s worth changing.</p>
      <RouterLink class="btn btn-primary" to="/contact">Book a free call</RouterLink>
    </div>
  </section>

  <dialog ref="screenshotDialog" class="screenshot-dialog" aria-label="Enlarged screenshot" @click="screenshotDialog?.close()" @close="activeScreenshot = undefined">
    <button type="button" autofocus aria-label="Close enlarged screenshot">
      <img v-if="activeScreenshot" :src="activeScreenshot.src" :alt="activeScreenshot.title" :width="activeScreenshot.width" :height="activeScreenshot.height" />
      <span>Click anywhere or press Esc to close</span>
    </button>
  </dialog>
</template>

<style scoped>
.portfolio-hero .eyebrow { color: var(--indigo-light); }
.portfolio-hero .lede { margin-bottom: 0; }
.portfolio-hero .hero-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr); }
.capabilities {
  width: 100%;
  padding: clamp(14px, 2.5vw, 22px);
  border: 1px solid rgba(165, 180, 252, 0.36);
  border-radius: var(--radius);
  background: linear-gradient(145deg, rgba(40, 43, 85, 0.95), rgba(18, 24, 42, 0.94));
  box-shadow: 0 28px 64px rgba(8, 10, 28, 0.45);
}
.capabilities h2 { margin: 0 0 14px; font-weight: 600; }
.capability-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 140px), 1fr));
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.capability-grid li {
  display: grid;
  align-content: start;
  gap: 6px;
  margin: 0;
  padding: clamp(10px, 1.5vw, 15px);
  border: 1px solid rgba(165, 180, 252, 0.24);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
}
.capability-grid svg { width: 22px; height: 22px; margin-bottom: 3px; color: var(--indigo-light); }
.capability-grid strong { font-size: 0.98rem; line-height: 1.25; }
.capability-grid span { color: #dce2f1; font-size: 0.86rem; line-height: 1.45; }

.case-studies { display: grid; gap: 14px; margin-top: 28px; }
.project-panel {
  --project-ink: #343e93;
  --project-wash: #e8ebff;
  --panel-padding: clamp(16px, 3vw, 28px);
  scroll-margin-top: 84px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--bg-card);
  box-shadow: 0 1px 3px rgba(26, 34, 51, 0.05);
}
.project-panel[data-tone='teal'] { --project-ink: #15594f; --project-wash: #e0f4ee; }
.project-panel[data-tone='amber'] { --project-ink: #794311; --project-wash: #fff0d9; }
.project-panel[data-tone='violet'] { --project-ink: #643683; --project-wash: #f3e8ff; }
.project-panel[open] { border-color: var(--line-strong); }
.project-summary {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: clamp(12px, 2vw, 20px);
  padding: var(--panel-padding);
  border-radius: var(--radius);
  cursor: pointer;
  list-style: none;
}
.project-summary::-webkit-details-marker { display: none; }
.project-summary:hover { background: var(--indigo-soft); }
.project-summary:focus-visible { outline-offset: -3px; }
.project-logo {
  display: grid;
  place-items: center;
  width: clamp(40px, 6vw, 60px);
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  background: var(--project-wash);
  color: var(--project-ink);
}
.project-logo svg { width: 56%; }
.project-logo img { display: block; width: 100%; height: 100%; object-fit: cover; }
.project-heading { display: grid; gap: 4px; }
.project-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px 10px;
  margin: 0;
  color: var(--project-ink);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
}
.concept-label { padding: 1px 7px; border-radius: 999px; background: var(--project-wash); }
.project-name { font-size: clamp(1.15rem, 2.5vw, 1.5rem); line-height: 1.2; letter-spacing: -0.02em; }
.project-synopsis { color: var(--muted); line-height: 1.45; }
.project-toggle {
  display: grid;
  place-items: center;
  width: clamp(30px, 5vw, 40px);
  aspect-ratio: 1;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: var(--bg-soft);
  color: var(--indigo);
}
.project-toggle::before, .project-toggle::after {
  content: '';
  grid-area: 1 / 1;
  width: 12px;
  height: 2px;
  border-radius: 1px;
  background: currentColor;
}
.project-toggle::after { rotate: 90deg; }
.project-panel[open] .project-toggle::after { display: none; }
.project-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: start;
  gap: clamp(20px, 4vw, 40px);
  margin: 0 var(--panel-padding);
  padding: var(--panel-padding) 0;
  border-top: 1px solid var(--line);
}
.project-body p { color: var(--muted); }
.project-stack { font-weight: 700; }
.project-body :deep(.tech-logos) { margin-top: 0; }
.stack-note { margin-bottom: 0; }
.project-link { display: inline-block; margin-top: 16px; font-weight: 700; }
.project-media { margin: 0; }
.project-media img, .project-media video {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 10px;
  background: var(--gradient-dark);
}
.project-media figcaption { margin-top: 6px; color: var(--muted); font-size: 0.85rem; }
.project-screenshots { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.project-screenshots button {
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--bg-soft);
  color: var(--text);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: zoom-in;
}
.project-screenshots button:first-child { grid-column: 1 / -1; }
.project-screenshots button:hover { border-color: var(--indigo); }
.project-screenshots button span { display: block; padding: 4px 8px; }
.screenshot-dialog {
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  margin: auto;
  padding: 0;
  border: 0;
  background: transparent;
}
.screenshot-dialog::backdrop { background: rgba(11, 16, 33, 0.94); }
.screenshot-dialog button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  height: 100%;
  padding: 16px;
  border: 0;
  background: transparent;
  color: white;
  font: inherit;
  cursor: zoom-out;
}
.screenshot-dialog button:focus-visible { outline-color: var(--indigo-light); outline-offset: -5px; }
.screenshot-dialog img { width: auto; height: auto; max-height: calc(100dvh - 88px); object-fit: contain; border-radius: 10px; }
.project-mockup {
  padding: clamp(10px, 3vw, 24px);
  border-radius: 10px;
  background: var(--project-wash);
}
.project-mockup .eyebrow { margin-bottom: 4px; color: var(--project-ink); font-size: 0.72rem; }
.project-mockup ul { display: grid; gap: 6px; margin: 12px 0 0; padding: 0; list-style: none; }
.project-mockup li {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 8px;
  margin: 0;
  padding: 8px 10px;
  border-radius: 6px;
  background: var(--bg-card);
  font-size: 0.85rem;
}
.mockup-status { color: var(--project-ink); font-size: 0.8rem; font-weight: 700; }

@media (max-width: 700px) {
  .portfolio-hero .hero-grid, .project-body { grid-template-columns: minmax(0, 1fr); }
  .capabilities { max-width: 460px; }
  .project-summary { align-items: start; }
}
</style>
