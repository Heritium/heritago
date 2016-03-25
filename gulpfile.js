var gulp = require('gulp');
var path = require('path');
var serve = require('gulp-serve');
var webpack = require('gulp-webpack');
var sass = require('gulp-sass');

var appdir = 'app/';
var scriptdir = appdir + 'script/';
var styledir = appdir + 'style/';
var componentdir = appdir + 'component/';
var destdir = 'cordova/www/';
var scriptdestdir = destdir + 'script/';
var styledestdir = destdir + 'style/';

var webpackScriptConfig = {
    context: __dirname + "/",
    entry: "./" + scriptdir + "heritago.js",
    resolve: {
        root: [
            path.resolve(componentdir),
            path.resolve(scriptdir)
        ]
    },
    output: {
        path: __dirname + scriptdestdir,
        filename: "heritago.js"
    }
};

var webpackSassConfig = {
    context: __dirname + "/",
    entry: "./" + styledir + "heritago.scss",
    resolve: {
        root: [
            path.resolve(styledir),
        ]
    },
    output: {
        path: __dirname + styledestdir,
        filename: "style.webpacked.css"
    }
};

// Server
gulp.task('serve', serve(destdir));
gulp.task('serve-build', serve([destdir, 'build']));
gulp.task('serve-prod', serve({
    root: [destdir, 'build'],
    port: 80,
    middleware: function(req, res) {
        // custom optional middleware
    }
}));

// Watcher
gulp.task('default', ['watch', 'serve']);
gulp.task('watch', function() {
    gulp.watch([
        appdir + '**/*'
    ], ['publish']);
});

// Publisher
gulp.task('publish', ['publish:html', 'publish:library', 'publish:script']);

gulp.task('publish:html', function(){
    return gulp.src(appdir + 'index.html')
        .pipe(gulp.dest(destdir));
});

gulp.task('publish:style', function() {
    return gulp.src(styledir + 'heritago.scss')
        .pipe(sass())
        .pipe(webpack(webpackSassConfig))
        .pipe(gulp.dest(styledestdir));
});

gulp.task('publish:script', function() {
    return gulp.src(scriptdir + 'heritago.js')
        .pipe(webpack(webpackScriptConfig))
        .pipe(gulp.dest(scriptdestdir));
});

gulp.task('publish:library', function() {
    return gulp.src(appdir + 'library/**/*')
        .pipe(gulp.dest(destdir + 'library'));
});
