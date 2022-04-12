<script>
    import '../app.css';
    import AFooter from '$lib/components/AFooter.svelte';
    import Message from '$lib/components/Message.svelte';
    import { appMessages, titleList } from '$lib/stores';
    import { page } from '$app/stores';

    $: title = $titleList.hasOwnProperty($page.url.pathname)
        ? `AbadiArt | ${$titleList[$page.url.pathname]}`
        : 'AbadiArt';
</script>

<svelte:head>
    <title>{title}</title>
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
