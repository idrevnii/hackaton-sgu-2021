import { PrismaClient } from '@prisma/client'
import { isTableFull } from './checker'
import {
  fillRawVisitorsTable,
  fillVisitorRanksTable,
  fillVisitorsStatsTable,
  fillVisitorsTable
} from './filler'

export const prisma = new PrismaClient()

async function main() {
  if (!(await isTableFull(prisma.rawVisitors))) {
    await fillRawVisitorsTable()
  }
  if (!(await isTableFull(prisma.visitors))) {
    await fillVisitorsTable()
  }
  if (!(await isTableFull(prisma.visitorsStats))) {
    await fillVisitorsStatsTable()
  }
  if (!(await isTableFull(prisma.visitorRanks))) {
    await fillVisitorRanksTable()
  }

  console.log('Ended!')
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
