<script lang="ts">
    // types
    import type { IContent, IPageData, IProject } from '$lib/ts-interfaces';
    interface IData extends IPageData {
        projects: IProject[];
    }

    /** @type {import('./$types').PageData} */
    export let data: IData;

    import { localeString } from '$lib/helpers';
    import { locale } from '$lib/stores';

    // components
    import ContentBlocks from '$lib/components/ContentBlocks.svelte';

    // data
    $: content =
        data?.projects &&
        data.projects.length &&
        data.projects[0].description &&
        data.projects[0].description[$locale as keyof IContent];
</script>

<svelte:head>
    {#if data?.title}
        <title>{localeString(data.title, $locale)}</title>
        <meta property="og:title" content={localeString(data.title, $locale)} />
    {/if}

    <meta property="og:url" content="https://abadiart.org/projects" />

    {#if data?.description}
        <meta name="description" content={data.description} />
        <meta property="og:description" content={data.description} />
    {/if}
</svelte:head>

<div class="page">
    {#if data?.projects?.length && typeof content === 'object'}
        <ContentBlocks modifiers={['project']} contentBlocks={content} />
    {/if}
</div>
