const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/'
		}
	});
}

function cleanDist() {
	return del('dist')
}

function images() {
	// return src('app/img/**/*', { base: 'app' })
	return src('app/temp_convert/**/*')
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 50, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest('app/temp_convert'))
}

function conWebp() {
	return src('app/temp_convert/*')
		.pipe(webp({ quality: 45 }))
		.pipe(dest('app/temp_convert'))
}

function scripts() {
	return src([
		// 'node_modules/jquery/dist/jquery.js',
		// 'app/js/slick.min.js',
		// 'app/js/select.js',
		'app/js/main.js'
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream())
}

function styles() {
	return src('app/#source/scss/style.scss')
		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(concat('style.css'))
		.pipe(autoprefixer({
			grid: true,
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

function CSSmini() {
	return src([
		'app/pages/css/select.css'
	])
		.pipe(cssmin())
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest('app/pages/css'));
}

function concatCSS() {
	return src([
		// 'app/css/slick.min.css',
		// 'app/css/fonts.min.css',
		// 'app/css/select.min.css',
		'app/css/style.css'
	])
		.pipe(concat('style.min.css'))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

function build() {
	return src([
		'app/pages/css/style.min.css',
		'app/pages/fonts/**/*',
		'app/pages/img/**/*',
		'app/pages/js/main.min.js',
		'app/pages/*.html'
	], { base: 'app/pages' })
		.pipe(dest('dist/pages'))
}

function watching() {
	watch(['app/#source/scss/**/*.scss'], styles);
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
	watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.conWebp = conWebp;
exports.cleanDist = cleanDist;
exports.CSSmini = CSSmini;
exports.concatCSS = concatCSS;


exports.build = series(cleanDist, build);
exports.default = parallel(styles, scripts, browsersync, watching);