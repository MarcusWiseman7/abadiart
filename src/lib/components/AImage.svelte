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
        src={urlFor(image).height(height).width(width).format('webp').url()}
        srcset={urlFor(image)
            .height(height * 2)
            .width(width * 2)
            .format('webp')
            .url()}
        {alt}
    />
{:else if image && height && alt}
    <img
        class={addClass}
        src={urlFor(image).height(height).format('webp').url()}
        srcset={urlFor(image)
            .height(height * 2)
            .format('webp')
            .url()}
        {alt}
    />
{:else if image && width && alt}
    <img
        class={addClass}
        src={urlFor(image).width(width).format('webp').url()}
        srcset={urlFor(image)
            .width(width * 2)
            .format('webp')
            .url()}
        {alt}
    />
{:else if image}
    <img class="addClass" src={urlFor(image).format('webp').url()} {alt} />
{/if}

<style lang="scss">
    .round {
        border-radius: 50%;
    }

    .about-image {
        max-width: calc(100vw - 28px);

        @media (min-width: 600px) {
            max-width: 450px;
            max-height: 400px;
        }
    }

    .fullscreen {
        max-height: 100%;
        max-width: 100%;
        object-fit: cover;
    }
</style>
