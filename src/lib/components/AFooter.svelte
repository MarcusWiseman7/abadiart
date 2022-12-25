<script lang="ts">
    // helpers
    import { goto } from '$app/navigation';
    import { logoImage, nav, locale } from '$lib/stores';
    import { localeString } from '$lib/helpers';

    // components
    import AImage from '$lib/components/AImage.svelte';
    import Languages from './Languages.svelte';
    import fbLogo from '$lib/assets/images/facebook.png';

    // data
    const fbLink = import.meta.env.VITE_FB_LINK;
</script>

<footer>
    <div class="content">
        <a href="/" class="logo">
            {#if $logoImage?.image}
                <AImage image={$logoImage.image} height={120} width={120} addClass="round" />
            {/if}
        </a>

        <nav>
            <ul>
                {#if $nav?.length}
                    {#each $nav as link}
                        <li on:click={() => goto(link.href)}>
                            {localeString(link.name, $locale)}
                        </li>
                    {/each}
                {/if}
            </ul>
        </nav>

        <div class="actions">
            <a class="socials" href={fbLink} target="_blank">
                <p>Follow us</p>
                <img src={fbLogo} alt="Facebook" height="36" width="36" />
            </a>

            <Languages />
        </div>
    </div>

    <div class="tagline">Marcus Wiseman &copy; {new Date().getFullYear()}</div>
</footer>

<style lang="scss">
    footer {
        width: 100%;
        background-color: rgb(245, 245, 244);
        padding: 16px;
        z-index: 1;

        @media (min-width: 1024px) {
            padding: 24px;
        }

        .content {
            display: grid;
            gap: 24px;
            grid-template-columns: repeat(2, minmax(0, 1fr));

            @media (min-width: 1024px) {
                grid-template-columns: repeat(7, minmax(0, 1fr));
            }
        }

        .logo {
            height: 128px;
            width: 128px;
            margin-left: auto;
            border-radius: 50%;
        }

        nav {
            @media (min-width: 1024px) {
                grid-column: span 4 / span 4;
            }

            ul {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                li {
                    cursor: pointer;
                    padding: 4px;
                }
            }
        }

        .actions {
            display: flex;
            justify-content: space-around;
            align-items: center;
            grid-column: span 2 / span 2;

            @media (min-width: 600px) {
                flex-direction: column;
                grid-column: span 1 / span 1;
            }
        }

        .socials {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .tagline {
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            margin-top: 16px;

            @media (min-width: 1024px) {
                margin-top: 0;
            }
        }
    }
</style>
