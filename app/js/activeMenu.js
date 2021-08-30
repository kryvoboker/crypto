$(function () {
	// active main menu
	$('.menu-main [href]').each(function () {
		if (this.href == window.location.href) {
			$(this).addClass('active');
		}
	});

	//after login
	$('.header-main__auth [href]').each(function () {
		if (this.href == window.location.href) {
			$(this).addClass('active');
		}
	});

	//client room page //active menu
	$('.room__balance-inner [href]').each(function () {
		if (this.href == window.location.href) {
			$(this).closest('.room__balance-item').addClass('active');
		}
	});
});