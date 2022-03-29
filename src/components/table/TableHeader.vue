<template>
  <div class="header">
    <button v-for="(setup, index) in columnsSetup" :key="index" :style="getColumnWidth(setup)" class="title" @click="sort(setup)">
      <span class="title-text">{{setup.title}}</span>
      <img alt="sort mark" src="@/assets/svg/not-sorted.svg" v-if="setup.sortAtoZ === undefined">
      <img alt="sort arrow" src="@/assets/svg/sorted.svg" v-else :style="getSortInverse(setup.sortAtoZ)">
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ColumnSetup, ColumnWidthMetrics } from '@/types/ColumnSetup'
import { SortEvent } from '@/types/events/SortEvent'

export default defineComponent({
  name: 'TableHeaderComponent',
  props: {
    columnsSetup: { required: true, type: Array as PropType<ColumnSetup[]> }
  },
  emits: ['sort'],
  setup (props, { emit }) {
    const getColumnWidth = (setup: ColumnSetup) => setup.width ? { 'min-width': `${setup.width.value}${ColumnWidthMetrics[setup.width.metric]}` } : { width: '100%' }
    const getSortInverse = (sortAtoZ: boolean) => sortAtoZ ? { transform: 'rotate(180deg)' } : {}

    const sort = (setup: ColumnSetup) => {
      const title = setup.title
      const sortAtoZ = setup.sortAtoZ === false
      emit('sort', { title, sortAtoZ } as SortEvent)
    }
    return { getColumnWidth, getSortInverse, sort }
  }
})
</script>

<style scoped>
.header {
  display: flex;
  width: 100%;
  padding-bottom: 0.5em;
}
.title {
  place-content: center;
  display: flex;
  align-items: center;
  gap: 0.25em;
}
.title-text {
  font-size: 0.9em;
  color: var(--primary-color);
  text-transform: uppercase;
}
</style>
