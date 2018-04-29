const babelConfig = require('dolittle.javascript.build/.babelrc.js')();
const path = require('path');
const AureliaPlugin = require('aurelia-webpack-plugin').AureliaPlugin;
const DefinePlugin = require('webpack').DefinePlugin;
const wallabyWebpack = require('wallaby-webpack');

module.exports = (wallaby) => {

    const wallabyPostprocessor = wallabyWebpack({
        entryPatterns: ['setup.js', 'features/**/for_*/*.js'],
        resolve: {
          modules: [
            path.join(wallaby.projectCacheDir, 'src')
          ],
          alias: {}
        },
        module: {
          rules: [
            //{test: /\.js$/, loader: 'babel-loader' },
            {test: /\.html$/i, loader: 'html-loader'},
            {test: /\.css$/i, issuer: [{not: [{test: /\.html$/i}]}], use: ['style-loader', 'css-loader']},
            {test: /\.css$/i, issuer: [{test: /\.html$/i}], use: 'css-loader'},
          ]
        },
        plugins: [
          new DefinePlugin({AURELIA_WEBPACK_2_0: undefined}),
          new AureliaPlugin()
        ]
      });

    let babelCompiler = wallaby.compilers.babel(babelConfig);

    return {
        debug: true,
        reportConsoleErrorAsError: true,
        files: [
            //{ pattern: 'node_modules/babel-polyfill/browser.js', instrument: false, load: false },
            { pattern: 'node_modules/chai/chai.js', instrument: false },
            { pattern: "node_modules/chai-as-promised/chai-as-promised.js", instrument: false },
            { pattern: "node_modules/sinon/pkg/sinon.js", instrument: false },
            { pattern: './features/**/for_*/*.js', ignore:true },
            { pattern: './features/**/*.js', load: false },
            { pattern: './setup.js', load: false }
        ],
        tests: [
            { pattern: './features/**/for_*/*.js', load: false }
        ],
        env: {
            kind: 'electron'
        },
        compilers: {
            '**/*.js': babelCompiler
        },
        postprocessor: wallabyPostprocessor,
        setup: () => {
            window.expect = chai.expect;
            let should = chai.should();
            window.__moduleBundler.loadTests();
        }
    };
};