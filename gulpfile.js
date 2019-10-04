const { src, dest, watch, parallel } = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

function js(cb) 
{
    src(['src/js/*js', '!node_modules/**'])
        .pipe(concat('index.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest('dest/js'))
        .pipe(uglify())
        .pipe(rename((path) => path.extname = '.min.js'))
        .pipe(dest('dest/js'))

    cb();
}

function init(cb) 
{
    watch('src/js/*.js', js);
    
    cb();
}

exports.default = parallel(init, js);

