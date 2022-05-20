<template>
    <Header @search="filterContacts($event)" />
    <main class="pageHome">
        <div class="pageHome_container">
            <ContactsTable :search-value="searchValue" />
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import ContactsTable from '@/components/ContactsTable.vue'

const searchValue = ref('')

function filterContacts(value) {
    searchValue.value = value
}
</script>

<style lang="scss">
@use '@/styles/snippets/containers.scss' as *;
@use '@/styles/tokens/spacings.scss' as *;

.pageHome {
	display: flex;
	justify-content: center;

	width: 100%;
	padding-bottom: $spacing-xxxl-vh;
}

.pageHome_container {
	@extend %container;
}
</style>
