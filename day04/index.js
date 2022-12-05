const fs = require('fs')

const input = fs.readFileSync('input.txt', { encoding: 'utf8' }).trim().split('\n').map(l => l.split(',').map(p => p.split('-').map(n => parseInt(n))))

const part1 = () => input.filter(l => l[0][0] >= l[1][0] && l[0][1] <= l[1][1] || l[1][0] >= l[0][0] && l[1][1] <= l[0][1]).length
const part2 = () => input.filter(l => l[0][0] >= l[1][0] && l[0][0] <= l[1][1] || l[0][1] >= l[1][0] && l[0][1] <= l[1][1] || l[0][0] >= l[1][0] && l[0][1] <= l[1][1] || l[1][0] >= l[0][0] && l[1][1] <= l[0][1]).length

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
