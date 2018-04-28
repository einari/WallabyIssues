const babelConfig = require('dolittle.javascript.build/.babelrc.js')();

module.exports = (wallaby) => {
    babelConfig.plugins.push(['transform-es2015-modules-amd', {
        loose: true
    }]);
    let babelCompiler = wallaby.compilers.babel(babelConfig);

    return {
        //debug: true,
        files: [
            { pattern: 'node_modules/babel-polyfill/browser.js', instrument: false, load: false },
            { pattern: 'node_modules/chai/chai.js', instrument: false },
            { pattern: "node_modules/chai-as-promised/chai-as-promised.js", instrument: false },
            { pattern: "node_modules/sinon/pkg/sinon.js", instrument: false },
            { pattern: "node_modules/aurelia-pal/dist/amd/aurelia-pal.js", load: false, instrument: false },
            { pattern: "node_modules/aurelia-pal-browser/dist/amd/aurelia-pal-browser.js", load: false, instrument: false },
            { pattern: "node_modules/aurelia-polyfills/dist/amd/*.js", load: false, instrument: false },
            { pattern: 'node_modules/requirejs/require.js', instrument: false },
            { pattern: './features/**/for_*/*.js', ignore:true },
            { pattern: './features/**/*.js', load: false }
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
        setup: () => {
            window.expect = chai.expect;
            let should = chai.should();
            wallaby.delayStart();

            requirejs.config({
                baseUrl: '/',
                paths: {
                    'babel-polyfill': '/node_modules/babel-polyfill/browser',
                    'aurelia-pal': '/node_modules/aurelia-pal/dist/amd/aurelia-pal',
                    'aurelia-pal-browser': '/node_modules/aurelia-pal-browser/dist/amd/aurelia-pal-browser',
                    'aurelia-polyfills': '/node_modules/aurelia-polyfills/dist/amd/aurelia-polyfills',
                }
            });

            var modulesToRequire = [
                'babel-polyfill',
                'aurelia-pal',
                'aurelia-pal-browser',
                'aurelia-polyfills',
            ];

            modulesToRequire = modulesToRequire.concat(wallaby.tests);

            require(modulesToRequire, function (modules) {
                arguments[2].initialize();
                wallaby.start();
            });
        }
    };
};