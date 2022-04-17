<script>
    import { goto } from '$app/navigation';
    import { logoImage, appMessages, nav, locale } from '$lib/stores';
    import SendIcon from '$lib/assets/icons/send.svg';
    import AImage from './AImage.svelte';
    import { localeString } from '$lib/helpers';

    $: email = '';
    $: emailInvalid = false;
    const checkEmail = () => {
        emailInvalid = !/^\S+@\S+\.\S+$/.test(email);
    };
    const keyup = (e) => {
        if (emailInvalid) checkEmail();
        if (e.key === 'Enter') join();
    };
    const join = () => {
        checkEmail();
        if (emailInvalid) return;

        const m = {
            message: `Welcome, ${email} has been added to our newsletter list!`,
            timeout: 6000,
            type: 'success',
            id: Date.now(),
        };
        appMessages.update((a) => [...a, m]);
    };
</script>

<footer class="w-full bg-stone-100 p-4 lg:p-6">
    <div class="grid gap-6 grid-cols-2 lg:grid-cols-7">
        <a href="/" class="h-32 w-32 ml-auto">
            {#if $logoImage?.image}
                <AImage image={$logoImage.image} height={120} width={120} alt="logo" addClass="rounded-full" />
            {/if}
        </a>

        <ul class="flex flex-col justify-between lg:col-span-4">
            {#if $nav?.length}
                {#each $nav as link}
                    <li class="cursor-pointer p-1" on:click={() => goto(link.href)}>
                        {localeString(link.name, $locale)}
                    </li>
                {/each}
            {/if}
        </ul>

        <div class="flex flex-col justify-center col-span-2 2xl:col-span-1">
            <h4>NEWSLETTER SIGNUP</h4>
            <div class="block relative mt-1">
                <input
                    type="email"
                    placeholder="Email address..."
                    class="peer rounded-md w-full placeholder:text-slate-400 placeholder:italic"
                    bind:value={email}
                    on:keyup={keyup}
                />
                <button
                    on:click={join}
                    class="peer-focus:border-blue-600 peer-focus:border peer-focus:border-l-0 absolute inset-y-0 right-0 bg-orange-700 flex items-center justify-center rounded-r-md"
                >
                    <img src={SendIcon} alt="send" height="18" width="18" class="mx-4" />
                </button>
                {#if emailInvalid}
                    <p class="text-xs ml-3 text-red-600 lg:mt-1 absolute left-0 top-full">
                        Please provide a valid email
                    </p>
                {/if}
            </div>
        </div>
    </div>

    <div class="text-sm text-center mt-4 lg:mt-0">Marcus Wiseman &copy; {new Date().getFullYear()}</div>
</footer>
