<script lang="ts">
    import { urlFor } from '$lib/image-url';
    import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

    export let image: SanityImageSource;
    export let height: number = 0;
    export let width: number = 0;
    export let alt: string;
    export let addClass: string = '';
</script>

{#if image && height && width && alt}
    <img
        class={addClass}
        style={`max-height: ${height}px; max-width: ${width}px;`}
        src={urlFor(image).height(height).width(width).format('webp').url()}
        srcset={urlFor(image)
            .height(height * 2)
            .width(width * 2)
            .format('webp')
            .url()}
        {alt}
        {height}
        {width}
    />
{:else if image && height && alt}
    <img
        class={addClass}
        style={`max-height: ${height}px; width: auto;`}
        src={urlFor(image).height(height).format('webp').url()}
        srcset={urlFor(image)
            .height(height * 2)
            .format('webp')
            .url()}
        {alt}
        {height}
        width="auto"
    />
{:else if image && width && alt}
    <img
        class={addClass}
        style={`height: auto; max-width: ${width}px;`}
        src={urlFor(image).width(width).format('webp').url()}
        srcset={urlFor(image)
            .width(width * 2)
            .format('webp')
            .url()}
        {alt}
        height="auto"
        {width}
    />
{/if}

<style lang="scss">
    .round {
        border-radius: 50%;
    }
</style>
