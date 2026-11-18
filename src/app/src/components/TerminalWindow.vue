<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

/*
 * Animated terminal showing the real Norgard automation flow as code.
 * Types line by line with a blinking cursor, shows the result line,
 * pauses, then loops. With prefers-reduced-motion the full code is
 * shown statically with no typing.
 */

interface Segment {
  text: string
  cls: string
}

interface CodeLine {
  num: number
  segments: Segment[]
}

interface FlatChar {
  ch: string
  cls: string
}

const LINES: CodeLine[] = [
  { num: 1, segments: [
    { text: 'customer', cls: 'tk-var' },
    { text: ' = ', cls: 'tk-punct' },
    { text: 'receive_new_customer()', cls: 'tk-fn' },
  ] },
  { num: 2, segments: [] },
  { num: 3, segments: [
    { text: 'job', cls: 'tk-var' },
    { text: ' = ', cls: 'tk-punct' },
    { text: 'create_job(', cls: 'tk-fn' },
    { text: 'typeof(', cls: 'tk-var' },
    { text: 'customer', cls: 'tk-var' },
    { text: '))', cls: 'tk-punct' },
  ] },
  { num: 4, segments: [
    { text: 'save_to_crm(', cls: 'tk-fn' },
    { text: '"job"', cls: 'tk-str' },
    { text: ')', cls: 'tk-punct' },
  ] },
  { num: 5, segments: [] },
  { num: 6, segments: [
    { text: 'document', cls: 'tk-var' },
    { text: ' = ', cls: 'tk-punct' },
    { text: 'fill_template(', cls: 'tk-fn' },
    { text: '"work_authorization"', cls: 'tk-str' },
    { text: ', ', cls: 'tk-punct' },
    { text: 'job', cls: 'tk-var' },
    { text: ')', cls: 'tk-punct' },
  ] },
  { num: 7, segments: [
    { text: 'send_for_signature(', cls: 'tk-fn' },
    { text: 'document', cls: 'tk-var' },
    { text: ')', cls: 'tk-punct' },
  ] },
  { num: 8, segments: [] },
  { num: 9, segments: [
    { text: 'when_signed(', cls: 'tk-fn' },
    { text: 'document', cls: 'tk-var' },
    { text: '):', cls: 'tk-punct' },
  ] },
  { num: 10, segments: [
    { text: '    update_job(', cls: 'tk-fn' },
    { text: 'job', cls: 'tk-var' },
    { text: ', ', cls: 'tk-punct' },
    { text: 'status', cls: 'tk-var' },
    { text: '=', cls: 'tk-punct' },
    { text: '"Approved"', cls: 'tk-str' },
    { text: ')', cls: 'tk-punct' },
  ] },
  { num: 11, segments: [
    { text: '    notify_team(', cls: 'tk-fn' },
    { text: 'job', cls: 'tk-var' },
    { text: ')', cls: 'tk-punct' },
  ] },
]

const RESULT = 'job NO2002 — Approved · team notified'

const FLAT: FlatChar[][] = LINES.map((line) =>
  line.segments.flatMap((seg) => [...seg.text].map((ch) => ({ ch, cls: seg.cls }))),
)

const CHAR_MS = 26
const LINE_PAUSE_MS = 130
const RESULT_PAUSE_MS = 3600
const REPLAY_PAUSE_MS = 1400

const typedLine = ref(0)
const typedChars = ref(0)
const showResult = ref(false)
const reducedMotion = ref(false)

let timer: number | undefined

function clearTimer(): void {
  if (timer !== undefined) {
    window.clearTimeout(timer)
    timer = undefined
  }
}

function schedule(fn: () => void, ms: number): void {
  clearTimer()
  timer = window.setTimeout(fn, ms)
}

function showAll(): void {
  typedLine.value = LINES.length - 1
  typedChars.value = (FLAT[LINES.length - 1] ?? []).length
  showResult.value = true
}

function tick(): void {
  const line = FLAT[typedLine.value] ?? []
  if (typedChars.value < line.length) {
    typedChars.value += 1
    schedule(tick, CHAR_MS)
    return
  }
  if (typedLine.value < LINES.length - 1) {
    schedule(() => {
      typedLine.value += 1
      typedChars.value = 0
      schedule(tick, CHAR_MS)
    }, LINE_PAUSE_MS)
    return
  }
  schedule(() => {
    showResult.value = true
    schedule(() => {
      typedLine.value = 0
      typedChars.value = 0
      showResult.value = false
      schedule(tick, CHAR_MS)
    }, RESULT_PAUSE_MS)
  }, LINE_PAUSE_MS)
}

function visibleChars(lineIndex: number): FlatChar[] {
  const line = FLAT[lineIndex] ?? []
  if (lineIndex < typedLine.value) return line
  if (lineIndex === typedLine.value) return line.slice(0, typedChars.value)
  return []
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion.value) {
    showAll()
  } else {
    schedule(tick, 500)
  }
})

onUnmounted(() => {
  clearTimer()
})
</script>

<template>
  <div class="terminal" role="img" aria-label="Terminal showing the Norgard Restoration automation as code: a new customer becomes a job, is saved to the CRM, a work authorization is filled in and sent for signature, and once signed the job is marked Approved and the team is notified.">
    <div class="term-titlebar" aria-hidden="true">
      <span class="term-dot dot-red"></span>
      <span class="term-dot dot-yellow"></span>
      <span class="term-dot dot-green"></span>
      <span class="term-title">.exe</span>
    </div>
    <div class="term-body" aria-hidden="true">
      <div v-for="(line, lineIndex) in LINES" :key="line.num" class="term-line">
        <span class="term-num">{{ line.num }}</span>
        <span class="term-code"><span
          v-for="(c, charIndex) in visibleChars(lineIndex)"
          :key="charIndex"
          :class="c.cls"
        >{{ c.ch }}</span><span
          v-if="lineIndex === typedLine && !showResult"
          class="term-cursor"
        ></span></span>
      </div>
      <div v-if="showResult" class="term-line term-result-line">
        <span class="term-num"></span>
        <span class="term-result">&#10003; {{ RESULT }}</span>
      </div>
    </div>
  </div>
</template>
