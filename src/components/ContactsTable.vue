<template>
    <div
        v-if="contacts.length"
        class="contactsTable_container"
    >
        <table class="contactsTable">
            <thead>
                <tr>
                    <th />
                    <th>
                        Contatos
                    </th>
                    <th>
                        E-mail
                    </th>
                    <th>
                        Telefone
                    </th>
                    <th />
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="(contact, index) in contactsFiltered"
                    :key="index"
                    ref="listItems"
                    :data-created="contact.date.created"
                >
                    <td class="contactsTable_thumbnail_col">
                        <div
                            class="contactsTable_thumbnail"
                            :style="`background-color: ${randomColor()}`"
                        >
                            {{ contact.name.charAt(0) }}
                        </div>
                    </td>
                    <td>
                        {{ contact.name }}
                    </td>
                    <td>{{ contact.email }}</td>
                    <td>{{ masks.formatPhone(contact.phone) }}</td>
                    <td>
                        <div class="contactsTable_actions">
                            <button
                                class="contactsTable_button -edit"
                                title="Clique para editar o contato"
                                @click="editContact(contact.id)"
                            />
                            <button
                                class="contactsTable_button -delete"
                                title="Clique para excluir o contato"
                                @click="deleteContact(contact.id)"
                            />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <EmptyList
        v-else
        :text="`Nenhum contato foi criado ainda`"
    />
    <ModalContact
        :id="id"
        :show="show"
        :title="`Editar contato`"
        @close="resetModal()"
    />
    <ModalContactDelete
        :id="idDelete"
        :show="showModalDelete"
        @close="showModalDelete = false"
    />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import masks from '@/utils/masks'
import randomColor from '@/utils/randomColor'
import ModalContact from '@/components/ModalContact.vue'
import ModalContactDelete from '@/components/ModalContactDelete.vue'

import EmptyList from './EmptyList.vue'

const featuredContactClass = 'is_featured'
const listItems = ref([])
const store = useStore()
const show = ref(false)
const showModalDelete = ref(false)
const id = ref(null)
const idDelete = ref(null)

const contacts =  computed(() => {
    return store.state.contacts.all
})

const props = defineProps({
    searchValue: {
        type: String,
        default: '',
        required: true
    }
})

const contactsFiltered = computed(() => {
    const filteredSearchValue = props.searchValue.toLowerCase()

    return contacts.value.filter(contact => {
        return contact.name.toLowerCase().includes(filteredSearchValue)
    })
}) 

watch(contacts, () => {
    checkFeatured()
}, { deep: true })

function checkFeatured() {
    contacts.value.forEach((contact, index) => {
        const secondsPassed = getSecondsPassed(contact.date.created)
        if(secondsPassed < 10) {
            const el = listItems.value[index]

            if(el && !el.classList.contains(featuredContactClass)) {
                el.classList.add(featuredContactClass)	
                removeFeatured(el, secondsPassed)
            }			
        }
    })
}

function removeFeatured(el, secondsPassed) {
    setTimeout(function() {
        el.classList.remove(featuredContactClass)
    },10000 - (secondsPassed * 1000))	
}

function loadPatients() {
    store.dispatch('contacts/fetchContacts')
}

function editContact(contactId) {
    id.value = contactId
    show.value = true
}

function deleteContact(contactId) {
    idDelete.value = contactId
    showModalDelete.value = true
}

function resetModal() {
    show.value = false
    id.value = null
}

function getSecondsPassed(date) {
    return Math.abs((Date.now() - date) / 1000)
}

loadPatients()
</script>

<style lang="scss">
@use '@/styles/tokens/font/sizes.scss' as *;
@use '@/styles/tokens/spacings.scss' as *;
@use '@/styles/tokens/speeds.scss' as *;
@use '@/styles/tokens/colors.scss' as *;
@use '@/styles/snippets/tables.scss' as *;
@use '@/styles/utils/interactions.scss' as *;

.contactsTable_container {
	@extend %table_container;
}

.contactsTable {
	@extend %table;

	min-width: 568px;
}

.contactsTable_thumbnail_col {
	--size: 24px;
	width: var(--size);
}

.contactsTable_thumbnail {
	display: flex;
	align-items: center;
	justify-content: center;

	width: var(--size);
	height: var(--size);

	color: $color-high-lightest;
	border-radius: 50%;

	font-size: $font-size-xs-px;
	text-transform: uppercase;
}

.contactsTable_actions {
	display: flex;
	align-items: center;
	justify-content: flex-end;

	gap: $spacing-md-vh;
}

.contactsTable_button {
	--size: 16px;

	width: var(--size);
	height: var(--size);

	background-color: $color-low-lightest;

	transition: background-color ease-in-out $speed-base;

	cursor: pointer;

	mask-size: contain;
	will-change: background-color;

	&.-edit {
		-webkit-mask: url('@assets/icons/ic-edit.svg');

		mask: url('@assets/icons/ic-edit.svg');
	}

	&.-delete {
		-webkit-mask: url('@assets/icons/ic-delete.svg');

		mask: url('@assets/icons/ic-delete.svg');	
	}

	@include interaction_full {
		background-color: $color-low-base;
	}
}
</style>
