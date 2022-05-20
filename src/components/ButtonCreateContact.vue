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
        <ModalContact
            :show="show"
            @close="show = false"
        />
    </button>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import ModalContact from '@/components/ModalContact.vue'

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
@use '@/styles/snippets/buttons.scss' as *;

.button_createContact {
	@extend %button_secondary;
	
	justify-content: space-between;
}

.button_createContact_icon {
	flex-shrink: 0;

	width: 16px;
}

.button_createContact_text {
	flex-grow: 1;
}
</style>