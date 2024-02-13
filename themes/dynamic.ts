import { createCanvas, loadImage } from "@napi-rs/canvas";
import { cropImage } from "cropify";

interface DynamicOptions {
    thumbnailImage?: string;
    backgroundColor?: string;
    progress?: number;
    progressColor?: string;
    progressBarColor?: string;
    name?: string;
    nameColor?: string;
    author?: string;
    authorColor?: string;
}

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
}: DynamicOptions): Promise<Buffer> {
    if (!progress) progress = 10;
    if (!progressColor) progressColor = "#e92725";
    if (!progressBarColor) progressBarColor = "#0F0F0F";
    if (!thumbnailImage) thumbnailImage = `https://singlecolorimage.com/get/${progressColor.replace("#", "")}/544x544.png`;
    if (!backgroundColor) backgroundColor = "#000000"
    if (!name) name = "Musicard"
    if (!nameColor) nameColor = "#e92725"
    if (!author) author = "By Unburn"
    if (!authorColor) authorColor = "#B8B8B8"

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
            imagePath: thumbnailImage!,
            circle: true,
            width: 400,
            height: 400
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
    } catch (e: any) {
        throw new Error(e.message)
    }
}

export { Dynamic, DynamicOptions };
