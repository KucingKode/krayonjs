import RawKrayon from './RawKrayon'

export type style = string | CanvasGradient | CanvasPattern
export type angleUnit = 'degree' | 'radian'
export type coordinateOrigin = 'top-left' | 'top-right' | 'center' | 'bottom-left' | 'bottom-right'

export class Krayon extends RawKrayon {
  protected _fill_rule: CanvasFillRule = 'nonzero'

  private _ANGLE_UNIT: angleUnit = 'radian'
  private _COORDINATE_ORIGIN: coordinateOrigin = 'top-left'

  constructor(container: HTMLElement) {
    super(container)
  }

  private convertAngle(angle: number) {
    return this.ANGLE_UNIT === 'degree' ? angle * Math.PI / 180 : angle
  }

  private applyTransform() {
    if (this.COORDINATE_ORIGIN === 'center') {
      this.ctx.translate(this.width / 2, this.height / 2)
      this.flipY()
    }
    
    if (this.COORDINATE_ORIGIN.startsWith('bottom')) {
      this.ctx.translate(0, this.height)
      this.flipY()
    }
    
    if (this.COORDINATE_ORIGIN.endsWith('right')) {
      this.translate(this.width, 0)
      this.flipX()
    }
  }

  bg(style: style) { 
    const fillStyle = this.ctx.fillStyle
    this.ctx.fillStyle = style
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.fillStyle = fillStyle
    return this
  }

  clear() {
    this.clearRect(0, 0, this.width, this.height)
    return this
  }

  // styling
  fillStyle(style: style, fillRule?: CanvasFillRule) {
    this.ctx.fillStyle = style
    this._fill_rule = fillRule || 'nonzero'
    return this
  }

  noFill() {
    this.ctx.fillStyle = '#00000000'
    return this
  }

  fill() {
    this.ctx.fill(this._fill_rule)
    return this
  }

  strokeStyle(style: style, width: number) {
    this.ctx.strokeStyle = style
    this.ctx.lineWidth = width
    return this
  }

  noStroke() {
    this.ctx.strokeStyle = '#00000000'
    return this
  }

  stroke() {
    this.ctx.stroke()
    return this
  }

  lineCap(lineCap: CanvasLineCap) {
    this.ctx.lineCap = lineCap
    return this
  }

  lineDashOffset(lineDashOffset: number) {
    this.ctx.lineDashOffset = lineDashOffset
    return this
  }

  lineJoin(lineJoin: CanvasLineJoin) {
    this.ctx.lineJoin = lineJoin
    return this
  }

  miterLimit(miterLimit: number) {
    this.ctx.miterLimit = miterLimit
    return this
  }

  shadow(color: string, blur: number, offsetX: number, offsetY: number) {
    this.ctx.shadowColor = color
    this.ctx.shadowBlur = blur
    this.ctx.shadowOffsetX = offsetX
    this.ctx.shadowOffsetY = offsetY
    return this
  }

  font(fontFamily: string, fontSize: number, fontWeight: string | number = 'normal', fontStyle: 'normal' | 'italic' | 'oblique' = 'normal') {
    this.ctx.font = `${fontStyle} normal ${fontWeight} ${fontSize} ${fontFamily}`
    return this
  }

  textAlign(textAlign: CanvasTextAlign) {
    this.ctx.textAlign = textAlign
    return this
  }

  textBaseline(textBaseline: CanvasTextBaseline) {
    this.ctx.textBaseline = textBaseline
    return this
  }

  // path
  begin() {
    this.ctx.beginPath()
    return this
  }

  close() {
    this.ctx.closePath()
    return this
  }

  isPointInPath(x: number, y: number, fillRule?: CanvasFillRule) {
    this.ctx.isPointInPath(x, y, fillRule)
    return this
  }

  isPointInStroke(x: number, y: number) {
    this.ctx.isPointInStroke(x, y)
    return this
  }

  clip(fillRule: CanvasFillRule) {
    this.ctx.clip(fillRule)
    return this
  }

  moveTo(x: number, y: number) {
    this.ctx.moveTo(x, y)
    return this
  }
  
  lineTo(x: number, y: number) {
    this.ctx.lineTo(x, y)
    return this
  }

  arcTo(x1: number, y1: number, x2: number, y2: number, r: number) {
    this.ctx.arcTo(x1, y1, x2, y2, r)
    return this
  }

  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) {
    this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
    return this
  }
  
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
    this.ctx.quadraticCurveTo(cpx, cpy, x, y)
    return this
  }

  // shapes
  shape(...points: [x: number, y: number][]) {
    for (let i = 0; i < points.length; i++) {
      const [x, y] = points[i]
      this.ctx.lineTo(x, y)
    }
    return this
  }

  arc(x: number, y: number, r: number, startAngle: number, endAngle: number, counterclockwise?: boolean) {
    startAngle = this.convertAngle(startAngle)
    endAngle = this.convertAngle(endAngle)
    this.ctx.arc(x, y, r, startAngle, endAngle, counterclockwise)
    return this
  }

  ellipse(x: number, y: number, rx: number, ry: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean) {
    startAngle = this.convertAngle(startAngle)
    endAngle = this.convertAngle(endAngle)
    rotation = this.convertAngle(rotation)
    this.ctx.ellipse(x, y, rx, ry, rotation, startAngle, endAngle, counterclockwise)
    return this
  }

  circle(x: number, y: number, r: number) {
    this.ctx.arc(x, y, r, 0, 2 * Math.PI)
    return this
  }

  rect(x: number, y: number, width: number, height: number) {
    this.ctx.rect(x, y, width, height)
    return this
  }

  line(x1: number, y1: number, x2: number, y2: number) {
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
    return this
  }

  text(text: string, x: number, y: number, maxWidth?: number) {
    this.ctx.fillText(text, x, y, maxWidth)
    this.ctx.strokeText(text, x, y, maxWidth)
    return this
  }

  // transform
  scale(x: number, y: number) {
    this.ctx.scale(x, y)
    return this
  }

  translate(x: number, y: number) {
    this.ctx.translate(x, y)
    return this
  }

  rotate(angle: number) {
    angle = this.convertAngle(angle)
    this.ctx.rotate(angle)
    return this
  }

  transform(a: number, b: number, c: number, d: number, e: number, f: number) {
    this.ctx.transform(a, b, c, d, e, f)
    return this
  }

  flipX() {
    this.COORDINATE_ORIGIN !== 'center' && this.ctx.translate(this.width, 0)
    this.ctx.scale(-1, 1)
    return this
  }

  flipY() {
    this.COORDINATE_ORIGIN !== 'center' && this.ctx.translate(0, this.height)
    this.ctx.scale(1, -1)
    return this
  }

  resetTransform() {
    this.ctx.resetTransform()
    this.applyTransform()
    return this
  }

  // other
  measureText(text: string) {
    return this.ctx.measureText(text)
  }

  clearRect(x: number, y: number, width: number, height: number) {
    this.ctx.clearRect(x, y, width, height)
    return this
  }

  createImageData(width: number, height: number, settings?: ImageDataSettings) {
    return this.ctx.createImageData(width, height, settings)
  }

  createLinearGradient(x1: number, y1: number, x2: number, y2: number) {
    return this.ctx.createLinearGradient(x1, y1, x2, y2)
  }

  createPattern(image: CanvasImageSource, repetition?: string) {
    return this.ctx.createPattern(image, repetition || null)
  }

  putImageData(imageData: ImageData, dx: number, dy: number, dirtyX: number, dirtyY: number, dirtyWidth: number, dirtyHeight: number) {
    this.ctx.putImageData(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)
    return this
  }

  getImageData(sx: number, sy: number, sw: number, sh: number, settings: ImageDataSettings) {
    return this.ctx.getImageData(sx, sy, sw, sh, settings)
  }

  restore() {
    this.ctx.restore()
    return this
  }

  save() {
    this.ctx.save()
    return this
  }

  // getter & setter
  get COORDINATE_ORIGIN() {
    return this._COORDINATE_ORIGIN
  }

  set COORDINATE_ORIGIN(coordinateOrigin: coordinateOrigin) {
    this._COORDINATE_ORIGIN = coordinateOrigin
    this.applyTransform()
  }

  get ANGLE_UNIT() {
    return this._ANGLE_UNIT
  }

  set ANGLE_UNIT(unit: angleUnit) {
    this._ANGLE_UNIT = unit
  }
}

export default Krayon
