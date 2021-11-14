# to-markdown-cli

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg)](#contributors) ![Node CI](https://github.com/fabianmoronzirfas/to-markdown-cli/workflows/Node%20CI/badge.svg) ![npm](https://img.shields.io/npm/v/to-markdown-cli?color=green) ![GitHub last commit](https://img.shields.io/github/last-commit/fabianmoronzirfas/to-markdown-cli)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ffabianmoronzirfas%2Fto-markdown-cli.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Ffabianmoronzirfas%2Fto-markdown-cli?ref=badge_shield)

## Installation

    npm install -g to-markdown-cli

## Usage

```plain
Usage: html2md [options]

Options:
  -V, --version          output the version number
  -i, --input <input>    path to the input file (if input is stdin) it will be ignored
  -o, --output <output>  path to the output file
  -c, --clipboard        use only the clipboard for input and output
  -g, --gfm              use GitHub Flavored Markdown
  -h, --help             output usage information

     _   _   _   _   _   _   _
    / \ / \ / \ / \ / \ / \ / \
   ( h | t | m | l | 2 | m | d )
    \_/ \_/ \_/ \_/ \_/ \_/ \_/

    html2md turns html into markdown

    - if no input file is given it ueses the clipboard content
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
```

## Troubleshooting

The following error indicates that `$DISPLAY` is not set to a valid display: `Error: Both xsel and fallback failed` 

**html2md** relies on a valid `$DISPLAY` because it uses clipboard via **xsel**. 
   In some environments (for example, **tmux**) you may need to run the command as follows:

```plain
DISPLAY=:0 html2md ...  # or whatever your display id is.
```
Fully headless systems may not be able to use **html2md**.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://roose.kz"><img src="https://avatars3.githubusercontent.com/u/277651?v=4" width="128px;" alt=""/><br /><sub><b>roose</b></sub></a><br /><a href="https://github.com/fabianmoronzirfas/to-markdown-cli/commits?author=roose" title="Code">💻</a></td>
    <td align="center"><a href="https://fabianmoronzirfas.me"><img src="https://avatars3.githubusercontent.com/u/315106?v=4" width="128px;" alt=""/><br /><sub><b>Fabian Morón Zirfas</b></sub></a><br /><a href="https://github.com/fabianmoronzirfas/to-markdown-cli/commits?author=fabianmoronzirfas" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/cayhorstmann"><img src="https://avatars0.githubusercontent.com/u/432187?v=4" width="128px;" alt=""/><br /><sub><b>cayhorstmann</b></sub></a><br /><a href="https://github.com/fabianmoronzirfas/to-markdown-cli/issues?q=author%3Acayhorstmann" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Test

```bash
npm run test
```

## Acknowledgements

Build on these great modules:

- [domchristie/turndown: An HTML to Markdown converter written in JavaScript](https://github.com/domchristie/turndown)
- [sindresorhus/clipboardy: Access the system clipboard (copy/paste)](https://github.com/sindresorhus/clipboardy)
- [tj/commander.js: node.js command-line interfaces made easy](https://github.com/tj/commander.js)

## License

Copyright (c)  2017-2020 Fabian Morón Zirfas
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software  without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to  permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

see also http://www.opensource.org/licenses/mit-license.php


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ffabianmoronzirfas%2Fto-markdown-cli.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Ffabianmoronzirfas%2Fto-markdown-cli?ref=badge_large)
