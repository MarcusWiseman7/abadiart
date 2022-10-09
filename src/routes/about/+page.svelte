<script lang="ts">
    import type { IPageData } from '$lib/ts-interfaces';
    import type { PortableText } from '@portabletext/svelte';
    interface IData extends IPageData {
        contentBlocks: PortableText;
    }

    /** @type {import('./$types').PageData} */
    export let data: IData;

    import { locale } from '$lib/stores';

    // components
    import BrushStroke from '$lib/components/BrushStroke.svelte';
    import CustomPortableText from '$lib/components/CustomPortableText.svelte';
    import { localeString } from '$lib/helpers';
</script>

<svelte:head>
    {#if data?.title}
        <title>{localeString(data.title, $locale)}</title>
        <meta property="og:title" content={localeString(data.title, $locale)} />
    {/if}

    <meta property="og:url" content="https://abadiart.org/about" />

    {#if data?.description && typeof data.description === 'string'}
        <meta name="description" content={data.description} />
        <meta property="og:description" content={data.description} />
    {/if}
</svelte:head>

{#if data?.title}
    <BrushStroke>
        {localeString(data.title, $locale)}
    </BrushStroke>
{/if}

{#if data?.contentBlocks}
    <div class="about-content">
        {#each data.contentBlocks as block}
            <div class="about-content-block">
                <CustomPortableText value={block.blockContent[$locale]} />
            </div>
        {/each}
    </div>
{/if}
