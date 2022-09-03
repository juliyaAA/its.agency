const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    rename = require("gulp-rename"),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    cssMin = require('gulp-cssmin');

gulp.task('sass', function () {
    return gulp.src('./scss/style.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions']
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('pug', function () {
    return gulp.src('./pug/**/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function () {
    return gulp.src('./*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('style', function () {
    return gulp.src([
        'node_modules/normalize.css/normalize.css'
    ])
        .pipe(concat('libs.min.css'))
        .pipe(cssMin())
        .pipe(gulp.dest('./css'))
});

gulp.task('js', function () {
    return gulp.src('./js/*.js')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('./scss/*.scss', gulp.parallel('sass'))
    gulp.watch('./pug/**/*.pug', gulp.parallel('pug'))
    gulp.watch('./*.html', gulp.parallel('html'))
    gulp.watch('./js/*.js', gulp.parallel('js'))
});

gulp.task('default', gulp.parallel('style', 'sass', 'js', 'pug', 'html', 'browser-sync', 'watch'));