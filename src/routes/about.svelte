<script>
    import CustomPortableText from '$lib/components/CustomPortableText.svelte';
    import { aboutContent } from '$lib/stores';

    $: title = $aboutContent?.title ? `AbadiArt | ${$aboutContent.title}` : 'AbadiArt';
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

{#if $aboutContent?.content}
    <CustomPortableText blocks={$aboutContent.content} />
{/if}
