import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactView from '../views/ContactView.vue'
import BlogListView from '../views/BlogListView.vue'
import BlogPostView from '../views/BlogPostView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/blog', name: 'blog', component: BlogListView },
  { path: '/blog/:slug', name: 'blog-post', component: BlogPostView, props: true },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      // Wait a tick so the target view has mounted before scrolling to it.
      return new Promise((resolve) => {
        window.setTimeout(() => resolve({ el: to.hash, behavior: 'smooth' }), 60)
      })
    }
    return { top: 0 }
  },
})
