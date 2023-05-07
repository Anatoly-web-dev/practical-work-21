// Задание №1.

// Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

const infoAboutStudents = `
	<list>
		<student>
			<name lang="en">
				<first>Ivan</first>
				<second>Ivanov</second>
			</name>
			<age>35</age>
			<prof>teacher</prof>
		</student>
		<student>
			<name lang="ru">
				<first>Петр</first>
				<second>Петров</second>
			</name>
			<age>58</age>
			<prof>driver</prof>
		</student>
	</list>
`;

document.addEventListener('DOMContentLoaded', useCreateObjectFromXml);

// Функция формирует объект из полученного xml. 
function createObjectFromXml(xml, objectKeyName) {
	// преобразует xml в объект 
	function getObjectFromXml(xml) {
		const parser = new DOMParser();
		return parser.parseFromString(xml, "text/xml");
	}
	// поможет в создании однотипных объектов по заданному шаблону.  
	function createInstanceFromStudent(sel1, sel2, sel3, sel4, sel5) {
		// Текст каждого полученного элемента становится значением для определенного свойства
		const objFromXml = getObjectFromXml(xml);
		const firstname = objFromXml.querySelector(sel1).textContent;
		const surname = objFromXml.querySelector(sel2).textContent;
		const age = objFromXml.querySelector(sel3).textContent;
		const prof = objFromXml.querySelector(sel4).textContent;
		const lang = objFromXml.querySelector(sel5).getAttribute('lang');
		// создаём функцию-конструктор 
		function Student(firstname, surname, age, prof, lang) {
			this.name = `${firstname}  ${surname}`;
			this.age = age;
			this.prof = prof;
			this.lang = lang;
		}
		// переданные в ф-ю аргументы станут значениями для определённого ключа нового объекта
		return new Student(firstname, surname, age, prof, lang);
	}
	// формирует объект, который содержит массив с однотипными объектами
	function createObject() {
		const firstStudent = createInstanceFromStudent(
			'student:first-child first', 'student:first-child second',
			'student:first-child age', 'student:first-child prof',
			'student:first-child name');
		const secondStudent = createInstanceFromStudent(
			'student:nth-child(2) first', 'student:nth-child(2) second',
			'student:nth-child(2) age', 'student:nth-child(2) prof',
			'student:nth-child(2) name');

		const newObject = { [objectKeyName]: [] };

		newObject[objectKeyName].push(firstStudent, secondStudent);
		return newObject;
	}

	return createObject();
}

function useCreateObjectFromXml() {
	// результат работы ф-и создаём объект из xml. В аргументы функции передаём (XML, имя-ключа-объекта)
	const students = createObjectFromXml(infoAboutStudents, 'list');
	console.log(students); // - выводим в консоль созданный объект
}