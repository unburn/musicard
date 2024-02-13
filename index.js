"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniPro = exports.Mini = exports.Dynamic = exports.Classic = void 0;
const canvas_1 = require("@napi-rs/canvas");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Function to register fonts based on their availability in node_modules folder
function registerFont(fontPath, fontName) {
    const nodeModulesPath = path_1.default.join(__dirname, "node_modules", "fonts", fontPath);
    if (fs_1.default.existsSync(nodeModulesPath)) {
        canvas_1.GlobalFonts.registerFromPath(nodeModulesPath, fontName);
    }
    else {
        canvas_1.GlobalFonts.registerFromPath(path_1.default.join(__dirname, "fonts", fontPath), fontName);
    }
}
// Register fonts
registerFont("extrabold.ttf", "extrabold");
registerFont("regular.ttf", "regular");
registerFont("semibold.ttf", "semibold");
// Import themes
const classic_1 = require("./themes/classic");
Object.defineProperty(exports, "Classic", { enumerable: true, get: function () { return classic_1.Classic; } });
const dynamic_1 = require("./themes/dynamic");
Object.defineProperty(exports, "Dynamic", { enumerable: true, get: function () { return dynamic_1.Dynamic; } });
const mini_1 = require("./themes/mini");
Object.defineProperty(exports, "Mini", { enumerable: true, get: function () { return mini_1.Mini; } });
const minipro_1 = require("./themes/minipro");
Object.defineProperty(exports, "MiniPro", { enumerable: true, get: function () { return minipro_1.MiniPro; } });
