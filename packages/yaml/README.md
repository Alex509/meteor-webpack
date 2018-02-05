# YAML package for Meteor + Webpack

Meteor package to integrate YAML import (.YAML) with [Webpack](https://atmospherejs.com/webpack/webpack)

## Installation
It's simply a Meteor package, so to install it simply type:

```
meteor add elledienne:yaml
```

Or directly edit your package files adding `elledienne:yaml` on a new line

**Important: this package will only work if you already have `webpack:webpack` installed. If you haven't, just `meteor add webpack:webpack`.***

## Usage
Super easy:

``` javascript
const json = require("json!yaml!./file.yml");
```

Webpack will load your YAML file and return a JS object.


---
Package created by
[Lorenzo De Nobili](https://it.linkedin.com/in/elledienne)
