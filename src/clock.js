import Hand from './hand.js';
import { getHourAngle, getMinuteAngle, getSecondAngle, PI2 } from './helpers/mathHelper.js';
const CLOCK_CIRCLE_THICKNESS = 1;
const CLOCK_DOT_RADIUS_MULTIPLIER = 0.01;
const CLOCK_MARGIN_PX = 10 + CLOCK_CIRCLE_THICKNESS;
const SCALE_BASE = 100;
export default class Clock {
    constructor(ctx) {
        this.hourHand = new Hand(this, SCALE_BASE * 0.2, 1.5, '#f00');
        this.minuteHand = new Hand(this, SCALE_BASE * 0.35, 1, '#0f0');
        this.secondHand = new Hand(this, SCALE_BASE * 0.4, 0.8, '#00f');
        this.radius = 0;
        this.scale = 1;
        this.getScale = () => this.scale;
        this.getRadius = () => this.radius;
        this.ctx = ctx;
        this.update();
        setInterval(this.update.bind(this), 1000);
    }
    handleResize() {
        const widthGreaterThanHeight = this.ctx.canvas.width > this.ctx.canvas.height;
        const smallerValue = widthGreaterThanHeight ? this.ctx.canvas.height : this.ctx.canvas.width;
        this.scale = smallerValue / SCALE_BASE;
        this.radius = smallerValue * 0.5 - CLOCK_MARGIN_PX;
    }
    update() {
        const now = new Date();
        this.hourHand.angle = getHourAngle(now);
        this.minuteHand.angle = getMinuteAngle(now);
        this.secondHand.angle = getSecondAngle(now);
    }
    render() {
        this.renderFace();
        this.renderHours();
        this.hourHand.render(this.ctx);
        this.minuteHand.render(this.ctx);
        this.secondHand.render(this.ctx);
        this.renderDot();
    }
    renderFace() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = CLOCK_CIRCLE_THICKNESS * this.scale;
        this.ctx.arc(this.ctx.canvas.width * 0.5, this.ctx.canvas.height * 0.5, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.fillStyle = '#282828';
        this.ctx.fill();
    }
    renderDot() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#fff';
        this.ctx.arc(this.ctx.canvas.width * 0.5, this.ctx.canvas.height * 0.5, this.radius * CLOCK_DOT_RADIUS_MULTIPLIER, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    renderHours() {
        const fontSize = 10 * this.scale;
        this.ctx.font = `${fontSize}px monospace`;
        this.ctx.fillStyle = '#fff';
        const centerX = this.ctx.canvas.width * 0.5;
        const centerY = this.ctx.canvas.height * 0.5;
        for (let i = 1; i <= 12; ++i) {
            const ratio = i / 12;
            const text = ((i + 3) % 12 || 12).toString();
            const metrics = this.ctx.measureText(text);
            const x = Math.cos(ratio * PI2) * (this.radius - metrics.width * 0.5);
            const y = Math.sin(ratio * PI2) * (this.radius - fontSize * 0.5);
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(text, centerX + x, centerY + y);
        }
    }
}
