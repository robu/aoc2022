const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n')

class Grid {
    constructor() {
        this.data = new Set()
        this.boundaryXMin = 500
        this.boundaryXMax = 500
        this.boundaryYMin = 0
        this.boundaryYMax = 0
        this.floorLevel = 0
    }

    coordsToKey(x, y) { return `${x},${y}` }

    addBlock(x, y) {
        this.data.add(this.coordsToKey(x, y))
        if (this.boundaryXMin == null || x < this.boundaryXMin) { this.boundaryXMin = x }
        if (this.boundaryXMax == null || x > this.boundaryXMax) { this.boundaryXMax = x }
        if (this.boundaryYMin == null || y < this.boundaryYMin) { this.boundaryYMin = y }
        if (this.boundaryYMax == null || y > this.boundaryYMax) { this.boundaryYMax = y }
    }

    setFloorLevel() {
        return this.floorLevel = this.boundaryYMax + 2
    }

    outOfBounds(x, y) {
        return x < this.boundaryXMin || x > this.boundaryXMax || y < this.boundaryYMin || y > this.boundaryYMax
    }

    emptyCoord(x, y) {
        if (this.data.has(this.coordsToKey(x, y))) {
            return false
        } else if (this.floorLevel === 0) {
            return true
        } else {
            return y < this.floorLevel
        }
    }

    addRockLine(fromX, fromY, toX, toY) {
        for (let x = fromX, y = fromY; x != toX || y != toY; x += Math.sign(toX - fromX, y += Math.sign(toY - fromY))) {
            this.addBlock(x, y)
        }
        this.addBlock(toX, toY)
    }

    addRockLines(lists) {
        lists.forEach(list => {
            for (let i = 0; i < list.length - 1; i++) {
                this.addRockLine(list[i].x, list[i].y, list[i + 1].x, list[i + 1].y)
            }
        })
    }

    dropSandBlock(x, y) {
        if (this.floorLevel === 0 && this.outOfBounds(x, y)) {
            return null
        }
        if (this.emptyCoord(x, y + 1)) {
            return this.dropSandBlock(x, y + 1)
        } else if (this.emptyCoord(x - 1, y + 1)) {
            return this.dropSandBlock(x - 1, y + 1)
        } else if (this.emptyCoord(x + 1, y + 1)) {
            return this.dropSandBlock(x + 1, y + 1)
        } else {
            // sand block came to rest
            this.addBlock(x, y)
            return { x, y }
        }
    }
}

const toCoordList = (line) => {
    let arr = line.split(' -> ').map(c => c.split(',').map(v => parseInt(v))).map(c => {
        return { x: c[0], y: c[1] }
    })
    return arr
}

const part1 = () => {
    let grid = new Grid()
    grid.addRockLines(input.map(l => toCoordList(l)))
    let count = 0
    let dropCoord = null
    while ((dropCoord = grid.dropSandBlock(500, 0)) != null) {
        count++
    }
    return count
}

const part2 = () => {
    let grid = new Grid()
    grid.addRockLines(input.map(l => toCoordList(l)))
    grid.setFloorLevel()
    let count = 0
    let dropCoord = null
    while ((dropCoord = grid.dropSandBlock(500, 0)) != null) {
        count++
        if (dropCoord.x === 500 && dropCoord.y === 0) { break }
    }
    return count
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())

