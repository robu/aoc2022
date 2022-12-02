const fs = require('fs')

// input is array of arrays of inputs
const input = fs.readFileSync('input.txt', {encoding: 'utf8'}).trim().split('\n').map(l=>l.split(' '))

const score = (opponent, you) => {
    const move = `${opponent}${you}`
    switch (move) {
        case 'AX': return 1+3;
        case 'AY': return 2+6;
        case 'AZ': return 3+0;
        case 'BX': return 1+0;
        case 'BY': return 2+3;
        case 'BZ': return 3+6;
        case 'CX': return 1+6;
        case 'CY': return 2+0;
        case 'CZ': return 3+3;
    }
}

const mapOwnMove = (opponent, shouldWin) => {
    const move = `${opponent}${shouldWin}`
    switch (move) {
        case 'AX': return 'Z';
        case 'AY': return 'X';
        case 'AZ': return 'Y';
        case 'BX': return 'X';
        case 'BY': return 'Y';
        case 'BZ': return 'Z';
        case 'CX': return 'Y';
        case 'CY': return 'Z';
        case 'CZ': return 'X';
    }
}

const part1 = () => input.map(l=>score(l[0],l[1])).reduce((s,x)=>s+x, 0)
const part2 = () => input.map(l=>[l[0], mapOwnMove(l[0], l[1])]).map(l=>score(l[0],l[1])).reduce((s,x)=>s+x, 0)

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
