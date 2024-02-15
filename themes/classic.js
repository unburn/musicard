const { createCanvas, loadImage } = require("@napi-rs/canvas");
const { cropImage } = require("cropify");

async function Classic({
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
    if (!name) name = "Musicard"
    if (!author) author = "By Unburn"
    if (!startTime) startTime = "0:00"
    if (!endTime) endTime = "0:00"

    if (!progressBarColor) progressBarColor = "#5F2D00";
    if (!progressColor) progressColor = "#FF7A00";
    if (!backgroundColor) backgroundColor = "#070707"
    if (!nameColor) nameColor = "#FF7A00"
    if (!authorColor) authorColor = "#696969"
    if (!timeColor) timeColor = "#FF7A00"

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

    if (name.length > 18) {
        name = name.slice(0, 18) + "...";
    }

    if (author.length > 18) {
        author = author.slice(0, 18) + "...";
    }

    try {
        const canvas = createCanvas(2458, 837);
        const ctx = canvas.getContext("2d");

        // ---------------------------------
        const backgroundSvg = `<svg width="2458" height="837" viewBox="0 0 2458 837" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1568" height="512" rx="20" fill="${backgroundColor}"/>
    <rect y="565" width="1568" height="272" rx="20" fill="${backgroundColor}"/>
    </svg>`;

        const backgroundDataUrl = `data:image/svg+xml;base64,${Buffer.from(backgroundSvg).toString('base64')}`;

        const background = await loadImage(backgroundDataUrl);

        ctx.drawImage(background, 0, 0);
        // ---------------------------------
        const thumbnail = await loadImage(await cropImage({
            imagePath: thumbnailImage,
            borderRadius: 20,
            width: 837,
            height: 837,
            cropCenter: true
        }));

        ctx.drawImage(thumbnail, 1621, 0);
        // ---------------------------------
        const completed = 1342 * progress / 100;

        const progressBarSvg = `<svg width="1342" height="76" viewBox="0 0 1342 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="13" width="1342" height="47" rx="30" fill="${progressBarColor}"/>
    <rect y="13" width="${completed}" height="47" rx="30" fill="${progressColor}"/>
    <rect x="${completed - 40}" y="3" width="69.4422" height="69.4422" rx="34.7211" fill="${progressColor}" stroke="${backgroundColor}" stroke-width="6"/>
    </svg>`;

        const progressDataUrl = `data:image/svg+xml;base64,${Buffer.from(progressBarSvg).toString('base64')}`;

        const progressBar = await loadImage(progressDataUrl);

        ctx.drawImage(progressBar, 113, 635);

        // ---------------------------------
        ctx.fillStyle = `${nameColor}`;
        ctx.font = "124px extrabold";
        ctx.fillText(name, 113, 230);

        ctx.fillStyle = `${authorColor}`;
        ctx.font = "87px semibold";
        ctx.fillText(author, 113, 370);

        ctx.fillStyle = `${timeColor}`;
        ctx.font = "50px semibold";
        ctx.fillText(startTime, 113, 768);

        ctx.fillStyle = `${timeColor}`;
        ctx.font = "50px semibold";
        ctx.fillText(endTime, 1332, 768);
        // ---------------------------------
        return canvas.toBuffer("image/png");
    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = { Classic };
