const { Canvas } = require('canvas-constructor/cairo');
const canvas = require('canvas');
canvas.registerFont('node_modules/musicard/res/momcakebold.ttf', { family: 'momcakebold' });

class musicCard {
    constructor() {
        this.name = null;
        this.author = null;
        this.color = null;
        this.thumbnail = null;
        this.progress = null;
        this.starttime = null;
        this.endtime = null;
        this.mode = null;
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

    setMode(mode) {
        this.mode = mode;
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

        const thumbnailURL = this.thumbnail || 'https://avatars.githubusercontent.com/u/84311327?v=4';
        const validatedColor = this.color || 'ff0000';
        const validatedStartTime = this.starttime || '0:00';
        const validatedEndTime = this.endtime || '0:00';
        const validatedMode = this.mode || 'play';

        if (validatedMode !== 'play' && validatedMode !== 'pause') throw new Error('Invalid mode parameter, must be play or pause');

        const progressBarWidth = (validatedProgress / 100) * 670;
        const circleX = progressBarWidth + 60;

        let modeimage = await canvas.loadImage('node_modules/musicard/res/blank.png');

        if (validatedMode === 'pause') {
            modeimage = await canvas.loadImage('node_modules/musicard/res/pause.png');
        }

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

        const img = await canvas.loadImage('node_modules/musicard/res/background.png');

        const thumbnailCanvas = canvas.createCanvas(564, 564);
        const thumbnailCtx = thumbnailCanvas.getContext('2d');

        let thumbnailImage;

        try {
            thumbnailImage = await canvas.loadImage(thumbnailURL);
        }
        catch (error) {
            thumbnailImage = await canvas.loadImage('https://avatars.githubusercontent.com/u/84311327?v=4');
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

            .printImage(modeimage, 0, 0, 1280, 450)

            .printImage(progressBarCanvas, 70, 340, 670, 25)
            .printImage(circleCanvas, 10, 255, 1000, 1000)

            .toBuffer();

        return image;
    }
}

module.exports = { musicCard };