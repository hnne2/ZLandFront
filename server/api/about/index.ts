import data from '~/mocke/about/index.json'

export default defineEventHandler(async () => {
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
