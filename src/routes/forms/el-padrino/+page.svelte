<script lang="ts">
    // types
    import type {
        ILocaleString,
        IMainImage,
        IPadrinoErrors,
        IPadrinoPayload,
        IPadrinoQuestion,
        IPageData,
    } from '$lib/ts-interfaces';
    interface IData extends IPageData {
        form: {
            headline: {
                title: ILocaleString;
                subtitle: ILocaleString;
                finePrint: ILocaleString;
            };
            heroImage: IMainImage;
            formSteps: {
                title: string;
                formStepBlocks: IPadrinoQuestion[];
                _key: string;
                _type: string;
            }[];
            paymentDetails: ILocaleString[];
        };
    }

    /** @type {import('./$types').PageData} */
    export let data: IData;

    // helpers
    import { goto } from '$app/navigation';
    import { localeString } from '$lib/helpers';
    import { locale } from '$lib/stores';

    // components
    import AInput from '$lib/components/AInput.svelte';
    import { onMount } from 'svelte';
    import AImage from '$lib/components/AImage.svelte';

    // data
    let step = 0;
    let imageWidth = 0;

    $: formStep = data?.form?.formSteps && data.form.formSteps[step];
    $: stepQuestions = formStep?.formStepBlocks;
    $: formOK = [
        payload.email && payload.surname && payload.name && payload.residence,
        payload.treeId && payload.adoptionDate,
        payload.donate !== null,
        true,
    ][step];
    const payload: IPadrinoPayload = {
        email: null,
        surname: null,
        name: null,
        residence: null,
        phone: null,
        treeName: null,
        treeId: null,
        adoptionDate: null,
        donate: null,
    };

    let errors: IPadrinoErrors = {
        email: false,
        surname: false,
        name: false,
        residence: false,
        phone: false,
        treeName: false,
        treeId: false,
        adoptionDate: false,
    };

    // methods
    const checkInput = (question: IPadrinoQuestion): void => {
        const { required, id } = question;

        if (required) {
            const value = payload[id as keyof IPadrinoPayload];
            console.log('id, value, !!!value :>> ', id, value, !!!value);
            errors[id as keyof IPadrinoErrors] = !!!value;
        }
    };

    const onInput = (question: IPadrinoQuestion): void => {
        const { required, id } = question;

        if (required && errors[id as keyof IPadrinoErrors]) {
            checkInput(question);
        }
    };

    const checkAllStepInputs = (): void => {
        stepQuestions.forEach((q) => {
            if (!q.what) {
                checkInput(q);
            }
        });
    };

    const goPrev = (): void => {
        if (step > 0) {
            step--;
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        }
    };

    const goNext = (): void => {
        if (!formOK) {
            checkAllStepInputs();
        } else if (step < 3) {
            step++;
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        }
    };

    const onSubmit = async (): Promise<void> => {
        if (!formOK) return;

        const formData = new FormData();
        for (const property in payload) {
            formData.append(property, payload[property]);
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

        if (result.type === 'success') {
            goto('/projects');
        }
    };

    const getImageWidth = (): void => {
        const innerWidth = window.innerWidth;

        if (innerWidth < 600) {
            imageWidth = 400;
        } else if (innerWidth < 1024) {
            imageWidth = 840;
        } else if (innerWidth < 1280) {
            imageWidth = 780;
        } else {
            imageWidth = 840;
        }
    };

    onMount(() => {
        getImageWidth();
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

<svelte:window on:resize={() => getImageWidth()} />

<div class="page">
    <!-- form image -- mandarins -->
    {#if data?.form?.heroImage}
        <section>
            <img src="" alt="mandarins" />
        </section>
    {/if}

    <!-- headline -->
    {#if data?.form?.headline}
        <section class="headline">
            <h1 class="headline__title">{localeString(data.form.headline.title, $locale)}</h1>
            <h2 class="headline__subtitle">{localeString(data.form.headline.subtitle, $locale)}</h2>
            <small class="headline__fine-print">{localeString(data.form.headline.finePrint, $locale)}</small>
        </section>
    {/if}

    <form class="form" on:submit|preventDefault>
        {#each stepQuestions as q}
            {#if q.what === 'info'}
                <!-- step info -->
                <section class="outlined">
                    {#if q.title}
                        <h3 class={`form__info__title ${q.highlightedTitle ? 'form__info__title--highlighted' : ''}`}>
                            {localeString(q.title, $locale)}
                        </h3>
                    {/if}
                    {#if q.text}
                        <div class="form__info__text">
                            {#each q.text as t}
                                <p>{@html localeString(t, $locale)}</p>
                            {/each}
                        </div>
                    {/if}

                    {#if q.images?.length && imageWidth}
                        <div class="form__info__images">
                            {#each q.images as image}
                                <div
                                    class={`form__info__image ${
                                        image._key === '4830b9654cb4' ? 'form__info__image--logo' : ''
                                    }`}
                                >
                                    <AImage
                                        addClass="fullscreen"
                                        width={imageWidth}
                                        {image}
                                        alt={image.alt || 'question image'}
                                    />
                                </div>
                            {/each}
                        </div>
                    {/if}
                </section>
            {:else}
                <AInput
                    required={q.required}
                    label={q.label ? localeString(q.label, $locale) : ''}
                    error={errors[q.id] ? 'Please fill this out!' : null}
                >
                    {#if q.type === 'radio' && q.radioOptions?.length}
                        <div class="form__question__radios">
                            {#each q.radioOptions as option}
                                <div class="form__question__radio">
                                    <input
                                        type="radio"
                                        name={q.id}
                                        bind:group={payload[q.id]}
                                        value={localeString(option, $locale)}
                                        id={localeString(option, $locale)}
                                    />
                                    <label for={localeString(option, $locale)}>{localeString(option, $locale)}</label>
                                </div>
                            {/each}
                        </div>
                    {:else if q.type === 'date'}
                        <input
                            id={q.id}
                            class="form-input"
                            type="date"
                            placeholder={q.placeholder
                                ? q.placeholder
                                    ? localeString(q.placeholder, $locale)
                                    : ''
                                : ''}
                            bind:value={payload[q.id]}
                            on:focus={() => {}}
                            on:input={() => onInput(q)}
                            on:blur={() => checkInput(q)}
                        />
                    {:else if q.type === 'number'}
                        <input
                            id={q.id}
                            class="form-input"
                            type="number"
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
                    {:else}
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
                    {/if}

                    {#if q.images?.length && imageWidth}
                        <div class="form__question__images">
                            {#each q.images as image}
                                <div class="form__question__image">
                                    <AImage
                                        addClass="fullscreen"
                                        width={imageWidth}
                                        {image}
                                        alt={image.alt || 'question image'}
                                    />
                                </div>
                            {/each}
                        </div>
                    {/if}
                </AInput>
            {/if}
        {/each}

        <section class="form__nav">
            <div>
                {#if step > 0}
                    <button class="form-btn" on:click={() => goPrev()}>PREV</button>
                {/if}
                {#if step < 3}
                    <button class={`form-btn ${!formOK ? 'form-btn--disabled' : ''}`} on:click={() => goNext()}
                        >NEXT</button
                    >
                {:else}
                    <button class="form-btn form-btn--submit" on:click={() => onSubmit()}>Submit</button>
                {/if}
            </div>

            <!-- {#if step === 3}
                <p>A copy of your responses will be emailed to the address you provided.</p>
            {/if} -->
        </section>

        <!-- payment details -->
        {#if data?.form?.paymentDetails}
            <section class="form__payment-details">
                {#each data.form.paymentDetails as detail}
                    <p>{localeString(detail, $locale)}</p>
                {/each}
            </section>
        {/if}
    </form>
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
            font-size: 22px;
            font-weight: 400;

            @media (min-width: 600px) {
                font-size: 28px;
            }
        }

        &__fine-print {
            color: gray;
            font-size: 70%;

            @media (min-width: 600px) {
                font-size: 80%;
            }
        }
    }

    .outlined {
        border: 1px solid #dadce0;
        border-radius: 20px;
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        letter-spacing: 1px;

        &__info {
            &__title {
                font-size: 20px;
                font-weight: 400;
                padding: 10px 16px;
                margin-bottom: 10px;
                border-top-left-radius: 20px;
                border-top-right-radius: 20px;

                @media (min-width: 600px) {
                    font-size: 28px;
                    padding: 20px 30px;
                    margin-bottom: 20px;
                }

                &--highlighted {
                    background-color: $color-gold;
                }
            }

            &__text {
                display: flex;
                flex-direction: column;
                gap: 10px;
                padding: 8px 16px;

                @media (min-width: 600px) {
                    padding: 20px 30px 30px;
                    gap: 20px;
                }
            }

            &__images {
                display: flex;
                gap: 10px;
                justify-content: center;
                padding: 8px 16px;

                @media (min-width: 600px) {
                    padding: 20px 30px 30px;
                }
            }

            &__image {
                max-width: 100%;
                width: 100%;

                &--logo {
                    max-width: 120px;
                    max-height: 120px;

                    @media (min-width: 600px) {
                        max-width: 200px;
                        max-height: 200px;
                    }
                }
            }
        }

        &__question {
            &__radios {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            &__radio {
                display: flex;
                align-items: center;
                gap: 6px;

                label,
                input {
                    cursor: pointer;
                }
            }

            &__images {
                margin-top: 30px;
            }

            &__image {
                max-width: 100%;
                width: 100%;
            }
        }

        &__nav {
            display: flex;
            flex-direction: column;
            gap: 10px;
            justify-content: end;
        }

        &__payment-details {
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
