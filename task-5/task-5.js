// Задание 5.

// получаем кнопку и если такая есть, вешаем ей событие (при клике отправляем запрос)  
const ToDoListBtn = document.querySelector('.todo-list__btn');
if (ToDoListBtn) {
	ToDoListBtn.addEventListener('click', createRequest);
}

// отправляет запрос и обрабатывает ответ (вывод полученный список пользователю)
function createRequest() {
	const textInputField = document.querySelector('.todo-list__input'); // - получаем инпут
	const value = textInputField.value; // - получаем id пользователя, введенное в инпут
	const url = `https://jsonplaceholder.typicode.com/users/${value}/todos`; // - url запроса
	const subtitle = document.querySelector('.todo-list__subtitle'); // - заголовок списка
	const toDoList = document.querySelector('.todo-list__list'); // - получаем список
	// создаем запрос
	if (value !== '') {
		fetch(url)
			.then((response) => {
				if (response.ok) {
					return response.json(); // - парсим JSON
				}
				console.log(`Не удалось выполнить запрос. Код ошибки: ${response.status}`);
			})
			.then((data) => {
				textInputField.value = '';
				if (data && data.length > 0) { // - если массив существует и он не пустой
					createHtml(data); // - создаём список, наполняем контентом
				} else {
					showErrorMessage(value);
					toDoList.classList.add('none');
				}
			})
	}
	// создаём список, наполняет контентом, задает нужные классы
	function createHtml(array) {
		toDoList.classList.remove('none');
		toDoList.innerHTML = '';
		subtitle.innerHTML = `Список задач для пользователя c id <span>${value}</span>:`;
		subtitle.classList.remove('error-text');
		array.forEach(element => {
			const li = document.createElement('li');
			toDoList.append(li);
			li.textContent = element.title;
			if (element.completed === true) {
				li.classList.add('todo-list__item', 'todo-list__item_completed');
			} else {
				li.classList.add('todo-list__item', 'todo-list__item_to-do');
			}
		});
	}
	// показывает сообщение пользователю об ошибке
	function showErrorMessage(id) {
		subtitle.innerHTML = `Пользователь с введенным id <span>${id}</span> не найден`;
		subtitle.classList.add('error-text');
	}
}