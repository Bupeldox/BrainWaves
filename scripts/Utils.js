
export const clamp = (min, v, max) => Math.max(min, Math.min(max, v));

export function lerp(c, b, a) {
    var v = a * b + c * (1 - b);
    if (!isFinite(v)) {
        return c;
    }
    return v;
}
