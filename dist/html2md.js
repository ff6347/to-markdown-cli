#!/usr/bin/env node
"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const commander_1 = __importDefault(require("commander"));
const parse_flags_1 = require("./lib/parse-flags");
const pkg = JSON.parse(
	fs_1.default.readFileSync(
		path_1.default.resolve(__dirname, "../package.json"),
		"utf8",
	),
);
let inPath = undefined;
let outPath = undefined;
let data = "";
function parseInPath(val) {
	if (fs_1.default.existsSync(path_1.default.resolve(process.cwd(), val))) {
		inPath = val;
	} else {
		process.stderr.write(
			"the specified file path for the input file does not exist\n",
		);
		process.exit(1);
	}
}
function parseOutPath(val) {
	outPath = val;
}
commander_1.default
	.version(pkg.version)
	.option(
		"-i, --input <input>",
		"path to the input file (if input is stdin) it will be ignored",
		parseInPath,
	)
	.option("-o, --output <output>", "path to the output file", parseOutPath)
	.option("-c, --clipboard", "use only the clipboard for input and output")
	.option("-g, --gfm", "use GitHub Flavored Markdown");
commander_1.default.on("--help", () => {
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
	commander_1.default.parse(process.argv);
	(0, parse_flags_1.parseFlags)({
		data,
		inPath,
		outPath,
		toClipboard: commander_1.default.clipboard ? true : false,
		useGfm: commander_1.default.gfm ? true : false,
	});
} else {
	process.stdin.on("readable", function () {
		const chunk = this.read();
		if (chunk !== null) {
			data += chunk;
		}
	});
	process.stdin.on("end", function () {
		commander_1.default.parse(process.argv);
		(0, parse_flags_1.parseFlags)({ data, inPath, outPath });
	});
}
//# sourceMappingURL=html2md.js.map
