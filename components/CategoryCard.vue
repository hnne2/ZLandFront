<script lang="ts" setup>
import type { Category } from '~/types/Category'

interface Props {
  category: Category
}

defineProps<Props>()
</script>

<template>
  <NuxtLink class="category-card" :to="`${'/catalog/' + category.link.to}`">
    <img
      class="category-card__img"
      :src="category.icon.url"
      :alt="category.icon.alt"
    />
    <h2 class="category-card__name typo-h3">{{ category.link.label }}</h2>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.category-card {
  padding: 16px 8px;
  background-color: #fff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  height: 100%;
  box-shadow: 0px 0px 12px 0px rgba(119, 119, 119, 0.08);
  transition: all 0.2s ease 0s;
  @media (hover: hover) {
    &:hover {
      background-color: $color-neutral-200;
      box-shadow: none;
    }
  }

  &:active {
    background-color: $color-neutral-200;
    box-shadow: none;
  }

  &__img {
    width: val(80, 120);
    height: val(80, 120);
  }

  &__name {
    text-align: center;
  }
}
</style>
