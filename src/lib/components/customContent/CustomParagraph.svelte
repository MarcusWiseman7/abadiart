<script lang="ts">
    import type { BlockComponentProps } from '@portabletext/svelte';
    export let portableText: BlockComponentProps;

    $: ({ value } = portableText);
    $: anchorId = `paragraph-${value._key}`;
</script>

<p class="custom-paragraph" id={anchorId}>
    <slot />
</p>

<style lang="scss">
    .custom-paragraph {
        position: relative;
        font-size: 18px;
        letter-spacing: 1.05px;
    }
</style>
