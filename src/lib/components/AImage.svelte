<script lang="ts">
    // types
    import type { SanityImageAssetDocument } from '@sanity/client';

    // helpers
    import getImageProps from '$lib/image-url';

    // props
    export let image: SanityImageAssetDocument;
    export let height: number = 0;
    export let width: number = 0;
    export let addClass: string = '';
    export let loading: 'lazy' | 'eager' = 'lazy';

    // data
    let loaded = false;
</script>

<img
    {loading}
    fetchPriority={loading === 'eager' ? 'high' : undefined}
    class={addClass}
    alt={image.alt || ' '}
    {...getImageProps({
        image,
        userMaxWidth: width || '100vw',
        userMaxHeight: height,
    })}
    data-loaded={loaded}
    on:load={() => (loaded = true)}
/>

<style lang="scss">
    img {
        max-width: 100%;
        height: auto;
        transition: opacity 0.15s;
    }

    img[data-loaded='false'] {
        opacity: 0;
    }

    .round {
        border-radius: 50%;
    }

    .content-image {
        max-width: calc(100vw - 28px);

        @media (min-width: 600px) {
            max-width: 450px;
            max-height: 400px;
        }
    }

    .fullscreen {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .project {
        width: 100%;
        min-width: 100%;
        height: auto;
        object-fit: cover;
        max-height: 280px;
        max-width: unset;

        @media (min-width: 600px) {
            max-height: 600px;
        }
    }

    .form-hero {
        height: 100px;
        width: 100%;
        object-fit: cover;
        border-radius: 8px;

        @media (min-width: 600px) {
            height: 200px;
        }
    }
</style>
