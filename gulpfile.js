let projectFolder = "dist";
let appFolder = "app";

let path = {
	build: {
		html: projectFolder + "/",
		css: projectFolder + "/css/",
		js: projectFolder + "/js/",
		img: projectFolder + "/img/",
		fonts: projectFolder + "/fonts/",
		iconFonts: projectFolder + "/fonts/icons/",
	},
	app: {
		html: [appFolder + "/*.html", "!" + appFolder + "/_*.html"],
		css: appFolder + "/scss/style.scss",
		js: appFolder + "/js/main.js",
		img: appFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: appFolder + "/fonts/*.ttf",
		iconFonts: appFolder + "/fonts/icons/**/*.*",
	},
	watch: {
		html: appFolder + "/**/*.html",
		css: appFolder + "/scss/**/*.scss",
		js: appFolder + "/js/**/*.js",
		img: appFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
	},
	// удаляет папку проекта каждый раз, когда запускается gulp
	clean: "./" + projectFolder + "/"
}

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require("browser-sync").create(),
	fileinclude = require("gulp-file-include"),
	del = require("del"),
	scss = require('gulp-sass')(require('sass')),
	autoprefixer = require("gulp-autoprefixer"),
	groupMedia = require("gulp-group-css-media-queries"),
	cleanCss = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify-es").default,
	imagemin = require("gulp-imagemin"),
	svgSprite = require("gulp-svg-sprite"),
	ttf2woff = require("gulp-ttf2woff"),
	ttf2woff2 = require("gulp-ttf2woff2"),
	fonter = require("gulp-fonter");

function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: "./" + projectFolder + "/"
		},
		port: 3000,
		notify: false
	})
}

function html() {
	return src(path.app.html)
		.pipe(fileinclude())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function css() {
	return src(path.app.css)
		.pipe(
			scss({
				outputStyle: "expanded"
			})
		)
		.pipe(
			groupMedia()
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 versions"],
				cascade: true
			})
		)
		.pipe(dest(path.build.css))
		.pipe(
			cleanCss()
		)
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function js() {
	return src(path.app.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(
			uglify()
		)
		.pipe(
			rename({
				extname: ".min.js"
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function images() {
	return src(path.app.img)
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3 //0 to 7
			})
		)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

function fonts() {
	src(path.app.fonts)
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts));
	src(path.app.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts));
	return src(path.app.iconFonts)
		.pipe(dest(path.build.iconFonts));
}

gulp.task('otfInTtf', function () {
	return gulp.src([appFolder + '/fonts/*.otf'])
		.pipe(
			fonter({
				formats: ['ttf']
			})
		)
		.pipe(dest(appFolder + '/fonts/'));
})

gulp.task('svgSprite', function () {
	return gulp.src([appFolder + '/iconsprite/*.svg'])
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: "../icons/incons.svg" //sprite file name
					}
				}
			})
		)
		.pipe(dest(path.build.img))
})

function watchFiles() {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
}

function clean(params) {
	return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;