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

  tmxMap.tiles.forEach(function (tile, index) {
    let tileId = '' + tile.id
    let last = (index === tmxMap.tiles.length - 1)
    let lastInRow = (index % tmxMap.width === 0)

    if (!last) {
      tileId = tileId + ', '
    }

    if (index !== 0 && lastInRow || last) {
      tileId = tileId + '\n  '
    }

    dest.push(tileId)
  })

  const tail = '};'
  dest.push(tail)
  dest.end()
}

module.exports = exportToCollisionArray
