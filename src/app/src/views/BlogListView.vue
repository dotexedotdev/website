<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { formatDate, posts } from '../blog/posts'

const PAGE_SIZE = 6

// posts is newest first: the first article is the featured one, the rest
// fill a paginated 2-column grid, also newest first.
const featured = computed(() => posts[0])
const rest = computed(() => posts.slice(1))
const page = ref(1)
const pageCount = computed(() => Math.max(1, Math.ceil(rest.value.length / PAGE_SIZE)))
const pagePosts = computed(() =>
  rest.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE),
)
const gridEl = ref<HTMLElement | null>(null)

function goToPage(n: number): void {
  page.value = Math.min(Math.max(1, n), pageCount.value)
  gridEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="section">
    <div class="wrap">
      <p class="eyebrow">Blog</p>
      <h1>Notes from .EXE</h1>
      <p class="section-intro">Short reads on local tech, small-business systems, and the things we&rsquo;re thinking about.</p>

      <article v-if="featured" class="card blog-card blog-featured">
        <img
          v-if="featured.image"
          :src="featured.image"
          :alt="`Illustrative image for: ${featured.title}`"
          class="blog-card-image"
        />
        <p class="blog-date">{{ formatDate(featured.date) }}</p>
        <h2>
          <RouterLink :to="`/blog/${featured.slug}`">{{ featured.title }}</RouterLink>
        </h2>
        <p>{{ featured.excerpt }}</p>
        <RouterLink :to="`/blog/${featured.slug}`" class="blog-read">Read the article &rarr;</RouterLink>
      </article>

      <div v-if="rest.length > 0" id="more-articles" ref="gridEl" class="blog-grid">
        <article v-for="post in pagePosts" :key="post.slug" class="card blog-card">
          <img
            v-if="post.image"
            :src="post.image"
            :alt="`Illustrative image for: ${post.title}`"
            class="blog-card-image"
          />
          <p class="blog-date">{{ formatDate(post.date) }}</p>
          <h2>
            <RouterLink :to="`/blog/${post.slug}`">{{ post.title }}</RouterLink>
          </h2>
          <p>{{ post.excerpt }}</p>
          <RouterLink :to="`/blog/${post.slug}`" class="blog-read">Read the article &rarr;</RouterLink>
        </article>
      </div>

      <nav v-if="rest.length > 0" class="pagination" aria-label="Blog pages">
        <button
          type="button"
          class="page-btn"
          :disabled="page === 1"
          aria-label="Previous page"
          @click="goToPage(page - 1)"
        >
          &larr; Prev
        </button>
        <button
          v-for="n in pageCount"
          :key="n"
          type="button"
          class="page-btn"
          :class="{ active: n === page }"
          :aria-current="n === page ? 'page' : undefined"
          :aria-label="`Page ${n}`"
          @click="goToPage(n)"
        >
          {{ n }}
        </button>
        <button
          type="button"
          class="page-btn"
          :disabled="page === pageCount"
          aria-label="Next page"
          @click="goToPage(page + 1)"
        >
          Next &rarr;
        </button>
      </nav>
    </div>
  </section>
</template>
