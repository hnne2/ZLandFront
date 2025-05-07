<script lang="ts" setup>
definePageMeta({
  layout: 'dark',
})
useHead({
  title: 'Розыгрыш призов',
})

const isWin = ref<boolean>(false)
const isEnded = ref<boolean>(false)
const countSpin = ref<number>(20)
</script>

<template>
  <section class="spinner">
    <div class="container">
      <div class="spinner__frame frame">
        <div class="spinner__head">
          <AppLogo />
        </div>
        <div class="spinner__center">
          <template v-if="!isWin && !isEnded">
            <h1 class="spinner__title">Испытайте свою удачу</h1>
            <p class="spinner__description p1">
              Соберите три одинаковых слота и получите приз! Крутите каждый день
              и увеличьте свои шансы на выигрыш
            </p>
            <div class="slots">
              <div class="slots__window">
                <div class="slots__inner">
                  <div class="slots__col">
                    <div class="slots__icon"></div>
                    <div class="slots__icon"></div>
                    <div class="slots__icon"></div>
                  </div>
                </div>
                <div class="slots__inner">
                  <div class="slots__col">
                    <div class="slots__icon"></div>
                    <div class="slots__icon"></div>
                    <div class="slots__icon"></div>
                  </div>
                </div>
                <div class="slots__inner">
                  <div class="slots__col">
                    <div class="slots__icon"></div>
                    <div class="slots__icon"></div>
                    <div class="slots__icon"></div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else-if="isWin && !isEnded">
            <div class="spinner__img-surprise">
              <img src="/images/spinner/surprise.png" alt="" />
            </div>
            <h1 class="spinner__title">Playstation 5</h1>
            <p class="spinner__description p1">
              Соберите три одинаковых слота и получите приз! Крутите каждый день
              и увеличьте свои шансы на выигрыш
            </p>
          </template>
          <template v-else>
            <h1 class="spinner__title">Розыгрыш завершился</h1>
            <p class="spinner__description p1">
              Все призы уже разыграны. Следующий розыгрыш не за горами — не
              упусти шанс снова испытать удачу
            </p>
          </template>
        </div>
        <div v-if="!isWin && !isEnded" class="spinner__footer">
          <div class="spinner__counter">
            <NuxtIcon name="icon-warning" />
            <span v-if="countSpin > 0">Доступно {{ countSpin }} вращений</span>
            <span v-else>Вращения кончились. Приходите завтра</span>
          </div>
          <button
            :disabled="countSpin <= 0"
            class="spinner__btn btn btn--light"
          >
            Крутить
          </button>
        </div>
        <div v-else-if="isWin && !isEnded" class="spinner__footer">
          <button
            v-if="countSpin > 0"
            :disabled="countSpin <= 0"
            class="spinner__btn btn btn--light"
          >
            Супер! Крутить еще
          </button>
          <div v-else>
            <div class="spinner__counter">
              <NuxtIcon name="icon-warning" />
              <span>Вращения кончились. Приходите завтра</span>
            </div>
            <button class="spinner__btn btn btn--light">Закрыть</button>
          </div>
        </div>
        <div v-else class="spinner__footer">
          <button class="spinner__btn btn btn--light">Закрыть</button>
        </div>
        <audio
          id="applause"
          src="https://agenciatelo.com/Sonidos/aplausos.mp3"
        ></audio>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/abstracts/mixins' as *;
@use '../../assets/scss/general/variables' as *;

.spinner {
  padding: val(16, 80) 0;

  &__frame {
    padding: 32px val(16, 40) val(16, 32) val(16, 40);
    height: 740px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
  }
  &__head {
  }

  &__center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__title {
    margin-bottom: 12px;
  }
  &__description {
    color: $color-neutral-300;
  }

  &__img-surprise {
    margin-bottom: val(32, 40);
    padding: 20px;
    border: 2px solid #ffffff;
    border-radius: 24px;
    background-color: $color-neutral-800;
    aspect-ratio: 1/1;
    width: 160px;
    height: 160px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__footer {
  }

  &__counter {
    margin-bottom: 12px;
    color: $color-neutral-300;
    :deep(.nuxt-icon svg) {
      width: 20px;
      height: 20px;
    }
  }

  &__btn {
    max-width: 504px;
    width: 100%;
  }
}
.slots {
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-items: center;
  &__col {
    display: flex;
    flex-direction: column;
    gap: 16px;
    will-change: true;
  }
  &__window {
    display: inline-flex;
    gap: 16px;
    position: relative;
    overflow: hidden;
    height: 312px;
    &.spinning .slots__col {
      animation:
        scroll 3s cubic-bezier(0.5, 0, 0.5, 1) 1,
        blur 3s cubic-bezier(0.5, 0, 0.5, 1) 1;
    }
    &.spinning .slots__inner:nth-of-type(2) .slots__col {
      animation-delay: 0.1s;
    }

    &.spinning .slots__inner:nth-of-type(3) .slots__col {
      animation-delay: 0.2s;
    }
    &.win {
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        height: 6px;
        background-color: red;
        border-radius: 10px;
        animation: blink 0.3s ease-in-out 3;
      }
    }
  }
  &__btn {
    cursor: pointer;
    display: flex;
    justify-content: center;
    text-align: center;
    width: fit-content;
    padding: 16px 48px;
    border-radius: 100px;
    font-size: 24px;
    background-color: rgb(241, 83, 83);
    color: #ffffff;
    border: none;
    transition: all 0.3s ease 0s;
    &:disabled {
      cursor: default;
      background-color: #cccccc;
    }
  }

  &__icon {
    background-color: $color-neutral-800;

    aspect-ratio: val(100, 160) / val(100, 160);
    flex: 1;
    width: 150px;
    height: 150px;
  }
  &__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
}

@keyframes scroll {
  0% {
    transform: translate3d(0, 0, 0);
  }
  90% {
    transform: translate3d(0, calc(-100% + 477px), 0);
  }
  100% {
    transform: translate3d(0, calc(-100% + 482px), 0);
  }
}

@keyframes blur {
  0% {
    filter: blur(0);
  }
  10% {
    filter: blur(0);
  }
  30% {
    filter: blur(6px);
  }
  60% {
    filter: blur(6px);
  }
  80% {
    filter: blur(0);
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
