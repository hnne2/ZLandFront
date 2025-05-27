<script lang="ts" setup>
defineProps<{
  notification: {
    show: boolean
    status: boolean
    text: string
  }
}>()
</script>

<template>
  <transition name="fade-scale" mode="out-in">
    <template v-if="notification.show">
      <div
        class="notification"
        :class="notification.status ? 'success' : 'error'"
      >
        <div class="notification__icon">
          <NuxtIcon
            :name="notification.status ? 'icon-success' : 'icon-error'"
          />
        </div>
        <p class="notification__text">
          {{ notification.text }}
        </p>
      </div>
    </template>
  </transition>
</template>

<style lang="scss" scoped>
.notification {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 20px);
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  z-index: 5;
  :deep(.nuxt-icon svg) {
    width: 20px;
    height: 20px;
    margin: 0;
  }
  &__icon {
    .notification.success & {
      color: $color-green;
    }
    .notification.error & {
      color: $color-red;
    }
  }
  &__text {
    color: $color-black;
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
  transform: translate(-50%, -100%);
}
.fade-scale-leave-from,
.fade-scale-enter-to {
  opacity: 1;
  transform: translate(-50%, 20px);
}
</style>
