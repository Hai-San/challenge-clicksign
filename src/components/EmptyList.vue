<template>
    <div
        class="emptyList"
    >
        <img
            class="emptyList_img"
            aria-hidden="true"
            :src="image"
        >
        <p class="emptyList_text">
            {{ text }}
        </p>
        <ButtonCreateContact :show-when="false" />
    </div>
</template>
<script setup>
import ButtonCreateContact from '@/components/ButtonCreateContact.vue'
import imageUrl from '@assets/icons/ic-book.svg'

const props = defineProps({
    image: {
        type: String,
        default: imageUrl
    },
    text: {
        type: String,
        default: 'Lista vazia'
    }
})
</script>
<style lang="scss">
@use '@/styles/tokens/spacings.scss' as *;
@use '@/styles/tokens/colors.scss' as *;
@use '@/styles/snippets/fonts.scss' as *;

.emptyList {
	display: flex;
	align-items: center;
	flex-direction: column;

	width: 100%;
	margin-top: $spacing-xxl-vh;
	gap: $spacing-md-vh;
}

.emptyList_img {
	max-width: 237px;
}

.emptyList_text {
	@extend %font_xs_regular;

	color: $color-low-base;

	text-align: center;
}
</style>