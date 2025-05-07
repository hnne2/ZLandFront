import { setLocale } from 'yup'

export default defineNuxtPlugin((_nuxtApp) => {
  setLocale({
    mixed: {
      default: 'Поле неверно заполнено',
      required: 'Обязательно для заполнения',
    },
    string: {
      email: 'Некорректный email',
    },
    array: {
      min: 'Файлы должны быть добавлены',
      max: 'Максимальное количество файлов достигнуто',
    },
  })
})
