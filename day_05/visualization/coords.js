const fs = require('fs')
const vents = fs.readFileSync('../vents.txt').toString().split('\r\n').map(vent => vent.split(' -> ').map(coords => coords.split(',').map(e => +e)))

const getLowAndHigh = (a,b) => [Math.max(a,b), Math.min(a,b)]
const increaseCoord = (obj, coord) => obj[coord] = ~~obj[coord]+1

const highest = vents.flat(3).reduce((highest, current) => current > highest ? current : highest, 0)

const coords = {}
vents.forEach(([[fromX, fromY], [toX,toY]]) => {
    const [highX, lowX] = getLowAndHigh(fromX, toX)
    const [highY, lowY] = getLowAndHigh(fromY, toY)
    switch (true) {
        case fromX === toX:
            for (let i = lowY; i <= highY; i++)
                increaseCoord(coords, `${fromX}x${i}`); break;
        case fromY === toY:
            for (let i = lowX; i <= highX; i++)
                increaseCoord(coords, `${i}x${toY}`); break;
        case fromX === lowX && fromY === lowY:
            for (let i = lowX, j = lowY; i <= highX && j <= highY; i++, j++)
                increaseCoord(coords, `${i}x${j}`); break;
        case fromX === lowX && fromY === highY:
            for (let i = lowX, j = highY; i <= highX && j >= lowY; i++, j--)
                increaseCoord(coords, `${i}x${j}`); break;
        case fromX === highX && fromY === lowY:
            for (let i = highX, j = lowY; i >= lowX && j <= highY; i--, j++)
                increaseCoord(coords, `${i}x${j}`); break;
        case fromX === highX && fromY === highY:
            for (let i = highX, j = highY; i >= lowX && j >= lowY; i--, j--)
                increaseCoord(coords, `${i}x${j}`);
    }
})

module.exports = {
    coords, highest
}