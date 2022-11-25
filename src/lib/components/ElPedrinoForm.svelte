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
        id: string;
        label: string;
        placeholder?: string;
        required?: boolean;
        type?: string;
        map?: boolean;
    }

    // components
    import AInput from '$lib/components/AInput.svelte';
    import mapImage from '$lib/assets/images/map.jpg';
    import refugioImage from '$lib/assets/images/refugio.jpg';

    // data
    const formQuestions: IQuestion[] = [
        {
            id: 'email',
            label: 'Email address',
            placeholder: '',
            required: true,
            type: 'email',
        },
        { id: 'surname', label: 'Surname', placeholder: 'Surname', required: true },
        { id: 'name', label: 'Name', placeholder: 'Name', required: true },
        {
            id: 'residence',
            label: 'Place of residence ( Province, country )',
            placeholder: 'Murcia, Spain',
            required: true,
        },
        { id: 'phone', label: 'Phone number', placeholder: '', required: false },
        {
            id: 'treeName',
            label: `Give a name to your adopted tree and add your surname if you like?`,
            placeholder: 'Lovely name',
            required: true,
        },
        {
            id: 'treeId',
            label: 'In this map the mandarin trees are marked with a number - Please choose a number which will become your tree and choose a color to mark it on the map',
            placeholder: 'Tree id number',
            required: true,
            type: 'number',
            map: true,
        },
        { id: 'date', label: 'Date of Adoption', placeholder: '', required: true, type: 'date' },
    ];
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
</script>

<form>
    <!-- headline -->
    <section class="centered">
        <h1>Tree Adoption Application Form</h1>
        <small>(Information provided for administrative purposes only)</small>
    </section>

    <!-- El refugio -->
    <section class="centered">
        <h3>El Refugio EcoArt</h3>
        <img src={refugioImage} alt="El refugio" />
    </section>

    <!-- form info -->
    <section>
        <h3>WHO YOU ARE</h3>
        <p>To identify you on the adoption certificate, and to send it to you.</p>
    </section>

    {#each formQuestions as q}
        <AInput required={q.required} label={q.label} error={errors[q.id] ? 'Please fill this out!' : null}>
            {#if q.type === 'date'}
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

            {#if q.map}
                <img class="map" src={mapImage} alt="map" />
            {/if}
        </AInput>
    {/each}

    <!-- payment details -->
    <section>
        <p>
            From the numbered tree map below please choose your tree number and make the payment in the next 5 days
            after you submit the form to the following account details:
        </p>
        <br />
        <p>Adoption fee: €45</p>
        <p>Account Name: Dolores Abad Lorente</p>
        <p>IBAN/BIC. ES56 2100 4498 1601 0012 1743 / CAIXESBBXXX</p>
        <br />
        <p>Only after your payment is received, will the adoption be finalized.</p>
    </section>
</form>

<!-- page 2 -->
<!-- title -->
<!-- Giving the Name and Surname -->

<!-- desc -->
<!-- After you adopt the tree we will send you an adoption certificate which is valid for one year only, containing beautiful photos of your tree. The certificate will identify you as the Padrin@ of the tree and will include your chosen name for the tree.  This fictional kinship aims to connect you with the tree, so you can build up a family relationship between you and your adopted tree. 

This action contributes to promote the ecological thinking and to create a new lineage between trees and people.  We will also inform you about events at El Refugio, where you could meet your adopted tree in person!  If the project or photos of your tree spark any memories of experiences about trees and nature in your life then please do tell us.  We would be delighted to know.   -->

<!-- 2 pics -->

<!-- input -->

<!-- page 3 -->
<!-- title -->
<!-- Mandarin Donation -->

<!-- desc -->
<!-- The collection of mandarins takes place over the months of October and November.  Each person who adopts a tree and has paid the fee will have the option of collecting 30kg of mandarins yourself or making a act of generosity, where we pick the mandarins and donate for you to people in need in the surrounding community,  -->

<!-- 2 radio inputs -->

<!-- Will you donate the mandarins and we will pick  and donate them  to people with needs in the community -->

<!-- Will you come to pick up the mandarins? -->

<!-- page 4 -->

<!-- wrap up images/info -->
<style lang="scss">
    form {
        display: flex;
        flex-direction: column;
        gap: 20px;

        img {
            max-width: 100%;
        }

        .map {
            margin-top: 30px;
        }
    }

    section {
        padding: 0 8px;

        @media (min-width: 600px) {
            padding: 0 30px;
        }

        &.centered {
            text-align: center;
        }

        small {
            color: gray;
        }

        h1 {
            font-size: 28px;
            font-weight: 600;
        }

        h3 {
            font-size: 20px;
        }

        p {
            font-size: 16px;
        }
    }
</style>
