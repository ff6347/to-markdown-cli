#!/usr/bin/env node
/* eslint no-undefined: "off" */
// @ts-ignore
const fs = require('fs');
// @ts-ignore
const path = require('path');

const program = require('commander');
// @ts-ignore
const TurndownService = require('turndown');
// @ts-ignore
const turndownPluginGfm = require('turndown-plugin-gfm');
const clipboardy = require('clipboardy');

const turndownService = new TurndownService();
const gfm = turndownPluginGfm.gfm;

// @ts-ignore
const pkg = require('./package.json');

let inPath = null;
let outPath = null;
// let toStdout = true;
let data = '';

function parseInPath (val) {
  // @ts-ignore
  if (fs.existsSync(path.resolve(process.cwd(), val))) {
    inPath = val;
  } else {
    console.log('the specified file path for the input file does not exist');
    // process.exit(1);
  }
}

function parseOutPath (val) {
  outPath = val;
}

program
  .version(pkg.version)
  .option('-i, --input <input>', 'path to the input file', parseInPath)
  .option('-o, --output <output>', 'path to the output file', parseOutPath)
  .option('-c, --clipboard', 'use only the clipboard for input and output')
  .option('-g, --gfm', 'use GitHub Flavored Markdown');

program.on('--help', () => {
  console.log('');
  console.log('    html2md turns html into markdown');
  console.log('    if no input file is given it ueses the clipboard content');
  console.log('    if no output file is given it logs the result to stdout');
  console.log('');
  console.log('    Optional Options:');
  console.log('        -i, --input <input>', 'path to the input file');
  console.log('        -o, --output <output>', 'path to the output file');
  console.log('        -c, --clipboard', 'use the clipboard only. All other options will be dismissed');
  console.log('        -g, --gfm', 'use GitHub Flavored Markdown');
  console.log('');
  console.log('    Examples:');
  console.log('        $ html2md -i ./foo.html # output to stdout');
  console.log('        $ html2md -i ./foo.html -o out.md # output to out.md');
  console.log('        $ html2md -o out.md # clipboard to out.md');
  console.log('        $ html2md -c # clipboard to clipboard');
  console.log('        $ html2md # clipboard to stdout');
  console.log('        $ html2md -g # clipboard to stdout using GitHub flavored markdown');

  console.log('');
  console.log('    Acknowledgments:');
  console.log('        Build on these great modules:');
  console.log('        - https://github.com/domchristie/turndown');
  console.log('        - https://github.com/sindresorhus/clipboardy');
  console.log('        - https://github.com/tj/commander.js');
  console.log('');
});
// @ts-ignore
program.parse(process.argv);

if (program.gfm !== undefined) {
  turndownService.use(gfm);
}
if (program.clipboard !== undefined) {
  data = clipboardy.readSync();
  // @ts-ignore
  data = turndownService.turndown(data);
  clipboardy.writeSync(data);
  // @ts-ignore
  process.exit(0);
}

if (program.input !== undefined) {
  data = fs.readFileSync(inPath, 'utf8');
} else {
  data = clipboardy.readSync();
}
if (program.output !== undefined) {
  // @ts-ignore
  fs.writeFile(outPath, turndownService.turndown(data), 'utf8', (error, md) => {
    if (error) {
      throw error;
    }
    console.log(`wrote to ${outPath}`);
  });
} else {
  // @ts-ignore
  console.log(turndownService.turndown(data));
}
