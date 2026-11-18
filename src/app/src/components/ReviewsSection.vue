<script setup lang="ts">
import { reviews } from '../reviews/reviews'
</script>

<template>
  <section class="section" id="reviews">
    <div class="wrap">
      <p class="eyebrow">Reviews</p>
      <h2>What our clients think.</h2>
      <p class="section-intro">Real words from real businesses. We&rsquo;re collecting reviews now &mdash; these slots fill in as clients share their experience.</p>
      <div class="grid-3">
        <article
          v-for="(review, i) in reviews"
          :key="i"
          class="card review-card"
          :class="{ 'review-placeholder': review.placeholder }"
        >
          <template v-if="review.placeholder">
            <p class="review-pending">Review {{ i + 1 }} &mdash; coming soon</p>
            <p class="muted">A place for a client&rsquo;s own words about working with .EXE.</p>
          </template>
          <template v-else>
            <p class="review-quote">&ldquo;{{ review.quote }}&rdquo;</p>
            <p class="review-author">
              &mdash; {{ review.name }}<br /><span class="muted">{{ review.business }}</span>
            </p>
          </template>
        </article>
      </div>
    </div>
  </section>
</template>
