import { deg2rad } from './helpers/mathHelper.js';
export default class Hand {
    constructor(clock, length = 10, width = 2, color = '#fff') {
        this.angle = 0;
        this.ctx = clock.ctx;
        this.length = length;
        this.width = width;
        this.color = color;
        this.clock = clock;
    }
    render() {
        const centerX = this.ctx.canvas.width * 0.5;
        const centerY = this.ctx.canvas.height * 0.5;
        const width = this.width * this.clock.getScale();
        const length = this.length * this.clock.getScale();
        const angle = this.angle - deg2rad(90);
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = width;
        this.ctx.moveTo(centerX, centerY);
        this.ctx.lineTo(centerX + Math.cos(angle) * length, centerY + Math.sin(angle) * length);
        this.ctx.stroke();
    }
}
