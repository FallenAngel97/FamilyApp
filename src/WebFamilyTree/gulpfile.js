/// <binding BeforeBuild='default' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');
var gs = require('gulp-selectors');
var rename = require("gulp-rename");
var htmlmin = require('gulp-htmlmin');
var cssmin = require("gulp-cssmin");
var svgmin = require('gulp-svgmin');
var gulpsync = require('gulp-sync')(gulp);

gulp.task('sass', function () {
    gulp.src("wwwroot/styles/*.{otf,ttf,TTF,woff,eof,svg}")
    .pipe(gulp.dest('wwwroot/css'));

    return sass('wwwroot/styles/main.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('wwwroot/css'));
});

gulp.task("svgmin", function () {
    return gulp.src("wwwroot/images/*.svg")
    .pipe(svgmin())
    .pipe(gulp.dest("wwwroot/img"));
});

//Cannot use until proper solution is done. The selctorsMinify don;t minify className is js files

//gulp.task('selectorsMinify', function () {
//    return gulp.src(['wwwroot/css/*.css', '!wwwroot/css/*.min.css', 'wwwroot/js/*.js', '!wwwroot/js/*.min.js', 'Views/**/*.cshtml', "!Views/**/*.min.cshtml"])
//    .pipe(gs.run({
//        'html': ['cshtml'],
//        'js-strings': ['js'],
//    }, {
//        classes: ['formats'],
//        ids: ['sliderScale']
//    }))
//    .pipe(gulp.dest('tempSelectors'));
//});

//gulp.task("copyToDest", function () {
//    gulp.src(["tempSelectors/**/*.cshtml"])
//    .pipe(htmlmin({ collapseWhitespace: true }))
//    .pipe(rename({
//        suffix: '.min'
//    }))
//    .pipe(gulp.dest("Views/"));
//    gulp.src(["tempSelectors/*.css", "!tempSelectors/*.min.css"])
//    .pipe(cssmin({
//        aggressiveMerging: true
//    }))
//    .pipe(rename({
//        suffix: '.min'
//    }))
//    .pipe(gulp.dest("wwwroot/css/"));
//    return gulp.src("tempSelectors/*.js")
//    .pipe(rename({
//        suffix: '.min'
//    }))
//    .pipe(gulp.dest("wwwroot/js"));
//});

gulp.task("uglify", function () {
    return gulp.src("wwwroot/typescript/*.js")
    .pipe(uglify({ mangle: { toplevel: true } }))
    .pipe(gulp.dest("wwwroot/js"));
});

gulp.task('default', gulpsync.sync(['sass', 'uglify'/*'selectorsMinify','copyToDest'*/, 'svgmin']));