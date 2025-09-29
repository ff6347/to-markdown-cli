import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import jest from "eslint-plugin-jest";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	js.configs.recommended,
	...compat.extends(
		"unobtrusive",
		"plugin:jest/recommended",
		"plugin:prettier/recommended",
		"plugin:@typescript-eslint/recommended",
	),
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
			parser: tsParser,
			ecmaVersion: 2018,
			sourceType: "module",
		},
		plugins: {
			"@typescript-eslint": typescriptEslint,
			prettier,
			jest,
		},
		rules: {
			"no-console": [
				"error",
				{
					allow: ["warn", "error"],
				},
			],
			"prettier/prettier": "error",
			camelcase: "off",
			"jest/no-disabled-tests": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					args: "after-used",
					varsIgnorePattern: "^_",
					argsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-var-requires": "off",
		},
	},
];
