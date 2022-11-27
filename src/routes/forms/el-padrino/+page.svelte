<script lang="ts">
    // types
    interface IErrors {
        email: boolean;
        surname: boolean;
        name: boolean;
        residence: boolean;
        phone: boolean;
        treeName: boolean;
        treeId: boolean;
        date: boolean;
    }
    interface IPayload {
        email: string | null;
        surname: string | null;
        name: string | null;
        residence: string | null;
        phone?: string | null;
        treeName: string | null;
        treeId: number | null;
        date: Date | null;
    }
    interface IQuestion {
        what?: string;
        title?: string;
        subtitle?: string;
        text?: string[];
        id?: string;
        label?: string;
        placeholder?: string;
        required?: boolean;
        type?: string;
        images?: { src: string; alt: string }[];
        radioOptions?: string[];
    }

    // components
    import AInput from "$lib/components/AInput.svelte";
    import mapImage from "$lib/assets/images/map.jpg";

    // data
    let step = 0;
    const formQuestionsStep1: IQuestion[] = [
        {
            what: "info",
            title: "WHO YOU ARE",
            text: ["To identify you on the adoption certificate, and to send it to you."],
        },
        {
            id: "email",
            label: "Email address",
            placeholder: "",
            required: true,
            type: "email",
        },
        { id: "surname", label: "Surname", placeholder: "Surname", required: true },
        { id: "name", label: "Name", placeholder: "Name", required: true },
        {
            id: "residence",
            label: "Place of residence ( Province, country )",
            placeholder: "Murcia, Spain",
            required: true,
        },
        { id: "phone", label: "Phone number", placeholder: "", required: false },
    ];

    const formQuestionsStep2: IQuestion[] = [
        {
            what: "info",
            title: "Giving the Name and Surname",
            text: [
                "After you adopt the tree we will send you an adoption certificate which is valid for one year only, containing beautiful photos of your tree. The certificate will identify you as the Padrin@ of the tree and will include your chosen name for the tree. This fictional kinship aims to connect you with the tree, so you can build up a family relationship between you and your adopted tree.",
                "This action contributes to promote the ecological thinking and to create a new lineage between trees and people. We will also inform you about events at El Refugio, where you could meet your adopted tree in person!  If the project or photos of your tree spark any memories of experiences about trees and nature in your life then please do tell us. We would be delighted to know.",
            ],
        },
        {
            id: "treeName",
            label: `Give a name to your adopted tree and add your surname if you like?`,
            placeholder: "Lovely name",
            required: true,
        },
        {
            id: "treeId",
            label: "In this map the mandarin trees are marked with a number - Please choose a number which will become your tree and choose a color to mark it on the map",
            placeholder: "Tree id number",
            required: true,
            type: "number",
            images: [{ src: mapImage, alt: "map" }],
        },
        { id: "date", label: "Date of Adoption", placeholder: "", required: true, type: "date" },
    ];
    const formQuestionsStep3: IQuestion[] = [
        {
            what: "info",
            title: "Mandarin Donation",
            text: [
                "The collection of mandarins takes place over the months of October and November.  Each person who adopts a tree and has paid the fee will have the option of collecting 30kg of mandarins yourself or making a act of generosity, where we pick the mandarins and donate for you to people in need in the surrounding community",
            ],
        },
        {
            id: "donateVsPick",
            label: "Will you donate the mandarins and we will pick and donate them to people with needs in the community? Or would you like to pick the mandarins yourself?",
            type: "radio",
            radioOptions: ["I prefer to donate", "I prefer to pick them myself"],
            required: true,
        },
    ];

    $: stepQuestions = [formQuestionsStep1, formQuestionsStep2, formQuestionsStep3][step];

    const payload: IPayload = {
        email: null,
        surname: null,
        name: null,
        residence: null,
        phone: null,
        treeName: null,
        treeId: null,
        date: null,
    };

    let errors: IErrors = {
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
    const checkInput = (question: IQuestion): void => {
        const { required, id } = question;

        if (required) {
            const value = payload[id as keyof IPayload];
            errors[id as keyof IErrors] = !!!value;
        }
    };

    const onInput = (question: IQuestion): void => {
        const { required, id } = question;

        if (required && errors[id as keyof IErrors]) {
            checkInput(question);
        }
    };

    const goPrev = (): void => {
        if (step > 0) {
            step--;
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        }
    };

    const goNext = (): void => {
        if (step < 3) {
            step++;
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        }
    };
</script>

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
            {#if q.what === "info"}
                <!-- step info -->
                <section>
                    <h3 class="form__info__title">{q.title}</h3>
                    {#if q.text}
                        <div class="form__info__text">
                            {#each q.text as t}
                                <p>{t}</p>
                            {/each}
                        </div>
                    {/if}
                </section>
            {:else}
                <AInput required={q.required} label={q.label} error={errors[q.id] ? "Please fill this out!" : null}>
                    {#if q.type === "radio" && q.radioOptions?.length}
                        <div class="form__question__radios">
                            {#each q.radioOptions as option}
                                <div class="form__question__radio">
                                    <input type="radio" name="mandarin" id={option} />
                                    <label for={option}>{option}</label>
                                </div>
                            {/each}
                        </div>
                    {:else if q.type === "date"}
                        <input
                            id={q.id}
                            class="form-input"
                            type="date"
                            placeholder={q.placeholder || ""}
                            bind:value={payload[q.id]}
                            on:focus={() => {}}
                            on:input={() => onInput(q)}
                            on:blur={() => checkInput(q)}
                        />
                    {:else if q.type === "number"}
                        <input
                            id={q.id}
                            class="form-input"
                            type="number"
                            placeholder={q.placeholder || ""}
                            bind:value={payload[q.id]}
                            on:focus={() => {}}
                            on:input={() => onInput(q)}
                            on:blur={() => checkInput(q)}
                        />
                    {:else if q.type === "email"}
                        <input
                            id={q.id}
                            class="form-input"
                            type="email"
                            placeholder={q.placeholder || ""}
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
                            placeholder={q.placeholder || ""}
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
            {#if step > 0}
                <button class="form-btn" on:click={() => goPrev()}>PREV</button>
            {/if}
            {#if step < 3}
                <button class="form-btn" on:click={() => goNext()}>NEXT</button>
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
    .headline {
        text-align: center;
        margin: 20px 0 60px 0;

        &__title {
            font-size: 36px;
            font-weight: 600;
        }

        &__subtitle {
            font-size: 28px;
            font-weight: 400;
        }

        &__fine-print {
            color: gray;
        }
    }

    section {
        padding: 0 8px;

        @media (min-width: 600px) {
            padding: 0 30px;
        }
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        letter-spacing: 1px;

        &__info {
            &__title {
                font-size: 24px;
                font-weight: 400;
            }

            &__text {
                display: flex;
                flex-direction: column;
                gap: 20px;
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
            gap: 10px;
            justify-content: end;
        }
    }
</style>
