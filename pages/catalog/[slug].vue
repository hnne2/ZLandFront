<script lang="ts" setup>
const slug = useRoute().params.slug as string

const { data, error } = await useFetch<any>(`/api/catalog/${slug}/`)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
    fatal: true,
  })
}
</script>

<template>
  <section class="catalog">
    <div class="container">
      <NuxtLink class="btn-text" to="/catalog">
        <NuxtIcon name="icon-arrow" />
        Назад
      </NuxtLink>
      <div class="catalog__info">
        <h1 class="catalog__info-title typo-h1">{{ data.seo.H1 }}</h1>
        <div class="catalog__info-list typo-p1" v-html="data.specification" />
      </div>
      <ul class="catalog__list">
        <li
          v-for="product in data.products"
          :key="product.id"
          class="catalog__item"
        >
          <ProductCard :product="product" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.catalog {
  padding: val(24, 60) 0;

  &__info {
    margin-top: val(32, 40);
  }

  &__info-list {
    :deep(ul) {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 20px;
      padding-left: 27px;
    }

    :deep(li) {
      list-style-type: disc;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: val(16, 24);
    row-gap: 32px;
    margin-top: val(32, 40);
    @media (min-width: $sm) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
</style>
