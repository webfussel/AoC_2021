const fs = require('fs')
const nav = fs.readFileSync('./navigation.txt').toString().split('\n')

// Part 1
const coords = {
    pos: 0,
    depth: 0
}

nav.forEach(e => {
    const [,direction, amount] = e.match(/(.*?) (\d)/)
    switch(direction) {
        case 'forward': coords.pos += +amount; break;
        case 'down': coords.depth += +amount; break;
        case 'up': coords.depth -= +amount; break;
    }
})

console.log(`Pos: ${coords.pos} | Depth: ${coords.depth} | Final: ${coords.pos * coords.depth}`)

// Part 2
const course = {
    pos: 0,
    depth: 0,
    aim: 0
}

nav.forEach(e => {
    const [,direction, amount] = e.match(/(.*?) (\d)/)
    switch(direction) {
        case 'forward': course.pos += +amount; course.depth += amount * course.aim; break;
        case 'down': course.aim += +amount; break;
        case 'up': course.aim -= +amount; break;
    }
})

console.log(`Pos: ${course.pos} | Depth: ${course.depth} | Aim: ${course.aim} | Final: ${course.pos * course.depth}`)