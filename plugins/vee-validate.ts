import { setLocale } from 'yup'

export default defineNuxtPlugin(nuxtApp => {
	setLocale({
		mixed: {
			default: 'Поле неверно заполнено',
			required: 'Обязательное поле'
		},
		string: {
			email: 'Некорректный email'
		},
		array: {
			min: 'Файлы должны быть добавлены',
			max: 'Максимальное количество файлов достигнуто'
		}
	})
})
