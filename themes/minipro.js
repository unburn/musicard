const { createCanvas, loadImage } = require("@napi-rs/canvas");
const { cropImage } = require("cropify");

async function MiniPro({
    thumbnailImage,
    backgroundColor,
    progress,
    progressColor,
    progressBarColor,
    name,
    nameColor,
    author,
    authorColor
}) {
    if (!progress) progress = 10;
    if (!name) name = "Musicard";
    if (!author) author = "By Unburn";

    if (!progressBarColor) progressBarColor = "#5F2D00";
    if (!progressColor) progressColor = "#FF7A00";
    if (!backgroundColor) backgroundColor = "#070707"
    if (!nameColor) nameColor = "#FF7A00"
    if (!authorColor) authorColor = "#696969"

    const noImageSvg = `<svg width="837" height="837" viewBox="0 0 837 837" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="837" height="837" fill="${progressColor}"/>
    <path d="M419.324 635.912C406.035 635.912 394.658 631.18 385.195 621.717C375.732 612.254 371 600.878 371 587.589C371 574.3 375.732 562.923 385.195 553.46C394.658 543.997 406.035 539.265 419.324 539.265C432.613 539.265 443.989 543.997 453.452 553.46C462.915 562.923 467.647 574.3 467.647 587.589C467.647 600.878 462.915 612.254 453.452 621.717C443.989 631.18 432.613 635.912 419.324 635.912ZM371 490.941V201H467.647V490.941H371Z" fill="${backgroundColor}"/>
    </svg>`

    const noimageDataUrl = `data:image/svg+xml;base64,${Buffer.from(noImageSvg).toString('base64')}`;

    if (!thumbnailImage) {
        thumbnailImage = noimageDataUrl
    };

    try {
        thumbnail = await loadImage(await cropImage({
            imagePath: thumbnailImage,
            borderRadius: 30,
            width: 519,
            height: 278,
            cropCenter: true
        }))
    } catch {
        thumbnail = await loadImage(await cropImage({
            imagePath: noimageDataUrl,
            borderRadius: 30,
            width: 519,
            height: 278,
            cropCenter: true
        }))
    }

    if (progress < 10) {
        progress = 10
    } else if (progress > 100) {
        progress = 100
    }

    if (name.length > 13) {
        name = name.slice(0, 13) + "...";
    }

    if (author.length > 13) {
        author = author.slice(0, 13) + "...";
    }

    try {
        const canvas = createCanvas(601, 426);
        const ctx = canvas.getContext("2d");

        // ---------------------------------
        const backgroundSvg = `<svg width="601" height="426" viewBox="0 0 601 426" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="601" height="426" rx="50" fill="${backgroundColor}"/>
        </svg>
        `

        const backgroundDataUrl = `data:image/svg+xml;base64,${Buffer.from(backgroundSvg).toString('base64')}`;

        const background = await loadImage(backgroundDataUrl);

        ctx.drawImage(background, 0, 0);
        // ---------------------------------
        ctx.drawImage(thumbnail, 41, 39);
        // ---------------------------------
        const thumbnailDimSvg = `<svg width="519" height="278" viewBox="0 0 519 278" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="519" height="278" fill="url(#paint0_linear_207_2)"/>
        <defs>
        <linearGradient id="paint0_linear_207_2" x1="7.26096e-06" y1="138.834" x2="519" y2="138.834" gradientUnits="userSpaceOnUse">
        <stop stop-color="${backgroundColor}"/>
        <stop offset="1" stop-color="${backgroundColor}" stop-opacity="0"/>
        </linearGradient>
        </defs>
        </svg>`


        const thumbnailDimDataUrl = `data:image/svg+xml;base64,${Buffer.from(thumbnailDimSvg).toString('base64')}`;

        const thumbnailDim = await loadImage(thumbnailDimDataUrl);

        ctx.drawImage(thumbnailDim, 41, 39);
        // ---------------------------------
        const completed = 519 * progress / 100

        const progressBarSvg = `<svg width="519" height="23" viewBox="0 0 519 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="519" height="23" rx="11.5" fill="${progressBarColor}"/>
        <rect width="${completed}" height="23" rx="11.5" fill="${progressColor}"/>
        </svg>`

        const progressBarDataUrl = `data:image/svg+xml;base64,${Buffer.from(progressBarSvg).toString('base64')}`;

        const progressBar = await loadImage(progressBarDataUrl);

        ctx.drawImage(progressBar, 41, 358);
        // ---------------------------------
        ctx.fillStyle = `${nameColor}`
        ctx.font = "55px extrabold"
        ctx.fillText(name, 80, 160);
        // ---------------------------------
        ctx.fillStyle = `${authorColor}`
        ctx.font = "35px regular"
        ctx.fillText(author, 80, 220);
        // ---------------------------------
        return canvas.toBuffer("image/png");
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = { MiniPro };
