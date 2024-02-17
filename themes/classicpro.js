const { createCanvas, loadImage } = require("@napi-rs/canvas");
const { cropImage } = require("cropify");

async function ClassicPro({
    thumbnailImage,
    backgroundColor,
    progress,
    progressColor,
    progressBarColor,
    name,
    nameColor,
    author,
    authorColor,
    startTime,
    endTime,
    timeColor
}) {
    if (!progress) progress = 10;
    if (!name) name = "Musicard";
    if (!author) author = "By Unburn";
    if (!startTime) startTime = "0:00";
    if (!endTime) endTime = "0:00";

    if (!progressBarColor) progressBarColor = "#5F2D00";
    if (!progressColor) progressColor = "#FF7A00";
    if (!backgroundColor) backgroundColor = "#070707"
    if (!nameColor) nameColor = "#FF7A00"
    if (!authorColor) authorColor = "#696969"
    if (!timeColor) timeColor = "#FF7A00"

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
            borderRadius: 20,
            width: 331,
            height: 331,
            cropCenter: true
        }))
    } catch {
        thumbnail = await loadImage(await cropImage({
            imagePath: noimageDataUrl,
            borderRadius: 20,
            width: 331,
            height: 331,
            cropCenter: true
        }))
    }

    if (progress < 10) {
        progress = 10;
    } else if (progress > 100) {
        progress = 100;
    }

    if (name.length > 12) {
        name = name.slice(0, 12) + "...";
    }

    if (author.length > 12) {
        author = author.slice(0, 12) + "...";
    }

    try {
        const canvas = createCanvas(1252, 708);
        const ctx = canvas.getContext("2d");

        // ---------------------------------
        const backgroundSvg = `<svg width="1252" height="708" viewBox="0 0 1252 708" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1252" height="708" rx="20" fill="${backgroundColor}"/>
        </svg>
        `;

        const backgroundDataUrl = `data:image/svg+xml;base64,${Buffer.from(backgroundSvg).toString('base64')}`;

        const background = await loadImage(backgroundDataUrl);

        ctx.drawImage(background, 0, 0);
        // ---------------------------------
        ctx.drawImage(thumbnail, 87, 91);
        // ---------------------------------
        const completed = 1083 * progress / 100;

        const progressBarSvg = `<svg width="1083" height="77" viewBox="0 0 1083 77" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="19" width="1083" height="40" rx="20" fill="${progressBarColor}"/>
        <rect y="19" width="${completed}" height="40" rx="20" fill="${progressColor}"/>
        <rect x="${completed - 40}" y="3" width="71" height="71" rx="35.5" fill="${progressColor}" stroke="${backgroundColor}" stroke-width="6"/>
        </svg>
        `;

        const progressDataUrl = `data:image/svg+xml;base64,${Buffer.from(progressBarSvg).toString('base64')}`;

        const progressBar = await loadImage(progressDataUrl);

        ctx.drawImage(progressBar, 87, 490);
        // ---------------------------------
        ctx.fillStyle = `${nameColor}`;
        ctx.font = "90px extrabold";
        ctx.fillText(name, 486, 240);

        ctx.fillStyle = `${authorColor}`;
        ctx.font = "60px semibold";
        ctx.fillText(author, 486, 330);

        ctx.fillStyle = `${timeColor}`;
        ctx.font = "40px semibold";
        ctx.fillText(startTime, 85, 630);

        ctx.fillStyle = `${timeColor}`;
        ctx.font = "40px semibold";
        ctx.fillText(endTime, 1070, 630);
        // ---------------------------------
        return canvas.toBuffer("image/png");
    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = { ClassicPro };
