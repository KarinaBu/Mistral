const {
	src,
	dest,
	series,
	watch
} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const svgSprite = require('gulp-svg-sprite');
const fileInclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const image = require('gulp-imagemin');
const concat = require('gulp-concat');


const clean = () => {
	return del(['app/*'])
}

const svgSprites = () => {
	return src('./src/img/svg/**.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg"
				}
			},
		}))
		.pipe(dest('./app/img'));
}

const styles = () => {
	return src([
			'node_modules/simplebar/dist/simplebar.css',
			'node_modules/swiper/swiper-bundle.min.css',
			'node_modules/choices.js/public/assets/styles/choices.css',
			'node_modules/nouislider/dist/nouislider.css',
			'./src/css/normalize.css',
			'./src/scss/**/*.scss',
		])
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(concat('style.min.css'))
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./app/css/'))
		.pipe(browserSync.stream());
};


const scripts = () => {
	return src([
			'node_modules/swiper/swiper-bundle.js',
			'node_modules/choices.js/public/assets/scripts/choices.js',
			'node_modules/just-validate/dist/js/just-validate.js',
			'node_modules/jquery/dist/jquery.js',
			'node_modules/simplebar/dist/simplebar.js',
			'src/js/inputmask.min.js',
			'node_modules/nouislider/dist/nouislider.js',
			'src/js/script.js'
		])
		.pipe(uglify())
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('main.min.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./app/js'))
		.pipe(browserSync.stream());
}

const images = () => {
	return src('src/img/**/*')
		.pipe(image([
			image.gifsicle({
				interlaced: true
			}),
			image.mozjpeg({
				quality: 75,
				progressive: true
			}),
			image.optipng({
				optimizationLevel: 5
			}),
			image.svgo({
				plugins: [{
						removeViewBox: true
					},
					{
						cleanupIDs: false
					}
				]
			})
		]))
		.pipe(dest('./app/img'))
};

const htmlInclude = () => {
	return src(['./src/*.html'])
		.pipe(fileInclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(dest('./app'))
		.pipe(browserSync.stream());
}

const fonts = () => {
	return src('./src/fonts/**')
		.pipe(dest('./app/fonts'))
}

const watchFiles = () => {
	browserSync.init({
		server: {
			baseDir: "./app"
		},
	});

	watch('./src/scss/**/*.scss', styles);
	watch('./src/js/**/*.js', scripts);
	watch('./src/partials/*.html', htmlInclude);
	watch('./src/*.html', htmlInclude);
	watch('./src/img/*.{jpg,jpeg,png,svg}', images);
	watch('./src/img/**/*.{jpg,jpeg,png,svg}', images);
	watch('./src/img/svg/**.svg', svgSprites);
}

exports.default = series(clean, htmlInclude, scripts, styles, images, fonts, svgSprites, watchFiles);

const stylesBuild = () => {

	return src([
			'node_modules/simplebar/dist/simplebar.css',
			'node_modules/swiper/swiper-bundle.min.css',
			'node_modules/choices.js/public/assets/styles/choices.css',
			'node_modules/nouislider/dist/nouislider.css',
			'./src/css/normalize.css',
			'./src/scss/**/*.scss',
		])
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(concat('style.min.css'))
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(dest('./app/css/'))
};

const scriptsBuild = () => {
	return src([
			'node_modules/swiper/swiper-bundle.js',
			'node_modules/choices.js/public/assets/scripts/choices.js',
			'node_modules/just-validate/dist/js/just-validate.js',
			'node_modules/jquery/dist/jquery.js',
			'node_modules/simplebar/dist/simplebar.js',
			'src/js/inputmask.min.js',
			'node_modules/nouislider/dist/nouislider.js',
			'src/js/script.js'
		])
		.pipe(uglify())
		.pipe(babel())
		.pipe(concat('main.min.js'))
		.pipe(dest('./app/js'))
}

exports.build = series(clean, htmlInclude, stylesBuild, scriptsBuild, images, fonts, svgSprites);
