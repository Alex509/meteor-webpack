Package.describe({
    name: 'webpack:react',
    version: '2.0.0',
    summary: 'Integrate React with Webpack',
    git: 'https://github.com/Alex509/meteor-webpack.git',
    documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use([
    'webpack:core-config@2.0.0'
  ]);

  api.add_files(['webpack.config.js']);
});
