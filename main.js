'use strict'

const tmx = require('tmx-parser')

const exportToNamArray = require('./lib/exportToNamArray')
const rightMapSize = require('./lib/rightMapSize')

const main = function (tmxfile, namFilename) {
  tmx.parseFile(tmxfile, function (err, tmxmap) {
    if (err) {
      throw err
    }

    let firstLayer = tmxmap.layers[0]
    if (rightMapSize(firstLayer)) {
      namFilename = namFilename || tmxfile.split('.tmx')[0] + '_nametable.h'
      exportToNamArray(firstLayer, namFilename)
    } else {
      throw new Error('Map is not the right size for the nes')
    }
  })
}

module.exports = main
