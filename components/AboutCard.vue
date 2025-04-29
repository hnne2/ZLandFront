<script lang="ts" setup>
const props = defineProps<{
	title: string
	img: string
}>()
</script>

<template>
	<article class="about-card frame">
		<h4 class="about-card__title">{{ props.title }}</h4>
		<p class="about-card__description p2-medium">
			<slot />
		</p>
		<div class="about-card__img">
			<img :src="props.img" :alt="props.title" />
		</div>
	</article>
</template>

<style lang="scss" scoped>
@use '../assets/scss/abstracts/mixins' as *;
@use '../assets/scss/general/variables' as *;

.about-card {
	display: flex;
	flex-direction: column;
	text-align: center;
	padding: 24px 0 0;
	overflow: hidden;
	aspect-ratio: 1/1;

	&__title {
		font-weight: 600;
		font-size: 24px;
		line-height: 140%;
		margin-bottom: 4px;
	}

	&__description {
		color: $color-neutral-300;
	}

	&__img {
		margin-top: auto;

		img {
			width: 100%;
			height: auto;
			object-fit: cover;
		}

		.about-card:nth-child(1) & {
			width: calc(100% + 70px);
			margin: 0 -35px;
		}
	}
}
</style>
