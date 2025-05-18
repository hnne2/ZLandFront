export default defineNuxtPlugin(async () => {
    const token = useCookie('auth_token', {
        sameSite: 'lax',
        path: '/',
    });

    // Функция для проверки валидности токена
    const isTokenValid = async () => {
        if (!token.value) return false;

        try {
            const { data, error } = await useFetch('https://zland.demo.onlinebees.ru/apiZ/raffle-settings', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });

            if (data.value && !error.value) {
                return true;
            }

            return false;
        } catch {
            return false;
        }
    };

    if (token.value && (await isTokenValid())) {
        return;
    }

    token.value = null;

    let initData: string = '';

    if (import.meta.client) {
        const tg = window.Telegram?.WebApp;
        initData = tg?.initData ?? '';
    }

    if (!initData) {
        return;
    }

    const { data } = await useFetch('https://zland.demo.onlinebees.ru/apiZ/auth/telegram', {
        method: 'POST',
        body: { initData },
    });

    if (data.value?.token) {
        token.value = data.value.token;
    }
});