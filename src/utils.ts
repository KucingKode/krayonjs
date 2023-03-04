export const getCanvas2dContext = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Failed to get canvas 2d rendering context')
  return ctx
}

export const getComputedSize = (el: Element) => {
  const { width, height } = getComputedStyle(el)
  return {
    width: +width.replace('px', ''),
    height: +height.replace('px', ''),
  }
}
