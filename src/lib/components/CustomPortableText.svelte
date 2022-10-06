<script lang="ts">
    export let value: [];

    import { PortableText } from '@portabletext/svelte';
    import CustomHeading from '$lib/components/customContent/CustomHeading.svelte';
    // import CustomStrong from '$lib/components/customContent/CustomStrong.svelte';
    import CustomParagraph from '$lib/components/customContent/CustomParagraph.svelte';
    // import CustomQuote from '$lib/components/customContent/CustomQuote.svelte';
    import CustomUrl from '$lib/components/customContent/CustomUrl.svelte';
    import CustomImage from './customContent/CustomImage.svelte';
</script>

{#if value?.length}
    <PortableText
        {value}
        components={{
            types: {
                // block-level components
                // callout: Callout,
                // inline-level components
                // userInfo: UserInfo,
                mainImage: CustomImage,
            },
            marks: {
                absUrl: CustomUrl,
                // Overwrite default mark renderers
                // strong: CustomStrong,
            },
            block: {
                normal: CustomParagraph,
                // blockquote: CustomQuote,
                h1: CustomHeading,
                h2: CustomHeading,
                h3: CustomHeading,
                h4: CustomHeading,
                // Swap only the list parts you need
                // list_bullet: UnorderedListWrapper,
                // list_number: OrderedListWrapper,
                // listItem_bullet: ListItem,
                // listItem_number: ListItem,
                // Custom user-defined style
                // textCenter: CentralizedText,
            },
        }}
    />
{/if}
