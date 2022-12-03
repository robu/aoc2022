const fs = require('fs')

const aCode = 'a'.charCodeAt(0)
const ACode = 'A'.charCodeAt(0)

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

const findMatch = (str1, str2) => {
    for (let c in str1) {
        if (str2.includes(str1[c])) {
            return str1[c]
        }
    }
}

const findMatch3 = (str1, str2, str3) => {
    for (let c in str1) {
        if (str2.includes(str1[c]) && str3.includes(str1[c])) {
            return str1[c]
        }
    }
}

const matches = (arr) => arr.map(e => findMatch(e[0], e[1]))

const prio = (char) => char.match(/[a-z]/) ? char.charCodeAt(0) - aCode + 1 : char.charCodeAt(0) - ACode + 27

const part1 = () => matches(splitLines(input)).map(x => prio(x)).reduce((s, p) => s + p, 0)

const part2 = () => groupLines(input).map(grp => findMatch3(grp[0], grp[1], grp[2])).map(x => prio(x)).reduce((s, p) => s + p, 0)


console.log((process.env.part || "part1") == "part1" ? part1() : part2())
