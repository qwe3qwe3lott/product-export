<template>
  <ul class="content" @scroll="onScroll">
    <li class="start" ref="start"/>
    <li v-for="(element, index) in data" :key="index" class="row" :class="clickable ? 'clickable-row' : ''" @click="clickRow(element)">
      <span v-for="(setup, i) in columnsSetup" :key="i" :style="getColumnWidth(setup)" class="row-value" :class="markValue(element[setup.property])">
        {{getColumnValue(element[setup.property])}}
      </span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref, onMounted } from 'vue'
import { ColumnSetup, ColumnWidthMetrics } from '@/types/ColumnSetup'
import { RowClickEvent } from '@/types/events/RowClickEvent'

export default defineComponent({
  name: 'TableContentComponent',
  props: {
    columnsSetup: { required: true, type: Array as PropType<ColumnSetup[]> },
    data: { required: true, type: Array },
    clickable: { required: true, type: Boolean }
  },
  setup (props, { emit }) {
    const getColumnWidth = (setup: ColumnSetup) => setup.width ? { 'min-width': `${setup.width.value}${ColumnWidthMetrics[setup.width.metric]}` } : { width: '100%' }
    const getColumnValue = (element: unknown) => Array.isArray(element) ? element.length : element
    const markValue = (element: unknown) => Array.isArray(element) ? (element.length > 0 ? 'positive-mark' : 'negative-mark') : ''

    const clickRow = (element: unknown) => {
      if (props.clickable) emit('rowClick', { element } as RowClickEvent)
    }

    const onScroll = (event: unknown) => console.log(event)

    const start = ref<HTMLUListElement | null>(null)
    onMounted(() => {
      watch(props, () => {
        if (start.value === null) return
        start.value.scrollIntoView(true)
      })
    })

    return { getColumnWidth, getColumnValue, markValue, clickRow, start, onScroll }
  }
})
</script>

<style scoped>
.content {
  border-bottom: var(--primary-color) 1px solid;
  border-top: var(--primary-color) 1px solid;
  padding: 0.25em 0;
  min-height: 15em;
  max-height: 50vh;
  width: 100%;
  overflow-y: auto;
}
.content::-webkit-scrollbar {
  width: 0.2em;
}
.content::-webkit-scrollbar-thumb {
  background-color: var(--secondary-color);
  border-radius: 0.2em;
}
.start {
  height: 0;
}
.row {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 2em;
  line-height: 1;
  padding: 0.25em 0;
}
.clickable-row:hover {
  cursor: pointer;
  background-color: rgba(7, 132, 17, 0.1);
}
.row-value {
  text-align: center;
  color: var(--primary-color);
}
.positive-mark {
  color: var(--secondary-color);
}
.negative-mark {
  color: var(--secondary-opposite-color);
}
</style>
