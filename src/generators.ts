import moment from 'moment'
import random from 'random'
import {
  FREQUENCY_END,
  FREQUENCY_START,
  MONETARY_END,
  MONETARY_START,
  RECENCY_END,
  RECENCY_START
} from './consts'

export function generateRecency(
  start = RECENCY_START,
  end = RECENCY_END
): string {
  const num = random.int(start, end)
  const date = moment().dayOfYear(num)
  return date.toISOString()
}

export function generateFrequency(
  start = FREQUENCY_START,
  end = FREQUENCY_END
): number {
  return random.int(start, end)
}

export function generateMonetary(
  frequency: number,
  start = MONETARY_START,
  end = MONETARY_END
): number {
  const arr = []
  for (let i = 0; i != frequency; i += 1) {
    arr.push(random.int(start, end))
  }
  return arr.reduce((acc, el) => acc + el, 0)
}
