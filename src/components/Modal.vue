<template>
    <Teleport to="body">
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
                    <div
                        class="modal_box"
                    >
                        <h2 class="modal_title">
                            <slot name="title" />
                        </h2>
                        <div class="modal_content">
                            <slot name="content" />
                        </div>
                        <div class="modal_buttons">
                            <button
                                class="modal_button_close"
                                type="button"
                                @click="close()"
                            >
                                Cancelar
                            </button>
                            <button
                                class="modal_button_confirm"
                                :disabled="submitButtonStatus"
                                :form="form"
                                type="submit"
                                @click="modalSubmit()"
                            >
                                {{ submitButtonText }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits([ 'close', 'modal-submit' ])
const props = defineProps({
    show: Boolean,
    form: {
        type: String,
        default: '',
        required: false
    },
    submitButtonText: {
        type: String,
        default: 'Enviar',
        required: false
    },
    submitButtonStatus: {
        type: Boolean,
        default: false,
        required: false
    }
})

function close() {
    emit('close')
}

function modalSubmit() {
    emit('modal-submit')
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
@use '@/styles/snippets/fonts.scss' as *;
@use '@/styles/tokens/colors.scss' as *;
@use '@/styles/utils/interactions.scss' as *;
@use '@/styles/tokens/speeds.scss' as *;
@use '@/styles/tokens/spacings.scss' as *;
@use '@/styles/tokens/borders.scss' as *;
@use '@/styles/snippets/buttons.scss' as *;

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
	padding: 0px 16px;
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
	--padding: #{$spacing-xs-vh};

	position: relative;
	z-index: 2;

	width: 438px;
	max-width: 100%;

	background-color: $color-high-lightest;
	border-radius: $border-radius-large;
}

.modal_title {
	@extend %font_xs_regular;

	width: 100%;
	padding: var(--padding);

	color: $color-text-low;
	border-bottom: $border-width-small solid $border-color-high-darkest;
}

.modal_content {
	width: 100%;
	padding: $spacing-md-vh var(--padding);
}

.modal_buttons {
	display: flex;
	justify-content: flex-end;

	width: 100%;
	padding: var(--padding);
	gap: $spacing-xs-vh;

	border-top: $border-width-small solid $border-color-high-darkest;
}

.modal_button_close {
	@extend %font_xxs_medium;

	color: $color-text-base;

	cursor: pointer;
}

.modal_button_confirm {
	@extend %button_primary;
}

.modal-enter-from,
.modal-leave-to  {
	opacity: 0;
}
</style>