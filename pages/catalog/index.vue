<script lang="ts" setup>
useHead({
	title: 'Категории вкусов'
})
const { data: data } = await useFetch('/api/catalog/data')
</script>

<template>
	<section class="categories">
		<div class="container">
			<h1>Нажмите на раздел, чтобы увидеть список вкусов</h1>
			<ul class="categories__list">
				<li v-for="item in data" :key="item.category.link" class="categories__item">
					<NuxtLink class="categories__link" :to="`${'/catalog/' + item.category.link}`">
						<img class="categories__img" :src="item.category.icon" alt="" />
						<h3 class="categories__name">{{ item.category.name }}</h3>
					</NuxtLink>
				</li>
			</ul>
			<NuxtLink class="categories__btn-all btn btn--dark" to="/catalog/all"> Смотреть все</NuxtLink>
		</div>
	</section>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/abstracts/mixins' as *;
@use '../../assets/scss/general/variables' as *;

.categories {
	padding: val(24, 60) 0;

	&__list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: val(16, 24);
		margin-top: val(32, 40);
		@media (min-width: $sm) {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	&__item {
		aspect-ratio: 1/1;
	}

	&__link {
		padding: 16px 8px;
		background-color: #fff;
		border-radius: 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 24px;
		height: 100%;
		box-shadow: 0px 0px 12px 0px rgba(119, 119, 119, 0.08);
		transition: all 0.3s ease 0s;
		@media (hover: hover) {
			&:hover {
				background-color: $color-neutral-200;
				box-shadow: none;
			}
		}

		&:active {
			background-color: $color-neutral-200;
			box-shadow: none;
		}
	}

	&__img {
		width: val(80, 120);
		height: val(80, 120);
	}

	&__name {
		text-align: center;
	}

	&__btn-all {
		width: 100%;
		margin-top: val(24, 32);
	}
}
</style>
