<script lang="ts">
    import { localeString } from '$lib/helpers';
    import { locale } from '$lib/stores';
    import ContentBlocks from '$lib/components/ContentBlocks.svelte';
    import type { IContent, ILocaleString, IProject } from '$lib/ts-interfaces';
    import type { IPageData } from '$lib/types/pageData';
    import AHead from '$lib/components/AHead.svelte';

    interface IData extends IPageData {
        projects: IProject[];
        misc: {
            name: string;
            localeString: ILocaleString;
        }[];
    }

    export let data: IData;
    const { title, description, misc, projects } = data;

    $: buttonText = misc?.find((t) => t.name === 'buttonText');
    $: summaries =
        projects
            ?.map(
                (p) =>
                    p.summary &&
                    p.title && {
                        summary: p.summary[$locale as keyof IContent],
                        id: p._key,
                        title: p.title[$locale as keyof IContent],
                    }
            )
            ?.filter((s) => s?.id && s.title && s?.summary && typeof s.summary === 'object') || [];
</script>

<AHead {title} {description} canonical="https://abadiart.org/projects" />

<div class="page">
    <div class="summaries">
        {#each summaries as s}
            {#if s?.id && s.title && s.summary && typeof s.summary === 'object'}
                <a class="summary" href={`/projects/${s?.id}`}>
                    <h2 class="summary__title">{s.title}</h2>
                    <ContentBlocks modifiers={['project-summary']} contentBlocks={s.summary} />
                    <div class="summary__btn">
                        <button class="form-btn form-btn--project-summary">
                            {buttonText && typeof buttonText === 'object'
                                ? localeString(buttonText.localeString, $locale)
                                : 'Go to project'}
                        </button>
                    </div>
                </a>
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
