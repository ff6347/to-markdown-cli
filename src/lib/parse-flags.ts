import fs from 'fs';
// import TurndownService from 'turndown';
// const turndownPluginGfm = require('turndown-plugin-gfm');
// const turndownService = new TurndownService();
// const gfm = turndownPluginGfm.gfm;
import clipboardy from 'clipboardy';
import { writeOut } from './write-out';
export interface IParseFlagsOptions {
  data: string;
  inPath?: string;
  outPath?: string;
  toClipboard?: boolean;
  useGfm?: boolean;
}
export function parseFlags(options: IParseFlagsOptions): void {
  if (options.toClipboard !== undefined) {
    if (process.stdin.isTTY === true) {
      options.data = clipboardy.readSync();
    }
  }

  if (options.inPath !== undefined && process.stdin.isTTY === true) {
    options.data = fs.readFileSync(options.inPath, 'utf8');
  }

  writeOut({
    data: options.data,
    outPath: options.outPath,
    usegfm: options.useGfm,
    toClipboard: options.toClipboard,
  });
}
