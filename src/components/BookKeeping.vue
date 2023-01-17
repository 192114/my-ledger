<script setup lang="ts">
import { ref, toRefs, defineProps, defineEmits, watch } from 'vue'

const props = defineProps<{
  date: string
  show: boolean
  defaultValue: string
}>()

const emits = defineEmits<{
  (e: 'cancel'): void
  (e: 'sure', value: string): void
}>()

const { date, show, defaultValue } = toRefs(props)
const numberKeyboardInput = ref()

watch(defaultValue, () => {
  numberKeyboardInput.value = defaultValue.value
})
</script>

<template>
  <van-overlay :show="show">
    <van-number-keyboard
      v-model="numberKeyboardInput"
      :show="show"
      safe-area-inset-bottom
      z-index="9999"
      close-button-text="完成"
      theme="custom"
      @close="() => emits('sure', numberKeyboardInput)"
      @blur="
        () => {
          emits('cancel')
        }
      "
    >
      <template #title-left>
        <div class="box-wrapper">
          <span>{{ date }}</span>

          <span>{{ numberKeyboardInput }}</span>
        </div>
      </template>
    </van-number-keyboard>
  </van-overlay>
</template>

<style scoped>
.box-wrapper {
  width: 100vw;
  height: 100%;
  display: flex;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
</style>
