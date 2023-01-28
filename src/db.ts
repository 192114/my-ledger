import Dexie, { Table } from 'dexie'
import { exportDB, importInto } from 'dexie-export-import'
import { saveAs } from 'file-saver'

export interface Ledger {
  id?: number
  date: string
  amount: string
  recordTime: Date
}

export class MySubClassedDexie extends Dexie {
  ledgers!: Table<Ledger>

  constructor() {
    super('ledgerDatabase')
    this.version(1).stores({
      ledgers: '++id, &date, amount, recordTime'
    })
  }
}

export const db = new MySubClassedDexie()

export const exportDBToFile = async () => {
  const blob = await exportDB(db)
  saveAs(blob, 'database.json')
}

export const importDBFromFile = async (blob: Blob) => {
  await db.ledgers.clear()
  await importInto(db, blob)
}
