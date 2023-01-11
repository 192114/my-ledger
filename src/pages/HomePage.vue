<script setup lang="ts"></script>
<template>
  <van-nav-bar title="主页" safe-area-inset-top fixed />
  <van-calendar
    class="calender-style"
    safe-area-inset-bottom
    :show-title="false"
    :poppable="false"
    :show-confirm="false"
    :min-date="new Date('2023/01/01')"
    :max-date="new Date('2023/12/31')"
  />
</template>
<style scoped>
.calender-style {
  margin-top: var(--van-nav-bar-height);
  height: calc(100vh - var(--van-nav-bar-height));
}
</style>
