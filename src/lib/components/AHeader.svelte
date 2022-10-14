<script lang="ts">
    import { locale } from '$lib/stores';
    import { page } from '$app/stores';
    $: pathname = $page.url.pathname;
</script>

<header>
    {#if pathname === '/'}
        <h1 class="title">Abadi Art</h1>
    {/if}

    <div class="languages">
        <span class={'language' + ($locale === 'es' ? ' language--active' : '')} on:click={() => locale.set('es')}
            >ES</span
        >
        <span class={'language' + ($locale === 'en' ? ' language--active' : '')} on:click={() => locale.set('en')}
            >EN</span
        >
    </div>
</header>

<style lang="scss">
    header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;

        @media (min-width: 1024px) {
            padding: 0 40px;
        }

        .title {
            font-size: 18px;
            letter-spacing: 11px;
            font-weight: 400;
            color: #fff;
            text-shadow: #000 1px 0 3px;

            @media (min-width: 1024px) {
                font-size: 28px;
            }
        }

        .languages {
            display: none;
            gap: 8px;

            @media (min-width: 600px) {
                display: flex;
            }

            .language {
                cursor: pointer;
                color: lightgrey;

                &--active {
                    color: rgb(28, 25, 23);
                }
            }
        }
    }
</style>
