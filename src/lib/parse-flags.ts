import fs from "fs";
import clipboardy from "clipboardy";
export interface IParseFlagsOptions {
	data: string;
	inPath?: string;
	outPath?: string;
	toClipboard?: boolean;
	useGfm?: boolean;
}

export function parseFlags(options: IParseFlagsOptions): IParseFlagsOptions {
	if (options.toClipboard !== undefined) {
		if (process.stdin.isTTY) {
			try {
				options.data = clipboardy.readSync();
			} catch (error) {
				if (error instanceof Error) {
					process.stdout.write(`${error.message}\n`);
					if (process.env.NODE_ENV !== "test") process.exit(1);
				} else {
					if (process.env.NODE_ENV !== "test") process.exit(1);
				}
			}
		}
	}

	if (options.inPath !== undefined) {
		options.data = fs.readFileSync(options.inPath, "utf8");
	}

	return {
		data: options.data,
		outPath: options.outPath,
		useGfm: options.useGfm,
		toClipboard: options.toClipboard,
	};
}
