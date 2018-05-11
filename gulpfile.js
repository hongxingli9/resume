const gulp = require('gulp');
const watchLess = require('gulp-watch-less');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const fs = require('fs');

gulp.task('less', () => {
	gulp.src('src/less/style.less')
		//.pipe(watchLess('less/style.less'))
		.pipe(less())
		.pipe(autoprefixer({
			browsers: ['defaults'],
			cascade: false
		}))
		.pipe(gulp.dest('dist/css'));
});

function srcToDist(dir) {
	gulp.src(`src/${dir}/*.*`)
		.pipe(gulp.dest(`dist/${dir}/`));
}

gulp.task('copy', () => {
	srcToDist('font');
	srcToDist('img');
});

gulp.task('jsonToPug', () => {
	var locals = JSON.parse(fs.readFileSync('./locals.json', 'utf-8'));
	gulp.src('./index.pug')
		.pipe(pug({
			locals: locals,
			pretty: true
		}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['less', 'copy', 'jsonToPug']);