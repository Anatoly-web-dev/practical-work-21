// Задание №2.

// Дан образец JSON-строки: {"name":"Anton","age":36,"skills":["Javascript","HTML","CSS"],"salary":80000}
// Ваша задача — создать JS-объект, который при преобразовании в JSON будет возвращать в качестве результата такую же JSON-строку, как в образце. Получившуюся строку вывести в консоль

document.addEventListener('DOMContentLoaded', useConvertObjectToJSON);

function useConvertObjectToJSON() {
	const user = {
		id: 1452101,
		login: 'Boris_90',
		nickname: 'Boris',
		password: 'Classic_qwerty1234',
		email: 'boris_90@mail.ru',
		address: {
			region: 'ru',
			city: 'Sochi',
			street: 'Ostrovsky',
			house: 22,
		},
		'admin rights': false,
		'dates of the last five visits': [
			'11-02-2023-18-44-32',
			'07-03-2023-12-13-12',
			'14-04-2023-13-55-02',
			'18-04-2023-22-09-35',
			'01-05-2023-11-00-31'
		],
	};
	// преобразуем JSON в объект
	const convertObjectToJSON = (obj) => JSON.stringify(obj);
	console.log(convertObjectToJSON(user)); // - выводим в консоль
}