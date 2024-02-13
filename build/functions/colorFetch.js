const { getColorFromURL } = require('color-thief-node');
const { rgbToHex } = require('./rgbToHex');
const { adjustBrightness } = require('./adjustBrightness');

async function colorFetch(color, brightness, thumbnail) {
    if (color === 'auto') {
        try {
            const dominantColor = await getColorFromURL(thumbnail);

            const red = dominantColor[0];
            const green = dominantColor[1];
            const blue = dominantColor[2];

            const adjustedPalette = await adjustBrightness(red, green, blue, brightness);
            const hexColor = await rgbToHex(...adjustedPalette);

            return hexColor.replace('#', '');
        } catch {
            return '03fc7f';
        }
    } else {
        return color.replace('#', '');
    }
}

module.exports = { colorFetch };