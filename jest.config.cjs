module.exports = {
	transform: {
		"\\.[jt]sx?$": "ts-jest",
	},
	globals: {
		"ts-jest": {
			useESM: true,
		},
	},
	moduleNameMapper: {
		"(.+)\\.js": "$1",
	},
	preset: "ts-jest",
	testEnvironment: "node",
	extensionsToTreatAsEsm: [".ts"],
};
