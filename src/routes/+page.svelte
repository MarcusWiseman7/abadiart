<script lang="ts">
    import type { IPageData } from '$lib/types/pageData';
    import type { IContent, IMainImage } from '$lib/ts-interfaces';
    import { device, locale } from '$lib/stores';
    import SlideShow from '$lib/components/SlideShow.svelte';
    import ContentBlocks from '$lib/components/ContentBlocks.svelte';
    import AHead from '$lib/components/AHead.svelte';

    interface IData extends IPageData {
        mobileImages: IMainImage[];
        desktopImages: IMainImage[];
        missionStatement: IContent;
        desktopMissionStatement: IContent;
    }

    export let data: IData;
    const { mobileImages, desktopImages, desktopMissionStatement, missionStatement, description } = data;

    $: missionDeviceKey = $device === 'desktop' ? desktopMissionStatement : missionStatement;
    $: mission = missionDeviceKey[$locale as keyof IContent];
    $: images = $device === 'desktop' ? desktopImages : mobileImages;

    // const setMobile = (): void => {
    //     mobile = window.innerWidth < 600;
    // };
    // onMount(setMobile);
</script>

<AHead title={{ en: 'AbadiArt', es: 'AbadiArt' }} {description} canonical="https://abadiart.org/" />

<!-- <svelte:window on:resize={setMobile} /> -->

<section>
    <SlideShow {images} />
</section>

<main>
    <div class="page">
        {#if mission}
            <ContentBlocks contentBlocks={mission} modifiers={['center-headers-mobile']} />
        {/if}
    </div>
</main>

<style lang="scss">
    section {
        min-height: 100vh;
        min-height: 100dvh;
    }

    main {
        position: relative;
        background-color: #fff;
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>
