const formImage = document.getElementById('formImage');
const formPreview = document.getElementById('formPreview');

//проверка изминения input
if (formImage) {
	formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0]);
	});

	//валидация изображения
	function uploadFile(file) {
		if (!['image/jpeg', 'image/png'].includes(file.type)) {
			alert('Разрешено добавлять только изображения!');
			formImage.value = '';
			return;
		}

		//вставляем изображения которое было выбрано в formImage
		var reader = new FileReader();
		reader.onload = function (e) {
			let img = e.target.result;
			formPreview.innerHTML = '<img src="' + img + '" alt="photo">';
		};
		reader.onerror = function (e) {
			alert('Допущена ошибка');
		};
		reader.readAsDataURL(file);
	}
}