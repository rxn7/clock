// TODO: Render hours on the face

import Hand from './hand.js'
import { deg2rad, getHourAngle, getMinuteAngle, getSecondAngle, PI2 } from './helpers/mathHelper.js'

const CLOCK_CIRCLE_THICKNESS: number = 1
const CLOCK_DOT_RADIUS_MULTIPLIER: number = 0.01
const CLOCK_MARGIN_PX: number = 10 + CLOCK_CIRCLE_THICKNESS
const SCALE_BASE: number = 100

export default class Clock {
	private hourHand: Hand = new Hand(this, SCALE_BASE * 0.2, 1.5, '#f00')
	private minuteHand: Hand = new Hand(this, SCALE_BASE * 0.35, 1, '#0f0')
	private secondHand: Hand = new Hand(this, SCALE_BASE * 0.4, 0.8, '#00f')
	private radius: number = 0
	private scale: number = 1
	private ctx: CanvasRenderingContext2D

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx
		this.update()
		setInterval(this.update.bind(this), 1000)
	}

	public getScale = (): number => this.scale
	public getRadius = (): number => this.radius

	public handleResize(): void {
		const widthGreaterThanHeight: boolean = this.ctx.canvas.width > this.ctx.canvas.height
		const smallerValue: number = widthGreaterThanHeight ? this.ctx.canvas.height : this.ctx.canvas.width

		this.scale = smallerValue / SCALE_BASE
		this.radius = smallerValue * 0.5 - CLOCK_MARGIN_PX
	}

	public update(): void {
		const now: Date = new Date()
		this.hourHand.angle = getHourAngle(now)
		this.minuteHand.angle = getMinuteAngle(now)
		this.secondHand.angle = getSecondAngle(now)
	}

	public render(): void {
		this.renderFace()
		this.renderHours()
		this.hourHand.render(this.ctx)
		this.minuteHand.render(this.ctx)
		this.secondHand.render(this.ctx)
		this.renderDot()
	}

	private renderFace(): void {
		this.ctx.beginPath()
		this.ctx.strokeStyle = '#fff'
		this.ctx.lineWidth = CLOCK_CIRCLE_THICKNESS * this.scale
		this.ctx.arc(this.ctx.canvas.width * 0.5, this.ctx.canvas.height * 0.5, this.radius, 0, 2 * Math.PI)
		this.ctx.stroke()
		this.ctx.fillStyle = '#282828'
		this.ctx.fill()
	}

	private renderDot(): void {
		this.ctx.beginPath()
		this.ctx.fillStyle = '#fff'
		this.ctx.arc(this.ctx.canvas.width * 0.5, this.ctx.canvas.height * 0.5, this.radius * CLOCK_DOT_RADIUS_MULTIPLIER, 0, 2 * Math.PI)
		this.ctx.fill()
	}

	private renderHours(): void {
		const fontSize: number = 120
		this.ctx.font = `${fontSize}px monospace`
		this.ctx.fillStyle = '#fff'
		const centerX: number = this.ctx.canvas.width * 0.5
		const centerY: number = this.ctx.canvas.height * 0.5
		for (let i: number = 1; i <= 12; ++i) {
			const ratio: number = i / 12
			const text: string = ((i + 3) % 12 || 12).toString()
			const metrics: TextMetrics = this.ctx.measureText(text)
			const x: number = Math.cos(ratio * PI2) * (this.radius - metrics.width * 0.5)
			const y: number = Math.sin(ratio * PI2) * (this.radius - fontSize * 0.5)

			this.ctx.textAlign = 'center'
			this.ctx.textBaseline = 'middle'
			this.ctx.fillText(text, centerX + x, centerY + y)
		}
	}
}