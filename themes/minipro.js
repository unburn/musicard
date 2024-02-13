"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniPro = void 0;
const canvas_1 = require("@napi-rs/canvas");
const cropify_1 = require("cropify");
function MiniPro({ thumbnailImage, backgroundColor, progress, progressColor, progressBarColor, name, nameColor, author, authorColor, startTime, endTime }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!progress)
            progress = 10;
        if (!progressColor)
            progressColor = "#e92725";
        if (!progressBarColor)
            progressBarColor = "#0F0F0F";
        if (!thumbnailImage)
            thumbnailImage = `https://singlecolorimage.com/get/${progressColor.replace("#", "")}/544x544.png`;
        if (!backgroundColor)
            backgroundColor = "#000000";
        if (!name)
            name = "Musicard";
        if (!nameColor)
            nameColor = "#e92725";
        if (!author)
            author = "By Unburn";
        if (!authorColor)
            authorColor = "#B8B8B8";
        if (!startTime)
            startTime = "0:00";
        if (!endTime)
            endTime = "0:00";
        if (progress < 10) {
            progress = 10;
        }
        else if (progress > 100) {
            progress = 100;
        }
        if (name.length > 12) {
            name = name.slice(0, 12) + "...";
        }
        if (author.length > 12) {
            author = author.slice(0, 12) + "...";
        }
        try {
            const canvas = (0, canvas_1.createCanvas)(1252, 743);
            const ctx = canvas.getContext("2d");
            // ---------------------------------
            const backgroundSvg = `<svg width="1252" height="743" viewBox="0 0 1252 743" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1252" height="743" rx="20" fill="${backgroundColor}"/>
        </svg>
        `;
            const backgroundDataUrl = `data:image/svg+xml;base64,${Buffer.from(backgroundSvg).toString('base64')}`;
            const background = yield (0, canvas_1.loadImage)(backgroundDataUrl);
            ctx.drawImage(background, 0, 0);
            // ---------------------------------
            const thumbnail = yield (0, canvas_1.loadImage)(yield (0, cropify_1.cropImage)({
                imagePath: thumbnailImage,
                borderRadius: 20,
                width: 331,
                height: 331,
                cropCenter: true
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
            const progressBar = yield (0, canvas_1.loadImage)(progressDataUrl);
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
        }
        catch (e) {
            throw new Error(e.message);
        }
    });
}
exports.MiniPro = MiniPro;
