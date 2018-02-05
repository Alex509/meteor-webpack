Package.describe({
    name: 'webpack:css',
    version: '2.0.0',
    summary: 'Integrate CSS import with Webpack',
    git: 'https://github.com/thereactivestack/meteor-webpack.git',
    documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use('webpack:core-config@2.0.0');
  api.add_files(['webpack.config.js']);
});
