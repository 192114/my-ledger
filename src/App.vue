<script setup lang="ts"></script>

<template>
  <van-config-provider theme="dark">
    <router-view v-slot="{ Component, route }">
      <!-- 使用任何自定义过渡和回退到 `fade` -->
      <transition :name="route.meta.transition || ''" mode="out-in">
        <div :key="route.path">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </van-config-provider>
</template>

<style scoped></style>
