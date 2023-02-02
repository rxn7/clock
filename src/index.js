import Clock from './clock.js';
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const clock = new Clock(ctx);
function init() {
    document.body.append(canvas);
    handleResize();
    requestAnimationFrame(animationFrame);
}
function animationFrame(time) {
    requestAnimationFrame(animationFrame);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    clock.render();
}
function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    clock.handleResize();
}
window.addEventListener('resize', ev => {
    handleResize();
});
init();
