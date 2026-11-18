// Blog data, fetched from the API (which reads the Airtable Posts table).
//
// If the API is unreachable — Airtable down, cold start failing, anything —
// the bundled fallback copy in ./posts.ts is used instead, so the blog never
// renders blank. The fallback is the same four launch articles; it is kept
// in sync by hand when a new article is published (see README.md).

import { getPost, posts as fallbackPosts, type BlogPost } from './posts'

/** What GET /api/blog returns per post: everything the list page needs. */
export interface BlogPostSummary {
  slug: string
  title: string
  date: string
  excerpt: string
  image?: string | null
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Blog API returned ${response.status} for ${url}`)
  return (await response.json()) as T
}

/** Published posts, newest first. Falls back to the bundled copy on any error. */
export async function fetchPosts(): Promise<BlogPostSummary[]> {
  try {
    const data = await fetchJson<{ posts: BlogPostSummary[] }>('/api/blog')
    if (Array.isArray(data.posts) && data.posts.length > 0) return data.posts
    throw new Error('Blog API returned an empty post list')
  } catch {
    return fallbackPosts
  }
}

/** One full article. Falls back to the bundled copy, then undefined. */
export async function fetchPost(slug: string): Promise<BlogPost | undefined> {
  try {
    const data = await fetchJson<{ post: BlogPost }>(`/api/blog/${encodeURIComponent(slug)}`)
    if (data.post && typeof data.post.slug === 'string') return data.post
    throw new Error('Blog API returned no post')
  } catch {
    return getPost(slug)
  }
}
