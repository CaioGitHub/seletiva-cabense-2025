import { Resend } from 'resend';
import formidable from 'formidable';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
    api: { bodyParser: false },
};

const resend = new Resend(process.env.RESEND_API_KEY);

const parseForm = (req) =>
    new Promise((resolve, reject) => {
        const form = formidable({ multiples: false });

        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            }
            resolve({ fields, files });
        });
    });

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        const { fields, files } = await parseForm(req);
        const { name, email } = fields;
        const file = files.file;

        if (!file) {

            return res.status(400).send('Nenhum arquivo enviado.');
        }

        const buffer = await fs.promises.readFile(file.filepath);

        const { error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: process.env.EMAIL_DESTINATARIO,
            subject: `Nova inscrição: ${name}`,
            html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>`,
            attachments: [
                {
                    filename: file.originalFilename,
                    content: buffer,
                },
            ],
        });

        if (error) {
            return res.status(500).send('Erro ao enviar e‑mail.');
        }

        return res.status(200).send('Formulário enviado com sucesso!');
    } catch (err) {
        return res.status(500).send('Erro no servidor.');
    }
}
