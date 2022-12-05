const fs = require('fs')

const inputAllLines = fs.readFileSync('input.txt', { encoding: 'utf8' }).trimEnd().split('\n')

const parseStack = (lines) => {
    const arrs = lines.map((line) => [...Array(Math.ceil(line.length / 4))].map((_, i) => line.substring(1 + i * 4, 2 + i * 4)))
    let stacks = [...Array(arrs[arrs.length - 1].length)].map(_ => [])
    arrs.forEach((arr) => {
        arr.map((c, i) => {
            if (c != ' ') {
                stacks[i].unshift(c)
            }
        })
    })
    return stacks
}

const parseCommands = (lines) => {
    return lines.map((line) => {
        const matches = line.match(/move (\d+) from (\d+) to (\d+)/)
        return { move: parseInt(matches[1]), from: parseInt(matches[2]), to: parseInt(matches[3]) }
    })
}

let stack = parseStack(inputAllLines.slice(0, inputAllLines.findIndex(l => l === '') - 1))
let commands = parseCommands(inputAllLines.slice(inputAllLines.findIndex(l => l === '') + 1))

const doCommand = (stack, command, transform = x => x) => stack[command.to - 1].push(...transform(stack[command.from - 1].splice(-command.move)))

const part1 = () => {
    commands.forEach(cmd => doCommand(stack, cmd, x => x.reverse()))
    return stack.reduce(((res, s) => res + s[s.length - 1]), '')
}

const part2 = () => {
    commands.forEach(cmd => doCommand(stack, cmd))
    return stack.reduce(((res, s) => res + s[s.length - 1]), '')
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
