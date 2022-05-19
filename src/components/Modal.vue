<template>
    <Transition name="modal">
        <div
            v-if="show"
            class="modal"
            aria-modal="true"
            role="dialog"
        >
            <div class="modal_container">
                <div
                    class="modal_background"
                    @click="close()"
                />
                <div class="modal_box">
                    <h2 class="modal_title">
                        <slot name="title" />
                    </h2>
                    <div class="modal_content">
                        <slot name="content" />
                    </div>
                    <div>
                        <button
                            class="modal_button_close"
                            aria-label="Cancelar"
                            @click="close()"
                        >
                            Cancelar
                        </button>
                        <button
                            class="modal_button_confirm"
                            aria-label=""
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits([ 'close' ])
const props = defineProps({
    show: Boolean
})

function close() {
    emit('close')
}

function handleKeyup(event) {
    if(event.key === 'Escape') {
        close()
    }
}

onMounted(() => {
    document.addEventListener('keyup', handleKeyup)
})

onUnmounted(() => {
    document.removeEventListener('keyup', handleKeyup)
})
</script>

<style lang="scss">
@use '@/styles/tokens/colors.scss' as *;
@use '@/styles/utils/interactions.scss' as *;
@use '@/styles/tokens/speeds.scss' as *;
@use '@/styles/tokens/spacings.scss' as *;
@use '@/styles/tokens/borders.scss' as *;

.modal {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;

	overflow-y: auto;

	width: 100%;
	height: 100vh;
}

.modal_container {
	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	min-height: 100%;
}

.modal_background {
	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	background-color: $color-low-transparent-base;
}

.modal_box {
	position: relative;
	z-index: 2;

	width: 438px;
	max-width: 100%;
	padding: $spacing-xs-vh;

	background-color: $color-high-lightest;
	border-radius: $border-radius-large;
}

.modal_title {
	width: 100%;
}

.modal_button_close {
}

.modal_content {
	width: 100%;
}

.modal-enter-from,
.modal-leave-to  {
	opacity: 0;
}
</style>