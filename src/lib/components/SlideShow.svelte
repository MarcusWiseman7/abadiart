<script lang="ts">
    import type { IMainImage } from '$lib/ts-interfaces';
    import { onMount } from 'svelte';
    import AImage from '$lib/components/AImage.svelte';
    import arrowBack from '$lib/assets/icons/arrow-back.svg';
    import arrowForward from '$lib/assets/icons/arrow-forward.svg';

    export let images: IMainImage[];

    const SLIDE_INTERVAL = 12000;
    let height = 0;
    let canHave = false;
    let activeSlide = 0;
    let ss_interval: NodeJS.Timeout | null = null;

    const startInterval = (): void => {
        ss_interval = setInterval(() => {
            if (activeSlide + 1 < images.length) activeSlide++;
            else activeSlide = 0;
        }, SLIDE_INTERVAL);
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
    const getDevice = (): void => {
        canHave = false;
        height = window.innerHeight;
        setTimeout(() => {
            canHave = true;
        }, 0);
    };

    onMount(() => {
        getDevice();
        if (images?.length > 1) startInterval();
        canHave = true;
    });
</script>

<svelte:window on:resize={getDevice} />

{#if images?.length && canHave}
    <div class="slide-show">
        {#each images as image, index}
            {#if image.asset}
                <div class={`slide-show__slide ${index === activeSlide ? 'slide-show__slide--active' : ''}`}>
                    <AImage {image} {height} loading={index == 0 ? 'eager' : 'lazy'} addClass="fullscreen" />
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
        height: 100vh !important;
        height: 100dvh !important;
        width: 100vw !important;
        width: 100dvw !important;

        // height: calc(100vh + env(safe-area-inset-top));
        // padding-top: env(safe-area-inset-top);

        &__slide {
            position: absolute;
            top: 0;
            left: 0;
            height: 100vh !important;
            height: 100dvh !important;
            width: 100vw !important;
            width: 100dvw !important;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 3s ease-in;

            &--active {
                opacity: 1;
            }
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
                    -webkit-filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
                    filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
                }
            }
        }
    }
</style>
