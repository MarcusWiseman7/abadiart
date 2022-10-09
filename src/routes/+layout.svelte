<script lang="ts">
    import '../app.scss';

    import AFooter from '$lib/components/AFooter.svelte';
    import Message from '$lib/components/Message.svelte';
    import { appMessages, locale } from '$lib/stores';

    const setLanguage = (lang: string): void => {
        locale.set(lang);
    };
</script>

<div class="layout">
    <div class="languages">
        <span class={'language' + $locale === 'es' ? ' language--active' : ''} on:click={() => setLanguage('es')}
            >ES</span
        >
        <span class={'language' + $locale === 'en' ? ' language--active' : ''} on:click={() => setLanguage('en')}
            >EN</span
        >
    </div>

    <div class="page">
        <slot />
    </div>

    <AFooter />

    {#if $appMessages?.length}
        {#each $appMessages as messageObj}
            <Message {messageObj} />
        {/each}
    {/if}
</div>

<style lang="scss">
    .layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding-top: 20px;
        width: 100%;
        min-height: 100vh;
    }

    .page {
        min-height: max-content;
        width: 100%;
        padding: 0 14px;

        @media (min-width: 1024px) {
            width: 66.666667%;
            max-width: 896px;
            padding: 0;
        }
    }

    .languages {
        display: flex;
        gap: 8px;
        position: fixed;
        top: 40px;
        right: 40px;

        &.language {
            cursor: pointer;

            .active {
                color: pink;
            }
        }
    }
</style>
