<script lang="ts" setup>
definePageMeta({
	layout: 'dark'
})
useHead({
	title: 'О продукте'
})

onMounted(() => {
	useGsap.from('#js-animate-1', {
		y: 100,
		scale: 0.9,
		scrollTrigger: {
			trigger: '#js-animate-1',
			start: 'top bottom',
			end: 'bottom bottom',
			scrub: 1
			// markers: true,
		}
	})
	useGsap.from('#js-animate-2', {
		y: 100,
		scale: 0.9,
		scrollTrigger: {
			trigger: '#js-animate-2',
			start: 'top bottom',
			end: 'bottom bottom',
			scrub: 1
			// markers: true,
		}
	})
	useGsap.from('#js-animate-3', {
		y: 100,
		scale: 0.9,
		scrollTrigger: {
			trigger: '#js-animate-3',
			start: 'top bottom',
			end: 'bottom bottom',
			scrub: 1
			// markers: true,
		}
	})
	useGsap.from('#js-animate-4', {
		y: 100,
		scale: 0.9,
		scrollTrigger: {
			trigger: '#js-animate-4',
			start: 'top bottom',
			end: 'bottom bottom',
			scrub: 1
			// markers: true,
		}
	})
})
</script>

<template>
	<section class="about">
		<div class="container">
			<div class="about__banner frame">
				<AppLogo />
				<h1 class="title-banner">Zland Mini</h1>
				<p class="about__description p1">Твой персональный мир вейпинга, <br />где ты сам задаёшь правила игры</p>
				<div class="about__banner-img">
					<img src="/images/about/about-home.png" alt="Zland Mini" />
				</div>
			</div>
			<div class="about__info">
				<h4 class="about__subtitle">Не просто девайс</h4>
				<div class="about__info-description p1">
					<p>
						Элегантный дизайн, регулируемая мощность и самое главное - возможность смешивать картриджи Z-Сolors Mini.
					</p>
					<p>
						Вместе Zland Mini и Z–Colors Mini образуют инновационную POD-систему для тех, кто ценит качество и
						индивидуальность.
					</p>
				</div>
				<ul class="about__list">
					<li id="js-animate-1" class="about__item">
						<AboutCard :title="'7000+'" :img="'/images/about/about-1.png'"> Различных вкусовых вариаций</AboutCard>
					</li>
					<li id="js-animate-2" class="about__item">
						<AboutCard :title="'LED - дисплей'" :img="'/images/about/about-2.png'">
							Отображает заряд батареи
						</AboutCard>
					</li>
					<li id="js-animate-3" class="about__item">
						<AboutCard :title="'Режимы Boost & Soft'" :img="'/images/about/about-3.png'">
							Переключайтесь между режимами <br />
							с помощью нижней кнопки
						</AboutCard>
					</li>
					<li id="js-animate-4" class="about__item">
						<AboutCard :title="'Быстрая зарядка'" :img="'/images/about/about-4.png'">
							Меньше времени на подзарядку, <br />
							больше — на использование
						</AboutCard>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/abstracts/mixins' as *;
@use '../../assets/scss/general/variables' as *;

.about {
	padding: val(16, 60) 0 val(20, 64) 0;

	&__banner {
		position: relative;
		text-align: center;
		overflow: hidden;
		padding: 32px 16px 0 16px;
		margin-bottom: 80px;

		h1 {
			margin: val(40, 60) 0 12px 0;
		}
	}

	&__banner-img {
		position: relative;
		width: calc(100% + 44px);
		margin: 0 -22px -20px -22px;
		@media (min-width: $sm) {
			margin: 0 -22px -120px -22px;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	&__description {
		color: $color-neutral-300;
	}

	&__info {
	}

	&__subtitle {
		font-weight: 600;
		font-size: 24px;
		line-height: 140%;
		margin-bottom: 16px;
	}

	&__info-description {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	&__list {
		margin-top: 32px;
		display: grid;
		grid-template-columns: 1fr;
		gap: 16px;
		position: relative;
		// height: 216.25em;
		@media (min-width: $sm) {
			grid-template-columns: 1fr 1fr;
			gap: 24px;
		}
	}

	&__item {
		/* &:nth-child(1) {
      z-index: 3;
    }
    &:nth-child(2) {
      position: absolute;
      bottom: -10vh;
      z-index: 2;
      height: 87.8125em;
      transform: translateY(calc(1em + 10vh));
    }
    &:nth-child(3) {
      position: absolute;
      height: 142.5em;
      z-index: 1;
      bottom: -10vh;
      transform: translateY(calc(2em + 10vh));
    }
    &:nth-child(4) {
      position: absolute;
      bottom: -10vh;
      z-index: 0;
      height: 187.5em;
      transform: translateY(calc(3em + 10vh));
    } */
	}
}
</style>
