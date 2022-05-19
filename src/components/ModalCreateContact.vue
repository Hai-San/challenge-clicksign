<template>
    <Teleport to="body">
        <modal
            :show="show"
            @close="$emit('close')"
        >
            <template #title>
                Criar novo contato
            </template>
            <template #content>
                create
            </template>
        </modal>
    </Teleport>
</template>

<script setup>
import Modal from './Modal.vue'

const props = defineProps({
    show: Boolean
})

const emit = defineEmits([ 'close' ])
</script>

<style lang="scss">

</style>