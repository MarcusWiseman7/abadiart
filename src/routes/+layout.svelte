<script lang="ts">
    import '../app.scss';

    import AFooter from '$lib/components/AFooter.svelte';
    import Message from '$lib/components/Message.svelte';
    import { appMessages } from '$lib/stores';
    import AHeader from '$lib/components/AHeader.svelte';
</script>

<div class="layout">
    <AHeader />

    <slot />

    <AFooter />

    {#if $appMessages?.length}
        {#each $appMessages as messageObj}
            <Message {messageObj} />
        {/each}
    {/if}
</div>

<style lang="scss">
    .layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding-top: 20px;
        width: 100%;
        min-height: 100vh;
    }
</style>
