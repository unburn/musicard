const { GlobalFonts } = require("@napi-rs/canvas");
const path = require("path");
const fs = require("fs");

function registerFont(fontPath, fontName) {
    const nodeModulesPath = path.join(__dirname, "node_modules", "fonts", fontPath);
    if (fs.existsSync(nodeModulesPath)) {
        GlobalFonts.registerFromPath(nodeModulesPath, fontName);
    } else {
        GlobalFonts.registerFromPath(path.join(__dirname, "fonts", fontPath), fontName);
    }
}

module.exports = { registerFont }

registerFont("extrabold.ttf", "extrabold");
registerFont("regular.ttf", "regular");
registerFont("semibold.ttf", "semibold");

// import themes
const { Classic } = require("./themes/classic.js");
const { ClassicPro } = require("./themes/classicpro.js");
const { Dynamic } = require("./themes/dynamic.js");
const { Mini } = require("./themes/mini.js");
const { MiniPro } = require("./themes/minipro.js");

module.exports = { Classic, ClassicPro, Dynamic, Mini, MiniPro };