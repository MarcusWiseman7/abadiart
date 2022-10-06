<script lang="ts">
    import type { BlockComponentProps } from '@portabletext/svelte';
    export let portableText: BlockComponentProps;

    $: ({ value } = portableText);
    $: anchorId = `heading-${value._key}`;
</script>

<strong id={anchorId}>
    <slot />
</strong>

<style lang="scss">
</style>
