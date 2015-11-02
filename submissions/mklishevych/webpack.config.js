var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './src/app'
    ],
    output: {
        path: path.join(__dirname, 'assets', 'js'),
        filename: 'build.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }]
    }
};
