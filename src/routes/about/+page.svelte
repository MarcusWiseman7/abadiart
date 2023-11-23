<script lang="ts">
    import type { IPageData } from '$lib/types/pageData';
    import type { IContent } from '$lib/ts-interfaces';
    import BrushStroke from '$lib/components/BrushStroke.svelte';
    import ContentBlocks from '$lib/components/ContentBlocks.svelte';
    import { localeString } from '$lib/helpers';
    import { device, locale } from '$lib/stores';
    import AHead from '$lib/components/AHead.svelte';

    interface IData extends IPageData {
        aboutUs: IContent;
        desktopAboutUs: IContent;
    }

    export let data: IData;
    const { title, description, aboutUs, desktopAboutUs } = data;

    // let mobile = true;
    $: aboutUsDeviceKey = $device === 'desktop' ? desktopAboutUs : aboutUs;
    $: aboutUsContent = aboutUsDeviceKey[$locale as keyof IContent];

    // const setMobile = (): void => {
    //     mobile = window.innerWidth < 600;
    // };

    // onMount(setMobile);
</script>

<AHead {title} {description} canonical="https://abadiart.org/about" />

<!-- <svelte:window on:resize={setMobile} /> -->

{#if title}
    <BrushStroke>
        {localeString(title, $locale)}
    </BrushStroke>
{/if}

<div class="page">
    {#if aboutUsContent}
        <ContentBlocks contentBlocks={aboutUsContent} />
    {/if}
</div>
