# KrayonJS

Krayon.js is a **Javascript library to help you work with Canvas API**. Krayon.js wrap Canvas API into a simple class, Krayon, that is simpler and easier to understand.

## Features

- **Resizable with CSS**. Normal canvas 2D context will be stretched when you try to resize it with css, Krayon will update canvas 2D context size when its container size changes.

- **Changeable angle unit**. With Krayon, you can change the function parameter angle unit from radian to degree.

- **Changeable coordinate center point**. With Krayon, you can change the coordinate center point of the canvas 2d context to other than top-left, it can be center (like a normal cartesian coordinate), top-right, bottom-right, or bottom-left

## Example

```js
import { krayon } from './krayon.esm.js'

const container = document.querySelector('div')
const k = new krayon(container)

window.onload = () => {
  k.ANGLE_UNIT = 'degree'
  k.COORDINATE_ORIGIN = 'center'

  k
    .bg('black')

    // color, blur, offsetX, offsetY
    .shadow('green', 10, 0, 0)
    .fillStyle('red')
    .circle(0, 0, 20) // x, y, r
    .fill()
  
    .begin()
    .fillStyle('blue')
    .rect(100, 100, 20, 20) // w, y, w, h
    .fill()
}
```