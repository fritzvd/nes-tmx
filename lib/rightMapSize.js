const ARRAY_SIZE = 64 * 60

const rightMapSize = function (tmxmap) {
  return tmxmap.tiles.length % ARRAY_SIZE === 0
}

module.exports = rightMapSize
