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
