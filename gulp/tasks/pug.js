module.exports = function () {


	$.gulp.task('pug', function () {

		return $.gulp.src([$.sourse + '/pug/pages/**/*.pug', `!${$.sourse}/pug/pages/layout/*.pug`, `!${$.sourse}/pug/pages/layout-lang/*.pug`])
			.pipe($.pug({ pretty: true }).on("error", $.notify.onError()))
			.pipe($.tabify(2, true))
			.pipe($.gulp.dest($.public))
			.on('end', $.browserSync.reload);
	});
}