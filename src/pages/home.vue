<template>
    <Header />
    <main class="pageHome">
        <div class="pageHome_container">
            <ContactsTable />
        </div>
    </main>
</template>

<script setup>
import Header from '@/components/Header.vue'
import ContactsTable from '@/components/ContactsTable.vue'
</script>

<style lang="scss">
@use '@/styles/snippets/containers.scss' as *;

.pageHome {
	display: flex;
	justify-content: center;

	width: 100%;
}

.pageHome_container {
	@extend %container;
}
</style>
