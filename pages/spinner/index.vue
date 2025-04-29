<template>
	<div>
		<h1>Спиннер</h1>
		<h4>
			<NuxtLink to="/public">Назад</NuxtLink>
		</h4>
		<div class="slots">
			<div class="slots__window">
				<div class="slots__inner">
					<div class="slots__col"></div>
				</div>
				<div class="slots__inner">
					<div class="slots__col"></div>
				</div>
				<div class="slots__inner">
					<div class="slots__col"></div>
				</div>
			</div>
			<div class="slots__footer">
				<button class="slots__btn">Старт</button>
				<div class="slots__counter"></div>
				<audio id="applause" src="https://agenciatelo.com/Sonidos/aplausos.mp3"></audio>
			</div>
		</div>
	</div>
</template>
