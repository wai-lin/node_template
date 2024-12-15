/**
 * @type {import("prettier").Config}
 */
export default {
	semi: true,
	useTabs: true,
	trailingComma: "all",
	singleQuote: false,
	endOfLine: "lf",
	quoteProps: "consistent",
	plugins: ["prettier-plugin-organize-imports"],
};
