<template>
    <header class="header">
        <div class="header_container">
            <a
                class="headerLogo_link"
                href="/"
            >
                <img
                    class="headerLogo_img"
                    src="@assets/logo.svg"
                    alt="Ubook"
                >
            </a>

            <ButtonCreateContact class="header_button" />

            <div class="contactSearch_field">
                <label
                    class="contactSearch_label"
                    for="contactSearch_input"
                >Buscar um contato</label>
                <input
                    id="contactSearch_input"
                    v-model="contactSearchValue"
                    class="contactSearch_input"
                    type="text"
                    placeholder="Buscar..."
                >
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue'
import ButtonCreateContact from '@/components/ButtonCreateContact.vue'

const contactSearchValue = ref('')
</script>

<style lang="scss">
@use '@/styles/tools/convertPxToVh.scss' as *;
@use '@/styles/snippets/fields.scss' as *;
@use '@/styles/snippets/containers.scss' as *;
@use '@/styles/snippets/layout.scss' as *;
@use '@/styles/tokens/spacings.scss' as *;

.header {
	display: flex;
	justify-content: center;

	width: 100%;
	padding-top: $spacing-xs-vh;
	padding-bottom: $spacing-lg-vh;
}

.header_container {
	@extend %container;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;

	gap:  $spacing-xl-vh;
}

.headerLogo_link {
	margin-right: $spacing-xl-vh;
}

.headerLogo_img {
	width: pxvh(148);
	max-width: 148px;
}

.contactSearch_field {
	display: flex;
	flex-grow: 1;
}

.contactSearch_label {
	@extend %accessible_hidden;
}

.contactSearch_input {
	@extend %input_search;
}
</style>