import sanityClient from '@sanity/client';

const sanity = sanityClient({
    projectId: '',
    dataset: 'production',
    apiVersion: '2021-10-21',
    useCdn: false,
});

export default sanity;
