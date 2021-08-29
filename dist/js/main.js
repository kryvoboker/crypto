;
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
});;

// =====================================main-page=============================
// анимация заглавия возле логотипа
var TxtRotate = function (el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

	var that = this;
	var delta = 300 - Math.random() * 100;

	if (this.isDeleting) { delta /= 2; }

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.loopNum++;
		delta = 500;
	}

	setTimeout(function () {
		that.tick();
	}, delta);
};

window.onload = function () {
	var elements = document.getElementsByClassName('txt-rotate');
	for (var i = 0; i < elements.length; i++) {
		var toRotate = elements[i].getAttribute('data-rotate');
		var period = elements[i].getAttribute('data-period');
		if (toRotate) {
			new TxtRotate(elements[i], JSON.parse(toRotate), period);
		}
	}
	// INJECT CSS
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
	document.body.appendChild(css);
};

;
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
};
// =====================================main-page=============================

// =====================================faq-page==============================
const titles = document.querySelectorAll('.question__item-title');
const text = document.querySelectorAll('.question__text');
for (let i = 0; i < titles.length; i++) {
	const el = titles[i];
	el.onclick = function () {

		for (let k = 0; k < titles.length; k++) {
			const element = titles[k];
			if (element.classList.contains('active')) {
				element.classList.remove('active');
			}
			if (!element.classList.contains('active')) {
				titles[i].classList.add('active');
			}
		}
		for (let j = 0; j < text.length; j++) {
			const elem = text[j];
			if (elem.classList.contains('active')) {
				elem.classList.remove('active');
				// document.querySelector('.question__row+.question__row').classList.remove('active');
			}
			if (!text[i].classList.contains('active')) {
				document.querySelector('.question__inner').classList.add('active');
				document.querySelector('.question__row+.question__row').classList.add('active');
				text[i].classList.add('active');
			}

		}
	};
}


const questBtn = document.querySelector('.question__btn');

if (questBtn) {

	questBtn.onclick = function () {
		document.querySelector('.question__inner').classList.remove('active');
		document.querySelector('.question__row+.question__row').classList.remove('active');
		text.forEach(el => {
			el.classList.remove('active');
		});
		titles.forEach(el => {
			el.classList.remove('active');
		});
	};
};
// =====================================faq-page==============================

// =====================================investPlans-page======================
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
};
// =====================================investPlans-page======================

// =====================================reviews-page==========================
var newDate = new Date();
var month = new Array("января", "февраля", "марта", "апреля", "мая", "июня",
	"июля", "августа", "сентября", "октября", "ноября", "декабря");

const date = document.querySelectorAll('.reviews__date');
for (let i = 0; i < date.length; i++) {
	const el = date[i];
	el.innerHTML = newDate.getDate() + ' - '
		+ month[newDate.getMonth()] + ' - '
		+ newDate.getFullYear();
};
// =====================================reviews-page==========================
