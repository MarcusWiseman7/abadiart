<script lang="ts">
    import { localeString } from '$lib/helpers';
    import { aboutContent, locale } from '$lib/stores';
</script>

{#if $aboutContent?.title}
    {localeString($aboutContent.title, $locale)}
{/if}
