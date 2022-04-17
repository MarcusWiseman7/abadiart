<script lang="ts">
    import { localeString } from '$lib/helpers';
    import { locale, pressContent } from '$lib/stores';
</script>

{#if $pressContent?.title}
    {localeString($pressContent.title, $locale)}
{/if}
