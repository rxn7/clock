const FONT_SIZE_UNSCALED = 3;
export default class DateDisplay {
    constructor(clock) {
        this.width = 20;
        this.height = 20;
        this.originX = 0;
        this.originY = 0;
        this.fontSize = 0;
        this.textPositionX = 0;
        this.textPositionY = 0;
        this.text = '';
        this.clock = clock;
        this.ctx = clock.ctx;
    }
    handleResize() {
        this.width = this.clock.getScale() * 20;
        this.height = this.clock.getScale() * 5;
        this.originX = (this.ctx.canvas.width - this.width) * 0.5;
        this.originY = (this.ctx.canvas.height - this.height) * 0.5 + this.clock.getRadius() * 0.65;
        this.fontSize = FONT_SIZE_UNSCALED * this.clock.getScale();
        this.update();
    }
    update() {
        this.updateText();
    }
    render() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(this.originX, this.originY, this.width, this.height);
        this.ctx.font = `${this.fontSize}px monospace`;
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(this.text, this.textPositionX, this.textPositionY);
    }
    updateText() {
        const isoDate = new Date().toISOString();
        this.text = isoDate.substring(0, isoDate.indexOf('T'));
        this.ctx.font = `${this.fontSize}px monospace`;
        const metrics = this.ctx.measureText(this.text);
        this.textPositionX = this.originX + (this.width - metrics.width) * 0.5;
        this.textPositionY = this.originY + (this.height - this.fontSize) * 0.5;
    }
}
