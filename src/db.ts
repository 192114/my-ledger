import Dexie, { Table } from 'dexie'

export interface Ledger {
  id?: number
  date: string
  amount: string
  recordTime: Date
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  ledgers!: Table<Ledger>

  constructor() {
    super('ledgerDatabase')
    this.version(1).stores({
      ledgers: '++id, &date, amount, recordTime' // Primary key and indexed props
    })
  }
}

export const db = new MySubClassedDexie()
