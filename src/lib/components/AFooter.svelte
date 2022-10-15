<script lang="ts">
    // types
    import type { IMessage } from '$lib/ts-interfaces';

    import { goto } from '$app/navigation';
    import { logoImage, appMessages, nav, locale } from '$lib/stores';

    // components
    import SendIcon from '$lib/assets/icons/send.svg';
    import AImage from './AImage.svelte';
    import { localeString } from '$lib/helpers';

    // state
    $: email = '';
    $: emailInvalid = false;

    // methods
    const checkEmail = (): void => {
        emailInvalid = !/^\S+@\S+\.\S+$/.test(email);
    };
    const keyup = (event: KeyboardEvent): void => {
        if (emailInvalid) checkEmail();
        if (event.key === 'Enter') join();
    };
    const join = (): void => {
        checkEmail();
        if (emailInvalid) return;

        const m: IMessage = {
            message: `Welcome, ${email} has been added to our newsletter list!`,
            timeout: 6000,
            type: 'success',
            id: Date.now(),
        };
        appMessages.update((a: IMessage[]) => [...a, m]);
    };
</script>

<footer>
    <div class="content">
        <a href="/" class="logo">
            {#if $logoImage?.image}
                <AImage image={$logoImage.image} height={120} width={120} alt="logo" addClass="round" />
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

        <div class="languages">
            <span class={'language' + ($locale === 'es' ? ' language--active' : '')} on:click={() => locale.set('es')}
                >ES</span
            >
            <span class={'language' + ($locale === 'en' ? ' language--active' : '')} on:click={() => locale.set('en')}
                >EN</span
            >
        </div>

        <div class="newsletter">
            <h4>NEWSLETTER SIGNUP</h4>
            <div class="newsletter__content">
                <input type="email" placeholder="Email address..." bind:value={email} on:keyup={keyup} />
                <button on:click={join}>
                    <img src={SendIcon} alt="send" height="18" width="18" />
                </button>
                {#if emailInvalid}
                    <p class="newsletter__error">Please provide a valid email</p>
                {/if}
            </div>
        </div>
    </div>

    <div class="tagline">Marcus Wiseman &copy; {new Date().getFullYear()}</div>
</footer>

<style lang="scss">
    footer {
        width: 100%;
        background-color: rgb(245, 245, 244);
        padding: 16px;
        margin-top: 30px;
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

        .newsletter {
            display: flex;
            flex-direction: column;
            grid-column: span 2 / span 2;

            @media (min-width: 1536px) {
                grid-column: span 1 / span 1;
            }

            &__content {
                display: block;
                position: relative;
                margin-top: 4px;

                input {
                    border-radius: 6px;
                    width: 100%;
                    padding-top: 0.5rem;
                    padding-right: 0.75rem;
                    padding-bottom: 0.5rem;
                    padding-left: 0.75rem;

                    &::placeholder {
                        color: rgb(148 163 184);
                        font-style: italic;
                    }
                }

                button {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    background-color: rgb(194 65 12);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-top-right-radius: 6px;
                    border-bottom-right-radius: 6px;

                    img {
                        margin: 0 16px;
                    }
                }
            }

            &__error {
                font-size: 12px;
                line-height: 16px;
                color: rgb(220 38 38);
                position: absolute;
                left: 0;
                top: 100%;

                @media (min-width: 1024px) {
                    margin-top: 4px;
                }
            }
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

        .languages {
            display: flex;
            gap: 8px;
            // position: fixed;
            // top: 40px;
            // right: 40px;

            @media (min-width: 600px) {
                display: none;
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
