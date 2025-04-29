<script setup lang="ts">
const error = useError()

const handleError = () => {
	clearError({
		redirect: '/'
	})
}
</script>

<template>
	<NuxtLayout>
		<div v-if="error">
			<h1>code: {{ error.statusCode }}</h1>
			<p>status message: {{ error.statusMessage }}</p>
			<p>message: {{ error.message }}</p>
			<button @click="handleError">Home</button>
		</div>
	</NuxtLayout>
</template>
