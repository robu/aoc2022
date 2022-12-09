const fs = require('fs')

const input = fs.readFileSync('input.txt', { encoding: 'utf8' }).trim().split('\n').map(line => line.split(' '))
input.forEach(line => line[1] = parseInt(line[1]))

class Knot {
    constructor(startRow = 0, startCol = 0) {
        this.row = startRow
        this.col = startCol
        this.visitedPositions = []
        this.recordVisitedPosition()
    }

    recordVisitedPosition() { this.visitedPositions.push(`${this.row},${this.col}`) }
    countVisitedPositions() { return new Set(this.visitedPositions).size }

    moveDirection(dir) {
        switch (dir) {
            case 'U':
                this.row--
                break;
            case 'R':
                this.col++
                break;
            case 'D':
                this.row++
                break;
            case 'L':
                this.col--
                break;
            default:
                throw `Unknown direction: ${dir}`
        }
        this.recordVisitedPosition()
    }
    follow(otherKnot) {
        let rowDistance = Math.abs(this.row - otherKnot.row)
        let colDistance = Math.abs(this.col - otherKnot.col)
        if (rowDistance <= 1 && colDistance <= 1) {
            return // no need to move, we're close enough
        }
        if (this.row === otherKnot.row) {
            this.col += Math.sign(otherKnot.col - this.col)
        } else if (this.col === otherKnot.col) {
            this.row += Math.sign(otherKnot.row - this.row)
        } else {
            this.col += Math.sign(otherKnot.col - this.col)
            this.row += Math.sign(otherKnot.row - this.row)
        }
        this.recordVisitedPosition()
    }
}

const part1 = () => {
    let headKnot = new Knot()
    let tailKnot = new Knot()
    input.forEach(line => {
        let [direction, steps] = line
        for (let i = 0; i < steps; i++) {
            headKnot.moveDirection(direction)
            tailKnot.follow(headKnot)
        }
    })
    return tailKnot.countVisitedPositions()
}

const part2 = () => {
    let knots = []
    for (let i = 0; i < 10; i++) {
        knots.push(new Knot())
    }
    input.forEach(line => {
        let [direction, steps] = line
        for (let i = 0; i < steps; i++) {
            knots[0].moveDirection(direction)
            for (let k = 1; k < knots.length; k++) {
                knots[k].follow(knots[k-1])
            }
        }
    })
    return knots[knots.length - 1].countVisitedPositions()
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
