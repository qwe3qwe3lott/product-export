<template>
  <header class="header">
    <div class="logo">
      <img alt="logo" src="@/assets/webp/logo.webp" class="logo-img">
      <h1 class="logo-title">Product export</h1>
    </div>
    <nav class="nav-bar">
      <router-link v-for="(nav, index) in navs" :key="index" :to="{ name: nav.routeName }" class="nav-button" :class="{'active-nav-button': isActiveRoute(nav.routeName) }">
        <p class="nav-label">{{ nav.label }}</p>
        <span class="nav-inner"/>
      </router-link>
    </nav>
  </header>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { NavButton } from '@/types/NavButton'
import { Router, useRouter } from 'vue-router'
export default defineComponent({
  name: 'HeaderComponent',
  setup () {
    const router: Router = useRouter()
    const isActiveRoute = (routeName: string) => router.currentRoute.value.matched.some(route => route.name === routeName)

    const navs: NavButton[] = reactive([
      { label: 'About', routeName: 'AboutPage' },
      { label: 'Authors', routeName: 'AuthorsPage' },
      { label: 'Tables', routeName: 'TablesPage' }
    ])

    return { navs, isActiveRoute }
  }
})
</script>

<style scoped>
.header {
  padding: 0 2.5em;
  background-color: var(--primary-color);
  color: var(--primary-text-color);
  height: 3.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5em;
}
.logo-img {
  height: 2.5em;
  width: 2.5em;
  filter: invert(100%);
}
.logo-title {
  font-size: 1.8em;
}
.nav-bar {
  display: flex;
  justify-content: space-between;
  gap: 1.5em;
  padding: 1em 2.5em 0.5em 0;
}
.nav-button {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.5em;
}
.nav-label {
  font-size: 1.2em;
  opacity: 0.8;
}
.nav-inner {
  width: 100%;
  background: var(--primary-text-color);
  height: 0.2em;
  border-radius: 0.1em;
  opacity: 0;
}
.active-nav-button > .nav-label, .active-nav-button > .nav-inner {
  opacity: 1;
}
</style>
