<script lang="ts">
    import type { BlockComponentProps } from '@portabletext/svelte';
    export let portableText: BlockComponentProps;

    import AImage from '../AImage.svelte';

    $: ({ value, global } = portableText);
    $: images = global.ptBlocks.filter((block) => block._type === 'mainImage');
    $: imageIndex = images.findIndex((x) => x._key === value._key);
    $: evenImage = imageIndex % 2 === 0;

    $: anchorId = `image-${value._key}`;
</script>

<div class={`image ${evenImage ? 'float-left' : 'float-right'}`} id={anchorId}>
    <AImage image={value.asset} alt={value.alt} height={400} addClass="rounded--m" />
    {#if value.caption}
        <span class="caption">{value.caption}</span>
    {/if}
</div>

<style lang="scss">
    .image {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: fit-content;
    }

    .caption {
        font-size: 14px;
        color: gray;
        font-style: italic;
        font-weight: 600;
    }

    .float-right {
        @media (min-width: 600px) {
            float: right;
            margin-left: 20px;
        }
    }

    .float-left {
        @media (min-width: 600px) {
            float: left;
            margin-right: 20px;
        }
    }
</style>
