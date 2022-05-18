<template>
    <Header />
    <main>
        {{ contacts }}
    </main>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Header from '@/components/Header.vue'

const store = useStore()

const contacts =  computed(() => {
    return store.state.contacts.all
})

function loadPatients() {
    store.dispatch('contacts/fetchContacts')
}

loadPatients()
</script>

<style lang="scss">
</style>
