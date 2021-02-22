module.exports = {
	configureWebpack: {
		resolve: {
			extensions: [],
			alias: {
        '@':'src',
				'assets': 'src/assets',
				'common': 'src/common',
				'components': 'src/components',
				'network': 'src/network',
				'views': 'src/views',
			}
		}
	}
}
