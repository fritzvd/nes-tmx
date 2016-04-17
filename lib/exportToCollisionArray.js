'use strict'

const through = require('through')
const fs = require('fs')

const exportToCollisionArray = function (tmxMap, filename) {
  const destinationFile = fs.createWriteStream(filename)

  const head = 'const unsigned char tmxMap[] = {\n  '

  const dest = through(
    function write (data) {
      this.queue(data)
    },
    function end () {
      this.queue(null)
    }
  )
  dest.pipe(destinationFile)

  dest.push(head)

  console.log(tmxMap.tiles.length)
  for (let i = 0; tmxMap.tiles.length > i; i++) {
    const tile = tmxMap.tiles[i]
    let tileId = '' + tile.id
    let last = (i === tmxMap.tiles.length - 1)
    let lastInRow = (i % tmxMap.width === 0)
    console.log(i)

    if (!last) {
      tileId = tileId + ', '
    }

    if (i !== 0 && lastInRow || last) {
      tileId = tileId + '\n  '
      console.log('never')
    }

    dest.push(tileId)
  }

  const tail = '};'
  dest.push(tail)
  dest.end()
}

module.exports = exportToCollisionArray
