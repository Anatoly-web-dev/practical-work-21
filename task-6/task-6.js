// Задание 6.

// поля ввода: 1 - номер страницы; 2 - лимит
const pageNumberInput = document.querySelector('#page-number');
const limitInput = document.querySelector('#limit');
// галерея изображений
const imgGallery = document.querySelector('.pictures__gallery');
// заголовок списка / текст с сообщением об ошибке запроса
const picturesSubtitle = document.querySelector('.pictures__subtitle');
// При клике на кнопку отправляем запрос:
const picturesBtn = document.querySelector('.pictures__btn');
if (picturesBtn) {
	picturesBtn.addEventListener('click', () => {
		getContent(pageNumberInput, limitInput, imgGallery, picturesSubtitle);
	});
}
// после загрузки страницы запускаем функцию, которая выводит галерею изображений из localStorage
document.addEventListener('DOMContentLoaded', showSavedPictures(imgGallery, picturesSubtitle));

function getContent(input1, input2, gallery, subtitle) {
	// получаем значения инпутов, пытаемся получить целое число
	const pageNumber = parseInt(input1.value);
	const limit = parseInt(input2.value);
	let checkStatus;
	if (input1.value !== '' && input2 !== '') {
		// получаем результат проверки вводимых в инпуты значений
		checkStatus = checkInputValues(pageNumber, limit, subtitle);
		// если результат проверки положительный, делаем запрос
		if (checkStatus) {
			sendRequest(pageNumber, limit);
		} else {
			gallery.innerHTML = '';  // - иначе очищаем галерею с изображениями
		}
	}

	// * Проверяет вводимые в инпуты значения, выводит пользователю сообщение с результатом проверки
	function checkInputValues(pageNum, maxValue) {
		let message = '';
		let condition1 = pageNum < 1 || pageNum > 10 || !Number.isInteger(pageNum);
		let condition2 = maxValue < 1 || maxValue > 10 || !Number.isInteger(maxValue);
		let condition3 = condition1 && condition2;
		if (condition3) {
			message = 'Номер страницы и лимит вне диапазона от <span>1</span> до <span>10</span>';
		} else if (condition1) {
			message = 'Номер страницы вне диапазона от <span>1</span> до <span>10</span>';
		} else if (condition2) {
			message = 'Лимит вне диапазона от <span>1</span> до <span>10</span>';
		} else {
			message = 'Галерея изображений';
			subtitle.innerHTML = message;
			subtitle.classList.remove('error-text');
			return true;
		}
		subtitle.classList.add('error-text');
		subtitle.innerHTML = message;
	}

	// * отправляет запрос, обрабатывает ответ (выводит контент или сообщает об ошибке)
	function sendRequest(pageNum, maxValue) {
		const url = `https://picsum.photos/v2/list?page=${pageNum}&limit=${maxValue}`;
		fetch(url)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					showError(subtitle, response);
				}
			})
			.then((data) => {
				if (data && data.length > 0) {
					deleteSavedPictures(gallery); // удаляем изображения из localStorage и со страницы  
					let count = 1;
					data.forEach(elem => {
						const url = elem.download_url; // для удобства сохраняем url
						createGalleryHtml(gallery, url, count); // отображаем на странице полученные изображения
						localStorage.setItem(`image_${count}`, url); // сохраняем url изображения в localStorage
						count++; // увеличиваем на 1, для именования альт. описания и имени ключей в localStorage
					});
				} else {
					console.log('Отсутствует запрашиваемый контент');
				}
			})
		// * Показывает пользователю сообщение об ошибке, при неудачном запросе
		function showError(subtitle, resp) {
			subtitle.textContent = `Не удалось выполнить запрос :( Код ошибки: ${resp.status}`;
			subtitle.classList.add('error-text');
			console.log(`Не удалось выполнить запрос :( Код ошибки: ${resp.status}`);
		}
		// Удаляет все полученные ранее изображения из localStorage и удаляет их со страницы
		function deleteSavedPictures(gallery) {
			gallery.innerHTML = '';
			for (let key in localStorage) {
				if (String(key).includes('image_')) {
					localStorage.removeItem(key);
				}
			}
		}
	}
}
// создает html галереи изображений
function createGalleryHtml(gallery, url, i) {
	const imgWrapper = document.createElement('div'); // создаём div (контейнер для изображения)
	imgWrapper.classList.add('pictures__image'); // добавляем класс
	const img = document.createElement('img'); // создаем картинку
	img.classList.add('img-adaptive'); // добавляем класс
	img.setAttribute('src', `${url}`); // устанавливаем адрес изображения
	img.setAttribute('alt', `img_${i}`); // добавляем альтернативный текст изображению
	imgWrapper.append(img); // помещаем картинку в ее контейнер
	gallery.append(imgWrapper); // добавляем div в галерею
}
// показывает галерею изображений из localStorage на странице 
function showSavedPictures(gallery, subtitle) {
	let count = 1;
	for (let key in localStorage) {
		if (String(key).includes('image_') && localStorage.length > 0) {
			const url = localStorage.getItem(`image_${count}`);
			createGalleryHtml(gallery, url, count); // запускаем функцию, отображающую контент галереи
			count++;
			subtitle.innerHTML = 'Галерея изображений';
		}
	}
}