<script lang="ts" setup>
const logo = 'images/icons/icon-logo.svg'
</script>

<template>
  <div class="logo">
    <img :src="logo" alt="Zland" />
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/general/mixins' as *;

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: val(104, 130);
  }
}
</style>
