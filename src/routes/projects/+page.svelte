<script lang="ts">
    // types
    import type { IContent, ILocaleString, IPageData, IProject } from '$lib/ts-interfaces';
    interface IData extends IPageData {
        projects: IProject[];
        misc: {
            name: string;
            localeString: ILocaleString;
        }[];
    }

    /** @type {import('./$types').PageData} */
    export let data: IData;

    // helpers
    import { localeString } from '$lib/helpers';
    import { locale } from '$lib/stores';
    import { goto } from '$app/navigation';

    // components
    import ContentBlocks from '$lib/components/ContentBlocks.svelte';

    // data
    $: buttonText = data?.misc?.find((t) => t.name === 'buttonText');
    $: summaries =
        data?.projects
            ?.map(
                (p) =>
                    p.summary && {
                        summary: p.summary[$locale as keyof IContent],
                        id: p._key,
                        title: p.title[$locale as keyof IContent],
                    }
            )
            ?.filter((s) => s?.id && s.title && s?.summary && typeof s.summary === 'object') || [];
</script>

<svelte:head>
    {#if data?.title}
        <title>{localeString(data.title, $locale)}</title>
        <meta property="og:title" content={localeString(data.title, $locale)} />
    {/if}

    <meta property="og:url" content="https://abadiart.org/projects" />

    {#if data?.description}
        <meta name="description" content={data.description} />
        <meta property="og:description" content={data.description} />
    {/if}
</svelte:head>

<div class="page">
    <div class="summaries">
        {#each summaries as s}
            {#if s?.id && s.title && s.summary && typeof s.summary === 'object'}
                <div class="summary" on:click={() => goto(`/projects/${s?.id}`)}>
                    <h2 class="summary__title">{s.title}</h2>
                    <ContentBlocks modifiers={['project-summary']} contentBlocks={s.summary} />
                    <div class="summary__btn">
                        <button class="form-btn form-btn--project-summary">
                            {buttonText && typeof buttonText === 'object'
                                ? localeString(buttonText.localeString, $locale)
                                : 'Go to project'}
                        </button>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
</div>

<style lang="scss">
    .summaries {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (min-width: 1024px) {
            gap: 40px;
        }
    }

    .summary {
        padding: 20px;
        border-radius: 8px;
        box-shadow: var(--shadow);
        cursor: pointer;

        &:hover {
            box-shadow: var(--shadow-bold);
        }

        &__title {
            font-size: 32px;
            margin-bottom: 30px;
        }

        &__btn {
            margin-top: 16px;
        }
    }
</style>
