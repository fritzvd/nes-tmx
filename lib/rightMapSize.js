const ARRAY_SIZE = 16

// multiple of 16
const rightMapSize = function (tmxmap) {
  return tmxmap.tiles.length % ARRAY_SIZE === 0
}

module.exports = rightMapSize
