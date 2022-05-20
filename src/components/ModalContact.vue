<template>
    <modal
        :show="show"
        :form="`createContactForm`"
        :submit-button-text="`Salvar`"
        :submit-button-status="buttonStatus"
        @close="$emit('close')"
    >
        <template #title>
            Criar novo contato
        </template>
        <template #content>
            <form
                id="createContactForm"
                ref="createContactForm"
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
                        v-model="newContact.name"
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
                        v-model="newContact.email"
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
                        v-model="newContact.phone"
                        class="createContact_input"
                        type="text"
                    >
                </div>
            </form>
        </template>
    </modal>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import masks from '@/utils/masks'

import Modal from './Modal.vue'

const store = useStore()
const inputPhone = ref(null)
const createContactForm = ref(null)

const cleanContactObject = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    date:  {
        created: null,
        updated: null
    }
}
const newContact = reactive({ ...cleanContactObject })

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

const emit = defineEmits([ 'close', 'created' ])

const buttonStatus = computed(() => {
    return (!newContact.name && !newContact.email && !newContact.phone)
})

watch(() => props.id, (id) => {
    const editContact = contacts.value.filter(contact => contact.id === id)

    if(editContact) {
        Object.assign(newContact, editContact[0])
    }
},{
    deep: true
})

function saveContact() {
    if (newContact.id === 0) {
        newContact.id = contacts.value.length + 1
        newContact.date.created = Date.now()
        contacts.value.unshift(newContact)
    } else {
        contacts.value.map(contact => {
            if (newContact.id === contact.id) {
                contact.name = newContact.name
                contact.email = newContact.email
                contact.phone = newContact.phone
            }
        })
    }
    
    store.dispatch('contacts/updateContacts', contacts)
    Object.assign(newContact, cleanContactObject)
    emit('close')
}

onMounted(() => {
    console.log('oi')
    masks.inputPhone(inputPhone)
})
</script>

<style lang="scss">
@use '@/styles/tokens/spacings.scss' as *;
@use '@/styles/snippets/fields.scss' as *;

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