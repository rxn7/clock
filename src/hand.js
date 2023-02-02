import { deg2rad } from './helpers/mathHelper.js';
export default class Hand {
    constructor(clock, length = 10, width = 2, color = '#fff') {
        this.angle = 0;
        this.length = length;
        this.width = width;
        this.color = color;
        this.clock = clock;
    }
    render(ctx) {
        const centerX = ctx.canvas.width * 0.5;
        const centerY = ctx.canvas.height * 0.5;
        const width = this.width * this.clock.getScale();
        const length = this.length * this.clock.getScale();
        const angle = this.angle - deg2rad(90);
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = width;
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * length, centerY + Math.sin(angle) * length);
        ctx.stroke();
    }
}
