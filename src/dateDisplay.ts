import Clock from './clock.js'

const FONT_SIZE_UNSCALED: number = 3

export default class DateDisplay {
	private clock: Clock
	private ctx: CanvasRenderingContext2D
	private width: number = 20
	private height: number = 20
	private originX: number = 0
	private originY: number = 0
	private fontSize: number = 0
	private textPositionX: number = 0
	private textPositionY: number = 0
	private text: string = ''

	constructor(clock: Clock) {
		this.clock = clock
		this.ctx = clock.ctx
	}

	public handleResize(): void {
		this.width = this.clock.getScale() * 20
		this.height = this.clock.getScale() * 5

		this.originX = (this.ctx.canvas.width - this.width) * 0.5
		this.originY = (this.ctx.canvas.height - this.height) * 0.5 + this.clock.getRadius() * 0.6

		this.fontSize = FONT_SIZE_UNSCALED * this.clock.getScale()

		this.update()
	}

	public update(): void {
		this.updateText()
	}

	public render(): void {
		this.ctx.fillStyle = '#000'
		this.ctx.fillRect(this.originX, this.originY, this.width, this.height)

		this.ctx.font = `${this.fontSize}px monospace`
		this.ctx.fillStyle = '#fff'
		this.ctx.textAlign = 'left'
		this.ctx.textBaseline = 'top'
		this.ctx.fillText(this.text, this.textPositionX, this.textPositionY)
	}

	private updateText(): void {
		const isoDate: string = new Date().toISOString()
		this.text = isoDate.substring(0, isoDate.indexOf('T'))

		this.ctx.font = `${this.fontSize}px monospace`
		const metrics: TextMetrics = this.ctx.measureText(this.text)

		this.textPositionX = this.originX + (this.width - metrics.width) * 0.5
		this.textPositionY = this.originY + (this.height - this.fontSize) * 0.5
	}
}
