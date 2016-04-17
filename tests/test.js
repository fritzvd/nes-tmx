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
