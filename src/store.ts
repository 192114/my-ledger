import { defineStore } from 'pinia'
import { showFailToast, showConfirmDialog } from 'vant'
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

type StatisticsStoreType = {
  dateRange: string
  total: string
  max: string
  min: string
  dataList: Ledger[]
}

export const useStatisticsStore = defineStore('statistics', {
  state: (): StatisticsStoreType => {
    return {
      dateRange: '',
      total: '',
      max: '',
      min: '',
      dataList: []
    }
  },
  actions: {
    getAllData: async () => {}
  }
})

export {}
