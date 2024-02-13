import { createCanvas, loadImage } from "@napi-rs/canvas";
import { cropImage } from "cropify";

interface ClassicOptions {
    thumbnailImage?: string;
    backgroundColor?: string;
    progress?: number;
    progressColor?: string;
    progressBarColor?: string;
    name?: string;
    nameColor?: string;
    author?: string;
    authorColor?: string;
    startTime?: string;
    endTime?: string;
}

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
    endTime
}: ClassicOptions): Promise<Buffer> {
    if (!progress) progress = 10;
    if (!progressColor) progressColor = "#e92725";
    if (!progressBarColor) progressBarColor = "#0F0F0F";
    if (!thumbnailImage) thumbnailImage = `https://singlecolorimage.com/get/${progressColor.replace("#", "")}/544x544.png`;
    if (!backgroundColor) backgroundColor = "#000000"
    if (!name) name = "Musicard"
    if (!nameColor) nameColor = "#e92725"
    if (!author) author = "By Unburn"
    if (!authorColor) authorColor = "#B8B8B8"
    if (!startTime) startTime = "0:00"
    if (!endTime) endTime = "0:00"

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
            imagePath: thumbnailImage!,
            borderRadius: 20,
            width: 837,
            height: 837
        }));

        ctx.drawImage(thumbnail, 1621, 0);
        // ---------------------------------
        const completed = 1342 * progress / 100;

        const progressBarSvg = `<svg width="1342" height="76" viewBox="0 0 1342 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="13" width="1342" height="47" rx="10" fill="#3E3E3E"/>
    <rect y="13" width="${completed}" height="47" rx="10" fill="${progressColor}"/>
    <rect x="${completed - 40}" y="3" width="69.4422" height="69.4422" rx="34.7211" fill="${progressColor}" stroke="#0E0E0E" stroke-width="6"/>
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

        ctx.fillStyle = `#fff`;
        ctx.font = "50px semibold";
        ctx.fillText(startTime, 113, 768);

        ctx.fillStyle = `#fff`;
        ctx.font = "50px semibold";
        ctx.fillText(endTime, 1332, 768);
        // ---------------------------------
        return canvas.toBuffer("image/png");
    } catch (e: any) {
        throw new Error(e.message);
    }
}

export { Classic, ClassicOptions };
