<script lang="ts">
    // types
    import type { IPageData } from '$lib/ts-interfaces';
    interface IData extends IPageData {}

    /** @type {import('./$types').PageData} */
    export let data: IData;

    import { localeString } from '$lib/helpers';
    import { locale } from '$lib/stores';
</script>

<svelte:head>
    {#if data?.title}
        <title>{localeString(data.title, $locale)}</title>
        <meta property="og:title" content={localeString(data.title, $locale)} />
    {/if}

    <meta property="og:url" content="https://abadiart.org/work" />

    {#if data?.description}
        <meta name="description" content={data.description} />
        <meta property="og:description" content={data.description} />
    {/if}
</svelte:head>

{#if data?.title}
    {localeString(data.title, $locale)}
{/if}
