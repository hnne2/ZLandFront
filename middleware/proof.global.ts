export default defineNuxtRouteMiddleware(async (to) => {
  const adult = useCookie<string>('adult')
  const redirectPath = useCookie<string>('redirectAfterProof')

  // Если куки нет — запрашиваем статус у API
  if (!adult.value) {
    const token = useCookie('auth_token')?.value
    const baseUrl = window.location.origin

    try {
      const { data } = await useFetch<any>(`${baseUrl}/apiZ/auth/proof`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })

      if (data.value?.confirmed) {
        adult.value = 'true' // Устанавливаем куку, чтобы не проверять каждый раз
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Ошибка запроса на проверку возраста:', err)
    }
  }

  // Проверка и редиректы как раньше
  if (!adult.value && to.path !== '/proof/') {
    redirectPath.value = to.fullPath
    return navigateTo('/proof/')
  }

  if (adult.value && to.path === '/proof/') {
    const target = redirectPath.value || '/'
    redirectPath.value = ''
    return navigateTo(target)
  }
})
