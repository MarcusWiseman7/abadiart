<script lang="ts">
    // types
    import type { IPageData } from '$lib/ts-interfaces';
    interface IData extends IPageData {}

    /** @type {import('./$types').PageData} */
    export let data: IData;

    import { localeString } from '$lib/helpers';
    import { locale } from '$lib/stores';
</script>

{#if data?.title}
    {localeString(data.title, $locale)}
{/if}
