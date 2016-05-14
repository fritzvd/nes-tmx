# nes-tmx
This is a tool to help create nametables and collision maps for NES games from
tilemaps produced with the [Tiled Map Editor](http://www.mapeditor.org/).

![NES-tmx](https://raw.githubusercontent.com/fritzvd/nes-tmx/master/nes-tmx.png)

The nametables and collision maps that this tool produces can be included
as header files in a c program. This also means that to use this, it is
assumed you program the NES with C.

There's an example tile map over [here](https://github.com/fritzvd/nes-tmx/tree/master/tests/data).

## usage
Install the package:
```bash
  npm install nes-tmx
```

And use it in your project like so:
```javascript
var nt = require('nes-tmx')
nt('yourtilemap.tmx', 'nametableoutput.h')
```

An example of how to use it can be found in [fritzvd/emesh](https://github.com/fritzvd/emesh)

# Shiru's C coding for the NES
This is based on Shiru's RLE and UNRLE function to create small nametables to program
the NES in C.
