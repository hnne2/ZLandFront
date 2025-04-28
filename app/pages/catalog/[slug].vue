<script lang="ts" setup>
import { useRoute } from 'vue-router'

const slug = useRoute().params.slug as string
const { data, error, status } = await useFetch('/api/data')

const category = computed(() => {
  if (slug === 'all') {
    return {
      category: { name: 'Все вкусы', link: 'all', icon: '' },
      products: data.value?.flatMap((cat) => cat.products) || [],
    }
  }
  return data.value?.find((cat) => cat.category.link === slug)
})

useHead(() => ({
  title: category.value?.category?.name
    ? `${category.value.category.name}`
    : 'Загрузка...',
}))

if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Ошибка загрузки данных',
  })
}

if (status.value === 'success' && !category.value) {
  navigateTo('/catalog/all')
}
</script>

<template>
  <section class="catalog">
    <div class="container">
      <div v-if="status === 'pending'">
        <h2>Загрузка...</h2>
      </div>
      <div v-else>
        <NuxtLink class="btn-text" to="/catalog">Назад</NuxtLink>
        <div class="catalog__info">
          <h1 class="catalog__info-title">{{ category?.category.name }}</h1>
          <ul class="catalog__info-list p1">
            <li>До 900 затяжек;</li>
            <li>35 вкусов: 1.9% солевой никотин;</li>
            <li>Объем бака 2 мл;</li>
            <li>Подходят для устройства Zland Mini;</li>
            <li>Регулируемая мощность;</li>
            <li>Двойная сетчатая спираль</li>
          </ul>
        </div>
        <ul class="catalog__list">
          <li
            v-for="product in category?.products"
            :key="product.id"
            class="catalog__item"
          >
            <div class="card">
              <div class="card__img">
                <img :src="product.image" :alt="product.name" />
                <span v-if="product.label" class="card__label">
                  {{ product.label }}
                </span>
              </div>
              <h3 class="card__title">{{ product.name }}</h3>
              <div class="card__paremeters">
                <div
                  v-for="parametr in product.parameter"
                  class="card__paremeters-item"
                >
                  <div class="card__paremeters-info p3-mudium">
                    <span>{{ parametr.name }}</span>
                    <span>{{ parametr.value }}</span>
                  </div>
                  <div
                    class="card__paremeters-indicator"
                    :data-value="parametr.value"
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/general/mixins' as *;
@use '../../assets/scss/general/variables' as *;

.catalog {
  padding: val(24, 60) 0;

  &__info {
    margin-top: val(32, 40);
  }
  &__info-title {
  }
  &__info-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 20px;
    padding-left: 27px;
    li {
      list-style-type: disc;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: val(16, 24);
    row-gap: 32px;
    margin-top: val(32, 40);
    @media (min-width: $sm) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  &__item {
  }
}
.card {
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

  &__title {
  }

  &__paremeters {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__paremeters-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    &:nth-child(1) .card__paremeters-indicator span::before {
      background-color: $color-pink;
    }
    &:nth-child(2) .card__paremeters-indicator span::before {
      background-color: $color-green;
    }
    &:nth-child(3) .card__paremeters-indicator span::before {
      background-color: $color-blue;
    }
  }

  &__paremeters-info {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  &__paremeters-indicator {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
    &[data-value='0.5'] span:nth-child(1)::before {
      width: 54%;
    }
    &[data-value='1'] span:nth-child(1)::before {
      width: 100%;
    }
    &[data-value='1.5'] {
      span:nth-child(1)::before {
        width: 100%;
      }
      span:nth-child(2)::before {
        width: 54%;
      }
    }
    &[data-value='2'] {
      span:nth-child(1)::before {
        width: 100%;
      }
      span:nth-child(2)::before {
        width: 100%;
      }
    }
    &[data-value='2.5'] {
      span:nth-child(1)::before {
        width: 100%;
      }
      span:nth-child(2)::before {
        width: 100%;
      }
      span:nth-child(3)::before {
        width: 54%;
      }
    }
    &[data-value='3'] {
      span:nth-child(1)::before {
        width: 100%;
      }
      span:nth-child(2)::before {
        width: 100%;
      }
      span:nth-child(3)::before {
        width: 100%;
      }
    }
  }
}
</style>
