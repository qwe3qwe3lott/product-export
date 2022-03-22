<template>
  <select class="select">
    <option value="" disabled selected>{{placeholder}}</option>
    <option v-for="(element, index) in data" :key="index">{{element}}</option>
  </select>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  name: 'DropdownUI',
  props: {
    data: { required: true, type: Array as PropType<string[]> },
    placeholder: { required: true, type: String }
  }
})
</script>

<style scoped>
.select {
  text-align: center;
  min-width: 6em;
  padding: 0.25em 1.5em 0.25em 0.5em;
  background-color: var(--primary-color);
  background-image: url('@/assets/svg/dropdown.svg');
  background-repeat: no-repeat;
  background-position: right 0.5em center;
  background-size: 1em;
  color: var(--primary-text-color);
  font-size: 0.9em;
  border-radius: 1.5em;
}
</style>
