<template>
  <div class="window-layout">
    <HeaderComponent/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderComponent from '@/components/Header.vue'

export default defineComponent({
  name: 'MainLayout',
  components: { HeaderComponent }
})
</script>

<style scoped>
.window-layout {
  width: 100%;
  max-width: 60em;
  background: var(--main-background-color);
  border-radius: 1.5em;
  overflow: hidden;
}
@media (max-width: 1000px) {
  .window-layout {
    border-radius: 0;
    max-width: unset;
    min-height: 100vh;
  }
}
</style>
