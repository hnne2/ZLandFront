export default defineEventHandler(async (event) => {
  // const config = useRuntimeConfig()

  // const baseUrl = config.public.baseUrl

  const body = await readBody(event)
  console.log(body)

  /*  const response: any = await $fetch(`${baseUrl}/api/callback/`, {
    method: 'POST',
    body,
  }) */

  /* return response */
})
