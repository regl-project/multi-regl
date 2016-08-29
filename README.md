# multi-regl
Lets you use a single [regl](http://regl.party) context to render to multiple windows within a single page.

## Example

```javascript
const multiREGL = require('multi-regl')

const div1 = document.createElement('div')
div1.style.width = '500px'
div1.style.height = '500px'
document.body.appendChild(div1)

const regl1 = multiREGL(div1)

regl1.frame(() => {
  regl1.clear({
    color: [1, 0, 0, 1],
    depth: 1
  })
})

const div2 = document.createElement('div')
div2.style.width = '500px'
div2.style.height = '500px'
document.body.appendChild(div2)

const regl2 = multiREGL(div2)

regl2.frame(() => {
  regl2.clear({
    color: [0, 0, 1, 1],
    depth: 1
  })
})
```

## API

### Constructor

#### `var multiREGL = require('multi-regl')([options])`
Creates a multiplexed regl context across several div elements.  `options` takes the same inputs as `regl`'s constructor.  

### Properties

#### `multiREGL.regl`

### Methods

#### `multiREGL(options)`

## How this works
`multi-regl` creates a full screen canvas over the window which is fixed to the screen resolution.

## License
(c) 2016 Mikola Lysenko. MIT License
