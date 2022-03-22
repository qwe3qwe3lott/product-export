<template>
  <div class="table">
    <slot name="header"/>
    <slot name="content"/>
    <div class="footer">
      <p class="pages-display">1-30 of 603</p>
      <div class="toolbar">
        <div class="rows-count">
          <p class="rows-count-label">Rows per count:</p>
          <select class="select-rows-count">
            <option>30</option>
            <option>60</option>
            <option>100</option>
          </select>
        </div>
        <div class="pages-switcher">
          <button class="switcher left-switcher" />
          <select class="select-page">
            <option>1/27</option>
            <option>2/27</option>
          </select>
          <button class="switcher right-switcher"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TableComponent'
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
