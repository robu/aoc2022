const fs = require('fs')

const input = fs.readFileSync('input.txt', { encoding: 'utf8' }).trim().split('\n').map(l => l.split(',').map(p => p.split('-').map(n => parseInt(n))))

const isContainedBy = (x1, x2, y1, y2) => x1 >= y1 && x2 <= y2
const containsOrIsContainedBy = (x1, x2, y1, y2) => isContainedBy(x1, x2, y1, y2) || isContainedBy(y1, y2, x1, x2)

const part1 = () => input.map(line=>containsOrIsContainedBy(line[0][0],line[0][1],line[1][0],line[1][1])).filter(v=>v).length

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
