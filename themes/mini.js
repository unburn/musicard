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
exports.Mini = void 0;
const canvas_1 = require("@napi-rs/canvas");
const cropify_1 = require("cropify");
function Mini({ thumbnailImage, backgroundColor, menuColor, progress, progressColor, progressBarColor, paused }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!backgroundColor)
            backgroundColor = "#000000";
        if (!menuColor)
            menuColor = "#e92725";
        if (!progress)
            progress = 10;
        if (!progressColor)
            progressColor = "#e92725";
        if (!progressBarColor)
            progressBarColor = "#0F0F0F";
        if (!thumbnailImage)
            thumbnailImage = `https://singlecolorimage.com/get/${menuColor.replace("#", "")}/544x544.png`;
        if (progress < 10) {
            progress = 10;
        }
        else if (progress > 100) {
            progress = 100;
        }
        try {
            const canvas = (0, canvas_1.createCanvas)(613, 837);
            const ctx = canvas.getContext("2d");
            // ---------------------------------
            const backgroundSvg = `<svg width="613" height="837" viewBox="0 0 613 837" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="613" height="837" rx="84" fill="${backgroundColor}" />
    </svg>`;
            const backgroundDataUrl = `data:image/svg+xml;base64,${Buffer.from(backgroundSvg).toString('base64')}`;
            const background = yield (0, canvas_1.loadImage)(backgroundDataUrl);
            ctx.drawImage(background, 0, 0);
            // ---------------------------------
            const thumbnail = yield (0, canvas_1.loadImage)(yield (0, cropify_1.cropImage)({
                imagePath: thumbnailImage,
                borderRadius: 80,
                width: 544,
                height: 544
            }));
            ctx.drawImage(thumbnail, 34, 29);
            // ---------------------------------
            const completed = 544 * progress / 100;
            const progressBarSvg = `<svg width="544" height="34" viewBox="0 0 544 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="544" height="34" rx="17" fill="${progressBarColor}" />
    <rect width="${completed}" height="34" rx="17" fill="${progressColor}" />
    </svg>`;
            const progressDataUrl = `data:image/svg+xml;base64,${Buffer.from(progressBarSvg).toString('base64')}`;
            const progressBar = yield (0, canvas_1.loadImage)(progressDataUrl);
            ctx.drawImage(progressBar, 34, 611);
            // ---------------------------------
            let middleMenu;
            if (paused) {
                middleMenu = `<path d="M145 69.6L178.6 48L145 26.4V69.6ZM157 96C150.36 96 144.12 94.74 138.28 92.22C132.44 89.7 127.36 86.28 123.04 81.96C118.72 77.64 115.3 72.56 112.78 66.72C110.26 60.88 109 54.64 109 48C109 41.36 110.26 35.12 112.78 29.28C115.3 23.44 118.72 18.36 123.04 14.04C127.36 9.72 132.44 6.3 138.28 3.78C144.12 1.26 150.36 0 157 0C163.64 0 169.88 1.26 175.72 3.78C181.56 6.3 186.64 9.72 190.96 14.04C195.28 18.36 198.7 23.44 201.22 29.28C203.74 35.12 205 41.36 205 48C205 54.64 203.74 60.88 201.22 66.72C198.7 72.56 195.28 77.64 190.96 81.96C186.64 86.28 181.56 89.7 175.72 92.22C169.88 94.74 163.64 96 157 96Z" fill="${menuColor}" />`;
            }
            else {
                middleMenu = `<path d="M142.6 67.2H152.2V28.8H142.6V67.2ZM161.8 67.2H171.4V28.8H161.8V67.2ZM157 96C150.36 96 144.12 94.74 138.28 92.22C132.44 89.7 127.36 86.28 123.04 81.96C118.72 77.64 115.3 72.56 112.78 66.72C110.26 60.88 109 54.64 109 48C109 41.36 110.26 35.12 112.78 29.28C115.3 23.44 118.72 18.36 123.04 14.04C127.36 9.72 132.44 6.3 138.28 3.78C144.12 1.26 150.36 0 157 0C163.64 0 169.88 1.26 175.72 3.78C181.56 6.3 186.64 9.72 190.96 14.04C195.28 18.36 198.7 23.44 201.22 29.28C203.74 35.12 205 41.36 205 48C205 54.64 203.74 60.88 201.22 66.72C198.7 72.56 195.28 77.64 190.96 81.96C186.64 86.28 181.56 89.7 175.72 92.22C169.88 94.74 163.64 96 157 96Z" fill="${menuColor}" />`;
            }
            const menuSvg = `<svg width="315" height="96" viewBox="0 0 315 96" fill="none" xmlns="http://www.w3.org/2000/svg">`
                +
                    `${middleMenu}`
                +
                    `<path d="M263.2 62.8H270.6V33.2H263.2V62.8ZM278 62.8L300.2 48L278 33.2V62.8ZM278 85C272.882 85 268.072 84.0287 263.57 82.0862C259.068 80.1437 255.153 77.5075 251.822 74.1775C248.492 70.8475 245.856 66.9317 243.914 62.43C241.971 57.9283 241 53.1183 241 48C241 42.8817 241.971 38.0717 243.914 33.57C245.856 29.0683 248.492 25.1525 251.822 21.8225C255.153 18.4925 259.068 15.8563 263.57 13.9138C268.072 11.9712 272.882 11 278 11C283.118 11 287.928 11.9712 292.43 13.9138C296.932 15.8563 300.848 18.4925 304.178 21.8225C307.508 25.1525 310.144 29.0683 312.086 33.57C314.029 38.0717 315 42.8817 315 48C315 53.1183 314.029 57.9283 312.086 62.43C310.144 66.9317 307.508 70.8475 304.178 74.1775C300.848 77.5075 296.932 80.1437 292.43 82.0862C287.928 84.0287 283.118 85 278 85Z" fill="${menuColor}" />`
                +
                    `<path d="M51.8 33.2L44.4 33.2L44.4 62.8H51.8L51.8 33.2ZM37 33.2L14.8 48L37 62.8L37 33.2ZM37 11C42.1183 11 46.9283 11.9713 51.43 13.9138C55.9317 15.8563 59.8475 18.4925 63.1775 21.8225C66.5075 25.1525 69.1437 29.0683 71.0862 33.57C73.0288 38.0717 74 42.8817 74 48C74 53.1183 73.0288 57.9283 71.0862 62.43C69.1437 66.9317 66.5075 70.8475 63.1775 74.1775C59.8475 77.5075 55.9317 80.1437 51.43 82.0862C46.9283 84.0288 42.1183 85 37 85C31.8817 85 27.0717 84.0288 22.57 82.0862C18.0683 80.1437 14.1525 77.5075 10.8225 74.1775C7.4925 70.8475 4.85625 66.9317 2.91375 62.43C0.97125 57.9283 -9.53674e-07 53.1183 -9.53674e-07 48C-9.53674e-07 42.8817 0.97125 38.0717 2.91375 33.57C4.85625 29.0683 7.4925 25.1525 10.8225 21.8225C14.1525 18.4925 18.0683 15.8563 22.57 13.9138C27.0717 11.9713 31.8817 11 37 11Z" fill="${menuColor}" />`
                +
                    `</svg>`;
            const menuDataUrl = `data:image/svg+xml;base64,${Buffer.from(menuSvg).toString('base64')}`;
            const menu = yield (0, canvas_1.loadImage)(menuDataUrl);
            ctx.drawImage(menu, 143, 693);
            // ---------------------------------
            return canvas.toBuffer("image/png");
        }
        catch (e) {
            throw new Error(e.message);
        }
    });
}
exports.Mini = Mini;
