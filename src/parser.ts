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

// function compare(a: Visitor, b: Visitor) {
//   if (a.monetary < b.monetary) {
//     return 1
//   }
//   if (a.monetary > b.monetary) {
//     return -1
//   }
//   return 0
// }

// export function reduceMonetaryPercent(arr: Visitor[]): Visitor[] {
//   arr.sort(compare)
//   const sum = arr.reduce((acc, el) => acc + el.monetary, 0)
//   console.log(sum)
//   return arr.map((el) => {
//     const percent = Math.floor((el.monetary * 100) / sum) * 100000000
//     const monetaryPercent =
//       percent <= 5
//         ? 5
//         : percent <= 10
//         ? 10
//         : percent <= 15
//         ? 15
//         : percent <= 20
//         ? 20
//         : 50
//     console.log(
//       `monetary: ${el.monetary},  monetaryCalc: ${
//         ((el.monetary * 100) / sum) * 100
//       } rawPrecent: ${percent}, percent: ${monetaryPercent}, rank: ${monetaryRank(
//         monetaryPercent
//       )}`
//     )
//     return { ...el, monetaryRank: monetaryRank(monetaryPercent) }
//   })
// }

// function monetaryRank(monetaryPercent: number): number {
//   if (monetaryPercent === 50) {
//     return 5
//   }
//   if (monetaryPercent === 20) {
//     return 4
//   }
//   if (monetaryPercent === 15) {
//     return 3
//   }
//   if (monetaryPercent === 10) {
//     return 2
//   }
//   if (monetaryPercent === 5) {
//     return 1
//   }
//   return 0
// }
