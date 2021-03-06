var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');

var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');


var JSsourcedir = './js';
var styleSourcedir = './style';
var distdir = './public';

function buildJS(isDev) {
    console.log('Running buildJS task');

    var props = watchify.args;
    props.entries = [JSsourcedir + '/index.js'];
    props.debug = isDev;

    var bundler = isDev ? watchify(browserify(props)) : browserify(props);
    bundler.transform(babelify);

    function createbundle() {
        var start = new Date();
        console.log('creating bundle...');
        return bundler
            .bundle()
            .on('error', notify.onError({message: '<%= error.message %>'}))
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(distdir))
            .pipe(notify('Build completed in ' + (new Date() - start) + 'ms'));

    }

    bundler.on('update', createbundle);

    return createbundle();
}

function buildLess() {
    console.log('Building less');
    try {
        return gulp.src(styleSourcedir + '/index.less')
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(distdir));
    } finally {
        console.log('Less build complete');
    }
}

function copyFonts() {
    gulp.src(['node_modules/bootstrap/dist/fonts/**/*']).pipe(gulp.dest(distdir + '/fonts'));
}

gulp.task('default', function () {
    buildJS(false);
    buildLess();
    copyFonts();
});

gulp.task('less', buildLess);
gulp.task('dev', function () {
    buildJS(true);
    buildLess();
    copyFonts();
    gulp.watch(styleSourcedir + '/**/*.less', ['less']);
});