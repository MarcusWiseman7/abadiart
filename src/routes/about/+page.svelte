<script lang="ts">
    // types
    import type { IPageData, IContent } from '$lib/ts-interfaces';
    interface IData extends IPageData {
        aboutUs: IContent;
        desktopAboutUs: IContent;
    }

    /** @type {import('./$types').PageData} */
    export let data: IData;

    // components
    import BrushStroke from '$lib/components/BrushStroke.svelte';
    import ContentBlocks from '$lib/components/ContentBlocks.svelte';

    // helpers
    import { onMount } from 'svelte';
    import { localeString } from '$lib/helpers';
    import { locale } from '$lib/stores';

    // data
    let mobile = true;
    $: aboutUsDeviceKey = mobile ? 'aboutUs' : 'desktopAboutUs';
    $: aboutUsContent = data && data[aboutUsDeviceKey] && data[aboutUsDeviceKey][$locale as keyof IContent];

    // methods
    const setMobile = (): void => {
        mobile = window.innerWidth < 600;
    };

    onMount(setMobile);
</script>

<svelte:head>
    {#if data?.title}
        <title>{localeString(data.title, $locale)}</title>
        <meta property="og:title" content={localeString(data.title, $locale)} />
    {/if}

    <meta property="og:url" content="https://abadiart.org/about" />

    {#if data?.description}
        <meta name="description" content={data.description} />
        <meta property="og:description" content={data.description} />
    {/if}
</svelte:head>

<svelte:window on:resize={setMobile} />

{#if data?.title}
    <BrushStroke>
        {localeString(data.title, $locale)}
    </BrushStroke>
{/if}

<div class="page">
    <!-- content -->
    {#if aboutUsContent}
        <ContentBlocks contentBlocks={aboutUsContent} />
    {/if}
</div>
