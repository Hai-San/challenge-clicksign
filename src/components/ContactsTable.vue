<template>
    <div class="contactsTable_container">
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
                    :key="contact.email"
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
                    <td>{{ contact.phone }}</td>
                    <td>
                        <div class="contactsTable_actions">
                            <button
                                class="contactsTable_buttonEdit"
                                title="Clique para editar o contato"
                                @click=""
                            >
                                e
                            </button>
                            <button
                                class="contactsTable_buttonDelete"
                                title="Clique para excluir o contato"
                                @click=""
                            >
                                d
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import randomColor from '@/utils/randomColor'

const store = useStore()

const newContact = JSON.stringify({
    name: 'Samuel',
    email: 'samuelmartinenghi@gmail.com',
    phone: '47992838463',
    new: true
})

const contacts =  computed(() => {
    return store.state.contacts.all
})

function loadPatients() {
    //store.dispatch('contacts/updateContacts', newContact)
    store.dispatch('contacts/fetchContacts')
}

loadPatients()
</script>

<style lang="scss">
@use '@/styles/tokens/colors.scss' as *;
@use '@/styles/snippets/tables.scss' as *;

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
</style>
