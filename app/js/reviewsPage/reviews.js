var newDate = new Date();
var month = new Array("января", "февраля", "марта", "апреля", "мая", "июня",
	"июля", "августа", "сентября", "октября", "ноября", "декабря");

const date = document.querySelectorAll('.reviews__date');
for (let i = 0; i < date.length; i++) {
	const el = date[i];
	el.innerHTML = newDate.getDate() + ' - '
		+ month[newDate.getMonth()] + ' - '
		+ newDate.getFullYear();
}