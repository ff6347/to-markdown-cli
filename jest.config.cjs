module.exports = {
	globals: {
		"ts-jest": {
			tsconfig: "./tsconfig.jest.json",
			diagnostics: false,
		},
	},
	transform: {
		"^.+\\.ts?$": "ts-jest",
	},
	testEnvironment: "node",
	// setupFilesAfterEnv: ['<rootDir>/__tests__/jest.setup.after-env.ts'],
	testRegex: "/__tests__/.*\\.(test|spec)?\\.(ts|tsx)$",
	// globalSetup: '<rootDir>/__tests__/jest.setup.ts',
	// globalTeardown: '<rootDir>/__tests__/jest.teardown.ts',
	moduleFileExtensions: ["js", "json", "jsx", "node", "ts", "tsx"],
	collectCoverage: true,
	coverageReporters: ["lcov", "text"],
	collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/html2md.ts"],
	coverageThreshold: {
		global: {
			branches: 65,
			functions: 75,
			lines: 75,
			statements: 75,
		},
	},
	preset: "ts-jest",
	testMatch: null,
};
