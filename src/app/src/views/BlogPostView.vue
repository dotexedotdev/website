<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { formatDate, getPost } from '../blog/posts'

const props = defineProps<{ slug: string }>()
const post = computed(() => getPost(props.slug))
</script>

<template>
  <section class="section">
    <div class="wrap blog-wrap">
      <template v-if="post">
        <p><RouterLink to="/blog" class="blog-back">&larr; All articles</RouterLink></p>
        <figure v-if="post.image" class="blog-hero">
          <img :src="post.image" :alt="`Illustrative image for: ${post.title}`" class="blog-hero-image" />
          <figcaption class="blog-hero-caption">Illustrative image</figcaption>
        </figure>
        <p class="eyebrow">{{ formatDate(post.date) }}</p>
        <h1>{{ post.title }}</h1>
        <p class="lede">{{ post.excerpt }}</p>
        <div class="blog-body">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-for="(para, i) in post.body" :key="i" v-html="para"></p>
        </div>
        <aside v-if="post.sources && post.sources.length" class="blog-sources">
          <h2>Sources</h2>
          <ul>
            <li v-for="source in post.sources" :key="source.label">
              <a v-if="source.url" :href="source.url" target="_blank" rel="noopener">{{ source.label }}</a>
              <span v-else>{{ source.label }}</span>
            </li>
          </ul>
        </aside>
      </template>
      <template v-else>
        <h1>That article doesn&rsquo;t exist.</h1>
        <p>It may have moved &mdash; <RouterLink to="/blog">browse all articles</RouterLink>.</p>
      </template>
    </div>
  </section>
</template>
