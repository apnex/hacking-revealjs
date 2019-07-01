const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	context: __dirname,
	entry: "./example.html",
	output: {
		path: __dirname + "/build",
		filename: "scripts.min.js"
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: 'html-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inlineSource: '.(js|css)$' // embed all javascript and css inline
		}),
		new HtmlWebpackInlineSourcePlugin()
	]
};
/*		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
*/
