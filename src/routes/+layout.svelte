<script lang="ts">
    import '../app.scss';
    import { appMessages, loading } from '$lib/stores';
    import AFooter from '$lib/components/AFooter.svelte';
    import Message from '$lib/components/Message.svelte';
    import AHeader from '$lib/components/AHeader.svelte';
    import ALoading from '$lib/components/ALoading.svelte';
    import { locale, logoImage, nav, device } from '$lib/stores';
    import type { LayoutData } from './$types';
    import type { IMainImage, INav } from '$lib/ts-interfaces';

    interface LData extends LayoutData {
        logo: IMainImage;
        userDevice: string;
        navList: INav[];
        i18n: string;
    }

    export let data: LData;

    const { logo, userDevice, navList, i18n } = data;
    nav.set(navList);
    logoImage.set(logo);
    locale.set(i18n);
    device.set(userDevice);
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
        min-height: 100dvh;
        position: relative;
    }
</style>
