import { GlobalFonts } from "@napi-rs/canvas";
import fs from "fs";
import path from "path";

// Function to register fonts based on their availability in node_modules folder
function registerFont(fontPath: string, fontName: string | undefined) {
    const nodeModulesPath = path.join(__dirname, "node_modules", "fonts", fontPath);
    if (fs.existsSync(nodeModulesPath)) {
        GlobalFonts.registerFromPath(nodeModulesPath, fontName);
    } else {
        GlobalFonts.registerFromPath(path.join(__dirname, "fonts", fontPath), fontName);
    }
}

// Register fonts
registerFont("extrabold.ttf", "extrabold");
registerFont("regular.ttf", "regular");
registerFont("semibold.ttf", "semibold");

// Import themes
import { Classic } from "./themes/classic";
import { Dynamic } from "./themes/dynamic";
import { Mini } from "./themes/mini";
import { MiniPro } from "./themes/minipro";

export { Classic, Dynamic, Mini, MiniPro };