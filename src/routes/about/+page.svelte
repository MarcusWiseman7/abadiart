<script lang="ts">
    import { aboutContent, locale } from '$lib/stores';
    import BrushStroke from '$lib/components/BrushStroke.svelte';
    import CustomPortableText from '$lib/components/CustomPortableText.svelte';
    import { localeString } from '$lib/helpers';
</script>

{#if $aboutContent?.title}
    <BrushStroke>
        {localeString($aboutContent.title, $locale)}
    </BrushStroke>
{/if}

{#if $aboutContent?.contentBlocks}
    {#each $aboutContent.contentBlocks as block}
        <div class="about-content-block">
            <CustomPortableText value={block.blockContent[$locale]} />
        </div>
    {/each}
{/if}
