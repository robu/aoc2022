const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n')

const doCdCommand = (arg, path) => {
    let arg = matches[1]
    if (arg === '/') {
        return []
    } else if (arg === '..') {
        path.pop()
        return path
    } else {
        path.push(arg)
    }
}

const readData = (lines) => {
    let path = []
    lines.forEach(line => {
        let matches = null
        if (matches = line.match(/\$ cd (.+)$/)) {
            path = doCdCommand(matches[1], path)
        } else if (matches = line.match(/\$ ls/)) {
            // ignore ls commands
        } else if (matches = line.match(/dir .+/)) {
            // ignore dir listings
        } else if (matches = line.match(/(\d+) (.+)$/)) {
            let [sizeStr, name] = matches
            
        }

    })
}

