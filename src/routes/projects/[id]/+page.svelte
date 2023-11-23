<script lang="ts">
    import { localeString } from '$lib/helpers';
    import { locale } from '$lib/stores';
    import ContentBlocks from '$lib/components/ContentBlocks.svelte';
    import type { IContent, ILocaleString, IProject } from '$lib/ts-interfaces';
    import AHead from '$lib/components/AHead.svelte';

    interface IData {
        project: IProject;
        id: string;
        title?: ILocaleString;
        description?: ILocaleString;
    }

    export let data: IData;
    const { project, id, description } = data;

    $: content = project?.description[$locale as keyof IContent];
    $: localeDescription = description && localeString(description, $locale);
</script>

<AHead title={project?.title} description={localeDescription} canonical={`https://abadiart.org/projects/${id}`} />

<div class="page">
    {#if content && typeof content === 'object'}
        <ContentBlocks modifiers={['project']} contentBlocks={content} />
    {/if}
</div>
