import { defineStore } from 'pinia'

import type { ID } from '~/types/ID'
import type { Link } from '~/types/Link'

interface NavigationItem {
	id: ID
	link: Link
}

interface State {
	_navigations: NavigationItem[] | undefined
}

export const storeLayout = defineStore('layout', {
	state: (): State => ({
		_navigations: undefined
	}),

	getters: {
		navigations: state => state._navigations
	},

	actions: {
		async fetch() {
			const headers = useRequestHeaders(['cookie'])

			try {
				const { header } = await $fetch<{ header: { navigations: NavigationItem[] } }>('/api/layout/', {
					headers
				})

				const { navigations } = header

				this._navigations = navigations
			} catch (error: any) {
				throw createError({
					statusCode: error.code,
					statusMessage: error.message,
					fatal: true
				})
			}
		}
	}
})
