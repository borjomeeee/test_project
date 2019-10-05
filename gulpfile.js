const { src, dest, watch, parallel, series } = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const browserSync = require('browser-sync').create();

const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const browserify = require("browserify");

const assets = 'dest/assets/';

function server(cb)
{
    browserSync.init({
        server: {
            baseDir: './dest'
        }
    });
    
    watch('src/page/*.html', html);
    watch('src/page/*.scss', css);
    watch('src/page/index.js', js);

    cb();
}

function html(cb)
{
    src('src/page/*.html')
        .pipe(dest('dest'))
        .pipe(browserSync.reload({stream:true}));

    cb();
}

function cssLib(cb)
{
    src('src/assets/css/libs/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(`${assets}styles`));

    cb();
}

function css(cb)
{
    src('src/page/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(dest(`${assets}styles`))
        .pipe(browserSync.reload({stream:true}));

    cb();
}

function jsLib(cb)
{
    src(['src/assets/libs/*.js'])
        .pipe(concat('common.min.js'))
        .pipe(uglify().on('error', console.error))
        .pipe(dest(`${assets}scripts`));

    cb();
}

function js(cb) 
{
    browserify('src/page/index.js')
        .transform("babelify", {presets: ["@babel/preset-env", "@babel/preset-react"]})
        .bundle()
        .pipe(source("index.js"))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(buffer())
        .pipe(uglify().on('error', console.error))
        .pipe(dest(`${assets}scripts`))
        .pipe(browserSync.reload({stream:true}));

    cb();
}

exports.default = series(parallel(js, jsLib, css, cssLib, html), server);