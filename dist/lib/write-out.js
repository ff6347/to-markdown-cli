import fs from "fs";
import TurndownService from "turndown";
const turndownPluginGfm = require("turndown-plugin-gfm");
const turndownService = new TurndownService();
const gfm = turndownPluginGfm.gfm;
import clipboardy from "clipboardy";
/**
 * Converts input html to markdown
 * Optional flag for using GitHub Flavoured Markdown
 */
function convert(data, usegfm) {
    if (usegfm !== undefined) {
        turndownService.use(gfm);
    }
    return turndownService.turndown(data);
}
/**
 * Writes output to
 * - stdout
 * - clipboardy
 * - file
 */
export function writeOut(options) {
    const { data, usegfm, outPath, toClipboard } = options;
    // console.log(toClipboard, );
    if (toClipboard === true) {
        /**
         * Output to clipboard
         */
        clipboardy.writeSync(`${convert(data, usegfm)}\n`);
        process.exit(0);
    }
    if (outPath === undefined) {
        /**
         * Output to stdout
         */
        process.stdout.write(`${convert(data, usegfm)}\n`);
    }
    else {
        /**
         * Output to file
         *
         */
        fs.writeFileSync(outPath, convert(data, usegfm), "utf8");
    }
}
//# sourceMappingURL=write-out.js.map