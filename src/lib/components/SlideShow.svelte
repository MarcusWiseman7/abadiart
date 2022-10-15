<script lang="ts">
    // types
    import type { IMainImage } from '$lib/ts-interfaces';

    // props
    export let images: IMainImage[];

    // directives
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    // components
    import AImage from '$lib/components/AImage.svelte';

    // images
    import arrowBack from '$lib/assets/icons/arrow-back.svg';
    import arrowForward from '$lib/assets/icons/arrow-forward.svg';

    // data
    let canHave = false;
    let activeSlide = 0;
    let ss_interval: NodeJS.Timer | null = null;

    // methods
    const startInterval = (): void => {
        ss_interval = setInterval(() => {
            if (activeSlide + 1 < images.length) activeSlide++;
            else activeSlide = 0;
        }, 4000);
    };
    const stopInterval = (): void => {
        if (ss_interval) clearInterval(ss_interval);
    };
    const goBack = (): void => {
        if (activeSlide - 1 < 0) activeSlide = images.length - 1;
        else activeSlide--;
    };
    const goForward = (): void => {
        if (activeSlide + 1 < images.length) activeSlide++;
        else activeSlide = 0;
    };

    onMount(() => {
        canHave = true;
        if (images?.length > 1) startInterval();
    });
</script>

{#if images?.length && canHave}
    <div class="slide-show">
        {#each images as image, index}
            {#if index === activeSlide}
                <div class="slide-show__slide" transition:fade={{ duration: 1000 }}>
                    <AImage image={image.asset || image.image} alt={image.alt || 'art'} addClass="fullscreen" />
                </div>
            {/if}
        {/each}

        {#if images.length > 1}
            <div class="slide-show__arrows" on:mouseenter={stopInterval} on:mouseleave={startInterval}>
                <div class="slide-show__arrows__arrow" on:click={goBack}>
                    <img src={arrowBack} alt="Back" />
                </div>
                <div class="slide-show__arrows__arrow" on:click={goForward}>
                    <img src={arrowForward} alt="Forward" />
                </div>
            </div>
        {/if}
    </div>
{/if}

<style lang="scss">
    .slide-show {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100%;

        &__slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__arrows {
            position: absolute;
            bottom: 40px;
            right: 40px;
            display: flex;
            gap: 10px;

            &__arrow {
                cursor: pointer;

                img {
                    height: 30px;
                    color: #fff;
                }
            }
        }
    }
</style>
