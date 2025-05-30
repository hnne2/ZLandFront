<script lang="ts" setup>
import { vMaska } from 'maska/vue'
import * as Yup from 'yup'

const { data, error } = await useFetch<any>('/api/proof/')

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
    fatal: true,
  })
}

definePageMeta({
  layout: 'dark',
})

interface FormData {
  date: string
}

const form = reactive<FormData>({
  date: '',
})

const schema = Yup.object().shape({
  date: Yup.string()
    .required('Введите дату в формате ДД.ММ.ГГГГ')
    .length(10, 'Введите дату в формате ДД.ММ.ГГГГ')
    .test('is-valid-date', 'Некорректная дата', (value) => {
      if (!value) return false
      const [day, month, year] = value.split('.').map(Number)
      const date = new Date(year, month - 1, day)

      if (
        !day ||
        !month ||
        !year ||
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        return false
      }

      return true
    })
    .test('not-in-future', 'Дата не может быть в будущем', (value) => {
      if (!value) return false
      const [day, month, year] = value.split('.').map(Number)
      const birthDate = new Date(year, month - 1, day)
      const today = new Date()

      return birthDate <= today
    })
    .test('is-18+', 'Вам должно быть 18 лет или больше', (value) => {
      if (!value) return false
      const [day, month, year] = value.split('.').map(Number)
      const birthDate = new Date(year, month - 1, day + 1)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      const d = today.getDate() - birthDate.getDate()

      if (age > 18) return true
      if (age === 18 && (m > 0 || (m === 0 && d >= 0))) return true

      return false
    })
    .test('realistic-age', 'Вам больше 100 лет? Не верю!', (value) => {
      if (!value) return false
      const [day, month, year] = value.split('.').map(Number)
      const birthDate = new Date(year, month - 1, day)
      const today = new Date()

      const age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      const d = today.getDate() - birthDate.getDate()

      if (age > 100 || (age === 100 && (m < 0 || (m === 0 && d < 0)))) {
        return false
      }

      return true
    }),
})

const isLoading = ref<boolean>(false)

const handleSubmit = async () => {
  isLoading.value = true

  try {
    const adult = useCookie<string>('adult')
    const redirectPath = useCookie<string>('redirectAfterProof')

    const token = useCookie<string>('auth_token')?.value
    const baseUrl = window.location.origin

    const response = await $fetch(`${baseUrl}/apiZ/auth/proof`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })

    if (response.confirmed) {
      adult.value = 'adult'

      const target = redirectPath.value || '/'
      redirectPath.value = '' // очищаем, чтобы не было зацикливания

      navigateTo(target)
    } else {
      throw new Error('Не удалось подтвердить возраст')
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Ошибка при отправке подтверждения возраста:', error)

  } finally {
    isLoading.value = false
  }
}

</script>

<template>
  <section class="proof">
    <h1 class="visually-hidden">
      {{ data.seo.H1 }}
    </h1>
    <div class="container">
      <div class="proof__frame frame">
        <div class="proof__head">
          <AppLogo />
          <span class="proof__label">18+</span>
        </div>
        <div class="proof__form">
          <div class="proof__form-info">
            <p class="proof__description typo-p1-medium">
              Я подтверждаю, что мне исполнилось 18 или более лет, и я являюсь
              потребителем табака или иной содержащей никотин продукции
            </p>
            <p class="proof__subtitle">Укажите дату вашего рождения</p>
          </div>
          <Form
            v-slot="{ meta: formMeta }"
            class="form"
            :validation-schema="schema"
            @submit="handleSubmit"
          >
            <Field
              v-slot="{ field, meta, errorMessage }"
              v-model="form.date"
              name="date"
            >
              <div class="input">
                <div class="input__inner">
                  <input
                    v-maska="'##.##.####'"
                    v-bind="field"
                    :disabled="isLoading"
                    type="tel"
                    name="date"
                    placeholder="Дата рождения"
                    :class="{
                      error: meta.validated && !meta.valid,
                    }"
                  />
                  <label class="input__label">Дата рождения</label>
                </div>
                <FormMessage v-if="errorMessage">
                  {{ errorMessage }}
                </FormMessage>
              </div>
            </Field>
            <button
              :disabled="!formMeta.valid || isLoading"
              class="btn btn--light"
              type="submit"
            >
              Подтвердить
            </button>
          </Form>
        </div>
        <p class="proof__footer typo-p3-medium">
          Этот сайт содержит информацию о бездымных продуктах, предназначенных
          только для лиц старше 18 лет
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.proof {
  padding: val(16, 80) 0;
  height: 100dvh;
  min-height: 600px;
  max-height: 1000px;

  .container {
    height: 100%;
  }

  &__frame {
    padding: 32px val(16, 40) 24px val(16, 40);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
  }

  &__head {
    position: relative;
  }

  &__label {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    text-align: center;
    width: 32px;
    height: 32px;
    border: 1.5px solid #fff;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &__description {
    margin-bottom: 12px;
  }

  &__subtitle {
    color: $color-neutral-300;
  }

  &__footer {
    color: $color-neutral-400;
  }
}
</style>
