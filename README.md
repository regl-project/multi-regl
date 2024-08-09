# multi-regl
Lets you use a single [regl](https://regl-project.github.io) context to render to multiple windows within a single page.

[Demo](https://regl-project.github.io/multi-regl/index.html).

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
Creates a multiplexed regl context across several div elements.  `options` takes the same inputs as `regl`'s constructor.  It returns a procedure

### Properties

#### `multiREGL.regl`
A reference to the underlying `regl` object.

### Methods

#### `var regl = multiREGL(containerElement)`
Calling `multiREGL` with a DOM element returns a wrapped `regl` instance where `regl.frame` is overloaded to draw within the element.

Calling `.destroy()` on this context removes the multiregl instance.

## How this works
`multi-regl` creates a full screen canvas over the window which is fixed to the screen resolution.  Each frame all the visible

## License
(c) 2016 Mikola Lysenko. MIT License
