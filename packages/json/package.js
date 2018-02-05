Package.describe({
    name: 'webpack:json',
    version: '2.0.0',
    summary: 'Integrate JSON import with Webpack',
    git: 'https://github.com/thereactivestack/meteor-webpack.git',
    documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use('webpack:core-config@2.0.0');
  api.add_files(['webpack.config.js']);
});
