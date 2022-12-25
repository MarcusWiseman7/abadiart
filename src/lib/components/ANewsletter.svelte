<script lang="ts">
    // types
    import type { IMessage } from '$lib/ts-interfaces';

    // helpers
    import { appMessages } from '$lib/stores';

    // components
    import SendIcon from '$lib/assets/icons/send.svg';

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

<style lang="scss">
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
</style>
