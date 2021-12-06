const fs = require('fs')
const fish = fs.readFileSync('./fish.txt').toString().trim().split(',').map(e => +e).reduce((f, c) => ({...f, [c]: BigInt(~~f[c]) + BigInt(1)}), {})

// General
const newBorn = 8
const resetTo = 6

const increaseFishly = (fishies) => {
    const newBorns = [newBorn, BigInt(0)]
    return [...Object.entries(fishies).map(([days, amount],i,arr) => {
        let newDay = days-1 < 0 ? resetTo : days-1
        days-1 < 0 && (newBorns[1] = BigInt(amount))
        const newAmount = +days === 0 || +days === resetTo+1 ? BigInt(~~fishies[0]) + BigInt(~~fishies[resetTo+1]) : BigInt(amount)
        return [newDay, newAmount]
    }),newBorns].reduce((f,c) => ({...f, [c[0]]: BigInt(c[1])}),{})
}

const calcFishies = (fish, days) => {
    let lastFishies = fish
    for (let i = 0; i < days; i++) {
        lastFishies = increaseFishly(lastFishies)
    }
    return Object.values(lastFishies).reduce((r,c) => BigInt(r)+BigInt(c), 0)
}

// Part 1
console.log(`Part 1: ${calcFishies(fish, 80)}`)

// Part 2
console.log(`Part 2: ${calcFishies(fish, 256)}`)