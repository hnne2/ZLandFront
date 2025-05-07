import data from '~/mocke/catalog/[slug]/index.json'

export default defineEventHandler(async (_event) => {
  // const slug = getRouterParam(event, 'slug')
  // const config = useRuntimeConfig()

  try {
    const response = await new Promise(function (resolve, _reject) {
      setTimeout(() => {
        resolve(data)
        // reject(new Error('Сервер не отвечает'))
      }, 100)
    })
    return response
  } catch (error) {
    return error
  }
})
