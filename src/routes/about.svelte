<script>
    import { aboutContent } from '$lib/stores';
</script>

{#if $aboutContent?.title}
    {$aboutContent.title}
{/if}
