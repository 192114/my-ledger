<script setup lang="ts">
import { useGlobalStore } from '@/store/store/store'
import { useRouter } from 'vue-router'

const router = useRouter()
const globalStore = useGlobalStore()

const onChangeTheme = (val: boolean) => {
  globalStore.changeTheme(val)
}
</script>

<template>
  <van-nav-bar
    safe-area-inset-top
    fixed
    title="设置"
    left-arrow
    @click-left="() => router.go(-1)"
  />

  <van-cell-group class="wrapper-style">
    <van-cell title="暗夜主题" center>
      <template #right-icon>
        <van-switch v-model="globalStore.darkTheme" size="22px" @change="onChangeTheme" />
      </template>
    </van-cell>
    <van-cell title="单元格" value="内容" label="描述信息" />
  </van-cell-group>
</template>

<style scoped>
.wrapper-style {
  padding-top: var(--van-nav-bar-height);
}
</style>
