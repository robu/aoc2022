const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n')

const splitIntoPairs = (lines) => {
    let pairsList = []
    let currentPair = []
    lines.forEach(line => {
        if (line.trim() === '') {
            pairsList.push(currentPair)
            currentPair = []
        } else {
            currentPair.push(line)
        }
    })
    if (currentPair.length > 0) {
        pairsList.push(currentPair)
    }
    return pairsList.map((pair => {
        if (pair.length != 2) {
            throw `Syntax error pair: ${pair.join(';')}`
        }
        return { left: eval(pair[0]), right: eval(pair[1]) }
    }))
}

const rightOrder = (left, right) => {
    if (typeof (left) === 'number' && typeof (right) === 'number') {
        // if (left > right) {
        //     console.log(`false since ${left} > ${right}`)
        // }
        return left < right ? true : left > right ? false : undefined
    } else if (typeof (left) === 'number' || typeof (right) === 'number') {
        return typeof (left) === 'number' ? rightOrder([left], right) : rightOrder(left, [right])
    } else {
        // both are lists
        for (let i = 0; i < left.length && i < right.length; i++) {
            let ro = rightOrder(left[i], right[i])
            if (ro === true || ro === false) {
                // console.log(`false since ${left[i]} and ${right[i]} is wrong order`)
                return ro
            } 
        }
        if (left.length == 0 || right.length == 0){
            return left.length < right.length
        }
        if (left.length > right.length) {
            return right.length > 0 && left[0] < right[0]
        } else {
            // if (left.length > right.length) {
            //     console.log(`false since length ${left.length} > length ${right.length}`)
            // }
            return left.length <= right.length
        }
    }
}


const part1 = () => {
    return splitIntoPairs(input).map((pair, i) => {
        let r = rightOrder(pair.left, pair.right)
        console.log(`Pair ${i + 1} is in the ${r?"right":"wrong"} order`)
        return r ? i + 1 : 0
    }).reduce((s, v) => s + v, 0)
}

// incorrect: 1148 too low
// incorrect: 1297 
// incorrect: 6114

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
