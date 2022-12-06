const fs = require('fs')

const input = fs.readFileSync('input.txt', { encoding: 'utf8' }).trim().split('')

const hasDuplicate = (arr) => {
    if (arr.length <= 1) {
        return false
    } else if (arr.slice(1).indexOf(arr[0]) >= 0) {
        return true
    } else {
        return hasDuplicate(arr.slice(1))
    }
}

const findUniqueSequence = (data, length) => length + data.findIndex((c, i) => !hasDuplicate(data.slice(i, i + length)))

const part1 = () => findUniqueSequence(input, 4)
const part2 = () => findUniqueSequence(input, 14)

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
