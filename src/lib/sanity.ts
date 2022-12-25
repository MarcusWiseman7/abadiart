import sanityClient from '@sanity/client';

const sanity = sanityClient({
    projectId: import.meta.env.VITE_SANITY_ID,
    dataset: 'production',
    apiVersion: '2021-10-21',
    useCdn: true,
});

export default sanity;
