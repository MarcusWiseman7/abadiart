<script lang="ts">
    // helpers
    import { page } from '$app/stores';
    $: pathname = $page.url.pathname;
</script>

<header>
    <h1 class="title">
        {#if pathname === '/'}
            <span>Abadi Art</span>
        {/if}
    </h1>
</header>

<style lang="scss">
    header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        z-index: 1;

        @media (min-width: 1024px) {
            padding: 0 40px;
        }

        .title {
            font-size: 18px;
            letter-spacing: 11px;
            font-weight: 400;
            color: #fff;
            -webkit-filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
            filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));

            @media (min-width: 1024px) {
                font-size: 28px;
            }
        }
    }
</style>
