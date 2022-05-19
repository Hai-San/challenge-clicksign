<template>
    <button
        v-if="haveContacts === showWhen"
        class="button_createContact"
        @click="show = true"
    >
        <img
            class="button_createContact_icon"
            src="@assets/icons/ic-plus.svg"
            aria-hidden="true"
        >
        <span class="button_createContact_text">Criar contato</span>
        <ModalCreateContact
            :show="show"
            @close="show = false"
        />
    </button>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import ModalCreateContact from '@/components/ModalCreateContact.vue'

const show = ref(false)
const store = useStore()

const haveContacts =  computed(() => {
    return store.getters['contacts/haveContacts']
})

const props = defineProps({
    showWhen: {
        type: Boolean,
        default: true,
        required: false
    }
})
</script>
<style lang="scss">
@use '@/styles/snippets/fonts.scss' as *;
@use '@/styles/utils/interactions.scss' as *;
@use '@/styles/tokens/colors.scss' as *;
@use '@/styles/tokens/spacings.scss' as *;
@use '@/styles/tokens/borders.scss' as *;
@use '@/styles/tokens/speeds.scss' as *;

.button_createContact {
	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: $spacing-xxs-px $spacing-sm-px;
	gap: $spacing-xxxs-px;

	background-color: $color-secondary-base;
	border-radius: 50em;

	transition: background-color ease-in-out $speed-base;

	cursor: pointer;

	will-change: background-color;

	@include interaction_full {
		background-color: $color-secondary-light;
	}
}

.button_createContact_icon {
	flex-shrink: 0;

	width: 16px;
}

.button_createContact_text {
	@extend %font_xxs_medium;
	flex-grow: 1;

	color: $color-primary-base;
}
</style>