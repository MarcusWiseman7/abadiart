<script lang="ts">
    import AHead from '$lib/components/AHead.svelte';
    import type { IPageData } from '$lib/types/pageData';

    interface IData extends IPageData {}

    export let data: IData;
    const { title, description } = data;
</script>

<AHead {title} {description} canonical="https://abadiart.org/work" />

<div class="page" />
