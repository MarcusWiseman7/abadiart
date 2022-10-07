<script lang="ts">
    import type { BlockComponentProps } from '@portabletext/svelte';
    import { onMount } from 'svelte';
    export let portableText: BlockComponentProps;

    import AImage from '$lib/components/AImage.svelte';
    $: ({ value } = portableText);
    $: anchorId = `image-${value._key}`;

    let evenImage = false;

    const getPosition = (): void => {
        const imagesInDOM = document.querySelectorAll('.image-query-class');
        imagesInDOM.forEach((image, index) => {
            if (image.id === anchorId) evenImage = index % 2 === 0;
        });
    };

    onMount(getPosition);
</script>

<div class={`image image-query-class ${evenImage ? 'float-left' : 'float-right'}`} id={anchorId}>
    <AImage image={value.asset} alt={value.alt} height={400} addClass="rounded--m max-w-450 max-h-400" />
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
