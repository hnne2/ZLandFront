module.exports = {
	extends: ['stylelint-config-standard-scss', 'stylelint-prettier/recommended'],
	plugins: [],
	rules: {
		'block-no-empty':  process.env.NODE_ENV === 'production'  ? true : null,
		'color-hex-length': 'long'
	},
	overrides: [
		{
			files: ['*.vue'],
			customSyntax: 'postcss-html'
		}
	]
}
