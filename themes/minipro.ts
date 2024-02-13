import { createCanvas, loadImage } from "@napi-rs/canvas";
import { cropImage } from "cropify";

interface MiniProOptions {
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

async function MiniPro({
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
}: MiniProOptions): Promise<Buffer> {
    if (!progress) progress = 10;
    if (!progressColor) progressColor = "#e92725";
    if (!progressBarColor) progressBarColor = "#0F0F0F";
    if (!thumbnailImage) thumbnailImage = `https://singlecolorimage.com/get/${progressColor.replace("#", "")}/544x544.png`;
    if (!backgroundColor) backgroundColor = "#000000";
    if (!name) name = "Musicard";
    if (!nameColor) nameColor = "#e92725";
    if (!author) author = "By Unburn";
    if (!authorColor) authorColor = "#B8B8B8";
    if (!startTime) startTime = "0:00";
    if (!endTime) endTime = "0:00";

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
        const canvas = createCanvas(1252, 743);
        const ctx = canvas.getContext("2d");

        // ---------------------------------
        const backgroundSvg = `<svg width="1252" height="743" viewBox="0 0 1252 743" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1252" height="743" rx="20" fill="${backgroundColor}"/>
        </svg>
        `;

        const backgroundDataUrl = `data:image/svg+xml;base64,${Buffer.from(backgroundSvg).toString('base64')}`;

        const background = await loadImage(backgroundDataUrl);

        ctx.drawImage(background, 0, 0);
        // ---------------------------------
        const thumbnail = await loadImage(await cropImage({
            imagePath: thumbnailImage!,
            borderRadius: 20,
            width: 331,
            height: 331
        }));

        ctx.drawImage(thumbnail, 87, 91);
        // ---------------------------------
        const completed = 1083 * progress / 100;

        const progressBarSvg = `<svg width="1083" height="77" viewBox="0 0 1083 77" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="19" width="1083" height="40" rx="20" fill="${progressBarColor}"/>
        <rect y="19" width="${completed}" height="40" rx="20" fill="${progressColor}"/>
        <rect x="${completed - 40}" y="3" width="71" height="71" rx="35.5" fill="${progressColor}" stroke="#0E0E0E" stroke-width="6"/>
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

        ctx.fillStyle = `#fff`;
        ctx.font = "40px semibold";
        ctx.fillText(startTime, 85, 630);

        ctx.fillStyle = `#fff`;
        ctx.font = "40px semibold";
        ctx.fillText(endTime, 1070, 630);
        // ---------------------------------
        return canvas.toBuffer("image/png");
    } catch (e: any) {
        throw new Error(e.message);
    }
}

export { MiniPro, MiniProOptions };
