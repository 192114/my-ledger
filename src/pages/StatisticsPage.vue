<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <van-nav-bar
    safe-area-inset-top
    fixed
    title="设置"
    left-arrow
    @click-left="() => router.go(-1)"
  />
  <div class="wrapper-style">
    <div class="summary-box">
      <div>
        <van-circle text="70%" rate="70" :clockwise="false" size="140px" />
      </div>

      <div class="white-bg summary-box-right">
        <van-space direction="vertical">
          <div>2023-10-10 -> 2023-10-10</div>

          <div>汇总：32323</div>

          <div>最高：323</div>

          <div>最低：323</div>
        </van-space>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper-style {
  padding-top: var(--van-nav-bar-height);
  padding-left: 16px;
  padding-right: 16px;
}

.white-bg {
  background-color: var(--van-nav-bar-background);
}

.summary-box {
  display: flex;
  gap: 24px;
  margin-top: 24px;
}

.summary-box-right {
  flex: auto;
  padding: 12px 6px;
  border-radius: 12px;
}
</style>
