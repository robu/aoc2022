const fs = require('fs')

const input = fs.readFileSync('input.txt', { encoding: 'utf8' }).trim().split('\n')

const cl = l => console.log(l)
const jl = j => cl(JSON.stringify(j, null, 2))

const createDirInTree = (tree, pathArr) => {
    //cl(`createDirInTree "${pathArr}"`)
    if (pathArr.length == 1 && pathArr[0] == tree.name) {
        return tree
    } else if (pathArr.length > 1 && pathArr[0] == tree.name) {
        return createDirInTree(tree, pathArr.slice(1))
    } else {
        //cl(`looking for node "${pathArr[0]}"`)
        let node = tree.entries.find(e => e.name === pathArr[0])
        if (node) {
            if (pathArr.length == 1) {
                return node
            } else {
                return createDirInTree(node, pathArr.slice(1))
            }
        } else {
            // create node here
            tree.entries.push({
                name: pathArr[0],
                type: 'dir',
                size: -1,
                entries: []
            })
            return createDirInTree(tree, pathArr)
        }
    }
}

const doCdCommand = (arg, currentDir) => {
    let path = currentDir
    if (arg === '..') {
        path.pop()
    } else if (arg === '/') {
        path = ['/'] // root dir
    } else {
        path.push(arg)
    }
    return path
}

const doCommand = (line, currentDir) => {
    let matches = line.match(/^\$ cd (.+)$/)
    if (matches) {
        return doCdCommand(matches[1], currentDir)
    } else if (line.match(/^\$ ls/)) {
        return currentDir
    } else {
        return false
    }
}

const addFileToDir = (tree, path, fileLine) => {
    let matches = fileLine.match(/^(\d+) (.+)$/)
    if (matches) {
        let fileSize = parseInt(matches[1])
        let fileName = matches[2]
        let node = createDirInTree(tree, path)
        node.entries.push({
            name: fileName,
            type: 'file',
            size: fileSize
        })
    } else {
        // cl(`ignoring line "${fileLine}"`)
    }
}

const calcSizes = (treeNode) => {
    let size = 0
    treeNode.entries.forEach((entry) => {
        if (entry.type == 'file') {
            size += entry.size
        } else if (entry.type == 'dir') {
            size += calcSizes(entry)
        } else {
            throw `unknown entry type: ${entry.type}`
        }
    })
    treeNode.size = size
    return size
}

const buildTree = (lines) => {
    let dirTree = {
        name: '/',
        type: 'dir',
        size: -1,
        entries: []
    }
    let currentDir = []
    lines.forEach((line) => {
        let newDir = doCommand(line, currentDir)
        if (newDir) {
            currentDir = newDir
            createDirInTree(dirTree, currentDir)
        } else {
            addFileToDir(dirTree, currentDir, line)
        }
    })
    calcSizes(dirTree)
    return dirTree
}

const filterDirSizes = (treeNode) => {
    let arr = []
    if (treeNode.type === 'dir') {
        arr.push({ name: treeNode.name, size: treeNode.size })
        treeNode.entries.forEach(entry => arr.push(...filterDirSizes(entry)))
    }
    return arr
}

const filterNodes = (tree, pred) => {
    let arr = []
    if (pred(tree)) {
        arr.push(tree)
    }
    if (tree.type == 'dir') {
        tree.entries.forEach((e) => arr.push(...filterNodes(e, pred)))
    }
    return arr
}

const part1 = () => {
    let tree = buildTree(input)
    //jl({ tree })
    let dirSizes = filterDirSizes(tree).filter(e => e.size <= 100000)
    //jl({ dirSizes })

    return dirSizes.reduce((s, v) => s + v.size, 0)
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
