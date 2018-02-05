var weight = 200;

function dependencies(settings) {
  return {
    devDependencies: {
      'style-loader' : '^0.20.0',
      'css-loader': '^0.28.0',
      'extract-text-webpack-plugin': '^3.0.2'
    }
  };
}

function config(settings, require) {
  var cssLoader = '';
  var loaders = [];
  var plugins = [];

  var queries = _.clone(settings.css || {});

  // Support old setting
  if (queries.module) {
    queries.modules = queries.module;
    delete queries.module;
  }

  if (process.env.NODE_ENV !== 'production' && settings.styles && settings.styles.sourceMap) {
    queries.sourceMap = true;
  }

  if (queries.modulesExcludes) {
    delete queries.modulesExcludes;
  }

  if (queries.modules && !queries.localIdentName) {
    queries.localIdentName = '[name]__[local]__[hash:base64:5]';
  }

  if (settings.isDebug) {
    if (settings.platform === 'server') {
      settings.cssLoader = 'css/locals?' + JSON.stringify(queries);
    } else {
      settings.cssLoader = 'style!css?' + JSON.stringify(queries);
    }
  } else {
    if (settings.platform === 'server') {
      settings.cssLoader = 'css/locals?' + JSON.stringify(queries);
    } else {
      settings.cssLoader = 'css?' + JSON.stringify(queries);
      settings.cssExtract = true;
    }
  }

  var cssLoader = settings.cssLoader;

  if (settings.cssExtract) {
    var ExtractTextPlugin = require('extract-text-webpack-plugin');
    plugins.push(new ExtractTextPlugin('style.css'));
    cssLoader = ExtractTextPlugin.extract('style', cssLoader);
  }

  var _mapRegex = function(stringArray) {
    var result = [];
    for (var i = 0, len = stringArray.length; i < len; i++) {
      result.push(new RegExp(stringArray[i]));
    }
    return result;
  };

  // Let postcss control CSS files if it is there
  if (cssLoader && settings.packages.indexOf('webpack:postcss') < 0) {
    if (settings.css && settings.css.modules && settings.css.modulesExcludes) {
      loaders.push({ test: /\.css$/, loader: cssLoader, exclude: _mapRegex(settings.css.modulesExcludes) });
    } else {
      loaders.push({ test: /\.css$/, loader: cssLoader });
    }
  }

  return {
    rules: [{ test: /\.css$/, use: [{ loader: 'css-loader'}] }],
    plugins: plugins,
    extensions: ['.css']
  };
}
