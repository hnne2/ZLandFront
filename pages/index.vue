<script lang="ts" setup>
definePageMeta({
	layout: 'dark'
})
</script>

<template>
	<div class="home-screen">
		<div class="container">
			<AppLogo />
			<nav class="nav">
				<ul class="nav__list">
					<li class="nav__item">
						<NuxtLink class="btn btn--light" to="/catalog">Каталог вкусов</NuxtLink>
					</li>
					<li class="nav__item">
						<NuxtLink class="btn btn--light" to="/about">О продукте</NuxtLink>
					</li>
					<li class="nav__item">
						<NuxtLink class="btn btn--light" to="/spinner"> Розыгрышы призов</NuxtLink>
					</li>
					<li class="nav__item">
						<NuxtLink class="btn btn--light" to="/partner"> Партнерство</NuxtLink>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/abstracts/mixins' as *;

.home-screen {
	padding: val(24, 60);

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 60px;
	}
}

.nav {
	&__list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	&__item {
		a {
			width: 100%;
		}
	}
}
</style>
