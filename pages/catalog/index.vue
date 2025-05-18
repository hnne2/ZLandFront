<script lang="ts" setup>
const token = useCookie('auth_token')?.value
const baseUrl = window.location.origin

const { data, error } = await useFetch<any>(`${baseUrl}/apiZ/vapes/categories`, {
  headers: token ? { Authorization: `Bearer ${token}` } : {}
})
if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
    fatal: true,
  })
}
</script>

<template>
  <section class="categories">
    <h1 class="visually-hidden">{{ data.seo.H1 }}</h1>
    <template v-if="data">
      <div class="container">
        <p class="typo-h1">Нажмите на раздел, чтобы увидеть список вкусов</p>
        <ul class="categories__list">
          <li
            v-for="category in data.categories"
            :key="category.id"
            class="categories__item"
          >
            <CategoryCard :category="category" />
          </li>
        </ul>
        <NuxtLink class="categories__btn-all btn btn--dark" to="/catalog/all/">
          Смотреть все
        </NuxtLink>
      </div>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.categories {
  padding: val(24, 60) 0;

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: val(16, 24);
    margin-top: val(32, 40);
    @media (min-width: $sm) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  &__item {
    aspect-ratio: 1/1;
  }

  &__btn-all {
    width: 100%;
    margin-top: val(24, 32);
  }
}
</style>
