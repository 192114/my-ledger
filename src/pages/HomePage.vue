<script setup lang="ts">
import { type CalendarDayItem, showFailToast } from 'vant'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { isToday, format, isSameDay } from 'date-fns'

import BookKeeping from '@/components/BookKeeping.vue'
import { useLedgersStore } from '@/store'

const router = useRouter()
const ledgersStore = useLedgersStore()

const currentYear = ref(new Date().getFullYear().toString())
const datePickModalShow = ref(false)

const currentBookDate = ref(format(new Date(), 'yyyy-MM-dd'))
const keyboardShow = ref<boolean>(false)
const currentAmount = ref<string>('')

const toggleDatepickModalShow = () => {
  datePickModalShow.value = !datePickModalShow.value
}

const onChangeYear = ({ selectedValues }: { selectedValues: string[] }) => {
  currentYear.value = selectedValues[0]
  datePickModalShow.value = false
  ledgersStore.getListByYear(selectedValues[0])
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
  const current = ledgersStore.ledgersList.find(ledgerItem =>
    isSameDay(new Date(ledgerItem.date), day.date as Date)
  )
  return {
    ...day,
    bottomInfo: current?.amount ?? '',
    topInfo: isToday(day.date as Date) ? '今日' : ''
  }
}

const onChooseDate = (val: Date) => {
  currentBookDate.value = format(val, 'yyyy-MM-dd')
  const current = ledgersStore.ledgersList.find(ledgerItem =>
    isSameDay(new Date(ledgerItem.date), val)
  )

  if (current) {
    currentAmount.value = current.amount
  } else {
    currentAmount.value = ''
  }

  keyboardShow.value = true
}

const onSureBooking = async (val: string) => {
  if (!val) {
    showFailToast('金额不能为空')
    return
  }
  keyboardShow.value = false
  // 等待confirm弹窗
  await ledgersStore.createAndUpdateRecord(currentBookDate.value, val)
  ledgersStore.getListByYear(currentYear.value)
}

// 初始化获取数据
onMounted(async () => {
  ledgersStore.getListByYear(currentYear.value)
})
</script>
<template>
  <!-- 头 -->
  <van-nav-bar safe-area-inset-top fixed>
    <template #left>
      <van-icon
        name="setting-o"
        color="var(--van-nav-bar-icon-color)"
        size="1.8em"
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

    <template #right>
      <van-icon
        name="more-o"
        color="var(--van-nav-bar-icon-color)"
        size="1.8em"
        @click="router.push('/statistics')"
      />
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

  <!-- 记账组件 -->
  <BookKeeping
    :date="currentBookDate"
    :show="keyboardShow"
    :default-value="currentAmount"
    @sure="onSureBooking"
    @cancel="keyboardShow = false"
  />
</template>
<style scoped>
.calender-style {
  padding-top: var(--van-nav-bar-height);
  height: calc(100vh - var(--van-nav-bar-height));
  color: var(--van-text-color);
}
</style>
