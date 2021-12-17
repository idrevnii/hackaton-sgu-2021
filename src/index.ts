import { PrismaClient } from '@prisma/client'
import { isVisitorsTableFull } from './checker'
import { fillVisitorsStatsTable, fillVisitorsTable } from './filler'

export const prisma = new PrismaClient()

async function main() {
  const isTableFull = await isVisitorsTableFull()
  if (!isTableFull) {
    await fillVisitorsTable()
  }
  await fillVisitorsStatsTable()
  console.log('Ended!')
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
