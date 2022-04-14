<template>
  <div class="header">
    <button v-for="(setup, index) in columnsSetup" :key="index" :style="getColumnWidth(setup)" class="title" @click="sort(setup)">
      <span class="title-text">{{setup.title}}</span>
      <img alt="sort mark" src="@/assets/svg/not-sorted.svg" v-if="setup.property !== sortSetup.property">
      <img alt="sort arrow" src="@/assets/svg/sorted.svg" v-else :style="getSortInverse(sortSetup.sortAtoZ)">
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ColumnSetup, ColumnWidthMetrics } from '@/types/ColumnSetup'
import { SortSetup } from '@/types/SortSetup'

export default defineComponent({
  name: 'TableHeaderComponent',
  props: {
    columnsSetup: { required: true, type: Array as PropType<ColumnSetup[]> },
    sortSetup: { required: true, type: Object as PropType<SortSetup<object>> }
  },
  emits: ['sort'],
  setup (props, { emit }) {
    const getColumnWidth = (setup: ColumnSetup) => setup.width ? { 'min-width': `${setup.width.value}${ColumnWidthMetrics[setup.width.metric]}` } : { width: '100%' }
    const getSortInverse = (sortAtoZ: boolean) => sortAtoZ ? { transform: 'rotate(180deg)' } : {}

    const sort = (setup: ColumnSetup) => {
      const key = setup.property
      // if table already sorted throw chosen column change sort order, else sort from Z to A
      const sortAtoZ = setup.property === props.sortSetup.property ? !props.sortSetup.sortAtoZ : false
      emit('sort', { key, sortAtoZ })
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
