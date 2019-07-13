- Webpack is a static module bundler
- A module in webpack terminology is a generic term for any JS file really.
- A collection of modules are referred to as a Bundle
- The webpack community builds 'Loaders' to convert non-JS files into modules.

# Core Concepts (4):

## Entry:
1. Indicates which module webpack should use to begin building out its internal dependency graph. default is './src/index.js'.
2. webpack will then figure out the other modules/libs that this entrypoint depends on.

## Output:
1. tells webpack where to 'emit' the bundles it creates and how to name those files. default is './dist/main.js' for the main output file, the '/dist' folder for others.
2. **THIS IS THE HTML THE CLIENT WILL SEE**

## Loaders:
1. let webpack process non-JS files (by default it can only process JS files)

## Plugins:
1. can be used to leverage a wider range of tasks like bundle optimization, asset management and injection of env vars.

# Getting Started:
- npm install webpack, webpack-cli, and webpack-dev-server
- create webpack.config.js file
