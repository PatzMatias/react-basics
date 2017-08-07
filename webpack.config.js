var webpack = require("webpack");
var path = require("path")

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");
var PUB_DIR = path.resolve(__dirname, "public");

var config = {
	entry: SRC_DIR + "/app/index.js",
	output: {
		path: DIST_DIR + "/app",
		filename: "bundle.js",
		publicPath: "/app/"
	},
	resolve: {
	  // options for resolving module requests
	  // (does not apply to resolving to loaders)

	  modules: [
	    "node_modules",
	    path.resolve(__dirname, "app")
	  ],
	  // directories where to look for modules

	  extensions: [".js", ".json", ".jsx", ".css"],
	  // extensions that are used

	  alias: {
	    // a list of module name aliases

	    "module": "new-module",
	    // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"

	    "only-module$": "new-module",
	    // alias "only-module" -> "new-module", but not "module/path/file" -> "new-module/path/file"

	    "module": path.resolve(__dirname, "app/third/module.js"),
	    // alias "module" -> "./app/third/module.js" and "module/file" results in error
	    // modules aliases are imported relative to the current context
	  },
	  /* alternative alias syntax (click to show) */

	  /* Advanced resolve configuration (click to show) */
	},

	performance: {
	  hints: "warning", // enum
	  maxAssetSize: 200000, // int (in bytes),
	  maxEntrypointSize: 400000, // int (in bytes)
	  assetFilter: function(assetFilename) {
	    // Function predicate that provides asset filenames
	    return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
	  }
	},

	devtool: "source-map", // enum
	// enhance debugging by adding meta info for the browser devtools
	// source-map most detailed at the expense of build speed.

	context: __dirname, // string (absolute path!)
	// the home directory for webpack
	// the entry and module.rules.loader option
	//   is resolved relative to this directory

	target: "web", // enum
	// the environment in which the bundle should run
	// changes chunk loading behavior and available modules

	externals: ["react"],
	// Don't follow/bundle these modules, but request them at runtime from the environment

	stats: "errors-only",
	module: {
		rules: [{
			test: /\.js?/,
			include: SRC_DIR,
			loader: "babel-loader",
			options: {
				presets: ["react","es2015","stage-2"]
			}

		}]
	},
	devServer: {
		proxy: {
			"/api" : "http://localhost:3000"
		},
		contentBase: SRC_DIR,
		port: 3000,
		hot: true,
		inline: true,
		compress: true,
		historyApiFallback: true,
		https: false,
		noInfo: true,
		open: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()

	]
};

module.exports = config;


