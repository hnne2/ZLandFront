<script lang="ts" setup>
const { data, error } = await useFetch<any>(`/api/home/`)

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
</script>

<template>
  <div class="home-screen">
    <div class="container">
      <AppLogo />
      <nav class="nav">
        <ul class="nav__list">
          <li v-for="item in data.nav" :key="item.id" class="nav__item">
            <NuxtLink class="btn btn--light" :to="item.to">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style lang="scss">
.home-screen {
  padding: val(24, 60);

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 60px;
  }
}

.nav {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__item {
    a {
      width: 100%;
    }
  }
}
</style>
