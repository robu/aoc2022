const { InputData } = require('aoc-toolbox')

const input = new InputData().sections().map(id => id.linesInts().reduce((sum, a) => sum + a, 0))

const part1 = () => input.reduce((high, a) => high > a ? high : a, -1) // highest calorie value

const part2 = () => {
    input.sort((x, y) => y - x)
    return input[0] + input[1] + input[2]
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())

