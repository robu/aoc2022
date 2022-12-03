const fs = require('fs')

const input = fs.readFileSync('input.txt', { encoding: 'utf8' }).trim().split('\n')

const splitLines = (lines) => lines.map(line => [line.substring(0, line.length / 2), line.substring(line.length / 2)])

const groupLines = (lines, groupSize = 3) => {
    let newArr = []
    let group = []
    for (i in lines) {
        group.push(lines[i])
        if (group.length === groupSize) {
            newArr.push(group)
            group = []
        }
    }
    return newArr
}

const matchInAll = (str, arr) => arr.reduce((result, s) => result && s.includes(str), true)

const findMatchInAll = (str, strArr) => str.split('').find(c => (matchInAll(c, strArr)))

const aCode = 'a'.charCodeAt(0)
const ACode = 'A'.charCodeAt(0)
const prio = (char) => char.match(/[a-z]/) ? char.charCodeAt(0) - aCode + 1 : char.charCodeAt(0) - ACode + 27

const part1 = () => splitLines(input).map(e => findMatchInAll(e[0], [e[1]])).reduce((s, c) => s + prio(c), 0)

const part2 = () => groupLines(input).map(grp => findMatchInAll(grp[0], [grp[1], grp[2]])).reduce((s, c) => s + prio(c), 0)

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
