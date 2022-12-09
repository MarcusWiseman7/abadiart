<script lang="ts">
    // types
    import type {
        IContactErrors,
        IContactPayload,
        ILocaleString,
        IMainImage,
        IPadrinoQuestion,
        IPageData,
        IMessage,
    } from '$lib/ts-interfaces';
    interface IData extends IPageData {
        form: {
            heroImage: IMainImage;
            headline: {
                title: ILocaleString;
                subtitle: ILocaleString;
            };
            questions: IPadrinoQuestion[];
            formButtons: {
                submit: ILocaleString;
            };
            validations: {
                required: ILocaleString;
                validEmail: ILocaleString;
            };
            details: ILocaleString[];
        };
    }

    /** @type {import('./$types').PageData} */
    export let data: IData;

    // helpers
    import { localeString } from '$lib/helpers';
    import { appMessages, loading, locale } from '$lib/stores';
    import { goto } from '$app/navigation';
    import AImage from '$lib/components/AImage.svelte';
    import AInput from '$lib/components/AInput.svelte';
    import { onMount } from 'svelte';

    // components

    // data
    $: formOK =
        payload.email &&
        !errors.email &&
        payload.message &&
        !errors.message &&
        payload.name &&
        !errors.name &&
        payload.subject &&
        !errors.subject;
    $: validationRequired = data?.form?.validations?.required
        ? localeString(data.form.validations.required, $locale)
        : 'Please fill this out';
    $: validationEmail = data?.form?.validations?.validEmail
        ? localeString(data.form.validations.validEmail, $locale)
        : 'Please enter a valid email';

    const payload: IContactPayload = {
        email: '',
        name: '',
        subject: '',
        message: '',
        lang: 'en',
    };

    const errors: IContactErrors = {
        email: '',
        name: '',
        subject: '',
        message: '',
    };

    // methods
    const checkInput = (question: IPadrinoQuestion): void => {
        const { required, id } = question;
        const value = payload[id as keyof IContactPayload];

        switch (id) {
            case 'email':
                if (!!value && typeof value === 'string') {
                    errors.email = !/^\S+@\S+\.\S+$/.test(value) ? validationEmail : '';
                } else if (!!!value) {
                    errors.email = validationRequired;
                }
                break;
            default:
                if (required && !!!value) {
                    errors[id as keyof IContactErrors] = validationRequired;
                }
        }
    };

    const onInput = (question: IPadrinoQuestion): void => {
        const { required, id } = question;

        if (required && errors[id as keyof IContactErrors]) {
            checkInput(question);
        }
    };

    const checkAllInputs = (): void => {
        if (!data?.form?.questions) return;

        data.form.questions.forEach((q) => {
            if (!q.what) {
                checkInput(q);
            }
        });
    };

    const onSubmit = async (): Promise<void> => {
        checkAllInputs();
        if (!formOK) return;

        loading.set(true);
        payload.lang = $locale;

        // success/error app messages
        const successMsg: IMessage = {
            message: `Form submitted successfully! Please check your email for a reply from us!`,
            timeout: 6000,
            type: 'success',
            id: Date.now(),
        };
        const errorMsg: IMessage = {
            message: 'Sorry, there was an error submitting the form, please try again...',
            timeout: 6000,
            type: 'error',
            id: Date.now(),
        };

        // set up form payload
        const formData = new FormData();
        for (const property in payload) {
            formData.append(property, payload[property as keyof IContactPayload]);
        }

        const response = await fetch('?/submission', {
            method: 'POST',
            body: formData,
            headers: {
                'x-sveltekit-action': 'true',
            },
        });

        /** @type {import('@sveltejs/kit').ActionResult} */
        const result = await response.json();

        loading.set(false);

        if (result.type === 'success') {
            goto('/');
            appMessages.update((a: IMessage[]) => [...a, successMsg]);
        } else {
            appMessages.update((a: IMessage[]) => [...a, errorMsg]);
        }
    };

    onMount(() => {
        console.log('data :>> ', data);
    });
</script>

<svelte:head>
    {#if data?.title}
        <title>{localeString(data.title, $locale)}</title>
        <meta property="og:title" content={localeString(data.title, $locale)} />
    {/if}

    <meta property="og:url" content="https://abadiart.org/contact" />

    {#if data?.description}
        <meta name="description" content={data.description} />
        <meta property="og:description" content={data.description} />
    {/if}
</svelte:head>

<div class="page">
    <section class="headline">
        {#if data?.form?.headline}
            <h1 class="headline__title">{@html localeString(data.form.headline.title, $locale)}</h1>
            <h2 class="headline__subtitle">{@html localeString(data.form.headline.subtitle, $locale)}</h2>
        {/if}
    </section>

    <form class="form" on:submit|preventDefault>
        {#if data?.form?.questions}
            {#each data.form.questions as q}
                {#if q.hasOwnProperty('id') && !!q.id && typeof q.id === 'string'}
                    <AInput
                        required={q.required}
                        label={q.label ? localeString(q.label, $locale) : ''}
                        error={errors[q.id] || null}
                    >
                        {#if q.type === 'text'}
                            <input
                                id={q.id}
                                class="form-input"
                                type="text"
                                placeholder={q.placeholder ? localeString(q.placeholder, $locale) : ''}
                                bind:value={payload[q.id]}
                                on:focus={() => {}}
                                on:input={() => onInput(q)}
                                on:blur={() => checkInput(q)}
                            />
                        {:else if q.type === 'email'}
                            <input
                                id={q.id}
                                class="form-input"
                                type="email"
                                placeholder={q.placeholder ? localeString(q.placeholder, $locale) : ''}
                                bind:value={payload[q.id]}
                                on:focus={() => {}}
                                on:input={() => onInput(q)}
                                on:blur={() => checkInput(q)}
                            />
                        {:else if q.type === 'textarea'}
                            <textarea
                                id={q.id}
                                class="form-input"
                                rows="3"
                                placeholder={q.placeholder ? localeString(q.placeholder, $locale) : ''}
                                bind:value={payload[q.id]}
                                on:focus={() => {}}
                                on:input={() => onInput(q)}
                                on:blur={() => checkInput(q)}
                            />
                        {/if}
                    </AInput>
                {/if}
            {/each}
        {/if}

        <section class="form__nav">
            {#if data?.form?.formButtons}
                <button class="form-btn form-btn--submit" on:click={() => onSubmit()}
                    >{localeString(data.form.formButtons.submit, $locale)}</button
                >
            {/if}
        </section>
    </form>

    <section class="form__details">
        {#if data?.form?.details}
            {#each data.form.details as detail}
                <p>{localeString(detail, $locale)}</p>
            {/each}
        {/if}
    </section>
</div>

<style lang="scss">
    $color-gold: rgb(235, 194, 74);

    .headline {
        text-align: center;
        margin: 20px 0 40px 0;

        @media (min-width: 600px) {
            margin: 20px 0 60px 0;
        }

        &__title {
            font-size: 32px;
            font-weight: 600;

            @media (min-width: 600px) {
                font-size: 36px;
            }
        }

        &__subtitle {
            font-size: 18px;
            font-weight: 400;

            @media (min-width: 600px) {
                font-size: 22px;
            }
        }
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        letter-spacing: 1px;

        &__nav {
            display: flex;
            gap: 10px;
        }

        &__details {
            p {
                &:first-child {
                    margin-bottom: 20px;
                }

                &:last-child {
                    margin-top: 20px;
                }
            }
        }
    }
</style>
