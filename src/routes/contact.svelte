<script lang="ts">
    import { localeString } from '$lib/helpers';
    import { contactContent, locale } from '$lib/stores';
</script>

{#if $contactContent?.title}
    {localeString($contactContent.title, $locale)}
{/if}
