<script lang="ts">
    // helpers
    import { locale } from '$lib/stores';

    // components
    import esFlag from '$lib/assets/icons/es.svg';
    import gbFlag from '$lib/assets/icons/gb.svg';
</script>

<div class="languages">
    <div class={'language' + ($locale === 'es' ? ' language--active' : '')} on:click={() => locale.set('es')}>
        <img src={esFlag} alt="Spain flag" />
    </div>
    <div class={'language' + ($locale === 'en' ? ' language--active' : '')} on:click={() => locale.set('en')}>
        <img src={gbFlag} alt="GB flag" />
    </div>
</div>

<style lang="scss">
    .languages {
        display: flex;
        gap: 12px;

        .language {
            cursor: pointer;
            opacity: 0.2;

            img {
                height: 24px;
                width: auto;
                border-radius: 4px;
            }

            &--active {
                opacity: 1;
            }
        }
    }
</style>
