<script lang="ts">
    // types
    import type { IContent, IMainImage, IPageData } from '$lib/ts-interfaces';
    interface IData extends IPageData {
        images: {
            images: IMainImage[];
        };
        missionStatement: IContent;
    }

    /** @type {import('./$types').PageData} */
    export let data: IData;

    // helpers
    import { localeString } from '$lib/helpers';
    import { locale } from '$lib/stores';

    // components
    import SlideShow from '$lib/components/SlideShow.svelte';

    // data
    $: images = data?.images?.images;
    $: missionStatement = data?.missionStatement && data.missionStatement[$locale as keyof IContent];
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

<section>
    <!-- image slideshow -->
    <SlideShow {images} />
</section>

<main>
    <div class="page">
        {#if missionStatement}
            <div class="mission-statement">
                {#each missionStatement as block}
                    <!-- heading or paragraph -->
                    {#if block.style && block.children}
                        {#each block.children as item}
                            <svelte:element
                                this={item.marks.includes('strong')
                                    ? 'strong'
                                    : block.style === 'normal'
                                    ? 'span'
                                    : block.style}
                                class={block.style}
                            >
                                {item.text}
                            </svelte:element>
                        {/each}
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
</main>

<style lang="scss">
    section {
        min-height: 100vh;
    }

    main {
        position: relative;
        background-color: #fff;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .mission-statement {
        letter-spacing: 1px;
        .h2 {
            font-size: 28px;
            margin: 30px 0;
            font-weight: 600;
        }

        .h3 {
            font-size: 22px;
            margin: 20px 0 -10px 0;
            font-weight: 600;
        }

        .h4 {
            font-size: 22px;
            margin: 20px 0 8px 0;
            font-weight: 300;
        }
    }
</style>
