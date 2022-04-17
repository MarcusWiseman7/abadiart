<script lang="ts">
    import '../app.css';
    import AFooter from '$lib/components/AFooter.svelte';
    import Message from '$lib/components/Message.svelte';
    import { appMessages, aboutContent, contactContent, workContent, pressContent, locale } from '$lib/stores';
    import { page } from '$app/stores';
    import { localeString } from '$lib/helpers';

    $: pathname = $page.url.pathname;
    $: pageInfo = {
        '/about': $aboutContent,
        '/contact': $contactContent,
        '/press': $pressContent,
        '/work': $workContent,
    };

    // SEO HEAD ITEMS
    $: title = pageInfo[pathname]?.title ? `AbadiArt | ${localeString(pageInfo[pathname].title, $locale)}` : 'AbadiArt';
    $: description = pageInfo[pathname]?.description || '';
    $: keywords = pageInfo[pathname]?.keywords || [];
</script>

<svelte:head>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta property="og:url" content={'https://abadiart' + pathname} />
    {#if description}
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
    {/if}
    {#if keywords?.length}
        <meta name="keywords" content={keywords} />
    {/if}
</svelte:head>

<div
    class="flex flex-col items-center justify-between pt-20 w-full min-h-screen text-stone-900 select-none overflow-x-hidden"
>
    <div class="min-h-max w-full px-3.5 lg:w-2/3 lg:max-w-4xl lg:px-0">
        <slot />
    </div>

    <AFooter />

    {#if $appMessages?.length}
        {#each $appMessages as messageObj}
            <Message {messageObj} />
        {/each}
    {/if}
</div>
