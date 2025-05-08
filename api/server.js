import express from 'express';
import path from 'path';
import multer from 'multer';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const upload = multer();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.static(path.join(process.cwd(), 'public')));

app.post('/enviar-formulario', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('Nenhum arquivo enviado.');

    const { name, email } = req.body;
    const arquivo = req.file;

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'caiopvasconcelos@gmail.com',
      subject: `Nova inscrição: ${name}`,
      html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>`,
      attachments: [{
        filename: arquivo.originalname,
        content: arquivo.buffer,
      }],
    });

    if (error) return res.status(500).send('Erro ao enviar e-mail.');
    res.send('Formulário enviado com sucesso!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor.');
  }
});

app.listen(3000, () => console.log('🚀 Rodando em http://localhost:3000'));
