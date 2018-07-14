require('babel-polyfill');
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const Dotenv = require('dotenv-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({
	filename: '[name]-app.css',
	allChunks: true,
});
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const pathName = path.join(__dirname, '..');

module.exports = {
	name: 'client',
	mode: 'production',
	context: pathName,
	entry: {
		// LEAVE HERE FOR CLI: Webpack Client
		main: [
			'tether',
			`font-awesome-loader`,
			`bootstrap-loader/lib/bootstrap.loader?bootstrapPath=${pathName}/node_modules/bootstrap&extractStyles&configFilePath=${pathName}/bootstrap/main/bs4.yml!bootstrap-loader/no-op.js`,
			`${pathName}/app/mainPages`,
        ],
        api: [
			'tether',
			`font-awesome-loader`,
			`bootstrap-loader/lib/bootstrap.loader?bootstrapPath=${pathName}/node_modules/bootstrap&extractStyles&configFilePath=${pathName}/bootstrap/main/bs4.yml!bootstrap-loader/no-op.js`,
			`${pathName}/app/mainPages`,
		],
		public: [
			'tether',
			`font-awesome-loader`,
			`bootstrap-loader/lib/bootstrap.loader?bootstrapPath=${pathName}/node_modules/bootstrap&extractStyles&configFilePath=${pathName}/bootstrap/public/bs4.yml!bootstrap-loader/no-op.js`,
			`${pathName}/app/publicPages`,
		],
	},
	target: "web",
	output: {
		path: path.resolve(__dirname, '..', 'assets', 'dist'),
		filename: '[name]-app.js',
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
					use: ['css-loader', 'sass-loader', 'postcss-loader'],
				}),
			},
			{
				test: /.less$/,
				use: extractCSS.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'less-loader', 'postcss-loader'],
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
		extensions: ['*', '.js', '.jsx', '.json', '.css', '.scss', '.sass'],
		moduleExtensions: ['-loader'],
    },
	plugins: [
		new webpack.DefinePlugin({
            'process.env.BUILD_TARGET': JSON.stringify('client'),
            'process.env.NODE_ENV': JSON.stringify('production'),
            __CLIENT__: true,
			__DEVELOPMENT__: false,
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
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
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
		new Dotenv({
			path: `${pathName}/.env`,
        }),
        new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/,
			cssProcessorOptions: { discardComments: { removeAll: true } },
		}),
	],
};
