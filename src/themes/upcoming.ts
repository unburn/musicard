import { createCanvas, loadImage } from "@napi-rs/canvas";
import { cropImage } from "cropify";

import { generateSvg } from "../functions/generateSvg.js";
import { registerFont } from "../functions/registerFont.js";
import type { UpcomingOptions } from "../typings/types.js";

registerFont("PlusJakartaSans-Bold.ttf", "bold");
registerFont("PlusJakartaSans-ExtraBold.ttf", "extrabold");
registerFont("PlusJakartaSans-ExtraLight.ttf", "extralight");
registerFont("PlusJakartaSans-Light.ttf", "light");
registerFont("PlusJakartaSans-Medium.ttf", "medium");
registerFont("PlusJakartaSans-Regular.ttf", "regular");
registerFont("PlusJakartaSans-SemiBold.ttf", "semibold");

const Upcoming = async (options: UpcomingOptions): Promise<Buffer> => {
    if (!options.title) options.title = "Musicard";
    if (!options.titleColor) options.titleColor = "#d0d5d6";
    if (!options.author) options.author = "By Unburn";
    if (!options.authorColor) options.authorColor = "#FFFFFF";
    if (!options.trackIndex) options.trackIndex = 1;
    if (!options.trackIndexTextColor) options.trackIndexTextColor = "#000000";
    if (!options.trackIndexBackgroundColor) options.trackIndexBackgroundColor = "#d0d5d6";
    if (!(options.trackIndexBackgroundRadii || !Array.isArray(options.trackIndexBackgroundRadii))) options.trackIndexBackgroundRadii = 10;
    if (!options.backgroundColor) options.backgroundColor = "#070707";

    if (!options.imageDarkness) options.imageDarkness = 10;

    const noImageSvg = generateSvg(`<svg width="613" height="837" viewBox="0 0 613 837" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="613" height="837" rx="50" fill="${options.backgroundColor}" />
    </svg>`);

    if (!options.thumbnailImage) {
        options.thumbnailImage = noImageSvg;
    }

    let thumbnail;

    try {
        thumbnail = await loadImage(
            await cropImage({
                //@ts-ignore
                imagePath: options.thumbnailImage,
                borderRadius: 20,
                width: 150,
                height: 150,
                cropCenter: true,
            }),
        );
    } catch (_e) {
        thumbnail = await loadImage(
            await cropImage({
                imagePath: noImageSvg,
                borderRadius: 20,
                width: 150,
                height: 150,
                cropCenter: true,
            }),
        );
    }

    if (options.imageDarkness < 0) {
        options.imageDarkness = 0;
    } else if (options.imageDarkness > 100) {
        options.imageDarkness = 100;
    }

    if (options.title.length > 18) {
        options.title = `${options.title.slice(0, 18)}...`;
    }

    if (options.author.length > 19) {
        options.author = `${options.author.slice(0, 19)}...`;
    }

    try {
        const canvas = createCanvas(690, 194);
        const ctx = canvas.getContext("2d");
        // Drawing the background (if provided using else the backgroundColor)
        if (options.backgroundImage) {
            try {
                // An different rx is set has cropImage had weird roundness.
                const darknessSvg = generateSvg(`<svg width="690" height="194" viewBox="0 0 690 194" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="690" height="194" rx="30" fill="#070707" fill-opacity="${options.imageDarkness / 100}"/>
                </svg>`);

                const image = await cropImage({
                    // @ts-ignore
                    imagePath: options.backgroundImage,
                    width: 690,
                    height: 194,
                    borderRadius: 35,
                    cropCenter: true,
                });

                ctx.drawImage(await loadImage(image), 0, 0);
                ctx.drawImage(await loadImage(darknessSvg), 0, 0);
            } catch (_error) {
                const backgroundSvg = generateSvg(`<svg width="690" height="194" viewBox="0 0 690 194" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="690" height="194" rx="35" fill="${options.backgroundColor}"/>
                </svg>`);

                const backgroundColor = await loadImage(backgroundSvg);

                ctx.drawImage(backgroundColor, 0, 0);
            }
        } else {
            const backgroundSvg = generateSvg(`<svg width="690" height="194" viewBox="0 0 690 194" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="690" height="194" rx="35" fill="${options.backgroundColor}"/>
            </svg>`);

            const backgroundColor = await loadImage(backgroundSvg);

            ctx.drawImage(backgroundColor, 0, 0);
        }

        ctx.drawImage(thumbnail, 22, 22);

        ctx.font = "33px extrabold";
        ctx.fillStyle = options.titleColor;
        ctx.fillText(options.title, 200, canvas.height / 2);

        ctx.font = "23px medium";
        ctx.fillStyle = options.authorColor;
        ctx.fillText(options.author, 200, canvas.height / 2 + 35);

        ctx.fillStyle = options.trackIndexBackgroundColor;
        ctx.beginPath();
        ctx.roundRect(canvas.width - 65, canvas.height - 63, 50, 50, options.trackIndexBackgroundRadii);
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = options.trackIndexTextColor;
        ctx.font = "30px bold";
        ctx.fillText(options.trackIndex.toString(), canvas.width - 47, canvas.height - 26);

        return canvas.toBuffer("image/png");
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export { Upcoming };
