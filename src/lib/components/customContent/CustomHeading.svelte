<script lang="ts">
    import type { BlockComponentProps } from '@portabletext/svelte';
    export let portableText: BlockComponentProps;

    $: ({ value, indexInParent } = portableText);
    $: blocks = portableText.global.ptBlocks;
    $: style = portableText.value.style;

    $: precededByHeading = ['h1', 'h2', 'h3', 'h4', 'h5'].includes(blocks[indexInParent - 1]?.style);
    $: anchorId = `heading-${value._key}`;
</script>

<!-- If preceded by heading, have a higher margin top -->
<div class="about-heading {precededByHeading ? 'preceded-by-heading' : ''}" id={anchorId}>
    <svelte:element this={style} class={style}><slot /></svelte:element>
</div>

<style lang="scss">
    .preceded-by-heading {
        margin-top: 20px;
    }
</style>
