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

    if (!thumbnailImage) {
        const noImageSvg = `<svg width="837" height="837" viewBox="0 0 837 837" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M837 0H0V837H837V0ZM396.303 691.414C272.066 684.048 182.78 561.419 174.63 460.468C158.974 266.653 439.863 121.359 491.252 148.2C502.378 154.023 500.521 166.759 497.851 185.066C494.41 208.661 489.62 241.51 509.533 280.739C530.562 322.173 563.994 340.877 594.378 357.876C620.149 372.293 643.727 385.485 655.688 410.278C696.671 495.229 580.437 673.081 431.472 690.398C503.505 677.599 558.308 591.33 538.234 549.52C532.208 536.97 520.33 530.293 507.348 522.995C492.042 514.391 475.2 504.924 464.607 483.951C454.575 464.094 456.988 447.467 458.722 435.524C460.067 426.257 461.002 419.81 455.398 416.863C429.51 403.276 288.009 476.821 295.896 574.925C299.979 625.739 344.48 687.403 406.52 691.756C403.127 691.73 399.72 691.617 396.303 691.414Z" fill="${progressColor}"/>
        </svg>`

        const noimageDataUrl = `data:image/svg+xml;base64,${Buffer.from(noImageSvg).toString('base64')}`;

        thumbnailImage = noimageDataUrl
    };

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
        const thumbnail = await loadImage(await cropImage({
            imagePath: thumbnailImage,
            width: 519,
            height: 278,
            borderRadius: 30,
            cropCenter: true
        }))

        ctx.drawImage(thumbnail, 41, 39);
        // ---------------------------------
        const thumbnailDimSvg = `<svg width="519" height="278" viewBox="0 0 519 278" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="519" height="278" rx="20" fill="url(#paint0_linear_137_11)"/>
        <defs>
        <linearGradient id="paint0_linear_137_11" x1="0" y1="139" x2="664" y2="139" gradientUnits="userSpaceOnUse">
        <stop/>
        <stop offset="1" stop-opacity="0"/>
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
