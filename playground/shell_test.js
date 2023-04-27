import { execSync } from "child_process";
import { strict as assert } from "assert";

function main() {
	console.log("Running shell_test.js");
	const out = execSync(`echo "<h1>foo<h1/>" | html2md -c`, {
		shell: "/bin/bash",
	});

	// Perform the assertion on the output
	assert.strictEqual(
		out.toString().trim(),
		"Couldn't find the `xsel` binary and fallback didn't work. On Debian/Ubuntu you can install xsel with: sudo apt install xsel",
	);

	// Log a success message
	console.log("Test passed!");
}

main();
