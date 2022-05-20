<template>
    <modal
        :show="show"
        :submit-button-text="`Excluir`"
        @close="$emit('close')"
        @modal-submit="deleteContact()"
    >
        <template #title>
            Excluir contato
        </template>
        <template #content>
            <p class="deleteContact_modalContent">
                Deseja realmente excluir o contato?
            </p>
        </template>
    </modal>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Modal from './Modal.vue'

const store = useStore()

const props = defineProps({
    show: Boolean,
    id: {
        type: Number,
        default: 0
    }
})

const contacts =  computed(() => {
    return store.state.contacts.all
})

const emit = defineEmits([ 'close' ])

function deleteContact() {
    contacts.value.splice(contacts.value.findIndex(contact => contact.id === props.id), 1)    
    store.dispatch('contacts/updateContacts', contacts)
    emit('close')
}
</script>

<style lang="scss">
@use '@/styles/snippets/fonts.scss' as *;
@use '@/styles/tokens/spacings.scss' as *;

.deleteContact_modalContent {
	@extend %font_xxs_regular;
	padding-bottom: $spacing-lg-px;

	text-align: left;
}
</style>