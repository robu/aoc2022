const fs = require('fs')

class Grid {
    constructor() {
        this.data = fs.readFileSync('input.txt', { encoding: 'utf8' }).trim().split('\n').map(line => line.split('').map(n => parseInt(n)))
        this.confirmedViewable = new Set()
    }

    toString(d = this.data) {
        return d.map(r => r.join('')).join('\n')
    }

    toStringViewables() {
        let arr = []
        for (let row = 0; row < this.getNumRows(); row++) {
            let r = []
            for (let col = 0; col < this.getNumCols(); col++) {
                if (this.isViewable(row, col)) {
                    r.push(this.getTreeHeight(row, col))
                } else {
                    r.push('_')
                }
            }
            arr.push(r)
        }
        return arr.map(r => r.join('')).join('\n')
    }

    getTreeHeight(row, col) {
        return this.data[row][col]
    }

    getNumRows() { return this.data.length }
    getNumCols() { return this.data[0].length }

    isViewable(row, col) {
        const key = `${row},${col}`
        return this.confirmedViewable.has(key)
    }

    addViewable(row, col) {
        const key = `${row},${col}`
        return this.confirmedViewable.add(key)
    }

    countViewables() {
        return this.confirmedViewable.size
    }

    findViewableRows() {
        this.data.forEach((values, row) => {
            // from the left
            let highest = -1
            values.forEach((v, col) => {
                if (v > highest) {
                    highest = v
                    this.addViewable(row, col)
                }
            })
            // from the right
            highest = -1
            for (let col = values.length - 1; col >= 0; col--) {
                let v = values[col]
                if (v > highest) {
                    highest = v
                    this.addViewable(row, col)
                }
            }
        })
    }

    findViewableCols() {
        for (let col = 0; col < this.getNumCols(); col++) {
            let highest = -1
            for (let row = 0; row < this.getNumRows(); row++) {
                let v = this.getTreeHeight(row, col)
                if (v > highest) {
                    highest = v
                    this.addViewable(row, col)
                }
            }
            highest = -1
            for (let row = this.getNumRows() - 1; row >= 0; row--) {
                let v = this.getTreeHeight(row, col)
                if (v > highest) {
                    highest = v
                    this.addViewable(row, col)
                }
            }
        }
    }

    findViewables() {
        this.findViewableRows()
        this.findViewableCols()
    }

    getViewingDistanceN(fromRow, fromCol) {
        const originHeight = this.getTreeHeight(fromRow, fromCol)
        let distance = 0
        for (let row = fromRow - 1; row >= 0; row--) {
            if (this.getTreeHeight(row, fromCol) < originHeight) {
                distance++
            } else {
                distance++
                break;
            }
        }
        return distance
    }

    getViewingDistanceS(fromRow, fromCol) {
        const originHeight = this.getTreeHeight(fromRow, fromCol)
        let distance = 0
        for (let row = fromRow + 1; row < this.getNumRows(); row++) {
            if (this.getTreeHeight(row, fromCol) < originHeight) {
                distance++
            } else {
                distance++
                break;
            }
        }
        return distance
    }

    getViewingDistanceW(fromRow, fromCol) {
        const originHeight = this.getTreeHeight(fromRow, fromCol)
        let distance = 0
        for (let col = fromCol - 1; col >= 0; col--) {
            if (this.getTreeHeight(fromRow, col) < originHeight) {
                distance++
            } else {
                distance++
                break;
            }
        }
        return distance
    }

    getViewingDistanceE(fromRow, fromCol) {
        const originHeight = this.getTreeHeight(fromRow, fromCol)
        let distance = 0
        for (let col = fromCol + 1; col < this.getNumCols(); col++) {
            if (this.getTreeHeight(fromRow, col) < originHeight) {
                distance++
            } else {
                distance++
                break;
            }
        }
        return distance
    }

    getScenicScore(row, col) {
        if (row == 0 || col == 0 || row == this.getNumRows() - 1 || col == this.getNumCols() - 1) {
            return 0
        } else {
            return this.getViewingDistanceN(row, col) * this.getViewingDistanceE(row, col) * this.getViewingDistanceS(row, col) * this.getViewingDistanceW(row, col)
        }
    }

    calcMaxScenicScores() {
        let arr = []
        let highest = -1
        for (let row = 0; row < this.getNumRows(); row++) {
            let r = []
            for (let col = 0; col < this.getNumCols(); col++) {
                let ss = this.getScenicScore(row,col)
                if (ss > highest) {
                    highest = ss
                }
                r.push(ss)
            }
            arr.push(r)
        }
//        console.log(arr.map(r => r.join(',')).join('\n'))
        return highest
    }
}

const part1 = () => {
    let grid = new Grid()
    //    console.log(grid.toString())
    //    console.log('\n\n')
    grid.findViewables()
    //    console.log(grid.toStringViewables())
    return grid.countViewables()
}

const part2 = () => {
    let grid = new Grid()
//    console.log(grid.toString())
//    console.log('\n\n')
    return grid.calcMaxScenicScores()
}

// incorrect: 5762400

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
