import DateDisplay from './dateDisplay.js';
import Hand from './hand.js';
import { getHourAngle, getMinuteAngle, getSecondAngle, PI2 } from './helpers/mathHelper.js';
const CLOCK_BORDER_THICKNESS = 0.75;
const CLOCK_DOT_RADIUS_MULTIPLIER = 0.01;
const CLOCK_MARGIN_PX = 10 + CLOCK_BORDER_THICKNESS;
const SCALE_BASE = 100;
export default class Clock {
    constructor(ctx) {
        this.radius = 0;
        this.scale = 1;
        this.ctx = ctx;
        this.hourHand = new Hand(this, SCALE_BASE * 0.2, 1.5, '#000');
        this.minuteHand = new Hand(this, SCALE_BASE * 0.35, 1, '#000');
        this.secondHand = new Hand(this, SCALE_BASE * 0.4, 0.5, '#f00');
        this.dateDisplay = new DateDisplay(this);
        this.update();
        setInterval(this.update.bind(this), 1000);
    }
    getScale() {
        return this.scale;
    }
    getRadius() {
        return this.radius;
    }
    handleResize() {
        this.scale = this.ctx.canvas.width / SCALE_BASE;
        this.radius = this.ctx.canvas.width * 0.5 - CLOCK_MARGIN_PX;
        this.dateDisplay.handleResize();
        document.body.style.setProperty('--scale', `${this.scale}`);
    }
    update() {
        const now = new Date();
        this.setTime(now);
        this.dateDisplay.update();
    }
    setTime(date) {
        this.hourHand.angle = getHourAngle(date);
        this.minuteHand.angle = getMinuteAngle(date);
        this.secondHand.angle = getSecondAngle(date);
    }
    render() {
        this.renderFace();
        this.renderFaceDecorations();
        this.dateDisplay.render();
        this.hourHand.render();
        this.minuteHand.render();
        this.secondHand.render();
        this.renderDot();
    }
    renderFace() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = CLOCK_BORDER_THICKNESS * this.scale;
        this.ctx.arc(this.ctx.canvas.width * 0.5, this.ctx.canvas.height * 0.5, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.fillStyle = '#fff';
        this.ctx.fill();
    }
    renderDot() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#000';
        this.ctx.arc(this.ctx.canvas.width * 0.5, this.ctx.canvas.height * 0.5, this.radius * CLOCK_DOT_RADIUS_MULTIPLIER, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    renderFaceDecorations() {
        const centerX = this.ctx.canvas.width * 0.5;
        const centerY = this.ctx.canvas.height * 0.5;
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 0.5 * this.scale;
        for (let hour = 1; hour <= 12; ++hour) {
            const ratio = hour / 12;
            const dirX = Math.cos(ratio * PI2);
            const dirY = Math.sin(ratio * PI2);
            this.renderHourLine(centerX, centerY, dirX, dirY);
            this.renderMinutesLines(hour, centerX, centerY);
            this.renderHourNumberText(hour, centerX, centerY, dirX, dirY);
        }
    }
    renderHourLine(centerX, centerY, dirX, dirY) {
        this.ctx.beginPath();
        this.ctx.moveTo(centerX + dirX * (this.radius * 0.9), centerY + dirY * (this.radius * 0.9));
        this.ctx.lineTo(centerX + dirX * this.radius, centerY + dirY * this.radius);
        this.ctx.stroke();
    }
    renderMinutesLines(hour, centerX, centerY) {
        for (let i = 1; i < 5; ++i) {
            const minuteRatio = (hour * 5 + i) / 60;
            const minuteDirX = Math.cos(minuteRatio * PI2);
            const minuteDirY = Math.sin(minuteRatio * PI2);
            this.ctx.beginPath();
            this.ctx.moveTo(centerX + minuteDirX * (this.radius * 0.95), centerY + minuteDirY * (this.radius * 0.95));
            this.ctx.lineTo(centerX + minuteDirX * this.radius, centerY + minuteDirY * this.radius);
            this.ctx.stroke();
        }
    }
    renderHourNumberText(hour, centerX, centerY, dirX, dirY) {
        const fontSize = 10 * this.scale;
        const text = ((hour + 3) % 12 || 12).toString();
        const metrics = this.ctx.measureText(text);
        const textX = dirX * (this.radius - metrics.width * 0.5) * 0.9;
        const textY = dirY * (this.radius - fontSize * 0.5) * 0.9;
        this.ctx.beginPath();
        this.ctx.font = `${fontSize}px monospace`;
        this.ctx.fillStyle = '#000';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, centerX + textX, centerY + textY);
    }
}
