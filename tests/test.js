const rightMapSize = require('../lib/rightMapSize')

const tape = require('tape')

tape('should check the size of the tmxmap', function (t) {
  t.plan(2)

  const mockRightSize = {
    tiles: new Array(64 * 60)
  }
  t.equal(rightMapSize(mockRightSize), true)

  const mockWrongSize = {
    tiles: new Array(30 * 17)
  }
  t.equal(rightMapSize(mockWrongSize), false)
})

const rleEncoder = require('../lib/encode')

tape('should rle encode the array', function (t) {
  t.plan(1)
  const mockArray = [7, 7, 7, 0, 0, 0]
  var encoded = rleEncoder(mockArray)
  // 2 is correct because the counting starts at 0
  t.deepEqual(encoded, [1, 7, 1, 2, 0, 1, 2, 1, 0])
})
