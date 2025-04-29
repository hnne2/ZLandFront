<script lang="ts" setup></script>

<template>
  <p class="input-msg error">
    <NuxtIcon name="icon-warning" />
    <slot />
  </p>
</template>

<style lang="scss" scoped>
.input-msg {
  display: flex;
  align-items: center;
  gap: 4px;
  text-align: left;
  margin-top: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  color: $color-neutral-300;
  &.error {
    color: $color-red;
  }
  :deep(.nuxt-icon svg) {
    width: 16px;
    height: 16px;
  }
}
</style>
