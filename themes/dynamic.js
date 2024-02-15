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

    if (!thumbnailImage) {
        const noImageSvg = `<svg width="837" height="837" viewBox="0 0 837 837" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M837 0H0V837H837V0ZM396.303 691.414C272.066 684.048 182.78 561.419 174.63 460.468C158.974 266.653 439.863 121.359 491.252 148.2C502.378 154.023 500.521 166.759 497.851 185.066C494.41 208.661 489.62 241.51 509.533 280.739C530.562 322.173 563.994 340.877 594.378 357.876C620.149 372.293 643.727 385.485 655.688 410.278C696.671 495.229 580.437 673.081 431.472 690.398C503.505 677.599 558.308 591.33 538.234 549.52C532.208 536.97 520.33 530.293 507.348 522.995C492.042 514.391 475.2 504.924 464.607 483.951C454.575 464.094 456.988 447.467 458.722 435.524C460.067 426.257 461.002 419.81 455.398 416.863C429.51 403.276 288.009 476.821 295.896 574.925C299.979 625.739 344.48 687.403 406.52 691.756C403.127 691.73 399.72 691.617 396.303 691.414Z" fill="${progressColor}"/>
        </svg>`

        const noimageDataUrl = `data:image/svg+xml;base64,${Buffer.from(noImageSvg).toString('base64')}`;

        thumbnailImage = noimageDataUrl
    };

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
        const thumbnail = await loadImage(await cropImage({
            imagePath: thumbnailImage,
            circle: true,
            width: 400,
            height: 400,
            cropCenter: true
        }));

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