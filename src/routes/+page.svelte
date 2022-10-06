<script lang="ts">
    import { logoImage } from '$lib/stores';
    import AImage from '$lib/components/AImage.svelte';
</script>

<main>
    <h1>Abadi Art</h1>
    {#if $logoImage?.image}
        <AImage image={$logoImage.image} height={300} width={300} alt="logo" addClass="round" />
    {/if}
</main>

<style lang="scss">
    main {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        h1 {
            font-size: 30px;
            line-height: 36px;
            font-weight: 600;
            margin-bottom: 64px;

            @media (min-width: 1024px) {
                font-size: 36px;
                line-height: 40px;
            }
        }
    }
</style>
