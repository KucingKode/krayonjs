import { Krayon, angleUnit, coordinateOrigin, style } from './class/Krayon'
import RawKrayon from './class/RawKrayon'

export const radToDeg = (rad: number) => {
  return rad * 180 / Math.PI
}

export const degToRad = (deg: number) => {
  return deg * Math.PI / 180
}

export const loop = (f: () => void) => {
  let isStopped = false
  const draw = () => {
    if (isStopped) return
    f()
    requestAnimationFrame(draw)
  }

  requestAnimationFrame(draw)
  return () => {
    isStopped = true
  }
}

export {
  RawKrayon,
  Krayon,
  angleUnit,
  coordinateOrigin,
  style,
}
