// types
import type { IPadrinoPayload } from '$lib/ts-interfaces';

import sanity from '$lib/sanity';
import { invalid } from '@sveltejs/kit';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: 'no-reply.abadiart@outlook.com',
        pass: import.meta.env.VITE_EMAIL_PASS,
    },
});

/** @type {import('./$types').PageServerLoad} */
export async function load({ }) {
    // const query = `*[_type == 'contact'][0]`;
    // const res = await sanity.fetch(query);
    // if (res) return res;
    return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
    submission: async ({ request }) => {
        try {
            const data = await request.formData();
    
            const submission: IPadrinoPayload = {
                email: null,
                surname: null,
                name: null,
                residence: null,
                phone: null,
                treeName: null,
                treeId: null,
                date: null,
                donate: null,
            };
            
            for (const pair of data.entries()) {
                submission[pair[0] as keyof IPadrinoPayload] = pair[1];
            }

            await transporter.sendMail({
                from: 'Padrin@ Dame Un Nombre <no-reply.abadiart@outlook.com>',
                to: 'md.wiseman@hotmail.com',
                subject: 'Tree adoption form submission',
                html: `
                    <h3>Padrin@ Dame Un Nombre - tree adoption form submission</h3>
                    <h5>Email: ${submission.email}</h5>
                    <h5>Name: ${submission.name}</h5>
                    <h5>Surname: ${submission.surname}</h5>
                    <h5>Residence: ${submission.residence}</h5>
                    <h5>Phone: ${submission.phone}</h5>
                    <h5>Adoption date: ${submission.date}</h5>
                    <h5>Tree ID: ${submission.treeId}</h5>
                    <h5>Tree name: ${submission.treeName}</h5>
                    <h5>Donage or Pick?: ${submission.donate}</h5>
                `,
            });

            return { success: true };
        } catch (err) {
            return invalid(500, { message: 'Catch error: ' + err });
        }
    },
}
