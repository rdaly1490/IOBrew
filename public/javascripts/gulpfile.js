var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var babelify = require('babelify');
var webserver = require('gulp-webserver');
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-minify-css");

// add custom browserify options here
var customOpts = {
	entries: ['./scripts/main.js'],
	debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts).transform(babelify));

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

gulp.task('webserver', function() {
	gulp.src('./')
	.pipe(webserver({
		fallback:   'index.html',
		livereload: true,
		directoryListing: {
			enable: false,
			path: './'
		},
		open: true
	}));
});

gulp.task("images", function() {
	return gulp.src("../images/**/*")
	.pipe(imagemin({
		progressive: true
	}))
	.pipe(gulp.dest("../../prod/images"));
});

gulp.task("js-uglify-all", function() {
	return gulp.src("../javascripts/dist/all.js")
	.pipe(uglify())
    .pipe(gulp.dest('../../prod/javascripts/dist'));
});

gulp.task("js-uglify-jquery", function() {
	return gulp.src("../javascripts/node_modules/jquery/dist/jquery.min.js")
	.pipe(uglify())
    .pipe(gulp.dest('../../prod/javascripts'));
});

gulp.task("js-uglify-bootstrap", function() {
	return gulp.src("../javascripts/node_modules/bootstrap/dist/js/bootstrap.min.js")
	.pipe(uglify())
    .pipe(gulp.dest('../../prod/javascripts'));
});

gulp.task("css-uglify-bootstrap", function() {
	return gulp.src("../javascripts/node_modules/bootstrap/dist/css/bootstrap.min.css")
	.pipe(minifyCss())
    .pipe(gulp.dest('../../prod/stylesheets'));
});

gulp.task("css-uglify-stylesheet", function() {
	return gulp.src("../stylesheets/style.css")
	.pipe(minifyCss())
    .pipe(gulp.dest('../../prod/stylesheets'));
});

gulp.task("build", ["js-uglify-all", "js-uglify-jquery", "js-uglify-bootstrap", "css-uglify-bootstrap", "css-uglify-stylesheet", "images"]);

gulp.task('serve', ['js', 'webserver']);

function bundle() {
	return b.bundle()
	// log errors if they happen
	.on('error', gutil.log.bind(gutil, 'Browserify Error'))
	.pipe(source('all.js'))
	// optional, remove if you don't need to buffer file contents
	.pipe(buffer())
	// optional, remove if you dont want sourcemaps
	.pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
	// Add transformation tasks to the pipeline here.
	.pipe(sourcemaps.write('./')) // writes .map file
	.pipe(gulp.dest('./dist'));
}