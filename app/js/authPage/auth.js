function authFunction() {
	let login = document.getElementById('login').value;
	let password = document.getElementById('password').value;

	if (login == 'admin@gmail.com' && password == 'admin') {
		window.location.href = 'http://r-krivobok-dev.com/crypto/auth.html';
	}
	else {
		alert('Не правильно введен логин или пароль');
	}
}