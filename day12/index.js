const fs = require('fs')

const input = fs.readFileSync('input-test.txt', 'utf8').trim().split('\n').split('')

const findLetter = (char, grid) => {
    grid.forEach((row, rowIndex) => {
        row.forEach((c, colIndex) => {
            if (c === char) {
                return [rowIndex, colIndex]
            }
        })
    })
}

