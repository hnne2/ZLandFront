export default defineNuxtPlugin(async () => {
    const token = useCookie('auth_token', {
        sameSite: 'lax',
        path: '/',
    })

    if (token.value) return

    let initData: string

    if (import.meta.client) {
        const tg = window.Telegram?.WebApp
        initData = tg?.initData ?? ''
    }

    // Если на сервере или initData не найден
    if (!initData) {
        initData = 'user=%7B%22id%22%3A922415656%2C%22first_name%22%3A%22Gri%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22hnne2%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FzorMNnw2jONg3vEhC0fcCsKQVn4kFJP7tPDIWfMuEb8.svg%22%7D&chat_instance=-2450733392135281570&chat_type=private&auth_date=1746372080&signature=Dd0H_A-QHLk2OP7dO6g2zmJwu9JzjupgnruJuEbsCJAxQIyzr8hO8zwexJmzUFRygjSvdskW-yHBaCKNyvlVDA&hash=5bcf367a8b87bff15b1dd41e5bb3318a93df428dadc0d975f257e5ccad1e3e75'
    }


        const { data } = await useFetch('http://localhost:8080/api/auth/telegram', {
            method: 'POST',
            body: { initData },
        })

        if (data.value?.token) {
            token.value = data.value.token
        }

})