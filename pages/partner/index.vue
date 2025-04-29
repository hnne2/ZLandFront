<script lang="ts" setup>
import { vMaska } from 'maska/vue'
import * as Yup from 'yup'

definePageMeta({
  layout: 'dark',
})
useHead({
  title: 'Партнёрство',
})

interface FormData {
  name: string
  tel: string
  email: string
  telegram: string
  comment: string
}

const form = reactive<FormData>({
  name: '',
  tel: '',
  email: '',
  telegram: '',
  comment: '',
})

const schema = Yup.object().shape({
  name: Yup.string().required(),
  tel: Yup.string().required().length(16, 'Укажите корректный телефон'),
  email: Yup.string().email(),
  telegram: Yup.string()
    .transform((value) => (!value ? null : value))
    .matches(/^@/, 'Telegram ник должен начинаться с @. Например @nickname')
    .nullable(),
  comment: Yup.string().max(500, 'Максимум 500 символов'),
})

const isLoading = ref<boolean>(false)

const handleSubmit = (values: any) => {
  isLoading.value = true
  console.log('Значения формы:', values)
}
</script>

<template>
  <div class="partner">
    <div class="container">
      <div class="partner__head">
        <h1 class="partner__title">Партнёрство</h1>
        <div class="partner__head-description p1">
          <p>
            Мы открыты к сотрудничеству с магазинами, блогерами и организаторами
            мероприятий.
          </p>
          <p>
            Предлагаем выгодные условия, поддержку и эксклюзивные предложения
            для наших партнёров.
          </p>
        </div>
      </div>
      <div class="partner__frame frame">
        <div class="partner__form">
          <div class="partner__form-info">
            <h2 class="partner__subtitle">Обсудим детали?</h2>
            <p class="partner__description p1">
              Оставьте заявку, и мы свяжемся с вами в течение часа
            </p>
          </div>
          <Form class="form" :validation-schema="schema" @submit="handleSubmit">
            <div class="form__flex">
              <Field
                v-slot="{ field, meta, errorMessage }"
                v-model="form.name"
                name="name"
                validate-on-input
              >
                <div class="input" :class="{ disabled: isLoading }">
                  <div class="input__inner">
                    <input
                      v-bind="field"
                      type="text"
                      name="date"
                      autocomplete="name"
                      placeholder=""
                      :class="{
                        error: meta.validated && !meta.valid,
                      }"
                      :disabled="isLoading"
                    />
                    <label class="input__label">Имя<span>*</span></label>
                  </div>
                  <FormMessage v-if="errorMessage">
                    {{ errorMessage }}
                  </FormMessage>
                </div>
              </Field>
              <Field
                v-slot="{ field, meta, errorMessage }"
                v-model="form.tel"
                name="tel"
                validate-on-input
              >
                <div class="input" :class="{ disabled: isLoading }">
                  <div class="input__inner">
                    <input
                      v-maska="'+7 ### ###-##-##'"
                      v-bind="field"
                      type="tel"
                      name="tel"
                      autocomplete="tel"
                      placeholder=""
                      :class="{
                        error: meta.validated && !meta.valid,
                      }"
                      :disabled="isLoading"
                    />
                    <label class="input__label">Телефон<span>*</span></label>
                  </div>
                  <FormMessage v-if="errorMessage">
                    {{ errorMessage }}
                  </FormMessage>
                </div>
              </Field>
              <Field
                v-slot="{ field, meta, errorMessage }"
                v-model="form.email"
                name="email"
                validate-on-input
              >
                <div class="input" :class="{ disabled: isLoading }">
                  <div class="input__inner">
                    <input
                      v-bind="field"
                      type="email"
                      name="email"
                      autocomplete="email"
                      placeholder=""
                      :class="{
                        error: meta.validated && !meta.valid,
                      }"
                      :disabled="isLoading"
                    />
                    <label class="input__label">Email</label>
                  </div>
                  <FormMessage v-if="errorMessage">
                    {{ errorMessage }}
                  </FormMessage>
                </div>
              </Field>
              <Field
                v-slot="{ field, meta, errorMessage }"
                v-model="form.telegram"
                name="telegram"
                validate-on-input
              >
                <div class="input" :class="{ disabled: isLoading }">
                  <div class="input__inner">
                    <input
                      v-bind="field"
                      type="text"
                      name="telegram"
                      placeholder=""
                      :class="{
                        error: meta.validated && !meta.valid,
                      }"
                      :disabled="isLoading"
                    />
                    <label class="input__label">Telegram ник</label>
                  </div>
                  <FormMessage v-if="errorMessage">
                    {{ errorMessage }}
                  </FormMessage>
                </div>
              </Field>
              <Field
                v-slot="{ field, meta, errorMessage }"
                v-model="form.comment"
                name="comment"
                validate-on-input
              >
                <div class="input" :class="{ disabled: isLoading }">
                  <div class="input__inner">
                    <textarea
                      v-bind="field"
                      name="comment"
                      placeholder=""
                      :class="{
                        error: meta.validated && !meta.valid,
                      }"
                      :disabled="isLoading"
                    ></textarea>
                    <label class="input__label">Расскажите о себе</label>
                  </div>
                  <FormMessage v-if="errorMessage">
                    {{ errorMessage }}
                  </FormMessage>
                </div>
              </Field>
            </div>
            <button :disabled="isLoading" class="btn btn--light" type="submit">
              Отправить
            </button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/abstracts/mixins' as *;
@use '../../assets/scss/general/variables' as *;

.partner {
  padding: val(16, 80) 0;

  &__frame {
    padding: 32px val(16, 32) 24px val(16, 32);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
  }

  &__head {
    position: relative;
    margin-bottom: 40px;
  }

  &__title {
    margin-bottom: 20px;
  }

  &__head-description {
    display: flex;
    flex-direction: column;
    gap: 8px;
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
    textarea {
      height: 160px;
    }
  }

  &__form-info {
  }

  &__description {
    margin-top: 12px;
    color: $color-neutral-300;
  }

  &__subtitle {
  }
}
</style>
