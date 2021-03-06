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
import randomColor from '@/utils/randomColor'

import Modal from './Modal.vue'

const store = useStore()
const inputPhone = ref(null)

const cleanContactObject = {
    color: '',
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
    editIndex: {
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

function resetContact() {
    cloneObject(cleanContactObject, currentContact)
}

function saveContact() {
    let updatedContacts = [ ...contacts.value ]
    
    if (props.editIndex === null) {        
        updatedContacts = createContact(updatedContacts)
    } else {
        updatedContacts = editContact(updatedContacts)
    }

    store.dispatch('contacts/updateContacts', updatedContacts)
    resetContact()
    
    emit('close')
}

function createContact(contacts) {
    currentContact.date.created = Date.now()
    currentContact.color = randomColor()
    contacts.unshift({ ...currentContact })
    return contacts
}

function editContact(contacts) {
    contacts.map((contact, index) => {
        if (index === props.editIndex) {
            contact.name = currentContact.name
            contact.email = currentContact.email
            contact.phone = currentContact.phone
            contact.date.updated = Date.now()
        }
    })

    return contacts
}

watch(() => props.editIndex, (newEditIndex) => {
    if (newEditIndex !== null) {
        const editContact = contacts.value[newEditIndex]
        if (editContact) {
            cloneObject(editContact, currentContact)
        }
    } else {
        resetContact()
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