import {expect, test} from '@oclif/test';
// import mock = require('mock-fs');

import cmd = require('../src');

// mock({'../fake': {'index.html': '<h1>hello world</h1>'}});

describe('to-markdown-cli', () => {
  test
    .stdout()
    .do(() => cmd.run([]))
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world');
    });

  test
    .stdout()
    .do(() => cmd.run(['--name', 'jeff']))
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff');
    });
  test
    .stdout()
    .do(() => cmd.run(['-c']))
    .it('runs html2md -c with clipboard i/o', ctx => {
      expect(ctx.stdout).to.contain('');
    });
  test
    .stdout()
    .do(() => cmd.run(['-c']))
    .it('runs html2md -c with clipboard i/o', ctx => {
      expect(ctx.stdout).to.contain('');
    });
  test
    .stdout()
    .do(() => cmd.run(['-c']))
    .it('runs html2md -i ./fake/dir/index.html', ctx => {
      expect(ctx.stdout).to.contain('# hello world');
      // after a test runs
      // mock.restore();
    });
  // test.finally(() => mock.restore());

});
