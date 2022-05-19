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
                    v-for="contact in contacts"
                    :key="contact.id"
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
                                @click="editContact(contact)"
                            />
                            <button
                                class="contactsTable_button -delete"
                                title="Clique para excluir o contato"
                                @click="deleteContact(contact)"
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
        @close="show = false"
    />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import masks from '@/utils/masks'
import randomColor from '@/utils/randomColor'
import ModalContact from '@/components/ModalContact.vue'

import EmptyList from './EmptyList.vue'

const store = useStore()
const show = ref(false)
const id = ref(0)

const contacts =  computed(() => {
    return store.state.contacts.all
})

function loadPatients() {
    store.dispatch('contacts/fetchContacts')
}

function editContact(contact) {
    id.value = contact.id
    show.value = true
}

loadPatients()
</script>

<style lang="scss">
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
