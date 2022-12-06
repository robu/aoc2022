const fs = require('fs')

const input = fs.readFileSync('input.txt', { encoding: 'utf8' }).trim().split('')

const findUniqueSequence = (data, length) => length + data.findIndex((c, i) => new Set(data.slice(i, i + length)).size == length)

const part1 = () => findUniqueSequence(input, 4)
const part2 = () => findUniqueSequence(input, 14)

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
