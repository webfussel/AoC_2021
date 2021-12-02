const fs = require('fs')
const nav = fs.readFileSync('./navigation.txt').toString().split('\n')

// Part 1
const coords = nav.reduce((r, c) => {
    const [,dir, amount] = c.match(/(.*?) (\d)/)
    return {
        pos: dir === 'forward' ? r.pos + +amount : r.pos,
        depth: dir === 'down' ? r.depth + +amount : dir !== 'forward' ? r.depth - +amount : r.depth
    }
}, {pos: 0, depth: 0})

console.log(`Pos: ${coords.pos} | Depth: ${coords.depth} | Final: ${coords.pos * coords.depth}`)

// Part 2
const course = nav.reduce((r, c) => {
    const [,dir, amount] = c.match(/(.*?) (\d)/)
    return {
        pos: dir === 'forward' ? r.pos + +amount : r.pos,
        aim: dir === 'down' ? r.aim + +amount : dir !== 'forward' ? r.aim - +amount : r.aim,
        depth: dir === 'forward' ? r.depth + amount * r.aim : r.depth
    }
}, {pos: 0, aim: 0, depth: 0})

console.log(`Pos: ${course.pos} | Depth: ${course.depth} | Aim: ${course.aim} | Final: ${course.pos * course.depth}`)