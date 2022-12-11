const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n')

const sections = (lines) => {
    let secs = []
    let currentSection = []
    lines.forEach(line => {
        if (line.trim().length === 0) {
            secs.push(currentSection)
            currentSection = []
        } else {
            currentSection.push(line)
        }
    })
    if (currentSection.length > 0) {
        secs.push(currentSection)
    }
    return secs
}

class Monkey {
    constructor(lines) {
        this.inspectCount = 0
        lines.forEach(line => {
            let matches = null
            if (matches = line.trim().match(/Monkey (\d+):/)) {
                this.monkeyIndex = parseInt(matches[1])
            } else if (matches = line.trim().match(/Starting items: (.+)$/)) {
                this.items = matches[1].split(',').map(x => parseInt(x.trim()))
            } else if (matches = line.trim().match(/Operation: (.+)$/)) {
                this.operationStr = matches[1]
                // console.log(this.operationStr)
                let opMatches = this.operationStr.match(/new = old ([\+\*]) (.+)$/)
                this.operationOperator = opMatches[1]
                this.operationParameter = opMatches[2]
            } else if (matches = line.trim().match(/Test: divisible by (\d+)$/)) {
                this.testDivisible = parseInt(matches[1])
            } else if (matches = line.trim().match(/If true: throw to monkey (\d+)$/)) {
                this.trueTarget = parseInt(matches[1])
            } else if (matches = line.trim().match(/If false: throw to monkey (\d+)$/)) {
                this.falseTarget = parseInt(matches[1])
            } else {
                throw `couldn't parse line "${line}"`
            }
        })
    }

    getInspectCount() { return this.inspectCount }

    receiveItem(worryLevel) {
        this.items.push(worryLevel)
    }

    inspectAndThrow(item, monkeys) {
        this.inspectCount++
        let op = this.operationOperator == '*' ? (x, y) => x * y : (x, y) => x + y
        let opVal = this.operationParameter === 'old' ? item : parseInt(this.operationParameter)
        let newWorryLevel = Math.floor(op(item, opVal) / 3)
        let target = newWorryLevel % this.testDivisible === 0 ? this.trueTarget:this.falseTarget
        //console.log(`monkey ${this.monkeyIndex}, item ${item}, newLevel: ${newWorryLevel}, target: ${target}`)
        monkeys[target].receiveItem(newWorryLevel)
    }

    doTurn(allMonkeys) {
        this.items.forEach(item => this.inspectAndThrow(item, allMonkeys))
        this.items = []
    }

    toString() {
        return `Monkey ${this.monkeyIndex}:\n` +
            `  Items: ${this.items.join(', ')}\n` +
            `  Operation: ${this.operationStr}\n` +
            `  Test: divisible by ${this.testDivisible}\n` +
            `    if true: throw to monkey ${this.trueTarget}\n` +
            `    if false: throw to monkey ${this.falseTarget}`
    }
}

const monkeyRound = (monkeys, numRounds = 20) => {
    for (let round = 0; round < numRounds; round++) {
        monkeys.forEach(monkey => monkey.doTurn(monkeys))
    }
}

const part1 = () => {
    let monkeys = sections(input).map(s => new Monkey(s))
    monkeyRound(monkeys)
    return monkeys.map(m=>m.getInspectCount()).sort((x,y)=>y-x).slice(0,2).reduce((p,f)=>p*f)
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())

