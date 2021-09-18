const navRoomBtnShow = document.getElementById('navRoomBtnShow');
const navRoomBtnHide = document.getElementById('navRoomBtnHide');
const roomBalance = document.querySelector('.room__balance');

if (navRoomBtnShow || navRoomBtnHide || roomBalance) {
	navRoomBtnShow.onclick = function () {
		$('.room__balance').slideToggle();
		roomBalance.style.display = 'block';
		this.classList.toggle('active');
		navRoomBtnHide.classList.toggle('active');
	};
	navRoomBtnHide.onclick = function () {
		$('.room__balance').slideToggle();
		this.classList.toggle('active');
		navRoomBtnShow.classList.toggle('active');
	};

	window.onresize = function (event) {
		const widthPage = window.innerWidth || document.documentElement.clientWidth ||
			document.body.clientWidth;

		if (widthPage > 690) {
			roomBalance.style.display = 'block';
		}
		else if (navRoomBtnShow.classList.contains('active') &&
			navRoomBtnHide.classList.contains('active') &&
			widthPage <= 690) {
			roomBalance.style.display = 'block';
		}
		else if (!navRoomBtnShow.classList.contains('active') &&
			!navRoomBtnHide.classList.contains('active') &&
			widthPage <= 690) {
			roomBalance.style.display = 'none';
		}
	};
}