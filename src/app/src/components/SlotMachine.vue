<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface Pair {
  left: string
  right: string
  explainer: string
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

// Every system that appears in a pair — the reels cycle through these.
const pool = [...new Set(pairs.flatMap((p) => [p.left, p.right]))]
const N = pool.length

const leftIdx = ref(pool.indexOf('Shopify'))
const rightIdx = ref(pool.indexOf('QuickBooks'))
const currentPair = ref<Pair>(pairs[0] as Pair)
const pairIndex = ref(0)
const spinning = ref(false)
const explainerVisible = ref(true)
const paused = ref(false)
const reduced = ref(false)

const leftName = computed(() => pool[leftIdx.value])
const rightName = computed(() => pool[rightIdx.value])
const leftPrev = computed(() => pool[(leftIdx.value - 1 + N) % N])
const leftNext = computed(() => pool[(leftIdx.value + 1) % N])
const rightPrev = computed(() => pool[(rightIdx.value - 1 + N) % N])
const rightNext = computed(() => pool[(rightIdx.value + 1) % N])

let nextTimer: number | undefined

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
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

/** Run one reel: cycle through names, slowing down, landing exactly on target. */
async function runReel(side: 'left' | 'right', target: string, startDelayMs: number): Promise<void> {
  await sleep(startDelayMs)
  const targetIdx = pool.indexOf(target)
  if (reduced.value) {
    if (side === 'left') leftIdx.value = targetIdx
    else rightIdx.value = targetIdx
    return
  }
  // Tick delays: fast, then slower, then slow — 23 ticks in total.
  const delays = [...Array(14).fill(70), ...Array(6).fill(130), ...Array(3).fill(220)]
  // Start the reel so that the final tick lands exactly on the target.
  let idx = (((targetIdx - delays.length) % N) + N) % N
  if (side === 'left') leftIdx.value = idx
  else rightIdx.value = idx
  for (const delay of delays) {
    await sleep(delay)
    idx = (idx + 1) % N
    if (side === 'left') leftIdx.value = idx
    else rightIdx.value = idx
  }
}

async function spin(): Promise<void> {
  if (spinning.value) return
  clearNextTimer()
  spinning.value = true
  explainerVisible.value = false

  // Pick a new pair, different from the one showing.
  let nextIndex = pairIndex.value
  while (nextIndex === pairIndex.value) {
    nextIndex = Math.floor(Math.random() * pairs.length)
  }
  const nextPair = pairs[nextIndex] as Pair

  // Left reel settles first, right reel a beat later.
  await Promise.all([runReel('left', nextPair.left, 0), runReel('right', nextPair.right, 500)])

  currentPair.value = nextPair
  pairIndex.value = nextIndex
  explainerVisible.value = true
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

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // First auto-spin a few seconds after the page loads.
  scheduleNext(4000)
})

onUnmounted(() => {
  clearNextTimer()
})
</script>

<template>
  <section class="section slot" id="integrations" @mouseenter="onEnter" @mouseleave="onLeave">
    <div class="wrap">
      <p class="eyebrow">Integrations</p>
      <h2>Pick any two systems. We&rsquo;ll connect them.</h2>
      <p class="section-intro">Your business already runs on a dozen different tools. The magic is making them talk to each other &mdash; here are a few of the pairs we wire up every day.</p>

      <div class="slot-reels" aria-label="Systems we connect">
        <div class="slot-reel" aria-hidden="true">
          <div class="slot-row neighbor">{{ leftPrev }}</div>
          <div class="slot-row current"><span :key="leftName">{{ leftName }}</span></div>
          <div class="slot-row neighbor">{{ leftNext }}</div>
        </div>
        <div class="slot-connector" aria-hidden="true">+</div>
        <div class="slot-reel" aria-hidden="true">
          <div class="slot-row neighbor">{{ rightPrev }}</div>
          <div class="slot-row current"><span :key="rightName">{{ rightName }}</span></div>
          <div class="slot-row neighbor">{{ rightNext }}</div>
        </div>
      </div>
      <p class="sr-only" aria-live="polite">
        {{ currentPair.left }} plus {{ currentPair.right }}: {{ currentPair.explainer }}
      </p>

      <Transition name="fade-slide" mode="out-in">
        <div v-if="explainerVisible" :key="pairIndex" class="slot-explainer">
          <p>
            <strong>{{ currentPair.left }} + {{ currentPair.right }}</strong> &mdash;
            {{ currentPair.explainer }}
          </p>
        </div>
      </Transition>

      <div class="slot-controls">
        <button class="btn btn-primary" type="button" :disabled="spinning" @click="spin">
          {{ spinning ? 'Spinning…' : 'Spin the reels' }}
        </button>
        <span class="slot-count">Combination {{ pairIndex + 1 }} of {{ pairs.length }}</span>
      </div>

      <p class="slot-cta">
        Want your two systems connected?
        <RouterLink to="/contact">Book a free call &rarr;</RouterLink>
      </p>
    </div>
  </section>
</template>
