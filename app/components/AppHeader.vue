<script lang="ts" setup>
const logo = 'images/icons/icon-logo.svg'
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <img :src="logo" alt="" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.logo {
  width: 130px;
  height: 40px;
  fill: #000;
}
</style>
