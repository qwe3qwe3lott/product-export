<template>
  <div class="modal" @click="$emit('close')">
    <div class="window" @click="(event) => event.stopPropagation()">
      <slot name="content"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ModalWindow',
  setup (props, { emit }) {
    return {}
  }
})
</script>

<style scoped>
.modal {
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--modal-background-color);
  display: grid;
  place-items: center;
}
.window {
  margin: 1em;
  border-radius: 2em;
  padding: 2em;
  background-color: var(--main-background-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 15em;
}
</style>
