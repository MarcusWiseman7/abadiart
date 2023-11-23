<script lang="ts">
    import { localeString } from '$lib/helpers';
    import { locale } from '$lib/stores';
    import type { ILocaleString } from '$lib/ts-interfaces';

    export let title: ILocaleString | undefined;
    export let description: string | undefined;
    export let canonical: string;
</script>

<svelte:head>
    {#if title}
        <title>{localeString(title, $locale)}</title>
        <meta property="og:title" content={localeString(title, $locale)} />
    {/if}

    <meta property="og:url" content={canonical} />
    <link rel="canonical" href={canonical} />

    {#if description}
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
    {/if}
</svelte:head>
