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

    moveUp() { this.row--; this.recordVisitedPosition() }
    moveUpRight() { this.row--; this.col++; this.recordVisitedPosition() }
    moveRight() { this.col++; this.recordVisitedPosition() }
    moveDownRight() { this.row++; this.col++; this.recordVisitedPosition() }
    moveDown() { this.row++; this.recordVisitedPosition() }
    moveDownLeft() { this.row++; this.col--; this.recordVisitedPosition() }
    moveLeft() { this.col--; this.recordVisitedPosition() }
    moveUpLeft() { this.row--; this.col--; this.recordVisitedPosition() }
    moveDirection(dir) {
        switch (dir) {
            case 'U':
                this.moveUp()
                break;
            case 'R':
                this.moveRight()
                break;
            case 'D':
                this.moveDown()
                break;
            case 'L':
                this.moveLeft()
                break;
            default:
                throw `Unknown direction: ${dir}`
        }
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

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
