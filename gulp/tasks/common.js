var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('../config');

gulp.task('default', [
    'watch',
    'server'
]);

gulp.task('build', ['clean'],  function(cb) {
    runSequence(
        // 'iconfont',
        'imagemin',
        'sprite:svg',
        'sass',
        'html',
        'scripts',
        'copy'
    );
    cb();
});

gulp.task('watch', [
    'sass:watch',
    // 'iconfont:watch',
    'sprite:svg:watch',
    'imagemin:watch',
    'scripts:watch',
    'html:watch'
]);
