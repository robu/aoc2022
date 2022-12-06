const fs = require('fs')

const input = fs.readFileSync('input.txt', { encoding: 'utf8' }).trim().split('')

const findUniqueSequence = (data, length) => length + data.findIndex((_, i) => new Set(data.slice(i, i + length)).size == length)

console.log((process.env.part || "part1") == "part1" ? findUniqueSequence(input, 4) : findUniqueSequence(input, 14))
