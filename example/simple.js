const multiREGL = require('../multi')()

const colors = [
  [1, 0, 0, 1],
  [0, 1, 0, 1],
  [0, 0, 1, 1],
  [1, 1, 0, 1],
  [1, 0, 1, 1],
  [0, 1, 1, 1],
  [0, 0, 0, 1]
]

colors.forEach((color, i) => {
  const div = document.createElement('div')
  div.style.width = '500px'
  div.style.height = '500px'
  div.style.background = '#ff' + (i % 2 ? '8000' : '0080')
  div.style.margin = '100px'
  document.body.appendChild(div)

  const regl = multiREGL(div)

  regl.frame(() => {
    regl.clear({
      color
    })
  })
})
