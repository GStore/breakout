const nodeexternals = require('webpack-node-externals');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


module.exports = () => {
   
    let configure = {
        context: __dirname,
        entry: path.resolve(__dirname, path.join("src", "main.ts")),

        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, '../dist'),
            library: "api",
            libraryTarget: "umd"
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
        },

        module: {
            rules: [{ 
              test: /\.(ts|js)x?$/, 
              loader: 'babel-loader',
              exclude: /node_modules/ }],
        },

        plugins: [new ForkTsCheckerWebpackPlugin()],
        externals: [nodeexternals()],
        mode: process.env.NODE_ENV || 'development',
        target: 'node',
    };
    return configure;

};
