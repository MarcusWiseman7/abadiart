<script lang="ts">
    import { localeString } from '$lib/helpers';
    import { locale, workContent } from '$lib/stores';
</script>

{#if $workContent?.title}
    {localeString($workContent.title, $locale)}
{/if}
