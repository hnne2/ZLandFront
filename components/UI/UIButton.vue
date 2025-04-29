<script setup lang="ts">
interface Props {
	type?: 'button' | 'submit' | 'reset'
	size?: 'sm' | 'md'
	variant?: 'primary' | 'secondary' | 'outline'
	label?: string
	icon?: string
	leading?: boolean
	trailing?: boolean
	to?: string
	loading?: boolean
	disabled?: boolean
}

const {
	variant = 'primary',
	size = 'md',
	label = 'Кнопка',
	to,
	icon,
	leading = undefined,
	trailing = undefined,
	type = 'button',
	loading = false,
	disabled = false
} = defineProps<Props>()
</script>

<template>
	<template v-if="to">
		<NuxtLink
			:to="to"
			class="button"
			:class="[
				`button--${variant} button--${size}`,
				{
					disabled: disabled || loading
				}
			]"
		>
			<template v-if="icon && (leading || (leading === undefined && trailing === undefined))">
				<NuxtIcon class="button__icon" :name="icon" filled />
			</template>
			<span>{{ label }}</span>
			<template v-if="icon && trailing">
				<NuxtIcon class="button__icon" :name="icon" filled />
			</template>
		</NuxtLink>
	</template>
	<template v-else>
		<button
			class="button"
			:class="[
				`button--${variant} button--${size}`,
				{
					disabled: disabled || loading
				}
			]"
			:type="type"
			:disabled="disabled"
		>
			<template v-if="icon && (leading || (leading === undefined && trailing === undefined))">
				<NuxtIcon v-if="loading" class="button__icon button__icon--loading" name="circle-notch" filled />
				<NuxtIcon v-else class="button__icon" :name="icon" filled />
			</template>

			<span>{{ label }}</span>
			<template v-if="icon && trailing">
				<NuxtIcon class="button__icon" :name="icon" filled />
			</template>
		</button>
	</template>
</template>

<style lang="scss" scoped>
.button {
	appearance: none;
	overflow: hidden;
	border: none;
	border-radius: 29px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 56px;
	padding: 8px 24px;
	font-family: $font-family-primary;
	font-weight: 500;
	line-height: 130%;
	letter-spacing: 0;
	text-decoration: none;
	cursor: pointer;
	white-space: nowrap;
	transition:
		border-color $transition-duration $transition-function,
		background-color $transition-duration $transition-function,
		color $transition-duration $transition-function;

	& > * + * {
		margin-left: 8px;
	}

	&--primary {
		color: $theme-gray-lightest;
		background-color: rgba($theme-service-gray, 40%);
		backdrop-filter: blur(8px);

		@media (hover: hover) {
			&:hover,
			&:focus-visible,
			&:active {
				color: $theme-black-bg;
				background-color: $theme-brand;
			}
		}

		&.disabled,
		&:disabled {
			color: rgba($theme-service-gray, 40%);
			background-color: rgba($theme-service-gray, 40%);
			pointer-events: none;
			cursor: not-allowed;
		}
	}

	&--secondary {
		color: $theme-gray-lightest;
		background-color: $theme-gray-dark;

		@media (hover: hover) {
			&:hover,
			&:focus-visible,
			&:active {
				color: $theme-black-bg;
				background-color: $theme-brand;
			}
		}

		&.disabled,
		&:disabled {
			color: rgba($theme-service-gray, 40%);
			background-color: rgba($theme-service-gray, 40%);
			pointer-events: none;
			cursor: not-allowed;
		}
	}

	&--outline {
		color: $theme-gray-lightest;
		border: 1px solid $theme-gray-lightest;
		background-color: transparent;

		@media (hover: hover) {
			&:hover,
			&:focus-visible,
			&:active {
				border: 1px solid $theme-brand;
				color: $theme-brand;
			}
		}

		&.disabled,
		&:disabled {
			border: 1px solid rgba($theme-service-gray, 40%);
			color: rgba($theme-service-gray, 40%);
			background-color: rgba($theme-service-gray, 40%);
			pointer-events: none;
			cursor: not-allowed;
		}
	}

	&--sm {
		padding: 8px 16px;
		min-height: 40px;
		font-size: 14px;
	}

	&--md {
		min-height: 48px;
		font-size: 16px;
	}

	:deep(.nuxt-icon) svg {
		margin: 0;
		width: 24px;
		height: 24px;
	}

	&__icon--loading {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		100% {
			transform: rotate(1turn);
		}
	}
}
</style>
