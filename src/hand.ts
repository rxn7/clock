import Clock from './clock.js'
import { deg2rad } from './helpers/mathHelper.js'

export default class Hand {
	private ctx: CanvasRenderingContext2D
	public length: number
	public width: number
	public color: string
	public angle: number = 0
	private clock: Clock

	constructor(clock: Clock, length: number = 10, width: number = 2, color: string = '#fff') {
		this.ctx = clock.ctx
		this.length = length
		this.width = width
		this.color = color
		this.clock = clock
	}

	public render(): void {
		const centerX: number = this.ctx.canvas.width * 0.5
		const centerY: number = this.ctx.canvas.height * 0.5
		const width: number = this.width * this.clock.getScale()
		const length: number = this.length * this.clock.getScale()
		const angle: number = this.angle - deg2rad(90)
		this.ctx.beginPath()
		this.ctx.strokeStyle = this.color
		this.ctx.lineWidth = width
		this.ctx.moveTo(centerX, centerY)
		this.ctx.lineTo(centerX + Math.cos(angle) * length, centerY + Math.sin(angle) * length)
		this.ctx.stroke()
	}
}
