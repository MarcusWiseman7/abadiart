<script lang="ts">
    // types

    // props
    export let label = '';
    export let error: string | null = null;
    export let required = false;

    // components
    import errorIcon from '$lib/assets/icons/error.svg';

    // methods
</script>

<div class={`input__wrapper ${error ? 'input__wrapper--error' : ''}`}>
    <div class="input__label">
        <span>{label}</span>
        {#if required}
            <span class="input__label__required">*</span>
        {/if}
    </div>

    <slot />

    {#if error}
        <div class="input__error-msg">
            <img src={errorIcon} alt="error" height="18" />
            <span>{error}</span>
        </div>
    {/if}
</div>

<style lang="scss">
    .input {
        &__wrapper {
            border: 1px solid #dadce0;
            padding: 10px 16px 16px;
            border-radius: 20px;

            &--error {
                border: 1px solid #d93025;
            }

            @media (min-width: 600px) {
                padding: 20px 30px 30px;
            }
        }

        &__label {
            display: flex;
            gap: 6px;
            font-size: 18px;
            margin-bottom: 8px;

            &__required {
                color: #d93025;
            }

            @media (min-width: 600px) {
                margin-bottom: 20px;
            }
        }

        &__error-msg {
            font-size: 14px;
            color: #d93025;
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 16px;
        }
    }
</style>
