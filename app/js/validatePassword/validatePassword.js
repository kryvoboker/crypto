var newPsw = document.getElementById("newPsw");
var againNewPsw = document.getElementById("againNewPsw");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
var ravno = document.getElementById("ravno");

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
});