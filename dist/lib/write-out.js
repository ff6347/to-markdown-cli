"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const turndown_1 = __importDefault(require("turndown"));
const turndownPluginGfm = require('turndown-plugin-gfm');
const turndownService = new turndown_1.default();
const gfm = turndownPluginGfm.gfm;
const clipboardy_1 = __importDefault(require("clipboardy"));
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
function writeOut(options) {
    const { data, usegfm, outPath, toClipboard } = options;
    if (toClipboard !== undefined) {
        /**
         * Output to clipboard
         */
        clipboardy_1.default.writeSync(`${convert(data, usegfm)}\n`);
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
        fs_1.default.writeFile(outPath, convert(data, usegfm), 'utf8', (error) => {
            if (error) {
                throw error;
            }
            process.stdout.write(`wrote to ${outPath}\n`);
        });
    }
}
exports.writeOut = writeOut;
//# sourceMappingURL=write-out.js.map