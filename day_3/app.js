const fs = require('fs')
const bins = fs.readFileSync('./bins.txt').toString().split('\n').map(e => e.trim())

// Part 1
const energy = {
    gamma: '',
    epsilon: '',
    res () {
        return parseInt(this.gamma, 2) * parseInt(this.epsilon, 2)
    }
}

for (let i = 0; i < bins[0].length; i++) {
    const count = [0,0] // zeros,ones
    for (let j = 0; j < bins.length; j++) {
        if (bins[j][i] === '0') count[0]++
        else count[1]++
    }
    energy.gamma += count.indexOf(Math.max(...count))
    energy.epsilon += count.indexOf(Math.min(...count))
}

console.log(`Gamma: ${energy.gamma} (${parseInt(energy.gamma, 2)}) | Epsilon: ${energy.epsilon} (${parseInt(energy.epsilon, 2)}) | Result: ${energy.res()}`)
