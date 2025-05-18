export default defineNuxtRouteMiddleware((to) => {
  const adult = useCookie<string>('adult')
  const redirectPath = useCookie<string>('redirectAfterProof')

  // Если пользователь не подтвердил возраст и НЕ находится на '/proof/'
  if (!adult.value && to.path !== '/proof/') {
    redirectPath.value = to.fullPath // сохранить путь, куда хотел попасть
    return navigateTo('/proof/')
  }

  // Если подтвердил возраст и пытается зайти на '/proof/' — вернуть его туда, куда он хотел
  if (adult.value && to.path === '/proof/') {
    const target = redirectPath.value || '/'
    redirectPath.value = '' // очистить куку
    return navigateTo(target)
  }
})