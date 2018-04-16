Package.describe({
    name: 'alex509:webpack',
    version: '2.0.0',
    summary: 'Seamlessly integrate Webpack to improve Meteor build system',
    git: 'https://github.com/Alex509/meteor-webpack.git',
    documentation: 'README.md'
});

Package.registerBuildPlugin({
    name: 'alex509:webpack',
    use: [
      'meteor',
      'ecmascript@0.1.5',
      'webpack:npmworkaround@1.0.0'
    ],
    sources: [
      'plugin/WebpackSourceMapFix.js',
      'plugin/WebpackCompiler.js',
      'plugin/webpack-plugin.js'
    ],
    npmDependencies: {
      'webpack': '3.10.0',
      'connect': '3.4.1',
      'cors': '2.7.1',
      'webpack-dev-middleware': '2.0.4',
      'webpack-hot-middleware': '2.10.0',
      'webpack-node-externals': '1.5.4',
      'memory-fs': '0.3.0',
      'circular-dependency-plugin' : '4.4.0'
    }
});

Package.onUse(function(api) {
    api.versionsFrom('1.3');

    api.use('isobuild:compiler-plugin@1.0.0');
    api.use('webpack:reload@1.0.1');

    api.use('webpack:assets@2.0.0');
    api.use('webpack:css@2.0.0');
    api.use('webpack:json@2.0.0');

    // Meteor polyfill for ecmascript and Promise
    api.imply('ecmascript-runtime@0.2.6');
    api.imply('promise@0.5.1');
});
