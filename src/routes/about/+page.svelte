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

{#if $aboutContent?.bio && $aboutContent.bio[$locale]}
    <div class="content">
        <CustomPortableText value={$aboutContent.bio[$locale]} />
    </div>
{/if}
