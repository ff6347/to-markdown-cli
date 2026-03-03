module.exports = {
	extends: [
		"unobtrusive",
		"plugin:prettier/recommended",
		"prettier/@typescript-eslint",
		"plugin:@typescript-eslint/recommended",
	],
	env: {
		node: true,
	},
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "prettier"],
	parserOptions: {
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: "module", // Allows for the use of imports
	},
	rules: {
		"no-console": ["error", { allow: ["warn", "error"] }],
		"prettier/prettier": "error",
		camelcase: "off",
		"@typescript-eslint/camelcase": ["error", { properties: "never" }],
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{ args: "after-used", varsIgnorePattern: "^_" },
		],
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
};
