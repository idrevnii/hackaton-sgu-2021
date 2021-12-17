import { TABLE_SIZE } from './consts'

export async function isTableFull(table: any): Promise<boolean> {
  const records = await table.findMany()
  return records.length >= TABLE_SIZE
}
