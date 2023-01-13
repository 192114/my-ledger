<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { format } from 'date-fns'

const router = useRouter()

const currentYear = ref(new Date().getFullYear().toString())
const datePickModalShow = ref(false)

const toggleDatepickModalShow = () => {
  datePickModalShow.value = !datePickModalShow.value
}

const onChangeYear = ({ selectedValues }: { selectedValues: string[] }) => {
  currentYear.value = selectedValues[0]
  datePickModalShow.value = false
}
</script>
<template>
  <!-- 头 -->
  <van-nav-bar safe-area-inset-top fixed>
    <template #left>
      <van-icon
        name="setting-o"
        color="var(--van-text-color)"
        size="1.5em"
        @click="router.push('/setting')"
      />
    </template>
    <template #title>
      <div @click.stop="toggleDatepickModalShow">
        {{ currentYear }}年
        <van-icon
          :name="datePickModalShow ? 'arrow-up' : 'arrow-down'"
          color="var(--van-text-color)"
        />
      </div>
    </template>
  </van-nav-bar>

  <!-- 日期内容 -->
  <van-calendar
    class="calender-style"
    safe-area-inset-bottom
    :show-title="false"
    :poppable="false"
    :show-confirm="false"
    :min-date="new Date(`${currentYear}/01/01`)"
    :max-date="new Date(`${currentYear}/12/31`)"
  />

  <!-- 切换年份popup -->
  <van-popup :show="datePickModalShow" position="bottom" safe-area-inset-bottom>
    <van-date-picker
      :columns-type="['year']"
      title="选择年份"
      :min-date="new Date('2022/01/01')"
      :max-date="new Date()"
      @confirm="onChangeYear"
      @cancel="datePickModalShow = false"
    />
  </van-popup>
</template>
<style scoped>
.calender-style {
  margin-top: var(--van-nav-bar-height);
  height: calc(100vh - var(--van-nav-bar-height));
}
</style>
