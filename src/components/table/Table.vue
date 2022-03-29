<template>
  <div class="table">
    <slot name="header"/>
    <slot name="content"/>
    <div class="footer">
      <p class="pages-display">{{ getPageInfo }}</p>
      <div class="toolbar">
        <div class="rows-count">
          <p class="rows-count-label">Rows per count:</p>
          <select class="select-rows-count" @change="$emit('rowsPerPageChange', $event)" :value="rowsPerPage">
            <option v-for="(value, index) in getRowsPerPageList" :key="index">{{value}}</option>
          </select>
        </div>
        <div class="pages-switcher">
          <button class="switcher left-switcher" @click="$emit('previousPage')"/>
          <select class="select-page">
            <option>1/27</option>
            <option>2/27</option>
          </select>
          <button class="switcher right-switcher" @click="$emit('nextPage')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue'
import { RowsPerPage } from '@/store/state'
import { useStore } from '@/store'

export default defineComponent({
  name: 'TableComponent',
  props: {
    rowsPerPage: { required: true, type: Number }
  },
  setup () {
    const store = useStore()

    const getRowsPerPageList: ComputedRef<number[]> = computed(() => {
      let array = Object.entries(RowsPerPage)
      // First part of array contains duplicates
      array = array.splice(array.length / 2, array.length)
      // There is necessity to get only enum values which are numbers
      return array.map(a => a[1] as number)
    })

    const getPageInfo: ComputedRef<string> = computed(() => store.getters.getCurrentTechnologiesPageInfo)

    return { getRowsPerPageList, getPageInfo }
  }
})
</script>

<style scoped>
.table {
  display: flex;
  flex-direction: column;
}
.footer {
  padding: 0.25em 1.5em 0.25em 1.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pages-display {
  font-size: 0.7em;
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
  font-size: 0.7em;
  color: var(--primary-color);
}
.select-rows-count {
  font-size: 0.7em;
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
  height: 0.75em;
  width: 0.75em;
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
  font-size: 0.7em;
  color: var(--primary-color);
}
</style>
