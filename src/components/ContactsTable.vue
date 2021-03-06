<template>
    <div
        v-if="contactsFiltered.length > 0"
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
                    :key="`${index}_${contact.name}`"
                    :ref="el => listItems[index] = el"
                    :data-created="contact.date.created"
                >
                    <td class="contactsTable_thumbnail_col">
                        <div
                            class="contactsTable_thumbnail"
                            :style="getThumbnailBackgroundColor(contact.color)"
                        >
                            {{ getFirstLetterOfName(contact.name) }}
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
                                @click="editContact(index)"
                            />
                            <button
                                class="contactsTable_button -delete"
                                title="Clique para excluir o contato"
                                @click="deleteContact(index)"
                            />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <EmptyList
        v-else
        :text="emptyTitle"
    />
    <ModalContact
        :edit-index="indexEdit"
        :show="show"
        :title="`Editar contato`"
        @close="resetModal()"
    />
    <ModalContactDelete
        :index="indexDelete"
        :show="showModalDelete"
        @close="showModalDelete = false"
    />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import masks from '@/utils/masks'
import ModalContact from '@/components/ModalContact.vue'
import ModalContactDelete from '@/components/ModalContactDelete.vue'

import EmptyList from './EmptyList.vue'

const emptyTitleDefault = 'Nenhum contato foi criado ainda.'
const emptyTitleFilter = 'Nenhum contato foi encontrado!'
const featuredContactClass = 'is_featured'
const featuredItemTimeoutMs = 10000

const store = useStore()

const emptyTitle = ref(emptyTitleDefault)
const listItems = ref([])
const show = ref(false)
const showModalDelete = ref(false)
const indexEdit = ref(null)
const indexDelete = ref(null)

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

watch(listItems, (newListItems) => {
    checkFeaturedItems(newListItems)
}, { deep: true })

watch(contactsFiltered, () => {
    if (contactsFiltered.value.length <= 0 && contacts.value.length > 0) {
        emptyTitle.value = emptyTitleFilter
    } else {
        emptyTitle.value = emptyTitleDefault
    }
}, { deep: true })

function getThumbnailBackgroundColor(color) {
    return `background-color: ${color}`
}

function getFirstLetterOfName(name) {
    return name.charAt(0)
}

function checkFeaturedItems(elements) {
    elements.forEach(el => {
        if(el) {
            const timeData = getItemTimeData(el)
            if(timeData.haveTimeLeft && !el.classList.contains(featuredContactClass)) {   
                el.style.animation = `bgColor ${timeData.timer}ms 1`
            }
        }
    })      
}

function loadContacts() {
    store.dispatch('contacts/fetchContacts')
}

function editContact(contactIndex) {
    indexEdit.value = contactIndex
    show.value = true
}

function deleteContact(contactIndex) {
    indexDelete.value = contactIndex
    showModalDelete.value = true
}

function resetModal() {
    show.value = false
    indexEdit.value = null
}

function getItemTimeData(el) {
    const passed = getSecondsPassed(el.dataset.created) 
    const haveTimeLeft = passed < (featuredItemTimeoutMs / 1000)
    const timer = featuredItemTimeoutMs - (passed * 1000)
	
    return {
        haveTimeLeft,
        timer
    }
}

function getSecondsPassed(date) {
    return Math.abs((Date.now() - date) / 1000)
}

loadContacts()
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

@keyframes bgColor{

	0%,100%  {
		background-color: $color-primary-lightest;
	}
}
</style>
