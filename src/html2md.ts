#!/usr/bin/env node
import fs from "fs";
import path from "path";
import program from "commander";
import { parseFlags } from "./lib/parse-flags.js";
import { fileURLToPath } from "url";
import { writeOut } from "./lib/write-out.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pkg: { version: "string"; [key: string]: any } = JSON.parse(
	fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8"),
);

let inPath: any = undefined;
let outPath: any = undefined;
let data = "";

function parseInPath(val: string) {
	if (fs.existsSync(path.resolve(process.cwd(), val))) {
		inPath = val;
	} else {
		process.stderr.write(
			"the specified file path for the input file does not exist\n",
		);
		process.exit(1);
	}
}

function parseOutPath(val?: string) {
	outPath = val;
}

program
	.version(pkg.version)
	.option(
		"-i, --input <input>",
		"path to the input file (if input is stdin) it will be ignored",
		parseInPath,
	)
	.option("-o, --output <output>", "path to the output file", parseOutPath)
	.option("-c, --clipboard", "use only the clipboard for input and output")
	.option("-g, --gfm", "use GitHub Flavored Markdown");

program.on("--help", () => {
	process.stdout.write(`
     _   _   _   _   _   _   _
    / \\ / \\ / \\ / \\ / \\ / \\ / \\
   ( h | t | m | l | 2 | m | d )
    \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/

    html2md turns html into markdown

    - if no input file is given it uses the clipboard content
    - if no output file is given it logs the result to stdout
    - if there is input from stdin clipboard will be ignored for inputs

    Examples:
        $ html2md -i ./foo.html # output to stdout
        $ html2md -i ./foo.html -o out.md # output to out.md
        $ html2md -o out.md # clipboard to out.md
        $ html2md -c # clipboard to clipboard
        $ html2md # clipboard to stdout
        $ html2md -g # clipboard to stdout using GitHub flavored markdown
        $ echo "<h1>foo</h1>" | html2md # will output to stdout

    Acknowledgments:
        Build on these great modules:
        - https://github.com/domchristie/turndown
        - https://github.com/sindresorhus/clipboardy
        - https://github.com/tj/commander.js


`);
});

if (process.stdin.isTTY) {
	program.parse(process.argv);
	const opts = parseFlags({
		data,
		inPath,
		outPath,
		toClipboard: program.clipboard ? true : false,
		useGfm: program.gfm ? true : false,
	});
	writeOut(opts);
} else {
	process.stdin.on("readable", function (this: any) {
		const chunk = this.read();
		if (chunk !== null) {
			data += chunk;
		}
	});
	process.stdin.on("end", function () {
		program.parse(process.argv);
		const opts = parseFlags({ data, inPath, outPath });
		writeOut(opts);
	});
}
