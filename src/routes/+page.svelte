<script lang="ts">
    // types
    import type { IContent, IMainImage, IPageData } from '$lib/ts-interfaces';
    interface IData extends IPageData {
        images: {
            images: IMainImage[];
        };
        missionStatement: IContent;
        desktopMissionStatement: IContent;
    }

    /** @type {import('./$types').PageData} */
    export let data: IData;

    // helpers
    import { onMount } from 'svelte';
    import { localeString } from '$lib/helpers';
    import { locale } from '$lib/stores';

    // components
    import SlideShow from '$lib/components/SlideShow.svelte';
    import ContentBlocks from '$lib/components/ContentBlocks.svelte';

    // data
    let mobile = true;
    $: images = data?.images?.images;
    $: missionDeviceKey = mobile ? 'missionStatement' : 'desktopMissionStatement';
    $: missionStatement = data && data[missionDeviceKey] && data[missionDeviceKey][$locale as keyof IContent];

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

    <meta property="og:url" content="https://abadiart.org" />

    {#if data?.description && typeof data.description === 'string'}
        <meta name="description" content={data.description} />
        <meta property="og:description" content={data.description} />
    {/if}
</svelte:head>

<svelte:window on:resize={setMobile} />

<section>
    <!-- image slideshow -->
    <SlideShow {images} />
</section>

<main>
    <div class="page">
        {#if missionStatement}
            <ContentBlocks contentBlocks={missionStatement} modifiers={['center-headers-mobile']} />
        {/if}
    </div>
</main>

<style lang="scss">
    section {
        min-height: 100vh;
    }

    main {
        position: relative;
        background-color: #fff;
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>
