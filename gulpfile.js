var gulp = require('gulp');
var path = require('path');
var serve = require('gulp-serve');
var webpack = require('gulp-webpack');

var appdir = 'app/';
var scriptdir = appdir + 'script/';
var componentdir = appdir + 'component/';
var destdir = 'cordova/www/';
var scriptdestdir = destdir + 'js/';
var styledestdir = destdir + 'css/';

var webpackConfig = {
    context: __dirname + "/",
    entry: "./" + scriptdir + "app.js",
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
        scriptdir + '**/*.js',
        componentdir + '**/*.js',
    ], ['publish']);
});

// Publisher
gulp.task('publish', ['publish:html', 'publish:script']);

gulp.task('publish:html', function(){
    return gulp.src(appdir + 'index.html')
        .pipe(gulp.dest(destdir));
});

gulp.task('publish:script', function() {
    return gulp.src(scriptdir + 'app.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(scriptdestdir));
});
