const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n')

const doCdCommand = (arg, path) => {
    if (arg === '/') {
        return []
    } else if (arg === '..') {
        path.pop()
    } else {
        path.push(arg)
    }
    return path
}

const pathFromArray = (arr) => arr.length == 0 ? '' : arr.length == 1 ? '/' : `/${arr.slice(1).join('/')}`

const findOrCreateNode = (tree, path) => {
    let node = tree
    if (path.length > 0) {
        let subnode = node.dirEntries[path[0]]
        if (!subnode) {
            subnode = node.dirEntries[path[0]] = { dirEntries: {}, fileEntries: {} }
        }
        node = subnode
        return findOrCreateNode(node, path.slice(1))
    } else {
        return node
    }
}

const readData = (lines) => {
    let path = []
    let tree = { fileEntries: {}, dirEntries: {} } // contains name, fileEntries and dirEntries. Each dirEntry does the same.
    let currentNode = tree
    lines.forEach(line => {
        let matches = null
        if (matches = line.match(/\$ cd (.+)$/)) {
            path = doCdCommand(matches[1], path)
            currentNode = findOrCreateNode(tree, path)
        } else if (matches = line.match(/\$ ls/)) {
            // ignore ls commands
        } else if (matches = line.match(/dir .+/)) {
            // ignore dir listings
        } else if (matches = line.match(/(\d+) (.+)$/)) {
            let [_, sizeStr, name] = matches
            let fileSize = parseInt(sizeStr)
            currentNode.fileEntries[name] = fileSize
        } else {
            throw `Unknown line format, can't parse: "${line}"`
        }
    })
    return tree
}

const calcDirSize = (tree) => {
    let fileTotal = Object.values(tree.fileEntries).reduce((s, v) => s + v, 0)
    let dirTotal = Object.values(tree.dirEntries).reduce((s, dirEntry) => s + calcDirSize(dirEntry), 0)
    tree.size = fileTotal + dirTotal
    return tree.size
}

const filterDirSizes = (tree, maximum, arr = []) => {
    if (tree.size <= maximum) {
        arr.push(tree.size)
    }
    Object.values(tree.dirEntries).forEach(node => filterDirSizes(node, maximum, arr))
    return arr
}

const findSmallestDirAtLeastSize = (tree, threshold, bestSoFar) => {
    if (tree.size >= threshold && tree.size < bestSoFar) {
        bestSoFar = tree.size
    }
    Object.values(tree.dirEntries).forEach(subdir => bestSoFar = findSmallestDirAtLeastSize(subdir, threshold, bestSoFar))
    return bestSoFar
}


const part1 = () => {
    let tree = readData(input)
    calcDirSize(tree)
    let arr = filterDirSizes(tree, 100000)
    return arr.reduce((s, v) => s + v, 0)
}

const part2 = () => {
    let tree = readData(input)
    calcDirSize(tree)

    let currentFreeSpace = 70000000 - tree.size
    let spaceNeeded = 30000000 - currentFreeSpace
    return findSmallestDirAtLeastSize(tree, spaceNeeded, tree.size+1)
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())

