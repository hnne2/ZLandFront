<script lang="ts" setup></script>

<template>
	<div class="logo">
		<NuxtIcon name="icon-logo" filled />
	</div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/abstracts/mixins' as *;

.logo {
	display: flex;
	justify-content: center;
	align-items: center;
	:deep(.nuxt-icon svg) {
		width: auto;
		height: auto;
		margin: 0;
	}
}
</style>
