<script setup lang="ts">
import type { CalendarDayItem } from 'vant'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isToday } from 'date-fns'

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

const getMaxDate = () => {
  const year = new Date().getFullYear().toString()

  // 当年返回今日
  if (currentYear.value === year) {
    return new Date()
  }

  return new Date(`${currentYear.value}/12/31`)
}

const formatDay = (day: CalendarDayItem) => {
  return {
    ...day,
    bottomInfo: '2030',
    topInfo: isToday(day.date as Date) ? '今日' : ''
  }
}

const onChooseDate = (val: Date) => {
  console.log(val)
}
</script>
<template>
  <!-- 头 -->
  <van-nav-bar safe-area-inset-top fixed>
    <template #left>
      <van-icon
        name="setting-o"
        color="var(--van-nav-bar-icon-color)"
        size="1.5em"
        @click="router.push('/setting')"
      />
    </template>
    <template #title>
      <div @click.stop="toggleDatepickModalShow">
        {{ currentYear }}年
        <van-icon
          :name="datePickModalShow ? 'arrow-up' : 'arrow-down'"
          color="var(--van-nav-bar-icon-color)"
        />
      </div>
    </template>

    <template #right> </template>
  </van-nav-bar>

  <!-- 日期内容 -->
  <van-calendar
    class="calender-style"
    safe-area-inset-bottom
    :show-title="false"
    :poppable="false"
    :show-confirm="false"
    :min-date="new Date(`${currentYear}/01/01`)"
    :max-date="getMaxDate()"
    :formatter="formatDay"
    @select="onChooseDate"
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
  padding-top: var(--van-nav-bar-height);
  height: calc(100vh - var(--van-nav-bar-height));
  color: var(--van-text-color);
}
</style>
