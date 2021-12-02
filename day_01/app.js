const fs = require('fs')
const depths = fs.readFileSync('./depths.txt').toString().split('\n').map(el => +el)

// Universally used
const findIncreases = (r,c,i,a) => c > a[i-1] ? r+1 : r

// Part 1
const res_01 = depths.reduce(findIncreases, 0)
console.log(`Part 1: ${res_01}`)

// Part 2
const depths_windows = depths.map((e,i,a) => e+a[i+1]+a[i+2])
depths_windows.length -= 2

const res_02 = depths_windows.reduce(findIncreases, 0)
console.log(`Part 2: ${res_02}`)