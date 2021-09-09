function authFunction() {
	let login = document.getElementById('login').value;
	let password = document.getElementById('password').value;

	if (login == 'admin@gmail.com' && password == 'admin') {
		window.location.href = 'http://localhost:3000/clientRoom.html';
	}
	else {
		alert('Не правильно введен логин или пароль');
	}
}