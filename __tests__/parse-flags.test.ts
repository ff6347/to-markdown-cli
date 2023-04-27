import fs from "fs";
import * as clipboardy from "clipboardy";

import { IParseFlagsOptions, parseFlags } from "../src/lib/parse-flags";

jest.mock("fs");

describe("parseFlags", () => {
	const originalIsTTY = process.stdin.isTTY;

	afterEach(() => {
		jest.resetAllMocks();
		jest.restoreAllMocks();
		process.stdin.isTTY = originalIsTTY;
	});

	it("should return the same data when no inPath or toClipboard options are set", () => {
		const options: IParseFlagsOptions = {
			data: "test data",
		};

		const result = parseFlags(options);
		expect(result.data).toEqual(options.data);
	});

	it("should read data from inPath when inPath is set", () => {
		const options: IParseFlagsOptions = {
			data: "",
			inPath: "input.txt",
		};

		const fileContent = "file content";
		(fs.readFileSync as jest.Mock).mockReturnValue(fileContent);

		const result = parseFlags(options);
		expect(fs.readFileSync).toHaveBeenCalledWith(options.inPath, "utf8");
		expect(result.data).toEqual(fileContent);
	});

	it("should return useGfm as true when useGfm option is set", () => {
		const options: IParseFlagsOptions = {
			data: "test data",
			useGfm: true,
		};

		const result = parseFlags(options);
		expect(result.useGfm).toBe(true);
	});

	it("should return useGfm as false when useGfm option is not set", () => {
		const options: IParseFlagsOptions = {
			data: "test data",
		};

		const result = parseFlags(options);
		expect(result.useGfm).toBeUndefined();
	});

	it("should read data from clipboard when toClipboard is set and process.stdin.isTTY is true", async () => {
		const options: IParseFlagsOptions = {
			data: "",
			toClipboard: true,
		};

		const clipboardContent = "clipboard content";
		const clipboardyMock = jest.fn().mockReturnValue(clipboardContent);

		process.stdin.isTTY = true;
		jest.mock("clipboardy", () => {
			return {
				__esModule: true,
				default: {
					...clipboardy,
					readSync: clipboardyMock,
				},
			};
		});

		let parseFlags;
		jest.isolateModules(async () => {
			parseFlags = require("../src/lib/parse-flags").parseFlags;
			await parseFlags(options);
		});

		expect(clipboardyMock).toHaveBeenCalled();
		expect(options.data).toEqual(clipboardContent);
	});

	it("should not read data from clipboard when process.stdin.isTTY is false", async () => {
		const options: IParseFlagsOptions = {
			data: "",
			toClipboard: true,
		};
		process.stdin.isTTY = false;

		const clipboardyMock = {
			readSync: jest.fn(),
		};
		jest.mock("clipboardy", () => clipboardyMock);

		let parseFlags;
		await jest.isolateModules(async () => {
			parseFlags = require("../src/lib/parse-flags").parseFlags;
			await parseFlags(options);
		});

		process.stdin.isTTY = originalIsTTY;
		expect(clipboardyMock.readSync).not.toHaveBeenCalled();
	});

	it("should handle clipboardy.readSync() error and output error message", async () => {
		const options: IParseFlagsOptions = {
			data: "",
			toClipboard: true,
		};
		process.stdin.isTTY = true;
		const stdoutSpy = jest.spyOn(process.stdout, "write").mockImplementation();

		const errorMessage = "Clipboard read error";

		await jest.isolateModules(async () => {
			jest.mock("clipboardy", () => {
				return {
					__esModule: true,
					default: {
						...clipboardy,
						readSync: jest.fn().mockImplementation(() => {
							throw new Error(errorMessage);
						}),
					},
				};
			});

			const { parseFlags } = require("../src/lib/parse-flags");

			parseFlags(options);
			expect(stdoutSpy).toHaveBeenCalledWith(`${errorMessage}\n`);
		});
	});
});
