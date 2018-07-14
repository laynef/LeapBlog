require('babel-polyfill');
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const TimeFixPlugin = require('time-fix-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const extractCSS = new ExtractTextPlugin({
	filename: '[name]-app.css',
	allChunks: true,
});

const pathName = path.join(__dirname, '..');

module.exports = {
	name: 'client',
	mode: 'development',
	context: pathName,
	entry: {
		// LEAVE HERE FOR CLI: Webpack Client
		main: [
			'webpack-hot-middleware/client',
			'tether',
			`font-awesome-loader`,
			`bootstrap-loader/lib/bootstrap.loader?bootstrapPath=${pathName}/node_modules/bootstrap&extractStyles&configFilePath=${pathName}/bootstrap/main/bs4.yml!bootstrap-loader/no-op.js`,
			`${pathName}/app/mainPages`,
        ],
        api: [
			'webpack-hot-middleware/client',
			'tether',
			`font-awesome-loader`,
			`bootstrap-loader/lib/bootstrap.loader?bootstrapPath=${pathName}/node_modules/bootstrap&extractStyles&configFilePath=${pathName}/bootstrap/main/bs4.yml!bootstrap-loader/no-op.js`,
			`${pathName}/app/mainPages`,
		],
		public: [
			'webpack-hot-middleware/client',
			'tether',
			`font-awesome-loader`,
			`bootstrap-loader/lib/bootstrap.loader?bootstrapPath=${pathName}/node_modules/bootstrap&extractStyles&configFilePath=${pathName}/bootstrap/public/bs4.yml!bootstrap-loader/no-op.js`,
			`${pathName}/app/publicPages`,
		],
	},
	output: {
		path: path.resolve(__dirname, '..', 'assets', 'dist'),
		filename: '[name]-app.js',
		publicPath: '/',
	},
	target: "web",
	module: {
		rules: [
			{
				test: /.jsx?$/,
				exclude: /node_modules(?!\/react-popper)/,
				include: [
					path.resolve(`${__dirname}/../app/mainPages`),
					path.resolve(`${__dirname}/../app/publicPages`),
					path.resolve(`${__dirname}/../app/redux`),
					path.resolve(`${__dirname}/../app/utils`),
					path.resolve(`${__dirname}/../assets`),
				],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['react-hmre'],
							"plugins": [
								["react-transform", {
									"transforms": [{
									"transform": "react-transform-hmr",
									"imports": ["react"],
									"locals": ["module"],
								}],
							}]],
						},
					},
				],
			},
			{
				test: /.css$/,
				use: extractCSS.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader'],
				}),
			},
			{
				test: /.s[ac]ss$/,
				use: extractCSS.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'sass-loader', 'sass-resources-loader'],
				}),
			},
			{
				test: /.less$/,
				use: extractCSS.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'less-loader'],
				}),
			},
			{
				test: /.json$/,
				use: [
					{
						loader: 'json-loader',
					},
				],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000',
			},
			{
				test: /bootstrap\/dist\/js\/umd\//,
				use: 'imports-loader?jQuery=jquery',
			},
		],
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json', '.scss', '.sass', '.css'],
		moduleExtensions: ['-loader'],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.BUILD_TARGET': JSON.stringify('client'),
			'process.env.NODE_ENV': JSON.stringify('development'),
			__CLIENT__: true,
			__DEVELOPMENT__: true,
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				devtools: 'eval-source-map',
				postcss: [autoprefixer],
			},
		}),
		new webpack.ProvidePlugin({
			Popper: ['popper.js', 'default'],
			Tooltip: ['tooltip.js', 'default'],
			PropTypes: 'prop-types',
			$: 'jquery',
			jQuery: 'jquery',
			jquery: 'jquery',
			"window.jQuery": "jquery",
			Tether: "tether",
			"window.Tether": "tether",
			Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
			Button: "exports-loader?Button!bootstrap/js/dist/button",
			Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
			Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
			Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
			Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
			Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
			Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
			Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
			Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
			Util: "exports-loader?Util!bootstrap/js/dist/util",
		}),
		extractCSS,
		new Dotenv({
			path: `${pathName}/.env`,
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new TimeFixPlugin(),
		new WriteFilePlugin(),
	],
};
