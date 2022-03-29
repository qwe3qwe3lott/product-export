<template>
  <ul class="content">
    <li v-for="(element, index) in data" :key="index" class="row" @click="clickRow(element)">
      <span v-for="(setup, i) in columnsSetup" :key="i" :style="getColumnWidth(setup)" class="row-value" :class="markValue(element[setup.property])">
        {{getColumnValue(element[setup.property])}}
      </span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ColumnSetup, ColumnWidthMetrics } from '@/types/ColumnSetup'
import { RowClickEvent } from '@/types/events/RowClickEvent'

export default defineComponent({
  name: 'TableContentComponent',
  props: {
    columnsSetup: { required: true, type: Array as PropType<ColumnSetup[]> },
    data: { required: true, type: Array }
  },
  setup (props, { emit }) {
    const getColumnWidth = (setup: ColumnSetup) => setup.width ? { 'min-width': `${setup.width.value}${ColumnWidthMetrics[setup.width.metric]}` } : { width: '100%' }
    const getColumnValue = (element: any) => Array.isArray(element) ? element.length : element
    const markValue = (element: any) => Array.isArray(element) ? (element.length > 0 ? 'positive-mark' : 'negative-mark') : ''

    const clickRow = (element: any) => emit('rowClick', { element } as RowClickEvent)

    return { getColumnWidth, getColumnValue, markValue, clickRow }
  }
})
</script>

<style scoped>
.content {
  border-bottom: var(--primary-color) 1px solid;
  border-top: var(--primary-color) 1px solid;
  padding: 0.25em 0;
  height: 20em;
  overflow-y: scroll;
}
.content::-webkit-scrollbar {
  display: none;
}
.row {
  display: flex;
  align-items: center;
  width: 100%;
  height: 2em;
}
.row:hover {
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
