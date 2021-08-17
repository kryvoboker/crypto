const titles = document.querySelectorAll('.question__item-title');
const text = document.querySelectorAll('.question__text');
for (let i = 0; i < titles.length; i++) {
	const el = titles[i];
	el.onclick = function () {

		for (let j = 0; j < text.length; j++) {
			const elem = text[j];
			if (elem.classList.contains('active')) {
				elem.classList.remove('active');
				document.querySelector('.question__row+.question__row').classList.remove('active');
			}
			if (!elem.classList.contains('active')) {
				document.querySelector('.question__row+.question__row').classList.add('active');
				text[i].classList.add('active');
			}
		}
	};
}