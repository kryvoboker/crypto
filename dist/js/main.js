;
$(function () {
	// active main menu
	$('.menu-main [href]').each(function () {
		if (this.href == window.location.href) {
			$(this).addClass('active');
		}
	});

	// active login menu
	$('.header-main__auth [href]').each(function () {
		if (this.href == window.location.href) {
			$(this).addClass('active');
		}
	});

	//client room page //active menu
	$('.room__balance-inner [href]').each(function () {
		if (this.href == window.location.href) {
			$(this).closest('.room__balance-item').addClass('active');
			$('.header-main__auth-link--center:first-child').addClass('active');
		}
	});
});;
//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.which == 27) {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="????????????" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
				original.value = select_option_value;
				select_option.style.display = 'none';
			}
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}


let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
};

// =====================================main-page=============================
// ???????????????? ???????????????? ?????????? ????????????????
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
// ???????????????? ????????????/???????????? about
function myFunction() {
	var aboutDots = document.getElementById("about__dots");
	var aboutMoreText = document.getElementById("about__more");
	var aboutBtnText = document.getElementById("about__btn");

	if (aboutDots.style.display === "none") {
		aboutDots.style.display = "inline";
		aboutBtnText.innerHTML = "??????????...";
		aboutMoreText.style.display = "none";
	} else {
		aboutDots.style.display = "none";
		aboutBtnText.innerHTML = "????????????";
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

// =====================================auth-page=============================
function authFunction() {
	let login = document.getElementById('login').value;
	let password = document.getElementById('password').value;

	if (login == 'admin@gmail.com' && password == 'admin') {
		window.location.href = 'http://r-krivobok-dev.com/crypto/auth.html';
	}
	else {
		alert('???? ?????????????????? ???????????? ?????????? ?????? ????????????');
	}
};
// =====================================auth-page=============================

// =====================================investPlans-page======================
// filterSelection("referrals__text--second")
function filterSelection(c) {
	var x, i;
	x = document.getElementsByClassName("referrals__text");
	if (c == "all") c = "";
	// ???????????????? ?????????? "show" (display:block) ?? ?????????????????????????????? ?????????????????? ?? ?????????????? ?????????? "show" ???? ??????????????????, ?????????????? ???? ??????????????
	for (i = 0; i < x.length; i++) {
		w3RemoveClass(x[i], "show");
		if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
	}
}

// ???????????????? ?????????????????????????????? ????????????????
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

// ???????????? ????????????????, ?????????????? ???? ??????????????
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

// ???????????????? ???????????????? ?????????? ?? ?????????????? ???????????? ???????????????????? (???????????????? ????)
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
var month = new Array("????????????", "??????????????", "??????????", "????????????", "??????", "????????",
	"????????", "??????????????", "????????????????", "??????????????", "????????????", "??????????????");

const date = document.querySelectorAll('.reviews__date, .support-history__date');
for (let i = 0; i < date.length; i++) {
	const el = date[i];
	el.innerHTML = newDate.getDate() + ' - '
		+ month[newDate.getMonth()] + ' - '
		+ newDate.getFullYear();
};
// =====================================reviews-page==========================

// =====================================client-room(referrals)-page===========
function CopyToClipboard(containerid) {
	if (document.selection) {
		var range = document.body.createTextRange();
		range.moveToElementText(document.getElementById(containerid));
		range.select().createTextRange();
		document.execCommand("Copy");

	} else if (window.getSelection) {
		var range = document.createRange();
		range.selectNode(document.getElementById(containerid));
		window.getSelection().addRange(range);
		document.execCommand("Copy");
	}
};
// =====================================client-room(referrals)-page===========

// =====================================client-room(addRewiev)-page===========
const formImage = document.getElementById('formImage');
const formPreview = document.getElementById('formPreview');

//???????????????? ?????????????????? input
if (formImage) {
	formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0]);
	});

	//?????????????????? ??????????????????????
	function uploadFile(file) {
		if (!['image/jpeg', 'image/png'].includes(file.type)) {
			alert('?????????????????? ?????????????????? ???????????? ??????????????????????!');
			formImage.value = '';
			return;
		}

		//?????????????????? ?????????????????????? ?????????????? ???????? ?????????????? ?? formImage
		var reader = new FileReader();
		reader.onload = function (e) {
			let img = e.target.result;
			formPreview.innerHTML = '<img src="' + img + '" alt="photo">';
		};
		reader.onerror = function (e) {
			alert('???????????????? ????????????');
		};
		reader.readAsDataURL(file);
	}
};
// =====================================client-room(addRewiev)-page===========

// =====================================client-room(validatePassword)-page====
var newPsw = document.getElementById("newPsw");
var againNewPsw = document.getElementById("againNewPsw");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
var ravno = document.getElementById("ravno");

if (newPsw || againNewPsw) {
	// When the user clicks on the password field, show the message box
	newPsw.onfocus = function () {
		document.getElementById("message").style.display = "block";
	}
	againNewPsw.onfocus = function () {
		document.getElementById("message").style.display = "block";
	}

	// When the user clicks outside of the password field, hide the message box
	newPsw.onblur = function () {
		document.getElementById("message").style.display = "none";
	}
	againNewPsw.onblur = function () {
		document.getElementById("message").style.display = "none";
	}

	// When the user starts to type something inside the password field
	newPsw.onkeyup = function () {
		// Validate lowercase letters
		var lowerCaseLetters = /[a-z]/g;
		if (newPsw.value.match(lowerCaseLetters)) {
			letter.classList.remove("invalid");
			letter.classList.add("valid");
		} else {
			letter.classList.remove("valid");
			letter.classList.add("invalid");
		}

		// Validate capital letters
		var upperCaseLetters = /[A-Z]/g;
		if (newPsw.value.match(upperCaseLetters)) {
			capital.classList.remove("invalid");
			capital.classList.add("valid");
		} else {
			capital.classList.remove("valid");
			capital.classList.add("invalid");
		}

		// Validate numbers
		var numbers = /[0-9]/g;
		if (newPsw.value.match(numbers)) {
			number.classList.remove("invalid");
			number.classList.add("valid");
		} else {
			number.classList.remove("valid");
			number.classList.add("invalid");
		}

		// Validate length
		if (newPsw.value.length >= 8) {
			length.classList.remove("invalid");
			length.classList.add("valid");
		} else {
			length.classList.remove("valid");
			length.classList.add("invalid");
		}
	}

	againNewPsw.onkeyup = function () {

		// Validate lowercase letters
		var lowerCaseLetters = /[a-z]/g;
		if (againNewPsw.value.match(lowerCaseLetters)) {
			letter.classList.remove("invalid");
			letter.classList.add("valid");
		} else {
			letter.classList.remove("valid");
			letter.classList.add("invalid");
		}

		// Validate capital letters
		var upperCaseLetters = /[A-Z]/g;
		if (againNewPsw.value.match(upperCaseLetters)) {
			capital.classList.remove("invalid");
			capital.classList.add("valid");
		} else {
			capital.classList.remove("valid");
			capital.classList.add("invalid");
		}

		// Validate numbers
		var numbers = /[0-9]/g;
		if (againNewPsw.value.match(numbers)) {
			number.classList.remove("invalid");
			number.classList.add("valid");
		} else {
			number.classList.remove("valid");
			number.classList.add("invalid");
		}

		// Validate length
		if (againNewPsw.value.length >= 8) {
			length.classList.remove("invalid");
			length.classList.add("valid");
		} else {
			length.classList.remove("valid");
			length.classList.add("invalid");
		}
	}
}

function checkPasswordMatch() {
	var password = $("#newPsw").val();
	var confirmPassword = $("#againNewPsw").val();

	if (password == confirmPassword) {
		ravno.classList.remove("invalid");
		ravno.classList.add("valid");
	}
	else {
		ravno.classList.remove("valid");
		ravno.classList.add("invalid");
	}
}

$(document).ready(function () {
	$("#againNewPsw").keyup(checkPasswordMatch);
});;
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
};
// =====================================client-room(validatePassword)-page====

"use strict"

// ???????? ????????????
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.header-main__inner');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('lock');
		iconMenu.classList.toggle('active');
		menuBody.classList.toggle('active');
	});
};
