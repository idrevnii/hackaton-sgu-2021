import { prisma } from './index'
import { TABLE_SIZE } from './consts'
import {
  generateFrequency,
  generateMonetary,
  generateRecency
} from './generators'
import { rankFrequency, rankRecency } from './parser'
import moment from 'moment'

export async function fillVisitorsTable(): Promise<void> {
  for (let index = 0; index != TABLE_SIZE; index += 1) {
    const recency = generateRecency()
    const frequency = generateFrequency()
    const monetary = generateMonetary(frequency)

    const visitor = {
      recency,
      frequency,
      monetary
    }

    await prisma.visitors.create({ data: visitor })
  }
}

export async function fillVisitorsStatsTable(): Promise<void> {
  const visitors = await prisma.visitors.findMany()
  visitors.forEach(async (visitor) => {
    const recencyRank = rankRecency(moment(visitor.recency).dayOfYear())
    const frequencyRank = rankFrequency(visitor.frequency)
    await prisma.visitorsStats.create({
      data: { ...visitor, recencyRank, frequencyRank, monetaryRank: 0 }
    })
  })
}
