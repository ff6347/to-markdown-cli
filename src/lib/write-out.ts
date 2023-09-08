import fs from "fs";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
const turndownService = new TurndownService({
	headingStyle: "atx",
	bulletListMarker: "-",
});
import clipboardy from "clipboardy";

/**
 * Converts input html to markdown
 * Optional flag for using GitHub Flavoured Markdown
 */
export function convert(data: string, usegfm?: any): string {
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
	useGfm?: any;
	toClipboard?: any;
}): void {
	const { data, useGfm, outPath, toClipboard } = options;
	// console.log(toClipboard, );
	if (toClipboard === true) {
		/**
		 * Output to clipboard
		 */

		try {
			clipboardy.writeSync(`${convert(data, useGfm)}\n`);
		} catch (error) {
			if (error instanceof Error) {
				process.stdout.write(`${error.message}\n`);
				if (process.env.NODE_ENV !== "test") process.exit(1);
			} else {
				if (process.env.NODE_ENV !== "test") process.exit(1);
			}
		}
	}
	if (outPath === undefined) {
		/**
		 * Output to stdout
		 */
		process.stdout.write(`${convert(data, useGfm)}\n`);
	} else {
		/**
		 * Output to file
		 *
		 */
		fs.writeFileSync(outPath, convert(data, useGfm), "utf8");
	}
}
