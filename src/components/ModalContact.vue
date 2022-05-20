<template>
    <modal
        :show="show"
        :form="`createContactForm`"
        :submit-button-text="`Salvar`"
        :submit-button-status="buttonStatus"
        @close="$emit('close')"
    >
        <template #title>
            {{ title }}
        </template>
        <template #content>
            <form
                id="createContactForm"
                class="createContact_modalContent"
                @submit.prevent="saveContact()"
            >
                <div class="createContact_field">
                    <label
                        class="createContact_label"
                        for="createContact_inputName"
                    >Nome</label>
                    <input
                        id="createContact_inputName"
                        v-model="currentContact.name"
                        class="createContact_input"
                        type="text"
                        required
                    >
                </div>
                <div class="createContact_field">
                    <label
                        class="createContact_label"
                        for="createContact_inputEmail"
                    >E-mail</label>
                    <input
                        id="createContact_inputEmail"
                        v-model="currentContact.email"
                        class="createContact_input"
                        type="email"
                    >
                </div>
                <div class="createContact_field -small">
                    <label
                        class="createContact_label"
                        for="createContact_inputPhone"
                    >Telefone</label>
                    <input
                        id="createContact_inputPhone"
                        ref="inputPhone"
                        v-model="currentContact.phone"
                        class="createContact_input"
                        type="text"
                        autocomplete="off"
                    >
                </div>
            </form>
        </template>
    </modal>
</template>

<script setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue'
import { useStore } from 'vuex'
import cloneObject from '@/utils/cloneObject'
import masks from '@/utils/masks'

import Modal from './Modal.vue'

const store = useStore()
const inputPhone = ref(null)

const cleanContactObject = {
    id: null,
    name: '',
    email: '',
    phone: '',
    date: {
        created: null,
        updated: null
    }
}
const currentContact = reactive(cloneObject(cleanContactObject))

const props = defineProps({
    show: Boolean,
    title: {
        type: String,
        default: 'Criar novo contato'
    },
    id: {
        type: Number,
        default: null
    }
})

const contacts = computed(() => {
    return store.state.contacts.all
})

const emit = defineEmits([ 'close', 'created' ])

const buttonStatus = computed(() => {
    return (!currentContact.name && !currentContact.email && !currentContact.phone)
})

function saveContact() {
    const updatedContacts = [ ...contacts.value ]

    if (currentContact.id === null) {
        currentContact.id = contacts.value.length + 1
        currentContact.date.created = Date.now()

        updatedContacts.unshift({ ...currentContact })
    } else {
        updatedContacts.map(contact => {
            if (currentContact.id === contact.id) {
                contact.name = currentContact.name
                contact.email = currentContact.email
                contact.phone = currentContact.phone
                contact.date.updated = Date.now()
            }
        })
    }

    store.dispatch('contacts/updateContacts', updatedContacts)
    cloneObject(cleanContactObject, currentContact)
    
    emit('close')
}

watch(() => props.id, (newId) => {
    if (newId !== null) {
        const editContact = contacts.value.filter(contact => contact.id === newId)
        if (editContact.length > 0) {
            cloneObject(editContact[0], currentContact)
        }
    }
})

watchEffect(() => {
    if (inputPhone.value) {
        masks.inputPhone(inputPhone.value)
    }
})
</script>

<style lang="scss">
@use '@/styles/tokens/spacings.scss'as *;
@use '@/styles/snippets/fields.scss'as *;

.createContact_modalContent {
	display: flex;
	align-items: flex-start;
	flex-direction: column;

	gap: $spacing-xs-vh;
}

.createContact_field {
	@extend %field;
}

.createContact_label {
	@extend %input_label;
}

.createContact_input {
	@extend %input;
}
</style>