
'use strict'
const through = require('through')
const fs = require('fs')
const encode = require('./encode')

const exportToNamArray = function (tmxMap, filename) {
  const destinationFile = fs.createWriteStream(filename)

  const dest = through(
    function write (data) {
      this.queue(data)
    },
    function end () {
      this.queue(null)
    }
  )
  dest.pipe(destinationFile)

  const tileIds = tmxMap.tiles.map(
    function (tile) {
      if (tile.id) {
        return tile.id
      } else {
        return 0
      }
    })
  const compressed = encode(tileIds)

  const head = 'const unsigned char nameTable[' + compressed.length + '] = {\n  '
  dest.push(head)
  compressed.forEach(function (item, index) {
    if (item === undefined) { return }

    let unsigned = item.toString(16)
    let last = index === compressed.length - 1

    if (unsigned.length === 1) {
      unsigned = '0' + unsigned
    }

    unsigned = '0x' + unsigned

    if (!last) {
      unsigned = unsigned + ', '
    }

    if (index % 16 === 0 || last) {
      unsigned = unsigned + '\n'
    }
    dest.push(unsigned)
  })
  const tail = '};'
  dest.push(tail)
  dest.end()
}

module.exports = exportToNamArray
