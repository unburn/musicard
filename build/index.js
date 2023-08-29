const { Canvas } = require('canvas-constructor/napi-rs');
const canvas = require("@napi-rs/canvas");
const devmod = false;
canvas.GlobalFonts.registerFromPath(`${devmod ? "" : "node_modules/musicard/"}res/momcakebold.ttf`, 'momcakebold');
const { getColorFromURL } = require('color-thief-node');

const UserAgent = require("user-agents");
const userAgent = new UserAgent();

class musicCard {
    constructor() {
        this.name = null;
        this.author = null;
        this.color = null;
        this.brightness = null;
        this.thumbnail = null;
        this.progress = null;
        this.starttime = null;
        this.endtime = null;
        this.output = null;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setAuthor(author) {
        this.author = author;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    setBrightness(brightness) {
        this.brightness = brightness;
        return this;
    }

    setThumbnail(thumbnail) {
        this.thumbnail = thumbnail;
        return this;
    }

    setProgress(progress) {
        this.progress = progress;
        return this;
    }

    setStartTime(starttime) {
        this.starttime = starttime;
        return this;
    }

    setEndTime(endtime) {
        this.endtime = endtime;
        return this;
    }

    setOutput(output) {
        this.output = output || 'png';
        return this;
    }

    async rgbToHex(r, g, b) {
        const toHex = (value) => {
            const hex = value.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        const hexR = toHex(r);
        const hexG = toHex(g);
        const hexB = toHex(b);

        return `#${hexR}${hexG}${hexB}`;
    }

    async adjustBrightness(r, g, b, adjustment) {
        const adjustedR = Math.max(0, Math.min(255, r + adjustment));
        const adjustedG = Math.max(0, Math.min(255, g + adjustment));
        const adjustedB = Math.max(0, Math.min(255, b + adjustment));

        return [adjustedR, adjustedG, adjustedB];
    }

    async build() {
        if (!this.name) { throw new Error('Missing name parameter'); }
        if (!this.author) { throw new Error('Missing author parameter'); }

        let validatedProgress = parseFloat(this.progress);
        if (Number.isNaN(validatedProgress) || validatedProgress < 0 || validatedProgress > 100) {
            throw new Error('Invalid progress parameter, must be between 0 to 100');
        }

        if (validatedProgress < 2) {
            validatedProgress = 2;
        }

        const thumbnailURL = this.thumbnail || `${devmod ? "" : "node_modules/musicard/"}res/noimage.jpg`;
        const validatedStartTime = this.starttime || '0:00';
        const validatedEndTime = this.endtime || '0:00';
        const validatedBrightness = parseInt(this.brightness) || 0;

        let validatedColor = this.color || 'ff0000';

        if (validatedColor === 'auto') {
            const dominantColor = await getColorFromURL(thumbnailURL);

            const red = dominantColor[0];
            const green = dominantColor[1];
            const blue = dominantColor[2];

            const adjustedPalette = await this.adjustBrightness(red, green, blue, validatedBrightness);
            const hexColor = await this.rgbToHex(...adjustedPalette);

            validatedColor = hexColor.replace('#', '');
        }

        const progressBarWidth = (validatedProgress / 100) * 670;
        const circleX = progressBarWidth + 60;

        const progressBarCanvas = canvas.createCanvas(670, 25);
        const progressBarCtx = progressBarCanvas.getContext('2d');
        const cornerRadius = 10;
        progressBarCtx.beginPath();
        progressBarCtx.moveTo(cornerRadius, 0);
        progressBarCtx.lineTo(670 - cornerRadius, 0);
        progressBarCtx.arc(670 - cornerRadius, cornerRadius, cornerRadius, 1.5 * Math.PI, 2 * Math.PI);
        progressBarCtx.lineTo(670, 25 - cornerRadius);
        progressBarCtx.arc(670 - cornerRadius, 25 - cornerRadius, cornerRadius, 0, 0.5 * Math.PI);
        progressBarCtx.lineTo(cornerRadius, 25);
        progressBarCtx.arc(cornerRadius, 25 - cornerRadius, cornerRadius, 0.5 * Math.PI, Math.PI);
        progressBarCtx.lineTo(0, cornerRadius);
        progressBarCtx.arc(cornerRadius, cornerRadius, cornerRadius, Math.PI, 1.5 * Math.PI);
        progressBarCtx.closePath();
        progressBarCtx.fillStyle = '#ababab';
        progressBarCtx.fill();
        progressBarCtx.beginPath();
        progressBarCtx.moveTo(cornerRadius, 0);
        progressBarCtx.lineTo(progressBarWidth - cornerRadius, 0);
        progressBarCtx.arc(
            progressBarWidth - cornerRadius,
            cornerRadius,
            cornerRadius,
            1.5 * Math.PI,
            2 * Math.PI,
        );
        progressBarCtx.lineTo(progressBarWidth, 25);
        progressBarCtx.lineTo(cornerRadius, 25);
        progressBarCtx.arc(cornerRadius, 25 - cornerRadius, cornerRadius, 0.5 * Math.PI, Math.PI);
        progressBarCtx.lineTo(0, cornerRadius);
        progressBarCtx.arc(cornerRadius, cornerRadius, cornerRadius, Math.PI, 1.5 * Math.PI);
        progressBarCtx.closePath();
        progressBarCtx.fillStyle = `#${validatedColor}`;
        progressBarCtx.fill();

        const circleCanvas = canvas.createCanvas(1000, 1000);
        const circleCtx = circleCanvas.getContext('2d');

        const circleRadius = 20;
        const circleY = 97;

        circleCtx.beginPath();
        circleCtx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
        circleCtx.fillStyle = `#${validatedColor}`;
        circleCtx.fill();

        const img = await canvas.loadImage(`${devmod ? "" : "node_modules/musicard/"}res/background.png`);

        const thumbnailCanvas = canvas.createCanvas(564, 564);
        const thumbnailCtx = thumbnailCanvas.getContext('2d');

        let thumbnailImage;

        try {
            thumbnailImage = await canvas.loadImage(thumbnailURL, {
                requestOptions: {
                    headers: {
                        'User-Agent': userAgent.toString()
                    }
                }
            });
        } catch (error) {
            console.error(error);
            thumbnailImage = await canvas.loadImage(`${devmod ? "" : "node_modules/musicard/"}res/noimage.jpg`);
        }

        const thumbnailSize = Math.min(thumbnailImage.width, thumbnailImage.height);
        const thumbnailX = (thumbnailImage.width - thumbnailSize) / 2;
        const thumbnailY = (thumbnailImage.height - thumbnailSize) / 2;

        thumbnailCtx.beginPath();
        const cornerRadius2 = 45;
        thumbnailCtx.moveTo(0 + cornerRadius2, 0);
        thumbnailCtx.arcTo(
            thumbnailCanvas.width,
            0,
            thumbnailCanvas.width,
            thumbnailCanvas.height,
            cornerRadius2,
        );
        thumbnailCtx.arcTo(
            thumbnailCanvas.width,
            thumbnailCanvas.height,
            0,
            thumbnailCanvas.height,
            cornerRadius2,
        );
        thumbnailCtx.arcTo(
            0,
            thumbnailCanvas.height,
            0,
            0,
            cornerRadius2,
        );
        thumbnailCtx.arcTo(
            0,
            0,
            thumbnailCanvas.width,
            0,
            cornerRadius2,
        );
        thumbnailCtx.closePath();
        thumbnailCtx.clip();

        thumbnailCtx.drawImage(
            thumbnailImage,
            thumbnailX,
            thumbnailY,
            thumbnailSize,
            thumbnailSize,
            0,
            0,
            thumbnailCanvas.width,
            thumbnailCanvas.height,
        );

        if (this.name.length > 15) this.name = `${this.name.slice(0, 15)}...`;
        if (this.author.length > 15) this.author = `${this.author.slice(0, 15)}...`;

        const image = new Canvas(1280, 450)
            .setColor(`#${validatedColor}`)
            .printImage(img, 0, 0, 1280, 450)
            .setTextFont('80px momcakebold')
            .printText(`${this.name}`, 70, 120)

            .setColor('#fff')
            .setTextFont('60px momcakebold')
            .printText(`${this.author}`, 70, 180)

            .setColor('#fff')
            .setTextFont('35px momcakebold')
            .printText(`${validatedStartTime}`, 70, 410)

            .setColor('#fff')
            .setTextFont('35px momcakebold')
            .printText(`${validatedEndTime}`, 675, 410)

            .printImage(thumbnailCanvas, 837, 8, 435, 435)

            .printImage(progressBarCanvas, 70, 340, 670, 25)
            .printImage(circleCanvas, 10, 255, 1000, 1000)

        if (this.output === 'webp') return image.webp();
        else if (this.output === 'png') return image.png();
        else if (this.output === 'jpg') return image.jpeg();


        return image;
    }
}

module.exports = { musicCard };