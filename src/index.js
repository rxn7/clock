import Clock from './clock.js';
const canvas = document.getElementById('clock-canvas');
const ctx = canvas.getContext('2d');
const clock = new Clock(ctx);
const clearColor = getComputedStyle(document.body).getPropertyValue('--background-color');
function init() {
    document.body.append(canvas);
    handleResize();
    requestAnimationFrame(animationFrame);
}
function animationFrame(time) {
    requestAnimationFrame(animationFrame);
    ctx.fillStyle = clearColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    clock.render();
}
function handleResize() {
    const smallerSizeValue = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
    canvas.width = smallerSizeValue;
    canvas.height = smallerSizeValue;
    canvas.style.width = `${smallerSizeValue}px`;
    canvas.style.height = `${smallerSizeValue}px`;
    clock.handleResize();
}
window.addEventListener('resize', ev => {
    handleResize();
});
init();
