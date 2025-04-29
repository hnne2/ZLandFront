import data from '@/mock-data/layout.json'

export default defineEventHandler(async () => {
	// const runtimeConfig = useRuntimeConfig()

	// const config = useRuntimeConfig()
	// const baseUrl = config.public.baseUrl
	// const response: any = await $fetch(`${baseUrl}/api/personal-account/profile/`, { headers: event.headers })
	// return response

	const response = await new Promise(function (resolve) {
		setTimeout(() => {
			resolve(data)
			// reject(new Error('Сервер не отвечает'))
		}, 1000)
	})

	return response
})
