<script lang="ts">
    // main styles
    import '../app.scss';

    // helpers
    import { appMessages, loading } from '$lib/stores';

    // components
    import AFooter from '$lib/components/AFooter.svelte';
    import Message from '$lib/components/Message.svelte';
    import AHeader from '$lib/components/AHeader.svelte';
    import ALoading from '$lib/components/ALoading.svelte';
</script>

<div class="layout">
    <AHeader />

    <slot />

    <AFooter />

    <!-- APP MESSAGES -->
    {#if $appMessages?.length}
        {#each $appMessages as messageObj}
            <Message {messageObj} />
        {/each}
    {/if}

    <!-- APP LOADING... -->
    {#if $loading}
        <ALoading />
    {/if}
</div>

<style lang="scss">
    .layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding-top: 40px;
        width: 100%;
        min-height: 100vh;
        position: relative;
    }
</style>
