// ABOUTME: Integration tests for the html2md CLI using the Node.js test runner.
// ABOUTME: Verifies real file I/O and stdin/stdout behavior without mocks.

import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const cliPath = path.join(projectRoot, "dist", "html2md.js");

function runCli(args, input) {
	return spawnSync("node", [cliPath, ...args], {
		input,
		encoding: "utf8",
	});
}

function withTempDir(fn) {
	const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "html2md-"));
	try {
		return fn(tempDir);
	} finally {
		fs.rmSync(tempDir, { recursive: true, force: true });
	}
}

test("converts stdin to stdout", () => {
	const result = runCli([], "<h1>Test</h1>");

	assert.equal(result.status, 0);
	assert.equal(result.stdout, "# Test\n");
	assert.equal(result.stderr, "");
});

test("converts input file to stdout", () => {
	withTempDir((tempDir) => {
		const inputPath = path.join(tempDir, "input.html");
		fs.writeFileSync(inputPath, "<h1>Test</h1>");

		const result = runCli(["-i", inputPath], "");

		assert.equal(result.status, 0);
		assert.equal(result.stdout, "# Test\n");
		assert.equal(result.stderr, "");
	});
});

test("writes output file when -o is provided", () => {
	withTempDir((tempDir) => {
		const inputPath = path.join(tempDir, "input.html");
		const outputPath = path.join(tempDir, "output.md");
		fs.writeFileSync(inputPath, "<h1>Test</h1>");

		const result = runCli(["-i", inputPath, "-o", outputPath], "");

		assert.equal(result.status, 0);
		assert.equal(result.stdout, "");
		assert.equal(result.stderr, "");
		assert.equal(fs.readFileSync(outputPath, "utf8"), "# Test");
	});
});

test("converts with gfm when -g is provided", () => {
	withTempDir((tempDir) => {
		const inputPath = path.join(tempDir, "input.html");
		const html = "<p><del>Hi</del> Hello</p>";
		fs.writeFileSync(inputPath, html);

		const result = runCli(["-i", inputPath, "-g"], "");

		assert.equal(result.status, 0);
		assert.equal(result.stdout, "~Hi~ Hello\n");
		assert.equal(result.stderr, "");
	});
});

test("exits with error when input path is missing", () => {
	const result = runCli(["-i", "./missing-file.html"], "");

	assert.equal(result.status, 1);
	assert.equal(
		result.stderr,
		"the specified file path for the input file does not exist\n",
	);
});
