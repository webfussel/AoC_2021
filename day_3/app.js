const fs = require('fs')
const bins = fs.readFileSync('./bins.txt').toString().split('\n').map(e => e.trim())

// General Usage
const countBits = (binaries, pos) => {
    const count = [0,0] // zeros,ones
    for (let j = 0; j < binaries.length; j++) {
        if (binaries[j][pos] === '0') count[0]++
        else count[1]++
    }
    return count
}

// Part 1
const energy = [...bins[0]].reduce((res,curr,i) => {
    const [zeros, ones] = countBits(bins, i)
    return {
        gamma: res.gamma += zeros > ones ? 0 : 1,
        epsilon: res.epsilon += zeros > ones ? 1 : 0,
        res: res.res
    }
}, {gamma: '', epsilon: '', res () { return parseInt(this.gamma, 2) * parseInt(this.epsilon, 2)}})

console.log(`Gamma: ${energy.gamma} (${parseInt(energy.gamma, 2)}) | Epsilon: ${energy.epsilon} (${parseInt(energy.epsilon, 2)}) | Result: ${energy.res()}`)

// Part 2
const filterForBit = (array, pos = 0, preferred, highOrLow) => {
    if (array.length === 1) return array[0]
    const count = countBits(array, pos)
    const searchFor = `${count[0] === count[1] ? preferred : count.indexOf(highOrLow(...count))}`
    return filterForBit(array.filter(e => e[pos] === searchFor), pos + 1, preferred, highOrLow)
}

const generator = filterForBit(bins, 0, 1, Math.max)
const scrubber = filterForBit(bins, 0, 0, Math.min)
const res = parseInt(generator, 2) * parseInt(scrubber, 2)

console.log(`Generator: ${generator} (${parseInt(generator, 2)}) | Scrubber: ${scrubber} (${parseInt(scrubber, 2)}) | Result: ${res}`)