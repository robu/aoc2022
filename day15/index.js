const fs = require('fs')

const distance = (c1, c2) => Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y)

const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n').map(line => {
    let matches = line.match(/^Sensor at x=(\-?\d+), y=(\-?\d+): closest beacon is at x=(\-?\d+), y=(\-?\d+)$/)
    if (!matches) throw `unexpected line: "${line}"`
    return { sensor: { x: parseInt(matches[1]), y: parseInt(matches[2]) }, beacon: { x: parseInt(matches[3]), y: parseInt(matches[4]) } }
})


const outerBounds = (sensors) => {
    if (sensors.length === 0) { return null }
    let s1 = sensors[0]
    let minX = Math.min(s1.sensor.x, s1.beacon.x)
    let maxX = Math.max(s1.sensor.x, s1.beacon.x)
    let minY = Math.min(s1.sensor.y, s1.beacon.y)
    let maxY = Math.max(s1.sensor.y, s1.beacon.y)
    sensors.slice(1).forEach(s => {
        minX = Math.min(minX, s.sensor.x, s.beacon.x)
        maxX = Math.max(maxX, s.sensor.x, s.beacon.x)
        minY = Math.min(minY, s.sensor.y, s.beacon.y)
        maxY = Math.max(maxY, s.sensor.y, s.beacon.y)
    })
    return { minX, maxX, minY, maxY }
}

const examineLine = (y, sensors) => {
    // console.log(`sensors: ${JSON.stringify(sensors, null, 2)}`)
    let excludedPositions = new Set()
    let bounds = outerBounds(sensors)
    // console.log(`bound: ${JSON.stringify(bounds)}`)
    sensors.forEach(sb => {
        let reach = distance(sb.sensor, sb.beacon)
        for (let x = bounds.minX; x <= bounds.maxX; x++) {
            let dist = distance({ x, y }, sb.sensor)
            // console.log(`${JSON.stringify({ reach, x, dist })}`)
            if (dist <= reach) {
                excludedPositions.add(x)
            }
        }
    })
    sensors.forEach(sb => {
        if (sb.sensor.y === y) { excludedPositions.delete(sb.sensor.x) }
        if (sb.beacon.y === y) { excludedPositions.delete(sb.beacon.x) }
    })
    return excludedPositions
}

// incorrect: 4625358, too low
part1 = () => examineLine(2000000, input).size

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
