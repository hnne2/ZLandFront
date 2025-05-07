<script lang="ts" setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { data, error } = await useFetch<any>('/api/about/')

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
    fatal: true,
  })
}

gsap.registerPlugin(ScrollTrigger)

definePageMeta({
  layout: 'dark',
})

onMounted(() => {
  const animateFade = document.querySelectorAll('.animate-fade')
  animateFade.forEach((item) => {
    gsap.to(item, {
      y: 0,
      opacity: 1,
      scale: 1,
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom bottom',
      },
    })
  })
})
</script>

<template>
  <section class="about">
    <div class="container">
      <div class="about__banner frame animate-fade">
        <AppLogo />
        <h1 class="typo-h1-big">{{ data.seo.H1 }}</h1>
        <div
          class="about__description typo-p1"
          v-html="data.aboutBanner.description"
        />
        <div class="about__banner-img">
          <img
            :src="data.aboutBanner.image.url"
            :alt="data.aboutBanner.image.alt"
          />
        </div>
      </div>
      <div class="about__info animate-fade">
        <h2 class="about__subtitle typo-h4">{{ data.aboutInfo.title }}</h2>
        <div
          class="about__info-description typo-p1"
          v-html="data.aboutInfo.description"
        />
        <ul class="about__list animate-fade">
          <li
            v-for="item in data.aboutCards"
            :key="item.id"
            class="about__item animate-fade"
          >
            <AboutCard
              :label="item.label"
              :image="item.image"
              :description="item.description"
            />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.animate-fade {
  transform: translateY(50px) scale(0.8);
  opacity: 0;
}

.about {
  padding: val(16, 60) 0 val(20, 64) 0;

  &__banner {
    position: relative;
    text-align: center;
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
    white-space: pre-line;
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
    gap: 16px;
    position: relative;
    @media (min-width: $sm) {
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
  }

  &__item {
    position: sticky;
    bottom: 16px;
    opacity: 1;
    @media (min-width: $sm) {
      bottom: 0;
      opacity: 0;
      position: relative;
    }

    &:nth-child(1) {
      z-index: 3;
    }
    &:nth-child(2) {
      z-index: 2;
    }
    &:nth-child(3) {
      z-index: 1;
    }
    &:nth-child(4) {
      z-index: 0;
    }
  }
}
</style>
