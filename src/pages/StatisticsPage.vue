<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import Big from 'big.js'
import { getDayOfYear } from 'date-fns'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { SVGRenderer } from 'echarts/renderers'
import { TooltipComponent, GridComponent, MarkPointComponent } from 'echarts/components'

import { useStatisticsStore } from '@/store'

echarts.use([LineChart, SVGRenderer, TooltipComponent, GridComponent, MarkPointComponent])

const store = useStatisticsStore()

const router = useRouter()

const rate = ref(0)

onMounted(() => {
  const currentYear = new Date().getFullYear()

  const days = currentYear % 4 === 0 ? 366 : 365

  const daysOfYear = new Big(getDayOfYear(new Date()))

  rate.value = daysOfYear.div(days).mul(100).toNumber()

  store.getAllData(`${currentYear}`)
})

store.$subscribe((mutation, state) => {
  const targetDom: HTMLDivElement | null = document.querySelector('#line-chart-dom')

  if (!targetDom) {
    return
  }

  const xData = []
  const yData = []
  for (let i = 0; i < state.dataList.length; i++) {
    const current = state.dataList[i]
    xData.push(current.date)
    yData.push(current.amount)
  }

  const myChart = echarts.init(targetDom)
  const options = {
    xAxis: {
      type: 'category',
      data: xData,
      boundaryGap: false
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      top: 40,
      bottom: 30,
      left: 50,
      right: 10
    },
    series: [
      {
        data: yData,
        type: 'line',
        showSymbol: false,
        markPoint: {
          data: [
            { type: 'max', name: '最高', itemStyle: { color: '#07c160' } },
            { type: 'min', name: '最低', itemStyle: { color: '#ed6a0c' } }
          ]
        }
      }
    ]
  }

  myChart.setOption(options)
})
</script>

<template>
  <van-nav-bar
    safe-area-inset-top
    fixed
    title="汇总"
    left-arrow
    @click-left="() => router.go(-1)"
  />
  <div class="wrapper-style">
    <div class="summary-box">
      <div class="white-bg summary-box-left">
        <van-circle
          v-model:current-rate="rate"
          :text="`${rate}%`"
          :rate="rate.toFixed(0)"
          size="116px"
          stroke-width="100"
          layer-color="#ebedf0"
        />
      </div>

      <div class="white-bg summary-box-right">
        <van-space direction="vertical">
          <div>{{ store.dateRange }}</div>

          <div class="total-style">汇总：{{ store.total }}</div>

          <div class="color-success">最高：{{ store.max?.value }}</div>

          <div class="color-warn">最低：{{ store.min?.value }}</div>
        </van-space>
      </div>
    </div>

    <div
      id="line-chart-dom"
      class="white-bg"
      style="margin-top: 20px; width: 100%; height: 200px"
    ></div>
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

.summary-box-left {
  padding: 12px 6px;
  border-radius: 12px;
}

.summary-box-right {
  flex: auto;
  padding: 12px 6px;
  border-radius: 12px;
  color: var(--van-text-color);
}

.color-success {
  color: var(--van-success-color);
}

.color-warn {
  color: var(--van-warning-color);
}

.total-style {
  font-weight: 700;
  font-size: 1.2rem;
}
</style>
