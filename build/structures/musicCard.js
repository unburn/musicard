const devmod = false;

const canvas = require("@napi-rs/canvas");
const { colorFetch } = require("../functions/colorFetch");

// Register fonts
canvas.GlobalFonts.registerFromPath(`${devmod ? "" : "node_modules/musicard/"}res/fonts/circularstd-black.otf`, "circular-std");
canvas.GlobalFonts.registerFromPath(`${devmod ? "" : "node_modules/musicard/"}res/fonts/notosans-jp-black.ttf`, "noto-sans-jp");
canvas.GlobalFonts.registerFromPath(`${devmod ? "" : "node_modules/musicard/"}res/fonts/notosans-black.ttf`, "noto-sans");
canvas.GlobalFonts.registerFromPath(`${devmod ? "" : "node_modules/musicard/"}res/fonts/notoemoji-bold.ttf`, "noto-emoji");
canvas.GlobalFonts.registerFromPath(`${devmod ? "" : "node_modules/musicard/"}res/fonts/notosans-kr-black.ttf`, "noto-sans-kr");

// Create music card class
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

        let thumbnailURL = this.thumbnail || `${devmod ? "" : "node_modules/musicard/"}res/noimage.jpg`;

        const validatedStartTime = this.starttime || '0:00';
        const validatedEndTime = this.endtime || '0:00';

        const validatedColor = await colorFetch(
            this.color || 'ff0000',
            parseInt(this.brightness) || 0,
            thumbnailURL
        );

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

        thumbnailImage = await canvas.loadImage(thumbnailURL, {
            requestOptions: {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)',
                }
            }
        })

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

        const image = canvas.createCanvas(1280, 450);
        const ctx = image.getContext('2d');

        ctx.drawImage(img, 0, 0, 1280, 450);

        ctx.fillStyle = `#${validatedColor}`;
        ctx.font = `75px circular-std, noto-emoji, noto-sans-jp, noto-sans, noto-sans-kr`;
        ctx.fillText(this.name, 70, 120);

        ctx.fillStyle = '#b8b8b8';
        ctx.font = `50px circular-std, noto-emoji, noto-sans-jp, noto-sans, noto-sans-kr`;
        ctx.fillText(this.author, 75, 190);

        ctx.fillStyle = '#fff';
        ctx.font = '30px circular-std';
        ctx.fillText(validatedStartTime, 70, 410);

        ctx.fillStyle = '#fff';
        ctx.font = '30px circular-std';
        ctx.fillText(validatedEndTime, 680, 410);

        ctx.drawImage(thumbnailCanvas, 837, 8, 435, 435);

        ctx.drawImage(progressBarCanvas, 70, 340, 670, 25);

        ctx.drawImage(circleCanvas, 10, 255, 1000, 1000);

        return image.toBuffer('image/png');
    }
}

module.exports = { musicCard };