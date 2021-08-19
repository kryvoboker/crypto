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
}