function hello() {
  console.log('Hello world!')
}

hello()

type Visitor = {
  frequency: number
  recencyRank?: number
  frequencyRank?: number
  monetaryRank?: number
}

function addFrequency(obj: Visitor): Visitor {
  return { ...obj, frequencyRank: 0 }
}

console.log(addFrequency({ frequency: 13 }).frequencyRank === 5)
console.log(addFrequency({ frequency: 7 }).frequencyRank === 4)
console.log(addFrequency({ frequency: 4 }).frequencyRank === 3)
console.log(addFrequency({ frequency: 2 }).frequencyRank === 2)
console.log(addFrequency({ frequency: 1 }).frequencyRank === 1)
