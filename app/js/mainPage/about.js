// показать больше/меньше about
function myFunction() {
	var aboutDots = document.getElementById("about__dots");
	var aboutMoreText = document.getElementById("about__more");
	var aboutBtnText = document.getElementById("about__btn");

	if (aboutDots.style.display === "none") {
		aboutDots.style.display = "inline";
		aboutBtnText.innerHTML = "Далее...";
		aboutMoreText.style.display = "none";
	} else {
		aboutDots.style.display = "none";
		aboutBtnText.innerHTML = "Скрыть";
		aboutMoreText.style.display = "inline";
	}
}