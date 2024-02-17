const { createCanvas, loadImage } = require("@napi-rs/canvas");
const { cropImage } = require("cropify");

async function Dynamic({
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
    if (!name) name = "Musicard"
    if (!author) author = "By Unburn"

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

    let thumbnail;

    try {
        thumbnail = await loadImage(await cropImage({
            imagePath: thumbnailImage,
            circle: true,
            width: 400,
            height: 400,
            cropCenter: true
        }))
    } catch {
        thumbnail = await loadImage(await cropImage({
            imagePath: noimageDataUrl,
            circle: true,
            width: 400,
            height: 400,
            cropCenter: true
        }))
    }

    if (progress < 10) {
        progress = 10
    } else if (progress >= 100) {
        progress = 99.999
    }

    if (name.length > 20) {
        name = name.slice(0, 20) + "...";
    }

    if (author.length > 20) {
        author = author.slice(0, 20) + "...";
    }

    try {
        const canvas = createCanvas(2367, 520);
        const ctx = canvas.getContext("2d");

        // ---------------------------------
        const backgroundSvg = `<svg width="2367" height="520" viewBox="0 0 2367 520" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 260C0 116.406 116.406 0 260 0H2107C2250.59 0 2367 116.406 2367 260V260C2367 403.594 2250.59 520 2107 520H260C116.406 520 0 403.594 0 260V260Z" fill="${backgroundColor}"/>
        </svg>
        `;

        const backgroundDataUrl = `data:image/svg+xml;base64,${Buffer.from(backgroundSvg).toString('base64')}`;
        const background = await loadImage(backgroundDataUrl);

        ctx.drawImage(background, 0, 0);
        // ---------------------------------
        ctx.drawImage(thumbnail, 69, 61)
        // ---------------------------------
        ctx.beginPath();
        ctx.arc(2100, 260, 170, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.lineWidth = 40;
        ctx.strokeStyle = `${progressBarColor}`;
        ctx.stroke();

        const angle = (progress / 100) * Math.PI * 2;

        ctx.beginPath();
        ctx.arc(2100, 260, 170, -Math.PI / 2, -Math.PI / 2 + angle, false);
        ctx.lineWidth = 40;
        ctx.strokeStyle = progressColor;
        ctx.stroke();
        // ---------------------------------
        ctx.fillStyle = `${nameColor}`
        ctx.font = "100px extrabold"
        ctx.fillText(name, 550, 240);
        // ---------------------------------
        ctx.fillStyle = `${authorColor}`
        ctx.font = "70px semibold"
        ctx.fillText(author, 550, 350);
        // ---------------------------------
        return canvas.toBuffer("image/png");
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = { Dynamic };