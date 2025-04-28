<script lang="ts" setup>
definePageMeta({
  layout: 'dark',
})
useHead({
  title: 'О продукте',
})
</script>

<template>
  <section class="about">
    <div class="container">
      <div class="about__banner">
        <AppLogo />
        <h1 class="title-banner">Zland Mini</h1>
        <p class="about__description p1">
          Твой персональный мир вейпинга, <br />где ты сам задаёшь правила игры
        </p>
        <div class="about__banner-img">
          <img src="/images/about/about-home.png" alt="Zland Mini" />
        </div>
      </div>
      <div class="about__info">
        <h4 class="about__subtitle">Не просто девайс</h4>
        <div class="about__info-description p1">
          <p>
            Элегантный дизайн, регулируемая мощность и самое главное -
            возможность смешивать картриджи Z-Сolors Mini.
          </p>
          <p>
            Вместе Zland Mini и Z–Colors Mini образуют инновационную POD-систему
            для тех, кто ценит качество и индивидуальность.
          </p>
        </div>
        <div class="about__list">
          <AboutCard :title="'7000+'" :img="'/images/about/about-1.png'">
            Различных вкусовых вариаций
          </AboutCard>
          <AboutCard
            :title="'LED - дисплей'"
            :img="'/images/about/about-2.png'"
          >
            Отображает заряд батареи
          </AboutCard>
          <AboutCard
            :title="'Режимы Boost & Soft'"
            :img="'/images/about/about-3.png'"
          >
            Переключайтесь между режимами <br />
            с помощью нижней кнопки
          </AboutCard>
          <AboutCard
            :title="'Быстрая зарядка'"
            :img="'/images/about/about-4.png'"
          >
            Меньше времени на подзарядку, <br />
            больше — на использование
          </AboutCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '../assets/scss/general/mixins' as *;
@use '../assets/scss/general/variables' as *;

.about {
  padding: val(16, 60) 0 val(20, 64) 0;
  &__banner {
    position: relative;
    text-align: center;
    background-color: $color-neutral-700;
    border-radius: 32px;
    overflow: hidden;
    padding: 32px 16px 0 16px;
    margin-bottom: 80px;

    h1 {
      margin: val(40, 60) 0 12px 0;
    }
  }
  &__banner-img {
    position: relative;
    width: calc(100% + 44px);
    margin: 0 -22px -20px -22px;
    @media (min-width: $sm) {
      margin: 0 -22px -120px -22px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__description {
    color: $color-neutral-300;
  }

  &__info {
  }

  &__subtitle {
    font-weight: 600;
    font-size: 24px;
    line-height: 140%;
    margin-bottom: 16px;
  }

  &__info-description {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__list {
    margin-top: 32px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    @media (min-width: $sm) {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
