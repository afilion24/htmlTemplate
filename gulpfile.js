const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const del = require('del');

gulp.task('clean', function() {
	del.sync('./dev');
});

gulp.task('html', function() {
	return gulp.src('./app/index.html')
		.pipe(gulp.dest('./dev'))
});

gulp.task('sass:dev', function() {
	return gulp.src('./app/sass/style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dev/css'))
		.pipe(browserSync.stream());
});

gulp.task('sass:dest', function() {
	return gulp.src('./app/sass/style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dest/css'));
});

gulp.task('dev', ['clean', 'html', 'sass:dev'], function() {

	browserSync.init({
		server: "./dev"
	});

	gulp.watch('./app/sass/**/*.scss', ['sass:dev']);
	gulp.watch('./app/index.html', ['html']);
	gulp.watch('./dev/index.html').on('change', browserSync.reload);
});