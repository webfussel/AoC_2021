const fs = require('fs')
const fish = fs.readFileSync('./fish.txt').toString().trim().split(',').map(e => +e)

// General
const newBorn = 8
const resetTo = 6
const initialFishies = fish.reduce((f, c) => ({...f, [c]: BigInt(~~f[c]) + BigInt(1)}), {})

const increaseFishly = (fishies) => {
    const newBorns = [newBorn, BigInt(0)]
    return [...Object.entries(fishies).map(([days, amount],i,arr) => {
        let newDay = days - 1
        if (newDay < 0) {
            newDay = resetTo
            newBorns[1] = BigInt(amount)
        }
        if (+days === 0 || +days === resetTo+1) {
            return [newDay, BigInt(~~fishies[0]) + BigInt(~~fishies[resetTo+1])]
        } else {
            return [newDay, BigInt(amount)]
        }
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
console.log(`Part 1: ${calcFishies(initialFishies, 80)}`)

// Part 2
console.log(`Part 2: ${calcFishies(initialFishies, 256)}`)