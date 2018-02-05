var weight = 999;

function dependencies() {
  return {
    devDependencies: {
      'url-loader': '1.0.0-beta.0',
      'file-loader': '^1.1.6'
    }
  };
}

function config(settings) {
  var ext = 'svg|ttf|woff2?|eot';

  if (settings.assets && settings.assets.extensions) {
    ext += '|' + settings.assets.extensions.join('|');
  }

  return {
    rules: [
      { test: /\.(png|jpe?g)(\?.*)?$/, use: [{ loader: 'url-loader', options: { limit: (settings.assets && settings.assets.limit) ? settings.assets.limit : 8182 } }] },
      { test: new RegExp('\\.(' + ext + ')(\\?.*)?$'), use: [{ loader: 'file-loader' }] }
    ]
  };
}
