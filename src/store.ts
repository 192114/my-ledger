import { defineStore } from 'pinia'
import { showFailToast, showConfirmDialog } from 'vant'
import Big from 'big.js'
import { type Ledger, db } from '@/db'

type GlobalStateType = {
  darkTheme: boolean
}

export const useGlobalStore = defineStore('gobalSetting', {
  state: (): GlobalStateType => {
    return {
      darkTheme: false
    }
  },
  actions: {
    changeTheme(val: boolean) {
      this.darkTheme = val
    }
  }
})

type LedgerStoreType = {
  ledgersList: Ledger[]
}

export const useLedgersStore = defineStore('ledgers', {
  state: (): LedgerStoreType => {
    return {
      ledgersList: []
    }
  },
  actions: {
    async getListByYear(year: string) {
      try {
        this.ledgersList = await db.ledgers
          .orderBy('date')
          .filter(item => `${new Date(item.date).getFullYear()}` === year)
          .toArray()
      } catch (error) {
        showFailToast(`${error}`)
        return error
      }
    },
    async addRecord(param: Ledger) {
      try {
        await db.ledgers.add(param)
      } catch (error) {
        showFailToast(`${error}`)
        return error
      }
    },
    async updateRecord(id: number, param: Ledger) {
      try {
        await db.ledgers.update(id, param)
      } catch (error) {
        showFailToast(`${error}`)
        return error
      }
    },
    async createAndUpdateRecord(currentDate: string, amount: string) {
      try {
        const target = await db.ledgers.get({ date: currentDate })
        if (!target) {
          await db.ledgers.add({ date: currentDate, amount, recordTime: new Date() })
        } else {
          const result = await showConfirmDialog({
            title: '提示',
            message: `${target.date}已存在记录，是否确定将${target.amount}更新为${amount}？`
          })

          if (result === 'confirm' && target.id) {
            await db.ledgers.update(target.id, {
              amount,
              recordTime: new Date()
            })
          }
        }
      } catch (error) {
        showFailToast(`${error}`)
        return error
      }
    }
  }
})

type MinAndMaxItemType = { date: string[]; value: string }

type StatisticsStoreType = {
  dateRange: string
  total: string
  max: MinAndMaxItemType | null
  min: MinAndMaxItemType | null
  dataList: Ledger[]
}

export const useStatisticsStore = defineStore('statistics', {
  state: (): StatisticsStoreType => {
    return {
      dateRange: '',
      total: '',
      max: null,
      min: null,
      dataList: []
    }
  },
  actions: {
    async getAllData(year: string) {
      try {
        this.dataList = await db.ledgers
          .orderBy('date')
          .filter(item => `${new Date(item.date).getFullYear()}` === year)
          .toArray()

        if (this.dataList.length > 0 && this.dataList.length <= 1) {
          this.dateRange = this.dataList[0].date
        } else if (this.dataList.length > 1) {
          this.dateRange = `${this.dataList[0].date} 至 ${
            this.dataList[this.dataList.length - 1].date
          }`
        }

        let maxTemp: MinAndMaxItemType | null = null
        let minTemp: MinAndMaxItemType | null = null
        let totalAmount = new Big(0)
        for (let i = 0; i < this.dataList.length; i++) {
          const current = this.dataList[i]
          if (!maxTemp || maxTemp.value < current.amount) {
            maxTemp = { date: [current.date], value: current.amount }
          } else if (maxTemp && maxTemp.value === current.amount) {
            maxTemp.date.push(current.date)
          }

          if (!minTemp || minTemp.value > current.amount) {
            minTemp = { date: [current.date], value: current.amount }
          } else if (minTemp && minTemp.value === current.amount) {
            minTemp.date.push(current.date)
          }

          totalAmount = totalAmount.add(current.amount)
        }

        this.max = maxTemp
        this.min = minTemp
        this.total = totalAmount.toString()
      } catch (error) {
        showFailToast(`${error}`)
        return error
      }
    }
  }
})

export {}
