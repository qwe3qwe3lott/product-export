<template>
  <div class="table">
    <slot name="header"/>
    <slot name="content"/>
    <div class="footer">
      <p class="pages-display">{{ getPageInfo }}</p>
      <div class="toolbar">
        <div class="rows-count">
          <p class="rows-count-label">Rows per page:</p>
          <select class="select-rows-count" @change="$emit('rowsPerPageChange', getSelectValue($event))" :value="rowsPerPage">
            <option v-for="(value, index) in getRowsPerPageList" :key="index">{{value}}</option>
          </select>
        </div>
        <div class="pages-switcher">
          <button class="switcher left-switcher" :disabled="isThisFirstPage" @click="$emit('pageChange', currentPage - 1)"/>
          <select class="select-page" ref="selector" :disabled="isThisFirstPage && isThisLastPage">
            <option v-for="number in totalPages" :key="number" :value="number" hidden>{{`${number}/${totalPages}`}}</option>
            <option v-for="number in totalPages" :key="number">{{number}}</option>
          </select>
          <button class="switcher right-switcher" :disabled="isThisLastPage" @click="$emit('pageChange', currentPage + 1)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, ref, watch } from 'vue'
import { RowsPerPage } from '@/store/state'

export default defineComponent({
  name: 'TableComponent',
  props: {
    rowsPerPage: { required: true, type: Number, default: () => RowsPerPage.few },
    totalRows: { required: true, type: Number, default: () => 0 },
    currentPage: { required: true, type: Number, default: () => 1 }
  },
  setup (props, { emit }) {
    const getRowsPerPageList: ComputedRef<number[]> = computed(() => {
      let array = Object.entries(RowsPerPage)
      // First part of array contains duplicates
      array = array.splice(array.length / 2, array.length)
      // There is necessity to get only enum values which are numbers
      return array.map(el => el[1] as number)
    })

    const getSelectValue = (event: Event) => +(event.target as HTMLSelectElement).value

    const totalPages = computed(() => {
      const value = Math.ceil(props.totalRows / props.rowsPerPage)
      // Table heeds to has at less one page
      return value < 1 ? 1 : value
    })

    const isThisFirstPage = computed(() => props.currentPage === 1)
    const isThisLastPage = computed(() => props.currentPage === totalPages.value)

    const getPageInfo = computed((totalRows: number = props.totalRows, currentPage: number = props.currentPage, rowsPerPage: number = props.rowsPerPage): string => {
      if (totalRows === 0) return ''
      let lastPageRows: number = totalRows % rowsPerPage
      if (lastPageRows === 0) lastPageRows = rowsPerPage

      const lastRowOnCurrentPage: number = isThisLastPage.value ? totalRows : currentPage * rowsPerPage
      const firstRowOnCurrentPage: number = lastRowOnCurrentPage - (isThisLastPage.value ? lastPageRows : rowsPerPage) + 1
      return `${firstRowOnCurrentPage}-${lastRowOnCurrentPage} of ${totalRows}`
    })

    const selector = ref<HTMLSelectElement | null>(null)
    onMounted(() => {
      if (selector.value === null) return
      selector.value.value = `${props.currentPage}`
      selector.value.addEventListener('change', (e: Event) => {
        if (selector.value === null) return
        selector.value.value = (e.target as HTMLSelectElement).value
        emit('pageChange', +selector.value.value)
      })
      watch(props, () => {
        if (selector.value === null) return
        selector.value.value = selector.value.options[props.currentPage - 1].value
      })
    })

    return { getRowsPerPageList, getSelectValue, getPageInfo, totalPages, isThisFirstPage, isThisLastPage, selector }
  }
})
</script>

<style scoped>
.table {
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  min-width: fit-content;
}
.footer {
  padding: 0.25em 1.5em 0.25em 1.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pages-display {
  font-size: 0.9em;
  color: var(--primary-color);
}
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5em;
}
.rows-count {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.25em;
}
.rows-count-label {
  font-size: 0.9em;
  color: var(--primary-color);
}
.select-rows-count {
  font-size: 0.9em;
  text-align: center;
  min-width: 3em;
  padding-right: 1em;
  color: var(--primary-color);
  background-color: initial;
  background-image: url('@/assets/svg/dropdown-primary.svg');
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 1em;
}
.pages-switcher {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.25em;
}
.switcher {
  border-radius: 0.25em;
  height: 0.9em;
  width: 0.9em;
  background-color: var(--primary-color);
  background-image: url('@/assets/svg/dropdown.svg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 0.6em;
}
.left-switcher {
  transform: rotate(90deg);
}
.right-switcher {
  transform: rotate(-90deg);
}
.select-page {
  text-align: center;
  font-size: 0.9em;
  color: var(--primary-color);
}
</style>
