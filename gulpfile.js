const { src, dest, watch, parallel, series } = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const browserSync = require('browser-sync').create();

const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const browserify = require("browserify");
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const assets = 'dest/assets/';

function server(cb)
{
    browserSync.init({
        server: {
            baseDir: './dest'
        }
    });
    
    watch(['src/page/*.html', 'src/common.blocks/**/*.html'], html);

    watch([
        'src/page/*.scss', 
        'src/common.blocks/**/*.scss', 
        'src/assets/css/*.scss',
        'src/assets/css/**/*.scss'], css);

    watch([
        'src/page/index.js', 
        'src/common.blocks/**/*.js', 
        'src/assets/js/*.js', 
        'src/assets/js/**/*.js'], js);

    cb();
}

function img(cb) 
{
    src(['src/assets/images/*.jpg', 
    'src/assets/images/*.png', 
    'src/assets/images/*.svg', 
    'src/assets/images/*.gif'])
    
        .pipe(dest(`${assets}images`));

    cb();
}

function fonts(cb) 
{
    src([
        'src/assets/fonts/*.woff', 
        'src/assets/fonts/*.ttf', 
        'src/assets/fonts/*.eot', 
        'src/assets/fonts/*.svg'])

        .pipe(dest(`${assets}fonts`));
        
    cb();
}

function html(cb)
{
    src('src/page/*.html')
        .pipe(dest('dest'))
        .pipe(browserSync.reload({stream:true}));

    src('src/common.blocks/**/*.html')
        .pipe(rename(function(path) {
            path.dirname = "";
        }))
        .pipe(dest(`${assets}blocks`))
        .pipe(browserSync.reload({stream:true}));

    cb();
}

function cssLib(cb)
{
    src('src/assets/css/libs/*.min.css')
        .pipe(concat('common.min.css'))
        .pipe(dest(`${assets}styles`));

    cb();
}

function css(cb)
{
    src([
        'src/page/*.scss', 
        'src/common.blocks/**/*.scss', 
        'src/assets/css/*.scss',
        'src/assets/css/**/*.scss',
        '!src/assest/css/libs/*.scss'])

        .pipe(sass().on('error', sass.logError))
        .pipe(concat('index.min.css'))
        .pipe(rename(function(path) {
            path.dirname = "";
        }))
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(dest(`${assets}styles`))
        .pipe(browserSync.reload({stream:true}));

    cb();
}

function jsLib(cb)
{
    src(['src/assets/js/libs/*.min.js'])
        .pipe(concat('common.min.js'))
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

exports.default = series(parallel(js, jsLib, css, cssLib, html, img, fonts), server);