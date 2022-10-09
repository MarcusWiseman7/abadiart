<script lang="ts">
    // types
    import type { IPageData } from '$lib/ts-interfaces';
    interface IData extends IPageData {}

    /** @type {import('./$types').PageData} */
    export let data: IData;

    // components
    import { logoImage } from '$lib/stores';
    import AImage from '$lib/components/AImage.svelte';
    import { localeString } from '$lib/helpers';

    import { locale } from '$lib/stores';
</script>

<svelte:head>
    {#if data?.title}
        <title>{localeString(data.title, $locale)}</title>
        <meta property="og:title" content={localeString(data.title, $locale)} />
    {/if}

    <meta property="og:url" content="https://abadiart.org/about" />

    {#if data?.description && typeof data.description === 'string'}
        <meta name="description" content={data.description} />
        <meta property="og:description" content={data.description} />
    {/if}
</svelte:head>

<main>
    <h1>Abadi Art</h1>
    {#if $logoImage?.image}
        <AImage image={$logoImage.image} height={300} width={300} alt="logo" addClass="round" />
    {/if}
</main>

<style lang="scss">
    main {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        h1 {
            font-size: 30px;
            line-height: 36px;
            font-weight: 600;
            margin-bottom: 64px;

            @media (min-width: 1024px) {
                font-size: 36px;
                line-height: 40px;
            }
        }
    }
</style>
