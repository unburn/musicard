const canvas = require("@napi-rs/canvas");
const { colorFetch } = require("../functions/colorFetch");

// canvas.GlobalFonts.registerFromPath(`build/structures/font/circularstd-black.otf`, "circular-std");
// canvas.GlobalFonts.registerFromPath(`build/structures/font/notosans-jp-black.ttf`, "noto-sans-jp");
// canvas.GlobalFonts.registerFromPath(`build/structures/font/notosans-black.ttf`, "noto-sans");
// canvas.GlobalFonts.registerFromPath(`build/structures/font/notoemoji-bold.ttf`, "noto-emoji");
// canvas.GlobalFonts.registerFromPath(`build/structures/font/notosans-kr-black.ttf`, "noto-sans-kr");

canvas.GlobalFonts.registerFromPath(`node_modules/musicard/build/structures/font/circularstd-black.otf`, "circular-std");
canvas.GlobalFonts.registerFromPath(`node_modules/musicard/build/structures/font/notosans-jp-black.ttf`, "noto-sans-jp");
canvas.GlobalFonts.registerFromPath(`node_modules/musicard/build/structures/font/notosans-black.ttf`, "noto-sans");
canvas.GlobalFonts.registerFromPath(`node_modules/musicard/build/structures/font/notoemoji-bold.ttf`, "noto-emoji");
canvas.GlobalFonts.registerFromPath(`node_modules/musicard/build/structures/font/notosans-kr-black.ttf`, "noto-sans-kr");

class musicCard {
    constructor(options) {
        this.name = options?.name ?? null;
        this.author = options?.author ?? null;
        this.color = options?.color ?? null;
        this.theme = options?.theme ?? null;
        this.brightness = options?.brightness ?? null;
        this.thumbnail = options?.thumbnail ?? null;
        this.progress = options?.progress ?? null;
        this.starttime = options?.startTime ?? null;
        this.endtime = options?.endTime ?? null;
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

    setTheme(theme) {
        this.theme = theme || 'classic';
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
        if (!this.name) throw new Error('Missing name parameter');
        if (!this.author) throw new Error('Missing author parameter');
        if (!this.color) this.setColor('ff0000');
        if (!this.theme) this.setTheme('classic');
        if (!this.brightness) this.setBrightness(0);
        if (!this.thumbnail) this.setThumbnail('https://s6.imgcdn.dev/Opo4a.jpg');
        if (!this.progress) this.setProgress(0);
        if (!this.starttime) this.setStartTime('0:00');
        if (!this.endtime) this.setEndTime('0:00');

        let validatedProgress = parseFloat(this.progress);
        if (Number.isNaN(validatedProgress) || validatedProgress < 0 || validatedProgress > 100) throw new Error('Invalid progress parameter, must be between 0 to 100');

        if (validatedProgress < 2) validatedProgress = 2;
        if (validatedProgress > 99) validatedProgress = 99;

        const validatedStartTime = this.starttime || '0:00';
        const validatedEndTime = this.endtime || '0:00';

        const validatedColor = await colorFetch(
            this.color || 'ff0000',
            parseInt(this.brightness) || 0,
            this.thumbnail
        );

        if (this.name.length > 15) this.name = `${this.name.slice(0, 15)}...`;
        if (this.author.length > 15) this.author = `${this.author.slice(0, 15)}...`;

        if (this.theme == 'classic') {
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
            progressBarCtx.arc(progressBarWidth - cornerRadius, cornerRadius, cornerRadius, 1.5 * Math.PI, 2 * Math.PI);
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

            const background = await canvas.loadImage(`https://s6.imgcdn.dev/ZDjTD.png`);

            const thumbnailCanvas = canvas.createCanvas(564, 564);
            const thumbnailCtx = thumbnailCanvas.getContext('2d');

            let thumbnailImage;

            thumbnailImage = await canvas.loadImage(this.thumbnail, {
                requestOptions: {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
                    }
                }
            }).catch(() => {
                thumbnailImage = canvas.loadImage(`https://s6.imgcdn.dev/Opo4a.jpg`);
            })

            const thumbnailSize = Math.min(thumbnailImage.width, thumbnailImage.height);
            const thumbnailX = (thumbnailImage.width - thumbnailSize) / 2;
            const thumbnailY = (thumbnailImage.height - thumbnailSize) / 2;

            const cornerRadius2 = 45;

            thumbnailCtx.beginPath();
            thumbnailCtx.moveTo(0 + cornerRadius2, 0);
            thumbnailCtx.arcTo(thumbnailCanvas.width, 0, thumbnailCanvas.width, thumbnailCanvas.height, cornerRadius2);
            thumbnailCtx.arcTo(thumbnailCanvas.width, thumbnailCanvas.height, 0, thumbnailCanvas.height, cornerRadius2);
            thumbnailCtx.arcTo(0, thumbnailCanvas.height, 0, 0, cornerRadius2);
            thumbnailCtx.arcTo(0, 0, thumbnailCanvas.width, 0, cornerRadius2);
            thumbnailCtx.closePath();
            thumbnailCtx.clip();

            thumbnailCtx.drawImage(thumbnailImage, thumbnailX, thumbnailY, thumbnailSize, thumbnailSize, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);

            const image = canvas.createCanvas(1280, 450);
            const ctx = image.getContext('2d');

            ctx.drawImage(background, 0, 0, 1280, 450);

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
        } else if (this.theme == 'dynamic') {
            const frame = canvas.createCanvas(3264, 765);
            const ctx = frame.getContext("2d");

            const background = await canvas.loadImage("https://s6.imgcdn.dev/ZDDdt.png");
            ctx.drawImage(background, 0, 0, frame.width, frame.height);

            const thumbnailCanvas = canvas.createCanvas(650, 650);
            const thumbnailCtx = thumbnailCanvas.getContext('2d');

            let thumbnailImage;

            thumbnailImage = await canvas.loadImage(this.thumbnail, {
                requestOptions: {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
                    }
                }
            }).catch(() => {
                thumbnailImage = canvas.loadImage(`https://s6.imgcdn.dev/Opo4a.jpg`);
            })

            const thumbnailSize = Math.min(thumbnailImage.width, thumbnailImage.height);
            const thumbnailX = (thumbnailImage.width - thumbnailSize) / 2;
            const thumbnailY = (thumbnailImage.height - thumbnailSize) / 2;

            const cornerRadius2 = 45;

            thumbnailCtx.beginPath();
            thumbnailCtx.moveTo(0 + cornerRadius2, 0);
            thumbnailCtx.arcTo(thumbnailCanvas.width, 0, thumbnailCanvas.width, thumbnailCanvas.height, cornerRadius2);
            thumbnailCtx.arcTo(thumbnailCanvas.width, thumbnailCanvas.height, 0, thumbnailCanvas.height, cornerRadius2);
            thumbnailCtx.arcTo(0, thumbnailCanvas.height, 0, 0, cornerRadius2);
            thumbnailCtx.arcTo(0, 0, thumbnailCanvas.width, 0, cornerRadius2);
            thumbnailCtx.closePath();
            thumbnailCtx.clip();

            thumbnailCtx.drawImage(thumbnailImage, thumbnailX, thumbnailY, thumbnailSize, thumbnailSize, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);

            ctx.save();
            ctx.beginPath();
            ctx.arc(400, 382.5, 300, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(thumbnailCanvas, 75, 60, 650, 650);
            ctx.restore();

            ctx.font = "bold 150px circular-std, noto-emoji, noto-sans-jp, noto-sans, noto-sans-kr";
            ctx.fillStyle = `#${validatedColor}`;
            ctx.fillText(this.name, 800, 350);

            ctx.font = "bold 100px circular-std, noto-emoji, noto-sans-jp, noto-sans, noto-sans-kr";
            ctx.fillStyle = "#787878";
            ctx.fillText(this.author, 800, 500);

            ctx.beginPath();
            ctx.arc(2890, 382.5, 200, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.lineWidth = 40;
            ctx.strokeStyle = "#242323";
            ctx.stroke();

            const progress = validatedProgress;
            const angle = (progress / 100) * Math.PI * 2;

            ctx.beginPath();
            ctx.arc(2890, 382.5, 200, -Math.PI / 2, -Math.PI / 2 + angle, false);
            ctx.lineWidth = 40;
            ctx.strokeStyle = `#${validatedColor}`;
            ctx.stroke();

            return frame.toBuffer("image/png");
        } else {
            throw new Error('Invalid theme parameter, must be "classic" or "dynamic"');
        }
    }
}

module.exports = { musicCard };