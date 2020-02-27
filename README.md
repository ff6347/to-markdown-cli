# to-markdown-cli

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg)](#contributors) [![Build Status](https://travis-ci.com/fabianmoronzirfas/to-markdown-cli.svg?branch=master)](https://travis-ci.com/fabianmoronzirfas/to-markdown-cli)

## Installation

    npm install -g to-markdown-cli

## Usage


```text
      Usage: html2md [options]

      Options:

        -h, --help             output usage information
        -V, --version          output the version number
        -i, --input <input>    path to the input file
        -o, --output <output>  path to the output file
        -c, --clipboard        use the clipboard only. All other options will be dismissed
        -g, --gfm              use GitHub Flavored Markdown


        html2md turns html into markdown
        if no input file is given it uses the clipboard content
        if no output file is given it logs the result to stdout

        Optional Options:
            -i, --input <input> path to the input file
            -o, --output <output> path to the output file

        Examples:
            $ html2md -i ./foo.html <= output to stdout
            $ html2md -i ./foo.html -o out.md <= output to out.md
            $ html2md -o out.md <= clipboard to out.md
            $ html2md <= clipboard to stdout
```


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

## Acknowledgements:

Build on these great modules:

- [domchristie/turndown: An HTML to Markdown converter written in JavaScript](https://github.com/domchristie/turndown)
- [sindresorhus/clipboardy: Access the system clipboard (copy/paste)](https://github.com/sindresorhus/clipboardy)
- [tj/commander.js: node.js command-line interfaces made easy](https://github.com/tj/commander.js)


## License

Copyright (c)  2017 Fabian Morón Zirfas
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software  without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to  permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

see also http://www.opensource.org/licenses/mit-license.php
