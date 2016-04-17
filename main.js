'use strict'

const tmx = require('tmx-parser')

const exportToCollisionArray = require('./lib/exportToCollisionArray')
const exportToNamArray = require('./lib/exportToNamArray')
const rightMapSize = require('./lib/rightMapSize')

const main = function (tmxfile, collisionFilename, namFilename) {
  tmx.parseFile(tmxfile, function (err, tmxmap) {
    if (err) {
      throw err
    }

    let firstLayer = tmxmap.layers[0]
    if (rightMapSize(firstLayer)) {
      collisionFilename = collisionFilename || tmxfile.split('.tmx')[0] + '_collision.h'
      namFilename = namFilename || tmxfile.split('.tmx')[0] + '_nametable.h'
      // exportToCollisionArray(firstLayer, collisionFilename)
      exportToNamArray(firstLayer, namFilename)
    } else {
      throw new Error('Map is not the right size for the nes')
    }
  })
}

module.exports = main
