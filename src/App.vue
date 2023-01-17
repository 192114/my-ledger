<script setup lang="ts">
import { useGlobalStore } from '@/store'

const globalStore = useGlobalStore()
</script>

<template>
  <van-config-provider :theme="globalStore.darkTheme ? 'dark' : 'light'">
    <router-view v-slot="{ Component, route }">
      <!-- 使用任何自定义过渡和回退到 `fade` -->
      <transition :name="route.meta.transition" mode="out-in">
        <div :key="route.path">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </van-config-provider>
</template>

<style scoped></style>
