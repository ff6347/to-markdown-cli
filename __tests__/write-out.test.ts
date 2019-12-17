import { writeOut } from '../src/lib/write-out';
import fs from 'fs';
import path from 'path';
import clipboardy from 'clipboardy';
// jest.mock('fs');

const mockProcessExit = jest.spyOn(process, 'exit').mockImplementation();
const mockClippyWrite = jest.spyOn(clipboardy, 'writeSync');
afterAll(() => {
  jest.restoreAllMocks();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('writeOut test', () => {
  test('should write to stdout', () => {
    const mockStdout = jest.spyOn(process.stdout, 'write').mockImplementation();
    writeOut({ data: '<h1>foo</h1>' });
    expect(mockStdout).toHaveBeenCalledTimes(1);
    mockStdout.mockRestore();
  });

  test('should write to file mocked', () => {
    const mockStdout = jest.spyOn(process.stdout, 'write').mockImplementation();
    const mockFsWrite = jest.spyOn(fs, 'writeFile');
    writeOut({ data: '<h1>foo</h1>', outPath: '/tmp/foo' });
    expect(mockFsWrite).toHaveBeenCalledTimes(1);
    mockFsWrite.mockRestore();
    mockStdout.mockRestore();
  });

  test('should really write to file', () => {
    const mockStdout = jest.spyOn(process.stdout, 'write').mockImplementation();
    const outPath = path.resolve(
      process.cwd(),
      '__tests__/files/write-out-test.md',
    );
    writeOut({ data: '<h1>foo</h1>', outPath });
    expect(fs.existsSync(outPath)).toBe(true);
    mockStdout.mockRestore();
  });

  test('should write to clipboard', () => {
    const mockStdout = jest.spyOn(process.stdout, 'write').mockImplementation();
    writeOut({ data: '<h1>foo</h1>', toClipboard: true });
    expect(mockClippyWrite).toHaveBeenCalledTimes(1);
    expect(mockProcessExit).toHaveBeenCalledTimes(1);
    // expect(mockStdout).toHaveBeenCalledTimes(0);
    mockStdout.mockRestore();
  });

  // eslint-disable-next-line jest/no-focused-tests
  test('should write gfm ()', () => {
    const mockStdout = jest.spyOn(process.stdout, 'write');
    writeOut({ data: '<del>foo</del>', usegfm: true });
    expect(mockStdout).toHaveBeenCalledTimes(1);
    expect(mockStdout.mock.calls[0][0]).toBe('~foo~\n');
    mockStdout.mockRestore();
  });
});
