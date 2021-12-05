const fs = require('fs')
const vents = fs.readFileSync('./vents.txt').toString().split('\r\n').map(vent => vent.split(' -> ').map(coords => coords.split(',').map(e => +e)))

const getLowAndHigh = (a,b) => [Math.max(a,b), Math.min(a,b)]
const increaseCoord = (obj, coord) => obj[coord] = ~~obj[coord]+1

// Part 1
const coordsPart1 = {}
vents.forEach(([[fromX, fromY], [toX,toY]]) => {
    const [highY, lowY] = getLowAndHigh(fromY, toY)
    const [highX, lowX] = getLowAndHigh(fromX, toX)
    switch (true) {
        case fromX === toX:
            for (let i = lowY; i <= highY; i++)
                increaseCoord(coordsPart1, `${fromX}x${i}`); break;
        case fromY === toY:
            for (let i = lowX; i <= highX; i++)
                increaseCoord(coordsPart1, `${i}x${toY}`)
    }
})

const overlapsPart1 = Object.values(coordsPart1).filter(val => val > 1).length
console.log(`Part 1 - Overlaps: ${overlapsPart1}`)

// Part 2
const coordsPart2 = {}
vents.forEach(([[fromX, fromY], [toX,toY]]) => {
    const [highX, lowX] = getLowAndHigh(fromX, toX)
    const [highY, lowY] = getLowAndHigh(fromY, toY)
    switch (true) {
        case fromX === toX:
            for (let i = lowY; i <= highY; i++)
                increaseCoord(coordsPart2, `${fromX}x${i}`); break;
        case fromY === toY:
            for (let i = lowX; i <= highX; i++)
                increaseCoord(coordsPart2, `${i}x${toY}`); break;
        case fromX === lowX && fromY === lowY:
            for (let i = lowX, j = lowY; i <= highX && j <= highY; i++, j++)
                increaseCoord(coordsPart2, `${i}x${j}`); break;
        case fromX === lowX && fromY === highY:
            for (let i = lowX, j = highY; i <= highX && j >= lowY; i++, j--)
                increaseCoord(coordsPart2, `${i}x${j}`); break;
        case fromX === highX && fromY === lowY:
            for (let i = highX, j = lowY; i >= lowX && j <= highY; i--, j++)
                increaseCoord(coordsPart2, `${i}x${j}`); break;
        case fromX === highX && fromY === highY:
            for (let i = highX, j = highY; i >= lowX && j >= lowY; i--, j--)
                increaseCoord(coordsPart2, `${i}x${j}`);
    }
})

const overlapsPart2 = Object.values(coordsPart2).filter(v => v > 1).length
console.log(`Part 2 - Overlaps: ${overlapsPart2}`)