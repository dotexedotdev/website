<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { formatDate } from '../blog/posts'
import { fetchPosts, type BlogPostSummary } from '../blog/api'

const posts = ref<BlogPostSummary[] | null>(null)

onMounted(async () => {
  posts.value = await fetchPosts()
})
</script>

<template>
  <section class="section">
    <div class="wrap">
      <p class="eyebrow">Blog</p>
      <h1>Notes from .EXE</h1>
      <p class="section-intro">Short reads on local tech, small-business systems, and the things we&rsquo;re thinking about.</p>

      <p v-if="posts === null">Loading articles&hellip;</p>

      <div v-else class="blog-cards">
        <article v-for="post in posts" :key="post.slug" class="card blog-card">
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
    </div>
  </section>
</template>
