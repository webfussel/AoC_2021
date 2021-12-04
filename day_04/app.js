const fs = require('fs')
const numbers = fs.readFileSync('./numbers.txt').toString().split(',')
const boards = fs.readFileSync('./boards.txt').toString().split('\r\n\r\n').map(e => e.split(/\r\n/g).map(e => e.split(' ').filter(e => !!e)))

// General Usage
const winning = JSON.stringify(['x', 'x', 'x', 'x', 'x'])
const checkIfWon = ([a,b,c,d,e]) => {
    for (let i = 0; i < 5; i++) {
        if (JSON.stringify([a[i], b[i], c[i], d[i], e[i]]) === winning) {
            return true
        }
    }
    return [a,b,c,d,e].some(row => JSON.stringify(row) === winning)
}

const markNumber = (board, number) => board.forEach(row => row.indexOf(number) > -1 && (row[row.indexOf(number)] = 'x'))
const calcResult = (board, number) => board.flat().map(e => +e).filter(e => !!e).reduce((sum, curr) => sum + curr, 0) * number

// Part 1
const partOneBoards = JSON.parse(JSON.stringify(boards))
let winner
let lastNumber = 0
for (let number of numbers) {
    for (let board of partOneBoards) {
        markNumber(board, number)
        if (checkIfWon(board)){
            winner = board
            lastNumber = number
            break
        }
    }
    if (!!winner) break;
}

console.log(`Part 1: ${calcResult(winner, lastNumber)}`)

// Part 2
const partTwoBoards = JSON.parse(JSON.stringify(boards))

let lastWinner
let lastWinningNumber
for (let number of numbers) {
    partTwoBoards.forEach(board => markNumber(board, number))
    const winners = partTwoBoards.filter(checkIfWon)
    if (!!winners.length) {
        lastWinner = winners[winners.length-1]
        lastWinningNumber = number
        winners.forEach(winner => partTwoBoards.splice(partTwoBoards.indexOf(winner), 1))
    }
}

console.log(`Part 2: ${calcResult(lastWinner, lastWinningNumber)}`)