import fs from "fs";
import clipboardy from "clipboardy";
import { writeOut } from "../src/lib/write-out";

jest.mock("fs");
jest.mock("clipboardy");

describe("writeOut", () => {
	afterEach(() => {
		jest.resetAllMocks();
		jest.restoreAllMocks();
	});

	it("should write data to clipboard when toClipboard is true", () => {
		const options = {
			data: "<h1>Test</h1>",
			useGfm: true,
			toClipboard: true,
		};

		writeOut(options);
		expect(clipboardy.writeSync).toHaveBeenCalledWith("# Test\n");
	});

	it("should handle gfm features task list", () => {
		const options = {
			data: `<ul><li><input disabled="" type="checkbox">foo</li><li><input checked="" disabled="" type="checkbox">bar</li></ul>`,
			useGfm: true,
		};

		const stdoutSpy = jest.spyOn(process.stdout, "write").mockImplementation();

		writeOut(options);
		expect(stdoutSpy).toHaveBeenCalledWith("-   [ ] foo\n-   [x] bar\n");
	});

	it("should handle gfm features strike through", () => {
		const options = {
			data: "<p><del>Hi</del> Hello, <del>there</del> world!</p>",
			useGfm: true,
		};

		const stdoutSpy = jest.spyOn(process.stdout, "write").mockImplementation();

		writeOut(options);
		expect(stdoutSpy).toHaveBeenCalledWith("~Hi~ Hello, ~there~ world!\n");
	});

	it("should handle gfm features table", () => {
		const options = {
			data: `<table>
      <thead>
      <tr>
      <th>foo</th>
      <th>bar</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>baz</td>
      <td>bim</td>
      </tr>
      </tbody>
      </table>`,
			useGfm: true,
		};

		const stdoutSpy = jest.spyOn(process.stdout, "write").mockImplementation();

		writeOut(options);
		expect(stdoutSpy).toHaveBeenCalledWith(
			"| foo | bar |\n| --- | --- |\n| baz | bim |\n",
		);
	});

	it("should write data to stdout when outPath is undefined", () => {
		const options = {
			data: "<h1>Test</h1>",
			useGfm: true,
		};

		const stdoutSpy = jest.spyOn(process.stdout, "write").mockImplementation();

		writeOut(options);
		expect(stdoutSpy).toHaveBeenCalledWith("# Test\n");
	});

	it("should write data to file when outPath is defined", () => {
		const options = {
			data: "<h1>Test</h1>",
			useGfm: true,
			outPath: "output.md",
		};

		writeOut(options);
		expect(fs.writeFileSync).toHaveBeenCalledWith(
			options.outPath,
			"# Test",
			"utf8",
		);
	});

	it("should handle clipboardy.writeSync() error and output error message", () => {
		const options = {
			data: "<h1>Test</h1>",
			useGfm: true,
			toClipboard: true,
		};

		const errorMessage = "Clipboard write error";
		(clipboardy.writeSync as jest.Mock).mockImplementation(() => {
			throw new Error(errorMessage);
		});

		const stdoutSpy = jest.spyOn(process.stdout, "write").mockImplementation();

		writeOut(options);
		expect(stdoutSpy).toHaveBeenCalledWith(`${errorMessage}\n`);
	});
});
