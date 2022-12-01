<script lang="ts">
    // types
    import type { IPadrinoErrors, IPadrinoPayload, IPadrinoQuestion, IPageData } from '$lib/ts-interfaces';
    interface IData extends IPageData {}

    /** @type {import('./$types').PageData} */
    export let data: IData;

    // helpers
    import { goto } from '$app/navigation';
    import { localeString } from '$lib/helpers';
    import { locale } from '$lib/stores';

    // components
    import AInput from '$lib/components/AInput.svelte';
    import mapImage from '$lib/assets/images/map.jpg';

    // data
    let step = 3;
    const formQuestionsStep1: IPadrinoQuestion[] = [
        {
            what: 'info',
            highlightedTitle: true,
            title: 'WHO YOU ARE',
            text: ['To identify you on the adoption certificate, and to send it to you.'],
        },
        {
            what: 'question',
            id: 'email',
            label: 'Email address',
            placeholder: '',
            required: true,
            type: 'email',
        },
        { what: 'question', id: 'surname', label: 'Surname', placeholder: 'Surname', required: true },
        { what: 'question', id: 'name', label: 'Name', placeholder: 'Name', required: true },
        {
            what: 'question',
            id: 'residence',
            label: 'Place of residence ( Province, country )',
            placeholder: 'Murcia, Spain',
            required: true,
        },
        { what: 'question', id: 'phone', label: 'Phone number', placeholder: '', required: false },
    ];

    const formQuestionsStep2: IPadrinoQuestion[] = [
        {
            what: 'info',
            highlightedTitle: true,
            title: 'Giving the Name and Surname',
            text: [
                'After you adopt the tree we will send you an adoption certificate which is valid for one year only, containing beautiful photos of your tree. The certificate will identify you as the Padrin@ of the tree and will include your chosen name for the tree. This fictional kinship aims to connect you with the tree, so you can build up a family relationship between you and your adopted tree.',
                'This action contributes to promote the ecological thinking and to create a new lineage between trees and people. We will also inform you about events at El Refugio, where you could meet your adopted tree in person!  If the project or photos of your tree spark any memories of experiences about trees and nature in your life then please do tell us. We would be delighted to know.',
            ],
        },
        {
            what: 'question',
            id: 'treeName',
            label: `Give a name to your adopted tree and add your surname if you like?`,
            placeholder: 'Lovely name',
            required: true,
        },
        {
            what: 'question',
            id: 'treeId',
            label: 'In this map the mandarin trees are marked with a number - Please choose a number which will become your tree and choose a color to mark it on the map',
            placeholder: 'Tree id number',
            required: true,
            type: 'number',
            images: [{ src: mapImage, alt: 'map' }],
        },
        { what: 'question', id: 'date', label: 'Date of Adoption', placeholder: '', required: true, type: 'date' },
    ];
    const formQuestionsStep3: IPadrinoQuestion[] = [
        {
            what: 'info',
            highlightedTitle: true,
            title: 'Mandarin Donation',
            text: [
                'The collection of mandarins takes place over the months of October and November.  Each person who adopts a tree and has paid the fee will have the option of collecting 30kg of mandarins yourself or making a act of generosity, where we pick the mandarins and donate for you to people in need in the surrounding community',
            ],
        },
        {
            what: 'question',
            id: 'donate',
            label: 'Will you donate the mandarins and we will pick and donate them to people with needs in the community? Or would you like to pick the mandarins yourself?',
            type: 'radio',
            radioOptions: ['I prefer to donate', 'I prefer to pick them myself'],
            required: true,
        },
    ];
    const formQuestionsStep4: IPadrinoQuestion[] = [
        {
            what: 'info',
            highlightedTitle: true,
            title: 'The Linking Line, People, Trees and Lineage',
            text: [
                'The Linking Line, people, trees and genealogy project idea explores the lineage between people and trees and focuses on the connection and relationship which is created by Padrin@ Dame Un Nombre project. These connections will inform the Linking Line art project.',
                `The people who participate in the tree adoption before 30 December 2022 will form one extended People-Trees Family. Their names, together with their tree's given name and surname, will form the base text for the next Linking Line art and calligraphy work`,
            ],
        },
        {
            what: 'info',
            title: 'Family Abad Lorente Lineage',
        },
        {
            what: 'info',
            title: 'People and Trees Family 2022',
            images: [],
        },
        {
            what: 'info',
            text: [
                'We would like to thank you for your participation on this project and if you have any further question or suggestions please <a href="/contact-us">contact us</a>',
            ],
            images: [],
        },
        {
            what: 'info',
            text: ['Linking Line - Originated with Abad Lorente Lineage'],
            images: [],
        },
    ];

    $: stepQuestions = [formQuestionsStep1, formQuestionsStep2, formQuestionsStep3, formQuestionsStep4][step];
    $: formOK = [
        payload.email && payload.surname && payload.name && payload.residence,
        payload.treeId && payload.date,
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
        date: null,
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
        date: false,
    };

    // methods
    const checkInput = (question: IPadrinoQuestion): void => {
        const { required, id } = question;

        if (required) {
            const value = payload[id as keyof IPadrinoPayload];
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
    <!-- form image -- mandarins -->
    <section>
        <img src="" alt="mandarins" />
    </section>

    <!-- headline -->
    <section class="headline">
        <h1 class="headline__title">Padrin@ Dame Un Nombre</h1>
        <h2 class="headline__subtitle">Tree Adoption Application Form</h2>
        <small class="headline__fine-print">(Information provided used for administrative purposes only)</small>
    </section>

    <form class="form" on:submit|preventDefault>
        {#each stepQuestions as q}
            {#if q.what === 'info'}
                <!-- step info -->
                <section class="outlined">
                    {#if q.title}
                        <h3 class={`form__info__title ${q.highlightedTitle ? 'form__info__title--highlighted' : ''}`}>
                            {q.title}
                        </h3>
                    {/if}
                    {#if q.text}
                        <div class="form__info__text">
                            {#each q.text as t}
                                <p>{t}</p>
                            {/each}
                        </div>
                    {/if}
                </section>
            {:else}
                <AInput required={q.required} label={q.label} error={errors[q.id] ? 'Please fill this out!' : null}>
                    {#if q.type === 'radio' && q.radioOptions?.length}
                        <div class="form__question__radios">
                            {#each q.radioOptions as option}
                                <div class="form__question__radio">
                                    <input
                                        type="radio"
                                        name={q.id}
                                        bind:group={payload[q.id]}
                                        value={option}
                                        id={option}
                                    />
                                    <label for={option}>{option}</label>
                                </div>
                            {/each}
                        </div>
                    {:else if q.type === 'date'}
                        <input
                            id={q.id}
                            class="form-input"
                            type="date"
                            placeholder={q.placeholder || ''}
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
                            placeholder={q.placeholder || ''}
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
                            placeholder={q.placeholder || ''}
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
                            placeholder={q.placeholder || ''}
                            bind:value={payload[q.id]}
                            on:focus={() => {}}
                            on:input={() => onInput(q)}
                            on:blur={() => checkInput(q)}
                        />
                    {/if}

                    {#if q.images?.length}
                        <div class="form__question__images">
                            {#each q.images as pic}
                                <img class="form__question__image" src={pic.src} alt={pic.alt} />
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

            {#if step === 3}
                <p>A copy of your responses will be emailed to the address you provided.</p>
            {/if}
        </section>

        <!-- payment details -->
        <section>
            <p>
                From the numbered tree map in step 2 please choose your tree number and make the payment in the next 5
                days after you submit the form to the following account details:
            </p>
            <br />
            <p>Adoption fee: €45</p>
            <p>Account Name: Dolores Abad Lorente</p>
            <p>IBAN/BIC. ES56 2100 4498 1601 0012 1743 / CAIXESBBXXX</p>
            <br />
            <p>Only after your payment is received, will the adoption be finalized.</p>
        </section>
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
    }
</style>
