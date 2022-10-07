<script lang="ts">
    import type { BlockComponentProps } from '@portabletext/svelte';
    export let portableText: BlockComponentProps;

    $: ({ value } = portableText);
    $: anchorId = `paragraph-${value._key}`;
</script>

<p class="about-paragraph" id={anchorId}>
    <slot />
</p>
