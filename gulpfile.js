const fs = require('fs'),
    gulp = require('gulp'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace'),
    path = require('path'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    sourcemap = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    merge = require('merge2'),
    babel = require('gulp-babel'),
    templateCache = require('gulp-angular-templatecache'),
    connect = require('gulp-connect'),
    del = require('del'),
    runSequence = require('gulp-sequence'),
    open = require('gulp-open');

/**............build.demo..........**/
gulp.task('styles', function () {
    return merge(
        gulp.src('./src/styles/**.css'),
        sass('./src/styles/scss/entry.scss')
    )
        .pipe(concat('style.css'))
        .pipe(sourcemap.init())
        .pipe(csso())
        .pipe(sourcemap.write())
        .pipe(gulp.dest('./demo'))
        .on('end', function () {
            console.log('------------------------------------------\n|\n| css has been bundled successfully!\n|\n------------------------------------------\n\n')
        });
});

gulp.task('templates', function () {
    //可能会有directive和controller的templateUrl命名重复问题,这里先约定不能重复
    return gulp.src([
        './src/views/**/**.html',
        './src/directives/**/**.html'
    ])
        .pipe(templateCache('templates.js', { module: 'app' }))
        .pipe(gulp.dest('./src/scripts/templates/'));
});

gulp.task('scripts', ['templates'], function () {
    return gulp.src([
        './src/scripts/app.js',
        './src/scripts/templates/**.js',
        './src/scripts/app/**.js',
        './src/services/**.js',
        './src/directives/**/**.js',
        './src/views/**/controller.js',
    ])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./demo/'));
});

gulp.task('html', function () {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./demo'));
});

gulp.task('clean', function () {
    return del(['./demo']);
});

//测试用的json数据
gulp.task('testData', function () {
    gulp.src('./src/views/**/**.json')
        .pipe(gulp.dest('./demo/api'));
});

gulp.task('asserts', function () {
    return gulp.src('./src/bower_components/**')
        .pipe(gulp.dest('./demo/asserts'));
});

gulp.task('connect', function () {
    connect.server({
        root: 'demo',
        livereload: true
    });
});

gulp.task('open', function () {
    return gulp.src('/')
        .pipe(open({ uri: 'http://localhost:8080' }));
});

/**.............dist..........**/
gulp.task('build:script', function () {
    //可能会有directive和controller的templateUrl命名重复问题,这里先约定不能重复
    return merge(
        gulp.src('./src/directives/select-panel/**.js'),
        gulp.src('./src/directives/**/**.html')
            .pipe(templateCache('templates.js', { module: 'ck.directives' }))
    )
        .pipe(concat('select-panel.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build:script.min', ['build:script'], function() {
    gulp.src('dist/select-panel.js')
        .pipe(babel({presets: ['es2015']}))
        .pipe(uglify())
        .pipe(rename('select-panel.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build:style', function () {
    return sass('./src/styles/scss/directive.select-panel.scss')
        .pipe(sourcemap.init())
        .pipe(csso())
        .pipe(rename('select-panel.css'))
        .pipe(sourcemap.write())
        .pipe(gulp.dest('./dist'))
});

gulp.task('build:dist', runSequence(['build:script', 'build:style'], 'build:script.min'));


gulp.task('default', runSequence('clean', ['styles', 'scripts', 'html', 'asserts', 'testData']));
gulp.task('dev', runSequence('clean', ['styles', 'scripts', 'html', 'asserts', 'testData'], 'connect', 'open'));
gulp.task('build', ['default']);
gulp.task('watch', ['dev'], function () {
    var watchStyles = gulp.watch(['./src/styles/**.css', './src/styles/scss/*.scss'], ['styles']);
    watchStyles.on('change', function (event) {
        console.log(event.path + ' was ' + event.type, 'handling...');
    });
    var watchScriptsAndTemplates = gulp.watch([
        './src/directives/**/**.*',
        './src/views/**/**',
        './src/scripts/**.js',
        './src/scripts/app/**.js'
    ], ['scripts']);
    watchScriptsAndTemplates.on('change', function (event) {
        console.log(event.path + ' was ' + event.type, 'handling...');
    });
    var watchIndexHtml = gulp.watch('./src/index.html', ['html']);
    watchIndexHtml.on('change', function (event) {
        console.log(event.path + ' was ' + event.type, 'handling...');
    });

    var watchData = gulp.watch('./src/views/**/*.json', ['testData']);
});