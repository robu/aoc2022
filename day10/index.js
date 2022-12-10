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

const part1 = () => {
    let sequence = executionSequence(input, 1)
    return 20 * sequence[19].valueBefore +
        60 * sequence[59].valueBefore +
        100 * sequence[99].valueBefore +
        140 * sequence[139].valueBefore +
        180 * sequence[179].valueBefore +
        220 * sequence[219].valueBefore
}

const part2 = () => {
    let sequence = executionSequence(input, 1)
    let crtLines = []
    for (let crtLine = 0; crtLine < 6; crtLine++) {
        crtLines.push([])
        for (crtPixel = 0; crtPixel < 40; crtPixel++) {
            let currentRegisterValue = sequence[crtLine * 40 + crtPixel].valueBefore
            if (Math.abs(crtPixel-currentRegisterValue)<=1) {
                crtLines[crtLine].push('#')
            } else {
                crtLines[crtLine].push('.')
            }
        }
    }
    return crtLines.map(line=>line.join('')).join('\n')
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())

