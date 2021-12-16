import { PrismaClient } from '@prisma/client'
import { fillVisitorsStatsTable, fillVisitorsTable } from './filler'

export const prisma = new PrismaClient()

async function main() {
  await fillVisitorsTable()
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
