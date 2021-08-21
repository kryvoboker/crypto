// filterSelection("referrals__text--second")
function filterSelection(c) {
	var x, i;
	x = document.getElementsByClassName("referrals__text");
	if (c == "all") c = "";
	// Добавить класс "show" (display:block) к отфильтрованным элементам и удалите класс "show" из элементов, которые не выбраны
	for (i = 0; i < x.length; i++) {
		w3RemoveClass(x[i], "show");
		if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
	}
}

// Показать отфильтрованные элементы
function w3AddClass(element, name) {
	var i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
		if (arr1.indexOf(arr2[i]) == -1) {
			element.className += " " + arr2[i];
		}
	}
}

// Скрыть элементы, которые не выбраны
function w3RemoveClass(element, name) {
	var i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
		while (arr1.indexOf(arr2[i]) > -1) {
			arr1.splice(arr1.indexOf(arr2[i]), 1);
		}
	}
	element.className = arr1.join(" ");
}

// Добавить активный класс к текущей кнопке управления (выделите ее)
const btnsRef = document.querySelectorAll('.referrals__title');
for (let i = 0; i < btnsRef.length; i++) {
	const el = btnsRef[i];
	el.addEventListener("click", function () {
		for (let k = 0; k < btnsRef.length; k++) {
			const elem = btnsRef[k];
			if (elem.classList.contains('active')) {
				elem.classList.remove('active');
			}
			if (!elem.classList.contains('active')) {
				btnsRef[i].classList.add('active');
			}
		}
	});
}