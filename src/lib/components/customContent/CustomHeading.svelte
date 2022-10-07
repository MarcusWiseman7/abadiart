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
<div class="custom-heading {precededByHeading ? 'preceded-by-heading' : ''}" id={anchorId}>
    <svelte:element this={style} class={style}><slot /></svelte:element>
</div>

<style lang="scss">
    .custom-heading {
        position: relative;
        padding-top: 30px;
        clear: both;

        .h1 {
            font-size: 36px;
            line-height: 40px;
            font-weight: 600;
        }

        .h2 {
            font-size: 30px;
            line-height: 36px;
            font-weight: 600;
        }

        .h3 {
            font-size: 20px;
            line-height: 28px;
            font-weight: 600;
        }

        .h4 {
            font-size: 22px;
            line-height: 30px;
            font-weight: 600;
        }
    }

    .preceded-by-heading {
        margin-top: 20px;
    }
</style>
