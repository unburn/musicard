async function adjustBrightness(r, g, b, adjustment) {
    const adjustedR = Math.max(0, Math.min(255, r + adjustment));
    const adjustedG = Math.max(0, Math.min(255, g + adjustment));
    const adjustedB = Math.max(0, Math.min(255, b + adjustment));

    return [adjustedR, adjustedG, adjustedB];
}

module.exports = { adjustBrightness };