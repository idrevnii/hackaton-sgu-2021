import { TABLE_SIZE } from './consts'
import { prisma } from './index'

export async function isVisitorsTableFull(): Promise<boolean> {
  const visitors = await prisma.visitors.findMany()
  return visitors.length === TABLE_SIZE
}
