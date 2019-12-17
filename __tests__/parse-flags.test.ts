import { IParseFlagsOptions } from './../src/lib/parse-flags';
import * as writer from '../src/lib/write-out';
import clipboardy from 'clipboardy';
import { parseFlags } from '../src/lib/parse-flags';
import fs from 'fs';

jest.spyOn(process.stdout, 'write').mockImplementation();
afterAll(() => {
  jest.restoreAllMocks();
});
describe('testing parse flags function', () => {
  test('write out call', () => {
    const writeOutMock = jest.spyOn(writer, 'writeOut');
    parseFlags({
      data: '<h1>foo</h1>',
      inPath: undefined,
      outPath: undefined,
    });
    expect(writeOutMock).toHaveBeenCalledTimes(1);
    writeOutMock.mockRestore();
  });

  test('input from file', () => {
    const mockOut = jest.spyOn(process.stdout, 'write');
    const options: IParseFlagsOptions = {
      data: '',
      inPath: '__tests__/files/index.html',
    };
    parseFlags(options);
    expect(mockOut.mock.calls[0][0]).toBe('foo\n===\n');
    mockOut.mockRestore();
  });

  test('input from file fs read', () => {
    const orig = process.stdin.isTTY;
    process.stdin.isTTY = true;
    const mockFsReadSync = jest.spyOn(fs, 'readFileSync');
    const options: IParseFlagsOptions = {
      data: '',
      inPath: '__tests__/files/index.html',
    };
    parseFlags(options);
    expect(mockFsReadSync).toHaveBeenCalled();
    mockFsReadSync.mockRestore();
    process.stdin.isTTY = orig;
  });

  test('set and write to clipboard', () => {
    const orig = process.stdin.isTTY;
    process.stdin.isTTY = true;
    jest.spyOn(process, 'exit').mockImplementation();
    const mockClippy = jest.spyOn(clipboardy, 'writeSync');
    const data = '<h1>foo</h1>';
    clipboardy.writeSync(data);
    const options: IParseFlagsOptions = {
      data: '',
      toClipboard: true,
    };
    parseFlags(options);
    expect(mockClippy).toHaveBeenCalled();
    expect(clipboardy.readSync()).toBe('foo\n===\n');
    process.stdin.isTTY = orig;
  });
});
