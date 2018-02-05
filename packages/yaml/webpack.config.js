var weight = 500;

function dependencies(settings) {
  return {
    devDependencies: {
      'yaml-loader' : '^0.5.0'
    }
  };
}

function config() {
  return {
    rules: [{ test: /\.yaml$/, use: [ { loader: 'bundle-loader'}, { loader: 'json-loader' },{ loader: 'yaml-loader', options:  { include: path.resolve('data') }} ] }],
    extensions: ['.yaml']
  };
}
