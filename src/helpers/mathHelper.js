export const PI2 = Math.PI * 2;
export function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
export function clamp(v, min, max) {
    if (v < min)
        v = min;
    else if (v > max)
        v = max;
    return v;
}
export function lerp(a, b, factor) {
    factor = clamp(factor, 0, 1);
    return (1 - factor) * a + factor * b;
}
export const getHourAngle = (date) => (((date.getHours() % 12) + date.getMinutes() / 60) / 12) * PI2;
export const getMinuteAngle = (date) => ((date.getMinutes() + date.getSeconds() / 60) / 60) * PI2;
export const getSecondAngle = (date) => (date.getSeconds() / 60) * PI2;
