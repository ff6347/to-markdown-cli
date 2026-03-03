// ABOUTME: Defines the flat ESLint configuration for this project.
// ABOUTME: Replaces the legacy eslintrc configuration with flat config.

import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
	...compat.extends(
		"unobtrusive",
		"plugin:prettier/recommended",
		"plugin:@typescript-eslint/recommended",
	),
	{
		files: ["**/*.ts"],
		languageOptions: {
			ecmaVersion: 2018,
			sourceType: "module",
			parser: tsParser,
			globals: {
				...globals.node,
			},
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
			prettier: prettierPlugin,
		},
		rules: {
			"no-console": ["error", { allow: ["warn", "error"] }],
			"prettier/prettier": "error",
			camelcase: "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ args: "after-used", varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
			],
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/interface-name-prefix": "off",
			"@typescript-eslint/no-var-requires": "off",
		},
	},
];
