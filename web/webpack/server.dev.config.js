const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const Dotenv = require('dotenv-webpack');
let nodeModules = {};
const {makeHash} = require('./makeHash');
const id = makeHash(20).toString();
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const pathName = path.resolve(__dirname, '..');

fs.readdirSync(path.resolve(__dirname, '..', 'node_modules'))
	.filter(x => ['.bin'].indexOf(x) === -1)
	.forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });

module.exports = {
	name: 'server',
	entry: `${pathName}/app/server.js`,
	mode: 'development',
	target: 'node',
	context: pathName,
	node: {
		dns: true,
		fs: true,
		path: true,
		url: true,
		console: false,
		global: true,
		process: true,
		__filename: true,
		__dirname: true,
		Buffer: true,
		setImmediate: true,
	},
	externals: nodeModules,
	output: {
		path: pathName,
		filename: 'app.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /.jsx?$/,
				exclude: /node_modules(?!\/react-popper)/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /.json$/,
				use: [
					{
						loader: 'json-loader',
					},
				],
			},
		],
    },
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		moduleExtensions: ['-loader'],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.BUILD_TARGET': JSON.stringify('server'),
			'process.env.NODE_ENV': JSON.stringify('development'),
			__CLIENT__: false,
			__DEVELOPMENT__: true,
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				devtools: 'source-map',
			},
		}),
        new webpack.NoEmitOnErrorsPlugin(),
        new Dotenv({
			path: `${pathName}/.env`,
		}),
	],
};
