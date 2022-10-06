import sanityClient from '@sanity/client';

const sanity = sanityClient({
    projectId: '5jinz4mc',
    dataset: 'production',
    apiVersion: '2021-10-21',
    useCdn: true,
});

export default sanity;
