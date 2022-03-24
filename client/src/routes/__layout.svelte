<script>
    import '../app.css';
</script>

<svelte:head>
    <title>AbadiArt</title>
</svelte:head>

<div
    class="flex flex-col items-center justify-between pt-20 w-full min-h-screen text-stone-900 select-none overflow-x-hidden"
>
    <div class="min-h-max w-full px-3.5 lg:w-2/3 lg:max-w-4xl lg:px-0">
        <slot />
    </div>
</div>
