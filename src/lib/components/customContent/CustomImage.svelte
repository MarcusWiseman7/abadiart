<script lang="ts">
    import type { BlockComponentProps } from '@portabletext/svelte';
    export let portableText: BlockComponentProps;

    import AImage from '$lib/components/AImage.svelte';
    $: ({ value } = portableText);
    $: anchorId = `image-${value._key}`;
</script>

<div class="about-image-wrapper" id={anchorId}>
    <AImage image={value.asset} alt={value.alt} height={400} addClass="about-image" />
    {#if value.caption}
        <span class="caption">{value.caption}</span>
    {/if}
</div>
