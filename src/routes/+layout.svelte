<script lang="ts">
    import '../app.scss';

    import AFooter from '$lib/components/AFooter.svelte';
    import Message from '$lib/components/Message.svelte';
    import { appMessages, aboutContent, contactContent, workContent, pressContent, locale } from '$lib/stores';
    import { page } from '$app/stores';
    import { localeString } from '$lib/helpers';
    import { onMount } from 'svelte';

    $: pathname = $page.url.pathname;
    $: pageInfo = {
        '/about': $aboutContent,
        '/contact': $contactContent,
        '/press': $pressContent,
        '/work': $workContent,
    };

    const getLocale = (): void => {
        const possibleLocales = ['en', 'es'];
        const localeFromNavigator =
            window.navigator.languages && window.navigator.languages[0]
                ? window.navigator.languages[0]
                : window.navigator.language;
        const cutLocale = localeFromNavigator.slice(0, 2);
        const useableLocale = possibleLocales.includes(cutLocale) ? cutLocale : 'en';

        locale.set(useableLocale);
    };

    // SEO HEAD ITEMS
    $: title = pageInfo[pathname]?.title ? `AbadiArt | ${localeString(pageInfo[pathname].title, $locale)}` : 'AbadiArt';
    $: description = pageInfo[pathname]?.description || '';
    $: keywords = pageInfo[pathname]?.keywords || [];

    onMount(getLocale);
</script>

<svelte:head>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta property="og:url" content={'https://abadiart' + pathname} />
    {#if description}
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
    {/if}
    {#if keywords?.length}
        <meta name="keywords" content={keywords} />
    {/if}
</svelte:head>

<div class="layout">
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
</style>
