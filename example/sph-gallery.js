const multiREGL = require('../multi')()
const sphere = require('sphere-mesh')(30, 1)
const perspective = require('gl-mat4/perspective')
const lookAt = require('gl-mat4/lookAt')
const regl = multiREGL.regl

const view = new Float32Array(16)
const projection = new Float32Array(16)

const drawSPH = regl({
  vert: `
  precision highp float;
  attribute vec3 position;
  uniform mat4 view, projection;
  uniform vec3 color, degree, direction;
  varying vec3 fragColor;

  float sph () {
    vec3 s = position * degree;
    float theta = length(s);
    return 1.0 + cos(theta) * dot(s, normalize(direction));
  }

  void main () {
    fragColor = color + position;
    gl_Position = projection * view * vec4(sph() * position, 1);
  }
  `,

  frag: `
  precision highp float;
  varying vec3 fragColor;
  void main () {
    float lo = min(fragColor.x, min(fragColor.y, fragColor.z));
    float hi = max(fragColor.x, max(fragColor.y, fragColor.z));
    gl_FragColor = vec4((fragColor - lo) / (hi - lo), 1);
  }
  `,

  uniforms: {
    projection: ({viewportWidth, viewportHeight}) =>
      perspective(projection,
        Math.PI / 4.0,
        viewportWidth / viewportHeight,
        0.1,
        1000.0),
    view: ({tick}) => {
      const t = 0.01 * tick
      return lookAt(view,
        [20.0 * Math.cos(t), 0, 20.0 * Math.sin(t)],
        [0, 0, 0],
        [0, 1, 0])
    },
    direction: regl.prop('direction'),
    degree: regl.prop('degree'),
    color: regl.prop('color')
  },

  attributes: {
    position: sphere.positions
  },

  elements: sphere.cells
})

const colors = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
  [1, 1, 0],
  [1, 0, 1],
  [0, 1, 1],
  [0, 0, 0]
]

const degrees = [
  [1, 1, 1],
  [3, 4, 5],
  [8, 9, 1],
  [2, 3, 0],
  [8, 8, 1],
  [10, 20, 30],
  [2, -1, 3]
]

const directions = [
  [1, 0, 0],
  [1, 3, 2],
  [2, 2, 9],
  [0, 8, 1],
  [1, -1, 3],
  [9, -2, 1],
  [0, 0, 1]
]

colors.forEach((color, i) => {
  const div = document.createElement('div')
  div.style.width = '500px'
  div.style.height = '500px'
  div.style.margin = '100px'
  document.body.appendChild(div)

  const regl = multiREGL(div)

  regl.frame(() => {
    regl.clear({
      color: [0, 0, 0, 1],
      depth: 1
    })

    drawSPH({
      color,
      degree: degrees[i],
      direction: directions[i]
    })
  })
})
