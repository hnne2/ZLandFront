<script lang="ts" setup>
import { vMaska } from 'maska/vue'
import * as Yup from 'yup'
import type { FormPartner } from '~/types/FormPartner'
import type { Notification } from '~/types/Notification'
const token = useCookie('auth_token')?.value

const baseUrl = window.location.origin

const { data, error } = await useFetch<any>('/api/partner/')

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

const form = reactive<FormPartner>({
  name: '',
  tel: '',
  email: '',
  telegram: '',
  comment: '',
  createdAt: now,
  updatedAt: now,
})

const notification = ref<Notification>({
  show: false,
  status: false,
  text: '',
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

const handleSubmit = async (_values: any, actions: any) => {
  isLoading.value = true

  const now = Date.now()
  form.createdAt = now
  form.updatedAt = now

  try {
    await $fetch<Response>(`${baseUrl}/apiZ/partners`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: {
        ...form,
      },
    })
    notification.value.status = true
    notification.value.text = 'Заявка успешно отправлена'
    notification.value.show = true

    actions.resetForm()
  } catch (error: any) {
    if (error.statusCode === 422) {
      actions.setErrors(error.data.data.errors)
    } else {
      notification.value.status = false
      notification.value.text = 'Произошла ошибка, попробуйте заново'
      notification.value.show = true
    }
  } finally {
    setTimeout(() => {
      notification.value.show = false
    }, 10000)
    isLoading.value = false
  }
}

</script>

<template>
  <section class="partner">
    <div class="container">
      <div class="partner__head">
        <h1 class="partner__title typo-h1">{{ data.seo.H1 }}</h1>
        <div
          class="partner__head-description typo-p1"
          v-html="data.headPartner.description"
        />
      </div>
      <div class="partner__frame frame">
        <div class="partner__form">
          <div class="partner__form-info">
            <h2 class="partner__subtitle typo-h2">Обсудим детали?</h2>
            <p class="partner__description typo-p1">
              Оставьте заявку, и мы свяжемся с вами в течение часа
            </p>
          </div>
          <Form class="form" :validation-schema="schema" @submit="handleSubmit">
            <div class="form__flex">
              <Field
                v-slot="{ field, meta, errorMessage }"
                v-model="form.name"
                name="name"
              >
                <div class="input" :class="{ disabled: isLoading }">
                  <div class="input__inner">
                    <input
                      v-model.trim="form.name"
                      v-maska
                      data-maska="A"
                      data-maska-tokens="A:[A-Za-zА-Яа-яЁё -]:multiple"
                      v-bind="field"
                      type="text"
                      name="name"
                      autocomplete="name"
                      placeholder="Имя"
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
              >
                <div class="input" :class="{ disabled: isLoading }">
                  <div class="input__inner">
                    <input
                      v-maska="'+7 ### ###-##-##'"
                      v-bind="field"
                      type="tel"
                      name="tel"
                      autocomplete="tel"
                      placeholder="Телефон"
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
              >
                <div class="input" :class="{ disabled: isLoading }">
                  <div class="input__inner">
                    <input
                      v-bind="field"
                      type="email"
                      name="email"
                      autocomplete="email"
                      placeholder="Email"
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
              >
                <div class="input" :class="{ disabled: isLoading }">
                  <div class="input__inner">
                    <input
                      v-bind="field"
                      type="text"
                      name="telegram"
                      placeholder="Telegram ник"
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
              >
                <div class="input" :class="{ disabled: isLoading }">
                  <div class="input__inner">
                    <textarea
                        v-bind="field"
                        name="comment"
                        placeholder="Расскажите о себе"
                        :class="{
                        error: meta.validated && !meta.valid,
                      }"
                        :disabled="isLoading"
                    ></textarea>
                    <label class="input__label"
                    >Расскажите про вас — город, количество магазинов</label
                    >
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
    <AppNotification :notification />
  </section>
</template>

<style lang="scss" scoped>
.partner {
  padding: val(16, 80) 0;

  &__frame {
    padding: 32px val(16, 32) 24px val(16, 32);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
      height: 240px;
    }
  }

  &__description {
    margin-top: 12px;
    color: $color-neutral-300;
  }
}
</style>
