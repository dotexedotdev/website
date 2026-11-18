<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { formatDate, posts } from '../blog/posts'
</script>

<template>
  <section class="section">
    <div class="wrap">
      <p class="eyebrow">Blog</p>
      <h1>Notes from .EXE</h1>
      <p class="section-intro">Short reads on local tech, small-business systems, and the things we&rsquo;re thinking about.</p>

      <div class="blog-cards">
        <article v-for="post in posts" :key="post.slug" class="card blog-card">
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
