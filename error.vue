<script setup lang="ts">
const error = useError()

const handleError = () => {
  clearError({
    redirect: '/',
  })
}
</script>

<template>
  <NuxtLayout>
    <div v-if="error" class="error-page">
      <div class="container">
        <div class="error-page__frame frame">
          <h1 class="typo-h1-big">
            {{ error.statusCode }} <span class="typo-p3-medium">ошибка</span>
          </h1>
          <p v-if="error.statusMessage" class="typo-p1">
            {{ error.statusMessage }}
          </p>
          <p class="typo-p1-medium">{{ error.message }}</p>
          <button class="btn btn--light" @click="handleError">
            Главная страница
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.error-page {
  text-align: center;
  padding: val(16, 80) 0;
  height: 100dvh;
  &__frame {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    height: 100%;
    min-height: 520px;
    @media (min-width: $sm) {
      min-height: auto;
      height: 520px;
    }
  }
  h1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      color: $color-neutral-400;
    }
  }
}
</style>
