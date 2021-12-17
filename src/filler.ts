import { prisma } from './index'
import { TABLE_SIZE } from './consts'
import {
  generateFrequency,
  generateMonetary,
  generateRecency
} from './generators'
import {
  rankFrequency,
  rankRecency,
  calculateMonetaryPercent,
  parseDate
} from './parser'

export async function fillRawVisitorsTable(): Promise<void> {
  for (let index = 1; index != TABLE_SIZE + 1; index += 1) {
    const frequency = generateFrequency()

    for (let indexInner = 0; indexInner != frequency; indexInner += 1) {
      const recency = generateRecency()
      const monetary = generateMonetary()

      const visitor = {
        visitorId: index,
        recency,
        monetary
      }

      await prisma.rawVisitors.create({ data: visitor })
    }
  }
}

export async function fillVisitorsTable(): Promise<void> {
  const rawVisitors = await prisma.rawVisitors.findMany()
  let id = -1
  for (const visitor of rawVisitors) {
    if (visitor.visitorId === id) {
      continue
    }
    id = visitor.visitorId
    const visits = await prisma.rawVisitors.findMany({
      where: { visitorId: id }
    })

    let lastRecency = '2021-01-01T00:00:00.837Z'
    let frequency = 0
    let monetary = 0
    for (const visit of visits) {
      if (parseDate(lastRecency) < parseDate(visit.recency)) {
        lastRecency = visit.recency
      }
      frequency += 1
      monetary += visit.monetary
    }

    await prisma.visitors.create({
      data: {
        id,
        recency: lastRecency,
        frequency,
        monetary
      }
    })
  }
}

export async function fillVisitorsStatsTable(): Promise<void> {
  const visitors = await prisma.visitors.findMany()
  const visitorsMonetary = calculateMonetaryPercent(visitors)
  for (const visitor of visitorsMonetary) {
    const recencyRank = rankRecency(parseDate(visitor.recency))
    const frequencyRank = rankFrequency(visitor.frequency)
    await prisma.visitorsStats.create({
      data: {
        ...visitor,
        recencyRank,
        frequencyRank,
        monetaryRank: visitor.monetaryRank ? visitor.monetaryRank : 0
      }
    })
  }
}
