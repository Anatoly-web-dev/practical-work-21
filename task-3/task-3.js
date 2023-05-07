// Задание 3.
/*
Написать скрипт, который при открытии страницы будет делать следующее:
- Если пользователь зашел в первый раз, вывести окно prompt с сообщением: «Добро пожаловать! Назовите, пожалуйста, ваше имя».
- После того, как пользователь введет имя, записать имя, дату и время визита в localStorage. Подсказка: для определения текущей даты используйте new Date().
- Если пользователь открывает страницу не впервые (это можно узнать по наличию соответствующих записей в localStorage), вывести в alert сообщение вида: «Добрый день, *имя пользователя*! Давно не виделись. В последний раз вы были у нас *дата последнего посещения*» и перезаписать дату последнего посещения.
- Дату можно вывести в любом удобочитаемом формате (не Timestamp, должен четко читаться день, месяц, год и время — часы и минуты).
*/

document.addEventListener('DOMContentLoaded', sayHello);

function sayHello() {
	// запрашивает имя пользователя, сохраняет в localStorage имя и дату посещения
	function getUserInfo(func) {
		let userName;
		do {
			userName = prompt('Добро пожаловать! Назовите, пожалуйста, ваше имя');
			localStorage.setItem('current_user_name', userName);
		} while (userName === '' || userName === null || isFinite(userName));
		func();
	}
	// сохраняем время визита пользователя в localStorage в нужном нам формате
	function setVisitDate() {
		const currentDate = new Date(Date.now()).toLocaleString();
		localStorage.setItem('last_visit_date', currentDate);
	}
	// Показываем сообщение пользователю
	function showMessage(name) {
		alert(`Добрый день, ${name}! Давно не виделись.
	В послений раз вы были у нас ${localStorage['last_visit_date']}`);
	}
	// если имя есть в localStorage, сохраняем его в переменную, если нет то запрашиваем
	const currentUserName = (localStorage['current_user_name']) ?
		localStorage['current_user_name'] : getUserInfo(setVisitDate);
	// если имя пользователя установлено
	if (currentUserName) {
		showMessage(currentUserName); // - приветствуем пользователя
		setVisitDate(); // - обновляем дату посещения в localStorage
	}
}