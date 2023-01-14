<script lang="ts">
    // types
    import type { IContent, ILocaleString, IProject } from '$lib/ts-interfaces';
    interface IData {
        project: IProject;
        id: string;
        title?: ILocaleString;
        description?: ILocaleString;
    }

    /** @type {import('./$types').PageData} */
    export let data: IData;

    import { localeString } from '$lib/helpers';
    import { locale } from '$lib/stores';

    // components
    import ContentBlocks from '$lib/components/ContentBlocks.svelte';

    // data
    $: content = data?.project?.description[$locale as keyof IContent];
</script>

<svelte:head>
    {#if data?.project?.title}
        <title>{localeString(data.project.title, $locale)}</title>
        <meta property="og:title" content={localeString(data.project.title, $locale)} />
    {/if}

    {#if data?.id}
        <meta property="og:url" content={`https://abadiart.org/projects/${data.id}`} />
    {/if}

    {#if data?.description}
        <meta name="description" content={localeString(data.description, $locale)} />
        <meta property="og:description" content={localeString(data.description, $locale)} />
    {/if}
</svelte:head>

<div class="page">
    {#if content && typeof content === 'object'}
        <ContentBlocks modifiers={['project']} contentBlocks={content} />
    {/if}
</div>
