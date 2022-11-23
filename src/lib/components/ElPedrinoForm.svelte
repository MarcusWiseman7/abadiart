<script lang="ts">
    // types
    interface IErrors {
        email: string | null;
        surname: string | null;
        name: string | null;
        residence: string | null;
        phone: string | null;
        treeName: string | null;
        treeId: string | null;
        date: string | null;
    }
    interface IValidations {
        email?: RegExp;
        surname?: RegExp;
        name?: RegExp;
        residence?: RegExp;
        phone?: RegExp;
        treeName?: RegExp;
        treeId?: RegExp;
        date?: RegExp;
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

    // components
    import AInput from '$lib/components/AInput.svelte';

    // data
    const formQuestions = [
        { id: 'email', label: 'Email address', placeholder: '', required: true },
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
            label: `Give a name to your adopted tree  and add your surname ?`,
            placeholder: '',
            required: true,
        },
        {
            id: 'treeId',
            label: 'In this map the mandarin trees are marked with a number - Please choose a number which will become your tree and choose a color to mark it on the map',
            placeholder: '',
            required: true,
            type: 'number',
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
    const errors: IErrors = {
        email: null,
        surname: null,
        name: null,
        residence: null,
        phone: null,
        treeName: null,
        treeId: null,
        date: null,
    };
    const validations: IValidations = {
        email: /sdlfkj/g,
        surname: /.{1,}/g,
        name: /.{1,}/g,
        residence: /.{1,}/g,
        treeName: /.{1,}/g,
        treeId: /[0-9]/g,
        date: /.{1,}/g,
    };

    // methods
    const onBlur = (id: string): void => {
        const value = payload[id as keyof IPayload];
        console.log('value :>> ', value);
        if (validations[id as keyof IValidations] && typeof value === 'string') {
            const error = validations[id as keyof IValidations].test(value);
            console.log('error :>> ', error);
            errors[id as keyof IErrors] = error;
        }
    };
</script>

<!-- headline -->
<section>
    <h2>Tree Adoption Application Form</h2>
    <p>(Information provided for administrative purposes only)</p>
</section>

<!-- form info -->
<section>
    <h3>WHO YOU ARE</h3>
    <p>To identify you on the adoption certificate, and to send it to you.</p>
</section>

<form>
    {#each formQuestions as q}
        <AInput required={q.required} label={q.label} error={errors[q.id]}>
            {#if q.type === 'date'}
                <input
                    id={q.id}
                    class="form-input"
                    type="date"
                    placeholder={q.placeholder || ''}
                    bind:value={payload[q.id]}
                    on:focus={() => {}}
                    on:blur={() => onBlur(q.id)}
                />
            {:else if q.type === 'number'}
                <input
                    id={q.id}
                    class="form-input"
                    type="number"
                    placeholder={q.placeholder || ''}
                    bind:value={payload[q.id]}
                    on:focus={() => {}}
                    on:blur={() => onBlur(q.id)}
                />
            {:else}
                <input
                    id={q.id}
                    class="form-input"
                    type="text"
                    placeholder={q.placeholder || ''}
                    bind:value={payload[q.id]}
                    on:focus={() => {}}
                    on:blur={() => onBlur(q.id)}
                />
            {/if}
        </AInput>
    {/each}
</form>

<style lang="scss">
    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
</style>
