<script lang="ts">
    // types
    import type { IPageData, IContent } from '$lib/ts-interfaces';
    interface IData extends IPageData {
        content: IContent;
    }

    /** @type {import('./$types').PageData} */
    export let data: IData;

    // components
    import BrushStroke from '$lib/components/BrushStroke.svelte';
    import AImage from '$lib/components/AImage.svelte';

    // helpers
    import { localeString } from '$lib/helpers';
    import { locale } from '$lib/stores';

    // data
    $: contentBlocks = ['en', 'es'].includes($locale) && data?.content[$locale as keyof IContent];
</script>

<svelte:head>
    {#if data?.title}
        <title>{localeString(data.title, $locale)}</title>
        <meta property="og:title" content={localeString(data.title, $locale)} />
    {/if}

    <meta property="og:url" content="https://abadiart.org/about" />

    {#if data?.description}
        <meta name="description" content={data.description} />
        <meta property="og:description" content={data.description} />
    {/if}
</svelte:head>

{#if data?.title}
    <BrushStroke>
        {localeString(data.title, $locale)}
    </BrushStroke>
{/if}

<!-- content -->
{#if contentBlocks}
    <div class="about-content">
        {#each contentBlocks as block, index}
            <!-- heading or paragraph -->
            {#if block._type === 'text' && block.children}
                {#each block.children as item}
                    <svelte:element
                        this={item.marks.includes('strong')
                            ? 'strong'
                            : block.style === 'normal'
                            ? 'span'
                            : block.style}
                        class={(block.style === 'normal' ? 'about-paragraph ' : 'about-heading ') + block.style}
                    >
                        {item.text}
                    </svelte:element>
                {/each}
            {/if}

            <!-- image -->
            {#if block._type === 'mainImage' && block.asset}
                <div
                    class={`about-image-wrapper float-right ${
                        contentBlocks[index - 1]?.style === 'normal' ? 'float-left' : ''
                    }`}
                >
                    <AImage image={block.asset} alt={block.alt || 'image'} height={400} addClass="photo about-image" />
                    {#if block.caption}
                        <span class="caption">{block.caption}</span>
                    {/if}
                </div>
            {/if}
        {/each}
    </div>
{/if}

<style lang="scss">
    .about-paragraph {
        position: relative;
        font-size: 18px;
        letter-spacing: 1.05px;
        text-align: justify;
    }

    .about-heading {
        position: relative;
        padding: 40px 0 8px 0;
        clear: both;

        &.h1 {
            font-size: 36px;
            line-height: 40px;
            font-weight: 600;
        }

        &.h2 {
            font-size: 30px;
            line-height: 36px;
            font-weight: 600;
        }

        &.h3 {
            font-size: 20px;
            line-height: 28px;
            font-weight: 600;
        }

        &.h4 {
            font-size: 22px;
            line-height: 30px;
            font-weight: 600;
        }
    }

    .about-image-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: fit-content;

        @media (min-width: 600px) {
            max-width: 450px;

            &.float-right {
                float: right;
                margin-left: 20px;
            }

            &.float-left {
                float: left;
                margin-right: 20px;
            }
        }

        .caption {
            font-size: 14px;
            color: gray;
            font-style: italic;
            font-weight: 600;
            white-space: pre-wrap;
        }
    }
</style>
