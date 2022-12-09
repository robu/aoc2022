const fs = require('fs')

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
        if (Math.abs(this.row - otherKnot.row) <= 1 && Math.abs(this.col - otherKnot.col) <= 1) {
            return // no need to move, we're close enough
        }
        if (this.row != otherKnot.row) {
            this.row += Math.sign(otherKnot.row - this.row)
        } 
        if (this.col != otherKnot.col) {
            this.col += Math.sign(otherKnot.col - this.col)
        }
        this.recordVisitedPosition()
    }
}

const moveTheRope = (numKnots, lines) => {
    let knots = []
    for (let i = 0; i < numKnots; i++) {
        knots.push(new Knot())
    }
    lines.forEach(line => {
        let [direction, steps] = line
        for (let i = 0; i < steps; i++) {
            knots[0].moveDirection(direction)
            for (let k = 1; k < knots.length; k++) {
                knots[k].follow(knots[k-1])
            }
        }
    })
    return knots
}

const input = fs.readFileSync('input.txt', { encoding: 'utf8' }).trim().split('\n').map(line => line.split(' '))
input.forEach(line => line[1] = parseInt(line[1]))

const part1 = () => moveTheRope(2, input).pop().countVisitedPositions()

const part2 = () => moveTheRope(10, input).pop().countVisitedPositions()

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
