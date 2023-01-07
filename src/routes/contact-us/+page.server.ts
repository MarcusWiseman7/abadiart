import type { IContactPayload } from '$lib/ts-interfaces';

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
    const query = `*[_type == 'contact'][0]`;
    const res = await sanity.fetch(query);
    if (res) return res;
}

/** @type {import('./$types').Actions} */
export const actions = {
    submission: async ({ request }) => {
        try {
            const data = await request.formData();
            const submission: IContactPayload = {
                email: '',
                name: '',
                subject: '',
                message: '',
                lang: 'en',
            };
            
            for (const pair of data.entries()) {
                submission[pair[0] as keyof IContactPayload] = pair[1];
            }

            // send abadiart the form submission
            const email1 = await transporter.sendMail({
                from: 'AbadiArt.org <no-reply.abadiart@outlook.com>',
                to: 'abadiartspace@gmail.com',
                subject: 'Contact us form submission',
                html: `
                    <h3>Contact us form submission</h3>
                    <h5>Email: ${submission.email}</h5>
                    <h5>Name: ${submission.name}</h5>
                    <h5>Subject: ${submission.subject}</h5>
                    <p>Message: ${submission.message}</p>
                    <h5>Form submitted in ${submission.lang === 'en' ? 'English' : 'Spanish'} language</h5>
                `,
            });

            if (!!email1) return { success: true };
            else return invalid(500, { message: 'Email error, please try again' });
        } catch (err) {
            return invalid(500, { message: 'Server error, please try again :>> ' + err });
        }
    },
}
