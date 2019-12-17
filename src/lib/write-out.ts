import fs from 'fs';
import TurndownService from 'turndown';
const turndownPluginGfm = require('turndown-plugin-gfm');
const turndownService = new TurndownService();
const gfm = turndownPluginGfm.gfm;
import clipboardy from 'clipboardy';

/**
 * Converts input html to markdown
 * Optional flag for using GitHub Flavoured Markdown
 */
function convert(data: string, usegfm?: any): string {
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
export function writeOut(options: {
  data: string;
  outPath?: string;
  usegfm?: any;
  toClipboard?: any;
}): void {
  const { data, usegfm, outPath, toClipboard } = options;
  if (toClipboard !== undefined) {
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
  } else {
    /**
     * Output to file
     *
     */
    fs.writeFileSync(outPath, convert(data, usegfm), 'utf8');
  }
}
