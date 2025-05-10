import dotenv from 'dotenv';
dotenv.config();

import { Router } from 'express';
import { Resend } from 'resend';
import formidable from 'formidable';
import fs from 'fs';

const router = Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).send('Erro ao processar formulário.');
    }
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
  });
});

export default router;
