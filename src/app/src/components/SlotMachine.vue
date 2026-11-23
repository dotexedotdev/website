<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

interface System {
  name: string
  logo?: string
}

interface Pair {
  left: string
  right: string
  explainer: string
}

// Real logo files in public/assets — every system below now has one.
// Sources: Wikimedia Commons (official logo files) for Shopify, QuickBooks,
// Stripe, HubSpot, Airtable, Slack, Square, Mailchimp, WooCommerce, Notion;
// the companies' own favicons for ShipStation (shipstation.com), Calendly
// (calendly.com) and Xero (xero.com). No logo is invented or drawn.
const LOGOS: Record<string, string> = {
  Gmail: '/assets/logo-gmail.png',
  // The Google "G" brand mark, used for the Google product in this pair;
  // the tile still carries the "Google Calendar" caption so it's unambiguous.
  'Google Calendar': '/assets/logo-google.png',
  Shopify: '/assets/logo-shopify.png',
  QuickBooks: '/assets/logo-quickbooks.svg',
  Stripe: '/assets/logo-stripe.svg',
  HubSpot: '/assets/logo-hubspot.svg',
  ShipStation: '/assets/logo-shipstation.svg',
  Calendly: '/assets/logo-calendly.png',
  Airtable: '/assets/logo-airtable.svg',
  Slack: '/assets/logo-slack.png',
  Square: '/assets/logo-square.svg',
  Xero: '/assets/logo-xero.png',
  Mailchimp: '/assets/logo-mailchimp.svg',
  WooCommerce: '/assets/logo-woocommerce.svg',
  Notion: '/assets/logo-notion.svg',
}

const pairs: Pair[] = [
  { left: 'Shopify', right: 'QuickBooks', explainer: 'We turn shoppers 🛒 into transactions 💰' },
  { left: 'Stripe', right: 'QuickBooks', explainer: 'Every payment lands in your books automatically — no re-typing, no missed invoices.' },
  { left: 'Gmail', right: 'HubSpot', explainer: 'Emails become contacts, deals, and follow-ups — nothing slips through the cracks.' },
  { left: 'Shopify', right: 'ShipStation', explainer: 'Orders flow straight to shipping labels, tracking, and happy customers 📦' },
  { left: 'Calendly', right: 'Google Calendar', explainer: 'Bookings land on your calendar by themselves — no double-booking, no back-and-forth.' },
  { left: 'Airtable', right: 'Slack', explainer: 'Your team’s data pings the right people the moment something changes.' },
  { left: 'Square', right: 'Xero', explainer: 'Sales at the till show up in your accounting the same day 💳' },
  { left: 'HubSpot', right: 'Mailchimp', explainer: 'Your mailing list stays in sync with your real customers — automatically.' },
  { left: 'Stripe', right: 'Xero', explainer: 'Invoices, payments, and reconciliation — done while you sleep.' },
  { left: 'WooCommerce', right: 'QuickBooks', explainer: 'Your online store and your books finally agree with each other.' },
  { left: 'Notion', right: 'Slack', explainer: 'Docs, decisions, and updates meet your team where they already chat.' },
  { left: 'Shopify', right: 'Xero', explainer: 'From checkout to tax time, the numbers take care of themselves.' },
]

// Every system that appears in a pair — the reels scroll through these.
const pool: System[] = [...new Set(pairs.flatMap((p) => [p.left, p.right]))].map((name) => ({
  name,
  logo: LOGOS[name],
}))
const N = pool.length

// The strip repeats the pool 3 times so a spin always has runway: the reel
// rests in the middle copy and spins forward into the last copy, then snaps
// back to the identical middle position (invisibly, with no transition).
const REPS = 3
const strip: System[] = Array.from({ length: REPS }, () => pool).flat()

const currentPair = ref<Pair>(pairs[0] as Pair)
const pairIndex = ref(0)
const spinning = ref(false)
const paused = ref(false)
const reduced = ref(false)

// Per-reel scroll state. `center` is the strip index sitting on the payline
// (middle row); `y` is the strip's translateY in px; `dur` is the transition
// length in ms (0 = snap instantly, no animation).
const tileH = ref(64)

/** translateY that puts strip index `i` on the payline (middle row). */
function yFor(i: number): number {
  return -(i * tileH.value) + tileH.value
}

const leftCenter = ref(N + pool.findIndex((s) => s.name === 'Shopify'))
const rightCenter = ref(N + pool.findIndex((s) => s.name === 'QuickBooks'))
// Start on the payline so the first paint is already settled (no flash).
const leftY = ref(yFor(leftCenter.value))
const rightY = ref(yFor(rightCenter.value))
const leftDur = ref(0)
const rightDur = ref(0)
const leftBlur = ref(false)
const rightBlur = ref(false)

const leftReelEl = ref<HTMLElement | null>(null)

let nextTimer: number | undefined
let resizeTimer: number | undefined

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function measureTile(): void {
  const tile = leftReelEl.value?.querySelector('.slot-tile') as HTMLElement | null
  if (tile && tile.offsetHeight > 0) tileH.value = tile.offsetHeight
}

/** Re-center both reels instantly (no animation) — used on mount and resize. */
function snapToCenters(): void {
  leftDur.value = 0
  rightDur.value = 0
  leftY.value = yFor(leftCenter.value)
  rightY.value = yFor(rightCenter.value)
}

function clearNextTimer(): void {
  if (nextTimer !== undefined) {
    window.clearTimeout(nextTimer)
    nextTimer = undefined
  }
}

function scheduleNext(delayMs: number): void {
  clearNextTimer()
  if (reduced.value || paused.value) return
  nextTimer = window.setTimeout(() => {
    void spin()
  }, delayMs)
}

/**
 * Scroll one reel to a system, like a real slot machine: the strip scrolls
 * fast, blurs while it's moving, then eases out and lands on the target.
 * The target sits in the last copy of the strip so the reel always scrolls
 * forward; once it lands, it snaps back to the identical middle-copy
 * position with no transition, ready for the next spin.
 */
async function scrollReel(
  side: 'left' | 'right',
  target: string,
  startDelayMs: number,
  durationMs: number,
): Promise<void> {
  await sleep(startDelayMs)
  const targetIdx = pool.findIndex((s) => s.name === target)
  if (reduced.value) {
    if (side === 'left') {
      leftCenter.value = N + targetIdx
    } else {
      rightCenter.value = N + targetIdx
    }
    snapToCenters()
    return
  }
  const landing = 2 * N + targetIdx
  const setBlur = (v: boolean): void => {
    if (side === 'left') leftBlur.value = v
    else rightBlur.value = v
  }
  const setDur = (v: number): void => {
    if (side === 'left') leftDur.value = v
    else rightDur.value = v
  }
  const setY = (v: number): void => {
    if (side === 'left') leftY.value = v
    else rightY.value = v
  }
  setBlur(true)
  setDur(durationMs)
  setY(yFor(landing))
  // Sharpen as the reel decelerates into the landing.
  window.setTimeout(() => setBlur(false), Math.round(durationMs * 0.65))
  await sleep(durationMs + 60)
  // Snap back to the middle copy — same tiles, so the jump is invisible.
  setDur(0)
  setY(yFor(landing - N))
  if (side === 'left') leftCenter.value = landing - N
  else rightCenter.value = landing - N
}

async function spin(): Promise<void> {
  if (spinning.value) return
  clearNextTimer()
  spinning.value = true

  // Pick a new pair, different from the one showing.
  let nextIndex = pairIndex.value
  while (nextIndex === pairIndex.value) {
    nextIndex = Math.floor(Math.random() * pairs.length)
  }
  const nextPair = pairs[nextIndex] as Pair

  // Both reels spin together — same start, same duration — and land together.
  // Every spin lasts ~2s so it reads as a real spin, never a quick jump.
  await Promise.all([
    scrollReel('left', nextPair.left, 0, 2000),
    scrollReel('right', nextPair.right, 0, 2000),
  ])

  currentPair.value = nextPair
  pairIndex.value = nextIndex
  spinning.value = false
  scheduleNext(5000)
}

function onEnter(): void {
  paused.value = true
  clearNextTimer()
}

function onLeave(): void {
  paused.value = false
  if (!spinning.value) scheduleNext(2500)
}

function onResize(): void {
  window.clearTimeout(resizeTimer)
  resizeTimer = window.setTimeout(() => {
    measureTile()
    snapToCenters()
  }, 150)
}

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  void nextTick(() => {
    measureTile()
    snapToCenters()
  })
  window.addEventListener('resize', onResize)
  // First auto-spin a few seconds after the page loads.
  scheduleNext(4000)
})

onUnmounted(() => {
  clearNextTimer()
  window.clearTimeout(resizeTimer)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <section class="section slot" id="integrations" @mouseenter="onEnter" @mouseleave="onLeave">
    <div class="wrap">
      <p class="eyebrow">Integrations</p>
      <h2>Pick any two systems. We&rsquo;ll connect them.</h2>
      <p class="section-intro">Your business already runs on a dozen tools. The trick is making them talk to each other.</p>

      <div class="slot-reels" aria-label="Systems we connect">
        <div ref="leftReelEl" class="slot-reel" :class="{ blur: leftBlur }" aria-hidden="true">
          <div
            class="slot-strip"
            :style="{ transform: `translateY(${leftY}px)`, transitionDuration: `${leftDur}ms` }"
          >
            <div v-for="(system, i) in strip" :key="`l-${i}`" class="slot-tile">
              <img v-if="system.logo" :src="system.logo" :alt="''" class="slot-tile-logo" />
              <span class="slot-tile-name">{{ system.name }}</span>
            </div>
          </div>
          <div class="slot-payline"></div>
        </div>
        <div class="slot-connector" aria-hidden="true">+</div>
        <div class="slot-reel" :class="{ blur: rightBlur }" aria-hidden="true">
          <div
            class="slot-strip"
            :style="{ transform: `translateY(${rightY}px)`, transitionDuration: `${rightDur}ms` }"
          >
            <div v-for="(system, i) in strip" :key="`r-${i}`" class="slot-tile">
              <img v-if="system.logo" :src="system.logo" :alt="''" class="slot-tile-logo" />
              <span class="slot-tile-name">{{ system.name }}</span>
            </div>
          </div>
          <div class="slot-payline"></div>
        </div>
      </div>
      <p class="sr-only" aria-live="polite">
        {{ currentPair.left }} plus {{ currentPair.right }}: {{ currentPair.explainer }}
      </p>

      <div class="slot-explainer">
        <p>
          <strong>{{ currentPair.left }} + {{ currentPair.right }}</strong> &mdash;
          {{ currentPair.explainer }}
        </p>
      </div>

      <div class="slot-controls">
        <button class="btn btn-primary" type="button" :disabled="spinning" @click="spin">
          {{ spinning ? 'Spinning…' : 'Spin the reels' }}
        </button>
      </div>

      <p class="slot-cta">
        Want your two systems connected?
        <RouterLink to="/contact">Book a free call &rarr;</RouterLink>
      </p>
    </div>
  </section>
</template>
