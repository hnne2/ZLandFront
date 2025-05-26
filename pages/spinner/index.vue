<script lang="ts" setup>
import { ref } from 'vue';

const token = useCookie('auth_token')?.value

const baseUrl = window.location.origin

const { data, error } = await useFetch(`${baseUrl}/apiZ/raffle-settings`, {
  headers: token ? { Authorization: `Bearer ${token}` } : {}
})

if (!data.value || error.value) {
  throw createError({
    statusCode: error.value?.statusCode || 500,
    statusMessage: error.value?.statusMessage || 'Ошибка загрузки данных',
    fatal: true,
  });
}
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

const chanceToWin: number = data.value.spinner.chanceToWin // шанс например 0.1 (10%)
const maxSpins: number = data.value.spinner.maxSpins // максимальное количество спинов
const countSpins = ref<number>(0)
const isWin = ref<boolean>(false)
const addClassWin = ref<boolean>(false)
const isEnded = ref<boolean>(data.value.isEnded || false);
const changeState = ref<boolean>(false)
const isSpin = ref<boolean>(false)
const showNoMatch = ref<boolean>(false)
const audioSlotRef = ref<HTMLAudioElement | null>(null)
const audioPulseRef = ref<HTMLAudioElement | null>(null)
const audioFanfareRef = ref<HTMLAudioElement | null>(null)

const columns = ref<string[][]>([[], [], []])

const icons: string[] = [
  'taste-1',
  'taste-2',
  'taste-3',
  'taste-4',
  'taste-5',
  'taste-6',
  'taste-7',
  'taste-8',
  'taste-9',
  'taste-10',
]

const generateIcons = () => {
  const base = Array.from({ length: 40 }, () => {
    return icons[Math.floor(Math.random() * icons.length)]
  })
  return [...base, ...base.slice(0, 3)]
}

onMounted(async () => {
  columns.value = columns.value.map(() => generateIcons())

})

const launchSpin = async () => {
  if (countSpins.value >= maxSpins || isSpin.value || isEnded.value) return;

  if (audioSlotRef.value) {
    audioSlotRef.value.currentTime = 0;
    audioSlotRef.value.play();
  }

  isSpin.value = true;
  showNoMatch.value = false;
  countSpins.value++;

  isWin.value = Math.random() < chanceToWin;

  let middleIcons: string[] = [];

  if (isWin.value) {
    const winIcon = icons[Math.floor(Math.random() * icons.length)];
    middleIcons = Array(3).fill(winIcon);
  } else {
    do {
      middleIcons = Array.from(
          { length: 3 },
          () => icons[Math.floor(Math.random() * icons.length)]
      );
    } while (middleIcons.every((icon) => icon === middleIcons[0]));
  }

  setTimeout(() => {
    columns.value = columns.value.map((col, i) => {
      const updated = [...col];
      updated[0] = icons[Math.floor(Math.random() * icons.length)];
      updated[1] = middleIcons[i];
      updated[2] = icons[Math.floor(Math.random() * icons.length)];
      updated[updated.length - 3] = updated[0];
      updated[updated.length - 2] = updated[1];
      updated[updated.length - 1] = updated[2];
      return updated;
    });
  }, 2000);

  setTimeout(async () => {
    if (isWin.value) {
      if (audioPulseRef.value) {
        audioPulseRef.value.currentTime = 0;
        audioPulseRef.value.play();
      }
      addClassWin.value = true;
      setTimeout(() => {
        changeState.value = true;
        if (audioFanfareRef.value) {
          audioFanfareRef.value.currentTime = 0;
          audioFanfareRef.value.play();
        }
      }, 1800);
    } else {
      isSpin.value = false;
      showNoMatch.value = true;
    }

    // Отправка запроса на сервер для обновления количества спинов
    try {
      const { data, error } = await useFetch(`${baseUrl}/apiZ/raffle-settings/update-spins`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
  body: JSON.stringify({
    countSpins: maxSpins - countSpins.value,
    isWin: isWin.value,
  }),
});

      if (!error.value && data.value?.isEnded !== undefined) {
        if (!isWin.value) {
          isEnded.value = data.value.isEnded;
        }
      }
    } catch  {
      // игнорируем ошибку
    }
  }, 4000);
};

const closeTab = () => {
  window.close()
}
</script>

<template>
  <section class="spinner">
    <h1 class="visually-hidden">{{ data.seo.H1 }}</h1>
    <div class="container">
      <div class="spinner__frame frame">
        <div class="spinner__head">
          <AppLogo />
        </div>
        <div class="spinner__center">
          <transition name="fade-scale" mode="out-in" appear>
            <div v-if="!changeState && !isEnded" key="start">
              <p class="spinner__title typo-h1">Испытайте свою удачу</p>
              <p class="spinner__description typo-p1">
                Соберите три одинаковых слота <br />
                и получите приз! Крутите каждый день <br />
                и увеличьте свои шансы на выигрыш
              </p>
              <div class="slots">
                <div
                  class="slots__window"
                  :class="{ spinning: isSpin, win: addClassWin }"
                >
                  <div
                    v-for="(col, colIndex) in columns"
                    :key="colIndex"
                    class="slots__inner"
                  >
                    <div>
                      <div class="slots__col">
                        <img
                          v-for="(icon, i) in col"
                          :key="i"
                          class="slots__icon"
                          :src="`/images/spinner/slot/${icon}.png`"
                          :alt="icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p
                  v-if="
                    !changeState &&
                    !isSpin &&
                    showNoMatch &&
                    countSpins < maxSpins
                  "
                  class="slots__msg typo-p1-medium"
                >
                  Нет совпадений. Попробуйте еще
                </p>
              </div>
            </div>
            <div v-else-if="changeState && !isEnded" key="win">
              <div class="spinner__img-prize">
                <img :src="`${baseUrl}/apiZ/images/${data.prize.image.url}`" :alt="data.prize.image.alt" />
              </div>
              <p class="spinner__title typo-h1" v-html="data.prize.title"></p>
              <p class="spinner__description typo-p1">
                {{ data.prize.message }}
              </p>
            </div>
            <div v-else key="end">
              <p class="spinner__title typo-h1">{{ data.theEnd.title }}</p>
              <p class="spinner__description typo-p1">
                {{ data.theEnd.description }}
              </p>
            </div>
          </transition>
        </div>
        <div class="spinner__footer">
          <transition name="fade-scale" mode="out-in" appear>
            <div v-if="!changeState && !isEnded">
              <div class="spinner__counter">
                <NuxtIcon name="icon-warning" />
                <span v-if="countSpins < maxSpins">
                  Доступно {{ maxSpins - countSpins }} вращений
                </span>
                <span v-else>Вращения кончились. Приходите завтра</span>
              </div>
              <button
                  :disabled="countSpins >= maxSpins || isSpin"
                  class="spinner__btn btn btn--light"
                  @click="launchSpin"
              >
                Крутить
              </button>
            </div>
            <div v-else-if="changeState && !isEnded">
              <div v-if="countSpins === maxSpins" class="spinner__counter">
                <NuxtIcon name="icon-warning" />
                <span>Вращения кончились. Приходите завтра</span>
              </div>
              <button class="spinner__btn btn btn--light" @click="closeTab">
                Закрыть
              </button>
            </div>
            <div v-else>
              <button class="spinner__btn btn btn--light" @click="closeTab">
                Закрыть
              </button>
            </div>
          </transition>
        </div>
        <audio
          ref="audioSlotRef"
          class="visually-hidden"
          src="/audio/slot.wav"
        ></audio>
        <audio
          ref="audioPulseRef"
          class="visually-hidden"
          src="/audio/pulse.wav"
        ></audio>
        <audio
          ref="audioFanfareRef"
          class="visually-hidden"
          src="/audio/fanfare.wav"
        ></audio>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.spinner {
  padding: val(16, 80) 0;
  height: 100dvh;

  .container {
    height: 100%;
  }

  &__frame {
    padding: 32px val(16, 40) val(16, 32) val(16, 40);
    height: 100%;
    min-height: 520px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    gap: 16px;
    @media (min-width: $sm) {
      min-height: auto;
      height: 740px;
    }
  }

  &__center {
    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  &__title {
    margin-bottom: 12px;
  }

  &__description {
    color: $color-neutral-300;
    @media (min-width: $sm) {
      br {
        display: none;
      }
    }
  }

  &__img-prize {
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
  position: relative;
  margin-top: val(32, 40);

  &__col {
    display: flex;
    flex-direction: column;
    will-change: transform;
  }

  &__window {
    display: inline-flex;
    gap: val(6, 12);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: val(4, 8);
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      z-index: 2;
      background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDggMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik03LjUgNC4xMzM5N0M4LjE2NjY3IDQuNTE4ODcgOC4xNjY2NyA1LjQ4MTEzIDcuNSA1Ljg2NjAzTDEuNSA5LjMzMDEzQzAuODMzMzM0IDkuNzE1MDMgLTQuNDczMzhlLTA3IDkuMjMzOSAtNC4xMzY4OWUtMDcgOC40NjQxTC0xLjEwODQ4ZS0wNyAxLjUzNTlDLTcuNzE5ODZlLTA4IDAuNzY2MDk4IDAuODMzMzMzIDAuMjg0OTczIDEuNSAwLjY2OTg3M0w3LjUgNC4xMzM5N1oiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=')
        no-repeat center;
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: val(4, 8);
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      z-index: 2;
      background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDggMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wLjUgNS44NjYwM0MtMC4xNjY2NjYgNS40ODExMyAtMC4xNjY2NjYgNC41MTg4NyAwLjUgNC4xMzM5N0w2LjUgMC42Njk4NzNDNy4xNjY2NyAwLjI4NDk3MyA4IDAuNzY2MDk5IDggMS41MzU5TDggOC40NjQxQzggOS4yMzM5IDcuMTY2NjcgOS43MTUwMyA2LjUgOS4zMzAxM0wwLjUgNS44NjYwM1oiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=')
        no-repeat center;
    }

    &.spinning .slots__col {
      animation:
        4s scroll-mobile cubic-bezier(0.5, 0, 0.5, 1) 1,
        4s blur cubic-bezier(0.5, 0, 0.5, 1) 1;
      @media (min-width: $sm) {
        animation:
          4s scroll-desktop cubic-bezier(0.5, 0, 0.5, 1) 1,
          4s blur cubic-bezier(0.5, 0, 0.5, 1) 1;
      }
    }

    &.spinning .slots__inner:nth-of-type(2) .slots__col {
      animation-delay: 0.1s;
    }

    &.spinning .slots__inner:nth-of-type(3) .slots__col {
      animation-delay: 0.2s;
    }

    &.win {
      & .slots__inner {
        animation: blink 0.5s ease-in-out 3;
      }
    }
  }

  &__inner {
    width: 100px;
    height: 100px;
    border: 2px solid $color-neutral-600;
    border-radius: 24px;
    background-color: $color-neutral-800;
    display: flex;
    justify-content: center;
    overflow: hidden;
    @media (min-width: $sm) {
      width: 160px;
      height: 160px;
    }
    & > div {
      transform: translate3d(0, -72px, 0);
      @media (min-width: $sm) {
        transform: translate3d(0, -66px, 0);
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
    transition: all 0.2s ease 0s;

    &:disabled {
      cursor: default;
      background-color: #cccccc;
    }
  }

  &__icon {
    aspect-ratio: 1/1;
    width: 80px;
    height: 80px;
    @media (min-width: $sm) {
      width: 96px;
      height: 96px;
    }
  }

  &__msg {
    position: absolute;
    top: calc(100% + 12px);
    left: 0;
    width: 100%;
    @media (max-width: $sm) {
      top: calc(100% + 20px);
    }
  }
}

@keyframes scroll-mobile {
  0% {
    transform: translate3d(0, 0, 0);
  }
  75% {
    transform: translate3d(0, calc(-100% + 236px), 0);
  }
  83% {
    transform: translate3d(0, calc(-100% + 241px), 0);
  }
  100% {
    transform: translate3d(0, calc(-100% + 240px), 0);
  }
}

@keyframes scroll-desktop {
  0% {
    transform: translate3d(0, 0, 0);
  }
  75% {
    transform: translate3d(0, calc(-100% + 284px), 0);
  }
  83% {
    transform: translate3d(0, calc(-100% + 289px), 0);
  }
  100% {
    transform: translate3d(0, calc(-100% + 288px), 0);
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
  70% {
    filter: blur(0);
  }
}

@keyframes blink {
  0%,
  100% {
    border-color: $color-neutral-600;
  }
  50% {
    border-color: #fff;
  }
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.7);
}
.fade-scale-leave-from,
.fade-scale-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
