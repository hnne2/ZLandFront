export default defineNuxtRouteMiddleware((to) => {
  const adult = useCookie<string>('adult')
  // Если пользователь не подтвердил возраст и НЕ находится на '/proof/'
  if (!adult.value && to.path !== '/proof/') {
    return navigateTo('/proof/')
  }
  // Если подтвердил возраст и пытается зайти на '/proof/', отправляем его в каталог
  if (adult.value && to.path === '/proof/') {
    return navigateTo('/')
  }
})
