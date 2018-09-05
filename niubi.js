var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	entry: path.join(__dirname,'./src/main.js'),
	outport: {
		path: path.join(__dirname,'./dist'),
		,filename: 'bundle.js'
	},
	plugins: [
		new htmlWebpackPlugin({
			template: path.join(__dirname,'./src/index.html'),
			filename: 'index.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			},

		]
	},
	resolve: {
		alias: {
/*			'vue$': 'vue/dist/vue.js'*/
		}
	}
}