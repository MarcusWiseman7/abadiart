import type { IPadrinoPayload } from '$lib/ts-interfaces';
import sanity from '$lib/sanity';
import { error } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import type { Actions, PageServerLoad } from './$types.js';

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: 'no-reply.abadiart@outlook.com',
        pass: import.meta.env.VITE_EMAIL_PASS,
    },
});

export const load: PageServerLoad = async (_) => {
    const query = `*[_type == 'elPadrino'][0]`;
    const res = await sanity.fetch(query);

    return { data: JSON.stringify(res) };
}

export const actions: Actions = {
    submission: async ({ request }) => {
        const data: FormData = await request.formData();

        const submission: IPadrinoPayload = {
            email: '',
            surname: '',
            name: '',
            residence: '',
            phone: '',
            treeName: '',
            treeId: null,
            color: '',
            adoptionDate: null,
            donate: null,
            lang: 'en',
        };
        
        for (const pair of data.entries()) {
            submission[pair[0] as keyof IPadrinoPayload] = pair[1];
        }

        // send abadiart the form submission
        const email1 = await transporter.sendMail({
            from: 'Padrin@ Dame Un Nombre <no-reply.abadiart@outlook.com>',
            to: 'abadiartspace@gmail.com',
            subject: 'Tree adoption form submission',
            html: `
                <h3>Padrin@ Dame Un Nombre - tree adoption form submission</h3>
                <h5>Email: ${submission.email}</h5>
                <h5>Name: ${submission.name}</h5>
                <h5>Surname: ${submission.surname}</h5>
                <h5>Residence: ${submission.residence}</h5>
                <h5>Phone: ${submission.phone ? submission.phone : 'No phone number given..'}</h5>
                <h5>Adoption date: ${submission.adoptionDate}</h5>
                <h5>Tree ID: ${submission.treeId}</h5>
                <h5>Color for map marker: ${submission.color}</h5>
                <h5>Tree name: ${submission.treeName}</h5>
                <h5>Donage or Pick?: ${submission.donate}</h5>
                <h5>Form submitted in ${submission.lang === 'en' ? 'English' : 'Spanish'} language</h5>
            `,
        });

        const replyEmailHTML = [
            `
                <h3>Thank you for participating in the El Padrino@ project with El Refugio EcoArt.</h3>
                <h5>We are so pleased that you are helping support the project and protecting the trees in the Refugio.</h5>
                <br />
                <h5>Your tree adoption is nearly ready but please do make the €45 adoption fee payment in the next 5 days to the following account details:</h5>
                <h5>Account Name: Dolores Abad Lorente</h5>
                <h5>IBAN/BIC  ES56 2100 4498 1601 0012 1743 / CAIXESBBXXX</h5>
                <br />
                <h5>Once your payment is received, the adoption will be finalized and you will receive the photos and adoption certificate.</h5>
                <br />
                <h5>We are really excited to have you on board!</h5>
                <h5>The Refugio Team</h5>
            `,
            `
                <h3>Gracias por participar en el proyecto El Padrino@ con El Refugio EcoArt.</h3>
                <h5>Estamos muy contentos de que esté ayudando a apoyar el proyecto y protegiendo los árboles en el Refugio.</h5>
                <br />
                <h5>La adopción de su árbol está casi lista, pero realice el pago de la tarifa de adopción de 45 € en los próximos 5 días a los siguientes detalles de la cuenta:</h5>
                <h5>Nombre de la cuenta: Dolores Abad Lorente</h5>
                <h5>IBAN/BIC. ES56 2100 4498 1601 0012 1743 / CAIXESBBXXX</h5>
                <br />
                <h5>Una vez recibido tu pago, se formalizará la adopción y recibirás las fotos y el certificado de adopción. ¡Estamos muy emocionados de tenerle a bordo!</h5>
                <br />
                <h5>Un Saludo</h5>
                <h5>El equipo de Refugio</h5>
            `,
        ];

        // send the submitter an auto reply email
        const email2 = await transporter.sendMail({
            from: 'AbadiArt.org <no-reply.abadiart@outlook.com>',
            to: submission.email,
            subject: 'Tree adoption form submission',
            html: submission.lang === 'en' ? replyEmailHTML[0] : replyEmailHTML[1],
        });

        if (!!(email1 && email2)) return { success: true };
        else throw error(500, { message: 'Email error, please try again' });
    },
}
