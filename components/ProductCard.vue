<script lang="ts" setup>
import type { Product } from '~/types/Product'

defineProps<{
  product: Product
}>()
const baseUrl = window.location.origin
function formatValue(value: string | number): string {
  const num = parseFloat(value.toString())
  if (isNaN(num)) return value.toString()
  return Number.isInteger(num) ? num.toString() : num.toFixed(1)
}
</script>

<template>
  <div class="product-card">
    <div class="product-card__img">
      <img :src="`${baseUrl}/apiZ/images${product.image.url}`" :alt="product.image.alt" />
      <span v-if="product.isTop" class="product-card__label">топ-15</span>
    </div>
    <h2 class="product-card__title typo-h3">{{ product.label }}</h2>
    <div class="product-card__parameters">
      <div
          v-for="parameter in product.parameters"
          :key="parameter.id"
          class="product-card__parameters-item"
      >
        <div class="product-card__parameters-info typo-p3-medium">
          <span>{{ parameter.label }}</span>
          <span>{{ formatValue(parameter.value) }}</span>

        </div>
        <div
            class="product-card__parameters-indicator"
            :data-value="isNaN(parseFloat(parameter.value)) ? '0' : parseFloat(parameter.value).toString()"        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@mixin fill-progress($value, $max-bars: 5, $max-value: 5) {
  $bar-value: calc($max-value / $max-bars);

  // Если значение равно 0, не заполняем ни одной полоски
  @if $value == 0 {
    // Все полоски остаются пустыми
  } @else {
    // Количество полностью заполненных делений
    $full-bars: math.floor(calc($value / $bar-value));
    // Процент заполнения следующего деления
    $partial-fill: (calc((math.max($value % $bar-value)) / $bar-value)) * 100%;

    // Заполняем полные деления
    @for $i from 1 through $full-bars {
      span:nth-child(#{$i})::before {
        width: 100%;
      }
    }

    // Заполняем частично заполненное деление, если есть остаток
    @if $partial-fill > 0 and $full-bars < $max-bars {
      span:nth-child(#{$full-bars + 1})::before {
        width: $partial-fill;
      }
    }
  }
}

.product-card {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__img {
    padding: 16px 8px;
    background-color: #fff;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    box-shadow: 0px 0px 12px 0px rgba(119, 119, 119, 0.08);
    position: relative;
    aspect-ratio: 1/1;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__label {
    position: absolute;
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%) rotate(-4deg);
    background-color: $color-black;
    color: #fff;
    font-weight: 600;
    font-size: val(12, 14);
    line-height: 130%;
    border-radius: 8px;
    padding: 4px 8px;
  }

  &__parameters {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__parameters-item {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &:nth-child(1) .product-card__parameters-indicator span::before {
      background-color: $color-pink;
    }

    &:nth-child(2) .product-card__parameters-indicator span::before {
      background-color: $color-blue;
    }

    &:nth-child(3) .product-card__parameters-indicator span::before {
      background-color: $color-green;
    }
  }

  &__parameters-info {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  &__parameters-indicator {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 4px;

    span {
      position: relative;
      overflow: hidden;
      height: 8px;
      border-radius: 8px;
      background-color: $color-neutral-200;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        border-radius: 8px;
        transition: width 0.3s ease;
      }
    }

    @for $i from 0 through 50 {
      $value: $i * 0.1; // Значение от 0 до 5 с шагом 0.1
      &[data-value='#{$value}'] {
        @include fill-progress($value);
      }
    }
  }
}
</style>