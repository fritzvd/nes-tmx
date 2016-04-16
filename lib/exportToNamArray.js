'use strict'

const through = require('through')
const fs = require('fs')
const encode = require('voxel-crunch').encode

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

  const head = 'const unsigned char nameTable[] = {\n  '
  dest.push(head)

  const compressed = encode(tmxMap.tiles)
  compressed.forEach(function (item, index) {
    let unsigned = item.toString(16)

    if (unsigned.length === 1) {
      unsigned = '0' + unsigned
    }

    unsigned = '0x' + unsigned + ', '

    dest.push(unsigned)
  })

  const tail = '};'
  dest.push(tail)
  dest.end()
}

module.exports = exportToNamArray
