export default defineNuxtPlugin(() => {
  const router = useRouter()

  if (import.meta.client && typeof window !== 'undefined') {
    const tg = (window as any).Telegram
    const startParam = tg?.WebApp?.initDataUnsafe?.start_param

    if (startParam === 'about' && window.location.pathname !== '/about') {
      router.replace('/about')
    }
  }
})