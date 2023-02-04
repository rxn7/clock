import Clock from './clock.js'

const canvas: HTMLCanvasElement = document.getElementById('clock-canvas') as HTMLCanvasElement
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
const clock: Clock = new Clock(ctx)
const clearColor: string = getComputedStyle(document.body).getPropertyValue('--background-color')

function init(): void {
	document.body.append(canvas)
	handleResize()
	requestAnimationFrame(animationFrame)
}

function animationFrame(time: DOMHighResTimeStamp): void {
	requestAnimationFrame(animationFrame)

	ctx.fillStyle = clearColor
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	clock.render()
}

function handleResize(): void {
	const smallerSizeValue: number = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth

	canvas.width = smallerSizeValue
	canvas.height = smallerSizeValue

	canvas.style.width = `${smallerSizeValue}px`
	canvas.style.height = `${smallerSizeValue}px`

	clock.handleResize()
}

window.addEventListener('resize', ev => {
	handleResize()
})

init()
