module.exports = {
	"*.ts?(x)": () => 'eslint "./src*/**/*.ts?(x)"',
	// '*.tsx': () => 'tslint',
	"src/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|mdx|graphql|vue)": [
		"prettier --write",
		"git add",
	],
};
