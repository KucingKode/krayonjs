import { getCanvas2dContext, getComputedSize } from '../utils'

class RawKrayon {
  private _width: number
  private _height: number

  protected _container: HTMLElement
  protected _canvas: HTMLCanvasElement
  protected _ctx: CanvasRenderingContext2D

  constructor(container: HTMLElement) {
    this._container = container

    this._canvas = document.createElement('canvas')

    container.appendChild(this._canvas)

    this._ctx = getCanvas2dContext(this._canvas)
    const { width, height } = getComputedSize(container)
    this._width = width
    this._height = height
    
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      this._canvas.width = width
      this._canvas.height = height
      this._width = width
      this._height = height
      this._ctx = getCanvas2dContext(this._canvas)
    })

    resizeObserver.observe(container)
  }

  get ctx() {
    return this._ctx
  }

  get container() {
    return this._container
  }

  get width() {
    return this._width
  }

  get height() {
    return this._height
  }

  get GLOBAL_ALPHA() {
    return this.ctx.globalAlpha
  }

  set GLOBAL_ALPHA(x: number) {
    this.ctx.globalAlpha = x
  }

  get GLOBAL_COMPOSITE_OPERATION() {
    return this.ctx.globalCompositeOperation
  }

  set GLOBAL_COMPOSITE_OPERATION(x: string) {
    this.ctx.globalCompositeOperation = x
  }

  get IMAGE_SMOOTHING_ENABLED() {
    return this.ctx.imageSmoothingEnabled
  }

  set IMAGE_SMOOTHING_ENABLED(x: boolean) {
    this.ctx.imageSmoothingEnabled = x
  }

  get IMAGE_SMOOTHING_QUALITY() {
    return this.ctx.imageSmoothingQuality
  }

  set IMAGE_SMOOTHING_QUALITY(x: ImageSmoothingQuality) {
    this.ctx.imageSmoothingQuality = x
  }

}

export default RawKrayon
