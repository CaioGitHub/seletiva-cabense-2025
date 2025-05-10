import { Resend } from 'resend';
import formidable from 'formidable';
import fs from 'fs';
import dotenv from 'dotenv';

// Carregar as variáveis de ambiente do .env
dotenv.config();

export const config = {
  api: { bodyParser: false },  // Desabilita o body parser do Next.js
};

const resend = new Resend(process.env.RESEND_API_KEY);  // Usando a API Key do .env

const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const form = formidable({ multiples: false });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err); // Passa o erro para o catch
      }
      resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    console.log('Método inválido:', req.method);
    return res.status(405).send('Method Not Allowed');
  }

  try {
    console.log('Iniciando o processamento do formulário...');
    const { fields, files } = await parseForm(req);
    console.log('Campos recebidos:', fields);
    console.log('Arquivos recebidos:', files);

    const { name, email } = fields;
    const file = files.file;

    if (!file) {
      console.log('Nenhum arquivo encontrado.');
      return res.status(400).send('Nenhum arquivo enviado.');
    }

    console.log('Lendo o arquivo...');
    const buffer = await fs.promises.readFile(file.filepath);

    console.log('Enviando e-mail...');
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',  // De onde está enviando o e-mail
      to: process.env.EMAIL_DESTINATARIO,  // E-mail do destinatário do .env
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
      console.error('Erro ao enviar o e-mail:', error);
      return res.status(500).send('Erro ao enviar e‑mail.');
    }

    console.log('E-mail enviado com sucesso!');
    return res.status(200).send('Formulário enviado com sucesso!');
  } catch (err) {
    console.error('Erro no servidor:', err);
    return res.status(500).send('Erro no servidor.');
  }
}
