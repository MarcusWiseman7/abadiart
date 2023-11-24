import createClient from '@sanity/client';

const client = createClient({
    projectId: import.meta.env.VITE_SANITY_ID,
    dataset: 'production',
    apiVersion: '2023-05-03',
    useCdn: true,
});

export default client;
