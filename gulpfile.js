const { src, dest, watch, parallel, series } = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const browserSync = require('browser-sync').create();

function server(cb)
{
    browserSync.init({
        server: {
            baseDir: './dest'
        }
    });

    cb();
}

function cssLib(cb)
{
    src(['src/js/scripts/*.js', '!node_modules/**', '!src/js/lib/*.js'])
        .pipe(uglify())
        .pipe(dest('dest/js'));

    cb();
}

function jsLib(cb)
{
    src(['src/js/scripts/*.js', '!node_modules/**', '!src/js/lib/*.js'])
        .pipe(uglify())
        .pipe(dest('dest/js'));

    cb();
}

function js(cb) 
{
    src(['src/js/scripts/*.js', '!node_modules/**', '!src/js/lib/*.js'])
        .pipe(concat('index.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest('dest/js'))
        .pipe(uglify())
        .pipe(rename((path) => path.extname = '.min.js'))
        .pipe(dest('dest/js'));

    cb();
}

exports.default = series(parallel(js, jsLib, css, cssLib), server);

