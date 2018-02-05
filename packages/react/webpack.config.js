var weight = 100;

function dependencies() {
  return {
    dependencies: {

    },
    devDependencies: {

    }
  };
}

function config(settings, require) {
  var fs = require('fs');
  var path = require('path');
  var babelSettings = {};
  var tsConfig = {};

  var CWD = path.resolve('./');

  if (fs.existsSync(CWD + '/.babelrc')) {
    var babelrc = fs.readFileSync(CWD + '/.babelrc');
    babelSettings = JSON.parse(babelrc);
  }

  if (fs.existsSync(CWD + '/tsconfig.json')) {
    var tsConfigData = fs.readFileSync(CWD + '/tsconfig.json');
    tsConfig = JSON.parse(tsConfigData);
  }

  if (!tsConfig.compilerOptions) {
    tsConfig.compilerOptions = {};
  }

  if (typeof tsConfig.compilerOptions.target === 'undefined') { tsConfig.compilerOptions.target = 'es6'; }
  if (typeof tsConfig.compilerOptions.jsx === 'undefined') { tsConfig.compilerOptions.jsx = 'react'; }
  if (typeof tsConfig.compilerOptions.sourceMap === 'undefined') { tsConfig.compilerOptions.sourceMap = true; }
  if (typeof tsConfig.compilerOptions.experimentalDecorators === 'undefined') { tsConfig.compilerOptions.experimentalDecorators = true; }
  if (typeof tsConfig.compilerOptions.module === 'undefined') { tsConfig.compilerOptions.module = 'commonjs'; }

  if (!tsConfig.exclude) { tsConfig.exclude = []; }
  if (tsConfig.exclude.indexOf('node_modules') < 0) { tsConfig.exclude.push('node_modules'); }
  if (tsConfig.exclude.indexOf('.meteor') < 0) { tsConfig.exclude.push('.meteor'); }

  if (!babelSettings.presets) {
    babelSettings.presets = [];
  }

  if (!babelSettings.plugins) {
    babelSettings.plugins = [];
  }

  // if (babelSettings.presets.indexOf('react') < 0) {
  //   babelSettings.presets.push('react');
  // }
  //
  // if (babelSettings.presets.indexOf('es2015') < 0) {
  //   babelSettings.presets.push('es2015');
  // }
  //
  // if (babelSettings.presets.indexOf('stage-0') < 0 &&
  //     babelSettings.presets.indexOf('stage-1') < 0 &&
  //     babelSettings.presets.indexOf('stage-2') < 0 &&
  //     babelSettings.presets.indexOf('stage-3') < 0) {
  //   babelSettings.presets.push('stage-0');
  // }

  if (settings.babel && settings.babel.plugins) {
    babelSettings.plugins = babelSettings.plugins.concat(settings.babel.plugins);
  }

  if (babelSettings.plugins.indexOf('transform-decorators-legacy') < 0) {
    babelSettings.plugins.push('transform-decorators-legacy');
  }

  if (babelSettings.plugins.indexOf('add-module-exports') < 0) {
    babelSettings.plugins.push('add-module-exports');
  }

  if (settings.isDebug && settings.platform !== 'server' && !IS_TEST) {
    var transforms = [{
      transform: 'react-transform-hmr',
      imports: ['react'],
      locals: ['module']
    }];

    if (settings.babel && !settings.babel.disableRedbox) {
      transforms.push({
        transform: 'react-transform-catch-errors',
        imports: ['react', 'redbox-react']
      });
    }

    babelSettings.plugins.push(['react-transform', { transforms: transforms }]);
  }

  var usingMeteorReact = settings.packages.indexOf('react-runtime') >= 0;
  var extensions = ['.js', '.jsx'];
  var loaders =
      [
    // { test: /\/node_modules\/react\/react\.js$/,
    //   use: [{
    //   loader: 'expose-loader',
    //   options: 'React'
    // }]
    // },
    { test: /\.jsx?$/,
      exclude: /\.meteor|node_modules/,
      use: [{ loader: 'babel-loader', options: {
        presets: [[require('@babel/preset-env'), {
          "targets" : {
            "browsers": ["chrome >= 34", "safari >= 9", "ie >= 11", "edge >= 12","opera >= 16", "> 1%"]
          }
        }], require('@babel/preset-stage-0'), require('@babel/preset-react'), require('@babel/preset-flow')],
        plugins: [require('@babel/plugin-transform-async-to-generator'), require('@babel/plugin-transform-modules-commonjs')] } }]
  }];

  // if (settings.packages.indexOf('webpack:typescript') >= 0) {
  //   loaders.push({ test: /\.tsx$/, loader: 'babel?' + JSON.stringify(babelSettings) + '!ts?' + JSON.stringify(tsConfig), exclude: /\.meteor|node_modules/ });
  //   extensions.push('.tsx');
  // }

  var externals = {};

  // console.log(require('util').inspect(loaders, { depth: 9, colors: true }));

  if (settings.isTest || settings.isAppTest) {
    // Support for Enzyme
    externals['react/addons'] = true;
    externals['react/lib/ExecutionEnvironment'] = true;
    externals['react/lib/ReactContext'] = true;
  }
  return {
    rules: loaders,
    extensions: extensions,
    externals: externals
  };
}
