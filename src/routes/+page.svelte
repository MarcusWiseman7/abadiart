<script lang="ts">
    // types
    import type { IPageData } from '$lib/ts-interfaces';
    interface IData extends IPageData {}

    /** @type {import('./$types').PageData} */
    export let data: IData;

    // components
    import AImage from '$lib/components/AImage.svelte';
    import { localeString } from '$lib/helpers';

    // images
    import arrowBack from '$lib/assets/icons/arrow-back.svg';
    import arrowForward from '$lib/assets/icons/arrow-forward.svg';

    import { locale } from '$lib/stores';
    import { onMount } from 'svelte';

    $: images = data?.content;
    let canHave = false;

    onMount(() => {
        canHave = true;
    });
</script>

<svelte:head>
    {#if data?.title}
        <title>{localeString(data.title, $locale)}</title>
        <meta property="og:title" content={localeString(data.title, $locale)} />
    {/if}

    <meta property="og:url" content="https://abadiart.org" />

    {#if data?.description && typeof data.description === 'string'}
        <meta name="description" content={data.description} />
        <meta property="og:description" content={data.description} />
    {/if}
</svelte:head>

<main>
    <!-- image slideshow -->
    {#if images?.length && canHave}
        <div class="images">
            {#each images as image}
                <AImage image={image.asset} alt={image.alt || 'art'} addClass="fullscreen" />
            {/each}

            <div class="images__arrows">
                <div class="images__arrows__arrow">
                    <img src={arrowBack} alt="Back" />
                </div>
                <div class="images__arrows__arrow">
                    <img src={arrowForward} alt="Forward" />
                </div>
            </div>
        </div>
    {/if}
</main>

<style lang="scss">
    main {
        height: 2000px;

        .images {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            &__arrows {
                position: absolute;
                bottom: 40px;
                right: 40px;
                display: flex;
                gap: 10px;

                &__arrow {
                    cursor: pointer;

                    img {
                        height: 30px;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
