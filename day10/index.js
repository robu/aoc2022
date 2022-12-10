const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n')

const executionSequence = (lines, initialValue) => {
    let registerValue = initialValue
    let state = [] // one entry per clock cycle
    lines.forEach(line => {
        if (line === 'noop') {
            state.push({ valueBefore: registerValue, valueAfter: registerValue, cmd: line })
        } else {
            let matches = line.match(/^addx (.+)$/)
            if (!matches) {
                throw `unexpected input: "${line}"`
            }
            let delta = parseInt(matches[1])
            state.push({ valueBefore: registerValue, valueAfter: registerValue, cmd: line })
            state.push({ valueBefore: registerValue, valueAfter: registerValue + delta, cmd: line })
            registerValue += delta
        }
    })
    return state
}

const sequence = executionSequence(input, 1)

const part1 = () => [20, 60, 100, 140, 180, 220].map(c => c * sequence[c - 1].valueBefore).reduce((s, v) => s + v)

const part2 = () => {
    let crtLines = []
    for (let crtLine = 0; crtLine < 6; crtLine++) {
        crtLines.push([])
        for (crtPixel = 0; crtPixel < 40; crtPixel++) {
            let currentRegisterValue = sequence[crtLine * 40 + crtPixel].valueBefore
            crtLines[crtLine].push(Math.abs(crtPixel - currentRegisterValue) <= 1 ? '#' : '.')
        }
    }
    return crtLines.map(line => line.join('')).join('\n')
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())

