"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// import TurndownService from 'turndown';
// const turndownPluginGfm = require('turndown-plugin-gfm');
// const turndownService = new TurndownService();
// const gfm = turndownPluginGfm.gfm;
const clipboardy_1 = __importDefault(require("clipboardy"));
const write_out_1 = require("./write-out");
function parseFlags(options) {
    if (options.toClipboard !== undefined) {
        if (process.stdin.isTTY === true) {
            options.data = clipboardy_1.default.readSync();
        }
    }
    if (options.inPath !== undefined && process.stdin.isTTY === true) {
        options.data = fs_1.default.readFileSync(options.inPath, 'utf8');
    }
    write_out_1.writeOut({
        data: options.data,
        outPath: options.outPath,
        usegfm: options.useGfm,
        toClipboard: options.toClipboard,
    });
}
exports.parseFlags = parseFlags;
//# sourceMappingURL=parse-flags.js.map