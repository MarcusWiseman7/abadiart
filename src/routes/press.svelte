<script lang="ts">
    import { localeString } from '$lib/helpers';
    import { locale, pressContent } from '$lib/stores';
</script>

{#if $pressContent?.pressLinks?.links?.length}
    {#if $pressContent?.pressLinks?.headline}
        <h2 class="text-3xl font-semibold mb-10">{localeString($pressContent.pressLinks.headline, $locale)}</h2>
    {/if}

    <div class="flex flex-col text-xl font-semibold">
        {#each $pressContent.pressLinks.links as href}
            <a class="mb-4 hover:text-orange-600" {href} target="_blank">{href}</a>
        {/each}
    </div>
{/if}
