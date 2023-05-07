// Задание 4.
/*
Создать Promise, в котором c задержкой в три секунды сгенерировать случайное целое число от 1 до 100. Для создания задержки использовать setTimeout. Если сгенерированное число четное — Promise выполнится успешно (resolve), если нечетное — выполнится с ошибкой (reject). После разрешения Promise обработать результат его выполнения и вывести сообщение в консоль:
- «Завершено успешно. Сгенерированное число — number», если Promise завершился успешно. Вместо number подставить сгенерированное число
- «Завершено с ошибкой. Сгенерированное число — number», если Promise завершился с ошибкой. Вместо number подставить сгенерированное число 
*/

document.addEventListener('DOMContentLoaded', usePromise);

function usePromise() {
	const showResult = new Promise((resolve, reject) => {
		setTimeout(() => {
			// генерирует случайное целое число от min до max
			const getRandomNumber = (min, max) =>
				Math.floor(min + Math.random() * (max - min + 1));
			// передаем результат выполнения ф-и в константу   	
			const randomNumber = getRandomNumber(1, 100);
			// если число четное - выполняем resolve(), нечетное - reject()
			(randomNumber % 2 == 0) ? resolve(randomNumber) : reject(randomNumber);
		}, 3000); // - с задержкой 3 сек.
	});

	const showCompleteMessage = (value) => console.log(
		`Завершено успешно. Сгенерированное число — ${value}`);

	const showErrorMessage = (value) => console.log(
		`Завершено с ошибкой. Сгенерированное число — ${value}`);

	showResult
		.then((even) => showCompleteMessage(even))
		.catch((odd) => showErrorMessage(odd));
}