/// <reference types="vite/client" />

declare module 'dexie-export-import' {
  export function exportDB(db): Promise<Blob>

  export function importInto(db, blob: Blob): Promise<void>
}
