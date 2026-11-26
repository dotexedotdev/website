import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import ContactView from '../views/ContactView.vue'
import BlogListView from '../views/BlogListView.vue'
import BlogPostView from '../views/BlogPostView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', redirect: { name: 'home', hash: '#about' } },
  { path: '/services', redirect: (to) => to.hash === '#integration-demo' ? { name: 'home', hash: '#integration-demo' } : { name: 'portfolio', hash: '' } },
  { path: '/portfolio', name: 'portfolio', component: PortfolioView },
  { path: '/support', redirect: { name: 'home', hash: '#contact' } },
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
        window.setTimeout(() => {
          const target = document.getElementById(to.hash.slice(1))
          if (!target) return resolve({ top: 0 })
          const top = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0
          resolve({ el: target, top, behavior: 'smooth' })
        }, 60)
      })
    }
    return { top: 0 }
  },
})
