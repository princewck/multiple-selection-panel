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

gulp.task('styles', function () {
    return merge(
        gulp.src('./src/styles/**.css'),
        sass('./src/styles/scss/entry.scss')
    )
        .pipe(concat('style.css'))
        .pipe(sourcemap.init())
        .pipe(csso())
        .pipe(sourcemap.write())
        .pipe(gulp.dest('./dist'))
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
        './src/directives/**.js',
        './src/views/**/controller.js',
    ])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('html', function () {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
    return del(['./dist']);
});

gulp.task('asserts', function() {
    return gulp.src('./src/bower_components/**')
        .pipe(gulp.dest('./dist/asserts'));
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('open', function() {
    return gulp.src('/')
        .pipe(open({uri: 'http://localhost:8080'}));
});


gulp.task('default', runSequence('clean', ['styles', 'scripts', 'html', 'asserts']));
gulp.task('dev', runSequence('clean', ['styles', 'scripts', 'html','asserts'], 'connect', 'open'));
gulp.task('build', ['default']);
gulp.task('watch', ['dev'], function() {
    var watchStyles = gulp.watch(['./src/styles/**.css', './src/styles/scss/**.scss'], ['styles']);
    watchStyles.on('change', function(event) {
        console.log(event.path + ' was ' + event.type, 'handling...');
    });
    var watchScriptsAndTemplates = gulp.watch([
        './src/directives/**/**',
        './src/views/**/**',
        './src/scripts/**.js',
        './src/scripts/app/**.js'
    ], ['scripts']);
    watchScriptsAndTemplates.on('change', function(event) {
        console.log(event.path + ' was ' + event.type, 'handling...');
    });
    var watchIndexHtml = gulp.watch('./src/index.html', ['html']);
    watchIndexHtml.on('change', function(event) {
        console.log(event.path + ' was ' + event.type, 'handling...');
    });
});