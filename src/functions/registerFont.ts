import { GlobalFonts } from "@napi-rs/canvas";
import fs from "node:fs";
import path from "node:path";

function registerFont(fontPath: string, fontName: string): void {
    const rootFontsPath = path.join(__dirname, "../fonts", fontPath);
    if (fs.existsSync(rootFontsPath)) {
        GlobalFonts.registerFromPath(rootFontsPath, fontName);
    } else {
        const srcFontsPath = path.join(__dirname, "../fonts", fontPath);
        if (fs.existsSync(srcFontsPath)) {
            GlobalFonts.registerFromPath(srcFontsPath, fontName);
        } else {
            throw new Error(`Font file not found at ${rootFontsPath} or ${srcFontsPath}`);
        }
    }
}

export { registerFont };
