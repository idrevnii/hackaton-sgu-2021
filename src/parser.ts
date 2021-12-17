import moment from 'moment'
import { Visitor } from './models'

export function parseDate(date: string): number {
  return moment(date).dayOfYear()
}

export function rankRecency(recency: number): number {
  if (recency >= 0 && recency <= 13) {
    return 5
  } else if (recency >= 14 && recency <= 29) {
    return 4
  } else if (recency >= 30 && recency <= 43) {
    return 3
  } else if (recency >= 44 && recency <= 59) {
    return 2
  } else if (recency >= 60) {
    return 1
  } else {
    return 0
  }
}

export function rankFrequency(frequency: number): number {
  if (frequency >= 12) {
    return 5
  } else if (frequency >= 6 && frequency <= 11) {
    return 4
  } else if (frequency >= 4 && frequency <= 5) {
    return 3
  } else if (frequency >= 2 && frequency <= 3) {
    return 2
  } else if (frequency === 1) {
    return 1
  } else {
    return 0
  }
}

export function calculateMonetaryPercent(visitors: Visitor[]): Visitor[] {
  visitors.sort((a, b) => b.monetary - a.monetary)

  const sum = visitors.reduce((acc, el) => acc + el.monetary, 0)

  let index = 0
  const mapCapSum = [
    sum / 2,
    sum / 5,
    (sum - (sum / 2 + sum / 5)) / 2,
    sum / 10,
    sum / 20
  ]
  const mapRank = [5, 4, 3, 2, 1]

  let bufferSum = 0
  let capSum = mapCapSum[index]
  let rank = mapRank[index]

  const stepDown = () => {
    bufferSum = 0
    index += 1
    capSum = mapCapSum[index]
    rank = mapRank[index]
  }

  for (const visitor of visitors) {
    visitor.monetaryRank = rank
    bufferSum += visitor.monetary
    if (bufferSum >= capSum) {
      stepDown()
    }
  }

  return visitors
}

export function rankVisitor(visitor: Visitor): Visitor {
  if (visitor.recencyRank && visitor.monetaryRank && visitor.frequencyRank) {
    if (
      visitor.recencyRank <= 2 &&
      visitor.frequencyRank >= 4 &&
      visitor.monetaryRank >= 4
    ) {
      return { ...visitor, rank: 'Ушедшие выгодные' }
    }
    if (
      visitor.recencyRank >= 4 &&
      visitor.frequencyRank >= 3 &&
      visitor.monetaryRank >= 1
    ) {
      return { ...visitor, rank: 'Супер лояльные' }
    }
    if (
      visitor.recencyRank <= 3 &&
      visitor.frequencyRank >= 2 &&
      visitor.monetaryRank >= 1
    ) {
      return { ...visitor, rank: 'Спящие лояльные' }
    }
    if (
      visitor.recencyRank >= 4 &&
      visitor.frequencyRank === 1 &&
      visitor.monetaryRank === 1
    ) {
      return { ...visitor, rank: 'Новички' }
    }
    if (
      visitor.recencyRank >= 4 &&
      visitor.frequencyRank <= 2 &&
      visitor.monetaryRank >= 1
    ) {
      return { ...visitor, rank: 'Переспективные новички' }
    }
    if (
      visitor.recencyRank === 1 &&
      visitor.frequencyRank <= 2 &&
      visitor.monetaryRank >= 2
    ) {
      return { ...visitor, rank: 'Особый повод' }
    }
    if (
      visitor.recencyRank <= 3 &&
      visitor.frequencyRank === 1 &&
      visitor.monetaryRank <= 2
    ) {
      return { ...visitor, rank: 'Ушедшие обычные' }
    }
    return { ...visitor, rank: 'Unknown' }
  } else {
    return { ...visitor, rank: 'Unknown' }
  }
}
