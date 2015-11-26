var gulp      = require('gulp');
var plumber   = require('gulp-plumber');
var svgSprite = require('gulp-svg-sprite');
var cheerio   = require('gulp-cheerio');
var config    = require('../config');

gulp.task('sprite:svg', function() {
    return gulp.src(config.src.iconsSvg + '/*.svg')
    .pipe(plumber({
        errorHandler: config.errorHandler
    }))
    .pipe(cheerio({
        run: function($, file) {
            $('[fill]:not([fill="currentColor"])').removeAttr('fill');
        },

        parserOptions: {
            xmlMode: true
        }
    }))
    .pipe(svgSprite({
        svg: {
            xmlDeclaration: true,
            doctypeDeclaration: true,
            dimensionAttributes: true,
            rootAttributes: null // object
        },
        shape: {
            id: {
                generator: 'svg-%s',
                separator: '--',
                whitespace: '-'
            },
            dimension: {
                attributes: false
            },
            spacing: {
                padding: 0
            },
            transform: [{
                svgo: {
                    js2svg: {
                        pretty: true
                    },
                    plugins: [
                        {removeDesc: true},
                        {cleanupIDs: true},
                        {mergePaths: false}
                    ]
                }
            }],
            // dest: './../../' + config.src.svg + '/icons-optmz'
        },
        mode: {
            css: {
                dest: '.',
                prefix: '.', // '.icon-%s'
                dimensions: '-dims',
                sprite: 'svg-sprite-css.svg',
                bust: false,
                layout: 'packed',
                mixin: 'svg-sprite',
                render: {
                    scss: {
                        dest: './../../' + config.src.sass + '/_svg-sprite-css.scss'
                    },
                    css: false
                },
                example: false // {dest: 'svg-sprite-example/svg-sprite-css.html'}
            },
            symbol: {
                dest: '.',
                prefix: '.',
                dimensions: '-dims',
                sprite: 'svg-sprite-symbol.svg',
                inline: false,
                render: {
                    scss: {
                        dest: './../../' + config.src.sass + '/_svg-sprite-symbol.scss'
                    }
                },
                example: false // {dest: 'svg-sprite-example/svg-sprite-symbol.html'}
            },
            view: false,
            defs: false,
            stack: false
        }
    }))
    .pipe(gulp.dest(config.dest.css));
});
