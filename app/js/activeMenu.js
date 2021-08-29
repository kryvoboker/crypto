$(function () {
	$('.menu-main [href]').each(function () {
		if (this.href == window.location.href) {
			$(this).addClass('active');
		}
	});

	$('.header-main__auth [href]').each(function () {
		if (this.href == window.location.href) {
			$(this).addClass('active');
		}
	});
});