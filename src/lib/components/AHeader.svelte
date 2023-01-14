<script lang="ts">
    // components
    import menuIcon from '$lib/assets/icons/menu.svg';

    // helpers
    import { nav, locale } from '$lib/stores';
    import { page } from '$app/stores';
    import { localeString } from '$lib/helpers';
    import { goto } from '$app/navigation';
    import { fly } from 'svelte/transition';
    import { linear } from 'svelte/easing';
    import Languages from './Languages.svelte';

    // data
    $: pathname = $page.url.pathname;
    let menuOpen = false;

    // methods
</script>

<header>
    <h1 class="title">
        {#if pathname === '/'}
            <span>Abadi Art</span>
        {/if}
    </h1>

    <div class="hamburger-menu" on:click={() => (menuOpen = true)}>
        <img src={menuIcon} alt="Menu" />
    </div>

    {#if menuOpen}
        <div
            class="menu"
            transition:fly={{ delay: 100, duration: 400, x: 100, opacity: 1, easing: linear }}
            on:click={() => (menuOpen = false)}
        >
            <nav>
                <ul>
                    {#if $nav?.length}
                        <li on:click={() => goto('/')}>Home</li>
                        {#each $nav as link}
                            <li on:click={() => goto(link.href)}>
                                {localeString(link.name, $locale)}
                            </li>
                        {/each}
                    {/if}

                    <li on:click|stopPropagation>
                        <Languages />
                    </li>
                </ul>
            </nav>
        </div>
    {/if}
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

    .menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        display: flex;
        justify-content: flex-end;

        nav {
            ul {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                background-color: #fff;

                li {
                    cursor: pointer;
                    padding: 10px 20px 10px 10px;

                    @media (min-width: 1024px) {
                        font-size: 18px;
                        padding: 10px 40px 10px 10px;

                        &:hover {
                            background-color: rgba(0, 0, 0, 0.1);
                        }
                    }
                }
            }
        }
    }

    .hamburger-menu {
        position: fixed;
        right: 0;
        top: 0;
        padding: 16px;
        z-index: 1;
        cursor: pointer;

        img {
            -webkit-filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
            filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
        }
    }
</style>
