<script lang="ts" setup>
import type { AboutCard } from '~/types/AboutCard'

defineProps<AboutCard>()
</script>

<template>
  <article class="about-card frame">
    <h3 class="about-card__title typo-h4">{{ label }}</h3>
    <div class="about-card__description typo-p2-medium" v-html="description" />
    <div class="about-card__img">
      <img :src="image.url" :alt="image.alt" />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.about-card {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 24px 0 0;
  overflow: hidden;
  aspect-ratio: 1/1;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.4);
  @media (min-width: $sm) {
    box-shadow: none;
  }

  &__title {
    font-weight: 600;
    font-size: 24px;
    line-height: 140%;
    margin-bottom: 4px;
  }

  &__description {
    color: $color-neutral-300;
  }

  &__img {
    margin-top: auto;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .about-card:nth-child(1) & {
      width: calc(100% + 70px);
      margin: 0 -35px;
    }
  }
}
</style>
